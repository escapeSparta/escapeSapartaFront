import axios from 'axios'

const BASE_URL = 'https://escapesparta.store/api'

export default {
  getStores: function(pageNum, pageSize, isDesc, keyWord, storeRegion, sort){
    return axios.get(BASE_URL + `/search/stores`, {
      params:{
        pageNum: pageNum,
        pageSize: pageSize,
        isDesc: isDesc,
        keyWord: keyWord,
        storeRegion: storeRegion,
        sort: sort
      }, withCredentials: true
    });
  },

  getStoreInfo: function(id){
    return axios.get(BASE_URL + `/search/stores/${id}/theme`);
  },

  getThemes: function(pageNum, pageSize, isDes, sort, storeId){
    return axios.get(BASE_URL + `/search/stores/${storeId}/theme`,{
      params:{
        pageNum: pageNum,
        pageSize: pageSize,
        isDes: isDes,
        sort: sort
      }
    })
  },

  getThemesInfo: function(themeId, storeId){
    return axios.get(BASE_URL + `/search/stores/theme/${themeId}/info`,{
      params: {
        storeId: storeId
      }
    });
  },

  getThemesTime: function(themeId, storeId, day){
    return axios.get(BASE_URL + `/search/stores/theme/${themeId}/time`,{
      params: {
        storeId: storeId,
        day: day
      }
    });
  }
}
