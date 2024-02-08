import {
   
    getData,
    getDataChanged_collection,
  
    updateData
} from "./firebase.js";
const coleccion = 'IoT';

document.addEventListener('DOMContentLoaded', async () => {
    const datosDispositivo = document.getElementById('id');
    
    // Obtener el valor del parámetro de consulta
    const urlParams = new URLSearchParams(window.location.search);
    const idDispositivo = urlParams.get('idDispo');
    const idesp = urlParams.get('idesp');
    const tipo = urlParams.get('tipo');
    const estado = urlParams.get('estado');

    if (tipo === "ejecutor") {
        mostrarDatosEjecutor(datosDispositivo, idDispositivo, estado);
    } else {
        mostrarDatosSensor(datosDispositivo, idDispositivo, idesp, estado);
    }
});

window.modificarDispositivo = async (idDispo, id, tipo) => {
    const docData = await getData(id, coleccion);
    const sensores = docData.data().sensores.map(sensor => {
        if (sensor.idDispo === idDispo) {
            sensor.estado = prompt('Ingrese el nuevo valor del sensor');
            
        }
        return sensor;
    });
    await updateData(id, coleccion, { sensores });
   
};

function mostrarDatosEjecutor(elemento, idDispositivo, estado) {
    elemento.innerHTML = `
        <h2>Dispositivo: ${idDispositivo}</h2>
        <h3>Estado: ${estado}</h3>
    `;
}

function mostrarDatosSensor(elemento, idDispositivo, idesp, estado) {
    elemento.innerHTML = `
        <h2>Dispositivo: ${idDispositivo}</h2>
        <h3>Estado: ${estado}</h3>
        <button onclick="modificarDispositivo('${idDispositivo}','${idesp}','sensor')">Modificar</button>
    `;
}
