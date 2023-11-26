import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw,
} from "vue-router";
import SignInForm from "@/screens/sign-in/sign-in-form.vue";
import ProductsLayout from "@/screens/products/products-layout.vue";
import ProductsList from "@/screens/products/products-list.vue";
import ProductsForm from "@/screens/products/products-form.vue";
import ProductShow from "./screens/products/product-show.vue";
import { TokenService } from "./services/token-service";
import { axiosInstance } from "./services/fetch-data";

declare module "vue-router" {
    interface RouteMeta {
        authRoute?: boolean;
        requiresAuth: boolean;
    }
}

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: SignInForm,
        name: "sign-in",
        meta: { requiresAuth: false, authRoute: true },
    },
    {
        path: "/products",
        component: ProductsLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: "",
                name: "products",
                component: ProductsList,
                meta: { requiresAuth: true },
            },
            {
                path: "new",
                name: "new-product",
                component: ProductsForm,
                meta: { requiresAuth: true },
            },
            {
                path: ":id/update",
                name: "update-product",
                props: true,
                component: ProductsForm,
                meta: { requiresAuth: true },
            },
            {
                path: ":id",
                name: "show-product",
                props: true,
                component: ProductShow,
                meta: { requiresAuth: true },
            },
        ],
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: "active",
});

router.beforeEach((to, _from) => {
    const token = TokenService.get();

    if (token) {
        axiosInstance.defaults.headers.common.Authorization = token;
    }

    if (to.meta.requiresAuth && !token) {
        return { name: "sign-in" };
    }

    if (to.meta.authRoute && token) {
        return { name: "products" };
    }
});
