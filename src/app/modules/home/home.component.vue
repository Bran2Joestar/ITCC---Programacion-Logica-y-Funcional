<template>
  <div>
    <h2>Página de Inicio</h2>
    <Header />
  </div>
</template>

<script>
import Header from '../shared/components/Header.vue';

export default {
  name: 'HomeComponent',
  components: {
    Header
  }
}
</script>