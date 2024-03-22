const ReportModel = require('../models/report-model');
const ReportDto = require('../dtos/report-dto');

class ReportService {
    async create(report, id){
        const newReport = await ReportModel.create({...report, author: id});
        const reportDto = new ReportDto(newReport);
        return reportDto;
    }

    async edit(report, id){
        const newReport = await ReportModel.findById(report.id);
        newReport.status = report.status;
        newReport.content = report.content;
        newReport.adminComment = report.adminComment;
        await newReport.save();
        const reportDto = new ReportDto(newReport);
        return reportDto
    }

    async getFirst(id){
        const reports = await ReportModel.find();
        const reportsDto = reports.map(report => new ReportDto(report));
        const report = reportsDto.find(report => report.author.toString() === id && report.type === 'first')
        return report;
    }

    async getLast(id){
        const reports = await ReportModel.find();
        const reportsDto = reports.map(report => new ReportDto(report));
        const report = reportsDto.find(report => report.author.toString() === id && report.type === 'last')
        return report;
    }

    async getById(id){
        const report = await ReportModel.findById(id);
        const reportDto = new ReportDto(report);
        return reportDto
    }

    async getMy(id){
        const reports = await ReportModel.find();
        const reportsDto = reports.map(report => new ReportDto(report));
        const filteredReports = reportsDto.filter(report => report.author.toString() === id);
        return filteredReports;
    }

    async getAll(){
        const reports = await ReportModel.find();
        const reportsDto = reports.map(report => new ReportDto(report));
        return reportsDto;
    }

}
module.exports = new ReportService();