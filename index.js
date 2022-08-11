const express = require('express');
const Api = require('./api');
const productos = new Api();
const app = express();
const PORT = 8080;
const router = express.Router();

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => {
	console.log(`ERROR en el servidor ${error}`);
});

app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/api/productos', (req, res) => {
	productos.getAll().then((element) => res.json(element));
});

router.get('/api/productos/:id', (req, res) => {
	productos
		.getById(req.params.id)
		.then((element) => res.json(element))
		.catch((error) => res.send(error));
});

router.post('/api/productos', (req, res) => {
	let title = req.body.title;
	let price = req.body.price;
	let thumbnail = req.body.thumbnail;

	let product = {
		title: title,
		price: price,
		thumbnail: thumbnail,
	};

	productos
		.save(product)
		.then((element) => res.json({ nuevoProducto: product, id: element }));
});

// router.put('/api/productos/:id', (req, res) => {
// 	productos.getAll().then((element) => res.json(element));
// });

router.delete('/api/productos/:id', (req, res) => {
	productos
		.deleteById(req.params.id)
		.then((element) => res.json(element))
		.catch((error) => res.send(error));
});
