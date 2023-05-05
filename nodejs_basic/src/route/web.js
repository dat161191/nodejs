import express from "express";
import homeController from "../controller/homeController";

// Khởi tạo biến router (đường link cho 1 website)
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/movie/:idMovie', homeController.getDetailPage);
    // // router.get('/create', (req, res) => {
    // //     res.render('create.ejs', { mess: 'this is create' });
    // // });
    router.get('/create',homeController.getCreatePage);
    router.post('/save-movie',homeController.saveMovie);
    // router.get('/edit/clock/:clockId',homeController.editClockPage);
    // router.post('/update-clock',homeController.updateClock);
    // router.get('/delete/clock/:clockId',homeController.deleteClockPage);
    // router.post('/delete-clock',homeController.deleteClock);
    // router.get('/edit/clock/:clockId',homeController.editClockPage);
    // router.post('/update-clock',homeController.updateClock);
    return app.use('/', router);
}

module.exports = initWebRoute; // <=> export default initWebRoute