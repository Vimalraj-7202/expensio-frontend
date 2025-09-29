import { apiPost,apiPut,apiDelete,apiGet } from "../services/axios.instance";
import { CREATE_CATEGORY,UPDATE_CATEGORY,DELETE_CATEGORY,GETALL_CATEGORIES} from "../services/api.constant";

class CategoryService{
    //create category
    async createCategory(data:any):Promise<any>{
        const response=await apiPost(CREATE_CATEGORY,data);
        return response.data;
    }
    //update category
    async updateCategory(id:any,data:any):Promise<any>{
        const response=await apiPut(`${UPDATE_CATEGORY}/${id}`,data);
        return response.data;
    }
    //delete category
    async deleteCategory(id:any):Promise<any>{
        const response=await apiDelete(`${DELETE_CATEGORY}/${id}`);
        return response.data;
    }
    //getAll categories
    async getAllCategory():Promise<any>{
        const response=await apiGet(GETALL_CATEGORIES);
        return response.data;
    }
}

export const categoryService=new CategoryService();