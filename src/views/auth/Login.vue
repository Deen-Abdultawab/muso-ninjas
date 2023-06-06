<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign in</h3>
        <input type="email" placeholder="Email" v-model="email" required>
        <input type="password" placeholder="password" v-model="password">
        <div v-if="error" class="error" required>{{ error }}</div>
        <div class="btns">
            <button v-if="!isPending">Log in</button>
            <button v-else>Loading</button>
        </div>
    </form>
</template>

<script>
import useLogin from '@/functions/useLogin';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
    export default {
        setup(){
            const {error, login, isPending} = useLogin()
            const email = ref('')
            const password = ref('')
            const router = useRouter()


            async function handleSubmit(){
                const response = await login(email.value, password.value)
                if(!error.value){
                    router.push({ name: 'userPlaylist'})
                }
            }
            return { email, password, isPending, error, handleSubmit}
        }
    }
</script>

<style scoped>

</style>