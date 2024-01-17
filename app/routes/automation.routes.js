var screenshotall = require('../controllers/screenshot.all.controller.js');
var screenshotgrafana = require('../controllers/screenshot.grafana.controller.js');

module.exports = function (app) {

    app.post('/screenshot/all', screenshotall.postScreenShot);
    app.get('/screenshot/all', screenshotall.getScreenShot);
    app.post('/screenshot/grafana', screenshotgrafana.postScreenShot);
    app.get('/screenshot/grafana', screenshotgrafana.getScreenShot);

}
