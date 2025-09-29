import { apiPost, apiGet, apiPut, apiDelete } from "../services/axios.instance";
import {CREATE_BUDGET,GETALL_BUDGET,UPDATE_BUDGET,DELETE_BUDGET} from "../services/api.constant";

class BudgetService {
  //create budget
  async createBudget(data: any): Promise<any> {
    const response = await apiPost(CREATE_BUDGET, data);
    return response.data;
  }
  //update budget
  async updateBudget(id: any, data: any): Promise<any> {
    const response = await apiPut(`${UPDATE_BUDGET}/${id}`, data);
    return response.data;
  }
  //delete budgt
  async deleteBudget(id:any):Promise<any>{
    const response=await apiDelete(`${DELETE_BUDGET}/${id}`);
    return response.data;
  }
  //getall budget
  async getallBudget(): Promise<any> {
    const response = await apiGet(GETALL_BUDGET);
    return response.data;
  }
}

export const budgetService = new BudgetService();
