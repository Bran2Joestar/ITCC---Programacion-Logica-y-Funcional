<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import HeaderComponent from './app/modules/shared/components/Header.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
};
</script>

<style>
/* Estilos globales aquí */
body {
  background-color: white;
  color: black;
}

.dark-mode {
  background-color: #121212;
  color: white;
}
</style>