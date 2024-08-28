document.addEventListener('DOMContentLoaded', () => {
    const sidebarContent = document.getElementById('projects-container');
    const showProjectsButton = document.getElementById('show-projects');

    if (!sidebarContent || !showProjectsButton) {
        console.error('Elemento(s) necessário(s) não encontrado(s) no DOM.');
        return;
    }

    showProjectsButton.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/projects');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const projects = await response.json();

            sidebarContent.innerHTML =
                projects.map(project => 
                    `<div class="project">${project.name}</div>`
                ).join('');
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
            sidebarContent.innerHTML = 'Erro ao carregar projetos';
        }
    });
});

function loadProjects() {
    fetch('http://localhost:3000/projects')
        .then(response => response.json())
        .then(projects => {
            const quadroBody = document.querySelector('.quadro-body');
            quadroBody.innerHTML = '';

            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'project';
                projectElement.textContent = project.name;

                projectElement.addEventListener('click', () => {
                    // Armazenar o nome do projeto no localStorage
                    localStorage.setItem('selectedProject', project.name);
                    window.location.href = `projectsSelected.html?project=${project.name}`;
                });

                quadroBody.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Erro ao carregar os projetos:', error));
}

// Certifique-se de chamar loadProjects no carregamento da página principal
document.addEventListener('DOMContentLoaded', loadProjects);
