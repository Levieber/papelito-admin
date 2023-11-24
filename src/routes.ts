import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw,
} from "vue-router";
import SignUpForm from "@/screens/sign-up/sign-up-form.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: SignUpForm,
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
