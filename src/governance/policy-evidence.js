import { createPublicKey, verify } from 'node:crypto';
import { canonical, digest, textDigest, shape, manifestSchema } from '../../contracts/admission.js';

// Verifies historical policy provenance, not a new permission to execute.
// Trust roots must come from the reviewer's trusted issuer history, not the archive.
export function verifyPolicyEvidence(operation, bundle, trustRoots) {
  try {
    shape(bundle, 'manifest signature yaml');
    manifestSchema(bundle.manifest);
    const { manifest, signature, yaml } = bundle;
    const evidence = operation.evidence;
    if (digest(bundle) !== evidence.policyArchiveDigest ||
        canonical(manifest) !== canonical(evidence.policyManifest) ||
        typeof yaml !== 'string' || textDigest(yaml) !== manifest.policyDigest ||
        manifest.domain !== operation.request.domain || manifest.audience !== operation.request.audience ||
        !Number.isSafeInteger(evidence.approvedAt) ||
        evidence.approvedAt < manifest.notBefore || evidence.approvedAt >= manifest.expiresAt ||
        typeof signature !== 'string' || !/^[A-Za-z0-9+/]{86}==$/.test(signature)) return false;
    const root = trustRoots.find(r => r.issuer === manifest.issuer && r.keyId === manifest.keyId);
    if (!root) return false;
    const key = createPublicKey(root.publicKey);
    return key.asymmetricKeyType === 'ed25519' && verify(null, Buffer.from(canonical(manifest)), key, Buffer.from(signature, 'base64'));
  } catch { return false; }
}
