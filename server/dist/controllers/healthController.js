"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthStatus = void 0;
const getHealthStatus = (_req, res) => {
    res.json({
        status: 'ok',
        service: 'dependlens-server',
        timestamp: new Date().toISOString(),
    });
};
exports.getHealthStatus = getHealthStatus;
