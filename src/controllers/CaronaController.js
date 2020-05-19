const axios = require('axios');
const Carona = require('../models/Carona');


// EXIBE CARONAS
module.exports = {
    async index(request, response) {
        const caronas = await Carona.find();
        return response.json(caronas);
    },

    //CRIA CARONAS
    async store(request, response) {
        console.log(request.body);
        const { nome, nota, localSaida, localChegada, data, valor, horaSaida, horaChegada, embarque, imagem, desembarque, vagas, userEmail, telefone, interesse, votos } = request.body;
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
            userEmail,
            telefone,
            vagas,
            interesse,
            votos,
        });
        return response.json(carona);
    },

    //UPDATE CARONA 
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
            telefone,
            vagas,
            interesse,
            votos,
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
                telefone,
                vagas,
                interesse,
                votos,
            },
        }, { new: true, omitUndefined: true })
        return response.json(carona);
    },

    //DELETAR
    async delete(request, response) { //DELETE , pelo ID
        await deleter(request.body)

        async function deleter(request) {

            console.log(request._id)
            const UserUP = await Carona.deleteOne({ _id: request._id })
            console.log("Deletado")

        }
    }







}