// pop-up
let openPopUp = document.getElementById('open');
let closePopUp = document.getElementById('close');
let popUp = document.getElementById('body');

openPopUp.addEventListener('click', function () {
  popUp.classList.add('active');
})

closePopUp.addEventListener('click', () => {
  popUp.classList.remove('active')
})



//  Сотрудник
class Worker {
  constructor(name, surname, lastname, workStart, birthDate, post) {
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.workStart = workStart
    this.birthDate = birthDate
    this.post = post
  }

  getFIO() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }

  getWorkPeriod() {
    let currentTime = new Date()
    return currentTime.getFullYear() - this.workStart
  }

  getBirthDateString() {
    let yyyy = this.birthDate.getFullYear();
    let mm = this.birthDate.getMonth() + 1;
    let dd = this.birthDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy;
  }

  getAge() {
    let today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    let m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      age--
    }
    return age;
  }
}

// Список рабочих
let workers = [
  new Worker('Игорь', 'Сергеевич', 'Фролов', 2016, new Date(1999, 2, 21), 'Дизайна и технологий'),
  new Worker('Алена', 'Игоревна', 'Белых', 2022, new Date(2002, 3, 3), 'Юридический'),
  new Worker('Иван', 'Васильевич', 'Кротов', 2020, new Date(2001, 8, 1), 'Экономики и сервиса')
]

// Таблица
let $workersList = document.getElementById('workers-list'),
  $workersListTHAll = document.querySelectorAll('.workersTable th')

let column = 'fio',
  columnDir = true

// Получить TR сотрудника
function newWorkerTR(worker) {
  let $workerTR = document.createElement('tr'),
    $fioTD = document.createElement('td'),
    $birthDateTD = document.createElement('td'),
    $workStartTD = document.createElement('td'),
    $postTD = document.createElement('td')

  ageCalc = (n, arr) => n + " " + arr[(n % 100 > 4 && n % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(n % 10 < 5) ? n % 10 : 5]];
  let ageArr = ['год)', 'года)', 'лет)'];

  function courseCalc(age) {
    if (age == 1 || age < 1) {
      return ('(1 курс)')
    } else if (age == 2) {
      return ('(2 курс)')
    } else if (age == 3) {
      return ('(3 курс)')
    } else if (age == 4) {
      return ('(4 курс)')
    } else {
      return ('(Выпустился)')
    }
  }

  $fioTD.textContent = worker.fio
  $birthDateTD.textContent = worker.getBirthDateString() + ' (' + ageCalc(worker.getAge(), ageArr)
  $workStartTD.textContent = worker.workStart + courseCalc(worker.getWorkPeriod())
  $postTD.textContent = worker.post

  $workerTR.append($fioTD)
  $workerTR.append($birthDateTD)
  $workerTR.append($workStartTD)
  $workerTR.append($postTD)

  return $workerTR;
}

// Функция сортировки
function getSortWorkers(prop, dir) {
  let workersCopy = [...workers]
  return workersCopy.sort(function (workerA, workerB) {
    if ((!dir == false ? workerA[prop] < workerB[prop] : workerA[prop] > workerB[prop]))
      return -1;
  })
}

// Рендерим
function render() {
  let workersCopy = [...workers]

  workersCopy = getSortWorkers(column, columnDir)

  $workersList.innerHTML = ''
  for (let worker of workersCopy) {
    $workersList.append(newWorkerTR(worker))
  }
}

// По клику сортировка
$workersListTHAll.forEach(element => {
  element.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir
    render()
  })
})

// Добавление через инпут
document.getElementById('add-worker').addEventListener('submit', function (event) {
  event.preventDefault()
  workers.push(new Worker(
    document.getElementById('input-name').value,
    document.getElementById('input-surname').value,
    document.getElementById('input-lastname').value,
    Number(document.getElementById('input-workStart').value),
    new Date(document.getElementById('input-birthDate').value),
    document.getElementById('input-post').value,
  ))
  popUp.classList.remove('active')
  render()
})

render();

// Тултип
tippy('.workersTable__th', {
  content: 'Cортировка колонок нажатием на заголовок',
  animation: 'fade',
  duration: 100,
  theme: 'tomato',
});