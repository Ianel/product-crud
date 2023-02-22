<template>
    <div class="flex flex-col justify-center items-center gap-y-4 my-12">
        <router-link to="/add-product">
            <button class="bg-blue-600 mb-4 py-2 px-4 text-white">
                Create a product
            </button>
        </router-link>
        <ProductsTable :products="productsList" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { API_URL } from "../../constants/urls";
import { IProductFull } from "../../interfaces";
import ProductsTable from "./ProductsTable/ProductsTable.vue";

const productsList = ref<IProductFull[]>([]);

async function getProducts() {
    const res = await fetch(API_URL);
    const data = await res.json();
    productsList.value = data["_embedded"]["product"];
}

getProducts();
</script>
