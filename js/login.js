$(document).ready(function () {
    $('#formLogin').submit(function (e) {
        e.preventDefault();

        const email = $('#loginEmail').val().trim();
        const senha = $('#loginSenha').val().trim();
        const $msg = $('#msgLogin');

        $msg.text('').removeClass('success error');

        if (!email || !senha) {
            $msg.text('Preencha todos os campos').addClass('error');
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

        if (usuarioEncontrado) {
            $msg.text('Login efetuado com sucesso!').addClass('success');
            localStorage.setItem('usuarioLogado', usuarioEncontrado.email);
            localStorage.setItem('cargoUsuario', usuarioEncontrado.cargo || '');

            setTimeout(() => {
                if (usuarioEncontrado.email === 'amanda@hotmail.com') {
                    window.location.href = 'funcionario.html';
                } else if (usuarioEncontrado.email === 'gabriel@hotmail.com') {
                    window.location.href = 'supervisor.html';
                } else if (usuarioEncontrado.email === 'maria@hotmail.com') {
                    window.location.href = 'index.html';
                } else {
                    window.location.href = 'erro.html';
                }
            }, 1500);
        } else {
            $msg.text('E-mail ou senha inválidos').addClass('error');
        }
    });
});
