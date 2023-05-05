import express from "express";

// configViewEngine() sẽ cấu hình cho ứng dụng Express của chúng ta sử dụng view engine EJS và load các file view từ thư mục ./src/views.
// Tham số truyền vào là đối tượng ứng dụng (app) của Express.
const configViewEngine = (app) => {
    //  Sử dụng middleware express.static() để phục vụ các tệp tĩnh như hình ảnh, CSS và các tệp JavaScript từ thư mục ./src/public.
    app.use(express.static('./src/public'));

    // Sử dụng phương thức app.set() để thiết lập view engine cho ứng dụng. 
    // Đặt giá trị "ejs" cho view engine bằng phương thức app.set("view engine", "ejs") 
    app.set("view engine", "ejs");

    // Đặt đường dẫn cho thư mục chứa các file view của ứng dụng bằng cách sử dụng phương thức app.set("views", "./src/views").
    // Tất cả các file ejs phải viết trong folder views
    app.set("views", "./src/views");
}

export default configViewEngine;