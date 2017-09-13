import Dgeni from 'dgeni';

export default plugin() {
    return (files, metalsmith, done) => {
        const dgeni = new Dgeni();

        dgeni.generate().then(docs => {
            done();
        })
    }
}
