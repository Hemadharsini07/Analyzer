"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const health_1 = __importDefault(require("./routes/health"));
const upload_1 = __importDefault(require("./routes/upload"));
const parse_1 = __importDefault(require("./routes/parse"));
const env_1 = require("./utils/env");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (0, env_1.getPort)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({ message: 'DependLens API is running' });
});
app.use('/api', health_1.default);
app.use('/api', upload_1.default);
app.use('/api', parse_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
