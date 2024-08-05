import "../../styles/User.css";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import UserForm from "./UserForm";
import { UserContext } from "./UserContext";

export const UserList = () => {
  //Codigo para llenar la tabla segun un array
  const { findUser, users } = useContext(UserContext);
  const [seleccion, setSeleccion] = useState();

  //Funcion para remplazar la contraseña por *
  function renderPassword(data: any) {
    return "*".repeat(data.password.length);
  }

  //Para el dialog de la creacion de usuario
  const [isVisible, setIsVisible] = useState(false);
  // const [confirm, setConfirm] = useState(false);
  const toast = useRef(null);

  const saveUser = (id: any) => {
    findUser(id);
    setIsVisible(true);
  };
  const newUser = (e: any) => {
    setSeleccion(e.target.id.slice(0, -1));
    setIsVisible(true);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">USER LIST</span>
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
          onClick={newUser}
        >
          New User
        </Button>
      </div>
    </div>
  );
  //HTML
  return (
    <>
      <div>
        <Toast ref={toast} />
        {/* Card del Usuario y la tabla de Usuarios */}
        <div className="linea">
          <Card className="table">
            {/* Tabla Users */}
            <DataTable
              header={header}
              value={users}
              responsiveLayout="scroll"
              style={{
                textAlign: "center",
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              }}
              selectionMode="single"
              onSelectionChange={(e: any) => saveUser(e.value.id_usuario)}
              paginator
              rows={5}
              //Paginacion
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="id_usuario" header="ID"></Column>
              <Column field="username" header="USERNAME"></Column>
              <Column
                field="password"
                header="PASSWORD"
                body={renderPassword}
              ></Column>
              <Column
                field="persona.nombre"
                header="NAME"
                //Concatenacion del Nombre y Apellido de Persona
                body={(rowData) =>
                  `${rowData.persona.nombre} ${rowData.persona.apellido}`
                }
              />
              <Column field="rol.rolNombre" header="ROL"></Column>
            </DataTable>
            <br />
            <Divider />
          </Card>
        </div>
      </div>
      <UserForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        seleccion={seleccion}
        setSeleccion={setSeleccion}
        toast={toast}
      />
    </>
  );
};
