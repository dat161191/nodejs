import pool from '../config/conectDB';

let getListMovies = async (req, res) => {
    const [data] = await pool.execute(`SELECT 
    id_movie idMovie, name_movie nameMovie, poster
FROM
    movie
WHERE
    flag = FALSE ORDER BY id_movie`);
    return res.status(200).json({
        message: 'Read ok',
        movies: data
    })
};

let detailMovie = async (req, res) => {
    let idMovie = req.params.idMovie;
    if (!idMovie) {
        return res.status(200).json({
            message: 'missing require params'
        })
    }
    // console.log(idMovie);
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
    return res.status(200).json({
        message: 'Delete ok', movie: data
    })
}
let createMovie = async (req, res) => {
    let { name_movie, poster, year_show, performer, director, content, type_movie, category, origin, time_show } = req.body;
    if (!name_movie || !poster || !year_show || !performer || !director || !content || !type_movie || !category || !origin || !time_show) {
        return res.status(200).json({
            message: 'missing require params'
        })
    }
    await pool.execute(`insert into movie(
        name_movie, poster, year_show, performer, director, content,type_movie_id,category_id,origin_id,time_show) values(?,?,?,?,?,?,?,?,?,?)`,
        [name_movie, poster, year_show, performer, director, content, type_movie, category, origin, time_show]);
    return res.status(200).json({
        message: 'Create ok'
    })
};

let updateMovie = async (req, res) => {
    let { name_movie, poster, year_show, performer, director, content, type_movie, category, origin, time_show, id_movie } = req.body;
    if (!name_movie || !poster || !year_show || !performer || !director ||
        !content || !type_movie || !category || !origin || !time_show || !id_movie) {
        return res.status(200).json({
            message: 'missing require params'
        })
    }
    await pool.execute(`UPDATE movie
    SET name_movie = ?,poster=?,year_show=?,performer=?,director=?,content=?,type_movie_id=?,category_id=?,origin_id=?,time_show=?
    WHERE id_movie=? AND flag=false`,
        [name_movie, poster, year_show, performer, director, content, type_movie, category, origin, time_show, id_movie])
    return res.status(200).json({
        message: 'Update ok'
    })
};
let deleteMovie = async (req, res) => {
    let idMovie = req.params.idMovie;
    if (!idMovie) {
        return res.status(200).json({
            message: 'missing require params'
        })
    }
    await pool.execute(`UPDATE movie
    SET flag = true
    WHERE id_movie=?`, [idMovie]);
    return res.status(200).json({
        message: 'Delete ok'
    })
}

module.exports = {
    getListMovies, createMovie, updateMovie, deleteMovie, detailMovie
}