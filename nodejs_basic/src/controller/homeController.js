import connection from '../config/conectDB';

let getHomePage = (req, res) => {
    let data = [];
    connection.query(
        'SELECT * FROM `users` ',
        function (err, results, fields) {
            // console.log(results); // results contains rows returned by server
            results.map((row) => {
                data.push({
                    id: row.id,
                    email: row.email,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    address: row.address,
                })
            });
            // console.log('data inside=> ', data)
            return res.render("index.ejs", { dataUser: data });

        })
}
export default { getHomePage };