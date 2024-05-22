const RequestService = require('../services/request-service')
const requestTemplate =require('../assets/request-template');
const mailService = require('../services/mail-service');

class RequestController {
    async create (req, res, next) {
        try{
            res.status(404).send("late");
            return;
            const request = await RequestService.create(req.body);

            const mailTemplate = requestTemplate(req.body);
            const passportFiles = req.body.content.userForm.passportFile.map((item, i) => {
                return { path: item }
            });
            const citizenshipFiles = req.body.content.userForm.citizenshipFile.map((item, i) => {
                return { path: item }
            });
            const notWorkingFiles = req.body.content.userForm.notWorkingFile.map((item, i) => {
                return { path: item }
            })

            const allFiles = [...passportFiles, ...citizenshipFiles, ...notWorkingFiles];

            await mailService.sendMail('alliance.almatyobl@mail.ru', 'Request', mailTemplate, '' , allFiles);
            await mailService.sendMail('nzt.dmb@gmail.com', 'Request', mailTemplate, '' , allFiles);
            await mailService.sendMail('k.koz.88@mail.ru', 'Request', mailTemplate, '' , allFiles);

            res.send(request);
        } catch(err){
            console.log(err);
            next(err);
        }
    }

    async checkStatus(req, res, next){
        try{
            const status = await RequestService.getStatus(req.params.id);
            res.send(status)
        }catch(err){
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