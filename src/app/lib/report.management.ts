import { apiGet } from "../services/axios.instance";
import { GET_OVERVIEW ,GET_CATEGORYTOTAL} from "../services/api.constant";

class ReportService{
    //getOverview
    async getOverview():Promise<any>{
        const response=await apiGet(GET_OVERVIEW)
        return response.data;
    }
    //getCategoryTotal
    async getCategoryTotal():Promise<any>{
        const response=await apiGet(GET_CATEGORYTOTAL);
        return response.data;
    }
}

export const reportService=new ReportService();