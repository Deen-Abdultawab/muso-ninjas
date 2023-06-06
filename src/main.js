import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import { projectAuth } from './firebase/config'

let app 
// this creates app and set it as undefined so when the web app loads it mounts nothng. it waits for a state change from firebase, then check if app has a value or not to prevent it from re-mounting app everytime there is a change state

projectAuth.onAuthStateChanged(()=>{
    if(!app){
        app = createApp(App).use(router).mount("#app");
    }
})


