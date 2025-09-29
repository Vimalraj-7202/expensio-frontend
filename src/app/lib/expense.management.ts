import { apiGet, apiPost } from "../services/axios.instance";
import { CREATE_EXPENSE,GETALL_EXPENSE,GETEXPENSE_BYID} from "../services/api.constant";

class ExpenseService{
    //create expense
    async createExpense(data:any):Promise<any>{
        const response=await apiPost(CREATE_EXPENSE,data);
        return response.data
    }

    //getall expense
    async getAllExpense():Promise<any>{
        const response=await apiGet(GETALL_EXPENSE)
        return response.data
    }

      // Get expense by ID
  async getExpenseById(id: string): Promise<any> {
    const response = await apiGet(`${GETEXPENSE_BYID}/${id}`);
    return response.data;
  }

}

export const expenseService=new ExpenseService();