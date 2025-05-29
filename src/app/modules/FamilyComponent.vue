<template>
  <div class="family-details">
    <h1>Detalles de la Familia</h1>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div class="card" :class="{ dark: isDarkMode }" v-else>
      <h2>{{ family.name }}</h2>
      <p><strong>ID:</strong> {{ family.id }}</p>
      <p><strong>Creada:</strong> {{ formatDate(family.created_at) }}</p>
      <p><strong>Actualizada:</strong> {{ formatDate(family.updated_at) }}</p>

      <h3>Miembros</h3>
      <ul class="character-list">
        <li v-for="character in charactersData" :key="character.url">
          <router-link :to="`/character/${extractId(character.url)}`">
            {{ character.name || 'Cargando...' }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchFamilyById, fetchByUrl } from '../services/apiServices';

export default {
  data() {
    return {
      family: {},
      charactersData: [],
      loading: true,
      error: null,
      isDarkMode: false,
    };
  },
  created() {
    this.fetchFamilyData();
    this.detectDarkMode();
  },
  watch: {
    '$route.params.id': 'fetchFamilyData',
  },
  methods: {
    async fetchFamilyData() {
      this.loading = true;
      this.error = null;
      try {
        const family = await fetchFamilyById(this.$route.params.id);
        this.family = family;
        this.charactersData = await Promise.all(
          (family.characters || []).map(url =>
            fetchByUrl(url).catch(() => ({ url, name: 'Error cargando' }))
          )
        );
      } catch (err) {
        this.error = 'Error al cargar los datos de la familia';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    extractId(url) {
      return url.split('/').filter(Boolean).pop();
    },
    formatDate(dateString) {
      if (!dateString) return '?';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    detectDarkMode() {
      this.isDarkMode = document.body.classList.contains('dark-mode');
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
.family-details { max-width: 800px; margin: 0 auto; font-family: 'Patrick Hand', cursive; padding: 20px; color: #222; }
.card { background-color: rgba(255, 255, 255, 0.85); border: 4px solid #333; border-radius: 20px; padding: 20px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.4); transition: background-color 0.3s ease, color 0.3s ease; }
.card.dark { background-color: rgba(0, 0, 0, 0.85); color: #eee; border-color: #000; }
.character-list { list-style-type: '👨‍👩‍👧‍👦 '; padding-left: 30px; }
.character-list li { margin-bottom: 8px; }
a { color: #d82c20; font-weight: bold; text-decoration: none; }
a:hover { text-decoration: underline; background-color: #ffdab9; padding: 2px 4px; border-radius: 4px; }
.card.dark a { color: #fca311; }
h1, h2, h3 { color: #1a1a1a; text-shadow: 1px 1px 0 #000; }
.card.dark h1, .card.dark h2, .card.dark h3 { color: #f9f9f9; text-shadow: none; }
.loading { font-weight: bold; font-size: 1.2rem; color: #888; }
.error { color: red; font-weight: bold; }
</style>
