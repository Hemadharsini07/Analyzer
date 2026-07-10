"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPort = void 0;
const getPort = () => {
    const parsedPort = Number(process.env.PORT || 5000);
    return Number.isNaN(parsedPort) ? 5000 : parsedPort;
};
exports.getPort = getPort;
