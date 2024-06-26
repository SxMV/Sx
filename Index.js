// script.js

$(document).ready(function() {
    $('#submitBtn').click(function() {
        // Desativar o botão de envio para evitar envios múltiplos
        $(this).prop('disabled', true);

        // Iniciar temporizador de 2 minutos
        var timeout = setTimeout(function() {
            $('#response').text('Tempo limite excedido. Por favor, tente novamente.').addClass('error').fadeIn();
            $('#submitBtn').prop('disabled', false); // Reativar o botão de envio
        }, 120000); // 2 minutos em milissegundos

        // Enviar mensagem para o Discord
        sendToDiscord(timeout);
    });
});

function sendToDiscord(timeout) {
    var name = $('#name').val();
    var email = $('#email').val();
    var discordName = $('#discordName').val(); // Novo campo para o nome no Discord
    var message = $('#message').val();
    var photoInput = document.getElementById('photo');
    var photo = photoInput.files[0]; // Obter a foto selecionada pelo usuário

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !discordName || !message) { // Verificação adicionada para o novo campo
        $('#response').text('Por favor, preencha todos os campos.').addClass('error').fadeIn();
        $('#submitBtn').prop('disabled', false); // Reativar o botão de envio
        return; // Abortar o envio se algum campo estiver vazio
    }

    // Monta a mensagem a ser enviada para o Discord
    var discordMessage = 'Nome: ' + name + '\n';
    discordMessage += 'E-mail: ' + email + '\n';
    discordMessage += 'Nome no Discord: ' + discordName + '\n\n'; // Inclui o nome no Discord na mensagem
    discordMessage += 'Mensagem:\n' + message;

    // URL do Webhook do Discord
    var webhookUrl = 'https://discord.com/api/webhooks/1222733165395837009/nQxy-tWh-_0jBx5RIs8bKr_rz6NiOetPfO4VdaZeUIEZ1k5H4UiUziRziJpeChHYfLmc';

    // Enviar mensagem para o Discord via Webhook
    var formData = new FormData();
    formData.append('content', discordMessage); // Adicionar mensagem ao FormData

    if (photo) {
        formData.append('photo', photo); // Adicionar foto ao FormData, se existir
    }

    $.ajax({
        type: "POST",
        url: webhookUrl,
        data: formData,
        processData: false,  // Não processar os dados
        contentType: false,  // Não definir o tipo de conteúdo
        success: function(response) {
            clearTimeout(timeout); // Cancelar o temporizador
            $('#response').text('Mensagem enviada com sucesso para o Discord').addClass('success').fadeIn();
            setTimeout(function(){
                $('#response').fadeOut();
                $('#submitBtn').prop('disabled', false); // Reativar o botão de envio
            }, 5000);
        },
        error: function(xhr, status, error) {
            clearTimeout(timeout); // Cancelar o temporizador
            $('#response').text('Erro ao enviar mensagem para o Discord. Por favor, tente novamente mais tarde.').addClass('error').fadeIn();
            setTimeout(function(){
                $('#response').fadeOut();
                $('#submitBtn').prop('disabled', false); // Reativar o botão de envio
            }, 5000);
        }
    });
}
