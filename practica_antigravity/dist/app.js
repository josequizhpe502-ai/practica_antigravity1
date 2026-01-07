"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const fastify_1 = __importDefault(require("fastify"));
// @ts-ignore
const cors_1 = __importDefault(require("@fastify/cors"));
// @ts-ignore
const swagger_1 = __importDefault(require("@fastify/swagger"));
// @ts-ignore
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
// @ts-ignore
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const prisma_1 = __importDefault(require("./plugins/prisma"));
async function buildApp() {
    const app = (0, fastify_1.default)({
        logger: true,
    }).withTypeProvider();
    // Validation Setup
    app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
    app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
    // Plugins
    await app.register(cors_1.default, {
        origin: '*',
    });
    await app.register(swagger_1.default, {
        openapi: {
            info: {
                title: 'Centro de Emprendimiento API',
                description: 'API REST para el Centro de Apoyo y Co-creación de Emprendimientos UID',
                version: '1.0.0',
            },
            servers: [
                { url: 'http://localhost:3000' }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [{ bearerAuth: [] }],
        }
    });
    await app.register(swagger_ui_1.default, {
        routePrefix: '/docs',
    });
    await app.register(prisma_1.default);
    // Routes
    app.register(Promise.resolve().then(() => __importStar(require('./modules/auth/auth.routes'))), { prefix: '/auth' });
    app.register(Promise.resolve().then(() => __importStar(require('./modules/entrepreneurship/entrepreneurship.routes'))), { prefix: '/entrepreneurships' });
    app.register(Promise.resolve().then(() => __importStar(require('./modules/products/products.routes'))), { prefix: '/products' });
    app.get('/', async () => {
        return { status: 'OK', message: 'API Running' };
    });
    return app;
}
