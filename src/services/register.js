document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message') || createMessageDiv();

    try {
        const response = await fetch('https://to-do-list-backend-2009c1f75d6a.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Conta criada com sucesso:', data);
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Conta criada com sucesso! Redirecionando para o login...';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500); 
        } else {
            const error = await response.json();
            messageDiv.style.display = 'block';
            messageDiv.style.color = 'red';
            messageDiv.textContent = `Erro ao criar conta: ${error.message || 'Tente novamente mais tarde.'}`;
        }
    } catch (error) {
        messageDiv.style.display = 'block';
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Erro ao tentar criar conta. Tente novamente mais tarde.';
        console.error('Erro ao criar conta:', error);
    }
});

function createMessageDiv() {
    const messageDiv = document.createElement('div');
    messageDiv.id = 'message';
    messageDiv.style.marginTop = '15px';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.fontSize = '16px';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.textAlign = 'center';
    document.querySelector('.register-box').appendChild(messageDiv);
    return messageDiv;
}
