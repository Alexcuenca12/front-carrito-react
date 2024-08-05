import axios from 'axios';


export class ProductService {
   baseUrl = "http://localhost:8080/api/producto/";

   getAll() {
      return axios.get(this.baseUrl + "listar").then(res => res.data);
   }
   save(product:any) {
      return axios.post(this.baseUrl + "crear", product).then(res => res.data);
   }
   // /eliminar/{id}
   delete(product:any) {
      return axios.put(this.baseUrl+"eliminar/"+product.id_producto,product).then(res=>res.data);
   }
   update(product:any){
      return axios.put(this.baseUrl+"actualizar/"+product.id_producto,product).then(res=>res.data);
  }
};

