<template>
    <div v-if="playlist">
    <div class="error" v-if="error">{{ error }}</div>
        <PlaylistDetailComp :playlist="playlist" :ownership="ownership" :id="id"/>
    </div>
    <div v-if="favSong">
        <div class="error" v-if="favError">{{ error }}</div>
        <PlaylistDetailComp :playlist="favSong" :ownership="ownership" :id="id" />
    </div>
</template>

<script>
import getDocument from '@/functions/getDocument'
import getUser from '@/functions/getUser'
import { computed } from 'vue'

import PlaylistDetailComp from '@/components/PlaylistDetailComp.vue'

    export default {
        props: ['id'],
        components: { PlaylistDetailComp },
        setup(props){
            console.log(props.id)
            
            const { error, document: playlist} = getDocument('playlists', props.id)
            
            const { user } = getUser()
            
            const { document: favSong, error: favError } = getDocument('favouriteSongs', props.id)
            
            
            console.log('fav songs:', favSong)
            const ownership = computed(()=>{
                return playlist.value && user.value && user.value.uid === playlist.value.userId
            })

           

           

            return { error, playlist, ownership, favSong, favError} 
        }
    }
</script>

<style scoped>
    
</style>