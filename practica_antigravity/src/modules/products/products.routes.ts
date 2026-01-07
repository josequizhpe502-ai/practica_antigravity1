import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { createProductSchema, productResponseSchema } from './products.schema';

const productRoutes: FastifyPluginAsync = async (app: any) => {
  const server = app.withTypeProvider();

  server.get('/', {
    schema: {
      tags: ['Products'],
      summary: 'Listar productos',
      description: 'Obtiene una lista de todos los productos disponibles.',
    }
  }, async (request: any, reply: any) => {
    const products = await server.prisma.producto.findMany({
      include: { emprendimiento: true },
    });
    return products;
  });

  server.post(
    '/',
    {
      schema: {
        body: createProductSchema,
        tags: ['Products'],
        summary: 'Crear producto',
        description: 'Registra un nuevo producto para un emprendimiento existente.',
        security: [{ bearerAuth: [] }],
        response: {
          201: productResponseSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request: any, reply: any) => {
      const { nombre, descripcion, precio, emprendimientoId, imagen } = request.body;

      // Verify entrepreneurship exists
      const ent = await server.prisma.emprendimiento.findUnique({ where: { id: emprendimientoId } });
      if (!ent) {
        return reply.status(404).send({ message: 'Emprendimiento no encontrado' } as any);
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

      return reply.status(201).send(product as any);
    }
  );
};

export default productRoutes;
