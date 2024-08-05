import React, { createContext, useEffect, useState } from "react";
import { PersonService } from "../../services/PersonServices";
import { IPerson } from "../../interfaces/IPerson";

//Interfaz del contexto de persona,
//con las operaciones que se exportaran
interface IPersonContext {
  people: IPerson[];
  editPerson: IPerson | null;
  createPerson: (person: IPerson) => void;
  deletePerson: (person: IPerson) => void;
  findPerson: (id: number) => void;
  updatePerson: (person: IPerson) => void;
  setEditPerson: React.Dispatch<React.SetStateAction<IPerson | null>>;
}
//Contexto exportable con las operaciones vacias
export const PersonContext = createContext<IPersonContext>({
  people: [],
  editPerson: null,
  createPerson: (person: IPerson) => {},
  deletePerson: (person: IPerson) => {},
  findPerson: (id: number) => {},
  updatePerson: (person: IPerson) => {},
  setEditPerson: () => {},
});

const PersonContextProvider = (props: any) => {
  //Objeto para usar los servicios
  const personService = new PersonService();

  //Lista para almacenar las personas
  const [people, setPerson] = useState<IPerson[]>([]);

  //Variable para almacenar una persona transitoria
  const [editPerson, setEditPerson] = useState<IPerson | null>(null);

  //LLena el array de personas cada que se refresca la pagina
  useEffect(() => {
    personService.getAll().then((data) => {
      setPerson(data);
    });
  }, []);

  //Operacion de creacion
  const createPerson = (person: any) => {
    personService.save(person).then((data) => {
      setPerson([...people, data]);
    });
  };
  //Operacion de eliminacion
  const deletePerson = (id: any) => {
    personService
      .delete(id)
      .then(() => setPerson(people.filter((p) => p.id_persona !== id)));
    setEditPerson(null);
  };
  //Operacion de busqueda
  const findPerson = (id: number) => {
    const person = people.find((p) => p.id_persona === id);
    setEditPerson(person || null);
  };
  //Operacion de actualizacion
  const updatePerson = (person: any) => {
    personService
      .update(person)
      .then((data) =>
        setPerson(
          people.map((e) => (e.id_persona === person.id_persona ? data : e))
        )
      );

    setEditPerson(null);
  };
  //Se envia los metodos dentro de la etiqueta de contexto
  return (
    <PersonContext.Provider
      value={{
        createPerson,
        deletePerson,
        findPerson,
        updatePerson,
        editPerson,
        people,
        setEditPerson,
      }}
    >
      {props.children}
    </PersonContext.Provider>
  );
};
export default PersonContextProvider;
