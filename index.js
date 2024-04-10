const lista = document.querySelector("#lista")
let URL = "https://pokeapi.co/api/v2/pokemon/"
const requests = [];
for (let i = 1; i <= 151; i++) {
    requests.push(fetch(URL + i).then((response) => response.json()));

}
Promise.all(requests)
    .then((responses) => {
        responses.sort((a, b) => a.id - b.id);
        responses.forEach(data => mostrar(data));
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
