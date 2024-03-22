const RequestService = require('../services/request-service')

class RequestController {
    async create (req, res, next) {
        try{
            const request = await RequestService.create(req.body);
            res.send(request);
        } catch(err){
            console.log(err);
            next(err);
        }
    }

    async loadAll (req, res, next) {
        try{
            const requests = await RequestService.loadAll();
            res.send(requests);

        } catch(err){
            console.log(err);
            next(err);
        }
    }
}

module.exports = new RequestController();