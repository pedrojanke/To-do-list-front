document.addEventListener('DOMContentLoaded', () => {
    const newModelBtn = document.querySelector('.new-model-btn');
    const container = document.querySelector('.container');

    newModelBtn.addEventListener('click', () => {
        loadNewModelForm();
    });

    function loadNewModelForm() {
        fetch('newModel.html')
            .then(response => response.text())
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const formDiv = tempDiv.querySelector('#new-model-form');
                container.appendChild(formDiv);
                formDiv.classList.remove('hidden');
                
                const modelForm = document.getElementById('model-form');
                modelForm.addEventListener('submit', submitNewModel);

                const cancelBtn = document.getElementById('cancel-btn');
                cancelBtn.addEventListener('click', () => {
                    formDiv.classList.add('hidden');
                });
            })
            .catch(error => console.error('Erro ao carregar o formulário:', error));
    }

    function submitNewModel(event) {
        event.preventDefault();

        const modelName = document.getElementById('model-name').value;
        const project_id = new URLSearchParams(window.location.search).get('projectId')


        if (modelName && project_id) {
            const newModel = {
                name: modelName,
                project_id
            };

            fetch('http://localhost:3000/models', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newModel)
            })
            .then(response => {
                if (response.ok) {
                    alert('Modelo criado com sucesso!');
                    document.getElementById('new-model-form').classList.add('hidden');
                    location.reload()
                } else {
                    alert('Erro ao criar o modelo. Tente novamente.');
                }
            })
            .catch(error => console.error('Erro ao enviar o modelo:', error));
        }
    }
});

function loadProjectById() {
    const projectId = new URLSearchParams(window.location.search).get('projectId');
    fetch(`http://localhost:3000/projects/${projectId}`)
        .then(response => response.json())
        .then(project => {
            const quadroBody = document.querySelector('.quadro-body');
            quadroBody.innerHTML = '';

            const quadroHeader = document.querySelector('.quadro-header h2');
            quadroHeader.textContent = project.name

            project.models.forEach(model => {
                const modelElement = document.createElement('div');
                modelElement.className = 'model';
                modelElement.textContent = model.name;

                modelElement.addEventListener('click', () => {
                    window.location.href = `modelSelected.html?modelId=${model.id}`;
                });

                quadroBody.appendChild(modelElement);
            });
        })
        .catch(error => console.error('Erro ao carregar os modelos:', error));
}

document.addEventListener('DOMContentLoaded', loadProjectById);