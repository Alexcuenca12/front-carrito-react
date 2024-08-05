import React, { createContext, useEffect, useState } from "react";
import { ProductService } from "../../services/ProductServices";
import { IProduct } from "../../interfaces/IProduct";

//Interfaz del contexto del producto, con las operaciones que se exportaran
interface IProductContext {
  products: IProduct[];
  editProduct: IProduct | null;
  createProduct: (product: IProduct) => void;
  deleteProduct: (product: IProduct) => void;
  findProduct: (id: number) => void;
  updateProduct: (product: IProduct) => void;
  setEditProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
}
//Contexto exportable con las operaciones vacias
export const ProductContext = createContext<IProductContext>({
  products: [],
  editProduct: null,
  createProduct: (product: IProduct) => {},
  deleteProduct: (product: IProduct) => {},
  findProduct: (id: number) => {},
  updateProduct: (product: IProduct) => {},
  setEditProduct: () => {},
});

//Funcion
const ProductContextProvider = (props: any) => {
  //Objeto para usar los servicios
  const productService = new ProductService();
  //Lista para almacenar los productos
  const [products, setProducts] = useState<IProduct[]>([]);
  //Variable para almacenar un producto transitorio
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);

  //LLena el array de productos cada que se refresca la pagina
  useEffect(() => {
    productService.getAll().then((data) => {
      setProducts(data);
    });
  }, []);

  //Operacion de creacion
  const createProduct = (product: any) => {
    productService.save(product).then((data) => {
      setProducts([...products, data]);
    });
  };
  //Operacion de eliminacion
  const deleteProduct = (id: any) => {
    productService
      .delete(id)
      .then(() => setProducts(products.filter((p) => p.id_producto !== id)));
    setEditProduct(null);
  };
  //Operacion de busqueda
  const findProduct = (id: number) => {
    // const product = products.find((p) => p.id_product === id);
    const product = products.find((p) => p.id_producto === id);
    setEditProduct(product || null);
  };
  //Operacion de actualizacion
  const updateProduct = (product: any) => {
    productService
      .update(product)
      .then((data) =>
        setProducts(
          products.map((e) =>
            e.id_producto === product.id_producto ? data : e
          )
        )
      );

    setEditProduct(null);
  };
  //Se envia los metodos dentro de la etiqueta de contexto
  return (
    <ProductContext.Provider
      value={{
        createProduct,
        deleteProduct,
        findProduct,
        updateProduct,
        editProduct,
        products,
        setEditProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
