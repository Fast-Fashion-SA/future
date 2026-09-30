// ==========================================
// FAST FASHION
// SCRIPT PRINCIPAL
// ==========================================


// ==========================================
// ELEMENTOS DO SITE
// ==========================================

const searchInput = document.getElementById("searchInput");
const productGrid = document.getElementById("productGrid");
const productCards = document.querySelectorAll(".product-card");
const noResults = document.getElementById("noResults");

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");

const accountButton = document.getElementById("accountButton");

const viewAllButton = document.getElementById("viewAllButton");

const quickViewButtons = document.querySelectorAll(".quick-view");

const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");

const modalProductImage = document.getElementById("modalProductImage");
const modalProductCategory = document.getElementById("modalProductCategory");
const modalProductName = document.getElementById("modalProductName");
const modalProductDescription = document.getElementById("modalProductDescription");
const modalProductPrice = document.getElementById("modalProductPrice");

const addCartButton = document.getElementById("addCartButton");

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");
const newsletterMessage = document.getElementById("newsletterMessage");


// ==========================================
// CARRINHO
// ==========================================

let cartItems = 0;


// Adicionar produto ao carrinho
function addToCart() {

    cartItems++;

    cartCount.textContent = cartItems;

    // Pequena animação
    cartCount.classList.add("cart-animation");

    setTimeout(() => {
        cartCount.classList.remove("cart-animation");
    }, 300);

}


// Botão do carrinho
cartButton.addEventListener("click", () => {

    if (cartItems === 0) {

        alert("Seu carrinho está vazio.");

    } else {

        alert(
            `Você possui ${cartItems} ${
                cartItems === 1 ? "produto" : "produtos"
            } no carrinho.`
        );

    }

});


// ==========================================
// CONTA
// ==========================================

accountButton.addEventListener("click", () => {

    alert(
        "Área do cliente\n\n" +
        "Em breve você poderá acessar sua conta, " +
        "acompanhar pedidos e gerenciar seus dados."
    );

});


// ==========================================
// BUSCA DE PRODUTOS
// ==========================================

searchInput.addEventListener("input", () => {

    const searchTerm = searchInput.value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    let visibleProducts = 0;


    productCards.forEach(card => {

        const productName = card
            .getAttribute("data-name")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const productCategory = card
            .getAttribute("data-category")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");


        const matches =
            productName.includes(searchTerm) ||
            productCategory.includes(searchTerm);


        if (matches) {

            card.style.display = "";

            visibleProducts++;

        } else {

            card.style.display = "none";

        }

    });


    // Mostrar ou esconder mensagem
    if (visibleProducts === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

});


// ==========================================
// BOTÃO "VER TODOS"
// ==========================================

viewAllButton.addEventListener("click", () => {

    searchInput.value = "";

    productCards.forEach(card => {

        card.style.display = "";

    });

    noResults.style.display = "none";

    document
        .getElementById("novidades")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ==========================================
// MODAL DOS PRODUTOS
// ==========================================

quickViewButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");


        // Buscar informações diretamente do HTML
        const image = card.querySelector("img").src;

        const imageAlt = card.querySelector("img").alt;

        const category = card.querySelector(
            ".product-category"
        ).textContent;

        const name = card.querySelector("h3").textContent;

        const description = card.querySelector(
            ".product-description"
        ).textContent;

        const price = card.querySelector(
            ".price"
        ).textContent;


        // Colocar informações no modal
        modalProductImage.src = image;

        modalProductImage.alt = imageAlt;

        modalProductCategory.textContent = category;

        modalProductName.textContent = name;

        modalProductDescription.textContent = description;

        modalProductPrice.textContent = price;


        // Mostrar modal
        productModal.classList.add("active");

        // Impedir scroll da página
        document.body.classList.add("modal-open");

    });

});


// ==========================================
// FECHAR MODAL
// ==========================================

function closeModal() {

    productModal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


modalClose.addEventListener("click", closeModal);


// Fechar clicando fora do conteúdo
productModal.addEventListener("click", (event) => {

    if (event.target === productModal) {

        closeModal();

    }

});


// Fechar com ESC
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeModal();

    }

});


// ==========================================
// ADICIONAR AO CARRINHO PELO MODAL
// ==========================================

addCartButton.addEventListener("click", () => {

    addToCart();

    addCartButton.textContent = "Adicionado ✓";


    setTimeout(() => {

        addCartButton.textContent =
            "Adicionar ao carrinho";

    }, 1500);

});


// ==========================================
// NEWSLETTER
// ==========================================

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const email = emailInput.value.trim();


    if (email === "") {

        newsletterMessage.textContent =
            "Digite um e-mail válido.";

        return;

    }


    newsletterMessage.textContent =
        "Cadastro realizado com sucesso!";


    emailInput.value = "";

});


// ==========================================
// ANIMAÇÃO AO ENTRAR NA PÁGINA
// ==========================================

const animatedElements = document.querySelectorAll(
    ".product-card, .responsibility-card, .category-card"
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.1
    }
);


animatedElements.forEach(element => {

    element.classList.add("hidden");

    observer.observe(element);

});


// ==========================================
// LOG INICIAL
// ==========================================

console.log(
    "Fast Fashion — site carregado com sucesso."
);
