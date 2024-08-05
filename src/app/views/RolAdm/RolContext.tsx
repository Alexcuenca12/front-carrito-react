import React, { createContext, useEffect, useState } from "react";
import { RolService } from "../../services/RolService";
import { IRol } from "../../interfaces/IRol";

//Interfaz del contexto de rol,
//con las operaciones que se exportaran
interface IRolContext {
  roles: IRol[];
  editRol: IRol | null;
  createRol: (Rol: IRol) => void;
  deleteRol: (Rol: IRol) => void;
  findRol: (id: number) => void;
  updateRol: (Rol: IRol) => void;
  setEditRol: React.Dispatch<React.SetStateAction<IRol | null>>;
}
//Contexto exportable con las operaciones vacias
export const RolContext = createContext<IRolContext>({
  roles: [],
  editRol: null,
  createRol: (rol: IRol) => {},
  deleteRol: (rol: IRol) => {},
  findRol: (id: number) => {},
  updateRol: (rol: IRol) => {},
  setEditRol: () => {},
});

const RolContextProvider = (props: any) => {
  //Objeto para usar los servicios
  const roleService = new RolService();

  //Lista para almacenar los roles
  const [roles, setRoles] = useState<IRol[]>([]);

  //Variable para almacenar un rol transitorio
  const [editRol, setEditRol] = useState<IRol | null>(null);

  //LLena el array de roles cada que se refresca la pagina
  useEffect(() => {
    roleService.getAll().then((data) => {
      setRoles(data);
    });
  }, []);

  //Operacion de creacion
  const createRol = (rol: any) => {
    roleService.save(rol).then((data) => {
      setRoles([...roles, data]);
    });
  };

  //Operacion de eliminacion
  const deleteRol = (id: any) => {
    roleService
      .delete(id)
      .then(() => setRoles(roles.filter((p) => p.rolId !== id)));
    setEditRol(null);
  };

  //Operacion de busqueda
  const findRol = (id: number) => {
    const rol = roles.find((p) => p.rolId === id);
    setEditRol(rol || null);
  };

  //Operacion de actualizacion
  const updateRol = (rol: any) => {
    roleService
      .update(rol)
      .then((data) =>
        setRoles(roles.map((e) => (e.rolId === rol.rolId ? data : e)))
      );

    setEditRol(null);
  };

  //Se envia los metodos dentro de la etiqueta de contexto
  return (
    <RolContext.Provider
      value={{
        createRol,
        deleteRol,
        findRol,
        updateRol,
        editRol,
        roles,
        setEditRol,
      }}
    >
      {props.children}
    </RolContext.Provider>
  );
};
export default RolContextProvider;
