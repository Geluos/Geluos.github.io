class Market{
	#map;
	#log;

	constructor() {
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
					let ls = window.localStorage.getItem("sum");
					let pp = child.textContent.substring(0, child.textContent.length - 1);
					window.localStorage.setItem("sum", parseInt(ls)+parseInt(pp));
					ls = parseInt(ls)+parseInt(pp);
					let buyButton = document.getElementById("buyButton");
					buyButton.textContent = "Корзина " + ls  + '.00₽';
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
		let arrayPhotos = ["Завтрак в вагоне СВ.jpg", 
		"Обед в купейном вагоне (детский).jpg", "Ужин в купейном вагоне (вегетарианский).jpg",
		 "Сэндвич с сыром.jpg", "Салат из свежих овощей.jpg", "coke.png"];
		let prices = ["500₽", "100₽", "500₽", "400₽", "600₽", "100₽", "250₽", "100₽", "350₽", "250₽", "550₽"];
		let names = ["Завтрак Взрослый",  "Детский обед", "Ужин (вег.)", "Сэндвич с сыром", "Обед витаминный", "Газировка"];
		let box = document.getElementById("flexbox");
		let element = document.getElementById("adam");
		for (let i = 0; i < 6; i++) 
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