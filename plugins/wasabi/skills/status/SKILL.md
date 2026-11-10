---
name: status
description: Show which wasabi installation and organization each wasabi server (Studio, Runtime) of this Claude Code session is connected to, as whom and with which profiles.
---

Call `whoami` on each wasabi server this session has, the Studio's and the
Runtime's, and report in one short paragraph each: the app, the installation
address, the organization (name and slug), the person, their profiles and
their teams.

If the two name different organizations, say so plainly: building in one and
running cases in another is almost never what the person wants, and they fix
it by signing one of them in again (`/mcp`, the server, clear
authentication, authenticate, choose the other organization).

If a server's tool is not available or answers that authentication is
needed, say that it is not signed in and that the person can run `/mcp`,
choose it and authenticate: the browser opens wasabi's login, then asks which
organization to grant.
