const nav = document.querySelector("nav");
const navIcon = document.querySelector("#navIcon");
const rightSide = document.querySelector(".rightSide");
const addTask = document.querySelectorAll(".inputTask");
const list = document.querySelectorAll(".list");
const checkAlarm1 = document.querySelector("#checkAlarm1");
const checkAlarm2 = document.querySelector("#checkAlarm2");
const checkAlarm3 = document.querySelector("#checkAlarm3");
const checkAlarm4 = document.querySelector("#checkAlarm4");
const checkAlarm5 = document.querySelector("#checkAlarm5");
const checkAlarm6 = document.querySelector("#checkAlarm6");
const checkAlarm7 = document.querySelector("#checkAlarm7");
const checkAlarm8 = document.querySelector("#checkAlarm8");
const checkAlarm9 = document.querySelector("#checkAlarm9");
const checkAlarm10 = document.querySelector("#checkAlarm10");
const estimatedTime = document.querySelector(".estimatedTime");
const taskLabel = document.querySelector(".taskLabel");
const finishList = document.querySelector(".finishList");
const tTime = document.querySelector(".tTime");
const alarmClick = document.querySelector(".alarmClick");
const todayCount = document.querySelector(".today-count");
const tomorrowCount = document.querySelector(".tomorrow-count");
const deleteMusic = document.querySelector(".deleteMusic");
const uncheckBtn = document.querySelector(".uncheckBtn");
const todaydate = document.querySelector(".today-date");
const tomorrowDate = document.querySelector(".tomorrow-date");
const exCount = document.querySelector(".expire-count");
const taskExpired = document.querySelector(".taskExpired");
const hint1 = document.querySelector(".hint1");
const hint2 = document.querySelector(".hint2");
//任務過期的數量
let expireTaskCount = 0;
//今天未完成任務數量
let todayNotCompleted = 0;
//明天未完成任務數量
let tomorrowNotCompleted = 0;
//待完成任務的數量
// let notCompletedTask = 0;
//已完成任務的數量
let completed = 0;
//一個任務要花多少時間
let oneOfTime = 0;
//任務要花的總時間
let totalTime = 0;
//任務數量
let taskNumber = 0;
//專注時間
let totalFocusTime = 0;
let id = 0;
//日期設定
let numOfToday;
let numOfTomorrow;
let numOfdayAfterTomorrowDay;
let todayString;
let tomorrowString;
let dayAfterTomorrowString;

displayDate();
getData();

function getFormattedDate(date) {
  const options = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("zh-TW", options);
}

function getFormattedDateNumber(date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return date.toLocaleDateString("zh-TW", options);
}
//顯示日期
function displayDate() {
  const today = new Date();
  const tomorrow = new Date();
  const dayAfterTomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  todayString = getFormattedDate(today);
  tomorrowString = getFormattedDate(tomorrow);
  dayAfterTomorrowString = getFormattedDate(dayAfterTomorrow);

  numOfToday = getFormattedDateNumber(today);
  numOfTomorrow = getFormattedDateNumber(tomorrow);
  numOfdayAfterTomorrowDay = getFormattedDateNumber(dayAfterTomorrow);

  todaydate.textContent = todayString;
  tomorrowDate.textContent = tomorrowString;
}

//當5被勾選的情況下 2 3 4 5 都要被勾選
//當5被勾選的情況下，去點選4的時候，我的4 3 2要是勾選的狀態 5是取消勾選的狀態
//當5被勾選的情況下，去點選3的時候，我的3 2要是勾選的狀態 4 5是取消勾選的狀態
//當5被勾選的情況下，去點選2的時候，我的2要是勾選的狀態 3 4 5是取消勾選的狀態

function checkTensDigits(i) {
  return i < 10 ? "0" + i : i;
}

