let description = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

let completado = {
    demand: false,
    alias: 'c',
    default: true
}

let filter = {
    demand: true,
    alias: 'c',
    default: true
}


const options = {
    list:   { filter },
    create: { description },
    update: { description, completado },
    delete: { description}
}
const argv = require('yargs')
    .command('list'   , 'list tasks with filter', options.list  )
    .command('listall', 'lists all tasks', {})
    .command('create', 'creates a task to be done', options.create)
    .command('update', 'updates task status to done', options.update)
    .command('delete', 'deletes a task from the list', options.delete)
    .help()
    .argv


module.exports = {
    argv
}