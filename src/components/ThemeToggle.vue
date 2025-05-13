<template>
  <div>
    <label>
      <input type="checkbox" v-model="isDarkMode" @change="toggleTheme" />
      Modo Oscuro
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: this.$cookies.get('dark_mode') === 'true',
    };
  },
  methods: {
    toggleTheme() {
      this.$cookies.set('dark_mode', this.isDarkMode, '1d'); // Guarda la cookie por 1 día
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    },
  },
  mounted() {
    document.body.classList.toggle('dark-mode', this.isDarkMode); // Aplica el tema al cargar
  },
};
</script>

<style scoped>
.dark-mode {
  background-color: #121212;
  color: white;
}
</style>