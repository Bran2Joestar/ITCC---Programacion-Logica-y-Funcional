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
</style>