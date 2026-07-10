"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectSummary = void 0;
const createProjectSummary = (projectName) => ({
    projectName,
    status: 'ready-for-analysis',
    scannedFiles: 0,
});
exports.createProjectSummary = createProjectSummary;
