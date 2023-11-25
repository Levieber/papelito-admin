<script lang="ts" setup>
import DeleteAction from "@/components/DeleteAction.vue";
import { RouterLink } from "vue-router";

const items = [
    {
        id: "1",
        name: "Hello",
    },
];
</script>

<template>
    <div class="table-wrapper">
        <table class="table">
            <thead class="table-header">
                <tr class="row">
                    <th class="table-head">ID</th>
                    <th class="table-head">Nome</th>
                    <th class="table-head">Ações</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr class="row" v-for="item in items" :key="item.id">
                    <td class="table-cell">{{ item.id }}</td>
                    <td class="table-cell">{{ item.name }}</td>
                    <td class="table-cell actions">
                        <RouterLink
                            :to="{
                                name: 'show-product',
                                params: { id: item.id },
                            }"
                            class="see-action"
                        >
                            Visualizar
                        </RouterLink>
                        <DeleteAction class="delete-action">
                            Excluir
                        </DeleteAction>
                        <RouterLink
                            :to="{
                                name: 'update-product',
                                params: { id: item.id },
                            }"
                            class="update-action"
                        >
                            Atualizar
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table-wrapper {
    --scrollbar-track-color: #2c2c2d;
    --scrollbar-thumb-color: #888;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-track-color);
}

.table-wrapper::-webkit-scrollbar {
    height: 12px;
}

.table-wrapper::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-color);
}

.table-wrapper::-webkit-scrollbar-track {
    background-color: var(--scrollbar-track-color);
}

.table {
    border-collapse: collapse;
    margin-top: 2rem;
    width: 100%;
    border-collapse: collapse;
}

.table-header {
    background-color: #1c1a1d;
    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.25);
    text-align: left;
}

.table-body .row:hover {
    background-color: rgba(28, 26, 29, 0.33);
    cursor: default;
}

.table-head,
.table-cell {
    border: 1px solid #fefefe;
    padding: 1.25rem;
}

.actions {
    display: flex;
    gap: 1rem;
}

.update-action,
.see-action {
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    text-decoration: none;
}

.update-action {
    background-color: #5ba7fd;
    color: white;
}

.see-action {
    background: #fefefe;
    color: black;
}
</style>