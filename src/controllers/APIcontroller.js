import connect from "../config/connectDB"
let getAllUsers = async (req, res) => {
    ///http code ;
    /// 200, 404, 501 sẻver sập
    const [rows, fields] = await connect.execute('SELECT * FROM `users`');
    return res.status(200).json({
        data: rows
    })
}
 
let createNewUser = async (req, res) => {
    let {first_name, last_name, email, address} = {first_name: 'huyen', last_name: 'ha', email: 'huyen@gmail.com', address:'hanoi'};
    await connect.execute("INSERT INTO users (first_name, last_name, email, address) VALUES (?, ?, ?, ?)", 
    ['huyen', 'ha', 'huyen@gmail.com', 'hanoi']);
    return res.status(200).json({
         message: "oke"
    })
}


module.exports = {
    getAllUsers,
    createNewUser
}