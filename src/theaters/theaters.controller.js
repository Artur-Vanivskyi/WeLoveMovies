const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//list function that shows whole list of theaters written using async await syntax
async function list(req, res) {
    const data = await service.list()
    res.json({ data })
}

//exports
module.exports = {list: [asyncErrorBoundary(list)]}

