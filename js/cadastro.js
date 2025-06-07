$(document).ready(function () {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        const nome = $('#nome').val().trim();
        const email = $('#cadastroEmail').val().trim();
        const senha = $('#cadastroSenha').val().trim();
        const cargo = $('#cargo').val();
        const $msg = $('#msgCadastro');

        $msg.text('').removeClass('success error');

        if (!nome || !email || !senha || !cargo) {
            $msg.text('Preencha todos os campos corretamente.').addClass('error');
            return;
        }

        // Simulação de sucesso no cadastro (aqui você pode fazer um POST real para seu backend)
        $msg.text('Cadastro realizado com sucesso! Redirecionando...').addClass('success');

        // Armazenar temporariamente (opcional - exemplo para futura autenticação)
        localStorage.setItem('usuarioCadastrado', JSON.stringify({ nome, email, senha, cargo }));

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
});
