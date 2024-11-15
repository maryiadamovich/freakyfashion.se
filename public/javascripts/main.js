document.getElementById('fetch-link').addEventListener('click', function(event) {
    event.preventDefault();
    fetchData();
});


const table = document.querySelector("tbody");

function fetchData() {
fetch("/admin/products/api/products")
    .then(resp => resp.json())
    .then(products => {
        console.log(products);
        const emptyElem = document.querySelector(".empty");
        emptyElem.parentNode.removeChild(emptyElem);
        products.forEach(element => {
            const tr = document.createElement("tr");
            for (let x in element) {
                let td = document.createElement("td");
                td.textContent = element[x];
                tr.appendChild(td);
            };
            table.appendChild(tr);
        })

    })
    .catch(console.error);
}
