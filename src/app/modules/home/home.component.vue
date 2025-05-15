<template>
  <div class="background">
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
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  components: {}
}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

/* Contenedor central */
.home {
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Patrick Hand', 'Comic Sans MS', cursive;
  padding: 20px;
  background-color: rgba(247, 229, 126, 0.95);
  border: 4px solid #000;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0,0,0,0.4);
  color: #2c2c2c;
}

/* Título */
h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1a1a1a;
  text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff;
  background-color: #59c3ff;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 20px;
}

/* Sección técnica */
.ficha-tecnica {
  background-color: rgba(255, 255, 255, 0.75); /* Blanco translúcido en modo claro */
  border: 3px solid #333;
  padding: 20px;
  border-radius: 15px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.ficha-tecnica ul {
  list-style-type: '🎬 ';
  padding-left: 30px;
}

.ficha-tecnica ul ul {
  list-style-type: '👤 ';
  padding-left: 30px;
}

.ficha-tecnica li {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.ficha-tecnica a {
  color: #d82c20;
  font-weight: bold;
  text-decoration: none;
}

.ficha-tecnica a:hover {
  text-decoration: underline;
  background-color: #ffdab9;
  padding: 2px 4px;
  border-radius: 4px;
}

/* 🌙 Modo oscuro */
body.dark-mode .ficha-tecnica {
  background-color: rgba(0, 0, 0);
  color: #fff;
  border-color: #5c5c5c;
}

body.dark-mode .ficha-tecnica a {
  color: #66ccff;
}

body.dark-mode .ficha-tecnica a:hover {
  background-color: #000000;
}
</style>
