import fs from 'fs';
import {resolve} from 'path';

import metalsmith from './metalsmith';
import BrowserSync from 'browser-sync';

if (!fs.readFileSync('./styleguide.config.json')) {
    console.log('Missing configuration file');
}

import config from '../styleguide.config.json';

const browserSync = BrowserSync.create();

function buildMetalsmith() {
    metalsmith.build((error) => {
        if (error) {
            throw error;
        }
        browserSync.reload();
    });
}

browserSync.init({
    server: config.destination,
    files: [
        {
            match: [
                resolve(config.source, '**', '*'),
                resolve(config.source, 'layouts', '**', '*.html')
            ],
            fn: function(event, file) {
                buildMetalsmith();
            }
        }
    ]
});

buildMetalsmith();
