import axios from 'axios'

const BASE_URL = "http://localhost:8084/"

export default {
  getThemesInfo: function(themeId, storeId){
    return axios.post(BASE_URL + `reservation`,{
      params: {
        storeId: storeId
      }
    });
  }
}