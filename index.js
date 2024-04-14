const lista = document.querySelector("#lista")
const botones = document.querySelectorAll(".btn-header")
const search = document.getElementById("busqueda")
const toggleNavBtn = document.querySelector(".toggle-nav-btn");
const nav = document.querySelector(".nav");
const flecha = document.getElementById("flecha");
const volver = document.getElementById("volver");

search.value = "";
let URL = "https://pokeapi.co/api/v2/pokemon/"
const requests = [];
const poke = [];
for (let i = 1; i <= 151; i++) {
    requests.push(fetch(URL + i).then((response) => response.json()));

}

Promise.all(requests)
    .then((responses) => {
        responses.sort((a, b) => a.id - b.id);
        responses.forEach(data => {
            mostrar(data);
            poke.push(data);
        });
    });


function mostrar(data) {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
                <div class="imagen">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="">
                </div>
                <div class="info">                
                    <p class="id">#${data.id}</p>
                    <p class="nombre">${data.name}</p>
                    <div class="tipos"> 
                        <p class="tipo" id="${data.types[0].type.name}">${data.types[0].type.name}</p>  
                        ${data.types[1] ? `<p class="tipo" id="${data.types[1].type.name}">${data.types[1].type.name}</p>` : ''}   
                    </div>               
                </div>
    `;
    lista.append(div);
}
botones.forEach(boton => boton.addEventListener("click", (event) => {
    const botonID = event.currentTarget.id;
    lista.innerHTML = '';
    search.value="";
    poke.forEach(data => {
        let tipo_lista = data.types.length == 2 ?botonID == data.types[0].type.name || botonID == data.types[1].type.name: botonID == data.types[0].type.name;        
        if (tipo_lista || botonID=="ver-todos") {
            mostrar(data);            
        }        
    })

}))
search.addEventListener("input",function(){
    let text = search.value.toLowerCase();
    lista.innerHTML = ''
    poke.forEach(data => {
        if (data.name.includes(text)) {
            mostrar(data);            
        }        
    })
})
toggleNavBtn.addEventListener("click", function() {    
    nav.classList.toggle("active");   
    flecha.classList.toggle("active");
});
window.addEventListener("scroll",function() {
    if (window.scrollY > 20 || document.documentElement.scrollTop > 20) {
      volver.classList.add('show');
    } else {
      volver.classList.remove('show');
    }
  })
  volver.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });    
  });
