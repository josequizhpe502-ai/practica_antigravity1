"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entrepreneurshipResponseSchema = exports.createEntrepreneurshipSchema = void 0;
const zod_1 = require("zod");
exports.createEntrepreneurshipSchema = zod_1.z.object({
    nombre: zod_1.z.string().min(2),
    descripcion: zod_1.z.string(),
    categoriaId: zod_1.z.number(),
    // redesSociales as JSON object not strictly validated here, but type checked
    redesSociales: zod_1.z.any().optional(),
});
exports.entrepreneurshipResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    nombre: zod_1.z.string(),
    descripcion: zod_1.z.string(),
    usuario: zod_1.z.object({
        nombre: zod_1.z.string(),
        email: zod_1.z.string(),
    }).optional(),
});
