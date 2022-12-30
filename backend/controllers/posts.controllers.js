const pool = require("../db");

const getAllPosts = async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM posts;")
        res.status(200).json(result.rows);
    }catch(err) {
        console.error(err.message);
        res.json({message: "Hemos tenido problemas con la petición"})
    }
}

const createPost = async(req, res) => {
    try {
        const {titulo, url, descripcion} = req.body;
        const sql = "INSERT INTO posts(titulo, img, descripcion) VALUES($1, $2, $3) RETURNING *";
        const result = await pool.query(sql, [titulo, url, descripcion])
        res.status(200).json({mensaje: `nuevo registro ${result.rows}`});
    }catch(err) {
        console.error(err.message);
        res.json({message: "Hemos tenido problemas con la petición"})
    }
}

module.exports = {
    getAllPosts,
    createPost
}