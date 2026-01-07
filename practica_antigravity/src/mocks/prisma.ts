export class PrismaClient {
  usuario = {
    findUnique: async () => null,
    create: async () => ({ id: 1, email: 'mock@test.com', nombre: 'Mock User', rolId: 1 }),
    findMany: async () => [],
  };
  emprendimiento = {
    findUnique: async () => null,
    create: async () => ({ id: 1, nombre: 'Mock Ent', descripcion: 'Desc', usuarioId: 1 }),
    findMany: async () => [],
  };
  producto = {
    findMany: async () => [],
    create: async () => ({ id: 1, nombre: 'Mock Product', precio: 100, emprendimientoId: 1 }),
  };
  $connect = async () => console.log('Mock DB Connected');
  $disconnect = async () => console.log('Mock DB Disconnected');
}
