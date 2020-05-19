const axios = require('axios');
const Carona = require('../models/Carona');


// EXIBE CARONAS
module.exports = {

    //vagas
    async vagas(request, response) { //FUNÇÃO DA LISTA DE INTERESSE: VÊ SE TEM VAGA NO CARRO E DIMINUI AS vagas NO CARRO

        await updater(request.body)


        async function updater(request) {
            const CaronaFromDb = await Carona.findOne({ _id: request._id });
            console.log(CaronaFromDb)
            if (CaronaFromDb.vagas > 0) {
                await Carona.updateOne({ vagas: CaronaFromDb.vagas }, { $set: { vagas: (CaronaFromDb.vagas - 1) } })
            } else {
                console.log("Opa, acabou a vida boa. Não temos mais espaço nesse carro :(") //mensagem de que deue rror
            }
            console.log((CaronaFromDb.vagas - 1)) // se der -1, acabou!!
        }

    },

    async votar(request, res) {
        await votador(request.body)

        //função de UPDATE
        async function votador(request) {
            const CaronaFromDb = await Carona.findOne({ _id: request._id });


            console.log(CaronaFromDb.votos)
            console.log("Obrigado por votar")
            if (CaronaFromDb.nota == undefined) {
                console.log("Sem nota anterior.")
                console.log(request.nota)
                await Carona.updateOne({ nota: CaronaFromDb.nota }, { $set: { nota: request.nota } })
                await Carona.updateOne({ votos: CaronaFromDb.votos }, { $set: { votos: (CaronaFromDb.votos + 1) } })
            } else {
                console.log("Nota anterior " + CaronaFromDb.nota)
                console.log(" votos: " + CaronaFromDb.votos)
                var novanota = CaronaFromDb.votos * CaronaFromDb.nota
                var novaMedia = (novanota + request.nota) / (CaronaFromDb.votos + 1)
                var novaMedia = novaMedia.toFixed(2)
                await Carona.updateOne({ votos: CaronaFromDb.votos }, { $set: { votos: (CaronaFromDb.votos + 1) } })
                await Carona.updateOne({ nota: CaronaFromDb.nota }, { $set: { nota: novaMedia } })
                console.log(novaMedia);
            }



            await Carona.updateOne({ Nota: CaronaFromDb.Nota }, { $set: { Nota: novaMedia } })





        }
    },

    async interesse(request, res) {
        await inte(request.body)

        async function inte(request) {

            const CaronaFromDb = await Carona.findOne({ _id: request._id });
            var interesses = CaronaFromDb.interesse;
            console.log(interesses);
            var novoInteresse = request.novoInteresse;
            console.log(novoInteresse);
            var res = `${interesses} ${novoInteresse}`;
            console.log(res);
            await Carona.updateOne({ interesses: CaronaFromDb.interesse }, { $set: { interesses: res } })


        }
    },
    // preciso achar um jeitod e linkar o banco de dados de usuario aqui.
    // async retornaInteresse(req, res) {
    //     console.log('Procurando:')
    //     res.send('hello world')
    //     await authInteresse(req.body);

    //     async function authInteresse(req) { // a função que é chamada acima é esta.

    //         const CaronaFromDb = await Carona.findOne({ _id: req._id }); // procura pelo valor de ID criado pelo mongo automaticamente
    //         console.log(CaronaFromDb);
    //         if (CaronaFromDb == null) {
    //             console.log('o sistema não encontrou usuários/senha na data base.');
    //         }
    //         var i = 1;

    //         var x = CaronaFromDb.interesses;
    //         var array = x.split(" ");
    //         console.log(array);

    //         while (array[i] != null) {

    //             MongoClient.connect(uri, (err, db) => { // como estamos pegando algo de OUTRO BD esse mongoose garante que entramos no lugar certo
    //                 if (err) return console.log(err)
    //                 var dbo = db.db("users");

    //             })



    //             const UserFromDb = await User.findOne({ _id: array[i] }); // procura pelo valor de ID criado pelo mongo automaticamente
    //             console.log(UserFromDb);
    //             if (UserFromDb == null) {
    //                 console.log('o sistema não encontrou usuários/senha na data base.');
    //             }
    //             i++
    //         }

    // }


    // }










}