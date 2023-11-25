<script lang="ts" setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <nav className="tabs">
        <RouterLink :to="{ name: 'products' }" class="tab">
            Todos os produtos
        </RouterLink>
        <RouterLink :to="{ name: 'new-product' }" class="tab">
            Novo produto
        </RouterLink>
    </nav>
    <RouterView />
</template>

<style scoped>
.tabs {
    border-bottom: 1px solid #fefefe;
    margin: 1rem 0;
}

.tab {
    color: #fefefe;
    display: inline-block;
    padding: 1rem;
    text-decoration: none;
}

.tab.active {
    border-bottom: 0.125rem solid #fefefe;
}
</style>
