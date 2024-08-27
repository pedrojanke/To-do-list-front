document.addEventListener('DOMContentLoaded', () => {
    const teamsContainer = document.getElementById('teams-container');
    const showTeamsButton = document.getElementById('show-teams');

    if (!teamsContainer || !showTeamsButton) {
        console.error('Elemento(s) necessário(s) não encontrado(s) no DOM.');
        return;
    }

    showTeamsButton.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/teams');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const teams = await response.json();

            teamsContainer.innerHTML =
            teams.map(team => 
                `<div class="team">${team.name}</div>`
            ).join('');
        } catch (error) {
            console.error('Erro ao carregar times:', error);
            teamsContainer.innerHTML = 'Erro ao carregar grupos';
        }
    });
});
