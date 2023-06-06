<template>
  <nav>
    <div class="nav-center">
      <div class="left-nav">
      <img src="./assets/logo1.jpeg" alt="" class="logo">
      <h1>
        <router-link :to="{ name: 'home'}">
          Muso Ninjas
        </router-link>
      </h1>
      </div>
      <div class="right-nav">
        <div class="playlist-btns right-nav">
          <router-link v-if="user" :to="{ name: 'createPlaylist'}">Create Playlist</router-link>
          <router-link v-if="user" :to="{ name: 'userPlaylist'}">My Playlist</router-link>
        </div>
        <div class="user-menu right-nav">
          <span v-if="user" class="display-name">Hi there, {{ user.displayName }} </span>
          
          <span class="material-icons toggle" @click="showMob = true">menu</span>
          
        </div>
        <div class="user-btns right-nav">
          <button @click="handleClick" v-if="user">Logout</button>
          <router-link class="btn" :to="{ name: 'signup'}" v-if="!user">Signup</router-link>
          <router-link class="btn" :to="{ name: 'login'}" v-if="!user">Log in</router-link>
        </div>
      </div>
    </div>
  </nav>

  <div class="mobile-nav overlay" :class="{ show: showMob}">
    <div class="mobile-nav-center">
      <div class="mobile-toggle">
        <span class="material-icons toggle" @click="showMob = false">close</span>
      </div>
      <ul class="playlist-btns" v-if="user">
        <li @click="showMob = false">
          <span class="material-icons toggle">playlist_add</span>
          <router-link :to="{ name: 'createPlaylist'}">Create Playlist</router-link>
        </li>
        <li @click="showMob = false">
          <span class="material-icons toggle">featured_play_list</span>
          <router-link :to="{ name: 'userPlaylist'}">My Playlist</router-link>
        </li>
      </ul>
      <ul class="user-btns" v-if="!user">
        <li @click="showMob = false">
          <router-link class="btn" :to="{ name: 'signup'}" >Signup</router-link>
        </li>
        <li @click="showMob = false">
          <router-link class="btn" :to="{ name: 'login'}" >Log in</router-link>
        </li>
      </ul>
      <button @click="handleClick" class="log-out" v-if="user">Logout</button>
    </div>
  </div>
 <div class="content">
  <router-view/>
 </div>
</template>

<script>
import { useRouter } from 'vue-router';
import useLogout from './functions/useLogout';
import getUser from './functions/getUser';
import { ref } from 'vue';
  export default {
    setup() {
      const {logout} = useLogout()
      const { user } = getUser()
      const router = useRouter()
      const showMob = ref(false)

       async function handleClick(){
        await logout()
        console.log('logged out')
        showMob.value = false
        router.push({ name: 'login'})

       }

       return { handleClick, user, showMob}
    }

  }
</script>

<style>
  .content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
  }

  nav {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }

  ul {
    list-style-type: none;
  }

  .nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo {
    width: 50px;
    height: 50px;
  }

  .left-nav, .right-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-menu {
    justify-content: center;
  }

  .toggle {
    display: none;
    font-size: 2rem;
    color: var(--primary);
    cursor: pointer;
    transition: all 0.3s linear;
  }

  .toggle:hover {
    transform: scale(1.05);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
    opacity: 0;
    transition: all 0.3s linear;

  }

  .overlay.show {
    opacity: 1;
    z-index: 999999;
  }

  .mobile-nav-center {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    max-width: 400px;
    width: 90vw;
    background: hsl(210, 36%, 96%);
    padding: 1.5rem 2rem 0;
    transform: translateX(100%);
    transition: all 0.3s linear;
  }

  .show .mobile-nav-center {
    transform: translateX(0);
  }

  .mobile-nav .playlist-btns, .mobile-nav .user-btns {
    display: block;
  }

  .mobile-nav .user-btns {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .mobile-nav .playlist-btns {
    margin-bottom: 2.5rem;
  }

  .mobile-nav .playlist-btns li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s linear;
  }

  .mobile-nav .playlist-btns li:hover {
    transform: scale(1.01);
  }
  
  .mobile-nav .user-btns li {
    flex: 1;
    text-align: center;
  }

  .mobile-nav .log-out {
    width: 100%;
    text-align: center;
    padding: 1rem 0.5rem;
  }

  .mobile-toggle {
    margin-bottom: 2rem;
    transition: all 0.3s linear;
  }

  .mobile-nav li {
   margin-bottom: 1rem;
  }

  .mobile-toggle:hover {
    transform: scale(1.02);
  }


  .display-name {
    font-size: 14px;
    display: inline-block;
    border-left: 1px solid var(--secondary);
    padding-left: 16px;
  }

  @media only screen and (max-width: 800px){
    .playlist-btns, .user-btns {
      display: none;
    }
    .toggle {
      display: inline-block;
    }
  }
</style>
