import React, { useContext, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { CategoryContext } from "./CategoryContext";
import { InputText } from "primereact/inputtext";

import "../../styles/Category.css";
import { ICategory } from "../../interfaces/ICategory";

//Formulario, Dialogo para crear o editar
const CategorysForm = (props: any) => {
  //Control del dialogo
  const { isVisible, setIsVisible, toast } = props;
  const [confirm, setConfirm] = useState(false);
  //Estado inicial
  const initialCategoryState = {
    id_categoria: 0,
    nombre_categoria: "",
    descripcion_categoria: "",
    enabled: true,
    producto: null,
  };
  //Datos transitorios
  const [categoryData, setCategoryData] =
    useState<ICategory>(initialCategoryState);
  //Operaciones del contexto
  const {
    createCategory,
    deleteCategory,
    updateCategory,
    editCategory,
    setEditCategory,
  } = useContext(CategoryContext);
  //Control de precarga de datos
  useEffect(() => {
    if (editCategory)
      setCategoryData({
        id_categoria: editCategory.id_categoria,
        nombre_categoria: editCategory.nombre_categoria,
        descripcion_categoria: editCategory.descripcion_categoria,
      });
  }, [editCategory]);
  //Precarga de datos
  useEffect(() => {
    setCategoryData({
      ...categoryData,
    });
  }, []);
  //Guardado o actualizacion
  const guardarCategory = () => {
    console.log(categoryData);
    if (validateInputs()) {
      if (!editCategory) {
        console.log("si");
        createCategory(categoryData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      } else {
        updateCategory(categoryData);
      }
      setCategoryData(initialCategoryState);
      setIsVisible(false);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Form error",
        detail: "Complete all fields",
      });
    }
  };
  //Borrado
  const _borrarCategory = () => {
    if (editCategory) {
      console.log(categoryData);
      deleteCategory(categoryData);
      setCategoryData(initialCategoryState);
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
    setCategoryData({ ...categoryData, [field]: data });

    console.log(categoryData);
  };
  //Para validar campos vacios
  const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);

  const validateInputs = () => {
    if (!categoryData.nombre_categoria || !categoryData.descripcion_categoria) {
      setRequiredFieldsEmpty(true);
      return false;
    }
    return true;
  };
  //Vista
  return (
    <>
      <Dialog
        className="DialogoCentrado"
        header={"NEW CATEGORY"}
        modal={true}
        visible={isVisible}
        contentStyle={{ overflow: "visible" }}
        onHide={() => {
          setIsVisible(false);
          setEditCategory(null);
          setCategoryData(initialCategoryState);
        }}
        style={{
          width: "800px",
          fontFamily:
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        }}
      >
        <div className="card flex flex-wrap gap-2">
          <div className="input-container2">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="nombre"
                  name="nombre"
                  value={categoryData.nombre_categoria}
                  onChange={(e) =>
                    onInputChange(e.target.value, "nombre_categoria")
                  }
                />
                <label htmlFor="nombre">Name</label>
              </span>
            </div>
          </div>

          <div className="input-container2">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="description"
                  name="description"
                  value={categoryData.descripcion_categoria}
                  onChange={(e) =>
                    onInputChange(e.target.value, "descripcion_categoria")
                  }
                />
                <label htmlFor="description">Description</label>
              </span>
            </div>
          </div>
        </div>

        <div className="input-container2">
          <Button
            label="Accept"
            icon="pi pi-check"
            onClick={guardarCategory}
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
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              background: "#8C0F29",
              color: "white",
              marginLeft: "5px",
              borderColor: "black",
            }}
            onClick={() => {
              if (editCategory) setConfirm(true);
            }}
            className="p-button-text"
          />
        </div>
      </Dialog>

      {/* Dialogo de eliminacion */}
      <Dialog
        header="Do you want to delete this record?"
        visible={confirm}
        style={{ width: "25vw" }}
        onHide={() => setConfirm(false)}
      >
        <div>
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => {
              setIsVisible(false);
              setEditCategory(null);
              setConfirm(false);
            }}
            className="p-button-text"
          />
          <Button
            label="Confirm"
            icon="pi pi-check"
            onClick={_borrarCategory}
            autoFocus
          />
        </div>
      </Dialog>
    </>
  );
};
export default CategorysForm;
