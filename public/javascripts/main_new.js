
document.querySelector('#forma')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        fetchDataPost(event);
    });

function fetchDataPost(event) {
    const forma = new FormData(event.target);
    const product = {
        name: forma.get('name'),
        description: forma.get('description'),
        photo: forma.get('photo'),
        lable: forma.get('märke'),
        sku: forma.get('sku'),
        price: forma.get('price')
    }

    fetch("/admin/products/api/products", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
        .catch(console.error);

}