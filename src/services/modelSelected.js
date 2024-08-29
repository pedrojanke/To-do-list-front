document.addEventListener('DOMContentLoaded', () => {
    const newItemBtn = document.querySelector('.new-item-btn');
    const container = document.querySelector('.container');

    newItemBtn.addEventListener('click', () => {
        loadNewItemForm();
    });

    function submitNewItem(event) {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const newItem = {
            name: itemName,
            checked: false,
            model_id: new URLSearchParams(window.location.search).get('modelId')
        };

        fetch(`http://localhost:3000/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem)
        })
        .then(response => {
            if (response.ok) {
                alert('Item criado com sucesso!');
                document.getElementById('new-item-form').classList.add('hidden');
            } else {
                alert('Erro ao criar o item. Tente novamente.');
            }
        })
        .catch(error => console.error('Erro ao enviar o modelo:', error));
    }

    function loadNewItemForm() {
        fetch('newItem.html')
            .then(response => response.text())
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const formDiv = tempDiv.querySelector('#new-item-form');
                container.appendChild(formDiv);
                formDiv.classList.remove('hidden');
                
                const modelForm = document.getElementById('item-form');
                modelForm.addEventListener('submit', submitNewItem);

                const cancelBtn = document.getElementById('cancel-btn');
                cancelBtn.addEventListener('click', () => {
                    formDiv.classList.add('hidden');
                });
            })
            .catch(error => console.error('Erro ao carregar o formulário:', error));
    }
});

function checkItem(itemId) {
    fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked: true }),
    })
    .then(response => {
        if (response.ok) {
            alert('Item marcado como concluído!');
        } else {
            alert('Erro ao marcar o item como concluído. Tente novamente.');
        }
    })
    .catch(error => console.error('Erro ao marcar item como concluído:', error));
}

function uncheckItem(itemId) {
    fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked: false }),
    })
    .then(response => {
        if (response.ok) {
            alert('Item desmarcado!');
        } else {
            alert('Erro ao desmarcar o item. Tente novamente.');
        }
    })
    .catch(error => console.error('Erro ao marcar item como concluído:', error));
}

function loadModelById() {
    const modelId = new URLSearchParams(window.location.search).get('modelId');
    fetch(`http://localhost:3000/models/${modelId}`)
        .then(response => response.json())
        .then(model => {
            const quadroBody = document.querySelector('.quadro-bodytwo');
            quadroBody.innerHTML = '';

            const titleModel = document.querySelector('body > div > main > section > div > div.quadro > div.quadro-header > h2');
            titleModel.textContent = model.name;

            model.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'item';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'checkbox';

                checkbox.checked = item.checked;

                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        checkItem(item.id);
                    } else {
                        uncheckItem(item.id);
                    }
                });

                const itemName = document.createElement('span');
                itemName.textContent = item.name;

                itemElement.appendChild(checkbox);
                itemElement.appendChild(itemName);

                quadroBody.appendChild(itemElement);
            });
        })
        .catch(error => console.error('Erro ao carregar os itens:', error));
}

document.addEventListener('DOMContentLoaded', loadModelById);