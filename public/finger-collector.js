const DEFAULTS = Object.freeze({
  enabled: true,
  ingestUrl: '/api/finger/sessions',
  configUrl: '/api/finger/config',
  contactMaxMs: 10_000,
  closeDelayMs: 3_000,
  preContextMs: 0,
  postContinueMs: 0,
  fingerVersion: '0.1.0',
  concordVersion: 'unknown',
});

const EVENT_NAMES = [
  'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerover', 'pointerout',
  'touchstart', 'touchmove', 'touchend', 'touchcancel',
  'mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout', 'click', 'dblclick',
  'wheel', 'scroll', 'contextmenu', 'keydown', 'keyup',
];

const number = (value) => Number.isFinite(Number(value)) ? Number(value) : undefined;
const uuid = () => globalThis.crypto?.randomUUID?.()
  ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

function associationId() {
  const key = 'concord.finger.association';
  try {
    let value = localStorage.getItem(key);
    if (!value) {
      value = uuid();
      localStorage.setItem(key, value);
    }
    return value;
  } catch {
    return uuid();
  }
}

function visitId() {
  const key = 'concord.finger.visit';
  try {
    let value = sessionStorage.getItem(key);
    if (!value) {
      value = uuid();
      sessionStorage.setItem(key, value);
    }
    return value;
  } catch {
    return uuid();
  }
}

function normalized(value, extent) {
  return Number.isFinite(value) && extent > 0 ? value / extent : null;
}

function elementContext(node) {
  if (!(node instanceof Element)) return null;
  const path = [];
  let current = node;
  while (current && path.length < 12) {
    let part = current.localName;
    if (current.id) part += `#${CSS.escape(current.id)}`;
    else if (current.classList.length) {
      part += [...current.classList].slice(0, 3).map((name) => `.${CSS.escape(name)}`).join('');
    }
    path.unshift(part);
    current = current.parentElement;
  }
  return {
    selectorPath: path.join(' > '),
    tag: node.localName,
    id: node.id || null,
    classes: [...node.classList],
    role: node.getAttribute('role'),
    name: node.getAttribute('name'),
  };
}

function contactValue(contact) {
  const x = number(contact.clientX);
  const y = number(contact.clientY);
  return {
    identifier: contact.identifier ?? contact.pointerId ?? null,
    clientX: x, clientY: y,
    pageX: number(contact.pageX), pageY: number(contact.pageY),
    screenX: number(contact.screenX), screenY: number(contact.screenY),
    normalizedX: normalized(x, innerWidth),
    normalizedY: normalized(y, innerHeight),
    radiusX: number(contact.radiusX), radiusY: number(contact.radiusY),
    rotationAngle: number(contact.rotationAngle), force: number(contact.force),
  };
}

function eventValue(event, startedAt) {
  const x = number(event.clientX);
  const y = number(event.clientY);
  const value = {
    type: event.type,
    timestamp: new Date().toISOString(),
    elapsedMs: performance.now() - startedAt,
    eventTimestamp: event.timeStamp,
    trusted: event.isTrusted,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    target: elementContext(event.composedPath?.()[0] ?? event.target),
    viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
    scroll: { x: scrollX, y: scrollY },
    clientX: x, clientY: y,
    pageX: number(event.pageX), pageY: number(event.pageY),
    screenX: number(event.screenX), screenY: number(event.screenY),
    normalizedX: normalized(x, innerWidth), normalizedY: normalized(y, innerHeight),
    buttons: number(event.buttons), button: number(event.button),
    detail: number(event.detail),
    modifiers: {
      alt: Boolean(event.altKey), ctrl: Boolean(event.ctrlKey),
      meta: Boolean(event.metaKey), shift: Boolean(event.shiftKey),
    },
  };

  if ('pointerId' in event) Object.assign(value, {
    pointerId: event.pointerId, pointerType: event.pointerType,
    primary: event.isPrimary, pressure: event.pressure,
    tangentialPressure: event.tangentialPressure,
    width: event.width, height: event.height,
    tiltX: event.tiltX, tiltY: event.tiltY, twist: event.twist,
  });
  if ('deltaX' in event) Object.assign(value, {
    deltaX: event.deltaX, deltaY: event.deltaY, deltaZ: event.deltaZ, deltaMode: event.deltaMode,
  });
  if ('key' in event) Object.assign(value, {
    key: event.key, code: event.code, location: event.location, repeat: event.repeat,
  });
  if ('touches' in event) Object.assign(value, {
    touches: [...event.touches].map(contactValue),
    changedTouches: [...event.changedTouches].map(contactValue),
    targetTouches: [...event.targetTouches].map(contactValue),
  });
  return value;
}

