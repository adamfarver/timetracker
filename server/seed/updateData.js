const fs = require('fs')
const Moment = require('moment')

let now = Moment()

let data = fs.readFileSync('./seedData.json', 'ascii')

data = JSON.parse(data)
// Start updating the file here.
// Update the Sprint Start and End Data
data.sprints[0].dateStart = now.format()
data.sprints[0].dateEnd = now.add(7, 'days').format()
// Update Completed dates

// Update In-Process Numbers

// Console Output
console.log(data.sprints)
