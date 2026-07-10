"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProject = void 0;
const projectService_1 = require("../services/projectService");
const uploadProject = (req, res) => {
    const projectName = typeof req.body?.projectName === 'string' ? req.body.projectName : 'Untitled project';
    const summary = (0, projectService_1.createProjectSummary)(projectName);
    res.status(202).json({
        message: 'Project upload accepted',
        data: summary,
    });
};
exports.uploadProject = uploadProject;
