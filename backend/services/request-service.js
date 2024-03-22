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
}

module.exports = new RequestService();