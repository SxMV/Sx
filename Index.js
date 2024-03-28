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

    // Verificar se todos os campos foram preenchidos
    if (!name || !email || !message || !photo) {
        $('#response').text('Por favor, preencha todos os campos e selecione uma foto.').addClass('error').fadeIn();
        setTimeout(function(){
            $('#response').fadeOut();
        }, 5000);
        return;
    }

    // Codificar a foto em Base64
    var reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = function () {
        var base64Photo = reader.result.split(',')[1]; // Remover o prefixo 'data:image/png;base64,'

        // Montar a mensagem a ser enviada para o Discord
        var discordMessage = 'Nome: ' + name + '\n';
        discordMessage += 'E-mail: ' + email + '\n\n';
        discordMessage += 'Mensagem:\n' + message + '\n\n';
        discordMessage += 'Foto:\n' + base64Photo;

        // URL do Webhook do Discord
        var webhookUrl = 'https://discord.com/api/webhooks/1222733165395837009/nQxy-tWh-_0jBx5RIs8bKr_rz6NiOetPfO4VdaZeUIEZ1k5H4UiUziRziJpeChHYfLmc';

        // Enviar mensagem para o Discord via Webhook
        $.ajax({
            type: "POST",
            url: webhookUrl,
            data: { content: discordMessage }, // Removido o JSON.stringify
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
    };
}
