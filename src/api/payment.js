import axios from 'axios'

const BASE_URL = "http://localhost:8084/"

export default {
  getReservationForPay: function(reservationId){
    return axios.get(`${BASE_URL}payments/reservations/${reservationId}`);
  }
}
