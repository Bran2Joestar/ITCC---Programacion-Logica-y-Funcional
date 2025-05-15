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
        "url('https://preview.redd.it/my-folder-of-south-park-wallpapers-v0-m5khy5lspaaa1.jpg?width=1080&crop=smart&auto=webp&s=2382f9277b979acad2b20f9da08df2c4e5e911aa')";
    } else {
      document.body.style.backgroundImage =
        "url('https://c4.wallpaperflare.com/wallpaper/1/170/481/south-park-the-stick-of-truth-south-park-wallpaper-preview.jpg')";
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
