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

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: SignInForm,
        name: "sign-in",
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

router.beforeEach((to, _from) => {
    if (to.name && /product/i.test(to.name.toString()) && !TokenService.get()) {
        return { name: "sign-in" };
    }

    if (to.path === "/" && TokenService.get()) {
        return { name: "products" };
    }
});
