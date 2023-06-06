<template>
    
        <div 
        v-for="playlist in playlists" :key="playlist.id" 
        class="singleList">
            <router-link :to="{name: 'playlistDetail', params: { id: playlist.id}}">
                <div class="single">
                    <div class="thumbnail">
                        <img :src="playlist.coverUrl" >
                    </div>
                    <div class="info">
                        <h3> {{ playlist.title }}</h3>
                        <p>Created by {{ playlist.userName }}</p>
                    </div>
                    <div class="song-number">
                        <p>{{ playlist.songs.length }}</p>
                    </div>
                    
                </div>
            </router-link>
            <div v-if="favTag" @click="handleFav" :id="playlist.listId" >
                <span class="material-icons" :class="{ fav: playlist.isFav && playlist.isFavId.includes(user.uid)}">favorite_border</span>
            </div>

        </div>
    
</template>

<script>
import useDocument from '@/functions/useDocument'
import getUser from '@/functions/getUser'
import { ref } from 'vue'

    export default {
        props: ['playlists', 'favTag', 'favSongs'],
        setup(props){
            const { user } = getUser()          
             

            async function handleFav(e){
                const targetId = e.target.parentElement.id
                props.playlists.filter(async (playlist)=>{
                    if(playlist.listId === targetId){
                        const { updateDoc } = useDocument('playlists', playlist.id)
                        
                        if(playlist.isFav === true &&  playlist.isFavId.includes(user.value.uid)){
                            console.log('already faved')
                            const ind = playlist.isFavId.findIndex(item=> item === user.value.uid)
                            console.log(ind)
                            playlist.isFavId.splice(ind, 1)
                                                       
                            playlist.isFav = !playlist.isFav
                            await updateDoc({
                                isFav: playlist.isFav,
                                isFavId: [...playlist.isFavId ]
                            })

                             console.log(playlist.isFavId)
                        } else {
                            console.log('not faved')
                            playlist.isFav = !playlist.isFav
                            await updateDoc({
                                isFav: playlist.isFav,
                                isFavId: [...playlist.isFavId, user.value.uid]
                            })

                            console.log(playlist.isFavId)
                        }                       
                    }
                })
            }

            

            return { handleFav, user }
        }
    }
</script>

<style scoped>

    .singleList {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.5rem;
        align-items: center;
    }
    .single {
        display: flex;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        background: white;
        margin: 16px 0;
        transition: all ease 0.2s;
        flex: 1;
    }

    .single:hover {
        box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
        /* background: red; */
        transform: scale(1.02);
        transition: all ease 0.2s;
    }

    .thumbnail {
        max-width: 100px;
        max-height: 100px;
        overflow: hidden;
        border-radius: 10px;
    }

    img {
        max-width: 150%;
        max-height: 150%;
        display: block;
    }

    .info {
        margin: 0 30px;
    }

    .song-number {
        margin-left: auto;
    }

    .material-icons {
        font-size: 2rem;
        padding-left: 2rem;
        border: none;
        color: #dbdada;
        transition: all 0.3s linear;
        cursor: pointer;
        
    }

    .material-icons.fav {
        color: rgb(253, 105, 130);
    }

    .material-icons:hover {
        transform: scale(1.02);
        color: var(--primary);
    }
</style>