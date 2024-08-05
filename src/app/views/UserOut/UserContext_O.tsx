import React, { createContext, useState } from "react";
import { UserService } from "../../services/UserServices";
import { PersonService } from "../../services/PersonServices";
import { IUser } from "../../interfaces/IUser";
import { IPerson } from "../../interfaces/IPerson";

interface IUserContext {
  people: IPerson[];
  createPerson: (person: IPerson) => void;
  users: IUser[];
  createUser: (user: IUser) => void;
}

export const UserContext = createContext<IUserContext>({
  people: [],
  createPerson: (person: IPerson) => {},
  users: [],
  createUser: (user: IUser) => {},
});

const UserContextProvider = (props: any) => {
  const userService = new UserService();
  const personService = new PersonService();

  const [users, setUser] = useState<IUser[]>([]);
  const [people, setPerson] = useState<IPerson[]>([]);

  const createPerson = (person: any) => {
    personService.save(person).then((data) => {
      setPerson([...people, data]);
    });
  };

  const createUser = (user: any) => {
    userService.save(user).then((data) => {
      setUser([...users, data]);
    });
  };

  return (
    <UserContext.Provider
      value={{
        createPerson,
        createUser,
        users,
        people,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