function updateCheckboxes(clickedCheckbox) {
  const checkboxes = [
    checkAlarm1,
    checkAlarm2,
    checkAlarm3,
    checkAlarm4,
    checkAlarm5,
  ];

  const index = checkboxes.indexOf(clickedCheckbox);

  if (clickedCheckbox.checked) {
    // 勾選當前checkbox及其之前的checkbox
    for (let i = 0; i <= index; i++) {
      checkboxes[i].checked = true;
    }
  } else {
    // 保持之前的checkbox勾選狀態
    for (let i = index + 1; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    clickedCheckbox.checked = true;
  }
}

// 為每個 checkbox 添加事件監聽器
checkAlarm1.addEventListener("click", function () {
  updateCheckboxes(this);
});
checkAlarm2.addEventListener("click", function () {
  updateCheckboxes(this);
});

checkAlarm3.addEventListener("click", function () {
  updateCheckboxes(this);
});

checkAlarm4.addEventListener("click", function () {
  updateCheckboxes(this);
});

checkAlarm5.addEventListener("click", function () {
  updateCheckboxes(this);
});

function updateCheckbox(clickedCheckbox) {
  const checkboxes = [
    checkAlarm6,
    checkAlarm7,
    checkAlarm8,
    checkAlarm9,
    checkAlarm10,
  ];

  const index = checkboxes.indexOf(clickedCheckbox);

  if (clickedCheckbox.checked) {
    // 勾選當前checkbox及其之前的checkbox
    for (let i = 0; i <= index; i++) {
      checkboxes[i].checked = true;
    }
  } else {
    // 保持之前的checkbox勾選狀態
    for (let i = index + 1; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    clickedCheckbox.checked = true;
  }
}
checkAlarm6.addEventListener("click", function () {
  updateCheckbox(this);
});
checkAlarm7.addEventListener("click", function () {
  updateCheckbox(this);
});

checkAlarm8.addEventListener("click", function () {
  updateCheckbox(this);
});

checkAlarm9.addEventListener("click", function () {
  updateCheckbox(this);
});

checkAlarm10.addEventListener("click", function () {
  updateCheckbox(this);
});

//新增今日任務
addTask[0].addEventListener("keydown", function (e) {
  //按下ENTER鍵且項目內容不等於空白則新增資料至下方的list
  if (e.key === "Enter" && addTask[0].value.trim() !== "") {
    const taskValue = addTask[0].value.trim();
    addTask[0].value = "";
    console.log("click Enter");
    const newItem = document.createElement("div");
    newItem.className = "listItem";
    let alarmImagesHTML = "";
    oneOfCount = 0;
    todayNotCompleted++;
    oneOfCount++;
    id++;

    newItem.setAttribute("data-focus-count", 0);
    newItem.setAttribute("data-id", `${numOfToday}-${id}`);

    if (checkAlarm1.checked) {
      for (let i = 1; i < 6; i++) {
        const checkbox = document.getElementById(`checkAlarm${i}`);
        if (checkbox.checked) {
          oneOfTime += 25;
          totalTime += 25;
          alarmImagesHTML += `<img src="./alarm-clock.png" class="alarm alarmClick" alt="clock">`;
        }
        checkbox.checked = false;
      }
    } else {
      alarmImagesHTML += `<img src="./alarm-clock.png" class="alarm alarmClick" alt="clock">`;
      oneOfTime = 25;
      totalTime += 25;
    }

    newItem.innerHTML = `<div class="leftSection">
                                        <button class="uncheckBtn">
                                            <div class="checkbtnImg finishbtnImg"></div>
                                        </button>
                                        <div class="content">
                                            <div class="taskLabel finishLabel">
                                        ${taskValue} 
                                            </div>
                                            <div class="alarmGroup">
                                      ${alarmImagesHTML}
                                            </div>
                                        </div>
                                          <div class="itemBox">
                                                <ul>
                                                    <li class="delete">❌</li>
                                                </ul>
                                            </div>
                                    </div>`;

    list[1].appendChild(newItem);

    todayCount.textContent = `${todayNotCompleted}`;
    chickDisplay();
    saveData();
  }
});
//新增明日任務
addTask[1].addEventListener("keydown", function (e) {
  //按下ENTER鍵且項目內容不等於空白則新增資料至下方的list
  if (e.key === "Enter" && addTask[1].value.trim() !== "") {
    const taskValue = addTask[1].value.trim();
    addTask[1].value = "";
    console.log("click Enter");
    const newItem = document.createElement("div");
    newItem.className = "listItem";
    let alarmImagesHTML = "";
    oneOfCount = 0;
    oneOfCount++;
    tomorrowNotCompleted++;
    id++;

    newItem.setAttribute("data-focus-count", 0);
    newItem.setAttribute("data-id", `${numOfTomorrow}-${id}`);

    if (checkAlarm6.checked) {
      for (let i = 6; i < 11; i++) {
        const checkbox = document.getElementById(`checkAlarm${i}`);
        if (checkbox.checked) {
          oneOfTime += 25;
          totalTime += 25;
          alarmImagesHTML += `<img src="./alarm-clock.png" class="alarm alarmClick" alt="clock">`;
        }
        checkbox.checked = false;
      }
    } else {
      alarmImagesHTML += `<img src="./alarm-clock.png" class="alarm alarmClick" alt="clock">`;
      oneOfTime = 25;
      totalTime += 25;
    }

    newItem.innerHTML = `<div class="leftSection">
                                        <button class="uncheckBtn">
                                            <div class="checkbtnImg finishbtnImg"></div>
                                        </button>
                                        <div class="content">
                                            <div class="taskLabel finishLabel">
                                        ${taskValue} 
                                            </div>
                                            <div class="alarmGroup">
                                      ${alarmImagesHTML}
                                            </div>
                                        </div>
                                              <div class="itemBox">
                                                <ul>
                                                    <li class="delete">❌</li>
                                                </ul>
                                            </div>
                                    </div>`;

    list[2].appendChild(newItem);
    tomorrowCount.textContent = `${tomorrowNotCompleted}`;
    chickDisplay();
    saveData();
  }
});

//到期任務完成
list[0].addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbtnImg")) {
    const newItem = e.target.closest(".listItem");
    console.log(newItem);
    if (newItem) {
      const alarmGroup = newItem.querySelector(".alarmGroup");
      const imgTags = alarmGroup.querySelectorAll("img");
      const imgCount = imgTags.length;
      finishList.appendChild(newItem);
      totalTime = totalTime - imgCount * 25;
      expireTaskCount--;
      completed++;
      exCount.textContent = expireTaskCount;
      fnDeleteMusic();
      chickDisplay();
    }

    localStorage.setItem("expireTaskCount", expireTaskCount);
    localStorage.setItem("expireTaskData", list[0].innerHTML);
    localStorage.setItem("finishList", finishList.innerHTML);
  }
});
//完成任務
list[1].addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbtnImg")) {
    const newItem = e.target.closest(".listItem");
    console.log(newItem);
    if (newItem) {
      const alarmGroup = newItem.querySelector(".alarmGroup");
      const imgTags = alarmGroup.querySelectorAll("img");
      const imgCount = imgTags.length;
      finishList.appendChild(newItem);
      totalTime = totalTime - imgCount * 25;
      // notCompletedTask--;
      todayNotCompleted--;
      completed++;
      todayCount.textContent = todayNotCompleted;
      fnDeleteMusic();
      chickDisplay();
    }
    localStorage.setItem("finishList", finishList.innerHTML);
    localStorage.setItem("tempDataToday", list[1].innerHTML);
    localStorage.setItem("todayNotCompleted", todayNotCompleted);
  }
});
//完成任務
list[2].addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbtnImg")) {
    const newItem = e.target.closest(".listItem");
    console.log(newItem);
    if (newItem) {
      const alarmGroup = newItem.querySelector(".alarmGroup");
      const imgTags = alarmGroup.querySelectorAll("img");
      const imgCount = imgTags.length;
      finishList.appendChild(newItem);
      totalTime = totalTime - imgCount * 25;
      tomorrowNotCompleted--;
      completed++;
      tomorrowCount.textContent = tomorrowNotCompleted;
      fnDeleteMusic();
      chickDisplay();
    }
    localStorage.setItem("finishList", finishList.innerHTML);
    localStorage.setItem("tempDataTomorrow", list[2].innerHTML);
    localStorage.setItem("tomorrowNotCompleted", tomorrowNotCompleted);
  }
});

