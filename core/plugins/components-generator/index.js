import fs from 'fs-extra';
import klawSync from 'klaw-sync';
import through2 from 'through2';
import path from 'path';

export default function componentsGenerator (options) {
    return function(files, metalsmith, done) {
        let keys = Object.keys(files);

        function processFile (file) {
            let fileMeta = files[file];
            let componentsDir = path.resolve(metalsmith.directory(), metalsmith.source() + '/' + fileMeta.components_src);

            if (!fileMeta.components_src) {
                console.log(`${file} has no components`);
                return;
            }

            const filterFn = item => path.extname(item.path) === '.json';
            const items = klawSync(componentsDir, { filter: filterFn });

            items.forEach(item => {
                let jsonData = fs.readFileSync(item.path);

                let file = {
                    contents: '',
                    data: JSON.parse(jsonData),
                    path: 'pages/tests',
                    layout: 'component.html',
                    collection: 'Components'
                };

                file.title = file.data.name;

                let filename = `components/${file.data.name.toLowerCase()}.html`

                files[filename] = file;
            });
        }

        keys.forEach(processFile);
        done();
    }
}
