<script lang="ts" setup>
import { fetchData } from "@/services/fetch-data";
import {
    productSchema,
    productWithIdSchema,
} from "@/validations/products-schema";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { id } = defineProps<{ id?: string }>();

interface CreateProduct {
    name: string;
    price: number;
    description: string | undefined;
}

const product = ref<Omit<CreateProduct, "id">>({
    name: "",
    price: 0,
    description: undefined,
});

const updateProduct = async (
    id: string,
    newContent: Omit<CreateProduct, "id">
) => {
    await fetchData(`products/${id}`, {
        method: "put",
        body: newContent,
    });
};

const createProduct = async (content: Omit<CreateProduct, "id">) => {
    await fetchData("products", {
        method: "post",
        body: content,
    });
};

const handleSaveProduct = async () => {
    const formDataValidationResult = productSchema.safeParse({
        ...product.value,
        description: product.value.description ?? null,
    });

    if (!formDataValidationResult.success) {
        alert(
            formDataValidationResult.error.errors
                .map((e) => e.message)
                .join("\n")
        );
        product.value = {
            name: "",
            price: 0,
            description: undefined,
        };
        return;
    }

    if (id) {
        updateProduct(id, product.value);
    } else {
        createProduct(product.value);
    }

    product.value = {
        name: "",
        price: 0,
        description: undefined,
    };
    router.push({ name: "products" });
};

onMounted(async () => {
    if (id) {
        const responseValidation = productWithIdSchema.safeParse(
            await fetchData(`products/${id}`)
        );

        if (!responseValidation.success) {
            alert("Erro ao obter os dados iniciais do produto");
            return;
        }

        product.value = {
            ...responseValidation.data,
            description: responseValidation.data.description ?? undefined,
        };
    }
});
</script>

<template>
    <form @submit.prevent="handleSaveProduct" class="form">
        <label class="label">
            Nome
            <input
                class="input"
                type="text"
                name="name"
                v-model="product.name"
            />
        </label>
        <label class="label">
            Preço
            <input
                class="input"
                type="number"
                name="price"
                min="0.00"
                step="0.01"
                v-model="product.price"
            />
        </label>
        <label class="label">
            Descrição
            <textarea
                class="input"
                name="description"
                rows="6"
                v-model="product.description"
            ></textarea>
        </label>
        <button class="submit">Salvar</button>
    </form>
</template>

<style>
.form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    padding: 2rem;
    background-color: #4d4d4d;
    border-radius: 30px;
}

.form .label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
}

.form .input {
    background-color: #121212;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    color: white;
}

.form .submit {
    background-color: #121212;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    color: white;
}
</style>
