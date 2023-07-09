const russian = [
  'Ваш ИМТ',
  'Выраженный дефицит массы тела',
  'Недостаточная (дефицит) масса тела',
  'Норма',
  'Избыточная масса тела (предожирение)',
  'Ожирение 1 степени',
  'Ожирение 2 степени',
  'Ожирение 3 степени',
  'Правильно введите вес',
  'Правильно введите рост',
  'масса тела в килограммах',
  'рост в сантиметрах',
  'Рассчитать ИМТ',
  'Программа расчета Индекса Массы Тела',
  'Не менее 1 символа и не более 5-ти символов\n' +
  'Допустимы для ввода только цифры и разделитель дробной части – точка\n' +
  'Значение строго больше нуля',
  'Язык',
  'Части проекта',
  'Сайт',
  'Github',
  'Видеоролик'
]

const english = [
  'Your BMI',
  'Severe deficiency of body weight',
  'Insufficient (deficit) body weight',
  'Norm',
  'Overweight (preobesity)',
  'Obesity 1 degree',
  'Obesity 2 degree',
  'Obesity 3 degree',
  'Enter correct weight',
  'Enter height correctly',
  'body weight in kilograms',
  'height in centimeters',
  'Calculate BMI',
  'Body Mass Index Calculation Program',
  'At least 1 character and at most 5 characters\n' +
  'Only digits and a decimal separator - dot are allowed for input\n' +
  'Value strictly greater than zero',
  'Language',
  'Parts of the project',
  'Website',
  'github',
  'Video'
]

function alert(v) {
  document.getElementById("res").innerHTML = v
}

let language

const button = document.getElementById('button');

function switchLang(v) {
  if (v === "1") {
    language = russian
    document.getElementById('language').style.backgroundImage='url("ru.png")'
  }else {
    language = english
    document.getElementById('language').style.backgroundImage='url("us.png")'
  }
  document.getElementById('ml').innerHTML = language[10]
  document.getElementById('hl').innerHTML = language[11]
  button.innerHTML = language[12]
  document.title = language[13]
  button.dataset['title']=language[14]
  document.getElementById('language').innerHTML = language[15]
  document.getElementById('parts').innerHTML = language[16]
  document.getElementById('parts1').innerHTML = language[17]
  document.getElementById('parts2').innerHTML = language[18]
  document.getElementById('parts3').innerHTML = language[19]
  for (const el of document.querySelectorAll('.has-title')) {
    el.title = language[14]
  }
}

switchLang("1")
document.getElementById('li1').addEventListener('click', () => switchLang('1'))
document.getElementById('li2').addEventListener('click', () => switchLang('2'))

function isCorrect(v) {
  if (v.length < 1 || v.length > 5) return false
  // Допустимы для ввода только цифры и разделитель дробной части – точка(.).
  if (!/^[0-9]+(\.[0-9]+)?$/.test(v)) return false
  // Проверить, что значение строго больше (>) 0 (ноль)
  if (v * 1 <= 0) return false
  return true
}

function verdict(v) {
  if (v <= 16) return 1
  else if (v < 18.5) return 2
  else if (v < 25) return 3
  else if (v < 30) return 4
  else if (v < 35) return 5
  else if (v < 40) return 6
  else return 7
}

const mInput = document.getElementById('m');
const hInput = document.getElementById('h');

button.addEventListener('click', () => {
    let m = mInput.value
    let h = hInput.value
    //TODO Округление при расчете должно производиться с точностью до 4-х знаков после запятой.
    m *= 1
    h *= 1
    //  начнем с перевода роста в сантиметрах в метры
    h /= 100
    let res = m / (h ** 2)
    res = res.toFixed(2)
    alert(`${language[0]} ${res.replace('.', ',')} - ${language[verdict(res * 1)]}`)
  }
)

let prev=""
function onKeyUp(input) {
  input.addEventListener("keyup", () => {
    input.classList.add('has-content')
    if (isCorrect(input.value)||input.value[input.value.length-1]==='.'||input.value==='') {
      prev = input.value
    } else {
      input.value = prev
    }
    if (isCorrect(mInput.value)&&isCorrect(hInput.value)) {
      button.disabled=false
      button.title=""
    } else {
      button.disabled = true
      button.title=button.dataset['title']
    }
  })
}

onKeyUp(mInput)
onKeyUp(hInput)
