<template>
  <div>
    <h1>Detalles de la Familia</h1>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h2>{{ family.name }}</h2>
      <p>ID: {{ family.id }}</p>
      <p>Creada: {{ formatDate(family.created_at) }}</p>
      <p>Actualizada: {{ formatDate(family.updated_at) }}</p>

      <h3>Miembros</h3>
      <ul>
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
      charactersData: [], // Array con { url, name }
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchFamilyData();
  },
  watch: {
    '$route.params.id': 'fetchFamilyData'
  },
  methods: {
    fetchFamily() {
      const familyId = this.$route.params.id;
      return new Promise((resolve, reject) => {
        axios.get(`https://spapi.dev/api/families/${familyId}`)
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
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales */
</style>