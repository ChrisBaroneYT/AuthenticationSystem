const SUPABASE_URL = 'https://shvkkhtmdzrsaitoxvuo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodmtraHRtZHpyc2FpdG94dnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODE0MDEsImV4cCI6MjA1OTk1NzQwMX0.SFqSZsoX4YfRjOOdNLqrqqHgrY01bLS7iwuH9iWfnNo';
const mensajeDiv = document.getElementById('mensaje');

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const identificacion = document.getElementById('loginIdentificacion').value;
  const clave_encriptada = document.getElementById('loginClave').value;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?identificacion=eq.${identificacion}`, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (response.ok && data.length > 0) {
    const usuario = data[0];
    if (usuario.clave_encriptada === clave_encriptada) {
      mensajeDiv.textContent = `Inicio de sesión exitoso. Rol: ${usuario.usuario_normal ? "Normal" : usuario.usuario_administrador ? "Administrador" : "Superadministrador"}`;
      mensajeDiv.className = 'message success';
    } else {
      mensajeDiv.textContent = 'Contraseña incorrecta.';
      mensajeDiv.className = 'message error';
    }
  } else {
    mensajeDiv.textContent = 'Usuario no encontrado.';
    mensajeDiv.className = 'message error';
  }
});
