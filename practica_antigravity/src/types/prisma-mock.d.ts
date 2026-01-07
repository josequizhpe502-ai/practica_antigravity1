declare module '@prisma/client' {
  export class PrismaClient {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    usuario: any;
    emprendimiento: any;
    producto: any;
    resena: any;
    mentoria: any;
    tutor: any;
    evento: any;
  }
}
