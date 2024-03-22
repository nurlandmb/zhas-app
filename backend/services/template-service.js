const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const AdmZip = require('adm-zip');
const fs = require("fs");
const path = require("path");


class TemplateService {
    prepareTemplate(content) {
        const keys = Object.keys(content);

        const newObj = {};

        keys.forEach(key => {

            if (typeof content[key] === 'boolean') {
                newObj[key] = content[key] ? 'Иә' : 'Жоқ'
            } else if (key === 'birthDate') {
                newObj[key] = (new Date(newObj[key])).toLocaleDateString('ru-RU');
            } else if (key === 'budget' || key === 'tasks') {
                newObj[key] = content[key].map((item, index) => ({...item, index: index + 1}))
            } else {
                newObj[key] = content[key] ?? '';
            }
        });
        return newObj;
    }

    generateDocX(data) {
        // Load the docx file as binary content
        const content = fs.readFileSync(path.resolve(__dirname, "..", "assets", "request_template___ru.docx"), "binary");

        // Unzip the content of the file
        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true, linebreaks: true,
        });

        const templ = this.prepareTemplate(data);


        doc.render(templ);

        // Get the zip document and generate it as a nodebuffer
        const buf = doc.getZip().generate({
            type: "nodebuffer", // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });

        // buf is a nodejs Buffer, you can either write it to a
        // file or res.send it with express for example.
        // fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
        return buf;
    };

    generateZip(fileLocations) {
        let zip = new AdmZip();
        console.log(fileLocations);
        fileLocations.forEach(file => {
            const src = path.resolve(__dirname, "..", "files", file);
            zip.addLocalFile(src);
            // get everything as a buffer
        })
        return zip.toBuffer();
    }
}


module.exports = new TemplateService();