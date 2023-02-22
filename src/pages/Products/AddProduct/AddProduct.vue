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
                    v-model="productItem.name"
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
                    v-model="productItem.price"
                />
            </label>
            <label>
                <p>Description</p>
                <textarea
                    name="productDescription"
                    placeholder="Description du produit"
                    rows="5"
                    class="mt-2 rounded-sm outline outline-blue-200 py-2 px-4 min-w-full"
                    v-model="productItem.desc"
                ></textarea>
            </label>
            <button
                v-if="isUpdating"
                type="submit"
                class="bg-blue-600 py-2 px-4 text-white rounded-sm"
                @click="updateProduct($event)"
            >
                Update
            </button>
            <button
                v-else
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { API_URL } from "../../../constants/urls";
import { IProduct } from "../../../interfaces/IProduct";

let route = useRoute();

let productItem = ref({
    name: "",
    price: "",
    desc: "",
});

let isUpdating = ref(false);

async function getProduct() {
    const res = await fetch(`${API_URL}/${route.params.productId}`);
    const data = await res.json();
    return data;
}

onMounted(async () => {
    if (route.params.productId) {
        const data = await getProduct();

        productItem.value = data;

        isUpdating.value = true;
    }
});

function updateProduct($event: any) {
    $event.preventDefault();

    fetch(`${API_URL}/${route.params.productId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productItem.value),
    })
        .then((res) => {
            if (res.status == 200) {
                alert("Produit mis à jour avec succès");
            }
        })
        .catch((err) => alert(err));
}

function addProduct($event: any) {
    $event.preventDefault();

    let newProduct = {
        name: productItem.value.name,
        price: productItem.value.price,
        description: productItem.value.desc,
    };

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
