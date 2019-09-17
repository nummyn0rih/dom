'use strict';

// Код валидации формы

function validateForm(obj) {

    if (obj.formId != 'profile') return;

    const profileForm = document.getElementById('profile');

    profileForm.addEventListener('focus', (event) => {
        if (event.target.nodeName != 'INPUT') return;
        event.target.className = '';
    }, true)

    profileForm.addEventListener('blur', (event) => {
        if (event.target.nodeName != 'INPUT') return;
        validation(event.target, event.target.dataset.validator);
    }, true);
    
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        for (let input of profileForm) {
            if (input.hasAttribute('data-required')) {
                if (input.value != '') continue;
                input.className = obj.inputErrorClass;
                profileForm.className = obj.formInvalidClass;
                input.blur();
                return;
            };
            if (input == document.activeElement) {
                validation(input, input.dataset.validator);
            };
            if (input.className == obj.inputErrorClass) {
                profileForm.className = obj.formInvalidClass;
                input.blur();
                return;
            };
        }
        profileForm.className = obj.formValidClass;
        document.activeElement.blur();
    })

    function validation(node, validator) {
        switch (validator) {
            case 'letters':
                if (!isLetters(node.value)) node.className = obj.inputErrorClass;
                break;
            case 'number': {
                if (!isNumber(node.value, node.dataset.validatorMin, 
                    node.dataset.validatorMax)) node.className = obj.inputErrorClass;
                break;
            }
            case 'regexp': {
                if (!isPhone(node.value, node.dataset.validatorPattern))
                    node.className = obj.inputErrorClass;
                break;
            }
        }
    }

    function isLetters(name) {
        return name.search(/^[a-zа-я]+$/ig) != -1;
    }

    function isNumber(num, min, max) {
        if (isNaN(num)) return;
        if (min == undefined && max == undefined) return true;
        if (+num >= +min && +num <= +max) return true;
    }
    
    function isPhone(phone, pattern) {
        if (phone == '') return true;
        return phone.search(pattern) != -1;
    }
}

//https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B
