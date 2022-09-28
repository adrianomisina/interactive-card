//referência dos elementos no DOM
const cardholder = document.getElementById('cardholder-name')
const cardNumber = document.getElementById('card-number')
const expiry = Array.from(document.querySelectorAll('.expiry')) // de HTMLcolletion p/ NodeList
const cvc = document.getElementById('cvc')
const submit = document.getElementById('submit')
const nameOnCard = document.querySelector('.cardholder-display')
const numOnCard = document.querySelector('.card-number-display')
const expMM = document.querySelector('.expiry-month-display')
const expYY = document.querySelector('.expiry-year-display')
const cvcDisplay = document.querySelector('.cvc-display')
const thankYou = document.querySelector('.thank-you-header')
const thankYouSection = document.getElementById('thank-you')
const continueBtn = document.getElementById('continue')
const form = document.getElementById('myForm')
const expiryErrorMsg = document.getElementById('expiry-error')
const logoCard = document.querySelector('.card-logo')

//Input Name
const inputName = () => {
  nameOnCard.innerHTML = cardholder.value
  thankYouSection.innerHTML = `Thank You ${cardholder.value}`
  if (nameOnCard.innerHTML === '') {
    nameOnCard.innerHTML = cardholder.placeholder
  }
}

//Input Card Number and Validations
const inputCardNumber = () => {
  // criação de uma variável auxiliar
  let cardNumberInput = cardNumber.value

  // validação tipo de bandeira
  if (cardNumberInput.charAt(0) === '4') {
    logoCard.setAttribute('src', './images/visa.png')
  } else if (cardNumberInput.charAt(0) === '5') {
    logoCard.setAttribute('src','./images/master.png')
  } else if (cardNumberInput.charAt(0) === '3') {
    logoCard.setAttribute('src','./images/amex.png')
  } else {
    logoCard.setAttribute('src','./images/card-logo.svg')
  }

  //Validação para o usuário não escrever caracteres inválidos
  let formattedCardNmber = cardNumberInput.replace(/[^\d]/g, '')
  formattedCardNmber = formattedCardNmber.substring(0, 16)

  //dividir os cards number em blocos de 4
  let cardNumberSections = formattedCardNmber.match(/\d{1,4}/g)
    if (cardNumberSections !== null) {
    formattedCardNmber = cardNumberSections.join('')
  }

  //checagem para os numeros serem os mesmos
  if (cardNumberInput !== formattedCardNmber) {
    cardNumber.value = formattedCardNmber
  }

  numOnCard.innerHTML = cardNumber.value
  if (cardNumber.value === '') {
    numOnCard.innerHTML = cardNumber.placeholder
  }
}

// Input MM e Validação
const inputMM = () => {
  let formattedMM = expiry[0].value
  formattedMM = formattedMM.substring(0, 2)
  expiry[0].value = formattedMM
  if (expiry[0].value === '') {
    expMM.innerHTML = "00"
  } else {
    expMM.innerHTML = expiry[0].value
  }
}

//Input YY e validação
const inputYY = () => {
  let formattedYY = expiry[1].value
  formattedYY = formattedYY.substring(0, 4)
  expiry[1].value = formattedYY 
  if (expiry[1].value === '') {
    expYY.innerHTML = '0000'
  } else {
    expYY.innerHTML = expiry[1].value
  }
}

//Input CVC e validação
const inputCvc = () => {
  let formattedCvc = cvc.value
  formattedCvc = formattedCvc.substring(0, 3)
  cvc.value = formattedCvc 
  if (cvc.value === '') {
    cvcDisplay.innerHTML = '000'
  } else {
    cvcDisplay.innerHTML = cvc.value
  }
}

// Validações
const massValidate = () => {
  let validateName = () => {
    let cardholderExp = /^[A-Z a-z]+$/
    let errorMsg = document.getElementById("errorMsg")
    if (cardholder.value.match(cardholderExp)) {
      errorMsg.textContent = ""
    } else {
      errorMsg.innerHTML = 'Please enter cardholder name!'
    }
  }

  let validateCard = () => {
    let cardNumError = document.getElementById("card-num-error")
    if (cardNumber.value.length > 0 && cardNumber.value.length < 16) {
      cardNumError.innerHTML = "Wrong Format :("
    } else if (cardNumber.value === '') {
      cardNumError.innerHTML = 'Can`t be blank :('
    } else {
      cardNumError.innerHTML = ''
    }
  }

  let validateExpirt = () => {
    let expMonth = /^(0[0-9]|1[1-2])(2)$/
    let expYear = /^[0-9][0-2]{4}$/

    if (expiry[0].value.match(expMonth)) {
      expiryErrorMsg.innerHTML = '';
    } else if (
      expiry[0].value.match(expMonth) &&
      expiry[1].value.match(expYear)
    ) {
      expiryErrorMsg.innerHTML = '';
    } else if (expiry[0] === '') {
      expiryErrorMsg.innerHTML = "Can't be blank!"
    } else {
      expiryErrorMsg.innerHTML = "Wrong format!"
    }
  }

  const validateCvc = () => {
    let cvcErrorMsg = document.getElementById("error-cvc")
    let cvcExp = /^[0-9]{3}$/
    if (cvc.value === '') {
      cvcErrorMsg.innerText = "Can't be blank!"
    } else if (cvc.value.match(cvcExp)) {
      cvcErrorMsg.innerText = ''
    } else {
      cvcErrorMsg.innerHTML = "Wrong format!"
    }
    validateCard()
    validateName()
    validateExpirt()
    validateCvc()
    if (
      nameOnCard.innerHTML === cardholder.placeholder ||
      numOnCard.innerHTML === cardNumber.placeholder ||
      expMM.innerHTML === "00" ||
      expYY.innerHTML === "0000" ||
      cvcDisplay.innerHTML === "000" ||
      (cardNumber.value.length > 0 && cardNumber.value.length < 16) 
    ) {
      return false
    } else {
       return true
    }
  }
}

//submit Button
submit.addEventListener('click', function () {
  massValidate()
  if (massValidate() === false) {
    event.preventDefault()
  } else {
    event.preventDefault()

    form.classList.add("hidden")
    thankYouSection.classList.remove("hidden")
  }
})

// Continue Button
continueBtn.addEventListener('click', function () {
  event.preventDefault();
  thankYouSection.classList.add('hidden')
  form.classList.remove('hidden')
  nameOnCard.innerHTML = cardholder.placeholder
  numOnCard.innerHTML = cardNumber.placeholder
  expMM.innerHTML = '00'
  expYY.innerHTML = '0000'
  cvcDisplay.innerHTML = '000'
  cardholder.value = ''
  cardNumber.value = ''
  expiry[0].value = ''
  expiry[1].value = ''
  cvc.value = ''
  expiryErrorMsg.innerHTML = ''
})


