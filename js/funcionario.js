$(document).ready(function () {
    const API_URL = "http://localhost:4000/usuarios";

    let usuarioLogado = localStorage.getItem('usuarioLogado') || null;

    function mostrarUsuarioLogado() {
        if (usuarioLogado) {
            $("#usuarioLogado").html(`
                Seja bem-vindo(a), <strong>${usuarioLogado}</strong>!
                <button id="btnTrocarUsuario">Trocar Usuário</button>
                <button id="btnSair">Sair</button>
            `);
        } else {
            $("#usuarioLogado").html(`
                Você não está logado. 
                <button id="btnTrocarUsuario">Entrar</button>
            `);
        }
    }

    mostrarUsuarioLogado();

    $(document).on('click', '#btnTrocarUsuario', function () {
        localStorage.removeItem('usuarioLogado');
        usuarioLogado = null;
        mostrarUsuarioLogado();
        window.location.href = 'login.html';
    });

    $(document).on('click', '#btnSair', function () {
        localStorage.removeItem('usuarioLogado');
        usuarioLogado = null;
        mostrarUsuarioLogado();
        window.location.href = 'erro.html';
    });

    function listarUsuarios() {
        $.ajax({
            url: API_URL,
            method: "GET",
            dataType: "json",
            success: function (dados) {
                let tabela = "";

                const usuarioAtual = dados.find(u => u.email === usuarioLogado);

                if (usuarioAtual) {
                    tabela += `
                        <tr>
                            <td>${usuarioAtual.name}</td>
                            <td>${usuarioAtual.email}</td>
                            <td>${usuarioAtual.cargo || ''}</td>
                            <td>
                                <button class="editar" data-id="${usuarioAtual.id}">Editar</button>
                            </td>
                        </tr>
                    `;
                } else {
                    tabela += `<tr><td colspan="4">Usuário não encontrado.</td></tr>`;
                }

                $("#ListaUsuarios").html(tabela);
            },
            error: function () {
                alert("Erro ao carregar usuários.");
            }
        });
    }

    listarUsuarios();

    $("#formUser").submit(function (e) {
        e.preventDefault();

        const id = $('#idUsuario').val();
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const cargo = $('#cargo').val().trim();

        if (!name || !email) {
            alert("Preencha nome e e-mail.");
            return;
        }

        const dadosUser = { name, email, cargo };

        if (id) {
            $.ajax({
                url: `${API_URL}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(dadosUser),
                success: function () {
                    $('#formUser')[0].reset();
                    $('#idUsuario').val('');
                    listarUsuarios();
                },
                error: function () {
                    alert("Erro ao atualizar usuário.");
                }
            });
        } else {
            // Bloqueia criação de novo usuário via frontend
            alert("Você não pode criar novos usuários.");
        }
    });

    $(document).on('click', '.editar', function () {
        const id = $(this).data("id");
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "GET",
            dataType: "json",
            success: function (usuario) {
                // Garante que o usuário só edita a si mesmo
                if (usuario.email === usuarioLogado) {
                    $('#idUsuario').val(usuario.id);
                    $('#name').val(usuario.name);
                    $('#email').val(usuario.email);
                    $('#cargo').val(usuario.cargo || '');
                } else {
                    alert("Você só pode editar seus próprios dados.");
                }
            },
            error: function () {
                alert("Erro ao carregar usuário.");
            }
        });
    });

});
