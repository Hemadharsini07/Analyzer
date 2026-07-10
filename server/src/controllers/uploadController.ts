import type { Request, Response } from 'express';
import { createProjectSummary } from '../services/projectService';

export const uploadProject = (req: Request, res: Response) => {
  const projectName = typeof req.body?.projectName === 'string' ? req.body.projectName : 'Untitled project';

  const summary = createProjectSummary(projectName);

  res.status(202).json({
    message: 'Project upload accepted',
    data: summary,
  });
};
