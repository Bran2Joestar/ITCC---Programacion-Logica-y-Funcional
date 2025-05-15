<template>
  <header>
    <!-- Rectángulo alrededor de toda la barra -->
    <nav class="nav-bar">
      <router-link to="/" class="logo-link">
        <h1>SouthPark</h1>
      </router-link>
      <ul class="nav-links">
        <li><router-link to="/character/32">Stan Marsh</router-link></li>
        <li><router-link to="/character/3">Kyle Broflovski</router-link></li>
        <li><router-link to="/character/11">Eric Cartman</router-link></li>
        <li><router-link to="/character/42">Kenny McCormick</router-link></li>
      </ul>
      <ThemeToggle />
    </nav>
  </header>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggle.vue';

export default {
  name: 'HeaderComponent',
  components: {
    ThemeToggle,
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

header {
  padding: 20px;
}

/* Rectángulo con estilo South Park */
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff8b3;
  border: 4px solid #000;
  border-radius: 15px;
  padding: 15px 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-family: 'Patrick Hand', 'Comic Sans MS', cursive;
}

/* Logo estilo dibujo animado */
.logo-link h1 {
  margin: 0;
  color: #0000cc;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1.8rem;
}

/* Estilo de lista horizontal */
.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 15px;
}

/* Estilo de los enlaces */
.nav-links li a {
  text-decoration: none;
  font-weight: bold;
  color: #0000cc;
  font-size: 1rem;
  transition: all 0.2s;
}

.nav-links li a.router-link-exact-active {
  text-decoration: underline;
  color: #d82c20;
}

.nav-links li a:hover {
  text-decoration: underline;
  background-color: #ffe066;
  padding: 4px 6px;
  border-radius: 5px;
  color: #000;
}
</style>
