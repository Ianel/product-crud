import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home/Home.vue";
import Products from "../pages/Products/Products.vue";
import AddProduct from "../pages/Products/AddProduct/AddProduct.vue";

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
    {
        path: "/add-product",
        name: "Add Product",
        component: AddProduct,
    },
    {
        path: "/update-product/:productId",
        name: "Update Product",
        component: AddProduct,
    },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
