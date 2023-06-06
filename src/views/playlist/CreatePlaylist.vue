<template>
    <form @submit.prevent="handleSubmit">
        <h4>Creat New Playlist</h4>
        <input type="text" required placeholder="Playlist Title" v-model="title">
        <textarea required placeholder="Playlist description..." v-model="description"></textarea>

        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>

        <div class="error"></div>
        <button v-if="!isPending">Create</button>
        <button v-else disabled>saving...</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import useStorage from '@/functions/useStorage'
import useCollection from '@/functions/useCollection';
import getUser from '@/functions/getUser';
import { timestamp } from '@/firebase/config';
import { useRouter } from 'vue-router';


    export default {
        setup(){
            const { url, filePath, uploadImage} = useStorage()
            const { error, addDoc } = useCollection('playlists')
            const { user } = getUser()
            const router = useRouter()

            const title = ref('')
            const description = ref('')
            const file = ref(null)
            const fileError = ref(null)
            const types = ['image/png', 'image/jpeg']
            const isPending = ref(false)

             const random = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']

            function genId(random){
                let Id = Math.floor(Math.random() * random.length);
                for(let i = 0; i <= 12; i++){
                    Id += random[Math.floor(Math.random() * random.length)]
                }
                return Id
            }

           async function handleSubmit(){
                if(file.value){
                    isPending.value = true
                    await uploadImage(file.value)
                    const res = await addDoc({
                        title: title.value,
                        description: description.value,
                        userId: user.value.uid,
                        userName:user.value.displayName,
                        coverUrl: url.value,
                        filePath: filePath.value,
                        songs: [],
                        createdAt: timestamp(),
                        listId: genId(random),
                        isFav: false,
                        isFavId: []
                    })
                    isPending.value = false
                    if(!error.value){
                        router.push({ name: 'playlistDetail', params: { id: res.id}})
                        isPending.value = false
                    }
                    
                }
            }

            function handleChange(e){
                fileError.value = null
                const selected = e.target.files[0]
                if(selected && types.includes(selected.type)){
                    console.log(selected)
                    file.value = selected
                    fileError.value = null
                } else {
                    file.value = null
                    fileError.value = 'Please select an image file (png or jpg)'
                }

            }



            return { title, description, handleSubmit, handleChange, fileError, isPending}
        }
        
    }
</script>

<style scoped>
    form {
        background: white;
    }

    input[type="file"]{
        border: 0;
        padding: 0;
    }

    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }

    button {
        margin-top: 20px;
    }
</style>