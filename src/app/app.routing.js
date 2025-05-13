import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './modules/home/home.component.vue';
import CharacterComponent from './modules/CharacterComponent.vue'; 
import NotFound from './modules/notfound/NotFound.vue'; 
import FamilyComponent from './modules/FamilyComponent.vue';
import EpisodeComponent from './modules/EpisodeComponent.vue';

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
        path: '/family/:id', // Ruta para la familia
        name: 'Family',
        component: FamilyComponent,
    },
    {
        path: '/episode/:id', // Ruta para el episodio
        name: 'Episode',
        component: EpisodeComponent,
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