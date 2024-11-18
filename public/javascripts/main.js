
const table = document.querySelector("tbody");

document.getElementById('fetch-link')
    .addEventListener('click', function (event) {
        event.preventDefault();
        fetchDataGet();
    });

function fetchDataGet() {
    fetch("/admin/products/api/products")
        .then(resp => resp.json())
        .then(products => {
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
