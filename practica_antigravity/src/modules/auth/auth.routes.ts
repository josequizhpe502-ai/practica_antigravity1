import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { loginResponseSchema, loginSchema, registerSchema } from './auth.schema';
import jwt from 'jsonwebtoken';

const authRoutes: FastifyPluginAsync = async (app: any) => {
  const server = app.withTypeProvider();

  server.post(
    '/register',
    {
      schema: {
        body: registerSchema,
        tags: ['Auth'],
        summary: 'Registrar nuevo usuario',
        description: 'Crea una cuenta de usuario con rol específico. Retorna token JWT.',
        security: [], // Public endpoint
        response: {
          201: loginResponseSchema,
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request: any, reply: any) => {
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

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, rolId: newUser.rolId },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
      );

      return reply.status(201).send({
        token,
        user: { id: newUser.id, email: newUser.email, nombre: newUser.nombre, rolId: newUser.rolId },
      });
    }
  );

  server.post(
    '/login',
    {
      schema: {
        body: loginSchema,
        tags: ['Auth'],
        summary: 'Iniciar sesión',
        description: 'Autentica usuario y retorna token JWT.',
        security: [], // Public endpoint
        response: {
          200: loginResponseSchema,
          401: z.object({ message: z.string() }),
        },
      },
    },
    async (request: any, reply: any) => {
      const { email, password } = request.body;

      const user = await server.prisma.usuario.findUnique({ where: { email } });

      if (!user || user.password !== password) {
        return reply.status(401).send({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, rolId: user.rolId },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
      );

      return {
        token,
        user: { id: user.id, email: user.email, nombre: user.nombre, rolId: user.rolId },
      };
    }
  );
};

export default authRoutes;
