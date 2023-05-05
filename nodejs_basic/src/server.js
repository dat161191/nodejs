import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web';
import initApiRoute from './route/api';

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// setup ViewEngine
configViewEngine(app);

// khởi tạo initWebRoute
initWebRoute(app);

// khởi tạo initApiRoute
initApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});




// import express from 'express'
// //Tạo một ứng dụng Express bằng cách gọi hàm express() và gán kết quả trả về cho biến app
// const app = express()

// //Định nghĩa một cổng để lắng nghe các kết nối đến ứng dụng:
// const port = 3000

// //Định nghĩa một route cho ứng dụng.Sử dụng phương thức HTTP GET để trả về nội dung 'Hello World!':
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// //Khởi động ứng dụng Express bằng cách lắng nghe các kết nối đến cổng đã định nghĩa
// // Ghi lại thông tin trên console khi ứng dụng đã sẵn sàng để xử lý các yêu cầu
// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`)
// })