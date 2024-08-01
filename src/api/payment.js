import axios from 'axios'

const BASE_URL = "http://localhost:8084/"

export default {
  postReservationForPay: function(id){
    return axios.post(`${BASE_URL}payments/reservations/${id}`);
  }
}
