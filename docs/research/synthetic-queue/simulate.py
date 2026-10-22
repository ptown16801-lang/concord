"""Synthetic FIFO review queue. Python standard library only; no Concord integration."""
import hashlib
import heapq
import json
import math
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HOURS = 30 * 24
OUTAGE = (10 * 24, 12 * 24)  # [day 10, day 12); elapsed days, starting at zero
VARIANTS = [('Baseline', 100, .20), ('More capacity', 120, .20), ('Less rework', 100, .10)]

def draw(seed, request, attempt):
    key = f'{seed}:{request}:{attempt}'.encode()
    return int.from_bytes(hashlib.sha256(key).digest()[:8], 'big') / 2**64

def finish_time(start, duration, outage):
    if outage is None:
        return start + duration
    a, b = outage
    if start < a and start + duration <= a:
        return start + duration
    if start < a:
        duration -= a - start
        start = b
    elif start < b:
        start = b
    return start + duration

def simulate(capacity=100, rework=.2, seed=0, outage=OUTAGE, arrivals=80, horizon=HOURS):
    from collections import deque
    count = int(arrivals * horizon / 24)
    records = [{'id': i, 'arrival': Fraction((2*i+1)*12, arrivals), 'attempts': 0, 'completed': None}
               for i in range(count)] if arrivals else []
    # Arrival before completion on exact ties. Rework rejoins the tail.
    events = [(r['arrival'], 0, r['id']) for r in records]
    heapq.heapify(events)
    queue, busy, log = deque(), False, []
    while events:
        now, kind, rid = heapq.heappop(events)
        if now > horizon:
            break
        r = records[rid]
        if kind == 0:
            queue.append(rid)
            log.append([now, 'arrival', rid])
        else:
            busy = False
            r['attempts'] += 1
            if draw(seed, rid, r['attempts']) < rework:
                queue.append(rid)
                log.append([now, 'rework', rid])
            else:
                r['completed'] = now
                log.append([now, 'completed', rid])
        if not busy and queue and capacity > 0:
            nxt = queue.popleft()
            heapq.heappush(events, (finish_time(now, Fraction(24, capacity), outage), 1, nxt))
            busy = True
    completed = [r for r in records if r['completed'] is not None]
    pending = [r for r in records if r['completed'] is None]
    elapsed = sorted(r['completed']-r['arrival'] for r in completed)
    def pct(p):
        return float(elapsed[max(0, math.ceil(p*len(elapsed))-1)]) if elapsed else None
    daily = []
    for day in range(int(horizon/24)+1):
        t = day*24
        arrived = sum(r['arrival'] <= t for r in records)
        done = sum(r['completed'] is not None and r['completed'] <= t for r in records)
        daily.append({'day': day, 'arrived': arrived, 'completed': done, 'unfinished': arrived-done})
    summary = {'arrived': count, 'completed': len(completed), 'unfinished': len(pending),
               'completed_p50_hours': pct(.5), 'completed_p95_hours': pct(.95),
               'oldest_unfinished_hours': float(max((horizon-r['arrival'] for r in pending), default=0)),
               'attempts_finished': sum(r['attempts'] for r in records),
               'reworks': sum(e[1] == 'rework' for e in log)}
    assert len(completed) + len(pending) == count
    assert len({e[2] for e in log if e[1] == 'completed'}) == len(completed)
    assert summary['attempts_finished'] == len(completed)+summary['reworks']
    if outage:
        assert not any(outage[0] < t < outage[1] for t, kind, _ in log if kind != 'arrival')
    # Only serialize times as floats after all ordering and accounting is finished.
    exported = [dict(r, arrival=float(r['arrival']), completed=float(r['completed'])
                     if r['completed'] is not None else None) for r in records]
    return {'summary': summary, 'daily': daily, 'records': exported,
            'events': [[float(t), kind, rid] for t, kind, rid in log]}

