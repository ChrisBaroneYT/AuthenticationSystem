const SUPABASE_URL = 'https://shvkkhtmdzrsaitoxvuo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodmtraHRtZHpyc2FpdG94dnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODE0MDEsImV4cCI6MjA1OTk1NzQwMX0.SFqSZsoX4YfRjOOdNLqrqqHgrY01bLS7iwuH9iWfnNo';
const mensajeDiv = document.getElementById('mensaje');

document.getElementById('registroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const identificacion = parseInt(document.getElementById('identificacion').value);
  const nombre_usuario = document.getElementById('nombre_usuario').value;
  const email = document.getElementById('email').value;
  const clave_encriptada = document.getElementById('clave_encriptada').value;
  const rol = document.getElementById('rol').value;

  const userData = {
    identificacion,
    nombre_usuario,
    email,
    clave_encriptada,
    usuario_normal: rol === "normal",
    usuario_administrador: rol === "admin",
    usuario_superadministrador: rol === "superadmin"
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/usuarios`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify([userData])
  });

  const data = await response.json();

  if (response.ok) {
    mensajeDiv.textContent = 'Registro exitoso. Puedes iniciar sesión.';
    mensajeDiv.className = 'message success';
    document.getElementById('registroForm').reset();
  } else {
    mensajeDiv.textContent = 'Error en el registro: ' + (data.message || JSON.stringify(data));
    mensajeDiv.className = 'message error';
  }
});
