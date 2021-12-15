const update = document.querySelector('#update-button');

update.addEventListener('click', _ => {
    fetch('/libraries', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            address: '1600 Penn',
            neighborhood: 'Washington DC'
        })
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(response => {
        window.location.reload(true);
    })
})
