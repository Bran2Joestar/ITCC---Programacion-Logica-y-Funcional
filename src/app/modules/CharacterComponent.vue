<template>
  <div class="character-details">
    <h1>Detalles del Personaje</h1>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="card">
       <img
     v-if="character.name"
  :src="getCharacterImage(character.name)"
  alt="Imagen del personaje"
  class="character-image"
  />
      <h2>{{ character.name }}</h2>
      <p><strong>Edad:</strong> {{ character.age || '?' }}</p>
      <p><strong>Sexo:</strong> {{ character.sex || '?' }}</p>
      <p><strong>Color de cabello:</strong> {{ character.hair_color || '?' }}</p>
      <p><strong>Ocupación:</strong> {{ character.occupation || '?' }}</p>
      <p><strong>Religión:</strong> {{ character.religion || '?' }}</p>
      <p><strong>Familia: </strong>
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
      <ul class="episode-list">
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
    async delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    async fetchCharacter() {
      const characterId = this.$route.params.id;
      await this.delay(500); // Delay de 500 ms
      const response = await axios.get(`https://spapi.dev/api/characters/${characterId}`);
      if (response.status !== 200) throw new Error('Error en la red');
      return response.data.data;
    },
    
    async fetchFamily(url) {
      if (!url) return null;
      await this.delay(500); // Delay de 500 ms
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

        this.familyData = null;
        if (character.family) {
          this.familyData = await this.fetchFamily(character.family);
        }

        if (character.relatives && character.relatives.length > 0) {
          const relativesPromises = character.relatives.map(async (rel) => {
            await this.delay(500); // Delay de 500 ms
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
    },
    
    getCharacterImage(name) {
      const images = {
        "Stan Marsh": "/img/stan-marsh.png",
        "Kyle Broflovski": "/img/kyle-broflovski.png",
        "Eric Cartman": "/img/eric-cartman.png",
        "Kenny McCormick": "/img/kenny-mccormick.png"
      };
      return images[name] || '/img/default.png';
    },
  },
};
</script>

<style>
.character-details {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  border: 2px solid #333;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,0.6);
  font-family: 'Patrick Hand', cursive;
  color: #333;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.character-image {
  display: block;
  margin: 0 auto 15px;
  border-radius: 10px;
  max-width: 200px;
  height: auto;
}

body.dark-mode .character-details {
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  border-color: #030303;
}

h1, h2, h3 {
  text-align: center;
  color: #222;
}

body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3 {
  color: #fd9e32;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  padding: 20px;
}

.error {
  color: red;
  text-align: center;
  font-weight: bold;
}

.card p {
  margin: 10px 0;
  font-size: 1.1rem;
}

.card ul {
  padding-left: 20px;
}

.episode-list li {
  margin-bottom: 5px;
}

/* Enlaces color azul verdoso */
.character-details a,
.character-details .router-link-active,
.character-details .router-link-exact-active {
  color: #008080; /* Azul verdoso */
  font-weight: bold;
  text-decoration: none;
}

.character-details a:hover,
.character-details .router-link-active:hover,
.character-details .router-link-exact-active:hover {
  color: #20b2aa; /* Azul verdoso más claro */
  text-decoration: underline;
}
</style>
