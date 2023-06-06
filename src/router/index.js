import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlaylist from '../views/playlist/CreatePlaylist.vue'
import PlaylistDetail from '../views/playlist/PlaylistDetail.vue'
import UserPlaylist from '../views/playlist/UserPlaylist.vue'

// route guard
import { projectAuth } from '../firebase/config'

const requireAuth = ( to, from, next) => {
  let user = projectAuth.currentUser

  if(!user){
    next({ name: 'login'})
  } else {
    next()
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/playlists/create",
    name: "createPlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:id",
    name: "playlistDetail",
    component: PlaylistDetail,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: "/playlists/user",
    name: "userPlaylist",
    component: UserPlaylist,
    beforeEnter: requireAuth

  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
