const LINEAR_GRAPHQL = "https://api.linear.app/graphql";
const LINEAR_TOKEN_URL = "https://api.linear.app/oauth/token";

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export async function getLinearAccessToken() {
  const clientId = required("LINEAR_CLIENT_ID");
  const clientSecret = required("LINEAR_CLIENT_SECRET");
  const scope = process.env.LINEAR_OAUTH_SCOPES || "read,write,app:assignable,app:mentionable";
  const body = new URLSearchParams({ grant_type: "client_credentials", scope });
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(LINEAR_TOKEN_URL, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${basic}`
    },
    body
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(`Linear client_credentials failed (${response.status}): ${data.error_description || data.error || "unknown error"}`);
  }
  return data.access_token;
}

export async function linearGraphQL(token, query, variables = {}) {
  const response = await fetch(LINEAR_GRAPHQL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`Linear GraphQL HTTP ${response.status}`);
  if (data.errors?.length) throw new Error(`Linear GraphQL: ${data.errors.map(e => e.message).join("; ")}`);
  return data.data;
}

export async function emitAgentActivity(token, agentSessionId, content, extra = {}) {
  const query = `mutation AgentActivityCreate($input: AgentActivityCreateInput!) {
    agentActivityCreate(input: $input) { success agentActivity { id } }
  }`;
  const data = await linearGraphQL(token, query, { input: { agentSessionId, content, ...extra } });
  if (!data?.agentActivityCreate?.success) throw new Error("Linear rejected agent activity");
  return data.agentActivityCreate.agentActivity;
}

export async function getIssue(token, id) {
  const query = `query CoordinatorIssue($id: String!) {
    issue(id: $id) {
      id identifier title description priority url updatedAt
      state { id name type }
      team { id name }
      project { id name }
      assignee { id name }
      delegate { id name }
    }
  }`;
  return (await linearGraphQL(token, query, { id }))?.issue;
}

export async function listProjectIssues(token, projectId, limit = 25) {
  const query = `query CoordinatorProject($id: String!, $first: Int!) {
    project(id: $id) {
      id name
      issues(first: $first) {
        nodes {
          id identifier title description priority url updatedAt
          state { id name type }
          assignee { id name }
          delegate { id name }
        }
      }
    }
  }`;
  return (await linearGraphQL(token, query, { id: projectId, first: Math.min(Math.max(limit, 1), 50) }))?.project;
}

export async function createChildIssue(token, currentIssue, args) {
  const query = `mutation CoordinatorIssueCreate($input: IssueCreateInput!) {
    issueCreate(input: $input) { success issue { id identifier title url } }
  }`;
  const input = {
    teamId: currentIssue.team.id,
    projectId: currentIssue.project?.id || undefined,
    parentId: currentIssue.id,
    title: args.title,
    description: args.description,
    ...(Number.isInteger(args.priority) ? { priority: args.priority } : {})
  };
  const data = await linearGraphQL(token, query, { input });
  if (!data?.issueCreate?.success) throw new Error("Linear issueCreate returned success=false");
  return data.issueCreate.issue;
}

export async function updateIssue(token, args) {
  const query = `mutation CoordinatorIssueUpdate($id: String!, $input: IssueUpdateInput!) {
    issueUpdate(id: $id, input: $input) { success issue { id identifier title url priority } }
  }`;
  const input = {};
  for (const field of ["title", "description", "priority"]) {
    if (args[field] !== undefined && args[field] !== null) input[field] = args[field];
  }
  if (!Object.keys(input).length) return { skipped: true, reason: "No mutable fields supplied" };
  const data = await linearGraphQL(token, query, { id: args.id, input });
  if (!data?.issueUpdate?.success) throw new Error("Linear issueUpdate returned success=false");
  return data.issueUpdate.issue;
}

export async function commentIssue(token, id, body) {
  const issue = await getIssue(token, id);
  if (!issue?.id) throw new Error(`Issue not found: ${id}`);
  const query = `mutation CoordinatorCommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id url } }
  }`;
  const data = await linearGraphQL(token, query, { input: { issueId: issue.id, body } });
  if (!data?.commentCreate?.success) throw new Error("Linear commentCreate returned success=false");
  return data.commentCreate.comment;
}
