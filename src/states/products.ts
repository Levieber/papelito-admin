import { reactive } from "vue";
import { fetchData } from "@/services/fetch-data";
import { productsWithIdSchema } from "@/validations/products-schema";
import { Product } from "@/entities/product-entity";

export const state = reactive<{
    products: Product[];
    errorMessage: string | null;
}>({
    products: [],
    errorMessage: null,
});

export async function fetchProducts() {
    const responseValidation = productsWithIdSchema.safeParse(
        await fetchData("products")
    );

    if (!responseValidation.success) {
        console.log(responseValidation.error);
        state.errorMessage = "Falha ao obter os produtos! :(";
        return;
    }

    state.products = responseValidation.data;
}
