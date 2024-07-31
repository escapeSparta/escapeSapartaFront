// import Vue from "vue";
import {createRouter, createWebHistory} from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import SignUp from './components/SignUp.vue';
import MyPage from "@/views/MyPage.vue";

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
        }

    ]
})
