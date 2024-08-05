import React, { createContext, useEffect, useState } from "react";
import { UserService } from "../../services/UserServices";
import { IUser } from "../../interfaces/IUser";

interface IUserContext {
  users: IUser[];
  editUser: IUser | null;
  createUser: (user: IUser) => void;
  deleteUser: (user: IUser) => void;
  findUser: (id: number) => void;
  updateUser: (user: IUser) => void;
  setEditUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}
export const UserContext = createContext<IUserContext>({
  users: [],
  editUser: null,
  createUser: (user: IUser) => {},
  deleteUser: (user: IUser) => {},
  findUser: (id: number) => {},
  updateUser: (user: IUser) => {},
  setEditUser: () => {},
});

const UserContextProvider = (props: any) => {
  const userService = new UserService();

  const [users, setUser] = useState<IUser[]>([]);

  const [editUser, setEditUser] = useState<IUser | null>(null);

  useEffect(() => {
    userService.getAll().then((data) => {
      setUser(data);
    });
  }, []);

  const createUser = (user: any) => {
    userService.save(user).then((data) => {
      setUser([...users, data]);
    });
  };

  const deleteUser = (id: any) => {
    userService
      .delete(id)
      .then(() => setUser(users.filter((p) => p.id_usuario !== id)));
    setEditUser(null);
  };

  const findUser = (id: number) => {
    const user = users.find((p) => p.id_usuario === id);
    setEditUser(user || null);
  };
  const updateUser = (user: any) => {
    userService
      .update(user)
      .then((data) =>
        setUser(users.map((e) => (e.id_usuario === user.id_usuario ? data : e)))
      );

    setEditUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        deleteUser,
        findUser,
        updateUser,
        editUser,
        users,
        setEditUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
