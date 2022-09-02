const loadAllProducts = async () => {
    try {
        const url = `https://fakestoreapi.com/products`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
};

const setAllMenu = async () => {
    const data = await loadAllProducts();

    const menu = document.getElementById('all-menu');

    const uniqueArray = [];
    for (const product of data) {

        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);

            const li = document.createElement('li');
            li.innerHTML = `<a>${product.category}</a>`;
            menu.appendChild(li);
        }
    }
};

setAllMenu();

// loadAlProducts();

const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async (e) => {
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
    if (e.key === 'Enter') {
        // console.log(searchField.value);
        const searchValue = searchField.value;
        // console.log(searchValue);

        const allProducts = await loadAllProducts();
        // console.log(allProducts);

        spinner.classList.add('hidden');

        const foundProducts = allProducts.filter(product => product.category.includes(searchValue
        ));
        // console.log(foundProducts);
        const productContainer = document.getElementById('products-container');
        const notFound = document.getElementById('not-found');
        productContainer.textContent = '';
        notFound.textContent = '';

        if (foundProducts.length === 0) {
            // console.log('not found');
            notFound.innerHTML = `<h2 class="text-2xl text-orange-500 text-center">Not Found</h2>`;
            return;
        }

        foundProducts.forEach(product => {
            // console.log(product);

            const { title, category, image, description } = product;

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow-xl">
                <figure><img class="rounded-xl h-60 w-full" src="${image}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${category}</h2>
                    <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
                    <div class="card-actions justify-end">
                       
                        <label onclick="showModal('${description}', '${image}')" for="my-modal-3" class="btn btn-primary modal-button">Show Detail</label>                    
                    </div>
                </div>
            </div>
            `;
            productContainer.appendChild(div);
        });
    }
});

const showModal = (description, image) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <p class="py-4">${description}</p>
        <img src="${image}">
    `;
};