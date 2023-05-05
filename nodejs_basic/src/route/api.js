import express from "express";
import apiController from "../controller/apiController"
// Khởi tạo biến router (đường link cho 1 website)
let router = express.Router();

const initApiRoute = (app) => {
    router.get('/clocks', apiController.getAllClock); //method Get (REST API): lấy data từ DB
    router.post('/save-clock', apiController.createClock); //method Get (REST API): thêm mới data vào DB
    return app.use('/api/', router);
}

module.exports = initApiRoute; // <=> export default initWebRoute