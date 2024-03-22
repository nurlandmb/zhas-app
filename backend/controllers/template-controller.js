const templateService = require('../services/template-service')
const requestService = require('../services/request-service');
const fs = require("fs");
const path = require("path");

class TemplateController {
    async generateTemplate(req, res, next) {
        try {
            const requests = await requestService.loadAll();
            let fileSrc = [];
            requests.forEach(request => {
                const buffer = templateService.generateDocX(
                    {
                        lang: request.content.lang,
                        ...request.content.userForm,
                        ...request.content.projectForm
                    }
                );
                fs.writeFileSync(path.resolve(__dirname, "..", "files", `${request.content.userForm.iin}.docx`), buffer);
                fileSrc.push(`${request.content.userForm.iin}.docx`);
            })

            const zippedFiles = templateService.generateZip(fileSrc);

            const fileName = 'uploads.zip';
            const fileType = 'application/zip';
            res.writeHead(200, {
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': fileType,
            })
            return res.end(zippedFiles.toString('base64'));
        } catch (err) {
            console.log(err);
            next(err);
        }

    }
}

module.exports = new TemplateController();