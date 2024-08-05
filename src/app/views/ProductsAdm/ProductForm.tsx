import React, { useContext, useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProductContext } from "./ProductContext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import "../../styles/Product.css";
import { IProduct } from "../../interfaces/IProduct";
import { ICategory } from "../../interfaces/ICategory";
import { CategoryService } from "../../services/CategoryServices";

//Formulario que funciona para la creacion, actualizacion
//y eliminado de los productos
const ProductsForm = (props: any) => {
  //Control del dialogo de creacion
  const { isVisible, setIsVisible, toast } = props;
  const [confirm, setConfirm] = useState(false);
  //Variables para controlar las categorias
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const categoryService = new CategoryService();
  //Variables para controlar los productos
  const initialProductState = {
    id_producto: 0,
    nom_Producto: "",
    stock: 0,
    descripcion: "",
    valor_unitario: 0,
    foto: "",
    enabled: true,
    categoria: {
      id_categoria: 0,
      nombre_categoria: "",
      descripcion_categoria: "",
      enabled: true,
      producto: null,
    },
  };
  const [productData, setProductData] = useState<IProduct>(initialProductState);
  //Importamos las operacions del contexto
  const {
    createProduct,
    deleteProduct,
    updateProduct,
    editProduct,
    setEditProduct,
  } = useContext(ProductContext);
  //Verificamos si el dialogo precargara la informacion en caso de editar
  useEffect(() => {
    if (editProduct) setProductData(editProduct);
    setSelectedFile("si");
  }, [editProduct]);
  //Precargamos la informacion en los componentes del formulario
  useEffect(() => {
    setProductData({
      ...productData,
    });
  }, []);
  //Metodo para guardar o editar el producto
  const guardarProduct = () => {
    if (validateInputs()) {
      if (!editProduct) {
        createProduct(productData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      } else {
        updateProduct(productData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      }
      setProductData(initialProductState);
      setIsVisible(false);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Form error",
        detail: "Complete all fields",
      });
    }
  };
  //Metodo para borrar un producto
  const _borrarProduct = () => {
    if (editProduct) {
      deleteProduct(productData);
      setProductData(initialProductState);
      setIsVisible(false);
      setConfirm(false);
      toast.current.show({
        severity: "error",
        summary: "Deleted",
        detail: "Deleted data",
      });
    }
  };
  //metodo para colocar en el objeto lo que se inserte en los campos del formulario
  const onInputChange = (data: any, field: any) => {
    setProductData({ ...productData, [field]: data });
  };
  //Validacion de campos completados
  const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);
  const validateInputs = () => {
    if (
      !productData.nom_Producto ||
      !productData.categoria ||
      !productData.descripcion ||
      !productData.foto ||
      !productData.stock ||
      !productData.valor_unitario
    ) {
      setRequiredFieldsEmpty(true);
      return false;
    }
    return true;
  };

  //Metodos necesarios para el dropdown de categorias
  const selectedPacientTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="flex align-items-center">{option.nombre_categoria}</div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const categoryOptionTemplate = (option: any) => {
    return <>{option.nombre_categoria}</>;
  };
  function onCategoryChange(categoria: any) {
    setSelectedCategory(categoria);
  }
  useEffect(() => {
    categoryService.getAll().then((data) => {
      setCategorys(data);
    });
  }, []);

  //Metodos para la imagen del producto

  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileUploadRef = useRef<any>(null);
  function onFileSelect(event: any) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = function (e: any) {
      setSelectedFile(e.target.result);
      const buffer = e.target.result;
      const byteArray = new Uint8Array(buffer);
      const base64String = bytesToBase64(byteArray);
      console.log(base64String);
      onInputChange(base64String, "foto");
    };
    reader.readAsArrayBuffer(file);
  }

  function bytesToBase64(bytes: Uint8Array): string {
    let binary = "";
    const length = bytes.byteLength;
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function onClear() {
    setSelectedFile(null);
    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  }
  //Vista
  return (
    <>
      {/* Dialogo para la creacion de una product*/}
      <Dialog
        className="DialogoCentrado"
        header="NEW PRODUCT"
        modal={true}
        visible={isVisible}
        contentStyle={{ overflow: "visible" }}
        onHide={() => {
          setIsVisible(false);
          setEditProduct(null);
          setProductData(initialProductState);
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
                  onChange={(e) =>
                    onInputChange(e.target.value, "nom_Producto")
                  }
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
                  onChange={(e) => onInputChange(e.value, "stock")}
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
                  onChange={(e) => onInputChange(e.target.value, "descripcion")}
                />
                <label htmlFor="description">Description</label>
              </span>
            </div>
          </div>
        </div>

        <div className="card flex flex-wrap justify-content-center gap-3">
          <div className="input-container2">
            <div className="p-inputgroup">
              <div className="card flex justify-content-center elementosDialog">
                <Dropdown
                  filter
                  valueTemplate={selectedPacientTemplate}
                  itemTemplate={categoryOptionTemplate}
                  value={productData.categoria}
                  style={{
                    fontFamily:
                      "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                  }}
                  onChange={(e) => {
                    onCategoryChange(e.value);
                    onInputChange(e.target.value, "categoria");
                  }}
                  options={categorys}
                  optionLabel="nombre_categoria"
                  placeholder="Select a category"
                />
              </div>
            </div>
          </div>

          <div className="input-container2">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputNumber
                  inputId="currency-us"
                  value={productData.valor_unitario}
                  onChange={(e) => onInputChange(e.value, "valor_unitario")}
                  style={{
                    fontFamily:
                      "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                  }}
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
                {selectedFile && productData.foto ? (
                  <div className="elementoImg ">
                    <img
                      className="imagen"
                      src={`data:image/jpeg;base64,${productData.foto}`}
                      alt="Preview"
                      style={{
                        fontFamily:
                          "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                      }}
                    />
                    <br />
                    <Button
                      className="botonimagen"
                      onClick={onClear}
                      style={{
                        fontFamily:
                          "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                        background: "black",
                      }}
                    >
                      Clear selection
                    </Button>
                  </div>
                ) : (
                  <FileUpload
                    className="custom-file-upload"
                    ref={fileUploadRef}
                    mode="basic"
                    accept="image/*"
                    maxFileSize={1000000}
                    previewWidth={130}
                    onSelect={onFileSelect}
                    chooseLabel="Select image"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="input-container2">
          <Button
            label="Accept"
            icon="pi pi-check"
            onClick={guardarProduct}
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
              if (editProduct) setConfirm(true);
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
            onClick={_borrarProduct}
            autoFocus
          />
        </div>
      </Dialog>
    </>
  );
};
export default ProductsForm;
