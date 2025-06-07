$(document).ready(function () {
    const API_URL = "http://localhost:3000/usuarios";

    // Pega o usuário logado do localStorage ou usa 'Visitante'
    let usuarioLogado = localStorage.getItem('usuarioLogado') || null;

    // Função para mostrar o usuário logado e os botões
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

    // Evento para trocar usuário (apaga login e redireciona)
    $(document).on('click', '#btnTrocarUsuario', function () {
        localStorage.removeItem('usuarioLogado');
        usuarioLogado = null;
        mostrarUsuarioLogado();
        // Redireciona para a página de login (altere se for outra URL)
        window.location.href = 'login.html';
    });

    // Evento para sair (apaga login e redireciona)
    $(document).on('click', '#btnSair', function () {
        localStorage.removeItem('usuarioLogado');
        usuarioLogado = null;
        mostrarUsuarioLogado();
        window.location.href = 'index.html'; // Ou outra página inicial
    });

    // Função para listar usuários da API
    function listarUsuarios() {
        $.ajax({
            url: API_URL,
            method: "GET",
            dataType: "json",
            success: function (dados) {
                let tabela = "";
                dados.forEach(usuario => {
                    tabela += `
                        <tr>
                            <td>${usuario.name}</td>
                            <td>${usuario.email}</td>
                            <td>${usuario.cargo || ''}</td>
                            <td>
                                <button class="editar" data-id="${usuario.id}">Editar</button>
                                <button class="excluir" data-id="${usuario.id}">Excluir</button>
                            </td>
                        </tr>
                    `;
                });
                $("#ListaUsuarios").html(tabela);
            },
            error: function () {
                alert("Erro ao carregar usuários.");
            }
        });
    }

    listarUsuarios();

    // Salvar ou editar usuário
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
            // Editar usuário existente
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
            // Criar novo usuário
            $.ajax({
                url: API_URL,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(dadosUser),
                success: function () {
                    $('#formUser')[0].reset();
                    listarUsuarios();
                },
                error: function () {
                    alert("Erro ao cadastrar usuário.");
                }
            });
        }
    });

    // Excluir usuário
    $(document).on('click', '.excluir', function () {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

        const id = $(this).data("id");
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "DELETE",
            success: function () {
                listarUsuarios();
            },
            error: function () {
                alert("Erro ao excluir usuário.");
            }
        });
    });

    // Carregar dados do usuário para editar
    $(document).on('click', '.editar', function () {
        const id = $(this).data("id");
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "GET",
            dataType: "json",
            success: function (usuario) {
                $('#idUsuario').val(usuario.id);
                $('#name').val(usuario.name);
                $('#email').val(usuario.email);
                $('#cargo').val(usuario.cargo || '');
            },
            error: function () {
                alert("Erro ao carregar usuário.");
            }
        });
    });

});
