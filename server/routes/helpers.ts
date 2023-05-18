import * as express from 'express';

type RequestMethod = (req: Express.Request, res: Express.Response) => Promise<void>;

export function withErrorHandler(fn: RequestMethod): RequestMethod {
  return async (req: express.Request, res: express.Response): Promise<void> => {
    return fn(req, res).catch(err => {
      console.error(`[${(new Date()).toISOString()}: ${req.method} ${req.url}] There was an error processing request:`, err.toString());
      res.status(500).send();
    });
  }
}
