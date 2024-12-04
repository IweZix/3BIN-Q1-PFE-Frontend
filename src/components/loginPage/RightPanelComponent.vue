<script lang="ts">
import { defineComponent } from 'vue';
import { loginAdmin } from '@/services/authAdminService';
import { loginCompany } from '@/services/authCompanyService';

export default defineComponent({
    name: 'RightPanel',
    data() {
        return {
            email: '' as string,
            password: '' as string
        };
    },
    methods: {
        async login() {
            try {
                const responseAdmin = await loginAdmin(this.email, this.password);
                if (responseAdmin?.token) {
                    this.handleLoginSuccess(responseAdmin, 'Home');
                    return;
                }
                
            } catch (error) {
                try{
                    const responseCompany = await loginCompany(this.email, this.password);
                    if (responseCompany?.token) {
                        this.handleLoginSuccess(responseCompany, 'About');
                        return;
                    }
                } catch (error) {
                    const alert: HTMLElement | null = document.querySelector('.alert');
                    if (alert) {
                        alert.innerHTML = 'Invalid email or password ';
                    }
                }
            }
        },
        handleLoginSuccess(response: any, routeName: string) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', response.email);
            this.$router.push({ name: routeName });
        }
    }
});
</script>

<template>
    <div class="right-panel">
        <h2>Connexion</h2>
        <form @submit.prevent="login">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />

            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" required />

            <button class="rightButton" type="submit">Connexion</button>
        </form>
        <div class="alert"></div>
    </div>
</template>

<style scoped>
.right-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #d9d9d9;
    padding: 20px;
    border-radius: 5px;
    width: 50%;
}

.right-panel h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
    font-weight: bold;
}

button {
    background-color: #808080;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: auto;
    align-self: center;
    margin-top: 2em;
}

button:hover {
    background-color: #666666;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin: 10px 0 5px;
}

input {
    padding: 10px;
    border: 1px solid;
    border-radius: 5px;
    background-color: transparent;
}

.alert {
    color: red;
    margin-top: 10px;
}
</style>