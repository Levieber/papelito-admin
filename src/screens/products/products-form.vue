<template>
    <form class="form">
        <label class="label">
            Nome
            <input class="input" type="text" name="name" required />
        </label>
        <label class="label">
            Preço
            <input
                class="input"
                type="number"
                name="price"
                required
                min="0.00"
                step="0.01"
            />
        </label>
        <label class="label">
            Descrição
            <textarea
                class="input"
                name="description"
                required
                rows="6"
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
