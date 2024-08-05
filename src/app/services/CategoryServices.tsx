import axios from 'axios';

export class CategoryService {
   baseUrl = "http://localhost:8080/api/categoria/";

   getAll() {
      return axios.get(this.baseUrl + "listar").then(res => res.data);
   }
   save(product:any) {
      return axios.post(this.baseUrl + "crear", product).then(res => res.data);
   }
   // /eliminar/{id}
   delete(product:any){
      return axios.put(this.baseUrl+"eliminar/"+product.id_categoria,product).then(res=>res.data);
  }
   update(product:any){
      return axios.put(this.baseUrl+"actualizar/"+product.id_categoria,product).then(res=>res.data);
  }
};

