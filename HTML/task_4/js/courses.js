// Функция для форматирования даты
function formatDate(date) {
    return date.toLocaleString('ru', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

async function getCurrencyRates() {
    try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        const data = await response.json();

        // Обновление даты
        document.getElementById('currency-date').textContent =
            `Обновлено: ${formatDate(new Date(data.Date))}`;

        // Очистка таблицы
        const tableBody = document.querySelector('#currency-table tbody');
        tableBody.innerHTML = '';

        const currencies = ['USD', 'EUR', 'CNY', 'GBP', 'JPY'];

        currencies.forEach(currency => {
            if (data.Valute[currency]) {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = `${currency} (${data.Valute[currency].Name})`;

                const rateCell = document.createElement('td');
                rateCell.textContent = data.Valute[currency].Value.toFixed(2);

                row.appendChild(nameCell);
                row.appendChild(rateCell);
                tableBody.appendChild(row);
            }
        });
    } catch (error) {
        document.querySelector('#currency-table tbody').innerHTML = `
                <tr><td colspan="2">Ошибка загрузки данных</td></tr>
            `;
        console.error('Ошибка получения курсов валют:', error);
    }
}

window.addEventListener('load', getCurrencyRates);