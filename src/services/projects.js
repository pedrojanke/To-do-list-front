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
            const response = await fetch('https://to-do-list-backend-2009c1f75d6a.herokuapp.com/projects');
            
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
    fetch('https://to-do-list-backend-2009c1f75d6a.herokuapp.com/projects')
        .then(response => response.json())
        .then(projects => {
            const quadroBody = document.querySelector('.quadro-body');
            quadroBody.innerHTML = '';

            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'project';
                projectElement.textContent = project.name;

                const projectName = document.createElement('span');
                projectName.className = 'project-name';
                projectName.textContent = project.name;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Excluir';
                deleteBtn.className = 'delete-btnn';
                deleteBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    deleteProject(project.id, projectElement);
                });

                projectElement.appendChild(projectName);
                projectElement.appendChild(deleteBtn);

                projectElement.addEventListener('click', () => {
                    window.location.href = `projectsSelected.html?projectId=${project.id}`;
                });

                quadroBody.appendChild(projectElement);
            });
        })
        
        .catch(error => console.error('Erro ao carregar os projetos:', error));
}

function deleteProject(projectId, projectElement) {
    fetch(`https://to-do-list-backend-2009c1f75d6a.herokuapp.com/projects/${projectId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao excluir o projeto: ${response.statusText}`);
        }
        projectElement.remove();
        console.log('Projeto excluído com sucesso');
    })
    .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', loadProjects);
