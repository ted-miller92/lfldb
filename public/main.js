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

const deleteButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');

deleteButton.addEventListener('click', _ => {
    fetch('/libraries', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            address: '1600 Penn'
        })
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(response => {
        if (response === 'No library to delete') {
            messageDiv.textContent = 'No Library to delete';
        }else{
            window.location.reload(true);
        }
    })
})