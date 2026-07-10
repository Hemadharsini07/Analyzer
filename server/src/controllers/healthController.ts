import type { Request, Response } from 'express';

export const getHealthStatus = (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'dependlens-server',
    timestamp: new Date().toISOString(),
  });
};
