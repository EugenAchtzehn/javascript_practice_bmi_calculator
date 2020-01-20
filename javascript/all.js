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

function storeInLocal() {}

function displayResult() {
  resultDisplay.innerHTML =
    `
<div class="resultRow d-flex" style="border-left: solid 5px` +
    borderColor +
    `;">
<div class="result-element">` +
    bmiLevel +
    `</div>
<div class="result-element"><small class="text-sm">BMI: </small><large class="text-lg">` +
    bmi +
    `</large></div>
<div class="result-element"><small class="text-sm">體重: </small><large class="text-lg">` +
    manWeightValue +
    `</large><small class="text-sm"> kg</small></div>
<div class="result-element"><small class="text-sm">身高: </small><large class="text-lg">` +
    manHeightValue +
    `</large><small class="text-sm"> cm</small></div>
<div class="result-element">` +
    clickTime +
    `</div>
<div class="result-element"><a href="#" class="deleteRecord">delete</a></div>
</div>
`;
}

checkResult.addEventListener(
  "click",
  function() {
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
    rateBMI();
    storeInLocal();
    displayResult();
  },
  false
);

// deleteRecord.addEventListener("click", function() {}, false);
