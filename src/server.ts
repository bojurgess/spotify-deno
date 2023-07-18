import { serve } from 'https://deno.land/std@0.194.0/http/mod.ts';
import 'https://deno.land/std@0.194.0/dotenv/load.ts';

const port = parseInt(Deno.env.get('PORT') || '3000');
const hostname = Deno.env.get('HOST') || 'localhost';
const client_id = Deno.env.get('SPOTIFY_CLIENT_ID');
const client_secret = Deno.env.get('SPOTIFY_CLIENT_SECRET');
const redirect_uri = Deno.env.get('SPOTIFY_REDIRECT_URI');

if (!client_id || !client_secret || !redirect_uri) {
    throw new Error('Missing required environment variables, exiting...');
}

const handler = (_req: Request): Response => {
    // write handler logic
    return new Response('Hello World!');
}

const errorHandler = (_err: unknown): Response | Promise<Response> => {
    // write error handler logic
    return new Response('Internal Server Error', { status: 500 });
};

export const server = serve(handler, { port, hostname, onError: errorHandler });