class Market{
	#map;
	#log;
	#sum

	constructor() {
		this.#log = 0;
	}

	updateElem(element, name, price, imageName)
	{
		var children = element.children;
		for(var i=0; i<children.length; i++)
		{
			var child = children[i];
			if (child.classList[0] == 'goodButton')
			{
				child.textContent=price;
				child.addEventListener("click", () => 
				{
					this.#sum += price;
					let buyButton = document.getElementById("buyButton");
					buyButton.textContent = "Корзина " + this.#sum  + '.00₽';
				});
			}
			if (child.classList[0] == 'imgres')
				child.src  = "images/" + imageName;
			if (child.classList[0] == 'goodName')
				child.textContent=name;
		}
	}

	createGoods()
	{
		window.localStorage.setItem("sum", '0')
		let arrayPhotos = document.querySelector('input[name=photos]').value;
		let prices = document.querySelector('input[name=prices]').value;
		let names = document.querySelector('input[name=names]').value;
		let box = document.getElementById("flexbox");
		let element = document.getElementById("adam");
		for (let i = 0; i < arrayPhotos.length; i++) 
		{
			let new_element = element.cloneNode(true);
			new_element.removeAttribute("hidden");
			this.updateElem(new_element, names[i], prices[i], arrayPhotos[i]);
			box.appendChild(new_element);
		}
	}

	init()
	{
		let tg = window.Telegram.WebApp;
		let buyButton = document.getElementById("buyButton");

		buyButton.addEventListener("click", () => 
		{
			let data = {
				type: "market"
			}
			tg.sendData(JSON.stringify(data));

			tg.close();
		});

		this.createGoods();
	}
}

const market = new Market();
market.init();