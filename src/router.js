// import Vue from "vue";
import {createRouter, createWebHistory} from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import SignUp from './components/signup/SignUp.vue';
import MyPage from "@/views/MyPage.vue";
import Login from "@/components/login/Login.vue";
import UserInfo from "@/components/mypage/UserInfo.vue"
import ReservationInfo from "@/components/mypage/ReservationInfo.vue";
import FollowInfo from "@/components/mypage/FollowInfo.vue";
import MainTheme from '@/components/MainTheme.vue'
import SearchStore from '@/components/SearchStore.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/signup",
            component: SignUp
        },
        {
            path: "/about",
            component: About
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
                },
                // {
                //     path: 'edit',
                //     name: 'EditProfile',
                //     component: EditProfile
                // }
            ]
        },

        {
            path: "/login",
            component: Login
        },
        {
            path:"/main-theme",
            component: MainTheme
        },
        {
            path:"/search-store",
            component: SearchStore
        },

      //전체 테마 조회 페이지 나중에 위치 수정 필요
        {
            path:"/store/storeId",
            name: 'Theme',
            component: MainTheme,
            props: true
        }

    ]
})
