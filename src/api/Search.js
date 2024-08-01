import axios from 'axios'

const BASE_URL = "http://localhost:8085/"

export default {
  getStores: function(pageNum, pageSize, isDesc, keyWord, storeRegion, sort){
    return axios.get(BASE_URL + `search/stores`, {
      params:{
        pageNum: pageNum,
        pageSize: pageSize,
        isDesc: isDesc,
        keyWord: keyWord,
        storeRegion: storeRegion,
        sort: sort
      }
    });
  },
  getStoreInfo: function(id){
    return axios.get(BASE_URL + `search/stores/${id}/theme`);
  }
}
