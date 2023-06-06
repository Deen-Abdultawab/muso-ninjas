<template>
    <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a New Song</h4>
            <input type="text" placeholder="song-title" required v-model="title">
            <input type="text" placeholder="Artist" required v-model="artist">
            <label> Select song: </label>
            <input type="file" @change="handleChange" ref="songInput">
            <button v-if="!isPending">Add Song</button>
            <button v-else disabled>Loading</button>
        </form>
    </div>
</template>

<script>

import { ref } from 'vue';
import useDocument from '@/functions/useDocument';
import useStorage from '@/functions/useStorage';
import getUser from '@/functions/getUser';


    export default {
        props: ['playlist'],
        setup(props){
            const title = ref('')
            const artist = ref('')
            const showForm = ref(false)
            const file = ref(null)
            const fileError = ref(null)
            const type = ref(null)
            const { updateDoc } = useDocument('playlists', props.playlist.id)
            const isPending = ref(false)
            const { user } = getUser()
            const { url, filePath, uploadSong, error} = useStorage()

            const random = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']

            function genId(random){
                let Id = Math.floor(Math.random() * random.length);
                for(let i = 0; i < 13; i++){
                    Id += random[Math.floor(Math.random() * random.length)]
                }

                // console.log(Id)
                return Id
            }

          

            async function handleSubmit(){
                if(file.value){
                    isPending.value = true
                    await uploadSong(file.value)
                    const newSong = {
                        title: title.value,
                        artist: artist.value,
                        id: genId(random),
                        filePath: filePath.value,
                        songUrl: url.value,
                        userId: user.value.uid,
                        userName:user.value.displayName,
                        fileType: type.value
                    }
    
                    console.log(newSong, props.id)
                    
                    await updateDoc({
                        songs: [...props.playlist.songs, newSong]
                    })
    
                    title.value = ''
                    artist.value = ''
                    showForm.value = false

                } 
                isPending.value = false
                if(!error.value){
                    console.log('song added')
                        isPending.value = false
                    } else {
                        console.log(error.value)
                    }
                
            }

             function handleChange(e){
                fileError.value = null
                const selected = e.target.files[0]
    
                if(selected && selected.type == 'audio/mpeg'){
                    file.value = selected
                    fileError.value = null
                    type.value = selected.type
                } else {
                    file.value = null
                    fileError.value = 'Please select a music file (mp3)'
                }

            }

            return { title, artist, showForm, handleSubmit, handleChange, isPending}
        }
    }
</script>

<style scoped>
    .add-song {
        text-align: center;
        margin: 40px 0;
    }

    form {
        max-width: 100%;
        text-align: left;
    }

      button {
        max-width: 300px;
        margin: 0 auto;
    }

</style>