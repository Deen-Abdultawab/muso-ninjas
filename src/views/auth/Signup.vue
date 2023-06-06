<template>
     <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <input type="text" placeholder="display name" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email" required>
        <input type="password" placeholder="password" v-model="password">
        <div v-if="error" class="error" required>{{ error }}</div>
        <div class="btns">
            <button v-if="!isPending">Sign up</button>
            <button v-else>Loading</button>
        </div>
    </form>
</template>

<script>
import useSignup from '@/functions/useSignup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
    export default {
        setup(){

            const { error, signup, isPending} = useSignup()

            const displayName = ref('')
            const email = ref('')
            const password = ref('')
            const router = useRouter()

            async function handleSubmit(){
                const res = await signup(email.value, password.value, displayName.value)

                if(!error.value){
                    router.push({ name: 'userPlaylist'})
                }
            }

            return { displayName, email, password, error, isPending, handleSubmit}
        }
    }
</script>

<style scoped>

</style>