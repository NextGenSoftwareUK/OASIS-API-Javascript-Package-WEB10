'use strict';

const { HttpClient, DEFAULT_BASE_URL } = require('./core/httpClient');
const { TokenStore } = require('./core/tokenStore');
const { attachGeneratedModules } = require('./modules/index');

/**
 * Main SDK entry point. Works in Node 18+ and any modern browser.
 *
 *   const { Web10Client } = require('@oasisomniverse/web10-api');
 *   const web10 = new Web10Client({ baseUrl: 'https://api.web10.oasisomniverse.one' });
 *   web10.setToken(jwtToken); // reuse a WEB4 OASIS JWT - WEB10 has no auth of its own
 *   const source = await web10.source.getSource();
 *
 * The Source / WEB0 controller is reachable as `web10.source` - the root
 * of the OASIS stack, returning the foundational runtime/version identity
 * plus the live unified status across every layer built on top of it.
 */
class Web10Client {
  constructor({ baseUrl = DEFAULT_BASE_URL, persistSession, fetchImpl } = {}) {
    this.tokenStore = new TokenStore({ persist: persistSession });
    this.http = new HttpClient({ baseUrl, tokenStore: this.tokenStore, fetchImpl });

    attachGeneratedModules(this, this.http);
  }

  setBaseUrl(baseUrl) {
    this.http.setBaseUrl(baseUrl);
  }

  /**
   * WEB10 is the foundational root layer sitting behind the same OASIS
   * identity as WEB4-WEB9 - it has no avatar/auth endpoints of its own.
   * Reuse a JWT you already obtained from the WEB4 OASIS API (or your own
   * backend) here.
   */
  setToken(jwtToken, sessionExtras = {}) {
    this.tokenStore.setSession({ ...sessionExtras, jwtToken });
  }
}

module.exports = { Web10Client, HttpClient, TokenStore, DEFAULT_BASE_URL };
module.exports.default = Web10Client;
