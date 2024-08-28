document.addEventListener('DOMContentLoaded', () => {
    const projectName = localStorage.getItem('selectedProject');

    if (projectName) {
        const quadroHeader = document.querySelector('.quadro-header h2');
        quadroHeader.textContent = projectName;
    }
});
