const formNumberCookie = 'formMaxCount';
const numberFormId = 'number-form';
const numberFormBlockId = 'number-form-block';


function swapBlockContent (block1Selector, block2Selector) {
    const block1 = document.querySelector(block1Selector);
    const block2 = document.querySelector(block2Selector);
    const block1Html = block1.innerHTML;
    block1.innerHTML = block2.innerHTML;
    block2.innerHTML = block1Html;
}

function triangleArea (a, b, c) {
    const p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

function addTriangleArea () {
    const sideA = 3, sideB = 4, sideC = 5;
    const block3 = document.querySelector('#block-3');
    const area = triangleArea(sideA, sideB, sideC);
    block3.append(area);
}

function checkCookies () {
    const maxCount = getCookie(formNumberCookie);
    if (maxCount) {
        if (confirm(`Кількість найбільших чисел: ${maxCount}\nХочете видалити результат з cookies?`)) {
            deleteCookie(formNumberCookie);
            alert("Cookies видалено");
            window.location.reload();
        } else {
            document.getElementById(numberFormBlockId).remove();
        }
    } else {
        renderNumberForm();
    }
}

function getCookie (name) {
    const regex = new RegExp(`(?:;\s|^)${name}=([^;]*)`);
    return document.cookie.match(regex)?.at(1) ?? null;
}

function setCookie (name, value) {
    document.cookie = `${name}=${value}`;
}

function deleteCookie (name) {
    document.cookie = `${name}=; Max-Age=0`;
}

function renderNumberForm () {
    const formBlock = document.getElementById('number-form-block');
    const form = document.createElement('form');
    formBlock.innerHTML = '';
    form.id = numberFormId;
    form.className = 'number-form';
    for (let i = 1; i <= 10; i++) {
        const numberInput = document.createElement('input');
        numberInput.className = 'form-number-input';
        numberInput.type = 'number';
        numberInput.placeholder = `Number ${i}`;
        form.appendChild(numberInput);
    }
    formBlock.appendChild(form);
    const calcButton = document.createElement('button');
    calcButton.textContent = 'Порахувати кількість найбільших';
    calcButton.addEventListener('click', calculateMaxNumberCount)
    formBlock.appendChild(calcButton);
}

function calculateMaxNumberCount () {
    const form = document.getElementById(numberFormId);
    let maxNum = -Infinity, maxCount = 0;
    for (let i = 0; i < form.children.length; i++) {
        const input = form.children[i];
        if (input.value !== '') {
            const number = +input.value;
            if (number > maxNum) {
                maxNum = number;
                maxCount = 1;
            } else if (number === maxNum) {
                maxCount++;
            }
        }
    }
    setCookie(formNumberCookie, maxCount);
    alert(`Кількість найбільших чисел: ${maxCount}`);
}

const block6 = document.querySelector('#block-6');
function setBlock6Bold () {
    if (block6.style.fontWeight !== 'bold') {
        block6.style.fontWeight = 'bold';
    }
}

function adjustBlock6Boldness () {
    const propertyName = 'block6Bold';
    const isBold = localStorage.getItem(propertyName) === 'true';
    if (isBold) {
        setBlock6Bold();
        window.addEventListener('scroll', setBlock6Bold);
    }
    const radio = document.getElementById('block-6-radio');
    radio.checked = isBold;
    radio.addEventListener('change', (ev) => {
        if (ev.target.checked) {
            localStorage.setItem(propertyName, true);
            window.addEventListener('scroll', setBlock6Bold);
        }
    })
}

function addBlockEditors () {
    for (let i = 1; i <= 7; i++) {
        const block = document.getElementById(`block-${i}`);
        const blockSelects = block.querySelectorAll('.list-editor-select');
        blockSelects.forEach((select) =>
            select.addEventListener('select', () => blockToListEditor(i))
        );
    }
}

function blockToListEditor (blockNumber) {
    const block = document.getElementById(`block-${blockNumber}`);
    block.classList.add('list-editor');
    block.innerHTML = `
        <h2>Створення списку</h2>
        <h3>Зберегти до localStorage</h3>
        <button>Зберегти</button>
        <h3>Додати Елемент:</h3>
        <input class="list-editor-input" type="text" placeholder="Новий елемент">
        <button>Додати</button>
        <h3>Список:</h3>
        <ul class="custom-list"></ul>
    `;
    const saveToStorage = block.children[2];
    const input = block.children[4];
    const addItemButton = block.children[5];
    const list = block.children[7];
    const itemsContent = [];
    addItemButton.addEventListener('click', () => {
        if (input.value !== '') {
            const item = document.createElement('li');
            item.className = 'custom-list-item';
            item.innerHTML = input.value;
            list.appendChild(item);
            itemsContent.push(input.value);
        }
    });
    saveToStorage.addEventListener('click', () => {
        if (itemsContent.length) {
            localStorage.setItem(`block${blockNumber}List`, JSON.stringify(itemsContent));
            alert(`Список для блоку ${blockNumber} успішно збережено\nЩоб побачити його, оновіть сторінку`);
        } else {
            alert('Пустий список не збережено');
        }
    });
}

function checkLocalStorage () {
    for (let i = 1; i <= 7; i++) {
        const itemsString = localStorage.getItem(`block${i}List`);
        const blockItems = JSON.parse(itemsString);
        if (blockItems) {
            blockToList(i, blockItems);
        }
    }
}

function blockToList (blockNumber, items) {
    const block = document.getElementById(`block-${blockNumber}`);
    block.classList.add('custom-list-block');
    block.innerHTML = '';
    const list = document.createElement('ul');
    list.className = 'custom-list';
    items.forEach((item) => {
       const li = document.createElement('li');
       li.className = 'custom-list-item';
       li.innerHTML = item;
       list.appendChild(li);
    });
    block.appendChild(list);
}

function clearStorageButton () {
    const button = document.getElementById('clear-storage-button');
    button.addEventListener('click', () => {
        localStorage.clear();
        alert('Local Storage очищено');
    });
}


window.onload = () => {
    // Task 3
    checkCookies();
    // Task 1
    swapBlockContent('#block-4', '#block-5');
    // Task 5
    checkLocalStorage();
    addBlockEditors();
    // Task 2
    addTriangleArea();
    // Task 4
    adjustBlock6Boldness();
    // Utility
    clearStorageButton();
}
