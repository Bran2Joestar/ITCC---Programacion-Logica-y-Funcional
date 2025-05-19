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
      this.$cookies.set('dark_mode', this.isDarkMode, '1d');
      document.body.classList.toggle('dark-mode', this.isDarkMode);

      // Cambiar fondo del body según el modo
      if (this.isDarkMode) {
        document.body.style.backgroundImage =
          "url('https://4kwallpapers.com/images/walls/thumbs_3t/9376.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
      } else {
        document.body.style.backgroundImage =
          "url('https://4kwallpapers.com/images/walls/thumbs_3t/9380.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
      }
    },
  },
  mounted() {
    document.body.classList.toggle('dark-mode', this.isDarkMode);

    // Aplicar fondo correcto al cargar
    if (this.isDarkMode) {
      document.body.style.backgroundImage =
        "url('url('https://4kwallpapers.com/images/walls/thumbs_3t/9376.jpg')";
    } else {
      document.body.style.backgroundImage =
        "url('https://4kwallpapers.com/images/walls/thumbs_3t/9380.jpg')";
    }

    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
  },
};
</script>

<style >
.dark-mode {
  background-color: #121212;
  color: white;
}
</style>
