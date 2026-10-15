# AXLE Admin Console Standard v0.1

What a proper AXLE must have. AXLE is REKA's operator console for a product: it runs the platform (tenants, people,
features, AI, operations), it is never one of the tenants, and nothing in it is visible to them.

Built from the REKA projects that had an AXLE (Angka, AntaraX Frame, Janka, PLExyz Grid, PLExyz Crowd, YARA, YARA One,
ISO Document Generator, Entangled Particles), the Platform Core Standard v0.1 (tiers C1 to C4), and the cross-project
corrections. Where an item came from a correction, the project is named.

**How to read it.** Every item has a tier:

| Tier | Means |
|---|---|
| **Always** | Every AXLE, from the first release |
| **Tenants** | When the product has more than one client organisation (Platform Core C1) |
| **AI** | When the product uses AI (modifier MD2) |
| **Billing** | When the product bills inside itself (Platform Core C2); otherwise show plan or edition only |
| **Later** | Add when a client, regulation or scale needs it (Platform Core C3 and C4) |

## The shape of it

<!-- diagram: layers | AXLE-01 · Two planes: AXLE runs the platform, tenants use the product
arrows: off
layer: AXLE · platform plane (REKA only) | am
- Overview and health | real numbers
- Tenants and people | lifecycle, roles
- Features and plans | modules, quotas
- AI | providers, routes, cost
- Operations | jobs, alerts, audit
layer: Tenant plane (each client sees only its own) | te
- Tenant admin | members, settings
- Product app | the daily work
- Client portal | requests, status
layer: Never crosses from AXLE to tenants | co
- Model names, traces | prompts, costs
- Other tenants | data, names
- Internal notes | support context
-->
![AXLE-01 · Two planes: AXLE runs the platform, tenants use the product](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4NjAgMzEyIiBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9ImxheWVycyI+PGRlZnM+PG1hcmtlciBpZD0ibTFfZyIgbWFya2VyV2lkdGg9IjkiIG1hcmtlckhlaWdodD0iOSIgcmVmWD0iNyIgcmVmWT0iNC41IiBvcmllbnQ9ImF1dG8iPjxwYXRoIGQ9Ik0wLDAgTDksNC41IEwwLDkgWiIgZmlsbD0iIzlBOUE5QSIvPjwvbWFya2VyPjxtYXJrZXIgaWQ9Im0xX3QiIG1hcmtlcldpZHRoPSI5IiBtYXJrZXJIZWlnaHQ9IjkiIHJlZlg9IjciIHJlZlk9IjQuNSIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCwwIEw5LDQuNSBMMCw5IFoiIGZpbGw9IiMwZjZlNTYiLz48L21hcmtlcj48bWFya2VyIGlkPSJtMV9jIiBtYXJrZXJXaWR0aD0iOSIgbWFya2VySGVpZ2h0PSI5IiByZWZYPSI3IiByZWZZPSI0LjUiIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAsMCBMOSw0LjUgTDAsOSBaIiBmaWxsPSIjOWEzZDFlIi8+PC9tYXJrZXI+PG1hcmtlciBpZD0ibTFfbyIgbWFya2VyV2lkdGg9IjkiIG1hcmtlckhlaWdodD0iOSIgcmVmWD0iNyIgcmVmWT0iNC41IiBvcmllbnQ9ImF1dG8iPjxwYXRoIGQ9Ik0wLDAgTDksNC41IEwwLDkgWiIgZmlsbD0iI0ZCOTgwMCIvPjwvbWFya2VyPjxtYXJrZXIgaWQ9Im0xX3AiIG1hcmtlcldpZHRoPSI5IiBtYXJrZXJIZWlnaHQ9IjkiIHJlZlg9IjciIHJlZlk9IjQuNSIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCwwIEw5LDQuNSBMMCw5IFoiIGZpbGw9IiM2MDQwQ0MiLz48L21hcmtlcj48L2RlZnM+PHJlY3QgeD0iMTQiIHk9IjEwIiB3aWR0aD0iODMyIiBoZWlnaHQ9IjgyIiByeD0iMTAiIGZpbGw9IiNmZGYxZGQiIGZpbGwtb3BhY2l0eT0iMC4zNSIgc3Ryb2tlPSIjOGE1NTAwIiBzdHJva2Utd2lkdGg9IjAuOCIgc3Ryb2tlLWRhc2hhcnJheT0iNiA0Ii8+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSI5IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iMSIgZmlsbD0iIzhhNTUwMCIgeD0iMjYiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ic3RhcnQiPkFYTEUgwrcgUExBVEZPUk0gUExBTkUgKFJFS0EgT05MWSk8L3RleHQ+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsMzYpIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQ0IiByeD0iOCIgZmlsbD0iI2ZkZjFkZCIgc3Ryb2tlPSIjRkI5ODAwIiBzdHJva2Utd2lkdGg9IjEuOCIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iNzUiIHk9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5PdmVydmlldyBhbmQgaGVhbHRoPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOC41IiBmaWxsPSIjNTY1MjRhIiB4PSI3NSIgeT0iMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnJlYWwgbnVtYmVyczwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkyLDM2KSI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSI0NCIgcng9IjgiIGZpbGw9IiNmZGYxZGQiIHN0cm9rZT0iI0ZCOTgwMCIgc3Ryb2tlLXdpZHRoPSIxLjgiLz48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjExLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxRDFEMUQiIHg9Ijc1IiB5PSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VGVuYW50cyBhbmQgcGVvcGxlPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOC41IiBmaWxsPSIjNTY1MjRhIiB4PSI3NSIgeT0iMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmxpZmVjeWNsZSwgcm9sZXM8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM1NSwzNikiPjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iNDQiIHJ4PSI4IiBmaWxsPSIjZmRmMWRkIiBzdHJva2U9IiNGQjk4MDAiIHN0cm9rZS13aWR0aD0iMS44Ii8+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMS41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMUQxRDFEIiB4PSI3NSIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZlYXR1cmVzIGFuZCBwbGFuczwvdGV4dD48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjguNSIgZmlsbD0iIzU2NTI0YSIgeD0iNzUiIHk9IjMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5tb2R1bGVzLCBxdW90YXM8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUxNywzNikiPjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iNDQiIHJ4PSI4IiBmaWxsPSIjZmRmMWRkIiBzdHJva2U9IiNGQjk4MDAiIHN0cm9rZS13aWR0aD0iMS44Ii8+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMS41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMUQxRDFEIiB4PSI3NSIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFJPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOC41IiBmaWxsPSIjNTY1MjRhIiB4PSI3NSIgeT0iMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnByb3ZpZGVycywgcm91dGVzLCBjb3N0PC90ZXh0PjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2ODAsMzYpIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQ0IiByeD0iOCIgZmlsbD0iI2ZkZjFkZCIgc3Ryb2tlPSIjRkI5ODAwIiBzdHJva2Utd2lkdGg9IjEuOCIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iNzUiIHk9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5PcGVyYXRpb25zPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOC41IiBmaWxsPSIjNTY1MjRhIiB4PSI3NSIgeT0iMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmpvYnMsIGFsZXJ0cywgYXVkaXQ8L3RleHQ+PC9nPjxyZWN0IHg9IjE0IiB5PSIxMTQiIHdpZHRoPSI4MzIiIGhlaWdodD0iODIiIHJ4PSIxMCIgZmlsbD0iI2UzZjNlYyIgZmlsbC1vcGFjaXR5PSIwLjM1IiBzdHJva2U9IiMwZjZlNTYiIHN0cm9rZS13aWR0aD0iMC44IiBzdHJva2UtZGFzaGFycmF5PSI2IDQiLz48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjkiIGZvbnQtd2VpZ2h0PSI3MDAiIGxldHRlci1zcGFjaW5nPSIxIiBmaWxsPSIjMGY2ZTU2IiB4PSIyNiIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ic3RhcnQiPlRFTkFOVCBQTEFORSAoRUFDSCBDTElFTlQgU0VFUyBPTkxZIElUUyBPV04pPC90ZXh0PjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2MywxNDApIj48cmVjdCB3aWR0aD0iMTcwIiBoZWlnaHQ9IjQ0IiByeD0iOCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjYjBkOWNlIiBzdHJva2Utd2lkdGg9IjEuMyIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iODUiIHk9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UZW5hbnQgYWRtaW48L3RleHQ+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSI4LjUiIGZpbGw9IiM1NjUyNGEiIHg9Ijg1IiB5PSIzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+bWVtYmVycywgc2V0dGluZ3M8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM0NSwxNDApIj48cmVjdCB3aWR0aD0iMTcwIiBoZWlnaHQ9IjQ0IiByeD0iOCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjYjBkOWNlIiBzdHJva2Utd2lkdGg9IjEuMyIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iODUiIHk9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9kdWN0IGFwcDwvdGV4dD48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjguNSIgZmlsbD0iIzU2NTI0YSIgeD0iODUiIHk9IjMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj50aGUgZGFpbHkgd29yazwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTI3LDE0MCkiPjxyZWN0IHdpZHRoPSIxNzAiIGhlaWdodD0iNDQiIHJ4PSI4IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNiMGQ5Y2UiIHN0cm9rZS13aWR0aD0iMS4zIi8+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMS41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMUQxRDFEIiB4PSI4NSIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNsaWVudCBwb3J0YWw8L3RleHQ+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSI4LjUiIGZpbGw9IiM1NjUyNGEiIHg9Ijg1IiB5PSIzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+cmVxdWVzdHMsIHN0YXR1czwvdGV4dD48L2c+PHJlY3QgeD0iMTQiIHk9IjIxOCIgd2lkdGg9IjgzMiIgaGVpZ2h0PSI4MiIgcng9IjEwIiBmaWxsPSIjZjdlNmRkIiBmaWxsLW9wYWNpdHk9IjAuMzUiIHN0cm9rZT0iIzlhM2QxZSIgc3Ryb2tlLXdpZHRoPSIwLjgiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOSIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9IjEiIGZpbGw9IiM5YTNkMWUiIHg9IjI2IiB5PSIyMzQiIHRleHQtYW5jaG9yPSJzdGFydCI+TkVWRVIgQ1JPU1NFUyBGUk9NIEFYTEUgVE8gVEVOQU5UUzwvdGV4dD48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNjMsMjQ0KSI+PHJlY3Qgd2lkdGg9IjE3MCIgaGVpZ2h0PSI0NCIgcng9IjgiIGZpbGw9IiNmN2U2ZGQiIHN0cm9rZT0iIzlhM2QxZSIgc3Ryb2tlLXdpZHRoPSIxLjQiLz48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjExLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxRDFEMUQiIHg9Ijg1IiB5PSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TW9kZWwgbmFtZXMsIHRyYWNlczwvdGV4dD48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjguNSIgZmlsbD0iIzU2NTI0YSIgeD0iODUiIHk9IjMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5wcm9tcHRzLCBjb3N0czwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQ1LDI0NCkiPjxyZWN0IHdpZHRoPSIxNzAiIGhlaWdodD0iNDQiIHJ4PSI4IiBmaWxsPSIjZjdlNmRkIiBzdHJva2U9IiM5YTNkMWUiIHN0cm9rZS13aWR0aD0iMS40Ii8+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMS41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMUQxRDFEIiB4PSI4NSIgeT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk90aGVyIHRlbmFudHM8L3RleHQ+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSI4LjUiIGZpbGw9IiM1NjUyNGEiIHg9Ijg1IiB5PSIzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+ZGF0YSwgbmFtZXM8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUyNywyNDQpIj48cmVjdCB3aWR0aD0iMTcwIiBoZWlnaHQ9IjQ0IiByeD0iOCIgZmlsbD0iI2Y3ZTZkZCIgc3Ryb2tlPSIjOWEzZDFlIiBzdHJva2Utd2lkdGg9IjEuNCIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iODUiIHk9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbnRlcm5hbCBub3RlczwvdGV4dD48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjguNSIgZmlsbD0iIzU2NTI0YSIgeD0iODUiIHk9IjMzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5zdXBwb3J0IGNvbnRleHQ8L3RleHQ+PC9nPjwvc3ZnPgo=)

