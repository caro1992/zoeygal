const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart')
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');


//Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items')

// Viariable de arreglos de Productos
let allProducts = JSON.parse(localStorage.getItem("cart")) || [];


const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');



productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement.parentElement

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h6').textContent,
			price: product.querySelector('h5').textContent,
		}

		const exist = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exist) {
			const products = allProducts.map(product => {
				if(product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
		localStorage.setItem("cart", JSON.stringify(allProducts));
	}	
});

rowProduct.addEventListener('click', e => {
	if(e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
})

// FUnción para mostrar HTML
const showHTML = () => {

	if(!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}
	//Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;



	allProducts.forEach(product => {
		const containerProduct = document.createElement('div')
		containerProduct.classList.add('cart-product')

		containerProduct.innerHTML = `
			<div class="info-cart-product">
				<span class="cantidad-producto-carrito">${product.quantity}</span>
				<p class="titulo-producto-carrito">${product.title}</p>
				<span class="precio-producto-carrito">${product.price}</span>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="icon-close"					                               
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		
		`;

		rowProduct.append(containerProduct);
		saveLocal();
		cartCounter();

		total = total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts
	
	


};


//localStorage
const saveLocal = () => {
	localStorage.setItem("cart", JSON.stringify(allProducts));
}

const cartCounter = () => {
	const cartLength = allProducts.length;
	localStorage.setItem("cartLenght", JSON.stringify(cartLength));
	countProducts.innerText = JSON.parse(localStorage.getItem("cartLenght"));
	
};

cartCounter();


