# web10-oasis-source-api

Isomorphic (Node 18+ and browser) JavaScript/TypeScript-friendly client for the
**WEB10 OASIS Source API** - the root of the OASIS stack ("the Omega that is
the Alpha"), returning the foundational runtime/version identity plus a live
unified status across every layer built on top of it, built on the OASIS2
WEB10 WebAPI.

Zero dependencies. Wraps the global `fetch`. Works the same in Node and the
browser.

## Installation

```bash
npm install web10-oasis-source-api
```

## Quick start

```js
const { Web10Client } = require('web10-oasis-source-api');
// or: import { Web10Client } from 'web10-oasis-source-api';

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
