export class ApiService {
  constructor(baseURL) {
    this._baseURL = baseURL;
  }

  post(url = '', body, options = {}) {
    return fetch(this._baseURL + url, { method: 'POST', body, ...options }).then((response) =>
      response.json(),
    );
  }

  get(url = '', params = {}, options = {}) {
    const queryParam = new URLSearchParams(params);
    return fetch(`${this._baseURL + url}?${queryParam.toString()}`, {
      method: 'GET',
      ...options,
    }).then((response) => response.json());
  }

  delete(url = '', options = {}) {
    return fetch(this._baseURL + url, { method: 'DELETE', ...options }).then((response) =>
      response.json(),
    );
  }

  put(url = '', body, options = {}) {
    return fetch(this._baseURL + url, { method: 'PUT', body, ...options }).then((response) =>
      response.json(),
    );
  }
}
