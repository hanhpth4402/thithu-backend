import connect from "../config/connectDB";

let getHomepage = async (req, res) => {

    const [rows, fields] = (await connect).execute("SELECT * FROM `users`");
    return res.status(200).json({
        message: 'ok',
        data: rows
    })

}

module.exports = {
    getHomepage
}