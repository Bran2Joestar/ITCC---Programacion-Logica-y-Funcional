<template>
  <header>
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
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 10px;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link h1 {
  margin: 0;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 15px;
}

.nav-links li a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.nav-links li a.router-link-exact-active {
  font-weight: 700;
  text-decoration: underline;
}

.nav-links li a:hover {
  text-decoration: underline;
  color: #007bff;
}
</style>