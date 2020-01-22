let manHeight = document.getElementById("manHeight");
let manWeight = document.getElementById("manWeight");
let checkResult = document.querySelector(".checkResult");
let resultDisplay = document.querySelector(".resultDisplay");

// 取得各項物件

var manHeightValue;
var manWeightValue;
var bmi;
var clickTime;
var bmiLevel;
var borderColor;

// 預先定義全域變數

// 檢查身高體重是否為數字，若不是則顯示警告
function checkNum() {
  if (manHeightValue <= 0 || isNaN(manHeightValue)) {
    alert("請輸入正確的身高");
  } else if (manHeightValue <= 0 || isNaN(manWeightValue)) {
    alert("請輸入正確的體重");
  }
  // 若為負數或是NaN(輸入文字解析後的結果)，跳出警告
}

function calculateBMI() {
  let heightMeter = manHeightValue / 100;
  let heightParam = heightMeter * heightMeter;
  bmi = Math.round((manWeightValue / heightParam) * 100) / 100;
  // 取得小數點後兩位的BMI值
}

function getDate() {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = date.getMonth();
  mm += 1;
  let dd = date.getDate();
  clickTime = yyyy + "/" + mm + "/" + dd;
}

function rateBMI() {
  if (bmi < 18.5) {
    bmiLevel = "過輕";
    borderColor = "#31BAF9";
  } else if (bmi < 25) {
    bmiLevel = "理想";
    borderColor = "#86D73F";
  } else if (bmi < 30) {
    bmiLevel = "過重";
    borderColor = "#FF982D";
  } else if (bmi < 35) {
    bmiLevel = "中度肥胖";
    borderColor = "#FF6C03";
  } else {
    bmiLevel = "重度肥胖";
    borderColor = "#FF1200";
  }
}

function storeInLocal() {
  let allRecords = localStorage.getItem("historyRecords");

  if (allRecords === null) {
    allRecords = [];
    // 若沒有歷史資料，則讓 allRecords 成為空陣列
  } else {
    allRecords = JSON.parse(allRecords);
    // 若有歷史資料，則解析字串，轉成陣列
  }
  // allRecords 現在已是陣列

  let currentRecords = {
    borderColorKey: borderColor,
    bmiLevelKey: bmiLevel,
    bmiKey: bmi,
    weightKey: manWeightValue,
    heightKey: manHeightValue,
    // ※ 注意改動，非manWeightValueKey, manHeightValueKey
    clickTimeKey: clickTime
  };

  allRecords.splice(0, 0, currentRecords);
  // 將當前輸入值 (currentRecords)，丟入紀錄陣列 (allRecords) 第一位

  localStorage.setItem("historyRecords", JSON.stringify(allRecords));
  // allRecords 轉回字串丟進 local storage，對應的 key 是 historyRecords
}

function displayResult() {
  let allRecords = localStorage.getItem("historyRecords");

  if (allRecords === null) {
    allRecords = [];
    // 若沒有歷史資料，則讓 allRecords 成為空陣列
  } else {
    allRecords = JSON.parse(allRecords);
    // 若有歷史資料，則解析字串，轉成陣列
  }

  let recordsLength = allRecords.length;
  // 抓陣列長度來跑迴圈

  let totalContent = "";
  // 空字串，用來儲存最後塞入 innerHTML 的內容

  for (let i = 0; recordsLength > i; i++) {
    totalContent =
      totalContent +
      `
    <div class="resultRow d-flex" style="border-left: solid 5px ${allRecords[i].borderColorKey};">
      <div class="result-element">${allRecords[i].bmiLevelKey}</div>
      <div class="result-element"><small class="text-sm">BMI: </small><large class="text-lg">${allRecords[i].bmiKey}</large></div>
      <div class="result-element"><small class="text-sm">體重: </small><large class="text-lg">` +
      allRecords[i].weightKey +
      `</large><small class="text-sm"> kg</small></div>
      <div class="result-element"><small class="text-sm">身高: </small><large class="text-lg">` +
      allRecords[i].heightKey +
      `</large><small class="text-sm"> cm</small></div>
      <div class="result-element">` +
      allRecords[i].clickTimeKey +
      `</div>
      <div class="result-element"><span href="#" data-index="${i}" class="deleteRecord">delete</span></div>
    </div>
    `;
  }

  resultDisplay.innerHTML = totalContent;
}

displayResult();
// 如果有歷史紀錄，則一載入會就顯示

checkResult.addEventListener(
  "click",
  function(e) {
    e.preventDefault;
    manHeightValue = parseFloat(manHeight.value);
    manWeightValue = parseFloat(manWeight.value);
    // 取出輸入數值，並解析成浮點數

    checkNum();
    if (isNaN(manHeightValue)) {
      return;
    }
    if (isNaN(manWeightValue)) {
      return;
    }
    // 如果輸入非數值，停止函數

    calculateBMI();

    getDate();
    // 取得當下時間

    rateBMI();
    // 判斷 BMI 對應的健康程度，並先設定好 border 的色碼

    storeInLocal();
    // 取出 local storage 的輸入歷史，並將本次輸入資料存入 local storage

    displayResult();
    // 將全部的資料丟入迴圈，用 innerHTML 顯示到畫面上
  },
  false
);

resultDisplay.addEventListener(
  "click",
  function(e) {
    e.preventDefault;
    if (e.target.tagName !== "SPAN") {
      return;
    }
    // 只有點到 <a>delete</a> 才觸發刪除紀錄功能
    let index = e.target.dataset.index;
    let allRecords = JSON.parse(localStorage.getItem("historyRecords"));
    allRecords.splice(index, 1);
    localStorage.setItem("historyRecords", JSON.stringify(allRecords));
    displayResult();
  },
  false
);
