import Fastify from 'fastify';
// @ts-ignore
import cors from '@fastify/cors';
// @ts-ignore
import swagger from '@fastify/swagger';
// @ts-ignore
import swaggerUi from '@fastify/swagger-ui';
// @ts-ignore
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import prismaPlugin from './plugins/prisma';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

  // Validation Setup
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Plugins
  await app.register(cors, { 
    origin: '*',
  });

  await app.register(swagger, {
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

  await app.register(swaggerUi, {
    routePrefix: '/docs',
  });

  await app.register(prismaPlugin);

  // Routes
  app.register(import('./modules/auth/auth.routes'), { prefix: '/auth' });
  app.register(import('./modules/entrepreneurship/entrepreneurship.routes'), { prefix: '/entrepreneurships' });
  app.register(import('./modules/products/products.routes'), { prefix: '/products' });

  app.get('/', async () => {
    return { status: 'OK', message: 'API Running' };
  });

  return app;
}
