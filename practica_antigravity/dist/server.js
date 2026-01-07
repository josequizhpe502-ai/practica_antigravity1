"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT || '3000');
async function main() {
    const app = await (0, app_1.buildApp)();
    try {
        await app.ready();
        await app.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Documentation available at http://localhost:${PORT}/docs`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
main();
