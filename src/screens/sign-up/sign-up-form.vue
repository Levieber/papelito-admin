<template>
    <main class="container">

        <h1>Papelito - Sign Up</h1>
        <form class="form">
            <label class="label">
                Email:
                <input class="input" type="email" />
            </label>
            <label class="label">
                Senha:
                <input class="input" type="password" />
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
