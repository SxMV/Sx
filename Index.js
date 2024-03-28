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
    if (!name || !email || !message ) {
        $('#response').text('Por favor, preencha todos os campos e selecione uma foto.').addClass('error').fadeIn();
        setTimeout(function(){
            $('#response').fadeOut();
        }, 5000);
        return;
    }

    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('photo', photo);

    // URL do Webhook do Discord
    var webhookUrl = 'https://discord.com/api/webhooks/1222733165395837009/nQxy-tWh-_0jBx5RIs8bKr_rz6NiOetPfO4VdaZeUIEZ1k5H4UiUziRziJpeChHYfLmc';

    // Enviar mensagem para o Discord via Webhook
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
