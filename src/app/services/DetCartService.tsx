import axios from 'axios';


export class DetCartService {
   baseUrl = "http://localhost:8080/api/detallefactura/";

   getAll() {
      return axios.get(this.baseUrl + "listar").then(res => res.data);
   }
   save(cart:any) {
      return axios.post(this.baseUrl + "crear", cart).then(res => res.data);
   }
   // /eliminar/{id}
   delete(cart:any){
      return axios.put(this.baseUrl+"eliminar/"+cart.id_detalleCarrito,cart).then(res=>res.data);
  }
   update(cart:any){
      return axios.put(this.baseUrl+"actualizar/"+cart.id_detalleCarrito,cart).then(res=>res.data);
  }
};

