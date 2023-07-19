import { serve } from 'https://deno.land/std@0.194.0/http/mod.ts';
import 'https://deno.land/std@0.194.0/dotenv/load.ts';

export class Server {
    private port: number;
    private hostname: string;

    public instance: Promise<void> | undefined = undefined;

    constructor() {
        this.port = parseInt(Deno.env.get('PORT') || '3000');
        this.hostname = Deno.env.get('HOST') || 'localhost';
    }

    private handler = async (req: Request): Promise<Response> => {
        const url = new URL(req.url);
        const path = url.pathname;

        try {
            const isIndex = path === '/';

            const module = await import(`./routes${isIndex ? '/index' : path}.ts`);

            if (!module.default) {
                throw new Error('No default export found for route module.');
            } else {
                return module.default(req);
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    private errorHandler = (_err: unknown): Response | Promise<Response> => {
        //ServeOptions expects _err to be of type unknown
        const err = _err as Error;

        if (err.message.includes('Module not found')) {

            return new Response('Not Found', { status: 404 });
        }
        return new Response('Internal Server Error', { status: 500 });
    }

    public start() {
        const port = this.port
        const hostname = this.hostname
        this.instance = serve(this.handler, { port, hostname, onError: this.errorHandler });
    }
}