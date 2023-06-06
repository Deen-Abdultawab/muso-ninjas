
<template>
    <div class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverUrl" >
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="username">Created by {{ playlist.userName }}</p>
            <p class="desc">{{ playlist.description }}</p>
            <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
        </div>
    
        <div class="song-list">
            <div v-if="!playlist.songs.length" class="alt-text">No songs have been added to the playlist yet
            </div>
            <div class="single-song" v-for="song in playlist.songs" :key="song.id">
                <div class="details">
                    <div class="creator-info">
                        <h3>{{ song.title }}</h3>
                        <p>{{ song.artist }}</p>
                    </div>
                    <audio controls id="audio">
                        <source :src="song.songUrl" :type="song.fileType">
                    </audio>
                    <button v-if="ownership" @click="handleClick" :data-path="song.filePath" :data-id="song.id" class="del-btn">delete</button>
                </div>
                
            </div>
            <AddSongs v-if="ownership" :playlist="playlist" />
        </div>
    </div>
</template>
    
    <script>
    import AddSongs from './AddSongs.vue';
    import useDocument from '@/functions/useDocument'
    import { useRouter } from 'vue-router'
    import useStorage from '@/functions/useStorage'
    
        export default {
            components: { AddSongs },
            props: ['playlist', 'ownership', 'id'],
            setup(props){

                const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
                const { deleteImg, deleteSong } = useStorage()
                const router = useRouter()



                 async function handleDelete(){
                    await deleteImg(props.playlist.filePath)
                    await props.playlist.songs.forEach((song)=>{
                        deleteSong(song.filePath)
                    })
                    await deleteDoc()
                    
                    router.push({ name: 'home'})
                }

                 async function handleClick(e){
                
                    const targetId = e.target.dataset.id
                    path.value = e.target.dataset.path
                    await deleteSong(path.value)
                    const songs = props.playlist.songs.filter((song)=> song.id != targetId)
                    await updateDoc({
                        songs
                    })
                }


                return { handleDelete, handleClick}
            }
            
        }
    </script>
    
    <style scoped>
        .playlist-details {
        display: grid;
        grid-template-columns: 1.5fr 2fr;
        gap: 80px;
    }

    .playlist-details button {
        max-width: 300px;
        margin: 0 auto;
    }
    .cover {
        border-radius: 20px;
        width: 100%;
        margin: 0 auto;
    }
    .cover img {
        width: 100%;
        border-radius: inherit;
    }
    .playlist-info {
        text-align: center;
    }
    .playlist-info h2 {
        text-transform: capitalize;
        font-size: 28px;
        margin-top: 20px;
    }
    .playlist-info p {
        margin-bottom: 20px;
    }
    .username {
        color: #999;
    }
    .desc {
        text-align: center;
    }
    .single-song {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed var(--secondary);
        margin-bottom: 20px;
    }
    .details {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 0 auto;
    }

    audio {
        padding: 2px;
        border-radius: 0;
    }

    #audio, .creator-info {
        flex: 1 0 130px;
    }

    .del-btn {
        flex: 1 0 40px;
    }
    .alt-text {
        text-align: center;
    }

     @media only screen and (max-width: 800px){
        .playlist-details {
            grid-template-columns: 1fr;
        }

        
        
    }

    @media only screen and (max-width: 345px){
        

        .details {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        #audio, .creator-info {
            flex: auto;
        }

        .del-btn {
            flex: auto;
        } 
    }
    </style>