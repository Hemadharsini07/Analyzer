"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDependencies = void 0;
const multer_1 = __importDefault(require("multer"));
const dependencyParser_1 = require("../services/dependencyParser");
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});
exports.parseDependencies = [
    upload.array('files', 2),
    (req, res) => {
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
            const dependencies = (0, dependencyParser_1.parseDependencyFiles)(normalizedFiles);
            res.json(dependencies);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to parse dependency files.';
            res.status(400).json({ error: message });
        }
    },
];
