import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { PersonService } from "../../services/PersonServices";
import { UserService } from "../../services/UserServices";
import "../../styles/User.css";
import { useHistory } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { IPerson } from "../../interfaces/IPerson";

const UserForm = (props: any) => {
  // El código que se muestra define una constante llamada
  // initialPersonState que inicializa un objeto de tipo IPerson
  // Esta constante podría ser utilizada como un estado inicial en
  // una aplicación de gestión de personas
  const { isVisible, setIsVisible, toast } = props;
  const initialPersonState: IPerson = {
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
  // El código que se muestra define una constante llamada
  // initialUserState que inicializa un objeto de tipo IUser
  // Esta constante podría ser utilizada como un estado inicial en
  // una aplicación de gestión de usuarios
  const initialUserState: IUser = {
    id_usuario: 0,
    username: "",
    password: "",
    persona: initialPersonState,
    rol: {
      rolId: 0,
      rolNombre: "",
      descripcion: "",
    },
  };

  //Metodo para abrir el login
  const history = useHistory();
  function handleClick() {
    history.push({
      pathname: "/auth/login",
    });
  }
  //Instancias de los servicios de Person/Usuario
  const personService = new PersonService();
  const userService = new UserService();
  // Estos dos estados se utilizan para almacenar y actualizar los datos de una
  // persona y un usuario en un componente de React.
  const [personData, setPersonData] = useState<IPerson>(initialPersonState);
  const [user, setUser] = useState<IUser>(initialUserState);

  const guardar = () => {
    //se llama al método save del servicio personService y se pasa el objeto
    //  personData como parámetro. Este método devuelve una promesa que, cuando
    //  se resuelve, devuelve un objeto result que contiene la información de la
    //  persona guardada en la base de datos, incluyendo el id_persona.
    personService
      .save(personData)
      .then((result) => {
        // se crea un nuevo objeto userConId utilizando el operador spread
        //  ... para copiar todas las propiedades del objeto user, y se agregan
        //   dos nuevas propiedades: persona que contiene un objeto con el
        //   id_persona obtenido del resultado anterior, y rol que contiene
        //   un objeto con el rolId igual a 1.
        const userConId = {
          ...user,
          persona: { id_persona: result.id_persona },
          rol: { rolId: 1 },
        };
        // Se llama al método save del servicio userService y se pasa el objeto userConId
        // como parámetro. Este método también devuelve una promesa que, cuando se resuelve,
        //  devuelve un objeto userResult que contiene la información del usuario guardado
        //  en la base de datos.
        userService
          .save(userConId)
          .then((userResult) => {
            // Si ambos métodos save se ejecutan correctamente, se muestra un mensaje de
            // éxito utilizando el componente toast de PrimeReact
            console.log(userResult);
            toast.current.show({
              severity: "success",
              summary: "Succesful",
              detail: "Succesful operation",
              life: 3000,
            });
            handleClick();
          })
          .catch((userError) => {
            console.error(userError);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Esta función se utiliza para actualizar el estado personData/user
  // con un nuevo valor cada vez que se produce un cambio en un
  // campo de entrada de datos. Esto permite mantener los datos
  // del formulario de entrada de datos en sincronía con el estado
  // actual de la aplicación.
  const onInputChange = (data: any, field: string) => {
    setPersonData({ ...personData, [field]: data });
  };

  const onInputChangeUser = (data: any, field: string) => {
    setUser({ ...user, [field]: data });
  };
  return (
    <>
      {/* Dialogo para la creacion de un usuario*/}
      <Dialog
        className="DialogoCentrado"
        header="NEW USER"
        modal={true}
        visible={isVisible}
        contentStyle={{ overflow: "visible" }}
        onHide={() => {
          setIsVisible(false);
        }}
        style={{
          width: "700px",
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
                  // Este código se utiliza para actualizar el estado personData
                  // con el valor actual de un campo de entrada de datos, cada vez
                  // que el usuario realiza un cambio en el mismo. Esto permite
                  // mantener los datos del formulario de entrada de datos en
                  // sincronía con el estado actual de la aplicación.
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
                  onChange={(e) =>
                    onInputChange(e.target.value, "codigo_postal")
                  }
                />
                <label htmlFor="Portal Code">Portal Code</label>
              </span>
            </div>
          </div>
        </div>

        <div className="card flex flex-wrap gap-3">
          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <InputText
                  id="name"
                  name="name"
                  onChange={(e) =>
                    onInputChangeUser(e.target.value, "username")
                  }
                />
                <label htmlFor="username">Username</label>
              </span>
            </div>
          </div>
          <div className="input-container">
            <div className="p-inputgroup">
              <span className="p-float-label card flex justify-content-center">
                <Password
                  id="password"
                  name="password"
                  style={{ fontSize: "15px" }}
                  onChange={(e) =>
                    onInputChangeUser(e.target.value, "password")
                  }
                />
                <label htmlFor="password">Password</label>
              </span>
            </div>
          </div>
        </div>

        <div className="input-container2">
          <Button
            label="Accept"
            icon="pi pi-check"
            onClick={guardar}
            autoFocus
            style={{
              fontFamily:
                "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
              background: "black ",
            }}
          />
        </div>
      </Dialog>
    </>
  );
};
export default UserForm;
