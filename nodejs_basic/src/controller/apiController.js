import pool from '../config/conectDB';

let getAllClock = async (req, res) => {
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
    return res.status(200).json({
        message: 'Read ok',
        data: data
    })
};

let createClock = async (req, res) => {
    let { name, price, quanlity, country_registration, machine_type_id, trademark_id } = req.body;
    if (!name || !price || !quanlity || !country_registration || !machine_type_id || !trademark_id) {
        return res.status(200).json({
            message: 'missing require params'
        })
    }
    await pool.execute(`insert into clock(name,price,quanlity,country_registration,machine_type_id,trademark_id) values(?,?,?,?,?,?)`,
        [name, price, quanlity, country_registration, machine_type_id, trademark_id]);
    return res.status(200).json({
        message: 'Create ok'
    })
};
module.exports = {
    getAllClock, createClock
}