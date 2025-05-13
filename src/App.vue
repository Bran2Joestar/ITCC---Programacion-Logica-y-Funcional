<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/character/1">Personaje 1</router-link>
      </nav>
    </header>
    <main>
      <router-view /> <!-- Aquí se renderizan los componentes según la ruta -->
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Estilos globales aquí */
</style>