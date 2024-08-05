import "../../styles/Bienvenida.css";
import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { useHistory } from "react-router-dom";
import UserForm from "../UserOut/UerFormO";

const Bienvenida = () => {
  const history = useHistory();
  const [seleccion, setSeleccion] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const toast = useRef(null);

  const newUser = (e: any) => {
    setSeleccion(e.target.id.slice(0, -1));
    setIsVisible(true);
  };

  function handleClick() {
    history.push({
      pathname: "/auth/login",
    });
  }

  return (
    <>
      <div>
        <Toast ref={toast} />
      </div>
      <div className="header flex flex-col">
        <div className="container flex">
          <div className="header-content">
            <h1 className="text-white fw-6 header-title" id="design">
              DESIGN * DEVELOPMENT * BRANDING
            </h1>
            <h1 className="text-white fw-6 header-title" id="dg">
              DIGITAL & TECH
            </h1>
            <h1 className="text-white fw-6 header-title" id="innovacion">
              INNOVACIÓN DE HOY PARA EL ÉXITO DEL MAÑANA
            </h1>
            <div className="btn-groups flex">
              <button
                type="button"
                className="btn-item bg-brown fw-4 ls-2"
                onClick={handleClick}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                className="btn-item bg-dark fw-4 ls-2"
                onClick={newUser}
              >
                Registrarse
              </button>
            </div>
          </div>
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

export default Bienvenida;
