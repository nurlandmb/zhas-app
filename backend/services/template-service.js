const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const AdmZip = require('adm-zip');
const fs = require("fs");
const path = require("path");


class TemplateService {
    clearDirectory(){
        const directory = path.resolve( __dirname, "..", "files");
        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(directory, file), (err) => {
                    if (err) throw err;
                });
            }
        });
    }
    prepareTemplate(content) {
        const keys = Object.keys(content);

        const newObj = {};

        let yes = content.lang.startsWith('ru') ? 'Да' : 'Иә';
        let no = content.lang.startsWith('ru') ? 'Нет' : 'Жоқ';

        keys.forEach(key => {

            if (typeof content[key] === 'boolean') {
                newObj[key] = content[key] ? yes : no;
            } else if (key === 'birthDate') {
                newObj[key] = new Date(content[key]).toLocaleDateString('ru-RU');
            } else if (key === 'budget' || key === 'tasks') {
                newObj[key] = content[key].map((item, index) => ({...item, index: index + 1}))
            } else if(key === 'isStudying'){
                newObj[key] = content[key] === 'decline' ? no : yes;
            } else if(key === 'isWorking'){
                newObj[key] = content[key].length ? content[key] : no
            }else {
                newObj[key] = content[key] ?? '';
            }
        });
        return newObj;
    }

    generateDocX(data) {
        try{
            const templateName =  data.lang.startsWith('ru') ?  `request_template___ru.docx` : `request_template___kk.docx`;
            // Load the docx file as binary content
            const content = fs.readFileSync(path.resolve(__dirname, "..", "assets", templateName), "binary");

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
        } catch(err){
            console.log(err);
        }

    };

    generateZip(fileLocations) {
        let zip = new AdmZip();
        fileLocations.forEach(file => {
            const src = path.resolve(__dirname, "..", "files", file);
            zip.addLocalFile(src);
            // get everything as a buffer
        })
        return zip.toBuffer();
    }
}


module.exports = new TemplateService();