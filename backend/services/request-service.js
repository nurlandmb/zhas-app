const RequestDto = require('../dtos/request-dto');
const RequestModel = require('../models/request-model');
class RequestService {
    async create(body) {
        const code = Math.floor(100000 + Math.random() * 900000);

        const request = await RequestModel.create({...body, code, adminComment: "", status: "created"});

        return new RequestDto(request);
    };
    async loadAll() {
        const requests = await RequestModel.find();
        const requestsDto = requests.map(request => new RequestDto(request));

        return requestsDto;
    }

    async getStatus(codeOrIin){
        let isIin = true;
        if(codeOrIin.length === 6){
            isIin = false;
        }

        let query;

        if(isIin){
            query = {'content.userForm.iin': codeOrIin};
        }else{
            query = {code: codeOrIin};
        }

        const requests = await RequestModel.find(query);
        if(!requests || !requests.length){
            return [{fio: "", title: "", status: "NOT_FOUND"}]
        }

        return requests.map(request => ({
            fio: `${request.content.userForm.surname} ${request.content.userForm.name}`,
            title: request.content.projectForm.title,
            status: request.status,
        }))
    }
}

module.exports = new RequestService();