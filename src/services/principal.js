document.addEventListener('DOMContentLoaded', () => {
    const newModelBtn = document.querySelector('.new-project-btn');
    const container = document.querySelector('.container'); // ou um outro container adequado

    newModelBtn.addEventListener('click', () => {
        loadNewProjectForm();
    });

    function loadNewProjectForm() {
        fetch('newProject.html')
            .then(response => response.text())
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const formDiv = tempDiv.querySelector('#new-project-form');
                container.appendChild(formDiv);
                formDiv.classList.remove('hidden');
                const cancelBtn = document.getElementById('cancel-btn');
                cancelBtn.addEventListener('click', () => {
                    formDiv.classList.add('hidden');
                });

                fetchTeams();
            })
            .catch(error => console.error('Erro ao carregar o formulário:', error));
    }

    function fetchTeams() {
        fetch('http://localhost:3000/teams')
            .then(response => response.json())
            .then(data => {
                const teamSelect = document.getElementById('team-select');
                teamSelect.innerHTML = '<option value="">Nenhum</option>';
                data.forEach(team => {
                    const option = document.createElement('option');
                    option.value = team.id;
                    option.textContent = team.name;
                    teamSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar times:', error));
    }

    document.addEventListener('submit', event => {
        if (event.target.id === 'project-form') {
            event.preventDefault();

            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            fetch('http://localhost:3000/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(result => {
                console.log('Projeto criado com sucesso:', result);
                const formDiv = document.querySelector('#new-project-form');
                formDiv.classList.add('hidden');
                location.reload()
            })
            .catch(error => console.error('Erro ao criar o projeto:', error));
        }
    });
});
