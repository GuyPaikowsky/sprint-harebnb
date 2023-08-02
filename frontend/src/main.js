import './assets/style/main.scss'
import { createApp } from 'vue'
import router from './router'

import {stayStore} from "@/store/store.js"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(stayStore)
app.use(ElementPlus)

app.mount('#app')