<template>
  <div class="family-details">
    <h1>Detalles de la Familia</h1>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div class="card" :class="{ dark: isDarkMode }">
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
import axios from 'axios';

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
    fetchFamily() {
      const familyId = this.$route.params.id;
      return axios.get(`https://spapi.dev/api/families/${familyId}`).then(res => {
        if (res.status !== 200) throw new Error('Error en la red');
        return res.data.data;
      });
    },
    async fetchFamilyData() {
      this.loading = true;
      this.error = null;
      try {
        const family = await this.fetchFamily();
        this.family = family;

        if (family.characters && family.characters.length > 0) {
          const charsPromises = family.characters.map(async (url) => {
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
      } catch {
        this.error = 'Error al cargar los datos de la familia';
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

.family-details {
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Patrick Hand', 'Comic Sans MS', cursive;
  padding: 20px;
  color: #222;
}

.card {
  background-color: rgba(255, 255, 255, 0.85);
  border: 4px solid #333;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 👇 Aplica cuando el modo oscuro está activo */
.card.dark {
  background-color: rgba(0, 0, 0, 0.85);
  color: #eee;
  border-color: #ccc;
}

.character-list {
  list-style-type: '👨‍👩‍👧‍👦 ';
  padding-left: 30px;
}

.character-list li {
  margin-bottom: 8px;
}

a {
  color: #d82c20;
  font-weight: bold;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  background-color: #ffdab9;
  padding: 2px 4px;
  border-radius: 4px;
}

.card.dark a {
  color: #fca311;
}

h1, h2, h3 {
  color: #1a1a1a;
  text-shadow: 1px 1px 0 #fff;
}

.card.dark h1,
.card.dark h2,
.card.dark h3 {
  color: #f9f9f9;
  text-shadow: none;
}

.loading {
  font-weight: bold;
  font-size: 1.2rem;
  color: #888;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
