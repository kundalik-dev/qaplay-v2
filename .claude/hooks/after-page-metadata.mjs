#!/usr/bin/env node
/**
 * PostToolUse hook (matcher: Skill).
 *
 * After the `page-metadata` skill runs, inject context telling Claude to run the
 * paired `review-page-metadata` skill so every metadata change is validated
 * against the project guidelines. Stays silent for any other skill.
 *
 * Wired in .claude/settings.json -> hooks.PostToolUse.
 */

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  raw += chunk;
});
process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(raw || "{}");
    const toolName = payload.tool_name ?? payload.toolName;
    const toolInput = payload.tool_input ?? payload.toolInput ?? {};
    const skill = toolInput.skill ?? toolInput.name;

    if (toolName === "Skill" && skill === "page-metadata") {
      const additionalContext =
        "The `page-metadata` skill just ran. Now invoke the " +
        "`review-page-metadata` skill to verify the created/changed metadata " +
        "files follow the project guidelines (route-folder placement, naming, " +
        "`../` imports, createPageMetadata usage, SEO rules) before reporting done.";

      process.stdout.write(
        JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PostToolUse",
            additionalContext,
          },
        }),
      );
    }
  } catch {
    // Never block tool flow on a hook parse error.
  }
  process.exit(0);
});
