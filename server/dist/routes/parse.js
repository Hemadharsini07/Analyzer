"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parseController_1 = require("../controllers/parseController");
const router = (0, express_1.Router)();
router.post('/parse', parseController_1.parseDependencies);
exports.default = router;
