// import Vue from "vue";
import {createRouter, createWebHistory} from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import SignUp from './components/signup/SignUp.vue';
import MyPage from "@/views/MyPage.vue";
import Login from "@/components/login/Login.vue";
import Reservation from "@/views/Reservation.vue";
import Theme from "@/views/Theme.vue";

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
            component: MyPage
        },
        {
            path: "/reservation",
            component: Reservation
        },
        {
            path: "/theme",
            component: Theme
        },
        {
            path: "/login",
            component: Login
        }

    ]
})
