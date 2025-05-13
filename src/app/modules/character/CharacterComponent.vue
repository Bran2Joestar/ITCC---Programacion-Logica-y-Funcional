<template>
  <div>
    <h1>Detalles del Personaje</h1>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h2>{{ character.name }}</h2>
      <p>Edad: {{ character.age || '?' }}</p>
      <p>Sexo: {{ character.sex || '?' }}</p>
      <p>Color de cabello: {{ character.hair_color || '?' }}</p>
      <p>Ocupación: {{ character.occupation || '?' }}</p>
      <p>Religión: {{ character.religion || '?' }}</p>
      <h3>Familia</h3>
      <ul>
        <li v-for="relative in character.relatives" :key="relative.url">
          {{ relative.relation }}: 
          <router-link :to="`/character/${relative.url.split('/').pop()}`">Ver Personaje</router-link>
        </li>
      </ul>
      <h3>Episodes</h3>
      <ul>
        <li v-for="episode in character.episodes" :key="episode">
          <a :href="episode" target="_blank">{{ episode }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      character: {},
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchCharacter()
      .then(character => {
        this.character = character;
      })
      .catch(() => {
        this.error = 'Error al cargar los datos del personaje';
      })
      .finally(() => {
        this.loading = false;
      });
  },
  watch: {
    '$route.params.id': 'fetchCharacterData' // Observa cambios en el ID
  },
  methods: {
    fetchCharacter() {
      const characterId = this.$route.params.id;
      return new Promise((resolve, reject) => {
        axios.get(`https://spapi.dev/api/characters/${characterId}`)
          .then(response => {
            if (response.status !== 200) {
              reject(new Error('Error en la red'));
              return;
            }
            resolve(response.data.data);
          })
          .catch(err => reject(err));
      });
    },
    fetchCharacterData() {
      this.loading = true; // Reinicia el estado de carga
      this.fetchCharacter()
        .then(character => {
          this.character = character;
          this.error = null; // Reinicia el error
        })
        .catch(() => {
          this.error = 'Error al cargar los datos del personaje';
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
/* Aqui van los estilos
 | Pero los agregamos luego
 | Primero con que jale 👍
*/
</style>