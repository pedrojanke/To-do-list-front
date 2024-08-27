document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // Verifica se os campos estão preenchidos
    if (!email || !password) {
        messageDiv.style.display = 'block';
        messageDiv.textContent = 'Por favor, preencha todos os campos.';
        messageDiv.className = 'message-box error';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 1000);
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const users = await response.json();

            if (users.length > 0) {
                const user = users.find(user => user.email === email);

                if (user && user.password === password) {
                    localStorage.setItem('username', user.name); // Armazena o nome do usuário
                    messageDiv.style.display = 'block';
                    messageDiv.textContent = 'Login bem-sucedido!';
                    messageDiv.className = 'message-box success';

                    setTimeout(() => {
                        window.location.href = 'principal.html';
                    }, 1000);
                } else {
                    messageDiv.style.display = 'block';
                    messageDiv.textContent = 'Senha inválida.';
                    messageDiv.className = 'message-box error';
                    setTimeout(() => {
                        messageDiv.style.display = 'none';
                    }, 1000);
                }
            } else {
                messageDiv.style.display = 'block';
                messageDiv.textContent = 'Usuário não encontrado.';
                messageDiv.className = 'message-box error';
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 1000);
            }
        } else {
            messageDiv.style.display = 'block';
            messageDiv.textContent = 'Erro ao tentar fazer login. Tente novamente mais tarde.';
            messageDiv.className = 'message-box error';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 1000);
        }
    } catch (error) {
        messageDiv.style.display = 'block';
        messageDiv.textContent = 'Erro ao tentar fazer login. Tente novamente mais tarde.';
        messageDiv.className = 'message-box error';
        console.error('Erro ao tentar fazer login:', error);
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 1000);
    }
});
