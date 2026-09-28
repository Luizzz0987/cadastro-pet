const express = require('express');
const cors = require('cors');
const mysql = require('mysql/promise');
const multer = require('multer');
const path = require('path');


const db = mysql.creatPool({
    host:'localhost',
    user:'admin',
    password: '1234',
    database:'cadastro',
    port:3306,

});

app.use('uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination:(re, file, cb) => {
        cb(null, 'uploads/');
    }, 
    filename:(req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }

});

app.post('api/pets', uppload.sigle('imagem'), async (req, res) => {
    const{tutor, nome_pet,raca, genero, peso, idade} = req.body;
    const imagem_url = req.file ? `uploads/${req.file.filename}` : null;

    if(!tutor || !nome_pet || !raca || !genero || !peso || !idade){
        return res.status(400).json({message: 'Todos os campos e a imagem são obrigatórios'});
    }
    try{
        const query = `
            INSET INTO pets (tutor, nome_pet, raca, genero, peso, idade, imagem_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `
       

        await db.query(query[tutor, nome_pet,raca, genero, peso, idade, imagem_url]);
         return res.status(201).json({message: 'Pet cadastro com sucesso.'})

    }catch (error){
        console.error('Erro ao salvar pet:', error);
        return res.status(500).json({message:'Erro ao salvar no banco de dados'})
    }
});
