import { ICategory } from "./ICategory";

export interface IProduct{
    id_producto?: number;
    nom_Producto: string;
    stock: number;
    descripcion: string;
    valor_unitario: number;
    foto:string;
    enabled:boolean;
    categoria:ICategory;

}
