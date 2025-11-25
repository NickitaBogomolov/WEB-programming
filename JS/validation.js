// Кто придумал преобразовывать пустую строку в ноль? isNaN('') -> false господи... И нафига в isNaN() засунули преобразование строки в число?     
export function validateInput(userInput) {
    if (userInput === null) {
        alert("Вы отменили ввод");
        return null;
    }

    const trimmedInput = userInput.trim();

    if (trimmedInput === '') {
        alert("Вы ввели пустую строку");
        return null;
    }

    if (isNaN(trimmedInput)) {
        alert("Вы ввели не число!");
        return null;
    }

    alert(`Вы ввели число: ${trimmedInput}`);
    return Number(trimmedInput);
}