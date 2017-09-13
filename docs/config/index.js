import path from 'canonical-path';

const DgeniPackage = require('dgeni').Package;

const packagePath = __dirname;

const DgeniConfig = new DgeniPackage('myDocs', [
    require('dgeni-packages/ngdoc'),
    require('dgeni-packages/nunjucks')
])
.config((log, readFilesProcessor, writeFilesProcessor) => {
    log.level = 'debug';

    readFilesProcessor.basePath = path.resolve(packagePath, '../..');

    readFilesProcessor.sourceFiles = [{
        include: 'src/components/**/**/*.js',
        basePath: 'src/components'
    },
    {
        include: 'src/content/**/*.md',
        basePath: 'src/content',
        fileReader: 'ngdocFileReader'
    }];

    writeFilesProcessor.outputFolder = 'build/docs';
})
.config((templateFinder) => {
    templateFinder.templateFolders.unshift(path.resolve(packagePath, 'templates'));
})
.config((computePathsProcessor, computeIdsProcessor) => {

    computeIdsProcessor.idTemplates.push({
        docTypes: ['content'],
        getId: function(doc) { return doc.fileInfo.baseName; },
        getAliases: function(doc) { return [doc.id]; }
    });

    computePathsProcessor.pathTemplates.push({
        docTypes: ['content'],
        getPath: function(doc) {
            let docPath = path.dirname(doc.fileInfo.relativePath);
            if (doc.fileInfo.baseName !== 'index') {
                docPath = path.join(docPath, doc.fileInfo.baseName);
            }
            return docPath;
        },
        outputPathTemplate: 'partials/${path}.html'
    });

});

export default DgeniConfig;
