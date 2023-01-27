const {v4: uuidv4} = require("uuid");
const path = require("path");

const fileUpload = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], directory = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length -1];
        // Validar extension
        if (!validExtensions.includes(extension)){
            return reject(`La extensión ${extension} no es valida, extensiones validas ${validExtensions}`);
        }

        const tempName = cutName[0] + '.' + extension;
        const uploadPath = path.join(__dirname , '../uploads/', directory, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(tempName);
        });
    });
}

const filesUpload = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], directory = '') => {
    return new Promise((resolve, reject) => {
        let names = [];
        let errorV = false;
        let error;
        for(let i=0;files.length>i;i++){
            let image = files[i];
            const cutName = image.name.split('.');
            const extension = cutName[cutName.length -1];
            // Validar extension
            if (!validExtensions.includes(extension)){
                return reject(`La extensión ${extension} no es valida, extensiones validas ${validExtensions}`);
            }

            const tempName = cutName[0] + '.' + extension;
            const uploadPath = path.join(__dirname , '../uploads/', directory, tempName);
            image.mv(uploadPath, (err) => {
                if (err) {
                    error = err;
                    errorV = true;
                } else {
                    names.push(tempName);
                }
            });
            names.push(tempName);
        }
        if (errorV){
            console.log('entra al error');
            reject(error);
        }
        resolve(names);
    });
}

module.exports = {
    fileUpload,
    filesUpload
}
