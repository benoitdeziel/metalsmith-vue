import fs from 'fs-extra';
const basePath = process.cwd() + '/';

// Metalsmith
import Metalsmith from 'metalsmith';
import jsonToFile from 'metalsmith-json-to-files';
import branch from 'metalsmith-branch';
import collections from 'metalsmith-collections';
import discoverPartials from 'metalsmith-discover-partials';
import layouts from 'metalsmith-layouts';
import markdownIt from 'metalsmith-markdownit';
import permalinks from 'metalsmith-permalinks';
import ignore from 'metalsmith-ignore';
import filter from 'metalsmith-filter';
import moveUp from 'metalsmith-move-up';

import componentsGenerator from './plugins/components-generator';

let debug = () => {
  return (files, metalsmith, done) => {
    console.log(metalsmith._metadata.collections)
    done()
  }
}

// Load config

if(!fs.readFileSync('./styleguide.config.json')) {
    console.log('Missing configuration file');
}

console.log('Reading configuration file');
import config from '../styleguide.config.json';

export default new Metalsmith(basePath)
    .clean(false)
    .source(config.source)
    .destination(config.destination)
    .use((files, metalsmith, done) => {
        // Clear metalsmith cache
        metalsmith._metadata = {};
        done();
    })
    .use(filter(['pages/**/*', 'components/**/example.html']))
    .metadata(config.metadata)
    .use(discoverPartials({
        directory: './core/templates/partials',
        pattern: /\.html$/
    }))
    .use(
        branch()
        .pattern(['pages/**/*.html', 'pages/**/*.md'])
        .use(componentsGenerator())
        .use(collections(config.collections))
        .use(markdownIt({
            html: true,
            typographer: true
        }))
        .use(moveUp('pages/**/*'))
        .use(permalinks())
        .use(layouts({
            engine: "handlebars",
            directory: "./core/templates/layouts",
            default: "default.html"
        }))
    )
    .use(
        branch()
        .pattern(['components/**/example.html'])
        .use(layouts({
            engine: "handlebars",
            directory: "./core/templates/layouts",
            default: "example.html"
        }))
    );
