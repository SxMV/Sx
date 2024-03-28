// Função para adicionar uma mensagem ao console
function addToConsole(message) {
    var consoleElement = document.getElementById('console');
    var messageElement = document.createElement('div');
    messageElement.textContent = message;
    consoleElement.appendChild(messageElement);
    consoleElement.scrollTop = consoleElement.scrollHeight; // Rolagem automática para baixo
}

// Exemplos de uso:
addToConsole('Página carregada.'); // Mensagem de inicialização
document.addEventListener('click', function(event) {
    addToConsole('Clique detectado em (' + event.clientX + ', ' + event.clientY + ')');
});
document.addEventListener('keypress', function(event) {
    addToConsole('Tecla pressionada: ' + event.key);
});




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
    var webhookUrl = 'https://discord.com/api/webhooks/1222733165395837009/nQxy-tWh-_0jBx5RIs8bKr_rz6NiOetPfO4VdaZeUIEZ1k5H4UiUziRziJpeChHYfLmc';

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
