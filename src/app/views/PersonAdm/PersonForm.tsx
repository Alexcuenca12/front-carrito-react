import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { PersonContext } from "./PersonContext";
import { InputText } from "primereact/inputtext";
import "../../styles/Person.css";
import { IPerson } from "../../interfaces/IPerson";

const PersonForm = (props: any) => {
  //For the dialog state
  const { isVisible, setIsVisible, toast } = props;
  const [confirm, setConfirm] = useState(false);
  const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);
  //For the register of a person
  const initialPersonState = {
    id_persona: 0,
    cedula: "",
    nombre: "",
    apellido: "",
    email: "",
    sexo: "",
    telefono: "",
    celular: "",
    codigo_postal: "",
    enabled: true,
  };
  const [personData, setPersonData] = useState<IPerson>(initialPersonState);
  const {
    createPerson,
    deletePerson,
    updatePerson,
    editPerson,
    setEditPerson,
  } = useContext(PersonContext);

  useEffect(() => {
    if (editPerson)
      setPersonData({
        id_persona: editPerson.id_persona,
        cedula: editPerson.cedula,
        nombre: editPerson.nombre,
        apellido: editPerson.apellido,
        email: editPerson.email,
        sexo: editPerson.sexo,
        telefono: editPerson.telefono,
        celular: editPerson.celular,
        codigo_postal: editPerson.codigo_postal,
        enabled: editPerson.enabled,
      });
  }, [editPerson]);

  useEffect(() => {
    setPersonData({
      ...personData,
    });
  }, []);

  const savePerson = () => {
    console.log(personData);
    if (validateInputs()) {
      if (!editPerson) {
        createPerson(personData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      } else {
        updatePerson(personData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      }
      setPersonData(initialPersonState);
      setIsVisible(false);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Form error",
        detail: "Complete all fields",
      });
    }
  };
  const _deletePerson = () => {
    if (editPerson) {
      deletePerson(personData);
      setPersonData(initialPersonState);
      setIsVisible(false);
      setConfirm(false);
      toast.current.show({
        severity: "error",
        summary: "Deleted",
        detail: "Deleted data",
      });
    }
  };
  //If the input in the form change
  const onInputChange = (data: any, field: any) => {
    setPersonData({ ...personData, [field]: data });

    console.log(personData);
  };
  const validateInputs = () => {
    if (
      !personData.cedula ||
      !personData.nombre ||
      !personData.apellido ||
      !personData.email ||
      !personData.sexo ||
      !personData.telefono ||
      !personData.celular ||
      !personData.codigo_postal
    ) {
      setRequiredFieldsEmpty(true);
      return false;
    }
    return true;
  };

  return (
    <>
      {/* Dialogo para la creacion de una persona*/}
      <Dialog
        className="DialogoCentrado"
        header="NEW PERSON"
        modal={true}
        visible={isVisible}
        contentStyle={{ overflow: "visible" }}
        onHide={() => {
          setIsVisible(false);
          setEditPerson(null);
          setPersonData(initialPersonState);
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
                  id="cedula"
                  name="cedula"
                  value={personData.cedula}
                  onChange={(e) => onInputChange(e.target.value, "cedula")}
                />
                <label htmlFor="cedula">Identification Card</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="name"
                  name="name"
                  value={personData.nombre}
                  onChange={(e) => onInputChange(e.target.value, "nombre")}
                />
                <label htmlFor="name">Name</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="apellido"
                  name="apellido"
                  value={personData.apellido}
                  onChange={(e) => onInputChange(e.target.value, "apellido")}
                />
                <label htmlFor="lastname">LastName</label>
              </span>
            </div>
          </div>
        </div>

        <div className="card flex flex-wrap justify-content-center gap-3">
          <div className="input-container2">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="email"
                  name="email"
                  value={personData.email}
                  onChange={(e) => onInputChange(e.target.value, "email")}
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>
          </div>

          <div className="input-container2">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="sexo"
                  value={personData.sexo}
                  onChange={(e) => onInputChange(e.target.value, "sexo")}
                />
                <label htmlFor="Sex">Sex</label>
              </span>
            </div>
          </div>
          <div className="input-container2">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="telefono"
                  value={personData.telefono}
                  onChange={(e) => onInputChange(e.target.value, "telefono")}
                />
                <label htmlFor="Phone">Phone</label>
              </span>
            </div>
          </div>
        </div>
        <div className="card flex flex-wrap justify-content-center gap-3">
          <div className="input-container3">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="Cellphone"
                  value={personData.celular}
                  onChange={(e) => onInputChange(e.target.value, "celular")}
                />
                <label htmlFor="Cellphone">Cellphone</label>
              </span>
            </div>
          </div>
          <div className="input-container3">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="codigo postal"
                  value={personData.codigo_postal}
                  onChange={(e) =>
                    onInputChange(e.target.value, "codigo_postal")
                  }
                />
                <label htmlFor="Portal Code">Portal Code</label>
              </span>
            </div>
          </div>
        </div>

        <div className="input-container2">
          <Button
            label="Accept"
            icon="pi pi-check"
            onClick={savePerson}
            autoFocus
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              background: "black ",
            }}
          />
          <Button
            label="Delete"
            icon="pi pi-times"
            onClick={() => {
              if (editPerson) setConfirm(true);
            }}
            className="p-button-text"
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              background: "#8C0F29",
              color: "white",
              marginLeft: "5px",
              borderColor: "black",
            }}
          />
        </div>
      </Dialog>

      {/* Dialogo de eliminacion */}
      <Dialog
        header="Do you want to delete this record?"
        visible={confirm}
        style={{ width: "30vw" }}
        onHide={() => setConfirm(false)}
      >
        <div className="input-container2">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => {
              setConfirm(false);
            }}
            className="p-button-text"
          />
          <Button
            label="Confirm"
            icon="pi pi-check"
            onClick={_deletePerson}
            autoFocus
          />
        </div>
      </Dialog>
    </>
  );
};
export default PersonForm;
