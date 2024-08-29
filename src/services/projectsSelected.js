document.addEventListener('DOMContentLoaded', () => {
    const projectName = localStorage.getItem('selectedProject');
    const newModelBtn = document.querySelector('.new-model-btn');
    const container = document.querySelector('.container');

    newModelBtn.addEventListener('click', () => {
        loadNewModelForm();
    });

    if (projectName) {
        const quadroHeader = document.querySelector('.quadro-header h2');
        quadroHeader.textContent = projectName;
    }

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

        const projectName = localStorage.getItem('selectedProject');
        const modelName = document.getElementById('model-name').value;

        if (projectName && modelName) {
            const newModel = {
                name: modelName,
                projectName: projectName
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