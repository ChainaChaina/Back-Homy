const mongoose = require('mongoose');

const CaronaSchema = new mongoose.Schema({
    nome: String,
    nota: Number,
    localSaida: String,
    localChegada: String,
    data: { type: Date, expires: 86400 },
    valor: Number,
    horaSaida: String,
    horaChegada: String,
    embarque: String,
    imagem: String,
    desembarque: String,
    userEmail: String,
    telefone: String,
    vagas: String,
    interesses: String,
    votos: Number,
});

module.exports = mongoose.model('Carona', CaronaSchema);