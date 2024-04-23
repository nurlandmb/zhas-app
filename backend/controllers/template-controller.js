const templateService = require('../services/template-service')
const requestService = require('../services/request-service');
const fs = require("fs");
const path = require("path");

class TemplateController {
    async generateTemplate(req, res, next) {
        try {
            templateService.clearDirectory();
            const requests = await requestService.loadAll();
            let fileSrc = [];
            const wrongReqs = [];

            const validRequests = TemplateController.sanitizeObject(requests);
            validRequests.forEach(request => {
                try{
                    const buffer = templateService.generateDocX(
                        {
                            lang: request.content.lang,
                            ...request.content.userForm,
                            ...request.content.projectForm
                        }
                    );

                    const regionCode = request.content.userForm.region === 'Абай' ? '[ab]' : '[alm]';

                    let fileName = `${regionCode}-${request.content.userForm.iin}`;
                    if(fs.existsSync(path.resolve(__dirname, "..", "files", `${fileName}.docx`))){
                        fileName = fileName + "-" + request.code;
                    }
                    fs.writeFileSync(path.resolve(__dirname, "..", "files", `${fileName}.docx`), buffer);
                    fileSrc.push(`${fileName}.docx`);
                }catch(err){
                    wrongReqs.push(request.code);
                }

            })

            const zippedFiles = templateService.generateZip(fileSrc);

            const fileName = 'uploads.zip';
            const fileType = 'application/zip';
            res.writeHead(200, {
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': fileType,
            })
            console.log('here they ', wrongReqs);

            return res.end(zippedFiles.toString('base64'));
        } catch (err) {
            console.log(err);
            next(err);
        }

    }

    static sanitizeObject(requests) {
        for(let i = 0; i < requests.length; i++){
            const request = requests[i];
            for (const key in request) {
                if (typeof request[key] === 'string') {
                    request[key] = TemplateController.removeXMLInvalidChars(request[key]);
                } else if (Array.isArray(request[key])) {
                    request[key] = request[key].map(item => TemplateController.removeXMLInvalidChars(item))
                }
            }
        }
        return requests;

    }

    /**
     * Removes invalid XML characters from a string
     * @param {string} str - a string containing potentially invalid XML characters (non-UTF8 characters, STX, EOX etc)
     * @return {string} a sanitized string stripped of invalid XML characters
     */
    static removeXMLInvalidChars(str) {

        // remove everything forbidden by XML 1.0 specifications, plus the unicode replacement character U+FFFD
        var regex = /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

        // ensure we have a string
        str = String(str || '').replace(regex, '');
        let removeDiscouragedChars = true;
        str = str.replace('\n', '&#10;')
        if (removeDiscouragedChars) {

            // remove everything discouraged by XML 1.0 specifications
            regex = new RegExp(
                '([\\x7F-\\x84]|[\\x86-\\x9F]|[\\uFDD0-\\uFDEF]|(?:\\uD83F[\\uDFFE\\uDFFF])|(?:\\uD87F[\\uDF' +
                'FE\\uDFFF])|(?:\\uD8BF[\\uDFFE\\uDFFF])|(?:\\uD8FF[\\uDFFE\\uDFFF])|(?:\\uD93F[\\uDFFE\\uD' +
                'FFF])|(?:\\uD97F[\\uDFFE\\uDFFF])|(?:\\uD9BF[\\uDFFE\\uDFFF])|(?:\\uD9FF[\\uDFFE\\uDFFF])' +
                '|(?:\\uDA3F[\\uDFFE\\uDFFF])|(?:\\uDA7F[\\uDFFE\\uDFFF])|(?:\\uDABF[\\uDFFE\\uDFFF])|(?:\\' +
                'uDAFF[\\uDFFE\\uDFFF])|(?:\\uDB3F[\\uDFFE\\uDFFF])|(?:\\uDB7F[\\uDFFE\\uDFFF])|(?:\\uDBBF' +
                '[\\uDFFE\\uDFFF])|(?:\\uDBFF[\\uDFFE\\uDFFF])(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\' +
                'uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|' +
                '(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))', 'g');

            str = str.replace(regex, '');
        }

        return str;
    }
}

module.exports = new TemplateController();