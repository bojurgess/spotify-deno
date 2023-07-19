export default (_req: Request): Response => {
    // bang operator is used because these variables are used in a context where they are always true, see main.ts.
    const params = new URLSearchParams({
        client_id: Deno.env.get('SPOTIFY_CLIENT_ID')!,
        response_type: 'code',
        redirect_uri: Deno.env.get('SPOTIFY_REDIRECT_URI')!,
        scope: 'user-read-private user-read-email',
        show_dialog: 'true'
    })

    const url = 'https://accounts.spotify.com/authorize?' + params

    return Response.redirect(url, 301)
}