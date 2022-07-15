(function ($) {
    $.fn.temporizador = function(opcoes) {
        const opcoesFinais = $.extend({
            mensagem: 'Em breve....',
            horario: '23:59:59'
        }, opcoes)
        
        const classDigito = '<span class="digito">'
        const classSeparador = '<span class="separador">'

        const horaDezena = $(`${classDigito}`).html('0')
        const horaUnidade = $(`${classDigito}`).html('0')
        const minutoDezena = $(`${classDigito}`).html('0')
        const minutoUnidade = $(`${classDigito}`).html('0')
        const segundoDezena = $(`${classDigito}`).html('0')
        const segundoUnidade = $(`${classDigito}`).html('0')

        const separadorHora = $(`${classSeparador}`).html(':')
        const separadorMinuto = $(`${classSeparador}`).html(':')
        const mensagem = $('<div class="mensagem">').html(opcoesFinais.mensagem)

        $(this).addClass('temporizador')
        $(this).append(horaDezena, horaUnidade, separadorHora,
            minutoDezena, minutoUnidade, separadorMinuto,
            segundoDezena, segundoUnidade, mensagem)

        const regex = new RegExp(/(\d\d):(\d\d):(\d\d)/)
        const horarioAlvo = regex.exec(opcoesFinais.horario)

        let temporizador = setInterval(() => {
            const agora = new Date()
            const alvo = new Date()
            alvo.setHours(horarioAlvo[1])
            alvo.setMinutes(horarioAlvo[2])
            alvo.setSeconds(horarioAlvo[3])

            const diferencaEmMili = alvo.getTime() - agora.getTime()
            if(diferencaEmMili >= 0) {
                const diferenca = regex.exec(new Date(diferencaEmMili).toISOString())
                
                horaDezena.html(diferenca[1][0])
                horaUnidade.html(diferenca[1][1])
                minutoDezena.html(diferenca[2][0])
                minutoUnidade.html(diferenca[2][1])
                segundoDezena.html(diferenca[3][0])
                segundoUnidade.html(diferenca[3][1])
            } else {
                clearInterval(temporizador)
            }
        }, 1000)
        
        return this
    }
})(jQuery)



