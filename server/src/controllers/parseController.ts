import type { Request, Response } from 'express';
import multer from 'multer';
import { parseDependencyFiles } from '../services/dependencyParser';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const parseDependencies = [
  upload.array('files', 2),
  (req: Request, res: Response) => {
    const uploadedFiles = Array.isArray(req.files) ? req.files : [];

    if (!uploadedFiles.length) {
      res.status(400).json({ error: 'Please upload package.json or package-lock.json files.' });
      return;
    }

    const normalizedFiles = uploadedFiles.map((file) => ({
      filename: file.originalname,
      buffer: file.buffer,
    }));

    try {
      const dependencies = parseDependencyFiles(normalizedFiles);
      res.json(dependencies);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to parse dependency files.';
      res.status(400).json({ error: message });
    }
  },
];
