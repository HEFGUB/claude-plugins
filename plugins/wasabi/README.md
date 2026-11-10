# wasabi for Claude Code

Build and run business apps on wasabi from Claude Code. wasabi has one MCP
server per platform app, and the plugin connects to two:

- **Studio** (`https://studio.<domain>/mcp`): building an app, its artifacts,
  workflows and decisions, compiled, published and released;
- **Runtime** (`https://app.<domain>/mcp`): working in the released apps,
  starting and working cases, reading records.

Each one signs you in with wasabi and acts in the one organization you choose,
as you, with your profiles and teams.

## Install

You need [Bun](https://bun.sh): the plugin's compile check runs with it.
Without it the plugin still works, but Claude Code shows a hook error after
every artifact write.

```text
/plugin marketplace add HEFGUB/claude-plugins
/plugin install wasabi@wasabi
```

It asks for one setting, your installation's domain (your wasabi administrator
knows it): with `example.com`, the Studio is `studio.example.com` and the
Runtime `app.example.com`. Change it later with `/plugin configure
wasabi@wasabi`.

## Sign in

Run `/mcp`, choose `plugin:wasabi:studio` (then `plugin:wasabi:runtime`) and
authenticate. The browser opens wasabi's login, asks which organization to
grant, then says which app the client connects to and what it will do there.
Each server signs in on its own; grant both the same organization.
`/wasabi:status` says where each one is connected.

**Switching organizations** is signing in again: `/mcp` → the server → clear
authentication, then authenticate and choose the other one.

## Who may connect

- Your profiles must allow "Conectar Claude", and open the app (the Studio
  for a builder, the Runtime for anyone working cases).
- The installation's license must include the app's module: `mcp.studio`,
  `mcp.runtime`.
- Revoking the connection in the auth app's Organización page, or losing
  either permission, disconnects Claude at its next call.

## What it carries

- the `studio` and `runtime` MCP servers, each with `whoami` and
  `platform_guide`, and the Studio's `build_app` prompt;
- `/wasabi:build`, the authoring loop and the things that bite;
- `/wasabi:status`;
- a hook that stops on compiler errors after `write_artifact` or
  `patch_artifact` (it runs with Bun).

## Developing it

`claude --plugin-dir plugins/wasabi` loads this directory directly. It does
not prompt for the domain: set it once with `/plugin manage` → `wasabi` →
configure, or both servers are skipped ("Plugin option `domain` isn't set"
in the debug log).

Bump `version` in `.claude-plugin/plugin.json` for every change you want
installed copies to pick up: a pinned version is how Claude Code decides
there is an update.
