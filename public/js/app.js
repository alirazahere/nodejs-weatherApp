$(document).ready(() => {
    $(document).on('submit', '#weatherForm', (e) => {
        e.preventDefault();
        $('#message-1').text('Loading...');
        $('#message-2').text('');
        let address = $('#input').val();
        fetch('/weather?address='+address).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    $('#message-1').text(data.error);
                }
                console.log(data);
                $('#message-1').text(data.address);
                $('#message-2').text(data.forcast.summary);
            })
        })
    })
})