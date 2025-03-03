const themeBtn=document.querySelector("#theme-toggle");
const modeLight=document.querySelector("#mode-light");
const modeDark=document.querySelector("#mode-dark");

document.addEventListener("DOMContentLoaded",()=>{
    const modeLight=document.querySelector("#mode-light");
    const modeDark=document.querySelector("#mode-dark");
    fetch("https://dummyjson.com/products")
    .then(response=>response.json())
    .then(data => {
        displayProducts(data.products);
    })
});

function displayProducts(products){
    const productGrid=document.querySelector(".product-grid");
    productGrid.innterHTML="";
    products.forEach(product=>{
        const productCard=document.createElement("div");
        productCard.classList.add("card");
        
        productCard.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button>Add to Cart</button>
      `;

      productGrid.appendChild(productCard);
    })
}

const body=document.body;
if(localStorage.getItem("currentTheme")==="dark")
{
    body.classList.add("dark-mode");
    modeDark.style.display="none";
    modeLight.style.display="inline";
}
else
{
    modeLight.style.display="none";
    modeDark.style.display="inline";
}


themeBtn.addEventListener("click", ()=>{
    console.log("Button is being clicked")
    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode"))
    {
        //show light icon and switch background colors
        modeDark.style.display="none";
        modeLight.style.display="inline";
        localStorage.setItem("currentTheme", "dark");
        //currentTheme="light"
    }
    else
    {
        //show dark icon and switch background colors
        modeLight.style.display="none";
        modeDark.style.display="inline";
        localStorage.setItem("currentTheme", "light");
        //currentTheme="dark"
    }

})

fetch("lang.json")
.then(response=>response.json())
.then(data=>{
    const language=localStorage.getItem("language") || "en";
    applyLanguage(data,language);
    document.getElementById("language-select").value=language;
    document.getElementById("language-select").addEventListener("change",(event)=>{
        const selectedLanguage=event.target.value;
        applyLanguage(data,selectedLanguage);
        localStorage.setItem("language",selectedLanguage);
    });
});

function applyLanguage(data,language){
    const elements={
        title: "title",
        navHome: "#nav-home",
        navProducts: "#nav-products",
        navAbout: "#nav-about",
        welcomeMessage: ".hero h2",
        shopNow: ".hero .btn",
        aboutUsTitle: ".about h2",
        aboutUsText: ".about p",
        footerText: "footer p"
    };

    for(let key in elements){
       const element=document.querySelector(elements[key]);
       
       if(element){
        element.textContent=data[language][key];
       }
       
    }
}