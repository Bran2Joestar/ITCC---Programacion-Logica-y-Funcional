import axios from 'axios';

const API_BASE = 'https://spapi.dev/api';

// Obtener personaje por ID
export async function fetchCharacterById(id) {
  const response = await axios.get(`${API_BASE}/characters/${id}`);
  if (response.status !== 200) throw new Error('Error al obtener personaje');
  return response.data.data;
}

// Obtener familia por ID (si decides usar ID directo)
export async function fetchFamilyById(id) {
  const response = await axios.get(`${API_BASE}/families/${id}`);
  if (response.status !== 200) throw new Error('Error al obtener familia');
  return response.data.data;
}

// Obtener episodio por ID (si decides usar ID directo)
export async function fetchEpisodeById(id) {
  const response = await axios.get(`${API_BASE}/episodes/${id}`);
  if (response.status !== 200) throw new Error('Error al obtener episodio');
  return response.data.data;
}

// Obtener datos de cualquier recurso mediante URL (familia, episodio, relativo, etc.)
export async function fetchByUrl(url) {
  const response = await axios.get(url);
  if (response.status !== 200) throw new Error(`Error al acceder a: ${url}`);
  return response.data.data;
}
