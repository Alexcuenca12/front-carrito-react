import "../../styles/Rol.css";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import RolForm from "./RolForm";
import { RolContext } from "./RolContext";

export const RolList = () => {
  //Codigo para llenar la tabla segun un array
  const { findRol, roles } = useContext(RolContext);
  const [seleccion, setSeleccion] = useState();

  //Para el dialog de la creacion de roles
  const [isVisible, setIsVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toast = useRef(null);

  const saveRol = (id: any) => {
    findRol(id);
    setIsVisible(true);
  };
  const newRol = (e: any) => {
    setSeleccion(e.target.id.slice(0, -1));
    setIsVisible(true);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">ROLES LIST</span>
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
          onClick={newRol}
        >
          New Rol
        </Button>
      </div>
    </div>
  );

  //HTML
  return (
    <>
      <div>
        <Toast ref={toast} />
        {/* Card y tabla de roles */}
        <div className="linea">
          <Card className="table">
            {/* Tabla de roles */}
            <DataTable
              header={header}
              value={roles}
              responsiveLayout="scroll"
              style={{
                textAlign: "center",
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              }}
              selectionMode="single"
              onSelectionChange={(e: any) => saveRol(e.value.rolId)}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="rolId" header="ID"></Column>
              <Column field="rolNombre" header="Nombre del Rol"></Column>
              <Column field="descripcion" header="Descripcion"></Column>
            </DataTable>
            <br />
            <Divider />
          </Card>
        </div>
      </div>
      <RolForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        seleccion={seleccion}
        setSeleccion={setSeleccion}
        toast={toast}
      />
    </>
  );
};
