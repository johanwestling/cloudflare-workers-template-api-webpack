addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond to API calls.
 * @param {Request} request
 */
async function handleRequest(request){
  const headers = new Headers();

  // Do the

  return new Response(
    `Hello from API worker!`,
    {
      headers
    }
  );
}