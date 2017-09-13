import metalsmith from './metalsmith';

metalsmith.build((error) => {
    if (error) {
        throw error;
    }
});
