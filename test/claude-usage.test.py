import importlib.util
import json
import pathlib
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('usage', pathlib.Path(__file__).resolve().parents[1]/'scripts/claude-usage.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class UsageTest(unittest.TestCase):
    def test_deduplicates_updates_and_retains_deleted_history(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); project=root/'logs'/'-tmp-concord-work'; project.mkdir(parents=True)
            log=project/'session.jsonl'; ledger=root/'usage.sqlite'
            def row(output):
                return json.dumps({'message':{'id':'request','model':'test','usage':{'input_tokens':2,'cache_read_input_tokens':100,'output_tokens':output}}})+'\n'
            log.write_text(row(1)+row(5))
            first=module.collect(root/'logs',ledger)
            self.assertEqual(first['requests'],1)
            self.assertEqual(first['totals']['output_tokens'],5)
            self.assertEqual(module.collect(root/'logs',ledger)['totals'],first['totals'])
            log.unlink()
            self.assertEqual(module.collect(root/'logs',ledger)['totals'],first['totals'])
    def test_unrelated_project_and_partial_line(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); project=root/'logs'/'-concord'; project.mkdir(parents=True)
            (project/'s.jsonl').write_text('{partial')
            other=root/'logs'/'-other'; other.mkdir()
            (other/'s.jsonl').write_text(json.dumps({'message':{'id':'r','usage':{'output_tokens':999}}}))
            result=module.collect(root/'logs',root/'ledger')
            self.assertEqual(result['requests'],0)
            self.assertEqual(result['malformed_lines'],1)
    def test_same_request_id_different_sessions(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); project=root/'logs'/'-concord'; project.mkdir(parents=True)
            for name in ['a','b']:
                (project/(name+'.jsonl')).write_text(json.dumps({'message':{'id':'r','usage':{'output_tokens':3}}}))
            self.assertEqual(module.collect(root/'logs',root/'ledger')['totals']['output_tokens'],6)

    def test_missing_counters_remain_unknown(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d); project=root/'logs'/'-concord'; project.mkdir(parents=True)
            (project/'s.jsonl').write_text(json.dumps({'message':{'id':'r','usage':{'output_tokens':7}}}))
            r=module.collect(root/'logs',root/'ledger')
            self.assertIsNone(r['totals']['input_tokens'])
            self.assertIsNone(r['by_session'][0]['cache_read_input_tokens'])
            self.assertEqual(r['totals']['output_tokens'],7)
    def test_missing_source_fails_and_empty_source_is_unknown(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d)
            with self.assertRaises(ValueError): module.collect(root/'missing',root/'ledger')
            (root/'empty').mkdir()
            r=module.collect(root/'empty',root/'ledger')
            self.assertIsNone(r['totals']['input_tokens'])

if __name__=='__main__': unittest.main()
