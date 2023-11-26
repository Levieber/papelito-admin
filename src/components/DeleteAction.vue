<script lang="ts" setup>
import { fetchProducts } from "@/states/products";
import { fetchData } from "@/services/fetch-data";
import { onErrorCaptured } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { deleteUrl } = defineProps<{ deleteUrl: string }>();

async function handleDelete() {
    if (confirm("Você tem certeza que quer excluir?")) {
        await fetchData(deleteUrl, { method: "delete" });
        await fetchProducts();
        router.push({ name: "products" });
    }
}

onErrorCaptured(() => {
    alert("Não foi possível deletar");
});
</script>

<template>
    <button @click="handleDelete" class="delete-action"><slot /></button>
</template>

<style>
.delete-action {
    background-color: #ff5258;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    color: white;
}
</style>
