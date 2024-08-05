import React, { useState, useEffect } from "react";
import "../../styles/Product.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { CartService } from "../../services/CartService";
import { ICart } from "../../interfaces/ICart";

export const CartListAdm = () => {
    //Capturar id_persona de session Storage
    const userData = sessionStorage.getItem("user");
    const userObj = JSON.parse(userData || "{}");
    const id_persona = userObj.id;
    //Lista de carritos
    const [cartList, setCartList] = useState<ICart[]>([]);
    //Servicio
    const cartService = new CartService();
    //Llenamos la lista de carritos
    useEffect(() => {
        cartService.getAll().then(data => {
            setCartList(data);
        })
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
                <Column field="persona_carrito.id_persona" header="CLIENT ID"></Column>
                <Column  header="CLIENT NAME" 
                    body={(rowData) =>{
                            return rowData.persona_carrito?.nombre + " " +rowData.persona_carrito?.apellido
                    }}
                          />
            </DataTable>

        </>
    );
};
export default CartListAdm;
