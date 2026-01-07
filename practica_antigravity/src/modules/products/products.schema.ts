import { z } from 'zod';

export const createProductSchema = z.object({
  nombre: z.string().min(2),
  descripcion: z.string().optional(),
  precio: z.number().positive(),
  emprendimientoId: z.number().int().positive(),
  imagen: z.string().url().optional(),
});

export const productResponseSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  precio: z.string().or(z.number()), // Decimal often returned as string
  emprendimientoId: z.number(),
});
