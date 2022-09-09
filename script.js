// Capturing dom elements
const translateBtn = document.querySelector('.translate-btn');
const inputArea = document.getElementById('english-input');
const outputArea = document.querySelector('.minion-output');
const selectLanguage = document.getElementById('lang');

// constants
const API_URL = 'https://api.funtranslations.com/translate';

// Global variable
let LANGUAGE_SELECTED = 'yoda';

// Utility Functions
const createDOMNode = (typeOfNode, payload = '') => {
  let newNode = document.createElement(typeOfNode);
  newNode.innerHTML = payload;
  return newNode;
};

const createAPIUrl = (url, language, data) =>
  `${url}/${language}.json?text=${data}`;

const handleApiCall = (data, URL) => {
  let urlWithPayload = createAPIUrl(URL, LANGUAGE_SELECTED, data);
  fetch(urlWithPayload)
    .then((response) => response.json())
    .then((res) => {
      outputArea.innerHTML = '';
      if (res?.contents?.translated) {
        // set the response
        let result = res.contents.translated;
        let newNode = createDOMNode('p', result);
        outputArea.append(newNode);
      } else if (res?.error?.code) {
        // set error message
        let errorMessage = res.error.message;
        let newNode = createDOMNode('p', errorMessage);
        newNode.classList.add('error-message');
        outputArea.append(newNode);
      }
    });
};

const handleTranslate = () => {
  let inputValue = inputArea.value.trim();

  // add loading
  outputArea.innerHTML = '';
  const loader = createDOMNode('div');
  loader.classList.add('lds-dual-ring');
  outputArea.append(loader);

  // api call to get the result
  handleApiCall(inputValue, API_URL);
};

const loadEventListeners = () => {
  // value is stored in this var when we change the select option
  selectLanguage.addEventListener('change', (e) => {
    LANGUAGE_SELECTED = e.target.value;
  });

  // translate btn doing its magic here
  translateBtn.addEventListener('click', handleTranslate);
};

function App() {
  loadEventListeners();
}

App();
