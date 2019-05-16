// const argv = require('yargs').argv;
const argv = require('./config/yargs').argv
const colors = require('colors');
const toDo = require('./to-do/to-do');

let command = argv._[0];

// console.log("command: ", command);

switch (command) {
    case 'create': {
        let descripcion = argv.description;
        let tarea = toDo.crearTarea(descripcion);
        console.log('tarea: ', tarea);
        console.log('Se guardó la tarea exitosamente');
        break;
    }
    case 'listall': {
        let tareas = toDo.cargarDB()

        toDo.list(tareas);

        break;
    }

    case 'list': {
        let completado = argv.filter;

        let tareas = toDo.cargarDBConFiltro(completado);
        // console.log(tareas);

        // toDo.list(tareas);

        break;
    }

    case 'update': {
        let descripcion = argv.description;
        let completado = argv.completado;
        if(toDo.update(descripcion, completado)){
            console.log('La tarea se actualizó correctamente');
        } else {
            console.log('No se pudo actualizar la tarea');
        };
        break;
    }
    case 'delete': {
        let descripcion = argv.description;
        if(toDo.deleteTask(descripcion)){
            console.log('La tarea fué borrada');
        } else{
            console.log('No se pudo eliminar la tarea');
        };
        break;
    }
    default: {
        console.log('El comando no es reconocido');
        break;
    }
}; // end switch