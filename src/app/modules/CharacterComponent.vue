<template>
  <div class="character-container">
    <h1>{{ character.name }}</h1>
    <img :src="getCharacterImage(character.name)" :alt="character.name" />

    <div v-if="familyData">
      <h2>Familia: {{ familyData.name }}</h2>
    </div>

    <div v-if="relatives.length">
      <h3>Relaciones Familiares:</h3>
      <ul>
        <li v-for="relative in relatives" :key="relative.url">
          {{ relative.relation }}:
          <router-link :to="`/character/${getIdFromUrl(relative.url)}`">
            {{ relative.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="episodes.length">
      <h3>Episodios:</h3>
      <ul>
        <li v-for="episode in episodes" :key="episode.url">
          <router-link :to="`/episode/${getIdFromUrl(episode.url)}`">
            #{{ getIdFromUrl(episode.url) }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchCharacterById, fetchByUrl } from '../services/apiServices';

export default {
  data() {
    return {
      character: {},
      familyData: null,
      relatives: [],
      episodes: [],
    };
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const character = await fetchCharacterById(id);
      this.character = character;

      // Cargar familia
      if (character.family) {
        this.familyData = await fetchByUrl(character.family);
      }

      // Cargar relaciones familiares
      if (character.relatives && character.relatives.length > 0) {
        const relativesData = await Promise.all(
          character.relatives.map(async (rel) => {
            const data = await fetchByUrl(rel.url);
            return {
              relation: rel.relation,
              name: data.name || 'Sin nombre',
              url: rel.url,
            };
          })
        );
        this.relatives = relativesData;
      }

      // Cargar episodios
      if (character.episodes && character.episodes.length > 0) {
        const episodesData = await Promise.all(
          character.episodes.map(async (url) => {
            const data = await fetchByUrl(url);
            return {
              ...data,
              url,
            };
          })
        );
        this.episodes = episodesData;
      }
    } catch (error) {
      console.error('Error al cargar los datos del personaje:', error);
    }
  },
  methods: {
    getCharacterImage(name) {
      const images = {
        "Stan Marsh": "/img/stan-marsh.png",
        "Kyle Broflovski": "/img/kyle-broflovski.png",
        "Eric Cartman": "/img/eric-cartman.png",
        "Kenny McCormick": "/img/kenny-mccormick.png"
      };
      return images[name] || '/img/default.jpg';
    },
    getIdFromUrl(url) {
      return url?.split('/').filter(Boolean).pop();
    }
  }
};
</script>

<style scoped>
.character-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.character-container img {
  max-width: 300px;
  height: auto;
  border-radius: 12px;
  margin: 20px 0;
}
</style>
