import "../../styles/Person.css";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import PersonForm from "./PersonForm";
import { PersonContext } from "./PersonContext";

export const PersonList = () => {
  //Codigo para llenar la tabla segun un array
  const { findPerson, people } = useContext(PersonContext);

  const [seleccion, setSeleccion] = useState();

  //Para el dialog de la creacion de personas
  const [isVisible, setIsVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toast = useRef(null);

  const savePerson = (id: any) => {
    findPerson(id);
    setIsVisible(true);
  };
  const newPerson = (e: any) => {
    setSeleccion(e.target.id.slice(0, -1));
    setIsVisible(true);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">PEOPLE LIST</span>
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
          onClick={newPerson}
        >
          New Person
        </Button>
      </div>
    </div>
  );

  //HTML
  return (
    <>
      <div>
        <Toast ref={toast} />
        {/* Card of person and person's table */}
        <div className="linea">
          <Card className="table">
            {/* person's table */}
            <DataTable
              header={header}
              value={people}
              responsiveLayout="scroll"
              style={{
                textAlign: "center",
                fontFamily:
                  "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              }}
              selectionMode="single"
              onSelectionChange={(e: any) => savePerson(e.value.id_persona)}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="id_persona" header="ID"></Column>
              <Column field="cedula" header="Identification Card"></Column>
              <Column field="nombre" header="Name"></Column>
              <Column field="apellido" header="Last Name"></Column>
              <Column field="email" header="Email"></Column>
              <Column field="sexo" header="Sex"></Column>
              <Column field="telefono" header="Phone"></Column>
              <Column field="celular" header="Cellphone"></Column>
              <Column field="codigo_postal" header="Portal Code"></Column>
            </DataTable>
            <br />
            <Divider />
          </Card>
        </div>
      </div>
      <PersonForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        seleccion={seleccion}
        setSeleccion={setSeleccion}
        toast={toast}
      />
    </>
  );
};
