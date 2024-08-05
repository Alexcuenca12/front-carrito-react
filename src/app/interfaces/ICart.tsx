import { IPerson } from "./IPerson";

export interface ICart {
    id_carrito?: number;
    fecha_carrito: Date;
    estado_carrito: string;
    valor_total: number;
    persona?:IPerson;
  }
  