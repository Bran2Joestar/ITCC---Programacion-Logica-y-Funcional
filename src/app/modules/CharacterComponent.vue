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
      <p>Familia:
        <router-link v-if="familyData" :to="`/family/${getIdFromUrl(character.family)}`">
          {{ familyData.name }}
        </router-link>
        <span v-else>Cargando...</span>
      </p>
      <h3>Relaciones de Familia</h3>
      <ul>
        <li v-for="relative in relativesData" :key="relative.url">
          {{ relative.relation }}:
          <router-link :to="`/character/${getIdFromUrl(relative.url)}`">
            {{ relative.name || 'Cargando...' }}
          </router-link>
        </li>
      </ul>
      <h3>Episodios</h3>
      <ul>
        <li v-for="episode in episodesData" :key="episode.url">
          <router-link :to="`/episode/${getIdFromUrl(episode.url)}`">
            #{{ episode.id || '...' }}
          </router-link>
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
      relativesData: [],
      episodesData: [],
      familyData: null,
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchCharacterData();
  },
  watch: {
    '$route.params.id': 'fetchCharacterData'
  },
  methods: {
    async fetchCharacter() {
      const characterId = this.$route.params.id;
      const response = await axios.get(`https://spapi.dev/api/characters/${characterId}`);
      if (response.status !== 200) throw new Error('Error en la red');
      return response.data.data;
    },
    async fetchFamily(url) {
      if (!url) return null;
      try {
        const response = await axios.get(url);
        if (response.status !== 200) throw new Error('Error en la red');
        return response.data.data;
      } catch {
        return null;
      }
    },
    async fetchCharacterData() {
      this.loading = true;
      this.error = null;
      try {
        const character = await this.fetchCharacter();
        this.character = character;

        // Obtener datos de la familia
        this.familyData = null;
        if (character.family) {
          this.familyData = await this.fetchFamily(character.family);
        }

        // Obtener familiares con nombre
        if (character.relatives && character.relatives.length > 0) {
          const relativesPromises = character.relatives.map(async (rel) => {
            try {
              const res = await axios.get(rel.url);
              return {
                relation: rel.relation,
                url: rel.url,
                name: res.data.data.name || 'Sin nombre',
              };
            } catch {
              return {
                relation: rel.relation,
                url: rel.url,
                name: 'Error cargando',
              };
            }
          });
          this.relativesData = await Promise.all(relativesPromises);
        } else {
          this.relativesData = [];
        }

        // Obtener episodios (sólo ID) porque si jalo los datos me da error la API, creo que por ser muchs datos
        if (character.episodes && character.episodes.length > 0) {
          this.episodesData = character.episodes.map(url => ({
            url,
            id: this.getIdFromUrl(url)
          }));
        } else {
          this.episodesData = [];
        }

      } catch (e) {
        this.error = 'Error al cargar los datos del personaje';
      } finally {
        this.loading = false;
      }
    },
    getIdFromUrl(url) {
      if (!url) return '';
      return url.split('/').filter(Boolean).pop();
    }
  },
};
</script>

<style scoped>
/* Aquí van los estilos opcionales */
</style>