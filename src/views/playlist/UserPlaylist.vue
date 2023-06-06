<template>
    <div class="user-playlists">
        <h2>My Playlist</h2>
        <div v-if="playlists">
            <Listview :playlists="playlists"/>
        </div>  
        <router-link :to="{ name: 'createPlaylist'}" class="btn">Create a new Playlist</router-link>      
    </div>
</template>

<script>
import getCollection from '@/functions/getCollection';
import getUser from '@/functions/getUser';
import Listview from '@/components/ListView.vue'
    export default {
        components: { Listview },
        setup(){
            const { user } = getUser()
            const { documents: playlists} = getCollection('playlists', ['userId', '==', user.value.uid])

            
            return { playlists }
        }
        
    }
</script>

<style scoped>
    .btn {
        max-width: 300px;
        text-align: center;
        margin: 0 auto;
    }
</style>