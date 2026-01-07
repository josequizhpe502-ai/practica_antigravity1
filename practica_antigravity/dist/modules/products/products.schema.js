"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productResponseSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(2),
    descripcion: zod_1.z.string().optional(),
    precio: zod_1.z.number().positive(),
    emprendimientoId: zod_1.z.number().int().positive(),
    imagen: zod_1.z.string().url().optional(),
});
exports.productResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    nombre: zod_1.z.string(),
    precio: zod_1.z.string().or(zod_1.z.number()), // Decimal often returned as string
    emprendimientoId: zod_1.z.number(),
});
