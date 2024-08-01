import Vue from 'vue';
import Router from 'vue-router';
import BookingInfo from '@/components/payment/BookingInfo.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/stores/theme/:id/info',
      name: 'BookingInfo',
      component: BookingInfo,
    },
  ],
});
