const fs = require('fs');

class LocalFiles {
    constructor(params) {
        this.path = params.path;

    }

    async uploadFile(data, Key) {
        await fs.writeFileSync(this.path + Key, data, 'utf8');
        return this.path + Key
    }
    
    async uploadBase64File(fileBase64, dossier, name) {
        const base64result = fileBase64.split(',')[1];
        const fileData =  Buffer.from(base64result, 'base64');
        return await this.uploadFile(fileData, dossier + name);
    }
    
}