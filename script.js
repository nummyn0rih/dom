'use strict';

// Код валидации формы

function validateForm(obj) {

    if (obj.formId != 'profile') return;

    const profileForm = document.getElementById('profile');

    profileForm.addEventListener('focus', (event) => {
        if (event.target.className == obj.inputErrorClass) event.target.className = '';
    }, true)

    profileForm.addEventListener('blur', (event) => {
        let target = event.target;
        if (target.nodeName != 'INPUT') return;
        if (target.dataset.validator == 'letters') {
            if (!isLetters(target.value)) target.className = obj.inputErrorClass;
        };
        if (target.dataset.validator == 'number') {
            if (!isNumber(target.value, target.dataset.validatorMin, 
                target.dataset.validatorMax)) target.className = obj.inputErrorClass;
        };
        if (target.dataset.validator == 'regexp') {
            if (!isPhone(target.value, target.dataset.validatorPattern))
                target.className = obj.inputErrorClass;
        };
    }, true);
    
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        for (let input of profileForm) {
            if (input.hasAttribute('data-required')) {
                if (input.value != '') continue;
                profileForm.className = obj.formInvalidClass;
                input.focus();
                return;
            };
            if (input.className == obj.inputErrorClass) {
                profileForm.className = obj.formInvalidClass;
                input.focus();
                return;
            }
            if (input == document.activeElement) {
                console.log(input.value);
            }
        }
        profileForm.className = obj.formValidClass;
    })

    function isLetters(name) {
        return name.search(/^[a-zа-я]+$/ig) != -1;
        //https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B
    }

    function isNumber(num, min, max) {
        if (isNaN(num)) return;
        if (min == undefined && max == undefined) return true;
        if (+num >= +min && +num <= +max) return true;
    }
    
    function isPhone(phone, pattern) {
        return phone.search(pattern) != -1;
    }
}

