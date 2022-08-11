const fs = require('fs').promises;

class Api {
	constructor() {
		this.productos = [
			{
				title: 'Escuadra',
				price: 123.45,
				thumbnail:
					'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
				id: 1,
			},
			{
				title: 'Calculadora',
				price: 234.56,
				thumbnail:
					'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
				id: 2,
			},
			{
				title: 'Globo Terráqueo',
				price: 345.67,
				thumbnail:
					'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
				id: 3,
			},
		];
	}

	async save(obj) {
		try {
			let ids = [];
			this.productos.forEach((element) => {
				ids.push(element.id);
			});
			obj.id = Math.max(...ids) + 1;
			this.productos.push(obj);
			return Math.max(...ids) + 1;
		} catch (error) {
			console.log('hubo un error:', error);
		}
	}

	async getById(number) {
		try {
			const datos = this.productos;
			let elementById = datos.find((element) => element.id === number);
			if (elementById) {
				return elementById;
			} else {
				throw new Error('producto no encontrado');
			}
		} catch (error) {
			console.log('hubo un error:', error);
		}
	}

	async getAll() {
		try {
			return this.productos;
		} catch (error) {
			console.log('hubo un error:', error);
		}
	}

	async deleteById(number) {
		try {
			this.productos = this.productos.filter(
				(element) => element.id !== number
			);
			if (!this.productos) {
				throw new Error('producto no encontrado');
			}
		} catch (error) {
			console.log('hubo un error:', error);
		}
	}
}

module.exports = Api;
