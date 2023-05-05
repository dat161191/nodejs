import pool from '../config/conectDB';
// import {execute} from "bootstrap/js/src/util";

let getHomePage = async (req, res) => {
    const [data] = await pool.execute(`SELECT 
    id_movie idMovie, name_movie nameMovie, poster
FROM
    movie
WHERE
    flag = FALSE ORDER BY id_movie`);
    // console.log('check data =>', data);
    return res.render('home.ejs', { movie: data });
}


let getDetailPage = async (req, res) => {
    let idMovie = req.params.idMovie;
    console.log(idMovie);
    const [data] = await pool.execute(`SELECT 
    m.id_movie idMovie,
    m.name_movie nameMovie,
    m.poster poster,
    m.year_show yearShow,
    m.performer performer,
    m.director director,
    m.content content,
    m.time_show timeShow,
    t.name_type typeMovie,
    c.name_category nameCategory,
    o.name_origin nameOrigin
FROM
    movie m
        JOIN
    type_movie t ON m.type_movie_id = t.id_type
        JOIN
    category c ON m.category_id = c.id_category
        JOIN
    origin o ON m.origin_id = o.id_origin where m.flag=false and m.id_movie=?`, [idMovie]);
    // console.log('check data =>', data);
    return res.render("detail.ejs", { detail: data[0] });
    // return res.send(JSON.stringify(data));
}

let getCreatePage = async (req, res) => {
    const [type_movie] = await pool.execute(`SELECT * FROM type_movie`);
    const [category] = await pool.execute(`SELECT * FROM category`);
    const [origin] = await pool.execute(`SELECT * FROM origin`);
    // console.log("check type_movie =>", type_movie, origin, category)
    return res.render('create.ejs', { type_movie: type_movie, category: category, origin: origin })
}

let saveMovie = async (req, res) => {
    // console.log(req.body);
    let { name_movie, poster, year_show, performer, director, content, type_movie, category, origin, time_show } = req.body;
    await pool.execute(`insert into movie(
        name_movie, poster, year_show, performer, director, content,type_movie_id,category_id,origin_id,time_show) values(?,?,?,?,?,?,?,?,?,?)`,
        [name_movie, poster, year_show, performer, director, content, type_movie, category, origin, time_show]);
    return res.redirect("/");
}

let getDeletePage = async (req, res) => {
    let idMovie = req.params.idMovie;
    //    console.log(clockId);
    const [data] = await pool.execute(`select * from movie  where id_movie = ? and flag=false`, [idMovie]);
    console.log(data);
    return res.render('delete.ejs', { movie: data[0] })
}

let deleteMovie = async (req, res) => {
    let idMovie = req.body.id_movie;
    await pool.execute(`UPDATE movie
    SET flag = true
    WHERE id_movie=?`, [idMovie]);
    return res.redirect('/');
}
let getEditPage = async (req, res) => {
    let idMovie = req.params.idMovie;
    const [movie] = await pool.execute(`select * from movie  where id_movie = ? and flag=false`, [idMovie]);
    const [type_movie] = await pool.execute(`SELECT * FROM type_movie`);
    const [category] = await pool.execute(`SELECT * FROM category`);
    const [origin] = await pool.execute(`SELECT * FROM origin`);
    console.log('check data =>', movie);
    return res.render('edit.ejs', { movie: movie[0], type_movie: type_movie, category: category, origin: origin })
}
let updateMovie = async (req, res) => {
    let { name_movie, poster, year_show, performer, director, content, type_movie, category, origin, time_show, id_movie } = req.body;
    console.log(req.body);
    await pool.execute(`UPDATE movie
    SET name_movie = ?,poster=?,year_show=?,performer=?,director=?,content=?,type_movie_id=?,category_id=?,origin_id=?,time_show=?
    WHERE id_movie=? AND flag=false`, [name_movie, poster, year_show, performer, director, content, type_movie, category, origin, time_show, id_movie])
    return res.redirect("/");
}

module.exports = {
    getHomePage, getDetailPage, getCreatePage, saveMovie, getEditPage, updateMovie, getDeletePage, deleteMovie
}
