var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopping', { useNewUrlParser: true }, { useUnifiedTopology: true });

var products = [
    new Product({
        imagePath: 'https://www.pontofrio-imagens.com.br/livros/LivrodeLiteraturaEstrangeira/FiccaoCientifica/205942/6749842/Livro-%E2%80%93-O-Senhor-dos-Aneis-%E2%80%93-Edicao-Completa-J-R-R-Tolkien-205942.jpg',
        title: 'O senhor dos anéis',
        description: 'O Senhor dos Anéis é uma trilogia de livros de alta fantasia escrita pelo escritor britânico J. R. R. Tolkien',
        price: 59
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51z6-Kd%2BtmL._SX352_BO1,204,203,200_.jpg',
        title: 'Drácula',
        description: 'Drácula é um romance de ficção gótica lançado em 1897, escrito pelo autor irlandês Bram Stoker, tendo como protagonista o vampiro Conde Drácula',
        price: 45
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51DoGMtAvaL._SX345_BO1,204,203,200_.jpg',
        title: 'A divina comédia',
        description: 'A Divina Comédia é um poema de viés épico e teológico da literatura italiana e mundial, escrito por Dante Alighieri no século XIV e dividido em três partes: o Inferno, o Purgatório e o Paraíso',
        price: 99
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51g494b%2BoJL._SX346_BO1,204,203,200_.jpg',
        title: 'Frankenstein',
        description: 'Frankenstein ou o Prometeu Moderno, mais conhecido simplesmente por Frankenstein, é um romance de terror gótico com inspirações do movimento romântico, de autoria de Mary Shelley, escritora britânica nascida em Londres',
        price: 49
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51HqE0L%2BQJL._SX362_BO1,204,203,200_.jpg',
        title: 'Dom Quixote',
        description: 'é um livro escrito pelo espanhol Miguel de Cervantes, com sua primeira edição publicada em Madrid no ano de 1605',
        price: 199
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}