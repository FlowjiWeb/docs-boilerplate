export async function onRequest(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

  // Validate CSRF state
  const cookies = Object.fromEntries(
    (request.headers.get('Cookie') || '')
      .split(';')
      .map(c => c.trim().split('=').map(decodeURIComponent))
  );

  if (!state || cookies.oauth_state !== state) {
    return new Response('Invalid state parameter', { status: 403 });
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      state,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return new Response(`Auth error: ${data.error_description}`, { status: 400 });
  }

  const token = data.access_token;
  const message = 'authorization:github:success:' + JSON.stringify({ token, provider: 'github' });

  const html = `<!DOCTYPE html><html><body><script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(${JSON.stringify(message)}, e.origin);
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  <\/script></body></html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Set-Cookie': 'oauth_state=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/',
    },
  });
}
