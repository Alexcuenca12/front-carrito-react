export interface ApiResponse{
  data:any[],
   id_usuario: number;
   username: string;
   password: string;
   enabled: boolean;
   persona: {
     id_persona: number;
     cedula: string;
     nombre: string;
     apellido: string;
     email: string;
     fechaNac: string;
     genero: string;
     celular: string;
     direccion: string;
     telefono: string;
   };
   rol: {
     rolId: number;
     rolNombre: string;
     descripcion: string;
   };
}