function saveData() {
  //明天未完成的數量
  localStorage.setItem("tomorrowNotCompleted", tomorrowNotCompleted);
  //今天未完成的數量
  localStorage.setItem("todayNotCompleted", todayNotCompleted);
  //已完成的數量
  localStorage.setItem("completed", completed);
  //今天未完成的LIST 內容
  localStorage.setItem("tempDataToday", list[1].innerHTML);
  //明天未完成的LIST 內容
  localStorage.setItem("tempDataTomorrow", list[2].innerHTML);
  //已完成的LIST 內容

  //LIST 內 ID
  localStorage.setItem("id", id);
  // 過期任務數字
  localStorage.setItem("expireTaskCount", expireTaskCount);
  // 過期任務內容
  localStorage.setItem("expireTaskData", list[0].innerHTML);

  //移除被點到進入專注時刻的資料
  localStorage.removeItem("selectedTask");
}

function getData() {
  const tomorrowNotCompletedTask = parseInt(
    localStorage.getItem("tomorrowNotCompleted"),
    10
  );
  const todayNotCompletedTask = parseInt(
    localStorage.getItem("todayNotCompleted"),
    10
  );
  const expireNotCompletedTask = parseInt(
    localStorage.getItem("expireTaskCount"),
    10
  );
  const getCompleted = parseInt(localStorage.getItem("completed"), 10);
  const getID = parseInt(localStorage.getItem("id"), 10);
  const tempDataToday = localStorage.getItem("tempDataToday");
  const tempDataTomorrow = localStorage.getItem("tempDataTomorrow");
  const expireTaskData = localStorage.getItem("expireTaskData");

  if (getCompleted) {
    completed = getCompleted;
  }

  if (getID) {
    id = getID;
  }

  if (expireNotCompletedTask) {
    expireTaskCount = expireNotCompletedTask;
    chickDisplay();
  }
  if (todayNotCompletedTask) {
    todayNotCompleted = todayNotCompletedTask;

    chickDisplay();
  }

  if (tomorrowNotCompletedTask) {
    tomorrowNotCompleted = tomorrowNotCompletedTask;

    chickDisplay();
  }

  if (expireTaskData) {
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = expireTaskData;
    while (tempContainer.firstChild) {
      list[0].appendChild(tempContainer.firstChild);
    }
  }

  if (tempDataToday) {
    const currentDate = new Date();
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = tempDataToday;
    const listItems = tempContainer.querySelectorAll(".listItem");
    listItems.forEach((element) => {
      const [year, month, day] = element
        .getAttribute("data-id")
        .split("-")[0]
        .split("/")
        .map(Number);
      const taskDate = new Date(year, month - 1, day);
      currentDate.setHours(0, 0, 0, 0);
      if (taskDate.getTime() < currentDate.getTime()) {
        list[0].appendChild(element);
        expireTaskCount++;
        todayNotCompleted--;
      } else {
        list[1].appendChild(element);
      }
    });

    todayCount.textContent = `${todayNotCompleted}`;
    if (expireTaskCount > 0) {
      taskExpired.style.display = "flex";
      exCount.textContent = expireTaskCount;
    } else {
      taskExpired.style.display = "none";
    }
    chickDisplay();
    saveData();
  }

  if (tempDataTomorrow) {
    const currentDate = new Date();
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = tempDataTomorrow;
    const listItems = tempContainer.querySelectorAll(".listItem");
    listItems.forEach((element) => {
      const [year, month, day] = element
        .getAttribute("data-id")
        .split("-")[0]
        .split("/")
        .map(Number);
      const taskDate = new Date(year, month - 1, day);
      currentDate.setHours(0, 0, 0, 0);

      if (taskDate.getTime() < currentDate.getTime()) {
        list[0].appendChild(element);
        expireTaskCount++;
        tomorrowNotCompleted--;
      } else if (taskDate.getTime() == currentDate.getTime()) {
        console.log(taskDate, currentDate);
        list[1].appendChild(element);
        todayNotCompleted++;
        tomorrowNotCompleted--;
      } else {
        list[2].appendChild(element);
      }
    });
    todayCount.textContent = `${todayNotCompleted}`;
    tomorrowCount.textContent = `${tomorrowNotCompleted}`;
    chickDisplay();
    saveData();
  }

  const getFinishList = localStorage.getItem("finishList");
  if (getFinishList) {
    const finishedListContainer = document.createElement("div");
    finishedListContainer.innerHTML = getFinishList;
    while (finishedListContainer.firstChild) {
      finishList.appendChild(finishedListContainer.firstChild);
    }
    localStorage.setItem("finishList", finishList.innerHTML);
  }
  //從番茄鐘那邊取得已經完成任務的番茄鐘圖片
  const modifiedTask = localStorage.getItem("modifiedTask");

  if (modifiedTask) {
    const modifiedItem = document.createElement("div");
    modifiedItem.innerHTML = modifiedTask;
    const getId = modifiedItem
      .querySelector(".listItem")
      .getAttribute("data-id");

    const oldItem = document.querySelector(`.listItem[data-id="${getId}"]`);
    if (oldItem) {
      if (list[1].contains(oldItem)) {
        list[1].replaceChild(modifiedItem.firstChild, oldItem);
      } else {
        list[2].replaceChild(modifiedItem.firstChild, oldItem);
      }
    }
    saveData();

    // 清除 localStorage 中的修改後的數據
    localStorage.removeItem("modifiedTask");
  }
  //從番茄鐘頁面任務完成，則這邊的資料也會一同消失
  const deleteTask = localStorage.getItem("deleteTask");
  if (deleteTask) {
    const deleteTaskItem = document.createElement("div");
    deleteTaskItem.innerHTML = deleteTask;
    const getId = deleteTaskItem
      .querySelector(".listItem")
      .getAttribute("data-id");

    const oldItem = document.querySelector(`.listItem[data-id="${getId}"]`);
    // console.log(`oldItem:${oldItem}   getID:${getId}`);
    if (oldItem && list[1].contains(oldItem)) {
      list[1].removeChild(oldItem);
      todayNotCompleted--;
      todayCount.textContent = todayNotCompleted;
    } else if (oldItem && list[2].contains(oldItem)) {
      list[2].removeChild(oldItem);
      tomorrowNotCompleted--;
      tomorrowCount.textContent = tomorrowNotCompleted;
    }
    chickDisplay();
    saveData();
    localStorage.removeItem("deleteTask");
  }
}
//點擊X刪除
const completedTaskAndDelete = localStorage.getItem("completedTaskAndDelete");
if (completedTaskAndDelete) {
  const completedTaskAndDeleteItem = document.createElement("div");
  completedTaskAndDeleteItem.innerHTML = completedTaskAndDelete;
  const getId = completedTaskAndDeleteItem
    .querySelector(".listItem")
    .getAttribute("data-id");

  const oldItem = document.querySelector(`.listItem[data-id="${getId}"]`);

  if (oldItem && list[0].contains(oldItem)) {
    list[0].removeChild(oldItem);
    expireTaskCount--;
  } else if (oldItem && list[1].contains(oldItem)) {
    list[1].removeChild(oldItem);
    todayNotCompleted--;
    todayCount.textContent = `${todayNotCompleted}`;
  } else if (oldItem && list[1].contains(oldItem)) {
    list[2].removeChild(oldItem);
    tomorrowNotCompleted--;
    tomorrowCount.textContent = tomorrowNotCompleted;
  }
  chickDisplay();
  saveData();

  localStorage.removeItem("completedTaskAndDelete");
}