def checks():
    assert simulate(arrivals=0)['summary']['arrived'] == 0
    z = simulate(capacity=0)['summary']
    assert z['unfinished'] == 2400 and z['completed'] == 0
    s = simulate(capacity=100, arrivals=80, rework=0, outage=None)
    assert s['summary']['completed'] == 2399  # last arrival at 719.85 finishes at 720.09
    assert all(abs((r['completed']-r['arrival'])-.24) < 1e-9 for r in s['records'] if r['completed'] is not None)
    assert finish_time(239.9, .24, OUTAGE) == 288.14
    assert finish_time(241, .24, OUTAGE) == 288.24
    assert finish_time(239, 1, OUTAGE) == 240
    assert simulate(seed=3) == simulate(seed=3)
    ties = simulate(arrivals=80, capacity=100, rework=1, outage=None, horizon=6)
    assert [kind for t, kind, _ in ties['events'] if t == 1.35] == ['arrival', 'rework']
    overloaded = simulate(arrivals=120, capacity=100, rework=0, outage=None)
    assert overloaded['summary']['unfinished'] > 590
    assert all(a['unfinished'] <= b['unfinished'] for a,b in zip(overloaded['daily'], overloaded['daily'][1:]))
    return ['zero arrivals', 'zero capacity preserves pending work', 'no-rework analytic service time',
            'outage pauses remaining service', 'boundary completion ordering', 'exact seeded rerun',
            'exact fractional arrival-before-completion tie', 'sustained overload',
            'all-run conservation, unique completion and outage invariants']

def main():
    passed = checks()
    detail, ensemble = {}, []
    for name, cap, r in VARIANTS:
        detail[name] = simulate(capacity=cap, rework=r)
        runs = [simulate(capacity=cap, rework=r, seed=seed) for seed in range(50)]
        values = sorted(x['summary']['unfinished'] for x in runs)
        matched = simulate(capacity=cap, rework=r, outage=None)
        first_equal = next((a['day'] for a,b in zip(detail[name]['daily'], matched['daily'])
                            if a['day'] > 12 and a['unfinished'] == b['unfinished']), None)
        ensemble.append({'name': name, 'capacity_per_day': cap, 'rework_probability': r,
                         'end_unfinished_median': (values[24]+values[25])/2,
                         'end_unfinished_min': values[0], 'end_unfinished_max': values[-1],
                         'seed0_first_daily_match_to_no_outage': first_equal,
                         'seed0_no_outage_summary': matched['summary']})
    results = {'synthetic_only': True, 'model': 'single pooled FIFO server; constant attempt duration',
               'horizon_hours': HOURS, 'arrivals_per_day': 80, 'outage_hours': OUTAGE,
               'seeds': list(range(50)), 'variants': ensemble,
               'representative_seed': 0, 'representative': detail, 'checks_passed': passed}
    (ROOT/'results.json').write_text(json.dumps(results, indent=2)+'\n')
    # Standalone SVG chart; no browser, third-party packages, or network needed.
    colors = ['#e57373', '#56b4e9', '#70c991']
    maximum = max(p['unfinished'] for run in detail.values() for p in run['daily'])
    ymax = math.ceil(maximum/50)*50
    def x(day): return 75 + day/30*820
    def y(n): return 430 - n/ymax*330
    svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="960" height="590" viewBox="0 0 960 590">',
           '<rect width="960" height="590" fill="#101923"/>',
           '<g font-family="sans-serif" fill="#e8eef5">',
           '<text x="40" y="37" font-size="23">Concord synthetic review scenario</text>',
           '<text x="40" y="65" font-size="14">Invented inputs · seed 0 · 80 arrivals/day · unfinished includes work in service</text>',
           f'<rect x="{x(10)}" y="90" width="{x(12)-x(10)}" height="340" fill="#ffffff" opacity="0.09"/>']
    for n in range(0,ymax+1,50):
        svg += [f'<path d="M75 {y(n)} H895" stroke="#334353"/>',f'<text x="30" y="{y(n)+5}" font-size="13">{n}</text>']
    for day in range(0,31,5):
        svg.append(f'<text x="{x(day)-5}" y="455" font-size="13">{day}</text>')
    svg.append('<text x="390" y="481" font-size="14">Elapsed synthetic days</text>')
    for i, ((name, run), color) in enumerate(zip(detail.items(), colors)):
        points = ' '.join(f'{x(p["day"]):.2f},{y(p["unfinished"]):.2f}' for p in run['daily'])
        svg.append(f'<polyline points="{points}" fill="none" stroke="{color}" stroke-width="3"/>')
        svg.append(f'<text x="{40+i*300}" y="520" fill="{color}" font-size="15">{name}</text>')
    svg.append('<text x="40" y="557" font-size="13">Shaded: service paused on days 10–12. Daily snapshots; no claim about real Concord performance.</text></g></svg>')
    (ROOT/'backlog.svg').write_text('\n'.join(svg))
    print(json.dumps({'checks': passed, 'representative': {k:v['summary'] for k,v in detail.items()}, 'ensemble':ensemble}, indent=2))

if __name__ == '__main__':
    main()
