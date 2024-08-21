// import Vue from "vue";
import {createRouter, createWebHistory} from "vue-router";
import SignUp from './components/auth/SignUp.vue';
import MyPage from "@/views/MyPage.vue";
import Login from "@/components/auth/Login.vue";
import UserInfo from "@/components/mypage/UserInfo.vue"
import ReservationInfo from "@/components/mypage/ReservationInfo.vue";
import FollowInfo from "@/components/mypage/FollowInfo.vue";
import MainTheme from '@/views/MainStore.vue'
import SearchStore from '@/views/SearchStore.vue'
import Reservation from "@/views/Reservation.vue";
import bookingInfo from '@/components/payment/BookingInfo.vue'
import bookingForm from '@/components/payment/BookingForm.vue'

import paySuccess from './components/payment/Home.vue';
import payCancel from './components/payment/Cancel.vue';
import payFail from './components/payment/Fail.vue';
import ReviewList from '@/components/review/ReviewList.vue'
import ThemeInfo from '@/views/ThemeInfo.vue'
import HomePage from "@/views/HomePage.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
        path: "/",
        name: 'Home',
        component: HomePage
        },
        {
            path: "/signup",
            component: SignUp
        },
        {
            path: "/profile",
            component: MyPage,
            children: [
                {
                    path: '',
                    component: UserInfo
                },
                {
                    path: 'reservations',
                    component: ReservationInfo
                },
                {
                    path: 'follow',
                    component: FollowInfo
                }
            ]
        },
        {
            path: '/reservation',
            name: 'Reservation',
            component: Reservation,
        },
        {
            path: "/login",
            component: Login
        },
        {
            path:"/search-store",
            component: SearchStore
        },

        //전체 테마 조회 페이지 나중에 위치 수정 필요
        {
            path:'/store/:storeId',
            name: 'Theme',
            component: ThemeInfo,
            props: true
        },
        {
            path: '/reviews',
            name: 'ReviewList',
            component: ReviewList,
            props: route => ({ storeId: route.query.storeId, themeId: route.query.themeId })
        },
        {
            path: '/booking-info',
            name: 'BookingInfo',
            component: bookingInfo,
        },
        {
            path: '/booking-form',
            name: 'BookingForm',
            component: bookingForm,
            props: route => ({ response: route.params.response })
        },

        //결제화면
        {
            path: '/pay-success',
            name: 'paySuccess',
            component: paySuccess
        },
        {
            path: '/pay-cancel',
            name: 'payCancel',
            component: payCancel
        },
        {
            path: '/pay-fail',
            name: 'payFail',
            component: payFail
        }
        //===========================

    ]
})
