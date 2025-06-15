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
    // Remove tudo que não for dígito ou vírgula
    let value = input.value.replace(/[^\d,]/g, '');
    
    // Remove vírgulas extras, mantendo apenas a última
    const commaCount = value.split(',').length - 1;
    if (commaCount > 1) {
        const lastComma = value.lastIndexOf(',');
        value = value.substring(0, lastComma).replace(/,/g, '') + value.substring(lastComma);
    }
    
    // Se não tiver vírgula, formata como inteiro
    if (value.indexOf(',') === -1) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    } 
    // Se tiver vírgula, formata parte inteira e decimal
    else {
        let parts = value.split(',');
        parts[0] = parts[0].replace(/\D/g, '');
        parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        
        // Limita a 2 casas decimais
        if (parts[1]) {
            parts[1] = parts[1].replace(/\D/g, '').substring(0, 2);
        }
        
        value = parts.join(',');
    }
    
    input.value = value;
}

function formatarParaMoeda(valor) {
    return 'R$ ' + valor.toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+,)/g, '$1.');
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

// Função principal de cálculo
function enviarForm() {
    // Obter elementos dos inputs
    let nome = document.querySelector('.nome');
    let rg = document.querySelector('.rg');
    let cpf = document.querySelector('.cpf');
    let salario = document.querySelector('.salario');
    let valeTransporte = document.querySelector('.valeTransporte');

    // Converter valores para números (tratando campos vazios)
    const salarioNumerico = salario.value ? 
        parseFloat(salario.value.replace(/\./g, '').replace(',', '.')) : 0;
    
    const valeNumerico = valeTransporte.value ? 
        parseFloat(valeTransporte.value.replace(/\./g, '').replace(',', '.')) : 0;

    // Preencher dados básicos
    document.querySelector('.nomeSpan').textContent = nome.value;
    document.querySelector('.RGSpan').textContent = rg.value;
    document.querySelector('.CPFSpan').textContent = cpf.value;

    // Calcular e formatar valores
    const INSS = salarioNumerico * 0.08;
    const IR = salarioNumerico > 5000 ? salarioNumerico * 0.15 : 0;
    const salarioLiquido = (salarioNumerico - (INSS + IR)) + (valeNumerico || 0);

    // Exibir valores formatados
    document.querySelector('.SalarioBSpan').textContent = salario.value ? 
        'R$ ' + salario.value : 'R$ 0,00';
    
    document.querySelector('.INSSSpan').textContent = formatarParaMoeda(INSS);
    document.querySelector('.IRSpan').textContent = formatarParaMoeda(IR);
    document.querySelector('.ValeSpan').textContent = valeTransporte.value ? 
        'R$ ' + valeTransporte.value : 'R$ 0,00';
    document.querySelector('.SalarioLSpan').textContent = formatarParaMoeda(salarioLiquido);
}