import express from 'express';
import APIcontroller from '../controllers/APIcontroller';
let router = express.Router();


const initAPIRoute = (app) => {
    router.get('/users', APIcontroller.getAllUsers); ///method GET -> READ data
    router.post('/create-user', APIcontroller.createNewUser);
    
    router.get('/abcabcabc', (req, res) => {
        res.status(200).send({
            message: "hello"
        })
    })

    return app.use('', router)
}    

export default initAPIRoute