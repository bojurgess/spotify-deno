import { Server } from './server.ts';
import 'https://deno.land/std@0.194.0/dotenv/load.ts';

const env = Deno.env.toObject();
if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_REDIRECT_URI) {
    throw new Error('Missing required environment variables, exiting...')
}

const _server = new Server().start();