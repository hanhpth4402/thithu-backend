import express from "express";

let configViewEngine = (app) => {
    app.set("view engine", "ejs");
    app.set('views', './src/views'); 
    // cai nay de cau hinh app tim cac file .ejs o folder views

}

export default configViewEngine;
