const nav = document.querySelector("nav");
const navIcon = document.querySelector("#navIcon");
const rightSide = document.querySelector(".rightSide");
const finishList = document.querySelector(".finishList");
const mTitle = document.querySelector(".m");
const sTitle = document.querySelector(".s");
const startFocus = document.querySelector(".btnFocus");
const pauseFocus = document.querySelector(".btnPause");
const stopFocus = document.querySelector(".btnStop");
const restMintue = document.querySelector(".btnRest");
const task = document.querySelector(".task");
const btnChoose = document.querySelector(".btnChoose");
const btnMusic = document.querySelector(".btnMusic");
const music = document.querySelector(".audioPlay");
const deleteMusic = document.querySelector(".deleteMusic");
const currentTaskTitle = document.querySelector(".currentTaskTitle");
let isPlaying = false;
//計時器時間
let time = 2;
//分鐘
let m;
//秒數
let s;
//計時器
let timer;
let focusTime = 0;
let isRest = false;
let oneOffocusTime = 0;
let totalTime = 0;
let completed = 0;
let notCompletedTask = 0;
let focusCount = 0;
let count = 0;

getData();

//導覽列可以收合
navIcon.addEventListener("click", function () {
  nav.classList.toggle("hid");
  navIcon.classList.toggle("navIcon");
  navIcon.classList.toggle("navIconMove");
  rightSide.classList.toggle("shifted");
});

//任務完成的音樂
function fnDeleteMusic() {
  deleteMusic.play();
}

//偵測背景音樂是否播放，切換播放與暫停
function detactMusic() {
  if (isPlaying) {
    music.pause();
  } else {
    music.play();
    music.loop = true;
  }
  isPlaying = !isPlaying;
}
// 若時間為0，則停止計時，若沒有繼續算時間
function startTime() {
  if (time == 0) {
    clearInterval(timer);
    if (isRest == false) {
      oneOffocusTime += 25;
    }
    saveData();
  } else {
    time--;
  }
  if (!isRest) {
    focusTime++;
  }

  displayTime();
}
// 外觀顯示功能，若時間顯示小於10則補0在前面
function checkTime(i) {
  return i < 10 ? "0" + i : i;
}

//若時間沒有倒數則計時開始
function start() {
  if (!timer) {
    timer = setInterval(startTime, 1000);
    startFocus.classList.add("hidden");
    pauseFocus.classList.remove("hidden");
    stopFocus.classList.remove("hidden");
    restMintue.classList.add("hidden");
  }
}
//計時暫停
function pause() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    startFocus.classList.remove("hidden");
    startFocus.textContent = "繼續專注";
    pauseFocus.classList.add("hidden");
    stopFocus.classList.add("hidden");
    restMintue.classList.add("hidden");

    saveData();
  }
}
//計時停止
function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    time = 1500;
    displayTime();
    isRest = false;
    startFocus.classList.remove("hidden");
    startFocus.textContent = "開始專注";
    pauseFocus.classList.add("hidden");
    stopFocus.classList.add("hidden");
    restMintue.classList.remove("hidden");
    saveData();
  }
}

//短休息時間(5分)
function rest() {
  time = 300;
  displayTime();
  startFocus.classList.add("hidden");
  pauseFocus.classList.remove("hidden");
  stopFocus.classList.remove("hidden");
  restMintue.classList.add("hidden");
  isRest = true;
  start();
}
//時間顯示
function displayTime() {
  m = checkTime(Math.trunc(time / 60));
  s = checkTime(Math.trunc(time % 60));

  mTitle.textContent = `${m}:`;
  sTitle.textContent = `${s}`;
}

function saveData() {
  const mfocusTime = Math.trunc(focusTime / 60);
  localStorage.setItem("focusTime", mfocusTime);
  const listItem = document.querySelector(".listItem");
  if (listItem) {
    listItem.setAttribute("data-focus-count", oneOffocusTime);
    localStorage.setItem("data-focus-count", oneOffocusTime);
    if (oneOffocusTime == 25) {
      document.querySelectorAll(".alarm")[0].src =
        "./images/alarm-clock-click.png";
    }
    if (oneOffocusTime == 50) {
      document.querySelectorAll(".alarm")[1].src =
        "./images/alarm-clock-click.png";
    }
    if (oneOffocusTime == 75) {
      document.querySelectorAll(".alarm")[2].src =
        "./images/alarm-clock-click.png";
    }
    if (oneOffocusTime == 100) {
      document.querySelectorAll(".alarm")[3].src =
        "./images/alarm-clock-click.png";
    }
    if (oneOffocusTime == 125) {
      document.querySelectorAll(".alarm")[4].src =
        "./images/alarm-clock-click.png";
    }
  }
  localStorage.setItem("modifiedTask", task.innerHTML);
  localStorage.setItem("selectedTask", task.innerHTML);
}

function getData() {
  const getNotCompletedTask = parseInt(
    localStorage.getItem("notCompletedTask"),
    10
  );
  const getCompleted = parseInt(localStorage.getItem("completed"), 10);
  const getTotalTime = parseInt(localStorage.getItem("totalTime"), 10);
  const getTask = localStorage.getItem("selectedTask");
  const getCompletedTask = localStorage.getItem("finishList");

  if (getCompleted) {
    completed = getCompleted;
  }
  if (getTotalTime) {
    totalTime = getTotalTime;
  }
  if (getNotCompletedTask) {
    notCompletedTask = getNotCompletedTask;
  }

  if (getCompletedTask) {
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = getCompletedTask;
    while (tempContainer.firstChild) {
      finishList.appendChild(tempContainer.firstChild);
    }
  }

  if (getTask) {
    const listContainer = document.createElement("div");
    listContainer.innerHTML = getTask;
    const getDataFocusCount = listContainer
      .querySelector(".listItem")
      .getAttribute("data-focus-count");
    if (getDataFocusCount) {
      oneOffocusTime = parseInt(getDataFocusCount);
    }
    while (listContainer.firstChild) {
      task.appendChild(listContainer.firstChild);
    }
    btnChoose.classList.add("hidden");
    currentTaskTitle.classList.remove("hidden");
  } else {
    btnChoose.classList.remove("hidden");
    currentTaskTitle.classList.add("hidden");
  }
}

btnMusic.addEventListener("click", detactMusic);

startFocus.addEventListener("click", start);

pauseFocus.addEventListener("click", pause);

stopFocus.addEventListener("click", stop);

restMintue.addEventListener("click", rest);

btnChoose.addEventListener("click", function () {
  window.location.href = "index.html";
});

task.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbtnImg")) {
    const newItem = e.target.closest(".listItem");
    if (newItem) {
      const alarmGroup = newItem.querySelector(".alarmGroup");
      const imgTags = alarmGroup.querySelectorAll("img");
      const imgCount = imgTags.length;
      console.log(newItem);
      localStorage.setItem("deleteTask", task.innerHTML);
      finishList.appendChild(newItem);
      totalTime = totalTime - imgCount * 25;
      notCompletedTask--;
      completed++;
      btnChoose.classList.remove("hidden");
      currentTaskTitle.classList.add("hidden");
      fnDeleteMusic();
    }
    saveTaskData();
  }
});

function saveTaskData() {
  localStorage.setItem("notCompletedTask", notCompletedTask);
  localStorage.setItem("completed", completed);
  localStorage.setItem("totalTime", totalTime);
  localStorage.setItem("finishList", finishList.innerHTML);
  localStorage.removeItem("selectedTask");
}
