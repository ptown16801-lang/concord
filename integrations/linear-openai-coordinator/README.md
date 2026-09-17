# Linear → OpenAI Project Coordinator

A small, isolated Linear agent bridge. Linear creates an `AgentSession` when this app is delegated or @mentioned; the webhook acknowledges immediately, claims the assignment in a durable store, performs work in a Vercel `waitUntil()` task, calls bounded read-only OpenAI advisor agents followed by one mutation-capable coordinator, and emits `AgentActivity` updates back into the session.

The role model, lifecycle, authorization rules, and failure controls are specified in [AGENT_REGIME.md](./AGENT_REGIME.md).

## Safety boundary

This coordinator can read issues in the current authorized project, list that project's issues, create planning/research/review child records, update title/description/priority, and comment. It intentionally cannot delete/archive/cancel issues, merge code, change billing, rotate credentials, assign work, or delegate coding work. Quiz content is rejected at the mutation boundary. Owner elicitation is reserved for decisions that cannot be safely resolved from authoritative project material.

## Required environment variables

Copy `.env.example`. Required secrets are `OPENAI_API_KEY`, `LINEAR_CLIENT_ID`, `LINEAR_CLIENT_SECRET`, `LINEAR_WEBHOOK_SECRET`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN`. For Concord, keep `AGENT_ALLOWED_PROJECTS=Concord` until another project is explicitly authorized. The allowlist fails closed when absent.

The Redis-compatible REST store admits only one run for a stable Linear webhook/session activity ID and retains its terminal state. Replayed deliveries therefore do not launch another advisor/coordinator run. A new owner prompt has a new activity ID and is a new assignment.

The Linear OAuth application must enable `client_credentials`, webhook `AgentSessionEvent`, and scopes `read,write,app:assignable,app:mentionable`. Client-credentials tokens are requested per run; no long-lived Linear access token is stored by this service.

## Deployment

Deploy this directory as the Vercel project root. After the production hostname exists:

1. Replace `REPLACE_WITH_VERCEL_HOST` in `linear-app-manifest.template.json` with the production host.
2. Create a private Linear OAuth app using the manifest. Keep both `authorization_code` and `client_credentials` grant types, enable Agent Session Events, and copy the generated client ID, client secret, and webhook signing secret into Vercel environment variables.
3. Add the OpenAI API key to Vercel.
4. Provision an Upstash Redis database and add its REST URL/token to Vercel.
5. Redeploy, then confirm `/api/health` reports `configured: true` with an empty `missing` array.
6. Generate/authorize the app actor with scopes `read,write,app:assignable,app:mentionable`, ensure the app has access to the Concord team, and delegate a low-risk test issue to `Project Coordinator`.

Linear webhooks are HMAC-SHA256 verified against the exact raw body and rejected when their timestamp differs by more than 60 seconds.

## Local validation

`npm test` validates pure policy helpers. `npm run check` syntax-checks the service. Network integration tests intentionally require real Linear/OpenAI credentials and are not run in CI by default.

## Operational notes

The assignment store retains only lifecycle metadata, not prompt text, advisor reports, tool arguments, or response bodies. Follow-up `prompted` events use the context Linear provides with that webhook rather than maintaining a transcript database. A run that terminates unexpectedly retains its assignment lock until the configured retention period; recovery uses a new explicit owner prompt rather than silently replaying possibly completed mutations.
