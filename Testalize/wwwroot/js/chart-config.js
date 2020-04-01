GetChatConfig = function () {
    return {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Ganhos',
                data: [],
                borderWidth: 1,
                borderColor: '#cd9794',
                backgroundColor: '#cd9794',
                fill: false
            },
            {
                label: 'Perdas',
                data: [],
                borderWidth: 1,
                borderColor: '#303c50',
                backgroundColor: '#303c50',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 3,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };
};