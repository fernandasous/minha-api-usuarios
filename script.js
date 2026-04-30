const API_URL = "/users";

const alertbox = document.getElementById("alert");

    const showErr = (erro) => {
        alertbox.textContent = erro;
        alertbox.style.display = "block";
    }

    const hideErr = () => {
        alertbox.style.display = "none";
    }

    async function carregar() {
        try {
            const res = await fetch(API_URL);
            const dados = await res.json();
            console.log("Dados recebidos:", dados);
            const lista = document.getElementById('lista');
            lista.innerHTML = dados.map(u => `
                <div class="user-item">
                    <input type="checkbox" class="user-selector" value="${u.id}">
                    <strong>${u.nome}</strong>, ${u.idade} anos
                </div>
            `).join('');
        } catch (err) {
            console.error("Erro ao carregar:", err);
            showErr(err.message || "erro desconhecido no carregamento de users");
        }
    }

window.addEventListener('load', carregar);

// Função para inserir usuário
document.getElementById('formUser').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, idade })
    });

    const data = await res.json();
    console.log("Usuário criado:", data);

    if (!res.ok) {
        showErr(data.erro || "Erro ao cadastrar usuário.");
        return;
    }

    hideErr(); 
    if (data.token) {
        localStorage.setItem(`token_user_${data.id}`, data.token);
        console.log("Token salvo para usuário", data.id);
    }

    document.getElementById('formUser').reset();
    carregar();
});

document.getElementById('btnDelete').addEventListener('click', async () => {
    const selected = document.querySelectorAll('.user-selector:checked');

    if (selected.length === 0) {
        showErr("Selecione ao menos um registro para excluir.");
        return;
    }

    for (let cb of selected) {
        const id = cb.value;
        const token = localStorage.getItem(`token_user_${id}`);

        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': token }
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            showErr(errData.erro || "Erro ao excluir usuário.");
            return;
        }
    }

    hideErr();
    carregar();
});