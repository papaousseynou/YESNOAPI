// API
const API_ENDPOINT = 'https://yesno.wtf/api';
// SELECTION
const balleSelector = document.querySelector('#ball');
const buttonSelector = document.querySelector('#button');
const inputSelector = document.querySelector('#input');
const answerSelector = document.querySelector('#answer');
const errorSelector = document.querySelector('err');
// FLAGS
let isRequestInProgress = false;
/**
 * STEPS:
 *

 * 
 *

 *
 */
const setInRequestInProgress = value => {
    isRequestInProgress = value;
};

//  5. Optional: add loading/error states
const setDisableButtonState = isDisabling => {
    if (isDisabling) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }
};

// 3. Attach fetchAnswer to an event listener
//  4. Clear output after 3 seconds
const cleanupResponse = () => {
    setTimeout(() => {
        answerSelector.innerHTML = '';
        inputSelector.value = '';
        setInRequestInProgress(false);
        setDisableButtonState(false);
    }, 3000);
};

// 2. Output the API's response
const showAnswer = answer => {
    setTimeout(() => {
        answerSelector.innerHTML = `<p>${answer}</p>`;
        balleSelector.classList.remove('shake__ball');
        cleanupResponse();
    }, 1000);
};
// 1. Create a fetchAnswer function and call the API
const fetchAnswer = () => {
    setInRequestInProgress(true);
    setDisableButtonState(true);
    balleSelector.classList.add('shake__ball');

    fetch(API_ENDPOINT)
        .then(data => data.json())
        .then(data => showAnswer(data.answer));
};
const showError = () => {
    errorSelector.innerHTML = 'You need to type your question';
    setTimeout(() => {
        errorSelector.innerHTML = '';
    }, 3000);
};

const getAnswer = () => {
    if (!isRequestInProgress) return;
    if (!inputSelector.value) showError();
    fetchAnswer();
};

const handleKeyEnter = e => {
    if (e.keyCode === 13) {
        getAnswer();
    }
};
buttonSelector.addEventListener('click', getAnswer);
