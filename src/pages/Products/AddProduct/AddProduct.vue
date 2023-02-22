<template>
    <div class="flex justify-center items-center h-screen">
        <form
            class="my-12 flex flex-col justify-between items-stretch w-1/4 gap-4"
        >
            <label>
                <p>Nom du produit</p>
                <input
                    class="mt-2 rounded-sm outline outline-blue-200 py-2 px-4 min-w-full"
                    type="text"
                    placeholder="Nom du produit"
                    name="productNAme"
                    required
                    v-model="productName"
                />
            </label>
            <label>
                <p>Prix</p>
                <input
                    class="mt-2 rounded-sm outline outline-blue-200 py-2 px-4 min-w-full"
                    type="number"
                    placeholder="Prix"
                    name="productPrice"
                    required
                    v-model="productPrice"
                />
            </label>
            <label>
                <p>Description</p>
                <textarea
                    name="productDescription"
                    placeholder="Description du produit"
                    rows="5"
                    class="mt-2 rounded-sm outline outline-blue-200 py-2 px-4 min-w-full"
                    v-model="productDescription"
                ></textarea>
            </label>
            <button
                type="submit"
                class="bg-blue-600 py-2 px-4 text-white rounded-sm"
                @click="addProduct($event)"
            >
                Add
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { API_URL } from "../../../constants/urls";

let productName: string;
let productPrice: number;
let productDescription: string;

function addProduct($event: any) {
    $event.preventDefault();

    let newProduct = {
        name: productName,
        price: productPrice,
        description: productDescription,
    };

    console.log(newProduct);

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
    })
        .then((res) => {
            if (res.status == 201) {
                alert("Produit crée avec succès");
            }
        })
        .catch((err) => alert(err));
}
</script>
