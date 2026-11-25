const form = document.getElementById('form-atleta');
const sucesso = document.getElementById('sucesso');
const sucessoTexto = document.getElementById('sucesso-texto');
const avisoPlano = document.getElementById('aviso-plano');
const cadastro = document.getElementById('cadastro');

const objetivos = { '5k': '5 km', '10k': '10 km', '21k': 'meia maratona', '42k': 'maratona' };

// Escolher plano -> vai para o cadastro com o plano já selecionado
document.querySelectorAll('.plano button').forEach(function (botao) {
    botao.addEventListener('click', function () {
        const plano = botao.closest('.plano').dataset.plano;
        document.getElementById('plano').value = plano;

        avisoPlano.textContent = 'Plano ' + plano + ' selecionado. Preencha seus dados abaixo.';
        avisoPlano.hidden = false;
        sucesso.hidden = true;

        cadastro.scrollIntoView({ behavior: 'smooth' });
        setTimeout(function () {
            document.getElementById('nome').focus({ preventScroll: true });
        }, 600);
    });
});

// Mostra ou limpa a mensagem de erro de um campo
function setErro(id, mensagem) {
    document.getElementById('erro-' + id).textContent = mensagem;
    document.getElementById(id).classList.toggle('invalido', mensagem !== '');
    return mensagem === '';
}

function validar() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const idade = Number(document.getElementById('idade').value);
    const nivel = document.getElementById('nivel').value;
    const objetivo = document.getElementById('objetivo').value;

    const resultados = [
        setErro('nome', nome.length < 2 ? 'Digite seu nome.' : ''),
        setErro('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Digite um e-mail válido.'),
        setErro('idade', idade >= 14 && idade <= 90 ? '' : 'Informe uma idade entre 14 e 90 anos.'),
        setErro('nivel', nivel ? '' : 'Escolha seu nível.'),
        setErro('objetivo', objetivo ? '' : 'Escolha seu objetivo.')
    ];
    return resultados.every(Boolean);
}

form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    if (!validar()) return;

    const nome = document.getElementById('nome').value.trim().split(' ')[0];
    const email = document.getElementById('email').value.trim();
    const objetivo = objetivos[document.getElementById('objetivo').value];
    const plano = document.getElementById('plano').value;

    sucessoTexto.textContent =
        'Parabéns, ' + nome + '! Seu cadastro no plano ' + plano + ' foi concluído. ' +
        'A planilha de treino para ' + objetivo + ' será enviada para ' + email +
        ' assim que você concluir o cadastro.';

    form.reset();
    avisoPlano.hidden = true;
    sucesso.hidden = false;
    sucesso.setAttribute('tabindex', '-1');
    sucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
    sucesso.focus({ preventScroll: true });
});
