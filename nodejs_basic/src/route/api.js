import express from "express";
import apiController from "../controller/apiController"
// Khởi tạo biến router (đường link cho 1 website)
let router = express.Router();

const initApiRoute = (app) => {
    router.get('/', apiController.getListMovies); //method Get (REST API): lấy data từ DB
    router.get('/detail-movie/:idMovie', apiController.detailMovie); //method Get (REST API): lấy data từ DB
    router.post('/save-movie', apiController.createMovie); //method Post (REST API): thêm mới data vào DB
    router.put('/update-movie', apiController.updateMovie); //method Put (REST API): chỉnh sửa data vào DB
    router.delete('/delete-movie/:idMovie', apiController.deleteMovie); //method Delete (REST API): xoá data vào DB
    return app.use('/api/', router);
}

module.exports = initApiRoute; // <=> export default initWebRoute