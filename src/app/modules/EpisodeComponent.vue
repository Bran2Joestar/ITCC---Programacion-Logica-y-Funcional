<template>
  <div>
    <h1>Detalles del Episodio</h1>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h2>{{ episode.name }}</h2>
      <p>Temporada: {{ episode.season }}</p>
      <p>Episodio: {{ episode.episode }}</p>
      <p>Fecha de emisión: {{ episode.air_date }}</p>
      <p>Descripción: {{ episode.description || '?' }}</p>
      <img :src="episode.thumbnail_url" alt="Thumbnail del episodio" />
      <p>
        <a :href="episode.wiki_url" target="_blank" rel="noopener noreferrer">Ver en Wiki</a>
      </p>
      <h3>Personajes</h3>
      <ul>
        <li v-for="character in charactersData" :key="character.url">
          <router-link :to="`/character/${getIdFromUrl(character.url)}`">
            {{ character.name || 'Cargando...' }}
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
      episode: {},
      charactersData: [], // Array con { url, name }
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchEpisodeData();
  },
  watch: {
    '$route.params.id': 'fetchEpisodeData'
  },
  methods: {
    async fetchEpisode() {
      const episodeId = this.$route.params.id;
      const response = await axios.get(`https://spapi.dev/api/episodes/${episodeId}`);
      if (response.status !== 200) throw new Error('Error en la red');
      return response.data.data;
    },
    async fetchEpisodeData() {
      this.loading = true;
      this.error = null;
      try {
        const episode = await this.fetchEpisode();
        this.episode = episode;

        if (episode.characters && episode.characters.length > 0) {
          const charsPromises = episode.characters.map(async (url) => {
            try {
              const res = await axios.get(url);
              return {
                url,
                name: res.data.data.name || 'Sin nombre',
              };
            } catch {
              return {
                url,
                name: 'Error cargando',
              };
            }
          });
          this.charactersData = await Promise.all(charsPromises);
        } else {
          this.charactersData = [];
        }
      } catch (e) {
        this.error = 'Error al cargar los datos del episodio';
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
/* Estilos opcionales */
</style>