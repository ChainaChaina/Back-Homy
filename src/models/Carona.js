const mongoose = require('mongoose');

const CaronaSchema = new mongoose.Schema({
    nome: String,
    nota: String,
    localSaida: String,
    localChegada: String,
    data: { type: Date, expires: 86400 },
    valor: Number,
    horaSaida: String,
    horaChegada: String,
    embarque: String,
    imagem: String,
    desembarque: String,
    vagas: Number,
    userEmail: String,
    telefone: String,
    votos: Number,
    interesse: String,
});

module.exports = mongoose.model('Carona', CaronaSchema);