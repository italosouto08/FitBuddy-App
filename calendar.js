const currentDate = document.querySelector(".currentDate"),
  daysTag = document.querySelector(".days"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Funções para manipular o localStorage
const getStoredActivities = () =>
  JSON.parse(localStorage.getItem("atividades")) || {};
const storeActivities = (atividades) =>
  localStorage.setItem("atividades", JSON.stringify(atividades));

const renderCalendar = () => {
  const atividades = getStoredActivities();
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
    lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    let atividade = atividades[`${currYear}-${currMonth}-${i}`];
    let activityColor =
      atividade && atividade.status === "yes"
        ? `style="background-color:${atividade.color}"`
        : "";
    liTag += `<li class="${isToday}" data-day="${i}" ${activityColor}>${i}</li>`;
  }

  for (let i = lastDayOfMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  document.querySelectorAll(".days li").forEach((day) => {
    day.addEventListener("click", () => {
      const selectedDay = day.dataset.day;
      document.querySelector("#dayInput").value = selectedDay;
    });
  });
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});

document.querySelector("#save").addEventListener("click", () => {
  const day = document.querySelector("#dayInput").value;
  const status = document.querySelector("#workoutStatus").value;
  const color = document.querySelector("#workoutColor").value;

  if (day) {
    const atividades = getStoredActivities();
    if (status === "no") {
      delete atividades[`${currYear}-${currMonth}-${day}`];
    } else if (status === "yes" && color) {
      atividades[`${currYear}-${currMonth}-${day}`] = {
        status,
        color,
      };
    }
    storeActivities(atividades);
    renderCalendar();
  }
});
