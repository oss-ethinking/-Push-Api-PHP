const path = require('path');

module.exports = (Encore) => {
    Encore
        .addEntry('ethinking-push-api-service-worker-js', [
            path.resolve(__dirname, '../public/js/scripts/service-worker.js'),
        ])
        .addEntry('ethinking-push-api-webpush-js', [
            path.resolve(__dirname, '../public/js/scripts/webpush.js'),
        ])
};
