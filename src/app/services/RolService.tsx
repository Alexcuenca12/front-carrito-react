import axios from "axios";

export class RolService {
  //url base para el componente rol, esta url se encuentra expresada
  //en la api
  baseUrl = "http://localhost:8080/api/rol/";

  //Método para listar todas los Roles
  getAll() {
    return axios.get(this.baseUrl + "listar").then((res) => res.data);
  }
  //Método para guardar Roles
  save(user: any) {
    return axios.post(this.baseUrl + "crear", user).then((res) => res.data);
  }
  //Método para cambiar el estado enabled a false de un Rol (Eliminado lógico)
  delete(user: any) {
    return axios
      .put(this.baseUrl + "eliminar/" + user.id_usuario, user)
      .then((res) => res.data);
  }

  //Método para actualizar un rol basado en el id del mismo
  update(user: any) {
    return axios
      .put(this.baseUrl + "actualizar/" + user.id_usuario, user)
      .then((res) => res.data);
  }
}
