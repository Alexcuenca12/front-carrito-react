import React, { useContext, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RolContext } from "./RolContext";
import { InputText } from "primereact/inputtext";
import "../../styles/Rol.css";
import { IRol } from "../../interfaces/IRol";

const RolForm = (props: any) => {
  //For the dialog state
  const { isVisible, setIsVisible, toast } = props;
  const [confirm, setConfirm] = useState(false);
  const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);
  //For the rol
  const initialRolState = {
    rolId: 0,
    rolNombre: "",
    descripcion: "",
  };
  const [rolData, setRolData] = useState<IRol>(initialRolState);
  const { createRol, deleteRol, updateRol, editRol, setEditRol } =
    useContext(RolContext);
  useEffect(() => {
    if (editRol) setRolData(editRol);
  }, [editRol]);
  useEffect(() => {
    if (editRol)
      setRolData({
        rolId: editRol.rolId,
        rolNombre: editRol.rolNombre,
        descripcion: editRol.descripcion,
      });
  }, [editRol]);
  useEffect(() => {
    setRolData({
      ...rolData,
    });
  }, []);

  const guardarRol = () => {
    console.log(rolData);
    if (validateInputs()) {
      if (!editRol) {
        console.log("si");
        createRol(rolData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      } else {
        updateRol(rolData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      }
      setRolData(initialRolState);
      setIsVisible(false);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Form error",
        detail: "Complete all fields",
      });
    }
  };
  const _borrarRol = () => {
    if (editRol) {
      deleteRol(rolData);
      setRolData(initialRolState);
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
    setRolData({ ...rolData, [field]: data });

    console.log(rolData);
  };

  const validateInputs = () => {
    if (!rolData.rolNombre || !rolData.descripcion) {
      setRequiredFieldsEmpty(true);
      return false;
    }
    return true;
  };

  return (
    <>
      {/* Dialogo para la creacion de una product*/}
      {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
      <Dialog
        className="DialogoCentrado"
        header="NEW ROL"
        modal={true}
        visible={isVisible}
        contentStyle={{ overflow: "visible" }}
        onHide={() => {
          setIsVisible(false);
          setEditRol(null);
          setRolData(initialRolState);
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
                  value={rolData.rolNombre}
                  onChange={(e) => onInputChange(e.target.value, "rolNombre")}
                />
                <label htmlFor="nombre">Name</label>
              </span>
            </div>
          </div>

          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="descripcion"
                  name="descripcion"
                  value={rolData.descripcion}
                  onChange={(e) => onInputChange(e.target.value, "descripcion")}
                />
                <label htmlFor="descripcion">Description</label>
              </span>
            </div>
          </div>
        </div>

        <div className="input-container2">
          <Button
            label="Accept"
            icon="pi pi-check"
            onClick={guardarRol}
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
              if (editRol) setConfirm(true);
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
            onClick={_borrarRol}
            autoFocus
          />
        </div>
      </Dialog>
    </>
  );
};
export default RolForm;
