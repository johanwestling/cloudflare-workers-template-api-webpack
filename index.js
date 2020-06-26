import Demo from './endpoints/demo/demo';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Handle call to API.
 * @param {Request} request
 * @return {Response} response
 */

 async function handleRequest(request){
  const headers = new Headers();
  const endpointArgs = getEndpointArgs(request);

  switch (endpointArgs.endpoint) {
    case 'demo':
      return Demo(request);

    default:
      return new Response(
        JSON.stringify(endpointArgs),
        {
          headers
        }
      );
  }
}

/**
 * Parse API request to determine endpoint and its params.
 * @param {Request} request
 * @return {Object} endpointArgs
 */

function getEndpointArgs(request){
  const api = new URL(`${new URL(request.url).protocol}//${TOML_ROUTE}`);
  const apiPath = api.pathname;
  const url = new URL(request.url);
  const urlPath = url.pathname;

  let urlParts = urlPath.replace(apiPath, '').replace(/^\//, '').replace(/\/$/, '').split('/');

  const endpoint = urlParts.shift().toLocaleLowerCase();
  const args = urlParts;

  return {
    api,
    apiPath,
    url,
    urlPath,
    endpoint,
    args
  };
}
