import express from 'express';
import APIcontroller from '../controllers/APIcontroller';
let router = express.Router();


const initAPIRoute = (app) => {
    router.get('/users', APIcontroller.getAllUsers); ///method GET -> READ data
    router.post('/create-user', APIcontroller.createNewUser);
    
    return app.use('/api/v1', router)
}    

export default initAPIRoute