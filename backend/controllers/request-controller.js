const RequestService = require('../services/request-service')
const requestTemplate =require('../assets/request-template');
const mailService = require('../services/mail-service');

class RequestController {
    async create (req, res, next) {
        try{
            const request = await RequestService.create(req.body);

            const mailTemplate = requestTemplate(req.body);
            await mailService.sendMail('nzt.dmb@gmail.com', 'Request', mailTemplate);

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