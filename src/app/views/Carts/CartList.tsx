import React, { useState, useEffect } from "react";
import "../../styles/Product.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { CartService } from "../../services/CartService";
import { ICart } from "../../interfaces/ICart";

export const CartList = () => {
  //Capturar id_persona de session Storage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const id_persona = userObj.id;
  //Lista de carritos
  const [cartList, setCartList] = useState<ICart[]>([]);
  //Servicio
  const cartService = new CartService();
  //Filtramos los carritos por el id del usuario logeado
  useEffect(() => {
    cartService.getAll().then((data) => {
      const filteredData = data.filter(
        (item: any) => item.persona_carrito?.id_persona === id_persona
      );
      setCartList(filteredData);
    });
  }, []);

  return (
    <>
      <DataTable
        value={cartList}
        responsiveLayout="scroll"
        style={{
          textAlign: "center",
          fontFamily:
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
        selectionMode="single"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="id_carrito" header="ID"></Column>
        <Column field="fecha_carrito" header="FECHA"></Column>
        <Column field="valor_total" header="VALOR_TOTAL"></Column>
      </DataTable>
    </>
  );
};
export default CartList;
