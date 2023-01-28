//Create the container

const helpers = require("./helpers");

let handlers = {};

handlers.index = async function(data) {
    try {
        if(data.method == 'get') {
            let templateData = {};
            let stringData = await helpers.getTemplate('index', templateData);
            if(stringData) {
                let universalString = await helpers.addHeaderFooter(stringData, templateData);
                if(universalString) {
                    return {
                        'statusCode' : 200,
                        'payload' : universalString,
                        'contentType' : 'html',
                    }
                }
            }
        }
    } catch(e) {
        console.error(e);
    }
}

handlers.notFound = async function() {
    return {
        'statusCode' : 404,
        'payload' : 'Not found page',
        'contentType' : 'plain'
    }
}

handlers.public = async function(data) {
    try {
        if(data.method == 'get') {
            let fileName = data.cleanedPath.replace('public','').trim();
            if(fileName.length > 0) {
                let staticAssetData = await helpers.getStaticAsset(fileName);
                if(staticAssetData) {
                    if(fileName.indexOf('.css') > -1) {
                        contentType = 'css';
                    }
                    if(fileName.indexOf('.png') > -1) {
                        contentType = 'png';
                    }
                    if(fileName.indexOf('.jpg') > -1) {
                        contentType = 'jpg';
                    }
                    if(fileName.indexOf('.favicon') > -1) {
                        contentType = 'favicon';
                    }
                    if(fileName.indexOf('.js') > -1) {
                        contentType = 'javascript';
                    }
                    return {
                        'statusCode' : 200,
                        'payload' : staticAssetData,
                        'contentType' : contentType
                    }
                }
            }
        }
    } catch(e) {
        console.error(e);
    }
} 

module.exports = handlers;