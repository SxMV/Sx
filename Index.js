$(document).ready(function() {
    // Verificar se o usuário já aceitou os cookies
    var cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
        $('#cookieBanner').show();
    } else {
        $('#cookieBanner').hide(); // Oculta a mensagem de cookie se já foi aceita
        collectUserData(); // Coletar automaticamente os dados do usuário ao aceitar os cookies
        $('#supportFormWrapper').show();
    }
});

$('#acceptCookies').click(function() {
    $('#cookieBanner').hide();
    localStorage.setItem('cookiesAccepted', true);
    collectUserData(); // Coletar automaticamente os dados do usuário ao aceitar os cookies
    $('#supportFormWrapper').show();
});

$('#rejectCookies').click(function() {
    $('#cookieBanner').hide();
    localStorage.setItem('cookiesRejected', true);
    // Aqui você pode adicionar um código para lidar com a rejeição dos cookies
});

function collectUserData() {
    // Coletar automaticamente os dados do usuário (IP, dispositivo, hora, etc.)
    var ipAddress = 'IP_DO_USUÁRIO'; // Aqui você pode usar um serviço para obter o IP do usuário
    var userAgent = navigator.userAgent;
    var currentTime = new Date().toLocaleString();

    // Aqui você pode enviar os dados coletados para onde desejar (por exemplo, para o Discord)
    var userDataMessage = "Dados do usuário:\n\n";
    userDataMessage += "Endereço IP: " + ipAddress + "\n";
    userDataMessage += "Agente do usuário: " + userAgent + "\n";
    userDataMessage += "Hora atual: " + currentTime + "\n";

    // Exemplo de envio dos dados para o Discord
    var webhookUrl = 'https://discord.com/api/webhooks/1222341033048932434/oUUp8P2JIKzF3ClhOmXL09KdJaIZlhS9y8tQ6TscQ30LEMj9Wh6Z18S78Td2sIvIo_J8';
    $.ajax({
        type: "POST",
        url: webhookUrl,
        data: JSON.stringify({ content: userDataMessage }),
        contentType: "application/json",
        success: function(response) {
            console.log('Dados do usuário enviados com sucesso.');
        },
        error: function(xhr, status, error) {
            console.error('Erro ao enviar dados do usuário:', error);
        }
    });
}

function sendToDiscord() {
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();

    // Verifica se todos os campos foram preenchidos
    if (!name || !email || !message) {
        $('#response').html('<span class="error">&#10060;</span> Por favor, preencha todos os campos.').addClass('error').fadeIn();
        setTimeout(function(){
            $('#response').fadeOut();
        }, 5000);
        return;
    }

    // Monta a mensagem a ser enviada para o Discord
    var discordMessage = "Nova mensagem de suporte ao cliente\n\n";
    discordMessage += "Nome: " + name + "\n";
    discordMessage += "E-mail: " + email + "\n";
    discordMessage += "Mensagem: " + message + "\n";

    // URL do Webhook do Discord
    var webhookUrl = 'https://discord.com/api/webhooks/1222341020625145976/GDWz-8JaJuxbRdoA6CgVRU8Pt9z4MGEhx-_wV7JtyX2mLFAxJQSDcJZjv4UjbfkqjH1F';

    // Enviar mensagem para o Discord via Webhook
    $.ajax({
        type: "POST",
        url: webhookUrl,
        data: JSON.stringify({ content: discordMessage }),
        contentType: "application/json",
        success: function(response) {
            $('#response').html('<span class="success">&#10004;</span> Mensagem enviada com sucesso').addClass('success').fadeIn();
            setTimeout(function(){
                $('#response').fadeOut();
            }, 5000);
        },
        error: function(xhr, status, error) {
            $('#response').html('<span class="error">&#10060;</span> Erro ao enviar mensagem. Por favor, tente novamente mais tarde.').addClass('error').fadeIn();
            setTimeout(function(){
                $('#response').fadeOut();
            }, 5000);
        }
    });
}