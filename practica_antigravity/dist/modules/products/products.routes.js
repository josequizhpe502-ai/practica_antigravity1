"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const products_schema_1 = require("./products.schema");
const productRoutes = async (app) => {
    const server = app.withTypeProvider();
    server.get('/', {
        schema: {
            tags: ['Products'],
            summary: 'Listar productos',
            description: 'Obtiene una lista de todos los productos disponibles.',
        }
    }, async (request, reply) => {
        const products = await server.prisma.producto.findMany({
            include: { emprendimiento: true },
        });
        return products;
    });
    server.post('/', {
        schema: {
            body: products_schema_1.createProductSchema,
            tags: ['Products'],
            summary: 'Crear producto',
            description: 'Registra un nuevo producto para un emprendimiento existente.',
            security: [{ bearerAuth: [] }],
            response: {
                201: products_schema_1.productResponseSchema,
                404: zod_1.z.object({ message: zod_1.z.string() }),
            },
        },
    }, async (request, reply) => {
        const { nombre, descripcion, precio, emprendimientoId, imagen } = request.body;
        // Verify entrepreneurship exists
        const ent = await server.prisma.emprendimiento.findUnique({ where: { id: emprendimientoId } });
        if (!ent) {
            return reply.status(404).send({ message: 'Emprendimiento no encontrado' });
        }
        const product = await server.prisma.producto.create({
            data: {
                nombre,
                descripcion,
                precio,
                emprendimientoId,
                imagen,
            },
        });
        return reply.status(201).send(product);
    });
};
exports.default = productRoutes;
