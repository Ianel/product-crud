import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home/Home.vue";
import Products from "../pages/Products/Products.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/products",
        name: "Products",
        component: Products,
    },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
