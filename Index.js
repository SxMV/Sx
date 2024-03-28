// script.js

$(document).ready(function() {
    $('#submitBtn').click(function() {
        sendToDiscord();
    });
});

function sendToDiscord() {
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();
    var photoInput = document.getElementById('photo');
    var photo = photoInput.files[0]; // Obter a foto selecionada pelo usuário

    // Monta a mensagem a ser enviada para o Discord
    var discordMessage = 'Nome: ' + name + '\n';
    discordMessage += 'E-mail: ' + email + '\n\n';
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
            $('#response').text('Mensagem enviada com sucesso para o Discord').addClass('success').fadeIn();
            setTimeout(function(){
                $('#response').fadeOut();
            }, 5000);
        },
        error: function(xhr, status, error) {
            $('#response').text('Erro ao enviar mensagem para o Discord. Por favor, tente novamente mais tarde.').addClass('error').fadeIn();
            setTimeout(function(){
                $('#response').fadeOut();
            }, 5000);
        }
    });
}
