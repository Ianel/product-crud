<template>
    <div class="flex justify-center items-center h-screen">
        <form
            class="my-12 flex flex-col justify-between items-stretch w-full px-8 md:px-0 md:w-1/2 gap-4"
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
                    class="mt-2 h-32 rounded-sm outline outline-blue-200 py-2 px-4 min-w-full"
                    v-model="productItem.description"
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
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { API_URL } from "../../../constants/urls";
import { IProduct } from "../../../interfaces/IProduct";

let route = useRoute();
let router = useRouter();

let productItem = ref<IProduct>({
    name: "",
    price: 0,
    description: "",
});

let isUpdating = ref<boolean>(false);

let toast = useToast();

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

function updateProduct($event: Event) {
    $event.preventDefault();

    if (
        !productItem.value.name ||
        !productItem.value.price ||
        !productItem.value.description
    ) {
        toast.warning("Veuillez remplir tous les champs");
        return;
    } else {
        fetch(`${API_URL}/${route.params.productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: productItem.value.name,
                price: productItem.value.price,
                description: productItem.value.description,
            }),
        })
            .then((res) => {
                if (res.status == 200) {
                    toast.success("Produit mis à jour avec succès");
                    setTimeout(() => {
                        router.push({ path: "/products" });
                    }, 5000);
                } else if (res.status == 409) {
                    toast.error("Ce nom existe déjà");
                }
            })
            .catch((err) => console.log(err.message));
    }
}

function addProduct($event: Event) {
    $event.preventDefault();

    let newProduct = {
        name: productItem.value.name,
        price: productItem.value.price,
        description: productItem.value.description,
    };

    if (
        !productItem.value.name ||
        !productItem.value.price ||
        !productItem.value.description
    ) {
        toast.warning("Veuillez remplir tous les champs");
        return;
    } else {
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
            .then((res) => {
                if (res.status == 201) {
                    toast.success("Produit crée avec succès");
                    setTimeout(() => {
                        router.push({ path: "/products" });
                    }, 5000);
                } else if (res.status == 409) {
                    toast.error("Ce nom existe déjà");
                }
            })
            .catch((err) => console.log(err.message));
    }
}
</script>
