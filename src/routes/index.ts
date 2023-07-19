export default(req: Request): Response => {
    const url = new URL(req.url);
    url.pathname = '/login';

    return Response.redirect(url, 301)
}