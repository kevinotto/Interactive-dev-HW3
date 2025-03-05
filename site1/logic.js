document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.querySelector("#theme-toggle");
    const modeLight = document.querySelector("#mode-light");
    const modeDark = document.querySelector("#mode-dark");
  
    let currentPage = 1;
    const productsPerPage = 10;
    let totalProducts = 0;
    let allProducts = [];
  
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        allProducts = data.products;
        totalProducts = allProducts.length;
        displayProducts(currentPage);
        productPages();
      })
  
    function displayProducts(page) {
      const productGrid = document.querySelector(".product-grid");
      productGrid.innerHTML = "";
  
      const start = (page - 1) * productsPerPage;
      const end = start + productsPerPage;
      const productsToDisplay = allProducts.slice(start, end);
  
      productsToDisplay.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("card");
  
        productCard.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <button>Add to Cart</button>
        `;
  
        productGrid.appendChild(productCard);
      });
    }
  
    function productPages() {
      const pageControls = document.querySelector(".page-controls");
      pageControls.innerHTML = "";
  
      const prevButton = document.createElement("button");
      prevButton.textContent = "Previous";
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          displayProducts(currentPage);
          updatePageControls();
        }
      });
  
      const nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.disabled = currentPage * productsPerPage >= totalProducts;
      nextButton.addEventListener("click", () => {
        if (currentPage * productsPerPage < totalProducts) {
          currentPage++;
          displayProducts(currentPage);
          updatePageControls();
        }
      });
  
      pageControls.appendChild(prevButton);
      pageControls.appendChild(nextButton);
    }
  
    function updatePageControls() {
      const prevButton = document.querySelector(".page-controls button:first-child");
      const nextButton = document.querySelector(".page-controls button:last-child");
  
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage * productsPerPage >= totalProducts;
    }
  
    const body = document.body;
    if (localStorage.getItem("currentTheme") === "dark") {
      body.classList.add("dark-mode");
      modeDark.style.display = "none";
      modeLight.style.display = "inline";
    } else {
      modeLight.style.display = "none";
      modeDark.style.display = "inline";
    }
  
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
  
      if (body.classList.contains("dark-mode")) {
        modeDark.style.display = "none";
        modeLight.style.display = "inline";
        localStorage.setItem("currentTheme", "dark");
      } else {
        modeLight.style.display = "none";
        modeDark.style.display = "inline";
        localStorage.setItem("currentTheme", "light");
      }
    });
  
    fetch("lang.json")
      .then((response) => response.json())
      .then((data) => {
        const language = localStorage.getItem("language") || "en";
        applyLanguage(data, language);
        document.getElementById("language-select").value = language;
        document.getElementById("language-select").addEventListener("change", (event) => {
          const selectedLanguage = event.target.value;
          applyLanguage(data, selectedLanguage);
          localStorage.setItem("language", selectedLanguage);
        });
      });
  
    function applyLanguage(data, language) {
      const elements = {
        title: "title",
        navHome: "#nav-home",
        navProducts: "#nav-products",
        navAbout: "#nav-about",
        welcomeMessage: ".hero h2",
        shopNow: ".hero .btn",
        aboutUsTitle: ".about h2",
        aboutUsText: ".about p",
        footerText: "footer p",
      };
  
      for (let key in elements) {
        const element = document.querySelector(elements[key]);
  
        if (element) {
          element.textContent = data[language][key];
        }
      }
    }

      // selecting the drop down button for price

  const priceSort = document.querySelector("#price-sort");

  priceSort.addEventListener("change", () => {
      const sortBy = priceSort.value;
      
      if (sortBy === "price-low") {
          allProducts.sort((a, b) => a.price - b.price); 
      } else if (sortBy === "price-high") {
          allProducts.sort((a, b) => b.price - a.price);
      }
      
      displayProducts(currentPage);
  });

  });
