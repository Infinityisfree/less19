window.addEventListener('load', function(){

    const display = document.getElementById('display');
    const operationButtons = document.getElementById('operation-panel');
    const panelDigitButtons = document.getElementById('digit-panel');

    let number = 0;
    let operation = '';
    let buffer = 0;

    panelDigitButtons.addEventListener('click', function(e){

        if ( IsButton(e) === false ) return;

        if (e.target.dataset.button === "clear") {
            DisplayClear();
            ResetAll();
            return;
        }

        if (e.target.dataset.button === "backspace") {
            number = Backspace(number);
            DisplayShow(number);
            return;
        }

        number = Concatenation(number, e.target.dataset.button);
        DisplayShow(number);
    })

    operationButtons.addEventListener('click', function(e){

        if ( IsButton(e) === false ) return;

        if (e.target.dataset.button === "=") {
            number = operation !== '' ? Calculate(buffer + operation + number)  : number;
            DisplayShow(number);
            return;
        }

        if (operation !== '') {
            number = Calculate(buffer + operation + number);
            DisplayShow(number);
        }

        operation = e.target.dataset.button;
        buffer = number;
        number = 0;
    })

    panelDigitButtons.addEventListener('mousedown', (e) => {
        if ( IsButton(e) === false ) return;
        e.target.classList.remove('hover');
        e.target.classList.add('down');
    });

    panelDigitButtons.addEventListener('mouseup', (e) => {
        if ( IsButton(e) === false ) return;
        e.target.classList.add('hover');
        e.target.classList.remove('down');
    });

    panelDigitButtons.addEventListener("mouseout", (e) => {
        if ( IsButton(e) === false ) return;
        e.target.classList.add('hover');
        e.target.classList.remove('down');
    });

    operationButtons.addEventListener('mousedown', (e) => {
        if ( IsButton(e) === false ) return;
        e.target.classList.remove('hover');
        e.target.classList.add('down');
    });

    operationButtons.addEventListener('mouseup', (e) => {
        if ( IsButton(e) === false ) return;
        e.target.classList.add('hover');
        e.target.classList.remove('down');
    });

    operationButtons.addEventListener("mouseout", (e) => {
        if ( IsButton(e) === false ) return;
        e.target.classList.add('hover');
        e.target.classList.remove('down');
    });

    /* 
    *  Функция удаления последнего символа. Возвращает "0", если число состояло из одного символа или возвращает число без последнего символа (785 -> 78).
    *  Функция ожидает на вход строку символов. Пришедший аргумент конвертируется в число для удаления впереди стоящих нулей, если таковые имели место,
    *  затем, конвертируется в строку для работы с ним, как с массивом.
    */
    function Backspace(number) {
        let typeNumber = Number(number);
        if (typeNumber.toString().length < 2) return '0';
        return Number(typeNumber.toString().slice(0, -1));
    }

    /* 
    *  Функция проверки, что клик был осуществлен именно по кнопке. Путем проверки наличия атрибута "data-button" у элемента DOM-дерева.
    *  Функция ожидает на вход объект события и возвращает результат проверки в качестве булевого значения true либо false.
    */
    function IsButton(e) {
        return e.target.hasAttribute('data-button');
    }

    /* 
    *  Функция очистки экрана. Устанавливает "0" в качестве отображения по умолчанию. 
    */
    function DisplayClear() {
        display.innerText = 0;
    }

    /* 
    *  Функция отображения значения на экран. Ожидает на вход значение, необходимое для отображения. 
    */
    function DisplayShow(number) {
        display.innerText = Number(number);
    }

    /* 
    *  Функция сброса всех переменных к значениям по умолчанию. Удалят все текущие данные, хранящиеся в переменных. 
    */
    function ResetAll() {
        number = 0;
        operation = '';
        buffer = 0;
    }

    /* 
    *  Функция расчета результата. Принимает строку, в которой указана последовательность операндов и операторов, превращая эту строку в исполнительное выражение. 
    */
    function Calculate(executionStack) {
        return eval(executionStack);
    }

    /* 
    *  Функция добавления набираемых цифр. Принимает два параметра, первое - текущее значение числа, второе - введенная цифра. (7 + 8 -> 78)
    *  Для того чтобы это было именно обединение, а не арифметическая операция сложения, оба аргумента приводятся к типу "строка".
    */
    function Concatenation(number, currentNumber) {
        if (number.toString().length > 11) return Number(number);
        return Number(number.toString() + currentNumber.toString());
    }
})
