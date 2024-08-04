// import axios from 'axios'
import { axiosReservation } from '@/axios.js'


const BASE_URL = "http://localhost:8084/"

export default {
  postReservationForPay: function(id){
    return axiosReservation.post(BASE_URL + `payments/reservations/${id}`);
  },

  getPaymentSuccessURL: function(id){
    return axiosReservation.get(BASE_URL + `payments/reservations/${id}/paysuccess`);
  },

  getPaymentFailedURL: function(id){
    return axiosReservation.get(BASE_URL + `payments/reservations/${id}/payfailed`);
  },

  getPaymentCancelURL: function(id){
    return axiosReservation.get(BASE_URL + `payments/reservations/${id}/paycancel`);
  }
}