//點擊番茄鐘進入專心的時刻
list[1].addEventListener("click", function (e) {
  if (e.target.classList.contains("alarmClick")) {
    // 處理 `alarmClick` 事件
    const leftSection = e.target.closest(".listItem");
    console.log(leftSection.outerHTML);
    // 將 `leftSection` 的資料存儲到本地存儲中，或將其傳遞到下一頁
    localStorage.setItem("selectedTask", leftSection.outerHTML);

    // 重定向到番茄鐘頁面
    window.location.href = "pomodoro.html";
    // 根據需要調整 URL
  }
});
//點擊番茄鐘進入專心的時刻
list[2].addEventListener("click", function (e) {
  if (e.target.classList.contains("alarmClick")) {
    const leftSection = e.target.closest(".listItem");
    console.log(leftSection.outerHTML);
    localStorage.setItem("selectedTask", leftSection.outerHTML);

    // 轉到番茄鐘頁面
    window.location.href = "pomodoro.html";
  }
});
//任務完成音樂
function fnDeleteMusic() {
  deleteMusic.currentTime = 0;
  deleteMusic.play();
}
//navbar移動
navIcon.addEventListener("click", function () {
  nav.classList.toggle("hid");
  navIcon.classList.toggle("navIcon");
  navIcon.classList.toggle("navIconMove");
  rightSide.classList.toggle("shifted");
});

