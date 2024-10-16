#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const http_1 = __importDefault(require("http"));
const port = normalizePort(process.env.PORT || '8000');
app_1.default.set('port', port);
const server = http_1.default.createServer(app_1.default);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Función para normalizar el puerto
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
