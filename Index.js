function sendToDiscord() {
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();

    // Verifica se todos os campos foram preenchidos
    if (!name || !email || !message) {
        $('#response').text('Por favor, preencha todos os campos.').addClass('error').fadeIn();
        setTimeout(function(){
            $('#response').fadeOut();
        }, 5000);
        return;
    }

    // Monta a mensagem a ser enviada para o Discord
    var discordMessage = 'Nome: ' + name + '\n';
    discordMessage += 'E-mail: ' + email + '\n\n';
    discordMessage += 'Mensagem:\n' + message;

    // URL do Webhook do Discord
    var webhookUrl = 'https://discord.com/api/webhooks/1222341033048932434/oUUp8P2JIKzF3ClhOmXL09KdJaIZlhS9y8tQ6TscQ30LEMj9Wh6Z18S78Td2sIvIo_J8';

    // Enviar mensagem para o Discord via Webhook
    $.ajax({
        type: "POST",
        url: webhookUrl,
        data: JSON.stringify({ content: discordMessage }),
        contentType: "application/json",
        success: function(response) {
            $('#response').text('Mensagem enviada com sucesso!').addClass('success').fadeIn();
            setTimeout(function(){
                $('#response').fadeOut();
            }, 5000);
        },
        error: function(xhr, status, error) {
            $('#response').text('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.').addClass('error').fadeIn();
            setTimeout(function(){
                $('#response').fadeOut();
            }, 5000);
        }
    });
}
