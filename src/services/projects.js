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
