import React, { createContext, useEffect, useState } from "react";
import { CategoryService } from "../../services/CategoryServices";
import { ICategory } from "../../interfaces/ICategory";

// Interfaz con las operacions del contexto
interface ICategoryContext {
  categorys: ICategory[];
  editCategory: ICategory | null;
  createCategory: (category: ICategory) => void;
  deleteCategory: (category: ICategory) => void;
  findCategory: (id: number) => void;
  updateCategory: (category: ICategory) => void;
  setEditCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
}
//Exportable de las operaciones del contexto
export const CategoryContext = createContext<ICategoryContext>({
  categorys: [],
  editCategory: null,
  createCategory: (category: ICategory) => {},
  deleteCategory: (category: ICategory) => {},
  findCategory: (id: number) => {},
  updateCategory: (category: ICategory) => {},
  setEditCategory: () => {},
});

//Operaciones del contexto
const CategoryContextProvider = (props: any) => {
  //Objeto de los servicios
  const categoryService = new CategoryService();
  //Lista
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  //Objeto trancitorio
  const [editCategory, setEditCategory] = useState<ICategory | null>(null);
  //Refresca los datos de la lista
  useEffect(() => {
    categoryService.getAll().then((data) => {
      setCategorys(data);
    });
  }, []);
  //Crear
  const createCategory = (category: any) => {
    categoryService.save(category).then((data) => {
      setCategorys([...categorys, data]);
    });
  };
  //Eliminar
  const deleteCategory = (category: any) => {
    categoryService
      .delete(category)
      .then((data) =>
        setCategorys(
          categorys.map((e) =>
            e.id_categoria === category.id_categoria ? data : e
          )
        )
      );

    setEditCategory(null);
  };
  //Busqueda
  const findCategory = (id: number) => {
    const category = categorys.find((p) => p.id_categoria === id);
    setEditCategory(category || null);
  };
  //Actualizacion
  const updateCategory = (category: any) => {
    categoryService
      .update(category)
      .then((data) =>
        setCategorys(
          categorys.map((e) =>
            e.id_categoria === category.id_categoria ? data : e
          )
        )
      );

    setEditCategory(null);
  };
  //Exportacion
  return (
    <CategoryContext.Provider
      value={{
        createCategory,
        deleteCategory,
        findCategory,
        updateCategory,
        editCategory,
        categorys,
        setEditCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
export default CategoryContextProvider;
