// import Vue from "vue";
import {createRouter, createWebHistory} from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import SignUp from './components/SignUp.vue';
import MyPage from "@/views/MyPage.vue";
import Login from "@/components/login/Login.vue";
import UserInfo from "@/components/mypage/UserInfo.vue"
import ReservationInfo from "@/components/mypage/ReservationInfo.vue";
import FollowInfo from "@/components/mypage/FollowInfo.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/",
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
        }

    ]
})
