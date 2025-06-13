$(document).ready(function () {
    const API_URL = "http://localhost:4000/usuarios";

    // Pega usuário logado do localStorage
    let usuarioLogado = localStorage.getItem('usuarioLogado') || null;

    // Função para mostrar área do usuário logado e botões
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

    // Evento: Trocar usuário (logout e vai para login)
    $(document).on('click', '#btnTrocarUsuario', function () {
        localStorage.removeItem('usuarioLogado');
        usuarioLogado = null;
        mostrarUsuarioLogado();
        window.location.href = 'erro.html';
    });

    // Evento: Sair (logout e vai para página inicial)
    $(document).on('click', '#btnSair', function () {
        localStorage.removeItem('usuarioLogado');
        usuarioLogado = null;
        mostrarUsuarioLogado();
        window.location.href = 'index.html';
    });

    // Função para listar usuários
    function listarUsuarios() {
        $.ajax({
            url: API_URL,
            method: "GET",
            dataType: "json",
            success: function (dados) {
                let tabela = "";
                // Busca usuário logado nos dados para identificar cargo
                const usuarioAtual = dados.find(u => u.email === usuarioLogado);

                if (!usuarioAtual) {
                    $("#ListaUsuarios").html('<tr><td colspan="4">Usuário não encontrado.</td></tr>');
                    return;
                }

                // Se for supervisor, lista todos, mas só pode editar o próprio
                if (usuarioAtual.cargo && usuarioAtual.cargo.toLowerCase() === 'supervisor') {
                    dados.forEach(usuario => {
                        tabela += `
                            <tr>
                                <td>${usuario.name}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.cargo || ''}</td>
                                <td>
                                    ${usuario.email === usuarioLogado ? `<button class="editar" data-id="${usuario.id}">Editar</button>` : ''}
                                </td>
                            </tr>
                        `;
                    });
                } else {
                    // Se for outro cargo, mostra só ele mesmo
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
                }

                $("#ListaUsuarios").html(tabela);
            },
            error: function () {
                alert("Erro ao carregar usuários.");
            }
        });
    }

    listarUsuarios();

    // Formulário salvar/editar usuário
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

        // Confirma que só pode editar próprio usuário
        if (id) {
            if (email !== usuarioLogado) {
                alert("Você só pode editar seus próprios dados.");
                return;
            }

            $.ajax({
                url: `${API_URL}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(dadosUser),
                success: function () {
                    $('#formUser')[0].reset();
                    $('#idUsuario').val('');
                    listarUsuarios();
                    alert("Dados atualizados com sucesso.");
                },
                error: function () {
                    alert("Erro ao atualizar usuário.");
                }
            });
        } else {
            alert("Você não pode criar novos usuários.");
        }
    });

    // Excluir usuário (opcional - só supervisor pode excluir?)
    $(document).on('click', '.excluir', function () {
        const id = $(this).data("id");

        if (!id) return;

        // Só supervisor pode excluir (se quiser)
        // Para simplificar, bloqueio exclui pra todos aqui
        alert("Você não tem permissão para excluir usuários.");
        // Para liberar exclusão só para supervisor, adicione checagem do cargo

        // if (confirm("Tem certeza que deseja excluir este usuário?")) {
        //     $.ajax({
        //         url: `${API_URL}/${id}`,
        //         method: "DELETE",
        //         success: function () {
        //             listarUsuarios();
        //         },
        //         error: function () {
        //             alert("Erro ao excluir usuário.");
        //         }
        //     });
        // }
    });

    // Botão editar carrega dados no formulário
    $(document).on('click', '.editar', function () {
        const id = $(this).data("id");

        if (!id) return;

        $.ajax({
            url: `${API_URL}/${id}`,
            method: "GET",
            dataType: "json",
            success: function (usuario) {
                if (usuario.email !== usuarioLogado) {
                    alert("Você só pode editar seus próprios dados.");
                    return;
                }
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
