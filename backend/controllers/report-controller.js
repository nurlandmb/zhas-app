const ReportService = require('../services/report-service');
const ReportModel = require('../models/report-model');
class ReportController {
    async create(req, res, next){
        try{
            const report = await ReportService.create(req.body, req.user.id);
            res.send(report)
        }catch(err){
            console.log(err);
            next(err);
        }
    };

    async getFirst(req, res, next){
        try{
            const report = await ReportService.getFirst(req.user.id);
            res.send(report);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async getLast(req, res, next){
        try{
            const report = await ReportService.getLast(req.user.id);
            res.send(report);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async getById(req, res, next){
        try{
            const report = await ReportService.getById(req.params.id);
            res.send(report);
        }
        catch(err){
            console.log(err);
            next(err);
        }
    }

    async getMy(req, res, next){
        try{
            const reports = await ReportService.getMy(req.user.id);
            res.send(reports)
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async getAll(req, res, next){
        try{
            const reports = await ReportService.getAll();
            res.send(reports);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async edit(req, res, next) {
        try{

            const report = await ReportService.edit(req.body, req.user.id);
            res.send(report);
        }catch(err){
            console.log(err);
            next(err);
        }
    }
}

module.exports = new ReportController();