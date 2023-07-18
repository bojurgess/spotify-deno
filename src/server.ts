import { serve } from 'https://deno.land/std@0.194.0/http/mod.ts';
import 'https://deno.land/std@0.194.0/dotenv/load.ts';

export class Server {
    private port: number;
    private hostname: string;
    private client_id = '';
    private client_secret = '';
    private redirect_uri = '';

    public instance: Promise<void> | undefined = undefined;

    constructor() {
        this.port = parseInt(Deno.env.get('PORT') || '3000');
        this.hostname = Deno.env.get('HOST') || 'localhost';
        const client_id = Deno.env.get('SPOTIFY_CLIENT_ID');
        const client_secret = Deno.env.get('SPOTIFY_CLIENT_SECRET');
        const redirect_uri = Deno.env.get('SPOTIFY_REDIRECT_URI');

        if (!client_id || !client_secret || !redirect_uri) {
            throw new Error('Missing required environment variables, exiting...');
        }
    }

    private handler = (_req: Request): Response => {
        // write handler logic
        return new Response('Hello World!');
    }

    private errorHandler = (_err: unknown): Response | Promise<Response> => {
        // write error handler logic
        return new Response('Internal Server Error', { status: 500 });
    }

    public start() {
        const port = this.port
        const hostname = this.hostname
        this.instance = serve(this.handler, { port, hostname, onError: this.errorHandler });
    }
}