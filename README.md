# wasabi plugins for Claude Code

The Claude Code marketplace for wasabi. It holds one plugin, `wasabi`, which
connects Claude Code to a wasabi installation so Claude can build business apps
in the Studio and work cases in the Runtime, as you, in the organization you
choose.

```text
/plugin marketplace add HEFGUB/claude-plugins
/plugin install wasabi@wasabi
```

See [plugins/wasabi](plugins/wasabi/README.md) for signing in and what the
plugin carries.

In claude.ai or Claude Desktop you need no plugin: add the installation's
servers as custom connectors, `https://studio.<domain>/mcp` and
`https://app.<domain>/mcp`.

The code is public so anyone can read and use it; it is not open source. See
[LICENSE](LICENSE): use it unmodified, do not distribute changed copies.
