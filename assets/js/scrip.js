const btnBuscar = document.getElementById("btn-buscar");
const urlDragonBall = "https://dragonball-api.com/api/characters";

const cargarDatos = async (urlDragonBall) => {
    try {
        const response = await fetch(urlDragonBall);

        if (!response.ok){
            throw new Error("ERROR EN LA API");
        }

        const data = await response.json();

        return data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};




(async () => {
    const data = await cargarDatos(urlDragonBall);
    if (data) {
        console.log("Datos obtenidos", data.items);
        mostrarPersonaje(data.items); 
    }
})();

const mostrarPersonaje = (personajes) => {
    const contenePJ = document.getElementById("contenePJ");
    
    if (!personajes || personajes.length === 0) {
        contenePJ.innerHTML = '<p class="mensaje-error">No se encontraron personajes.</p>';
        return;
    }
    
    contenePJ.innerHTML = "";
    
    personajes.forEach(personaje => {
        const personajeHTML = `
            <div class="personaje-card">
                <img src="${personaje.image || 'imagen-default.jpg'}" alt="${personaje.name}" class="personaje-imagen">
                <div class="personaje-info">
                    <h2>${personaje.name}</h2>
                    <p><strong>Raza:</strong> ${personaje.race || 'Desconocida'}</p>
                    <p><strong>Género:</strong> ${personaje.gender || 'Desconocido'}</p>
                </div>
            </div>
        `;
        contenePJ.innerHTML += personajeHTML;
    });
};

