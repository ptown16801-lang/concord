# S26 edge-specialist execution plan

## Boundary

The Galaxy S26 is an optional edge compute worker.

Ubuntu / Concord retains:
- orchestration and task selection;
- Linear/GitHub credentials;
- repository and Git operations;
- governing policy and acceptance;
- state mutation;
- host-side validation;
- durable evidence.

The phone must not require:
- repository checkout;
- Linear/GitHub credentials;
- merge/deploy authority;
- issue-state authority;
- public network exposure.

Phone absence must never block Concord.

## Initial transport

- USB
- Android Debug Bridge (ADB)
- localhost-only host/device RPC through ADB forwarding or equivalent
- no public listener

## Initial runtime

Primary target:
- ONNX Runtime on Android
- Qualcomm QNN execution provider where supported
- verify actual HTP/NPU execution
- GPU/CPU fallback only when observed and recorded

llama.cpp/GGUF may be evaluated separately where useful but is not the primary specialist runtime.

## Candidate specialist lanes

### Retrieval / late interaction
- mixedbread-ai/mxbai-edge-colbert-v0-17m
- mixedbread-ai/mxbai-edge-colbert-v0-32m
- answerdotai/answerai-colbert-small-v1
- DataScience-UIBK/SmallReason-ColBERT-32M: research comparison only; licensing must be reviewed separately

### Dense embeddings
- BAAI/bge-small-en-v1.5
- sentence-transformers/all-MiniLM-L6-v2 baseline

### Reranking
- cross-encoder/ms-marco-MiniLM-L6-v2

### NLI
- cross-encoder/nli-deberta-v3-small

### PII/privacy
- gravitee-io/bert-small-pii-detection
- optional comparison: knowledgator/gliner-pii-small-v1.0

### Structured extraction
- fastino/gliner2.5-small-v1
- ONNX comparison: onnx-community/gliner_small-v2.1

### Code semantic search
- jinaai/jina-embeddings-v2-base-code

## Intended pipeline

1. deterministic host metadata/path filtering;
2. S26 retrieval or embedding stage;
3. optional S26 reranker;
4. optional S26 extraction/NLI/privacy annotations;
5. host validator;
6. Smallest Complete Context construction;
7. high-capability reasoning/review model.

S26 outputs are signals or candidate evidence, never acceptance or policy decisions.

## Heavy-work serialization

Only one heavy Ubuntu workload at a time.

Suggested order:
1. JON-226 device smoke/runtime proof;
2. JON-228 S26 retrieval/reranker runs;
3. surviving JON-228 Ubuntu baselines;
4. JON-229 S26 specialist runs;
5. surviving JON-229 Ubuntu baselines;
6. JON-230 review;
7. JON-231 executable adapter.

A S26 inference job may overlap only with lightweight host work such as documentation, manifests, hashing or review preparation.

Decision impact: No decision change.
