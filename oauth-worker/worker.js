// Cloudflare Worker - GitHub OAuth Proxy for Decap CMS
// Deploy this as a Cloudflare Worker
// Set these environment variables in Cloudflare:
//   GITHUB_CLIENT_ID     - from your GitHub OAuth App
//   GITHUB_CLIENT_SECRET - from your GitHub OAuth App

const ALLOWED_DOMAINS = ['behindthecurtain.pages.dev'];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    // Route: /auth - Start GitHub OAuth flow
    if (url.pathname === '/auth') {
      const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
      githubAuthUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      githubAuthUrl.searchParams.set('scope', 'repo,user');
      return Response.redirect(githubAuthUrl.toString(), 302);
    }

    // Route: /callback - Handle GitHub OAuth callback
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');

      if (!code) {
        return new Response('Missing code parameter', { status: 400, headers });
      }

      // Exchange code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code: code,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        return new Response(`OAuth Error: ${tokenData.error_description}`, {
          status: 400,
          headers,
        });
      }

      const token = tokenData.access_token;

      // Return HTML that sends the token back to Decap CMS
      const html = `<!DOCTYPE html>
<html>
  <head><title>Authenticating...</title></head>
  <body>
    <p>Authenticating, please wait...</p>
    <script>
      (function() {
        const token = ${JSON.stringify(token)};
        const provider = 'github';
        const message = 'authorization:' + provider + ':success:' + JSON.stringify({ token, provider });

        function receiveMessage(e) {
          window.opener.postMessage(message, e.origin);
        }

        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:' + provider, '*');
      })();
    </script>
  </body>
</html>`;

      return new Response(html, {
        headers: { ...headers, 'Content-Type': 'text/html' },
      });
    }

    return new Response('Not found', { status: 404, headers });
  },
};
