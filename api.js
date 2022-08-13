class Api {
	constructor(productos) {
		this.productos = productos;
	}

	async save(obj) {
		try {
			if (obj.title && obj.price && obj.thumbnail) {
				let ids = [];
				this.productos.forEach((element) => {
					ids.push(element.id);
				});
				obj.id = Math.max(...ids) + 1;
				this.productos.push(obj);
			} else {
				throw new Error(
					'es necesario poner todos los parametros correspondientes'
				);
			}
		} catch (error) {
			throw { error: `${error.message}` };
		}
	}

	async getById(number) {
		try {
			let elementById = this.productos.find((element) => element.id == number);
			if (elementById) {
				return elementById;
			} else {
				throw new Error('producto no encontrado');
			}
		} catch (error) {
			throw { error: `${error.message}` };
		}
	}

	async updateById(number, obj) {
		try {
			let element = this.productos.find((element) => element.id == number);
			if (element) {
				for (let i = 0; i < this.productos.length; i++) {
					if (this.productos[i].id == number) {
						this.productos[i].title = obj.title;
						this.productos[i].price = obj.price;
						this.productos[i].thumbnail = obj.thumbnail;
						return this.productos[i];
					}
				}
			} else {
				throw new Error('producto no encontrado');
			}
		} catch (error) {
			throw { error: `${error.message}` };
		}
	}

	async getAll() {
		return this.productos;
	}

	async deleteById(number) {
		try {
			let element = this.productos.find((element) => element.id == number);
			if (element) {
				this.productos = this.productos.filter(
					(element) => element.id != number
				);
			} else {
				throw new Error('producto no encontrado');
			}
		} catch (error) {
			throw { error: `${error.message}` };
		}
	}
}

module.exports = Api;
