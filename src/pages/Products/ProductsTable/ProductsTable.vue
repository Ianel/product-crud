<template>
    <table class="table-fixed border-collapse border-spacing-2">
        <thead>
            <th class="px-4 py-2 w-64 bg-blue-300 border border-slate-300">
                Nom du produit
            </th>
            <th class="px-4 py-2 w-32 bg-blue-300 border border-slate-300">
                Prix
            </th>
            <th class="px-4 py-2 bg-blue-300 border border-slate-300">
                Description
            </th>
            <th class="px-4 py-2 bg-blue-300 border border-slate-300">
                Actions
            </th>
        </thead>
        <tbody v-for="product in products">
            <tr>
                <td class="px-4 py-2 border border-slate-300">
                    {{ product["name"] }}
                </td>
                <td class="px-4 py-2 text-center border border-slate-300">
                    {{ product["price"] }}
                </td>
                <td class="px-4 py-2 border border-slate-300">
                    {{ product["description"] }}
                </td>
                <td
                    class="px-4 py-2 border border-slate-300 flex flex-row justify-center items-center gap-4"
                >
                    <button>
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </button>
                    <button @click="deleteProduct(product)">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
defineProps<{ products: any }>();

function deleteProduct(product: any) {
    const URL = product["_links"]["self"]["href"];

    fetch(URL, {
        method: "DELETE",
    })
        .then((res) => {
            if (res.status == 204) {
                alert("Produit supprimé avec succès");
                window.location.reload();
            }
        })
        .catch((err) => alert(err));
}
</script>
