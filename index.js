// Funções de formatação
function formatarRG(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.substring(0, 2) + '.' + value.substring(2);
    }
    if (value.length > 6) {
        value = value.substring(0, 6) + '.' + value.substring(6);
    }
    if (value.length > 10) {
        value = value.substring(0, 10) + '-' + value.substring(10, 11);
    }
    input.value = value;
}

function formatarCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 3) {
        value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
        value = value.substring(0, 7) + '.' + value.substring(7);
    }
    if (value.length > 11) {
        value = value.substring(0, 11) + '-' + value.substring(11, 13);
    }
    input.value = value;
}

function formatarMoeda(input) {
    let value = input.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2) + '';
    value = value.replace('.', ',');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    input.value = value;
}

// Adicionando os event listeners
document.addEventListener('DOMContentLoaded', function() {
    const rgInput = document.querySelector('.rg');
    const cpfInput = document.querySelector('.cpf');
    const salarioInput = document.querySelector('.salario');
    const valeTransporteInput = document.querySelector('.valeTransporte');

    rgInput.addEventListener('input', function() {
        formatarRG(this);
    });

    cpfInput.addEventListener('input', function() {
        formatarCPF(this);
    });

    salarioInput.addEventListener('input', function() {
        formatarMoeda(this);
    });

    valeTransporteInput.addEventListener('input', function() {
        formatarMoeda(this);
    });
});

// Atualizando a função enviarForm para lidar com os valores formatados
function enviarForm() {
    let nome = document.querySelector('.nome');
    let rg = document.querySelector('.rg');
    let cpf = document.querySelector('.cpf');
    let salario = document.querySelector('.salario');
    let valeTransporte = document.querySelector('.valeTransporte');

    // Removendo formatação para cálculos
    const salarioNumerico = parseFloat(salario.value.replace(/\./g, '').replace(',', '.'));
    const valeNumerico = parseFloat(valeTransporte.value.replace(/\./g, '').replace(',', '.'));

    let nomeSpan = document.querySelector('.nomeSpan');
    nomeSpan.textContent = nome.value;

    let RGSpan = document.querySelector('.RGSpan');
    RGSpan.textContent = rg.value;

    let CPFSpan = document.querySelector('.CPFSpan');
    CPFSpan.textContent = cpf.value;

    let SalarioBSpan = document.querySelector('.SalarioBSpan');
    SalarioBSpan.textContent = 'R$ ' + salario.value;

    let INSSSpan = document.querySelector('.INSSSpan');
    let INSS = salarioNumerico * 0.08;
    INSSSpan.textContent = 'R$ ' + INSS.toFixed(2).replace('.', ',');

    let IRSpan = document.querySelector('.IRSpan'); 
    let IR = 0;
    if (salarioNumerico > 5000) {
        IR = salarioNumerico * 0.15;
        IRSpan.textContent = 'R$ ' + IR.toFixed(2).replace('.', ',');
    } else {
        IRSpan.textContent = 'R$ 0,00';
    }

    let ValeSpan = document.querySelector('.ValeSpan');
    ValeSpan.textContent = 'R$ ' + valeTransporte.value;

    let SalarioLSpan = document.querySelector('.SalarioLSpan');
    const salarioLiquido = (salarioNumerico - (INSS + IR)) + (valeNumerico || 0);
    SalarioLSpan.textContent = 'R$ ' + salarioLiquido.toFixed(2).replace('.', ',');
}