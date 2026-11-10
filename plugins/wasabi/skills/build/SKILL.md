---
name: build
description: Build or change a business app on wasabi through the wasabi Studio and Runtime MCP servers - forms and catalogs (artifacts), workflows, decisions, integrations, reports - and prove it runs by simulating it and running one real case. Use whenever the user wants to create, edit, fix, publish or test something in their wasabi organization.
---

# Building on wasabi

wasabi has one MCP server per app, each signed in on its own: the **Studio**
(`studio` server: building) and the **Runtime** (`runtime` server: running
cases, tasks, records). Each acts in ONE organization, the one the person
granted, as them, with their profiles. Run `whoami` on both first; if they
name different organizations, say so before anything else.

The Studio server's own instructions state the loop; this skill adds what is
specific to Claude Code.

## The loop

1. **Know the platform.** `platform_guide` (outline, then sections). Never
   guess a key or a node shape.
2. **Propose, then wait.** The domain model (forms, fields, catalogs,
   browsers) and the processes (workflows, lanes, decisions, integrations,
   reports). Build nothing before the person approves.
3. **Build with small edits** and read what each answers:
   - artifacts: `create_artifact`, then `patch_artifact` (quote unique
     anchors; all or nothing); a hook stops you on compiler errors;
   - workflows: `create_workflow`, then `edit_workflow` (ops, `ref`s for new
     nodes); `check_workflow` until `ok`;
   - decisions: `set_decision_inputs`, `write_decision_node`, until no
     problems;
   - integrations: `manage_integration`, `manage_operation`; a secret is
     typed by the person at the link `connect_credential` answers;
   - reports: `create_report`, `edit_report_model`, `edit_report_design`,
     `report_data preview`.
4. **Simulate** each main path with `simulate_workflow` and a scenario per
   path. `waiting` names the node that needs an answer.
5. **Publish and release:** `publish_artifacts`, `release_decision`,
   `release_workflow`, `release_report`.
6. **Run one real case** on the Runtime server: `start_case`, `list_tasks`,
   `work_task`, `read_case` with history, `print_report`.
7. **Ask what to clean up**, listing what the test created. `cancel_case`
   and the `delete_*` tools need `confirm` with the exact name.

## Files

A local file stays on disk: `request_upload` answers a URL, send it with the
`curl` line it gives (Bash), then `confirm_upload`. `upload_file` (base64,
5 MB) is for when there is no shell.

## Things that bite

- **Money and decimals are strings** (`"1234.50"`), never JSON numbers.
- **Reference workflows by name**, never by a generated id.
- **Artifact names are paths without the extension** (`ventas/pedido`).
- **A refusal is information**: read the message and its detail and fix the
  input. `code: 'permission'` names the missing permission; `code: 'secret'`
  means a person types it in the studio.
- **You act as the person.** If their profiles do not allow something, say
  so rather than looking for a way around it.
