import { ICart } from "./ICart";
import { IProduct } from "./IProduct";

export interface ICarDet {
    id_detalleCarrito?: number;
    cantidad: number;
    valor_total: number;
    producto: IProduct;
    carrito?: ICart;
  }
  