'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { Web10Client } = require('../index.js');

function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const match = responses.find((r) => url.includes(r.match));
    const body = match ? match.body : { isError: false, result: {} };
    return {
      ok: match ? match.ok !== false : true,
      status: match?.status || 200,
      text: async () => JSON.stringify(body)
    };
  };
  impl.calls = calls;
  return impl;
}

test('setToken attaches Bearer header to subsequent requests', async () => {
  const fetchImpl = fakeFetch([{ match: 'v1/source', body: { isError: false, result: { version: '10.0.0' } } }]);
  const web10 = new Web10Client({ baseUrl: 'https://example.test', persistSession: false, fetchImpl });

  web10.setToken('jwt-abc');
  const res = await web10.source.getSource();

  const call = fetchImpl.calls[0];
  assert.equal(call.init.headers.Authorization, 'Bearer jwt-abc');
  assert.equal(call.url, 'https://example.test/v1/source');
  assert.equal(call.init.method, 'GET');
  assert.equal(res.isError, false);
});

test('source module is attached to the client', () => {
  const web10 = new Web10Client({ baseUrl: 'https://example.test', persistSession: false, fetchImpl: fakeFetch([]) });
  assert.ok(web10.source, 'expected web10.source to be attached');
});

test('setBaseUrl updates the underlying http client', async () => {
  const fetchImpl = fakeFetch([{ match: 'v1/source', body: { isError: false, result: {} } }]);
  const web10 = new Web10Client({ baseUrl: 'https://example.test', persistSession: false, fetchImpl });

  web10.setBaseUrl('https://other.test');
  await web10.source.getSource();

  assert.equal(fetchImpl.calls[0].url, 'https://other.test/v1/source');
});
