import pool from '../config/conectDB';

let getHomePage = async (req, res) => {
    const [data, property] = await pool.execute(`select t.name trademarkName, 
        c.id clockId,
        c.name clockName,
        c.price price,
        i.url url,
        t.id trademarkId,
        i.id imgId,
        mt.id machineTypeId,
        c.gender gender,
        c.flag flag
        from clock c left join img i on c.id = i.clock_id
        join trademark t on t.id = c.trademark_id join machine_type mt on mt.id = c.machine_type_id 
        where flag=false group by c.id order by c.id `);
    console.log('check row ===> ', rows);
    return res.render("index.ejs", { dataClock: data, message: 'List clock ' });
}

let getDetailPage = async (req, res) => {
    let clockId = req.params.clockId;
    const [data] = await pool.execute(`SELECT 
    c.id clockId,
    c.name clockName,
    c.price price,
    c.country_registration country,
    c.gender gender,
    c.quanlity quanlity,
    t.name trademarkName,
    mt.name machineTypeName
FROM
    clock c
        JOIN
    trademark t ON c.trademark_id = t.id
        JOIN
    machine_type mt ON c.machine_type_id = mt.id
WHERE
    c.id = ? and c.flag=false`,[clockId])
    console.log(data);
    return res.send(JSON.stringify(data));
}
module.exports = {
    getHomePage, getDetailPage
}