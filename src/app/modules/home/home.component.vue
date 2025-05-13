<template>
  <div class="home">
    <h2>API de SouthPark</h2>

    <section class="ficha-tecnica">
      <p>
        <a 
          href="https://docs.google.com/document/d/1ky5NAR7TQpVFu8sZc6C350O9ijo_TaNY3chBxE4v-H8/edit?tab=t.0" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Documento Google Docs
        </a>
      </p>

      <ul>
        <li><strong>Nombre del equipo:</strong> Rockstars v2</li>
        <li><strong>Integrantes:</strong>
          <ul>
            <li>Brandon Resendiz Marquez</li>
            <li>Jose Manuel Acosta Manriquez</li>
            <li>Yael Svein Flores Luna</li>
            <li>Hugo Adrian Fernandez Loya</li>
          </ul>
        </li>
        <li>
          <strong>Repositorio GitHub:</strong> 
          <a 
            href="https://github.com/Bran2Joestar/ITCC---Programacion-Logica-y-Funcional.git" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            https://github.com/Bran2Joestar/ITCC---Programacion-Logica-y-Funcional.git
          </a>
        </li>
        <li><strong>URL Figma o capturas/imágenes:</strong> Pendiente</li>
        <li><strong>API utilizada:</strong> 
          <a href="https://spapi.dev/" target="_blank" rel="noopener noreferrer">https://spapi.dev/</a>
        </li>
        <li><strong>Azure/AWS/ngrok/Google Cloud (para subir a la nube):</strong> Pendiente</li>
        <li><strong>Bootstrap</strong></li>
        <li><strong>Vue.js</strong></li>
        <li><strong>Postman:</strong> Pendiente de instalar</li>
      </ul>

    </section>
  </div>
</template>

<script>

export default {
  name: 'HomeComponent',
  components: {
  }
}
</script>

<style scoped>
.home {
  max-width: 700px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  padding: 0 15px;
}

.ficha-tecnica h3 {
  margin-top: 30px;
  margin-bottom: 10px;
}

.ficha-tecnica ul {
  list-style-type: disc;
  padding-left: 20px;
}

.ficha-tecnica ul ul {
  list-style-type: circle;
  padding-left: 20px;
  margin-top: 5px;
}

.ficha-tecnica a {
  color: #007bff;
  text-decoration: none;
}

.ficha-tecnica a:hover {
  text-decoration: underline;
}
</style>