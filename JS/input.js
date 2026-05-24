// 데이터 저장소 일치 (로컬 스토리지 연동 포함)
let dataList = JSON.parse(localStorage.getItem("dataList")) || [];

// HTML 요소 가져오기
const tableBody = document.getElementById("tableBody");
const addBtn = document.getElementById("addBtn");

const inputSite = document.getElementById("inputSite");
const inputId = document.getElementById("inputId");
const inputPw = document.getElementById("inputPw");

// 로컬 스토리지 저장 함수
function saveToLocalStorage() {
  localStorage.setItem("dataList", JSON.stringify(dataList));
}

// 화면을 처음 켜거나 데이터가 바뀔 때 표를 다시 그려주는 함수
function init() {
  tableBody.innerHTML = ""; // 기존 표 비우기
  dataList.forEach((data) => renderTable(data));
  saveToLocalStorage();
}

// 추가 버튼 클릭 이벤트 연결
addBtn.addEventListener("click", () => {
  // 입력된 값 가져오기
  const siteName = inputSite.value.trim();
  const id = inputId.value.trim();
  const pw = inputPw.value.trim();

  // 간단한 유효성 검사 (빈 값 체크)
  if (!siteName || !id || !pw) {
    alert("Invalid input!");
    return;
  }

  // 데이터 생성 시 고유한 식별자(id)를 함께 저장합니다.
  const newData = {
    id: Date.now().toString(),
    siteName,
    id,
    pw
  };

  // 변수명 일치 (dataList로 통일)
  dataList.push(newData);

  // 화면에 그리기 및 저장
  renderTable(newData);
  saveToLocalStorage();

  // 다음 입력을 위해 입력창 비우기
  inputSite.value = "";
  inputId.value = "";
  inputPw.value = "";
  inputSite.focus();
});

// 이벤트 위임 (tbody에 이벤트 연결)
tableBody.addEventListener("click", (event) => {
  // 클릭된 요소가 'delBtn' 클래스를 가지고 있는지 확인
  if (event.target.classList.contains("delBtn")) {
    // 가장 가까운 부모 행(tr) 찾기
    const row = event.target.closest("tr");
    // tr에서 고유 id 읽어오기
    const targetId = row.getAttribute("data-id");

    // 화면에서 즉시 삭제
    row.remove();

    // accountList 대신 변수명 dataList에서 대상을 찾아 삭제하도록 일치시켰어요.
    dataList = dataList.filter((item) => item.id !== targetId);

    // 변경된 배열 저장
    saveToLocalStorage();
    console.log("남은 데이터:", dataList);
  }
});

// 표에 행을 그려주는 함수
function renderTable(data) {
  const row = document.createElement("tr");

  // tr 태그에 고유 ID를 속성으로 심어줍니다.
  row.setAttribute("data-id", data.id);

  // button 태그를 td 태그 안으로 안전하게 감싸주었습니다.
  row.innerHTML = `
    <td>${data.siteName}</td>
    <td>${data.id}</td>
    <td>${data.pw}</td>
    <td><button class="delBtn">del</button></td>
  `;

  tableBody.appendChild(row);
}

// 처음 주소에 접속했을 때 저장된 데이터를 화면에 뿌려줍니다.
init();
