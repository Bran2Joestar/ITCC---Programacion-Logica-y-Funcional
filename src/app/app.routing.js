import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './modules/home/home.component.vue';
import CharacterComponent from './modules/character/CharacterComponent.vue'; 
import NotFound from './modules/notfound/NotFound.vue'; 

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
    },
    {
        path: '/character/:id', // Ruta para el personaje
        name: 'Character',
        component: CharacterComponent,
    },
    {
        path: '/:pathMatch(.*)*', // Ruta para manejar 404
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;