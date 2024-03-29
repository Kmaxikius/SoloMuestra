// Importamos lo necesario desde firebase.js
import {
    saveData,
    getDataChanged_collection,
    deleteData,
    getData,
    getDataCollection,
    cambiarNombreDocumento,
    updateData
} from "./firebase.js";

const formulario = document.getElementById('formulario');
const coleccion = 'IoT';
const contenedor = document.getElementById('container');
const botonDocumento = document.getElementById('obtenerDocumento');


// Función para mostrar los datos en el contenedor
const mostrarDatos = async (datos) => {
    contenedor.innerHTML = '';
    datos.forEach(doc => {
        const data = doc.data();
        const id = doc.id;
        contenedor.innerHTML += `
            <div>
                    ${mostrarDispositivos(data.sensores,id)}
                    ${mostrarDispositivos(data.ejecutores,doc.id)}
            </div>
        `;
    });
}
// Función para mostrar los dispositivos 

const mostrarDispositivos = (dispositivos,id) => {
    let html = '';
    
    dispositivos.forEach(dispositivo => {
        html += `
                <div>
                    <p>Nombre: ${dispositivo.nombreEje} id: ${dispositivo.idDispo}</p>
                    <p>Estado: ${dispositivo.estado}</p>
                    <button onclick="abrirNuevaPestana('${dispositivo.idDispo}','${id}','${dispositivo.tipo}','${dispositivo.estado}')">Ver estado</button>  
                   
  
                </div>
        `;
    });
    return html;
}

botonDocumento.addEventListener('click', async () => {
    await getDataChanged_collection(coleccion, mostrarDatos);
});

window.abrirNuevaPestana = (idDispo, id, tipo,estado)=> {
    const nuevaPestana = window.open(`http://127.0.0.1:5500/SoloMuestra/DatosDisp/index.html?idDispo=${idDispo}&idesp=${id}&tipo=${tipo}&estado=${estado}`);
    nuevaPestana.focus();
}