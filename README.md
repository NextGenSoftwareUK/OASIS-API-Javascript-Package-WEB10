# @oasisomniverse/web10-api

Isomorphic (Node 18+ and browser) JavaScript/TypeScript-friendly client for the
**WEB10 OASIS Source API** - the root of the OASIS stack ("the Omega that is
the Alpha"), returning the foundational runtime/version identity plus a live
unified status across every layer built on top of it, built on the OASIS
WEB10 WebAPI.

Zero dependencies. Wraps the global `fetch`. Works the same in Node and the
browser.

## About WEB10

> **"WEB10 = WEB0. THE OMEGA = THE ALPHA."**

WEB10 is the foundational Source layer underlying the entire OASIS stack — not a final destination but the recognition that the stack was always a circle. It's the root identity/version endpoint that every other layer ultimately emanates from and returns to: the journey through WEB1-WEB9 is an act of remembering a ground of being that was always present.

WEB10 sits beneath **[WEB4](https://www.npmjs.com/package/@oasisomniverse/web4-api)** through **[WEB9](https://www.npmjs.com/package/@oasisomniverse/web9-api)**, and is one layer of the wider **[OASIS Omniverse](https://oasisomniverse.one)** (WEB4 through WEB10).

## About The OASIS Omniverse

The OASIS (Open Advanced Sensory Immersion System) is the universal interoperability layer connecting all of WEB2 and WEB3 — every blockchain, database, cloud provider and protocol — into one unified, fault-tolerant API. Rather than picking a single tech stack, the OASIS harnesses the best of every provider (auto-failover, auto-load-balancing, auto-replication) so nothing is ever a single point of failure, and hides the complexity behind one intuitive API so you never need to learn a new stack again — even as underlying tech evolves, your app keeps working with zero changes.

At its core sits one Avatar with one SSO login and one Karma reputation score that travels with you across every app, game and world built on top of it — full transparency and full control over your own data, right down to the field level.

This is the foundation of the OASIS Omniverse: a network of unified layers, WEB4 (identity & unification) through WEB10 (source), each building on the one below to connect blockchains, metaverses, AI, human consciousness and beyond into a single interoperable whole.

👉 See the full ecosystem at **[oasisomniverse.one](https://oasisomniverse.one)**.

## Installation

```bash
npm install @oasisomniverse/web10-api
```

## Quick start

```js
const { Web10Client } = require('@oasisomniverse/web10-api');
// or: import { Web10Client } from '@oasisomniverse/web10-api';

const web10 = new Web10Client({ baseUrl: 'https://api.web10.oasisomniverse.one' });

const { isError, message, result } = await web10.source.getSource();
if (isError) throw new Error(message);
console.log(result); // foundational runtime/version identity + unified status
```

Every response has the shape:

```ts
interface OASISResponse<T = any> {
  isError: boolean;
  message: string | null;
  result: T;
  raw: any;
  statusCode: number;
}
```

## Auth

WEB10 is the foundational root layer that sits behind the same OASIS avatar
identity as WEB4-WEB9 - it has no avatar/login endpoints of its own. Reuse a
JWT you've already obtained elsewhere (e.g. from `web4-oasis-api`'s
`client.auth.login()`):

```js
web10.setToken(jwtToken);
```

## Module reference

1 module, 1 operation. Full reference lives in [`docs/`](./docs/README.md).

| Client property | Route prefix | Operations |
| --- | --- | --- |
| `web10.source` | `v1/source` | 1 |

## Regenerating

The generated module, type declarations and docs are produced from
`endpoints.json` (extracted from the WEB10 WebAPI controller source):

```bash
npm run generate   # src/modules/*.js + src/modules/index.js
npm run types      # src/modules/*.d.ts + index.d.ts + src/core/types.d.ts
npm run docs       # docs/README.md + docs/modules/*.md
```

## Testing

```bash
npm test
```

## License

MIT
