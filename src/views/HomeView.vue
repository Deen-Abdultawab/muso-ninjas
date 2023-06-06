<template>
 <div v-if="error" class="error">{{ error }}</div>
 <div v-if="documents">
  <div class="button">
    <button class="btn" :class="{ active: !showFav}" @click="handleAll" >All</button>
    <button class="btn" @click="handleEvent" :class="{ active: showFav}">Favourite</button>
  </div>
  <div class="playlist">
   <ListView :playlists="documents" :favTag="favTag" v-if="!showFav"/>
  </div>
  <div class="playlists" v-if="showFav">
    <ListView :playlists="favSongsList" v-if="favSongsList.length"/>
    <div v-else class="text">Favourite lists is empty.. Go and add your favourite sings</div>
  </div>
 </div>
</template>

<script>
import getCollection from '@/functions/getCollection';
import ListView from '../components/ListView.vue'
import getUser from '@/functions/getUser';
import { computed, ref } from 'vue';

export default {
  name: 'HomeView',
  components: { ListView },
  setup(){
    const { user } = getUser()
    const { error, documents} = getCollection('playlists')
    const { documents: favouriteSongs } = getCollection('favouriteSongs', ['userId', '==', user.value.uid])
    
    const favTag = true
    const showFav = ref(false)
    const favSongsList = ref([])
    
    
    console.log(documents)

    
    function handleTest(){

       favSongsList.value = documents.value.filter((doc)=>{
            if(doc.isFav && doc.isFavId.includes(user.value.uid)){
              return doc
            }
        }) 
    }

    function handleAll(){
      showFav.value = false
    }

    function handleEvent(){
      handleTest()
      showFav.value = true
    }


    return { error, documents, favTag, handleEvent, favouriteSongs, showFav, handleAll, handleTest, favSongsList}
  }
  
}
</script>

<style scoped>
  .button {
    display: flex;
    gap: 1rem;
  }

  .active {
    background: var(--primary);
    color: white;
    transform: scale(1.02);
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  }

  .text {
    margin-top: 2rem;
  }

</style>