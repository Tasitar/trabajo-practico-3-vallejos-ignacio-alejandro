
//boton para mostrar el contenido
const traerDatosBtn = document.querySelector('#traerDatosBtn');

//contenedor a actualizar
const contenedorPadre = document.querySelector('#contenedorPadre');

//API
dragonBallAPI = 'https://dragonball-api.com/api/characters';

//esta funcion trae los datos de la API
const cargarDatos = async (url) => {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error en la API');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        alert(error)
    }
};





//guarda los todos los personajes
const totalPersonajes = async() => {
     const data = await cargarDatos(dragonBallAPI);

    //para verificar que lleguen los datos correctamente
    if (!data) {
        throw new Error('error al traer los datos')
        console.log(Error)
    }
    //accede a los items 
    const dataPersonajes = data.items;
    return dataPersonajes;
};

//funcion para mostrar los personajes aparte para poder reutilizarla
const mostrarPersonajes = async (personajes) => {

    personajes.forEach((personaje) => {
        contenedorPadre.innerHTML += `
        <div class="col-6 pb-2 m-2 d-flex justify-content-center .bg-light.bg-gradient rounded " data-id=${personaje.id} style="width: 18rem;">
            <div>
                    <div class=" pb-2 d-flex justify-content-center">
                        <img  height="300px" class= 'card-img-top' src="${personaje.image}" >
                    </div>
                    <div id="info" class="card-body ">
                        <p id="nombre" class="card-text  border-bottom  border-success white-text-paragraph "> Nombre: ${personaje.name}  </p>
                        <p id="raza" class="card-text  border-bottom border-success white-text-paragraph"> Raza: ${personaje.race} </p>
                        <p id="genero" class="card-text border-bottom  border-success white-text-paragraph"> Género ${personaje.gender} </p>
                        <button  id="botonVerMas" class="btn btn-outline-dark"> Ver Más </button>
                    </div>
                </div>
            </div>
        
        
        `
        
    });
};

//muestra todos los personajes 
const mostrar = async () => {
    const personajes = await totalPersonajes();
    mostrarPersonajes(personajes);
};
mostrar()

// const detalles = async (id)=>{
//     const response = await fetch(`${dragonBallAPI}/${id}`)
//     const data = await response.json();
    
    
//     alert(data.description)
    

// };

// contenedorPadre.addEventListener("click", (e) => {
//     if (e.target.classList.contains("botonVerMas")) {
//     const cardPadre = e.target.closest("row");
//     const id = cardPadre.dataset.id;

//     detalles(id);
//     }})



const buscarBtn = document.querySelector('#buscarBoton');
const limpiarBtn = document.querySelector('#limpiarBoton');
const busqueda = document.querySelector('#buscador');

//crea un array, recorre todos los nombres buncando coincidencias y las pushea al array
//invoca la funcion para mostrar y le pasa de argumento el array asi solo mustra las coincidencias
buscarBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const personajes = await totalPersonajes();
    const valorBusqueda = busqueda.value.toLowerCase();
    

    const  personajesBuscados = [] 

    for ( let i=0; i< personajes.length; i++ )  {
        let nombre = personajes[i].name.toLowerCase();

    
        if ( nombre.includes(valorBusqueda)){

            console.log('se encontro concordancia')
            personajesBuscados.push(personajes[i])
            

        }else {
            console.log('terminando la busqueda')
        };


    };
    if (personajesBuscados.length> 0){
            contenedorPadre.innerHTML = `<div></div>`

            mostrarPersonajes(personajesBuscados)
        } else{
            contenedorPadre.innerHTML = `<div> 
            <p> No se encontraron resultados </p></div>`
        };



        
    //  for (let i = 0; i< cantidadPersonajes ; i++) 

    //     nombre = await personajes.name;

    // ;   console.log(nombre, 'nombre')

    //     if (nombre.toLowerCase.includes(busqueda.toLowerCase())){
    //         personajesBuscados.push(personajes[i]);}
    //     else {
    //         console.log('busqueda fallida')
    //     };

        


    });


//evento para limpiar busqueda
limpiarBtn.addEventListener( 'click', async () => {
    busqueda.value = '';

    const personajes = await totalPersonajes();
    mostrar();
});