---
name: build
description: Build or change a business app on wasabi through the wasabi Studio and Runtime MCP servers - forms and catalogs (artifacts), workflows, decisions, integrations, reports, dashboards - and prove it runs by simulating it and running one real case. Use whenever the user wants to create, edit, fix, publish or test something in their wasabi organization.
---

# Building on wasabi

wasabi has one MCP server per app, each signed in on its own: the **Studio**
(`studio` server: building) and the **Runtime** (`runtime` server: running
cases, tasks, records). Each acts in ONE organization, the one the person
granted, as them, with their profiles. Run `whoami` on both first; if they
name different organizations, say so before anything else.

Each server's own instructions state its rules: the order of the loop, the
approval before building, the values each field type takes, what to do on a
support visit. Follow them; this skill does not repeat them. The platform
guide states the keys, the names and the node shapes. This skill adds which
tool serves each step, what is specific to Claude Code, and which parts of an
answer to act on.

## The loop, tool by tool

1. **Know the platform:** `platform_guide` (outline, then sections). Never
   guess a key or a node shape.
2. **Propose, then wait** for the person's approval.
3. **Build with small edits**, reading what each answers:
   - artifacts: `create_artifact` with its content (an empty file is a
     compiler error), then `patch_artifact` (quote unique anchors; all or
     nothing) or `write_artifact`; after each of the three a hook stops you
     on compiler errors;
   - workflows: `create_workflow`, then `edit_workflow` (ops, `ref`s for new
     nodes); `check_workflow` until `ok`, and read its `notices` (what a first
     case would meet, such as a credential not there yet). A lane names an
     existing team by id, from `list_teams`; a missing team is created by a
     person in the admin app, never by you;
   - decisions: `set_decision_inputs`, `write_decision_node`, until no
     problems;
   - integrations: `manage_integration`, `manage_operation`; a secret is
     typed by the person at the link `connect_credential` answers;
   - reports: `create_report`, `edit_report_model`, `edit_report_design`
     (each answers `checks`, what a release would refuse: fix them now), and
     `report_data` with `preview`;
   - dashboards: `create_dashboard`, `edit_dashboard_model`,
     `edit_dashboard`, then `dashboard_data` (its `warnings` name a number
     card too narrow for its figure).
4. **Compile and simulate:** `compile_artifacts`, then `simulate_workflow`
   with a scenario per main path; `waiting` names the node no answer covered.
5. **Publish and release:** `publish_artifacts`, `release_decision`,
   `release_workflow`, `release_report`, `release_dashboard`.
6. **Run one real case** on the Runtime server: `start_case`, `list_tasks`,
   `read_task`, `work_task`, `read_case` with history, `print_report`.
7. **Ask what to clean up**, listing what the test created. `cancel_case`
   and the `delete_*` tools need `confirm` with the exact name.

## Reading answers

- **A write answers a summary**, not what it wrote: the id, version and
  state, and a `read` hint (`read_workflow id=WF-1`). Make that call when you
  need the whole definition.
- **A refusal is information**: read its message and detail and fix the
  input. `code: 'permission'` names the missing permission; `code: 'secret'`
  means a person types it in the studio.

## Files

A local file stays on disk: `request_upload` answers a URL, send it with the
`curl` line it gives (Bash), then `confirm_upload`. `upload_file` (base64,
5 MB) is for when there is no shell.
