<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
    signUpResponseSchema,
    signUpSchema,
} from "@/validations/sign-up-schema";
import { fetchData } from "@/services/fetch-data";
import { TokenService } from "@/services/token-service";

const router = useRouter();

const email = ref("");
const password = ref("");

async function handleSignUp() {
    const formDataValidationResult = signUpSchema.safeParse({
        email: email.value,
        password: password.value,
    });

    if (!formDataValidationResult.success) {
        alert(
            formDataValidationResult.error.errors
                .map((e) => e.message)
                .join("\n")
        );
        email.value = "";
        password.value = "";
        return;
    }

    const response = signUpResponseSchema.safeParse(
        await fetchData("sign-in", {
            method: "post",
            body: formDataValidationResult.data,
        })
    );

    if (!response.success) {
        alert(response.error.errors.map((e) => e.message).join("\n"));
        return;
    }

    if (typeof response.data === "string") {
        alert(response.data);
        email.value = "";
        password.value = "";
        return;
    }

    TokenService.save(response.data.token);
    router.push({ name: "products" });
}
</script>

<template>
    <main class="container">
        <h1>Papelito - Sign In</h1>
        <form @submit.prevent="handleSignUp" class="form">
            <label class="label">
                Email:
                <input
                    class="input"
                    type="email"
                    v-model="email"
                    autocomplete="email"
                />
            </label>
            <label class="label">
                Senha:
                <input
                    class="input"
                    type="password"
                    v-model="password"
                    autocomplete="current-password"
                />
            </label>
            <button class="submit">Entrar</button>
        </form>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    height: 100vh;
}
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
    max-width: 30rem;
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
@/services/fetch-data
