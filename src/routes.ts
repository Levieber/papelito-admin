import {
    createRouter,
    createWebHashHistory,
    type RouteRecordRaw,
} from "vue-router";
import SignUpForm from "@/screens/sign-up/sign-up-form.vue";
import ProductsLayout from "@/screens/products/products-layout.vue";
import ProductsList from "@/screens/products/products-list.vue";
import ProductsForm from "@/screens/products/products-form.vue";
import ProductShow from "./screens/products/product-show.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: SignUpForm,
    },
    {
        path: "/products",
        component: ProductsLayout,
        children: [
            {
                path: "",
                name: "products",
                component: ProductsList,
            },
            {
                path: "new",
                name: "new-product",
                component: ProductsForm,
            },
            {
                path: ":id/update",
                name: "update-product",
                component: ProductsForm,
            },
            {
                path: ":id",
                name: "show-product",
                component: ProductShow,
            },
        ],
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: "active",
});
