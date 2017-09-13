import Dgeni from 'dgeni';
import DgeniConfig from './config';

const dgeni = new Dgeni([DgeniConfig]);

dgeni.generate().then(function(docs) {
    console.log(docs);
    console.log(docs.length, 'docs generated');
});
