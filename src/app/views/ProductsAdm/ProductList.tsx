import "../../styles/Product.css";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import ProductsForm from "./ProductForm";
import { ProductContext } from "./ProductContext";
import { IProduct } from "../../interfaces/IProduct";

export const ProductList = () => {
  //Codigo para llenar la tabla segun un array
  const { findProduct, products } = useContext(ProductContext);
  const [seleccion, setSeleccion] = useState();

  //Para el dialog de la creacion de productos
  const [isVisible, setIsVisible] = useState(false);
  const toast = useRef(null);
  //Disparador para mostrar el dialogo en caso de haber seleccionado un registro de la tabla
  const saveProduct = (id: any) => {
    findProduct(id);
    setIsVisible(true);
  };
  //Disparador para crear un nuevo producto
  const newProduct = (e: any) => {
    setSeleccion(e.target.id.slice(0, -1));
    setIsVisible(true);
  };

  //Componente del header para la tabla
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">PRODUCTS LIST</span>
      <Divider />
      <div
        id="busqueda"
        style={{
          alignItems: "center",
          paddingLeft: "75px",
          paddingRight: "75px",
        }}
      >
        <Button
          style={{
            margin: "0 auto",
            textAlign: "center",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            background: "black",
          }}
          onClick={newProduct}
        >
          New Product
        </Button>
      </div>
    </div>
  );
  //Para mostrar la imagen
  const base64ToImage = (base64String: string) => {
    return `data:image/jpeg;base64,${base64String}`;
  };
  const imageBodyTemplate = (rowData: IProduct) => {
    return (
      <img
        className="imagen"
        src={base64ToImage(rowData.foto)}
        alt={rowData.nom_Producto}
      />
    );
  };

  //Vista
  return (
    <>
      <div>
        {/* mensajes de lerta */}
        <Toast ref={toast} />

        <div className="linea">
          <Card className="table">
            <DataTable
              header={header}
              value={products}
              responsiveLayout="scroll"
              style={{
                textAlign: "center",
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              }}
              selectionMode="single"
              onSelectionChange={(e: any) => saveProduct(e.value.id_producto)}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="id_producto" header="ID"></Column>
              <Column field="nom_Producto" header="NAME"></Column>
              <Column field="stock" header="STOCK"></Column>
              <Column field="descripcion" header="DESCRIPTION"></Column>
              <Column field="valor_unitario" header="UNIT VALUE"></Column>
              <Column field="foto" header="IMAGE" body={imageBodyTemplate} />
              <Column
                field="categoria.nombre_categoria"
                header="CATEGORY"
              ></Column>
            </DataTable>
            <br />
            <Divider />
          </Card>
        </div>
      </div>
      {/* Dialogo */}
      <ProductsForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        seleccion={seleccion}
        setSeleccion={setSeleccion}
        toast={toast}
      />
    </>
  );
};
