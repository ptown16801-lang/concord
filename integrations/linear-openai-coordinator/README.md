# Linear → OpenAI Project Coordinator

A small, isolated Linear agent bridge. Linear creates an `AgentSession` when this app is delegated or @mentioned; the webhook acknowledges immediately, performs work in a Vercel `waitUntil()` task, calls the OpenAI Responses API, executes a deliberately narrow set of Linear project-management tools, and emits `AgentActivity` updates back into the session.

## Safety boundary

This coordinator can read issues, list the current project's issues, create child issues, update title/description/priority, and comment. It intentionally cannot delete/archive/cancel issues, merge code, change billing, rotate credentials, or delegate coding work. Owner elicitation is reserved for decisions that cannot be safely resolved from authoritative project material.

## Required environment variables

Copy `.env.example`. Required secrets are `OPENAI_API_KEY`, `LINEAR_CLIENT_ID`, `LINEAR_CLIENT_SECRET`, and `LINEAR_WEBHOOK_SECRET`. For Concord, keep `AGENT_ALLOWED_PROJECTS=Concord` until another project is explicitly authorized.

The Linear OAuth application must enable `client_credentials`, webhook `AgentSessionEvent`, and scopes `read,write,app:assignable,app:mentionable`. Client-credentials tokens are requested per run; no long-lived Linear access token is stored by this service.

## Deployment

Deploy this directory as the Vercel project root. After the production hostname exists:

1. Replace `REPLACE_WITH_VERCEL_HOST` in `linear-app-manifest.template.json` with the production host.
2. Create a private Linear OAuth app using the manifest. Keep both `authorization_code` and `client_credentials` grant types, enable Agent Session Events, and copy the generated client ID, client secret, and webhook signing secret into Vercel environment variables.
3. Add the OpenAI API key to Vercel.
4. Redeploy, then confirm `/api/health` reports `configured: true`.
5. Generate/authorize the app actor with scopes `read,write,app:assignable,app:mentionable`, ensure the app has access to the Concord team, and delegate a low-risk test issue to `Project Coordinator`.

Linear webhooks are HMAC-SHA256 verified against the exact raw body and rejected when their timestamp differs by more than 60 seconds.

## Local validation

`npm test` validates pure policy helpers. `npm run check` syntax-checks the service. Network integration tests intentionally require real Linear/OpenAI credentials and are not run in CI by default.

## Known v0.1 limitation

The service is stateless. Follow-up `prompted` events use the context Linear provides with that webhook rather than maintaining an external transcript database. This is deliberate for the first deploy; persistent cross-session memory should be added only with an explicit storage design and retention policy.
