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
    }
};

