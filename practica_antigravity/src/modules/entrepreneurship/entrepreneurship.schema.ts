import { z } from 'zod';

export const createEntrepreneurshipSchema = z.object({
  nombre: z.string().min(2),
  descripcion: z.string(),
  categoriaId: z.number(),
  // redesSociales as JSON object not strictly validated here, but type checked
  redesSociales: z.any().optional(),
});

export const entrepreneurshipResponseSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  usuario: z.object({
    nombre: z.string(),
    email: z.string(),
  }).optional(),
});
