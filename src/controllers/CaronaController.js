const axios = require('axios');
const Carona = require('../models/Carona');

module.exports = {
    async index(request, response) {
        const caronas = await Carona.find();
        return response.json(caronas);
    },


    async store(request, response) {
        console.log(request.body);
        const { nome, nota, localSaida, localChegada, data, valor, horaSaida, horaChegada, embarque, imagem, desembarque, vagas, userEmail, telefone, votos, interesse } = request.body;
        console.log(nome, valor);
        const carona = await Carona.create({
            nome,
            nota,
            localSaida,
            localChegada,
            data,
            valor,
            horaSaida,
            horaChegada,
            embarque,
            imagem,
            desembarque,
            vagas,
            userEmail,
            telefone,
            votos,
            interesse,
        });
        return response.json(carona);
    },

    async update(request, response) {
        const userEmail = request.params.user;
        if (!userEmail) {
            return response.status(401).json({ error: 'email não encontrado' });
        }
        const {
            nome,
            nota,
            localSaida,
            localChegada,
            data,
            valor,
            horaSaida,
            horaChegada,
            embarque,
            imagem,
            desembarque,
            vagas,
            telefone,
        } = request.body;
        const carona = await Carona.findOneAndUpdate({ userEmail }, {
            $set: {
                nome,
                nota,
                localSaida,
                localChegada,
                data,
                valor,
                horaSaida,
                horaChegada,
                embarque,
                imagem,
                desembarque,
                vagas,
                telefone
            },
        }, { new: true, omitUndefined: true })
        return response.json(carona);
    },

    async delete(request, res) { //DELETE , pelo ID
        await deleter(request.body)

        async function deleter(request) {
            const carona = await Carona.findOne
            if (carona == null) {
                console.log('Carona não existe mais no BD')
                return -1
            }
            console.log('Deletando')
            console.log(request._id)

            const CaronaUP = await Carona.deleteOne({ _id: request._id }) //atenção na QUERY aqui. Você passa objetos "{}"""

        }
    }



}