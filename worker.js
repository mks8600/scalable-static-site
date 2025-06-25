export default {
  async fetch(request) {
    const targetUrl = 'http://devops-project-scalable-static-site.s3-website.ap-south-1.amazonaws.com'; // your S3 site URL

    const url = new URL(request.url);
    const path = url.pathname;

    const response = await fetch(`${targetUrl}${path}`);
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type'),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
