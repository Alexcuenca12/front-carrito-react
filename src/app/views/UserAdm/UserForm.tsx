import React, { useContext, useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { UserContext } from "./UserContext";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import "../../styles/User.css";
import { IUser } from "../../interfaces/IUser";
import { IRol } from "../../interfaces/IRol";
import { RolService } from "../../services/RolService";
import { IPerson } from "../../interfaces/IPerson";
import { PersonService } from "../../services/PersonServices";

const UserForm = (props: any) => {
  //For the dialog state
  const { isVisible, setIsVisible, toast } = props;
  const [confirm, setConfirm] = useState(false);
  //roles variables
  const [selectedRol, setSelectedRol] = useState<IRol | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null);

  const [roles, setRoles] = useState<IRol[]>([]);
  const rolService = new RolService();

  const [people, setPeople] = useState<IPerson[]>([]);
  const personService = new PersonService();

  //For the user
  const initialUserState = {
    id_usuario: 0,
    username: "",
    password: "",
    persona: {
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
    },
    rol: {
      rolId: 0,
      rolNombre: "",
      descripcion: "",
    },
  };
  const [userData, setUserData] = useState<IUser>(initialUserState);
  const { createUser, deleteUser, updateUser, editUser, setEditUser } =
    useContext(UserContext);
  useEffect(() => {
    if (editUser) setUserData(editUser);
  }, [editUser]);
  useEffect(() => {
    if (editUser) setUserData(editUser);
  }, [editUser]);
  useEffect(() => {
    setUserData({
      ...userData,
    });
  }, []);

  const guardarUser = () => {
    console.log(userData);
    if (validateInputs()) {
      if (!editUser) {
        createUser(userData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      } else {
        updateUser(userData);
        toast.current.show({
          severity: "success",
          summary: "Succesful",
          detail: "Succesful operation",
          life: 3000,
        });
      }
      setUserData(initialUserState);
      setIsVisible(false);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Form error",
        detail: "Complete all fields",
      });
    }
  };
  const _borrarUser = () => {
    if (editUser) {
      deleteUser(userData);
      setUserData(initialUserState);
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
    setUserData({ ...userData, [field]: data });

    console.log(userData);
  };
  const [requiredFieldsEmpty, setRequiredFieldsEmpty] = useState(false);
  const validateInputs = () => {
    if (!userData.password || !userData.username) {
      setRequiredFieldsEmpty(true);
      return false;
    }
    return true;
  };

  //For the dropdown
  const selectedRolTemplate = (option: any, props: any) => {
    if (option) {
      return <div className="flex align-items-center">{option.rolNombre}</div>;
    }
    return <span>{props.placeholder}</span>;
  };
  const selectedPersonTemplate = (option: any, props: any) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          {option.nombre + " " + option.apellido}
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const rolOptionTemplate = (option: any) => {
    return <>{option.rolNombre}</>;
  };
  function onRolChange(rol: any) {
    setSelectedRol(rol);
  }
  useEffect(() => {
    rolService.getAll().then((data) => {
      setRoles(data);
    });
  }, []);

  const personOptionTemplate = (option: any) => {
    return <>{option.nombre + " " + option.apellido}</>;
  };
  function onPersonChange(person: any) {
    setSelectedPerson(person);
  }
  useEffect(() => {
    personService.getAll().then((data) => {
      setPeople(data);
    });
  }, []);

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
          setEditUser(null);
          setUserData(initialUserState);
        }}
        style={{
          width: "400px",
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
                  value={userData.username}
                  onChange={(e) => onInputChange(e.target.value, "username")}
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
                  value={userData.password}
                  style={{ fontSize: "15px" }}
                  onChange={(e) => onInputChange(e.target.value, "password")}
                />
                <label htmlFor="password">Password</label>
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
                  valueTemplate={selectedRolTemplate}
                  itemTemplate={rolOptionTemplate}
                  value={userData.rol}
                  onChange={(e) => {
                    onRolChange(e.value);
                    onInputChange(e.target.value, "rol");
                  }}
                  options={roles}
                  optionLabel="rolNombre"
                  placeholder="Select one rol"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card flex flex-wrap justify-content-center gap-3">
          <div className="input-container2">
            <div className="p-inputgroup">
              <div className="card flex justify-content-center elementosDialog">
                <Dropdown
                  filter
                  valueTemplate={selectedPersonTemplate}
                  itemTemplate={personOptionTemplate}
                  value={userData.persona}
                  style={{ fontSize: "15px" }}
                  onChange={(e) => {
                    onPersonChange(e.value);
                    onInputChange(e.target.value, "persona");
                  }}
                  options={people}
                  optionLabel="nombre"
                  placeholder="Select one person"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="input-container2">
          <Button
            label="Accept"
            icon="pi pi-check"
            onClick={guardarUser}
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
              if (editUser) setConfirm(true);
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
            onClick={_borrarUser}
            autoFocus
          />
        </div>
      </Dialog>
    </>
  );
};
export default UserForm;
