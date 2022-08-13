const express = require('express');
const Api = require('./api');
const product = require('./utils');
const productos = new Api(product);
const app = express();
const PORT = 8080;
const router = express.Router();

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => {
	console.log(`ERROR en el servidor ${error}`);
});

app.use('/', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

router.get('/api/productos', (req, res) => {
	productos.getAll().then((element) => res.json(element));
});

router.get('/api/productos/:id', (req, res) => {
	productos
		.getById(req.params.id)
		.then((element) => res.json(element))
		.catch((error) => res.json(error));
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
		.then((element) => res.json({ nuevoProducto: product, id: element }))
		.catch((error) => res.json(error));
});

router.put('/api/productos/:id', (req, res) => {
	let title = req.body.title;
	let price = req.body.price;
	let thumbnail = req.body.thumbnail;

	let product = {
		title: title,
		price: price,
		thumbnail: thumbnail,
	};

	productos
		.updateById(req.params.id, product)
		.then(() => res.json({ nuevoProducto: product, id: req.params.id }))
		.catch((error) => res.json(error));
});

router.delete('/api/productos/:id', (req, res) => {
	productos
		.deleteById(req.params.id)
		.then((element) => res.json(element))
		.catch((error) => res.send(error));
});
