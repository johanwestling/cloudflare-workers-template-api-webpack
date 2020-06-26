export default async request => {
  const headers = new Headers();

  return new Response(
    `Hello from test endpoint!`,
    {
      headers
    }
  );
}
