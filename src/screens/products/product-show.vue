<script lang="ts" setup>
import DeleteAction from "@/components/DeleteAction.vue";
import { currencyFormatter } from "@/utils/currency-formatter";

const item = {
    name: "Product",
    price: "20",
    description: "Hello World",
};
</script>

<template>
    <article className="item">
        <div class="container">
            <div class="main-info-container">
                <h1>{{ item.name }}</h1>
                <span class="price">
                    Preço: {{ currencyFormatter.format(+item.price) }}
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

        <p class="description">{{ item.description }}</p>
    </article>
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
