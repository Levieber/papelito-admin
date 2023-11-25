<script lang="ts" setup>
import { ref, onMounted, onErrorCaptured } from "vue";
import DeleteAction from "@/components/DeleteAction.vue";
import { Product } from "@/entities/product-entity";
import { fetchData } from "@/services/fetch-data";
import { currencyFormatter } from "@/utils/currency-formatter";
import { productWithIdSchema } from "@/validations/products-schema";

const { id } = defineProps<{ id?: string }>();
const product = ref<Product>();
const errorMessage = ref();

onMounted(async () => {
    const responseValidation = productWithIdSchema.safeParse(
        await fetchData(`products/${id}`)
    );

    if (!responseValidation.success) {
        console.log(responseValidation.error);
        errorMessage.value = "Falha ao obter o produto! :(";
        return;
    }

    product.value = responseValidation.data;
});

onErrorCaptured(() => {
    errorMessage.value = "Falha ao obter o produto! :(";
});
</script>

<template>
    <article v-if="!errorMessage && product">
        <div class="container">
            <div class="main-info-container">
                <h1>{{ product.name }}</h1>
                <span class="price">
                    Preço: {{ currencyFormatter.format(+product.price) }}
                </span>
            </div>

            <div class="actions">
                <RouterLink
                    :to="{ name: 'update-product' }"
                    className="update-action"
                >
                    Atualizar
                </RouterLink>
                <DeleteAction>Excluir</DeleteAction>
            </div>
        </div>

        <p class="description">{{ product.description }}</p>
    </article>
    <p v-else>
        {{ errorMessage }}
    </p>
</template>

<style>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.main-info-container {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.price {
    background-color: #1c1a1d;
    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.25);
    border-radius: 0.25rem;
    cursor: default;
    font-size: 1.125rem;
    padding: 0.5rem 2rem;
}

.actions {
    display: flex;
    gap: 1rem;
}

.update-action {
    background-color: #5ba7fd;
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    text-decoration: none;
}

.description {
    font-size: 1.25rem;
    margin-top: 2rem;
}
</style>
