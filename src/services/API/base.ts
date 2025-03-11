import ky from 'ky';

const apiClient = ky.extend({
  prefixUrl: '/api/v1',
  headers: {
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT',
  },
  timeout: 60_000,
});

const { get, post, put, delete: destroy, patch } = apiClient;
export { get, post, put, destroy, patch };
