import express from "express";
import homeController from "../controller/homeController";

// Khởi tạo biến router (đường link cho 1 website)
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/clock/:clockId', homeController.getDetailPage);
    return app.use('/', router);
}

module.exports = initWebRoute; // <=> export default initWebRoute