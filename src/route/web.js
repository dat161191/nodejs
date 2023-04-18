import express from "express";
import homeController from "../controller/homeController";

// Khởi tạo biến router (đường link cho 1 website)
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/about', (req, res) => {
        res.send('Hello TranGia')
    });

    return app.use('/', router);
}

module.exports = initWebRoute; // <=> export default initWebRoute