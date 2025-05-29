<template>
  <div class="episode-details">
    <h1>Detalles del Episodio</h1>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div class="card" :class="{ dark: isDarkMode }" v-else>
      <h2>{{ episode.name }}</h2>
      <p><strong>Temporada:</strong> {{ episode.season }}</p>
      <p><strong>Episodio:</strong> {{ episode.episode }}</p>
      <p><strong>Fecha de emisión:</strong> {{ episode.air_date }}</p>
      <p><strong>Descripción:</strong> {{ episode.description || '?' }}</p>
      <img :src="episode.thumbnail_url" alt="Thumbnail del episodio" class="thumbnail" />
      <p>
        <a :href="episode.wiki_url" target="_blank" rel="noopener noreferrer">Ver en Wiki</a>
      </p>

      <h3>Personajes</h3>
      <ul class="character-list">
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
import { fetchEpisodeById, fetchByUrl } from '../services/apiServices';

export default {
  data() {
    return {
      episode: {},
      charactersData: [],
      loading: true,
      error: null,
      isDarkMode: false,
    };
  },
  created() {
    this.fetchEpisodeData();
    this.detectDarkMode();
  },
  watch: {
    '$route.params.id': 'fetchEpisodeData',
  },
  methods: {
    async fetchEpisodeData() {
      this.loading = true;
      this.error = null;
      try {
        const episode = await fetchEpisodeById(this.$route.params.id);
        this.episode = episode;
        this.charactersData = await Promise.all(
          (episode.characters || []).map(url =>
            fetchByUrl(url).catch(() => ({ url, name: 'Error cargando' }))
          )
        );
      } catch (err) {
        this.error = 'Error al cargar los datos del episodio';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    getIdFromUrl(url) {
      return url.split('/').filter(Boolean).pop();
    },
    detectDarkMode() {
      this.isDarkMode = document.body.classList.contains('dark-mode');
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
.episode-details { max-width: 800px; margin: 0 auto; font-family: 'Patrick Hand', cursive; padding: 20px; color: #222; }
.card { background-color: rgba(255, 255, 255, 0.85); border: 4px solid #333; border-radius: 20px; padding: 20px; box-shadow: 0 0 15px rgba(0,0,0,0.4); transition: background-color 0.3s ease, color 0.3s ease; }
.card.dark { background-color: rgba(0, 0, 0, 0.85); color: white; border-color: #fff; }
.thumbnail { max-width: 100%; border-radius: 10px; margin: 15px 0; }
.character-list { list-style-type: '👤 '; padding-left: 30px; }
.character-list li { margin-bottom: 8px; }
a { color: #d82c20; font-weight: bold; text-decoration: none; }
a:hover { text-decoration: underline; background-color: #ffdab9; padding: 2px 4px; border-radius: 4px; }
.card.dark a { color: #fca311; }
h1, h2, h3 { color: #1a1a1a; text-shadow: 1px 1px 0 #fff; }
.card.dark h1, .card.dark h2, .card.dark h3 { color: #f9f9f9; text-shadow: none; }
.loading { font-weight: bold; font-size: 1.2rem; color: #888; }
.error { color: red; font-weight: bold; }
</style>