function nodeValue(node) {
  if (node instanceof Element) return node.outerHTML;
  return node.textContent;
}

function domSnapshot() {
  const root = document.documentElement.cloneNode(true);
  root.querySelectorAll('concord-finger').forEach((element) => element.remove());
  return root.outerHTML;
}

class ConcordFingerElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._active = false;
    this._config = { ...DEFAULTS };
    this._timers = new Set();
    this._onEvent = this._onEvent.bind(this);
  }

  connectedCallback() {
    if (!this.hasAttribute('manual')) this.open();
  }

  disconnectedCallback() {
    this._stopCapture();
  }

  async open(options = {}) {
    if (this._active) return this.sessionId;
    const remote = await this._loadConfig(options.configUrl ?? this.dataset.configUrl ?? DEFAULTS.configUrl);
    this._config = {
      ...DEFAULTS,
      ...remote,
      ...options,
      ingestUrl: options.ingestUrl ?? this.dataset.ingestUrl ?? remote.ingestUrl ?? DEFAULTS.ingestUrl,
    };
    this._config.contactMaxMs = Math.min(DEFAULTS.contactMaxMs,
      Math.max(0, number(this._config.contactMaxMs) ?? DEFAULTS.contactMaxMs));
    this._config.closeDelayMs = DEFAULTS.closeDelayMs;
    if (this.hasAttribute('disabled') || this._config.enabled === false) return null;

    this.sessionId = uuid();
    this._scanComplete = false;
    this._contactStarted = false;
    this._contactTimer = null;
    this._closing = false;
    this._pointerIds = new Set();
    this._startedAt = performance.now();
    this._data = {
      schemaVersion: 1,
      sessionId: this.sessionId,
      associationId: associationId(),
      userId: this._config.userId ?? null,
      visitId: this._config.visitId ?? visitId(),
      fingerVersion: this._config.fingerVersion,
      concordVersion: this._config.concordVersion,
      startedAt: new Date().toISOString(),
      invocation: this._config.invocation ?? this.dataset.invocation ?? 'explicit',
      capability: {
        maxTouchPoints: navigator.maxTouchPoints ?? 0,
        touchEvent: 'TouchEvent' in globalThis,
        pointerEvent: 'PointerEvent' in globalThis,
        hover: matchMedia('(hover: hover)').matches,
        coarsePointer: matchMedia('(pointer: coarse)').matches,
        userAgent: navigator.userAgent,
        platform: navigator.userAgentData?.platform ?? navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency ?? null,
        deviceMemory: navigator.deviceMemory ?? null,
        screen: { width: screen.width, height: screen.height, colorDepth: screen.colorDepth },
      },
      observedMaxContacts: 0,
      events: [], mutations: [], lifecycle: [],
      initialDom: domSnapshot(),
    };
    this._active = true;
    this._renderPrompt();
    this._startCapture();
    this._recordLifecycle('opened');
    this._setTimer(() => this._show(), Math.max(0, this._config.preContextMs));
    return this.sessionId;
  }

  async _loadConfig(url) {
    if (!url) return {};
    try {
      const response = await fetch(url, { headers: { accept: 'application/json' } });
      return response.ok ? await response.json() : {};
    } catch {
      return {};
    }
  }

  _renderPrompt() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { position: fixed; inset: 0; z-index: 2147483647; display: none; color: #f7f7f2; font-family: ui-sans-serif, system-ui, sans-serif; }
        .backdrop { position: absolute; inset: 0; display: grid; place-items: center; padding: 1.5rem; background: rgb(8 13 18 / 88%); }
        .panel { position: relative; width: min(32rem, 100%); min-height: 17rem; box-sizing: border-box; display: grid; place-items: center; padding: 3.5rem 2rem 2rem; border: 1px solid rgb(255 255 255 / 22%); border-radius: 1.25rem; background: #121b24; box-shadow: 0 1.5rem 5rem rgb(0 0 0 / 45%); text-align: center; }
        h2 { margin: 0; max-width: 22rem; font: 600 clamp(1.35rem, 4vw, 2rem)/1.25 inherit; letter-spacing: -.02em; }
        .close { position: absolute; top: .75rem; right: .75rem; width: 2.75rem; height: 2.75rem; border: 0; border-radius: 999px; background: rgb(255 255 255 / 10%); color: inherit; font: 1.5rem/1 inherit; cursor: pointer; }
        .close:hover, .close:focus-visible { background: rgb(255 255 255 / 20%); outline: 3px solid #8bd3ff; outline-offset: 2px; }
        .continue { display: none; min-width: 10rem; margin: 2.25rem auto 0; padding: .85rem 1.5rem; border: 0; border-radius: 999px; background: #f7f7f2; color: #121b24; font: 700 1rem/1 inherit; cursor: pointer; }
        .continue:focus-visible { outline: 3px solid #8bd3ff; outline-offset: 3px; }
        .panel.done { min-height: 10rem; padding: 2rem; }
        .panel.done h2, .panel.done .close { display: none; }
        .panel.done .continue { display: block; }
        @media (prefers-reduced-motion: no-preference) { .panel { animation: enter 160ms ease-out; } @keyframes enter { from { opacity: 0; transform: translateY(.5rem); } } }
      </style>
      <div class="backdrop" role="presentation">
        <section class="panel" role="dialog" aria-modal="true" aria-labelledby="finger-prompt">
          <button class="close" type="button" aria-label="Close Finger">&times;</button>
          <h2 id="finger-prompt">Place your finger on the scanner.</h2>
          <button class="continue" type="button">Continue</button>
        </section>
      </div>`;
    this.shadowRoot.querySelector('.close').addEventListener('click', () => this._closeRequested());
    this.shadowRoot.querySelector('.continue').addEventListener('click', () => this._continue());
  }

  _show() {
    if (!this._active) return;
    this.style.display = 'block';
    this.shadowRoot.querySelector('.close').focus();
    this._recordLifecycle('visible');
  }

  _startCapture() {
    for (const name of EVENT_NAMES) addEventListener(name, this._onEvent, { capture: true, passive: true });
    this._observer = new MutationObserver((records) => {
      if (!this._active) return;
      for (const mutation of records) {
        this._data.mutations.push({
          timestamp: new Date().toISOString(),
          elapsedMs: performance.now() - this._startedAt,
          type: mutation.type,
          target: elementContext(mutation.target instanceof Element ? mutation.target : mutation.target.parentElement),
          attributeName: mutation.attributeName,
          oldValue: mutation.oldValue,
          addedNodes: [...mutation.addedNodes].map(nodeValue),
          removedNodes: [...mutation.removedNodes].map(nodeValue),
        });
      }
    });
    this._observer.observe(document.documentElement, {
      subtree: true, childList: true, attributes: true, characterData: true,
      attributeOldValue: true, characterDataOldValue: true,
    });
  }

  _onEvent(event) {
    if (!this._active) return;
    this._data.events.push(eventValue(event, this._startedAt));
    const controlInteraction = event.composedPath?.().some((node) =>
      node instanceof Element && (node.classList.contains('close') || node.classList.contains('continue')));
    if (event.type === 'keydown' && event.key === 'Escape' && !this._scanComplete) this._closeRequested();
    if (controlInteraction || event.type === 'keydown' || event.type === 'keyup') return;
    const contacts = event.touches?.length
      ?? (event.type.startsWith('pointer') ? this._activePointers(event) : 0);
    this._data.observedMaxContacts = Math.max(this._data.observedMaxContacts, contacts);

    const begins = event.type === 'pointerdown' || event.type === 'touchstart' || event.type === 'mousedown';
    const ends = event.type === 'pointerup' || event.type === 'pointercancel'
      || event.type === 'touchend' || event.type === 'touchcancel' || event.type === 'mouseup';
    if (begins && !this._contactStarted) {
      this._contactStarted = true;
      this._recordLifecycle('contact-started');
      this._contactTimer = this._setTimer(() => this._completeScan('contact-timeout'), this._config.contactMaxMs);
    }
    if (ends && contacts === 0 && this._contactStarted && !this._scanComplete && !this._closing) {
      queueMicrotask(() => this._completeScan('contact-ended'));
    }
  }

  _activePointers(event) {
    this._pointerIds ??= new Set();
    if (event.type === 'pointerdown') this._pointerIds.add(event.pointerId);
    if (event.type === 'pointerup' || event.type === 'pointercancel') this._pointerIds.delete(event.pointerId);
    return this._pointerIds.size;
  }

  _closeRequested() {
    if (!this._active || this._scanComplete) return;
    if (this._closing) return;
    this._closing = true;
    if (this._contactTimer) {
      clearTimeout(this._contactTimer);
      this._timers.delete(this._contactTimer);
    }
    this._recordLifecycle('close');
    this.shadowRoot.querySelector('.close').disabled = true;
    this._setTimer(() => this._completeScan('closed'), this._config.closeDelayMs);
  }

  _completeScan(reason) {
    if (!this._active || this._scanComplete) return;
    this._scanComplete = true;
    this._recordLifecycle('scan-complete', { reason });
    this.shadowRoot.querySelector('.panel').classList.add('done');
    this.shadowRoot.querySelector('.continue').focus();
  }

  _continue() {
    if (!this._active || !this._scanComplete) return;
    this._recordLifecycle('continue');
    this.shadowRoot.querySelector('.continue').disabled = true;
    this._setTimer(() => this._finish(), Math.max(0, this._config.postContinueMs));
  }

  _recordLifecycle(type, detail = {}) {
    this._data.lifecycle.push({ type, timestamp: new Date().toISOString(), elapsedMs: performance.now() - this._startedAt, ...detail });
  }

  _setTimer(callback, delay) {
    const timer = setTimeout(() => { this._timers.delete(timer); callback(); }, Math.max(0, number(delay) ?? 0));
    this._timers.add(timer);
    return timer;
  }

  _stopCapture() {
    for (const name of EVENT_NAMES) removeEventListener(name, this._onEvent, { capture: true });
    this._observer?.disconnect();
    for (const timer of this._timers) clearTimeout(timer);
    this._timers.clear();
  }

  _finish() {
    if (!this._active) return;
    this._recordLifecycle('finished');
    this._data.finishedAt = new Date().toISOString();
    this._data.finalDom = domSnapshot();
    this._active = false;
    this._stopCapture();
    this.style.display = 'none';
    const detail = { sessionId: this.sessionId, associationId: this._data.associationId };
    this.dispatchEvent(new CustomEvent('finger:complete', { detail, bubbles: true }));
    this._submit(this._data);
    if (this.hasAttribute('remove-on-complete')) this.remove();
  }

  async _submit(data) {
    try {
      const created = await this._post(this._config.ingestUrl, {
        actorId: data.userId ?? data.associationId,
        visitId: data.visitId,
        trigger: data.invocation === 'login' ? 'login' : 'explicit',
        capabilities: data.capability,
        initialDom: data.initialDom,
        metadata: {
          clientSessionId: data.sessionId,
          associationId: data.associationId,
          userId: data.userId,
          visitId: data.visitId,
          startedAt: data.startedAt,
          fingerVersion: data.fingerVersion,
          concordVersion: data.concordVersion,
          lifecycle: data.lifecycle,
        },
      });
      if (!created?.sessionId) return;
      const base = `${this._config.ingestUrl}/${encodeURIComponent(created.sessionId)}`;
      await this._post(`${base}/events`, { events: data.events });
      await this._post(`${base}/complete`, {
        finalDom: data.finalDom,
        mutations: data.mutations,
        observedMaxContacts: data.observedMaxContacts,
        reason: data.lifecycle.findLast?.((entry) => entry.type === 'scan-complete')?.reason ?? 'continue',
      });
    } catch { /* Admission and navigation must not depend on collection. */ }
  }

  async _post(url, value) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(value),
    });
    if (!response.ok) throw new Error(`Finger ingestion returned ${response.status}`);
    return response.json();
  }
}

if (!customElements.get('concord-finger')) customElements.define('concord-finger', ConcordFingerElement);

globalThis.ConcordFinger = Object.freeze({
  open(options = {}) {
    const element = document.createElement('concord-finger');
    element.setAttribute('manual', '');
    element.setAttribute('remove-on-complete', '');
    document.body.append(element);
    element.open(options);
    return element;
  },
});

export { ConcordFingerElement };