<!-- diagram: flow | AXLE-02 · A tenant's life in AXLE
lane: Platform admin | am
steps: *Create tenant | plan, modules > Invite first owner > +Owner accepts > *Active > ?Problem? >yes> Suspend | with reason > Restore
lane: Ending | co
steps: Deletion request > Export offered > Cooling-off > !Scheduled deletion > Completion record
-->
![AXLE-02 · A tenant's life in AXLE](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4NjAgMjk0IiBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9ImZsb3ciPjxkZWZzPjxtYXJrZXIgaWQ9Im0yX2ciIG1hcmtlcldpZHRoPSI5IiBtYXJrZXJIZWlnaHQ9IjkiIHJlZlg9IjciIHJlZlk9IjQuNSIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCwwIEw5LDQuNSBMMCw5IFoiIGZpbGw9IiM5QTlBOUEiLz48L21hcmtlcj48bWFya2VyIGlkPSJtMl90IiBtYXJrZXJXaWR0aD0iOSIgbWFya2VySGVpZ2h0PSI5IiByZWZYPSI3IiByZWZZPSI0LjUiIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAsMCBMOSw0LjUgTDAsOSBaIiBmaWxsPSIjMGY2ZTU2Ii8+PC9tYXJrZXI+PG1hcmtlciBpZD0ibTJfYyIgbWFya2VyV2lkdGg9IjkiIG1hcmtlckhlaWdodD0iOSIgcmVmWD0iNyIgcmVmWT0iNC41IiBvcmllbnQ9ImF1dG8iPjxwYXRoIGQ9Ik0wLDAgTDksNC41IEwwLDkgWiIgZmlsbD0iIzlhM2QxZSIvPjwvbWFya2VyPjxtYXJrZXIgaWQ9Im0yX28iIG1hcmtlcldpZHRoPSI5IiBtYXJrZXJIZWlnaHQ9IjkiIHJlZlg9IjciIHJlZlk9IjQuNSIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMCwwIEw5LDQuNSBMMCw5IFoiIGZpbGw9IiNGQjk4MDAiLz48L21hcmtlcj48bWFya2VyIGlkPSJtMl9wIiBtYXJrZXJXaWR0aD0iOSIgbWFya2VySGVpZ2h0PSI5IiByZWZYPSI3IiByZWZZPSI0LjUiIG9yaWVudD0iYXV0byI+PHBhdGggZD0iTTAsMCBMOSw0LjUgTDAsOSBaIiBmaWxsPSIjNjA0MENDIi8+PC9tYXJrZXI+PC9kZWZzPjxyZWN0IHg9IjE0IiB5PSIxMiIgd2lkdGg9IjgzMiIgaGVpZ2h0PSIxNzAiIGZpbGw9IiNmZGYxZGQiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSI5IiBsZXR0ZXItc3BhY2luZz0iMC41IiBmaWxsPSIjOGE1NTAwIiB4PSIyMiIgeT0iMjgiIHRleHQtYW5jaG9yPSJzdGFydCI+UExBVEZPUk0gQURNSU48L3RleHQ+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsNDQpIj48cmVjdCB3aWR0aD0iMTA2IiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2ZkZjFkZCIgc3Ryb2tlPSIjRkI5ODAwIiBzdHJva2Utd2lkdGg9IjEuOCIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iNTMiIHk9IjIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DcmVhdGUgdGVuYW50PC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOC41IiBmaWxsPSIjNTY1MjRhIiB4PSI1MyIgeT0iMzQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnBsYW4sIG1vZHVsZXM8L3RleHQ+PC9nPjxwb2x5bGluZSBwb2ludHM9IjEzNiw2NyAxNjksNjciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlBOUE5QSIgc3Ryb2tlLXdpZHRoPSIxLjUiIG1hcmtlci1lbmQ9InVybCgjbTJfZykiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNjksNDQpIj48cmVjdCB3aWR0aD0iMTA2IiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZDBjZWNhIiBzdHJva2Utd2lkdGg9IjEuNCIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iNTMiIHk9IjI3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbnZpdGUgZmlyc3Qgb3duZXI8L3RleHQ+PC9nPjxwb2x5bGluZSBwb2ludHM9IjI3NSw2NyAzMDgsNjciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlBOUE5QSIgc3Ryb2tlLXdpZHRoPSIxLjUiIG1hcmtlci1lbmQ9InVybCgjbTJfZykiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMDgsNDQpIj48cmVjdCB3aWR0aD0iMTA2IiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2UzZjNlYyIgc3Ryb2tlPSIjMGY2ZTU2IiBzdHJva2Utd2lkdGg9IjEuNSIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iNTMiIHk9IjI3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Pd25lciBhY2NlcHRzPC90ZXh0PjwvZz48cG9seWxpbmUgcG9pbnRzPSI0MTQsNjcgNDQ2LDY3IiBmaWxsPSJub25lIiBzdHJva2U9IiM5QTlBOUEiIHN0cm9rZS13aWR0aD0iMS41IiBtYXJrZXItZW5kPSJ1cmwoI20yX2cpIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDQ2LDQ0KSI+PHJlY3Qgd2lkdGg9IjEwNiIgaGVpZ2h0PSI0NiIgcng9IjgiIGZpbGw9IiNmZGYxZGQiIHN0cm9rZT0iI0ZCOTgwMCIgc3Ryb2tlLXdpZHRoPSIxLjgiLz48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjExLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxRDFEMUQiIHg9IjUzIiB5PSIyNyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QWN0aXZlPC90ZXh0PjwvZz48cG9seWxpbmUgcG9pbnRzPSI1NTIsNjcgNTg1LDY3IiBmaWxsPSJub25lIiBzdHJva2U9IiM5QTlBOUEiIHN0cm9rZS13aWR0aD0iMS41IiBtYXJrZXItZW5kPSJ1cmwoI20yX2cpIi8+PHBvbHlnb24gcG9pbnRzPSI1OTIuMiw2Nyw2MzguMiw0NCw2ODQuMiw2Nyw2MzguMiw5MCIgZmlsbD0iI2ZiZWVkNSIgc3Ryb2tlPSIjOGE1ODAwIiBzdHJva2Utd2lkdGg9IjEuNSIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzhhNTgwMCIgeD0iNjM4IiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvYmxlbT88L3RleHQ+PHBvbHlsaW5lIHBvaW50cz0iNjg0LDY3IDcyNCw2NyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOUE5QTlBIiBzdHJva2Utd2lkdGg9IjEuNSIgbWFya2VyLWVuZD0idXJsKCNtMl9nKSIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iIzlBOUE5QSIgc3Ryb2tlPSIjRjdGNkYzIiBzdHJva2Utd2lkdGg9IjMiIHBhaW50LW9yZGVyPSJzdHJva2UiIHg9IjcwNCIgeT0iNTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnllczwvdGV4dD48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MjQsNDQpIj48cmVjdCB3aWR0aD0iMTA2IiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZDBjZWNhIiBzdHJva2Utd2lkdGg9IjEuNCIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iNTMiIHk9IjIxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TdXNwZW5kPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOC41IiBmaWxsPSIjNTY1MjRhIiB4PSI1MyIgeT0iMzQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPndpdGggcmVhc29uPC90ZXh0PjwvZz48cG9seWxpbmUgcG9pbnRzPSI3NzcsOTAgNzc3LDEyMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOUE5QTlBIiBzdHJva2Utd2lkdGg9IjEuNSIgbWFya2VyLWVuZD0idXJsKCNtMl9nKSIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcyNCwxMjIpIj48cmVjdCB3aWR0aD0iMTA2IiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZDBjZWNhIiBzdHJva2Utd2lkdGg9IjEuNCIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iNTMiIHk9IjI3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5SZXN0b3JlPC90ZXh0PjwvZz48cmVjdCB4PSIxNCIgeT0iMTkyIiB3aWR0aD0iODMyIiBoZWlnaHQ9IjkyIiBmaWxsPSIjZjdlNmRkIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOSIgbGV0dGVyLXNwYWNpbmc9IjAuNSIgZmlsbD0iIzlhM2QxZSIgeD0iMjIiIHk9IjIwOCIgdGV4dC1hbmNob3I9InN0YXJ0Ij5FTkRJTkc8L3RleHQ+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsMjI0KSI+PHJlY3Qgd2lkdGg9IjEwNiIgaGVpZ2h0PSI0NiIgcng9IjgiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2QwY2VjYSIgc3Ryb2tlLXdpZHRoPSIxLjQiLz48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMUQxRDFEIiB4PSI1MyIgeT0iMjciIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRlbGV0aW9uIHJlcXVlc3Q8L3RleHQ+PC9nPjxwb2x5bGluZSBwb2ludHM9IjEzNiwyNDcgMTY5LDI0NyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOUE5QTlBIiBzdHJva2Utd2lkdGg9IjEuNSIgbWFya2VyLWVuZD0idXJsKCNtMl9nKSIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2OSwyMjQpIj48cmVjdCB3aWR0aD0iMTA2IiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZDBjZWNhIiBzdHJva2Utd2lkdGg9IjEuNCIvPjx0ZXh0IGZvbnQtZmFtaWx5PSInUG9wcGlucycsc3lzdGVtLXVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iNTMiIHk9IjI3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FeHBvcnQgb2ZmZXJlZDwvdGV4dD48L2c+PHBvbHlsaW5lIHBvaW50cz0iMjc1LDI0NyAzMDgsMjQ3IiBmaWxsPSJub25lIiBzdHJva2U9IiM5QTlBOUEiIHN0cm9rZS13aWR0aD0iMS41IiBtYXJrZXItZW5kPSJ1cmwoI20yX2cpIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzA4LDIyNCkiPjxyZWN0IHdpZHRoPSIxMDYiIGhlaWdodD0iNDYiIHJ4PSI4IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNkMGNlY2EiIHN0cm9rZS13aWR0aD0iMS40Ii8+PHRleHQgZm9udC1mYW1pbHk9IidQb3BwaW5zJyxzeXN0ZW0tdWksc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMS41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMUQxRDFEIiB4PSI1MyIgeT0iMjciIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNvb2xpbmctb2ZmPC90ZXh0PjwvZz48cG9seWxpbmUgcG9pbnRzPSI0MTQsMjQ3IDQ0NiwyNDciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlBOUE5QSIgc3Ryb2tlLXdpZHRoPSIxLjUiIG1hcmtlci1lbmQ9InVybCgjbTJfZykiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NDYsMjI0KSI+PHJlY3Qgd2lkdGg9IjEwNiIgaGVpZ2h0PSI0NiIgcng9IjgiIGZpbGw9IiNmN2U2ZGQiIHN0cm9rZT0iIzlhM2QxZSIgc3Ryb2tlLXdpZHRoPSIxLjQiLz48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjkiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxRDFEMUQiIHg9IjUzIiB5PSIyNyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2NoZWR1bGVkIGRlbGV0aW9uPC90ZXh0PjwvZz48cG9seWxpbmUgcG9pbnRzPSI1NTIsMjQ3IDU4NSwyNDciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlBOUE5QSIgc3Ryb2tlLXdpZHRoPSIxLjUiIG1hcmtlci1lbmQ9InVybCgjbTJfZykiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1ODUsMjI0KSI+PHJlY3Qgd2lkdGg9IjEwNiIgaGVpZ2h0PSI0NiIgcng9IjgiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2QwY2VjYSIgc3Ryb2tlLXdpZHRoPSIxLjQiLz48dGV4dCBmb250LWZhbWlseT0iJ1BvcHBpbnMnLHN5c3RlbS11aSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjkuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFEMUQxRCIgeD0iNTMiIHk9IjI3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Db21wbGV0aW9uIHJlY29yZDwvdGV4dD48L2c+PC9zdmc+Cg==)

## A. Access and separation

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| A1 | Its own address (an `axle.` subdomain or `/axle`) and its own sign-in; tenant users can never reach it | Always | Entangled Particles: "it should be /axle"; YARA: `/login` was tenant-specific |
| A2 | Platform roles separate from tenant roles: Super Admin, Operations, Support, Finance, Security, Read-only Auditor. One person may hold several | Always | Platform Core C1; YARA: "properly separate Tenants, Users and AXLE Admins" |
| A3 | REKA is the operator, not a tenant. REKA's own demo organisation is an ordinary tenant | Always | YARA: AXLE "viewing REKA itself as an operating company, which it should not" |
| A4 | Nothing internal reaches tenants: model names, traces, prompts, AI cost, sandbox notices, internal notes | Always | NexusTAC and ISO generator: "trace is only for AXLE, NexusTAC should not see" |
| A5 | At least two platform admins on company accounts, MFA required for platform admins (rule R20) | Always | Janka and Entangled Particles: AXLE login lost and asked for twice |
| A6 | Company-first tenant URLs and sign-in, with the tenant's name and logo, never another client's | Tenants | YARA: "why is the login still BRIC specific?" |

## B. Overview and health (the first screen)

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| B1 | A visual overview from real data: tenants by status, active users, sign-ups, AI usage and cost this month, failed jobs, open alerts, recent sensitive actions | Always | Most repeated correction: "too plain, too many words, too little visual" |
| B2 | Every card clicks through to the filtered list behind its number, and the number matches a count taken from the database | Always | Module standard; Angka and YARA: "numbers and figures intact and reflected off each other" |
| B3 | A health card: app, database, sign-in, storage, email, AI providers, deployed version, last backup, last scheduled job | Always | Platform Core C3; ISO generator health card |
| B4 | Useful when empty: a new platform says what to do first | Always | Janka: pages with no description or guide |

## C. Tenants (organisations)

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| C1 | Tenant list with search, filter, sort, bulk actions, stats strip and export | Tenants | Module standard, every list page |
| C2 | Create a tenant in one guided flow: name and address, plan or edition, modules, first owner invite, demo data yes or no | Tenants | PLExyz Grid and Janka: tenants set up by hand |
| C3 | Lifecycle with clear statuses: trial, active, restricted, suspended, cancelled, pending deletion | Tenants | Platform Core C1 |
| C4 | Suspend with a reason, reversible, logged; suspended users cannot sign in and see a clear message | Tenants | Module standard check |
| C5 | Deletion in stages: request, export offered, cooling-off, scheduled deletion, completion record. Never an instant hard delete | Tenants | Platform Core C1 |
| C6 | Tenant 360 page: profile, plan, users, modules, usage, AI usage, integrations, recent errors, internal notes, one timeline | Tenants | Platform Core C4; support needs one place |
| C7 | Tenant branding where the product supports it (logo, colours, sender name) | Later | Janka: branding not reflected throughout |

## D. People

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| D1 | Platform admins page, separate from tenant users | Always | A2 |
| D2 | Users across tenants: search, status, last sign-in, role in each tenant, lock and unlock, revoke sessions, resend sign-in | Tenants | Janka: AXLE "only manages AI, not users, teams, features, orgs" |
| D3 | Invites with mandatory email, single-use expiring link, resend, revoke, status; the user lands in the right tenant and role | Always | YARA: invite journey unclear |
| D4 | A tenant always keeps at least one owner; ownership transfer is a logged action | Tenants | Platform Core C1 |

## E. Features, plans and limits

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| E1 | Every client-driven feature classified as core, configurable, module or flag (rule R13), with per-tenant switches | Tenants | YARA tier model; Janka: client-specific screens must be flags |
| E2 | "Why does this tenant have, or not have, this feature?" answered on screen (resolution order: global off, tenant off, tenant on, plan, default) | Tenants | Platform Core C1 |
| E3 | Plans or editions with what each includes; billing outside the product shows the edition only (Basic, Full) | Always | Platform Core C2 variant |
| E4 | Quotas and limits per tenant, with an override that needs a reason and is logged | Tenants | AntaraX Frame: "I still don't see the admin ability to give more quota" |
| E5 | A global off switch for any module and a maintenance mode with a notice to users | Later | Platform Core C3 |

## F. AI management

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| F1 | Providers and keys: keys kept in the vault, shown masked, test connection, rotate | AI | Angka, Janka, YARA One, ISO generator: switchable providers asked for in every AI product |
| F2 | Model per task, with a default and a fallback chain; automatic switch on provider outage, with an on and off toggle | AI | ISO generator: auto-switching on outage; "Gemini 3 and above, 2.5 is deprecated" |
| F3 | AI on or off per tenant, and per-tenant model override | AI | Angka: per-tenant override |
| F4 | Usage, performance and cost per tenant, per task and per model, with monthly budgets and alerts | AI | YARA One: "AI models managed in AXLE with usage, performance and cost" |
| F5 | Live trace and request log, AXLE only | AI | ISO generator live trace; A4 |
| F6 | Prompt and configuration versions with a change log; quality and learning results (feedback captured, evaluation scores) | AI | ISO generator learning and scorecard; Angka "keep the AI framework document current" |

## G. Platform content and settings

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| G1 | The libraries the platform owns (templates, catalogues, device types), with versions and a release step | Later | ISO generator library; PLExyz Crowd device catalogue |
| G2 | Global settings: e-mail templates and sender, legal texts, regions and time zones, branding of AXLE itself | Always | Theme spec files in AntaraX and YARA |

## H. Operations and support

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| H1 | Background jobs and webhooks: failures with a safe error message, retry, cancel | Always | Platform Core C3 |
| H2 | Operator alerts by e-mail and in-app (failures, budget, health), with thresholds | Always | ISO generator failure alerts |
| H3 | Backups: last backup, last restore drill, where they are kept (continuity C6) | Always | Handover Readiness Standard |
| H4 | Support context and tickets per tenant; internal notes never visible to the tenant | Tenants | Platform Core C3 |
| H5 | Global search across tenants, users and records, by permission | Later | Platform Core C3 |
| H6 | Announcements to tenants: draft, audience, schedule, delivery status | Later | Platform Core C3 |
| H7 | Controlled support access (sign in as a user) only if the product needs it: reason, banner, auto-expiry, every action logged, sensitive actions blocked | Later | Platform Core C3 |

## I. Analytics

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| I1 | Adoption: active tenants and users over time, feature use per tenant, who stopped using it | Always | Angka: adoption analytics returned to 8 times |
| I2 | Service measures: response times, errors, uptime against the targets promised | Later | ISO generator service measures |
| I3 | Revenue, invoices, failed payments | Billing | Platform Core C2 |

## J. Audit and security

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| J1 | Audit log of every admin action: who, what, when, before and after, reason; filter and export | Always | Module standard; readiness D3 |
| J2 | Sign-in activity, failed sign-ins, active sessions, MFA status | Later | Platform Core C4 |
| J3 | Data exports and deletion requests with approval, expiring links, download log | Later | Platform Core C4 |

## K. Demo, access and onboarding

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| K1 | Demo data switch, clearly labelled, off by default; switching off leaves no demo rows | Always | KITAR AI, Tinara |
| K2 | Demo tenants per prospect, rich enough to test with (at least one realistic record on every screen) | Tenants | Janka: "demo account is too useless"; PLExyz Grid demo orgs per audience |
| K3 | An access page: the link to every surface (AXLE, tenant app, client portal) per environment, and which test account to use. Passwords never shown | Always | Asked for 5 times in YARA, and in every multi-surface project |

## L. How every AXLE page behaves

| # | AXLE must have | Tier | Why |
|---|---|---|---|
| L1 | Left navigation grouped by area that works on a phone, and AXLE on a phone shows AXLE, not the user app | Always | AntaraX Frame: "AXLE mobile shows the user app" |
| L2 | Every page: title, one-line description, a short guide, a useful empty state | Always | Janka: "no proper description or explanation for each page" |
| L3 | Every list: search, filter, sort, group, bulk actions, stats strip, CSV export | Always | Janka, YARA; "I don't see the bulk delete" (AntaraX Frame) |
| L4 | Visual first: numbers as tiles and charts, not paragraphs | Always | Correction rank 2 |
| L5 | The same design system as the product (fonts, tables, buttons, search), with a clear AXLE mark so nobody confuses the two | Always | Angka and Janka: "harmonize all of it", "apply the same standardization to AXLE" |
| L6 | No dead or duplicate buttons; in-app dialogs, never browser pop-ups; destructive actions confirm and ask for a reason | Always | AntaraX, ISO generator |
| L7 | Every screen state has its own link, so a page can be shared and opened again | Always | "Give me the link, clickable" (AntaraX Frame, 15 times) |

## Minimum first release

For a new product, AXLE v1 is the **Always** items plus **Tenants** if it is multi-tenant and **AI** if it uses AI:
A1 to A6, B1 to B4, C1 to C6, D1 to D4, E1 to E4, F1 to F6, G2, H1 to H4, I1, J1, K1 to K3, L1 to L7.
Everything marked **Later** waits for a client, regulation or scale reason, recorded in the decision log.

## How to prove it (for the QA kit)

| Check | Pass when |
|---|---|
| Separation | A tenant admin opens every AXLE address and is refused; a platform admin sees no tenant data without a tenant selected |
| Nothing leaks | Signed in as a tenant user, searching the UI and network responses finds no model name, trace, cost or other tenant |
| Real numbers | Every overview number matches a count taken from the database |
| Tenant life | Create, suspend (user refused with a message), restore, request deletion: each step logged |
| Invite | Email arrives, link works once, user lands in the right tenant and role |
| Feature switch | A module off for one tenant: its menu and pages disappear for that tenant only |
| AI | Switch provider, run one AI action, see usage and cost recorded; AI off gives a clear message |
| Lists | On every list: search, filter, sort, bulk action on 2 rows, export; the stats strip updates |
| Audit | Three admin changes each appear with who, what, when and reason |
| Phone | Every AXLE page opens from the navigation at 390 px with nothing hidden or overlapping |
