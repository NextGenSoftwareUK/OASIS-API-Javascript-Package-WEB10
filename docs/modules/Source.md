# Source — `web10.source`

Source controller: [`SourceController.cs`](https://github.com/NextGenSoftwareUK/OASIS2/blob/main/WEB10/NextGenSoftware.OASIS.Web10.WebAPI/Controllers/SourceController.cs)
Route prefix: `v1/source`
1 operation(s).

All methods are generated 1:1 from the controller's real `[Http*]` routes (see
[Conventions](../README.md#calling-any-endpoint)). They take a single args
object: any key matching a `{token}` in the route is substituted into the
URL; everything else becomes the query string (GET/DELETE) or JSON body
(POST/PUT).

## Methods

| Method | HTTP | Route | Route params | Query params | Body |
| --- | --- | --- | --- | --- | --- |
| `getSource` | GET | `v1/source` | – | – | – |

## Example

```js
const web10 = new Web10Client({ baseUrl: '...' });
web10.setToken(jwtToken); // reuse a WEB4 JWT

const { isError, message, result } = await web10.source.getSource({});
if (isError) throw new Error(message);
console.log(result);
```
