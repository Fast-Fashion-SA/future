/* =========================
   PRODUTOS
========================= */

const products = [

    {
        id: 1,
        name: "Blazer Estruturado",
        category: "Feminino",
        price: 249.90,
        image: "images/Blazer estruturado.webp",
        description:
            "Blazer de corte estruturado desenvolvido para composições formais e casuais."
    },

    {
        id: 2,
        name: "Camisa Essentials",
        category: "Masculino",
        price: 119.90,
        image: "images/camisa essentials.webp",
        description:
            "Camisa de modelagem regular, pensada para diferentes combinações."
    },

    {
        id: 3,
        name: "Calça Wide Leg",
        category: "Feminino",
        price: 179.90,
        image: "images/calça wide leg.webp",
        description:
            "Calça de modelagem ampla com proposta contemporânea."
    },

    {
        id: 4,
        name: "Jaqueta Urban",
        category: "Masculino",
        price: 289.90,
        image: "images/jaqueta urban.webp",
        description:
            "Jaqueta inspirada no estilo urbano e desenvolvida para uso cotidiano."
    },

    {
        id: 5,
        name: "Vestido Essential",
        category: "Feminino",
        price: 159.90,
        image: "images/vestido essential.webp",
        description:
            "Vestido de modelagem minimalista para diferentes ocasiões."
    },

    {
        id: 6,
        name: "Camiseta Heavy",
        category: "Masculino",
        price: 89.90,
        image: "images/camiseta heavy.webp",
        description:
            "Camiseta de construção pesada e modelagem confortável."
    },

    {
        id: 7,
        name: "Bolsa Mini",
        category: "Acessórios",
        price: 139.90,
        image: "images/bolsa mini.webp",
        description:
            "Bolsa compacta para composições urbanas."
    },

    {
        id: 8,
        name: "Óculos Frame",
        category: "Acessórios",
        price: 99.90,
        image: "images/oculos frame.webp",
        description:
            "Óculos de design contemporâneo."
    }

];


/* =========================
   ELEMENTOS
========================= */

const productGrid =
    document.getElementById("productGrid");

const cartCounter =
    document.getElementById("cartCounter");

const productModal =
    document.getElementById("productModal");

const modalProduct =
    document.getElementById("modalProduct");


/* =========================
   RENDERIZAR PRODUTOS
========================= */

function renderProducts(list = products) {

    productGrid.innerHTML = "";

    list.forEach(product => {

        const card = document.createElement("article");

        card.classList.add("product-card");

        card.innerHTML = `

            <div
                class="product-image"
                style="background-image: url('${product.image}')">
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="product-price">
                    R$ ${product.price.toFixed(2).replace(".", ",")}
                </p>

            </div>

        `;

        card.addEventListener("click", () => {
            openProduct(product);
        });

        productGrid.appendChild(card);

    });

}


/* =========================
   MODAL DO PRODUTO
========================= */

function openProduct(product) {

    modalProduct.innerHTML = `

        <div class="modal-product">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <p class="eyebrow">
                    ${product.category}
                </p>

                <h2>
                    ${product.name}
                </h2>

                <p class="product-price">
                    R$ ${product.price
                        .toFixed(2)
                        .replace(".", ",")}
                </p>

                <br>

                <p>
                    ${product.description}
                </p>

                <br>

                <button
                    class="button button-dark"
                    onclick="addToCart(${product.id})"
                >
                    Adicionar ao carrinho
                </button>

            </div>

        </div>

    `;

    productModal.classList.add("active");
}


/* =========================
   CARRINHO
========================= */

let cart = [];

function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;

    cart.push(product);

    cartCounter.textContent =
        cart.length;

    productModal.classList.remove("active");
}


/* =========================
   FECHAR MODAL
========================= */

document
    .getElementById("closeModal")
    .addEventListener("click", () => {

        productModal.classList.remove("active");

    });


productModal.addEventListener("click", event => {

    if (event.target === productModal) {

        productModal.classList.remove("active");

    }

});


/* =========================
   BUSCA
========================= */

const searchButton =
    document.getElementById("searchButton");

const searchBox =
    document.getElementById("searchBox");

const searchInput =
    document.getElementById("searchInput");


searchButton.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        searchInput.focus();
    }

});


searchInput.addEventListener("input", () => {

    const query =
        searchInput.value.toLowerCase().trim();

    if (!query) {
        renderProducts();
        return;
    }

    const filtered =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(query)

            ||

            product.category
                .toLowerCase()
                .includes(query)

        );

    renderProducts(filtered);

});


/* =========================
   NEWSLETTER
========================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const message =
            document.getElementById("newsletterMessage");

        message.textContent =
            `Cadastro realizado para ${email}.`;

        event.target.reset();

    });


/* =========================
   CONTA
========================= */

document
    .getElementById("accountButton")
    .addEventListener("click", () => {

        alert(
            "Área do cliente — funcionalidade demonstrativa."
        );

    });


/* =========================
   CARRINHO
========================= */

document
    .getElementById("cartButton")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Seu carrinho está vazio.");

            return;

        }

        const total =
            cart.reduce(
                (sum, product) =>
                    sum + product.price,
                0
            );

        alert(
            `Você possui ${cart.length} item(ns) no carrinho.\n\n` +
            `Total: R$ ${total
                .toFixed(2)
                .replace(".", ",")}`
        );

    });


/* =========================
   INICIALIZAÇÃO
========================= */

renderProducts();
