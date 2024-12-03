
document.getElementById('fetch-link')
    .addEventListener('click', function (event) {
        event.preventDefault();
        fetchDataGet();
    });

function fetchDataGet() {
    fetch("/admin/products/api/products")
        .then(resp => resp.json())
        .then(products => {
            const table = document.querySelector("table");
            const emptyElem = document.querySelector(".empty");
            if (emptyElem) {
                emptyElem.remove();
            } else {
                const rows = table.querySelectorAll('tr');
                for (let i = 1; i < rows.length; i++) {
                    rows[i].remove();
                }
            }
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
