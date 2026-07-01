# Source — `web10.source`

Source controller: [`SourceController.cs`](https://github.com/NextGenSoftwareUK/OASIS/blob/main/WEB10/NextGenSoftware.OASIS.Web10.WebAPI/Controllers/SourceController.cs)
Route prefix: `v1/source`
1 operation(s).

Every method takes a single args object: any key matching a `{token}` in the route is substituted into the URL; everything else becomes the query string (GET/DELETE) or JSON body (POST/PUT). Every call resolves to the standard OASIS envelope:

```ts
{
  isError: boolean;
  isWarning: boolean;
  message: string;
  errorCode?: string;
  result: T; // see each endpoint's Response section below
}
```

## Operations

### `getSource`

Returns the foundational runtime/version identity plus the live unified status across every layer built on top of it.

**GET** `v1/source`

**Request**

No request body.

**Response**

Standard `OASISResult` envelope (see top of this page) with:

`result` type: `SourceReport`

| Field | Type |
| --- | --- |
| `OasisRuntimeVersion` | `string` |
| `OasisApiVersion` | `string` |
| `StarApiVersion` | `string` |
| `UnifiedStatus` | `UnifiedStatusReport` |
| `GeneratedUtc` | `DateTime` |

**Example**

```js
const { isError, message, result } = await web10.source.getSource({});
if (isError) throw new Error(message);
console.log(result);
```

Example response:

```json
{
  "isError": false,
  "message": "",
  "result": { "OasisRuntimeVersion": "example string", "OasisApiVersion": "example string", "StarApiVersion": "example string", "UnifiedStatus": { "Layers": [{ "LayerName": "example string", "BaseUrl": "example string", "IsReachable": true, "ResponseTimeMs": 1.0, "Metrics": { "<string>": "example string" }, "Error": "example string", "CheckedUtc": "2026-01-01T00:00:00Z" }], "AllLayersHealthy": true, "HealthyLayerCount": 1, "TotalLayerCount": 1, "GeneratedUtc": "2026-01-01T00:00:00Z" }, "GeneratedUtc": "2026-01-01T00:00:00Z" }
}
```

