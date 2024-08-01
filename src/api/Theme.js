import axios from 'axios'

const BASE_URL = "http://localhost:8085/"

export default {
  getTheme: function(pageNum, pageSize, isDesc, sort, storeId){
    return axios.get(BASE_URL + `/search/${storeId}/theme`, {
      params:{
        pageNum: pageNum,
        pageSize: pageSize,
        isDesc: isDesc,
        sort: sort
      }
    });
  },
  
}
