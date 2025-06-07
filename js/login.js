$(document).ready(function () {
    $('#formLogin').submit(function (e) {
        e.preventDefault();

        const email = $('#loginEmail').val().trim();
        const senha = $('#loginSenha').val().trim();
        const $msg = $('#msgLogin');

        // Limpa mensagem anterior
        $msg.text('').removeClass('success error');

        if (!email || !senha) {
            $msg.text('Preencha todos os campos').addClass('error');
            return;
        }

        // Simula autenticação básica (troque isso por chamada real de API)
        if (email === 'maria@hotmail.com' && senha === 'maria123') {
            $msg.text('Login efetuado com sucesso!').addClass('success');

            // Salva o login no localStorage (pode ser usado em outras páginas)
            localStorage.setItem('usuarioLogado', email);

            // Redireciona após 1.5 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            $msg.text('E-mail ou senha inválidos').addClass('error');
        }
    });
});
