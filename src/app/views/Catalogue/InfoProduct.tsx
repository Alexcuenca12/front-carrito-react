import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import "../../styles/Product.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../reducers/cart/cartSlice";
import { ICarDet } from "../../interfaces/ICartDet";

//componente dialogo del catalogo
const InfoProduct = (props: any) => {
  //For the dialog state
  const { isVisible, setIsVisible, toast, productData } = props;
  //Para acceder al storage
  const dispatch = useDispatch();
  const initialState = {
    cantidad: 1,
    valor_total: 0,
    producto: productData,
  };
  //Actualizar la data del producto
  useEffect(() => {
    setProductDetData({
      ...productDet,
    });
  }, [isVisible]);
  //Objeto de detalle
  const [productDet, setProductDetData] = useState<ICarDet>(initialState);
  //Lista de productos del storage
  const { productsList } = useSelector((state: any) => state?.cart);
  //Metodo realizar una de las operaciones del storage
  const handleAddOrRemoveProduct = (productId: any) => {
    if (
      productsList.find(
        (pdt: ICarDet) => pdt.producto.id_producto === productId
      )
    ) {
      dispatch(removeProductFromCart(productId));
      toast.current.show({
        severity: "error",
        summary: "Product removed",
        detail: "Product removed from Cart",
      });
    } else {
      dispatch(
        addProductToCart({
          ...productDet,
          ["producto"]: productData,
          ["valor_total"]: productDet.cantidad * productData.valor_unitario,
        })
      );

      toast.current.show({
        severity: "success",
        summary: "Added product",
        detail: "Product added to cart",
        life: 3000,
      });
    }
    setIsVisible(false);
    setProductDetData(initialState);
  };
  //Para detectar cambios de cantidad
  const onInputChange = (data: any, field: any) => {
    setProductDetData({ ...productDet, [field]: data });
  };
  return (
    <>
      {/* Dialogo para la creacion de una product*/}
      {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
      <Dialog
        className="DialogoCentrado"
        header="PRODUCT INFORMATION"
        modal={true}
        visible={isVisible}
        contentStyle={{ overflow: "visible" }}
        onHide={() => {
          setIsVisible(false);
          setProductDetData(initialState);
        }}
        style={{
          width: "800px",
          fontFamily:
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="card flex flex-wrap gap-3">
          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="name"
                  name="name"
                  value={productData.nom_Producto}
                />
                <label htmlFor="nombre">Name</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputNumber
                  id="stock"
                  name="stock"
                  value={productData.stock}
                />
                <label htmlFor="stock">Stock</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="description"
                  name="description"
                  value={productData.descripcion}
                />
                <label htmlFor="description">Description</label>
              </span>
            </div>
          </div>
        </div>

        <div className="card flex flex-wrap justify-content-center gap-3">
          <div className="input-container2">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="currency-us"
                  value={productData.categoria.nombre_categoria}
                />
                <label htmlFor="stock">Category</label>
              </span>
            </div>
          </div>

          <div className="input-container2">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputNumber
                  inputId="currency-us"
                  value={productData.valor_unitario}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
                <label htmlFor="stock">Unit Value</label>
              </span>
            </div>
          </div>
        </div>
        <div className="card flex flex-wrap justify-content-center gap-3">
          <div className="input-container3">
            <div className="p-inputgroup">
              <div className="card justify-content-center elementosDialog">
                <div className="elementoImg ">
                  <img
                    className="imagen"
                    src={`data:image/jpeg;base64,${productData.foto}`}
                    alt="Preview"
                  />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card flex flex-wrap justify-content-center gap-3">
          <div className="input-container3">
            <div className="p-inputgroup">{productDet.cantidad}</div>
          </div>
        </div>
        <Slider
          min={1}
          max={productData.stock}
          value={productDet.cantidad}
          onChange={(e) => onInputChange(e.value, "cantidad")}
          className="w-full"
          style={{
            border: "black",
          }}
        />

        <div className="input-container3">
          <Button
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              background: "black ",
            }}
            className={`btn ${
              productsList.find(
                (pdt: ICarDet) =>
                  pdt.producto.id_producto === productData.id_producto
              )
                ? "btn-danger"
                : "btn-success"
            }`}
            onClick={() => {
              handleAddOrRemoveProduct(productData.id_producto);
            }}
          >
            {productsList.find(
              (pdt: ICarDet) =>
                pdt.producto.id_producto === productData.id_producto
            )
              ? "Remove"
              : "Add"}{" "}
            to Car
          </Button>
        </div>
      </Dialog>
    </>
  );
};
export default InfoProduct;
