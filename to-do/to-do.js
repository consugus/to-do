const fs = require('fs');
let fileLocation = 'db/data.json';

let listadoPorHacer = [];

const crearTarea = (descripcion) => {
    let porHacer = {
        descripcion,
        completado: false
    };

    cargarDB();
    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const cargarDB = () => {
    try{
        listadoPorHacer = require('../' + fileLocation);
    }
    catch {
        listadoPorHacer = [];
    }
    return listadoPorHacer;
}

const cargarDBConFiltro = (completado) => {
    // El parámetro completado llega a la función como un string, y debe ser convertido a booleano
    completado = (completado == "true");

    let tmpDB;
    try {
        tmpDB = require('../' + fileLocation);
    }
    catch (err){
        listadoPorHacer = [];
    }

    for(let i = 0 ; i < tmpDB.length ; i++){

        if (completado === true){
            if(tmpDB[i].completado){
                listadoPorHacer.push(tmpDB[i]);
            };
        } else{
            if(!tmpDB[i].completado){
                listadoPorHacer.push(tmpDB[i]);
            };
        };

    };
    return listadoPorHacer;
}

const list = (tareas) => {

    console.log('\n=========Tareas por Hacer========='.green);
    for (let i = 0; i < tareas.length; i++) {
        console.log(tareas[i].descripcion);
        console.log('Estado: ', (tareas[i].completado ? "Completado".cyan : "Pendiente".red.bold));
        if(i != tareas.length -1){
            console.log('              ---              ');
        }
    };
    console.log('=================================='.green);
}


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(fileLocation, data, "utf8", (err) => {
        if (err) {
            throw new Error("No se pudo grabar la data", err)
        };
    });
};

const update = (descripcion, completado = true) => {

    let listadoPorHacer = cargarDB();
    console.log('completado: ', completado);

    let index = listadoPorHacer.findIndex( (tarea) => { tarea.descripcion === descripcion });
    for(let i = 0 ; i < listadoPorHacer.length ; i++){
        console.log('Verificación: ', listadoPorHacer[i].descripcion == descripcion);

            if(listadoPorHacer[i].descripcion == descripcion){
                listadoPorHacer[i].completado = completado;
                guardarDB();
                return true;
            }
        };
        return false
};

const deleteTask = (descripcion) => {
    let listadoPorHacer = cargarDB();

    for (let i = 0 ; i < listadoPorHacer.length ; i++ ){
        if(listadoPorHacer[i].descripcion == descripcion){
            listadoPorHacer.splice(i, 1);
            guardarDB();
            return true
        };
    };
    return false;

}


module.exports = {
    crearTarea,
    cargarDB,
    update,
    deleteTask,
    cargarDBConFiltro,
    list
};