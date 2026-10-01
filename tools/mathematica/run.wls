(* Local adapter: no server; existing packages only. *)
Unprotect[PacletInstall]; Clear[PacletInstall];
PacletInstall[name_String, ___] := Module[{p = PacletFind[name]},
 If[Length[p] > 0, First[p], WriteString["stderr", "Missing installed package: " <> name <> "\n"]; Exit[3]]];
Protect[PacletInstall];
If[!MemberQ[(#["Version"] & /@ PacletFind["Wolfram/AgentTools"]), "2.2.0"], Exit[3]];
Get["/home/cornholio/.Wolfram/Paclets/Repository/Wolfram__AgentTools-2.2.0/Kernel/AgentToolsLoader.wl"];
request = Import[Last[$ScriptCommandLine], "RawJSON"];
If[request["tool"] === "ReadNotebook", WriteString["stderr", "Use the dispatcher static-source reader; notebook import is disabled\n"]; Exit[2]];
stateRoot = Environment["WOLFRAM_DIRECT_INVOCATION_ROOT"];
If[!StringQ[stateRoot] || !StringStartsQ[stateRoot, "/"] || !DirectoryQ[stateRoot] || !StringStartsQ[FileNameTake[stateRoot], "run-"],
 WriteString["stderr", "Missing private invocation state root\n"]; Exit[2]];
Block[{
 Wolfram`AgentTools`Common`$rootPath = stateRoot,
 Wolfram`AgentTools`Tools`WolframLanguageEvaluator`Private`$maxSessionCount = Infinity,
 Wolfram`AgentTools`Tools`WolframLanguageEvaluator`Private`$maxSessionBytes = Infinity,
 Wolfram`AgentTools`Tools`WolframLanguageEvaluator`Private`$maxSessionAge = None
 },
 tool = Wolfram`AgentTools`$DefaultMCPTools[request["tool"]];
 If[!MatchQ[tool, _LLMTool], Exit[3]];
 result = tool[request["arguments"]];
];
If[request["tool"] === "WriteNotebook" && !FileExistsQ[request["arguments"]["file"]],
 WriteString["stderr", "Notebook write failed\n"]; Exit[1]];
post[r_String] := r;
post[KeyValuePattern["String" -> r_String]] := r;
post[KeyValuePattern["Content" -> r_]] := post[r];
post[c : {KeyValuePattern["type" -> _String] ...}] := StringJoin[post /@ c];
post[KeyValuePattern[{"type" -> "text", "text" -> r_String}]] := r;
post[KeyValuePattern["type" -> "image"]] := "[Image result: export a PNG explicitly to inspect it]\n";
post[f_Failure] := (WriteString["stderr", ToString[f, InputForm]]; Exit[1]);
post[r_] := (WriteString["stderr", "Unexpected tool result: " <> ToString[r, InputForm]]; Exit[1]);
answer = post[result];
If[request["tool"] === "WriteNotebook" && StringTrim[answer] =!= request["arguments"]["file"], WriteString["stderr",answer]; Exit[1]];
WriteString["stdout", answer];
