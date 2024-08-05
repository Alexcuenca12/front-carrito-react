import axios from "axios";

export class PersonService {
  //url base para el componente persona, esta url se encuentra expresada
  //en la api
  baseUrl = "http://localhost:8080/api/persona/";

  //Metodo para listar todas las Personas
  getAll() {
    return axios.get(this.baseUrl + "listar").then((res) => res.data);
  }
  //Metodo para guardar Personas
  save(person: any) {
    return axios.post(this.baseUrl + "crear", person).then((res) => res.data);
  }
  //Metodo para cambiar el estado enabled a false de una Persona
  //(Eliminado lógico)
  delete(person: any) {
    return axios
      .put(this.baseUrl + "eliminar/" + person.id_persona, person)
      .then((res) => res.data);
  }
  //Metodo para actualizar una persona basado en el id de la misma
  update(person: any) {
    return axios
      .put(this.baseUrl + "actualizar/" + person.id_persona, person)
      .then((res) => res.data);
  }
}
