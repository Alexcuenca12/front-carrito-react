import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./home/Home";
import { Toast } from "primereact/toast";
import React, { useEffect, useState, useRef } from "react";
import { NavBarCliente } from "../../common/NavBarCliente";
import { NavBarUserDisabled } from "../../common/NavBarUserDisabled";
import CategoryContextProvider from "../CategoryAdm/CategoryContext";
import { CategoryList } from "../CategoryAdm/CategoryList";
import ProductContextProvider from "../ProductsAdm/ProductContext";
import { ProductList } from "../ProductsAdm/ProductList";
import RolContextProvider from "../RolAdm/RolContext";
import { RolList } from "../RolAdm/RolList";
import Catalogue from "../Catalogue/Catalogue";
import { IProduct } from "../../interfaces/IProduct";
import { ProductService } from "../../services/ProductServices";
import { Cart } from "../..//views/Catalogue/Cart";
import PersonContextProvider from "../PersonAdm/PersonContext";
import { PersonList } from "../PersonAdm/PersonList";
import UserContextProvider from "../UserAdm/UserContext";
import { UserList } from "../UserAdm/UserList";
import { Navbar } from "../../common/NavBar";
import CartList from "../Carts/CartList";
import CartListAdm from "../Carts/CartListAdm";

export const DashboardRouter = () => {
  //Datos del sessionStorage
  const userData = sessionStorage.getItem("user");
  const userObj = JSON.parse(userData || "{}");
  const rol = userObj.rol;
  const enabled = userObj.enabled;
  const toast = useRef<Toast>(null);

  // Se está declarando y manejando el estado de products utilizando el hook useState de React,
  // lo que permitirá que el componente renderice la información relacionada con los productos
  // en función de su estado actual.
  const [products, setProducts] = useState<IProduct[]>([]);

  // Se obtienen los datos de todos los productos utilizando la instancia de
  // ProductService y actualizar el estado products utilizando la función setProducts
  const productService = new ProductService();
  useEffect(() => {
    productService.getAll().then((data) => setProducts(data));
  }, []);

  //Se utiliza a travez de Toast para mostrar mensajes de confirmacion/error.
  const showError = (errorPrincipal: string, detalleError: string) => {
    toast.current?.show({
      severity: "error",
      summary: errorPrincipal,
      detail: detalleError,
      life: 3000,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <main>
        <div>
          <div>
            <Switch>
              {/* En este caso se usar la validacion de rol y si esta habilitado para direccionarse
              al NavBar correspondiente en este caso si es rol = 1 llevara al de Cliente y si es 
              rol = 2 llevara al de Administrador, si no coincide con ninguno de los dos
              sera llevado a un componente que informara que el usuario no existe o se encuentra 
              deshabilitado  */}
              <Route path="/dashboard/home">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <Home />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <Home />
                  </>
                ) : (
                  <>
                    <Navbar />
                  </>
                )}
              </Route>

              <Route path="/login">
                {rol === 1 && enabled === true ? (
                  <NavBarCliente />
                ) : rol === 2 && enabled === true ? (
                  <Navbar />
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              {/* Aquí se define una ruta /category utilizando Route y se renderiza 
              un conjunto de componentes diferentes en función de las variables rol y enabled. 
              Se utiliza CategoryContextProvider para proporcionar un contexto compartido entre 
              los componentes NavBarCliente o Navbar y CategoryList.
              En caso de que  enabled es falso o rol no es igual a 1 o 2, se renderiza NavBarUserDisabled, 
              que es un componente que muestra un mensaje de usuario deshabilitado. Y asi sucesivamente para
              el resto de componentes*/}
              <Route path="/category">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <CategoryContextProvider>
                      <CategoryList></CategoryList>
                    </CategoryContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <CategoryContextProvider>
                      <CategoryList></CategoryList>
                    </CategoryContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/product">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <ProductContextProvider>
                      <ProductList />
                    </ProductContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <ProductContextProvider>
                      <ProductList />
                    </ProductContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/rol">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <RolContextProvider>
                      <RolList />
                    </RolContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <RolContextProvider>
                      <RolList />
                    </RolContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/person">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <PersonContextProvider>
                      <PersonList />
                    </PersonContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <PersonContextProvider>
                      <PersonList />
                    </PersonContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/user">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <UserContextProvider>
                      <UserList />
                    </UserContextProvider>
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <UserContextProvider>
                      <UserList />
                    </UserContextProvider>
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="/catalogue">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <Catalogue />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <Catalogue />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/cart">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <Cart />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <Cart />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>
              <Route path="/cartList">
                {rol === 1 && enabled === true ? (
                  <>
                    <NavBarCliente />
                    <CartList />
                  </>
                ) : rol === 2 && enabled === true ? (
                  <>
                    <Navbar />
                    <CartListAdm />
                  </>
                ) : (
                  <NavBarUserDisabled />
                )}
              </Route>

              <Route path="*">
                {rol === 1 && enabled === true ? (
                  <NavBarCliente />
                ) : rol === 2 && enabled === true ? (
                  <Navbar />
                ) : (
                  <NavBarUserDisabled />
                )}
                <Redirect to="/dashboard/home" />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </>
  );
};