//檢查是否有點擊X的按鈕
document.addEventListener("click", function (event) {
  // 檢查點擊的元素是否有 "delete" 類別
  if (event.target.classList.contains("delete")) {
    // 找到包含此按鈕的最近的 listItem 元素
    const listItem = event.target.closest(".listItem");

    if (listItem) {
      // 找到包含該 listItem 的最近的 .list 元素
      const parentList = listItem.closest(".list");

      if (parentList) {
        // 找到所有的 .list 元素，並計算被刪除項目所屬的 .list 的索引
        const allLists = document.querySelectorAll(".list");
        const listIndex = Array.from(allLists).indexOf(parentList);

        // 刪除該 listItem 元素
        listItem.remove();
        if (listIndex == 0) {
          expireTaskCount--;
          exCount.textContent = expireTaskCount;
        } else if (listIndex == 1) {
          todayNotCompleted--;
          todayCount.textContent = todayNotCompleted;
        } else {
          tomorrowNotCompleted--;
          tomorrowCount.textContent = tomorrowNotCompleted;
        }
        saveData();
        // 輸出被刪除的 listItem 所屬的 list 索引
        console.log(`刪除的 listItem 位於 list 索引: ${listIndex}`);
      }
    }
  }
  chickDisplay();
});
//hint與到期任務是否要出現
function chickDisplay() {
  if (todayNotCompleted == 0) {
    hint1.classList.add("hidden");
  } else {
    hint1.classList.remove("hidden");
  }
  if (tomorrowNotCompleted == 0) {
    hint2.classList.add("hidden");
  } else {
    hint2.classList.remove("hidden");
  }
  if (expireTaskCount > 0) {
    taskExpired.style.display = "flex";
    exCount.textContent = expireTaskCount;
  } else {
    taskExpired.style.display = "none";
  }
}
