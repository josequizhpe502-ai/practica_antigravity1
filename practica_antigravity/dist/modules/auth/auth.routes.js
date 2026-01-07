"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const auth_schema_1 = require("./auth.schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRoutes = async (app) => {
    const server = app.withTypeProvider();
    server.post('/register', {
        schema: {
            body: auth_schema_1.registerSchema,
            tags: ['Auth'],
            summary: 'Registrar nuevo usuario',
            description: 'Crea una cuenta de usuario con rol específico. Retorna token JWT.',
            response: {
                201: auth_schema_1.loginResponseSchema,
                409: zod_1.z.object({ message: zod_1.z.string() }),
            },
        },
    }, async (request, reply) => {
        const { nombre, apellido, email, password, rolId } = request.body;
        // Check if user exists
        const existingUser = await server.prisma.usuario.findUnique({ where: { email } });
        if (existingUser) {
            return reply.status(409).send({ message: 'Usuario ya existe' });
        }
        // Create user
        const newUser = await server.prisma.usuario.create({
            data: {
                nombre,
                apellido,
                email,
                password,
                rolId,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, rolId: newUser.rolId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        return reply.status(201).send({
            token,
            user: { id: newUser.id, email: newUser.email, nombre: newUser.nombre, rolId: newUser.rolId },
        });
    });
    server.post('/login', {
        schema: {
            body: auth_schema_1.loginSchema,
            tags: ['Auth'],
            summary: 'Iniciar sesión',
            description: 'Autentica usuario y retorna token JWT.',
            response: {
                200: auth_schema_1.loginResponseSchema,
                401: zod_1.z.object({ message: zod_1.z.string() }),
            },
        },
    }, async (request, reply) => {
        const { email, password } = request.body;
        const user = await server.prisma.usuario.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            return reply.status(401).send({ message: 'Credenciales inválidas' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, rolId: user.rolId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        return {
            token,
            user: { id: user.id, email: user.email, nombre: user.nombre, rolId: user.rolId },
        };
    });
};
exports.default = authRoutes;
