export const createProjectSummary = (projectName: string) => ({
  projectName,
  status: 'ready-for-analysis',
  scannedFiles: 0,
});
