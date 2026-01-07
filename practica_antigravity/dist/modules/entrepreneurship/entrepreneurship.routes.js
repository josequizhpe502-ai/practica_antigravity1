"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entrepreneurship_schema_1 = require("./entrepreneurship.schema");
const entrepreneurshipRoutes = async (app) => {
    const server = app.withTypeProvider();
    server.get('/', {
        schema: {
            tags: ['Entrepreneurship'],
            summary: 'Listar emprendimientos',
            description: 'Obtiene el directorio de emprendimientos registrados.',
        }
    }, async () => {
        return server.prisma.emprendimiento.findMany({
            include: { usuario: true, categoria: true },
        });
    });
    server.post('/', {
        schema: {
            body: entrepreneurship_schema_1.createEntrepreneurshipSchema,
            tags: ['Entrepreneurship'],
            summary: 'Crear emprendimiento',
            description: 'Registra un nuevo emprendimiento (requiere auth).',
            security: [{ bearerAuth: [] }],
            response: {
                201: entrepreneurship_schema_1.entrepreneurshipResponseSchema,
            },
        },
        // preHandler: [app.authenticate] // Middlewares would go here
    }, async (request, reply) => {
        // In a real app, 'usuarioId' comes from the JWT via request.user
        // For now we might assume it's passed or mocked, or extracted if we implemented auth middleware fully.
        // Let's assume for this MVP we pass usuarioId in headers or just use a default for testing if not in body
        const { nombre, descripcion, categoriaId, redesSociales } = request.body;
        // MOCK: Getting user ID from nowhere for simplicity unless we add it to schema or auth
        // Assuming user 1 exists for MVP
        const usuarioId = 1;
        const ent = await server.prisma.emprendimiento.create({
            data: {
                nombre,
                descripcion,
                categoriaId,
                redesSociales: redesSociales ? JSON.stringify(redesSociales) : undefined,
                usuarioId,
            },
            include: { usuario: true },
        });
        return reply.status(201).send(ent);
    });
};
exports.default = entrepreneurshipRoutes;
