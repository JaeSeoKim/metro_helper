var cnt; //sms==0&tel==1

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function input_TrainNum() {
  if (getParameterByName('trainNum') == null || getParameterByName('trainNum') == "") {
    console.log("url에 지하철 데이터가 없음.");
  } else {
    document.getElementById("train_number").value = getParameterByName('trainNum');
    console.log("url에서 지하철 데이터 가져옴");
  }
  console.log("input_TrainNum() 작동함");
}

function input_Route() {
  if (getParameterByName('selRoute') == "lightRail") {
    document.getElementById('select_Route').value = 'lightRail';
    console.log("url에서 노선 정보 가져옴");
  }else {

  }
  console.log("input_TrainNum() 작동함");

}

function input_PhoneNum() {
  var num = findNum();
  var no = document.myform.trainNum.value;
  if (no == "" || no == null) {
    console.log("err findNum() 에서 데이터를 발견 못함");
  } else {
    document.myform.phoneNum.value = num;
    console.log("document.myform.phoneNum.value에 데이터를 입력함.");
  }
  if (cnt == 1) {
    document.getElementById("form_Select_Menu").style.display = "none";
    document.getElementById("msg_label").innerText = "안내 사항";
    document.myform.msgField.value = "[" + no + "]\n이 열차는 고객센터로 메세지 전송이 불가능 합니다.\n전화를 통하여 민원신청 부탁드립니다.";
    document.myform.msgField.readOnly = true;
    document.myform.sendBtn.innerText = "전화걸기";
  } else {
    document.getElementById("form_Select_Menu").style.display = "";
    document.getElementById("msg_label").innerText = "상세한 민원내용";
    document.myform.msgField.value = "";
    document.myform.msgField.readOnly = false;
    document.myform.sendBtn.innerText = "메시지전송";
  }
  console.log("input_PhoneNum() 작동함");

}

function input_Val() {
  var no = document.myform.trainNum.value;
  if (no != "") {
    selectVal()
  }
}

function selectVal() {
  var menu = document.myform.selMenu.value;
  var no = document.myform.trainNum.value;
  switch (menu) {
    case "Emergency":
      document.myform.msgField.value = "[" + no + "]\n현재 위급상황입니다.\n빠른 출동 부탁드립니다."
      break;
    case "Disordered":
      document.myform.msgField.value = "[" + no + "]\n현재 질서저해가 이루어지고 있습니다.\n빠른 해결 부탁드립니다."
      break;
    case "Temperature":
      document.myform.msgField.value = "[" + no + "]\n현재 열차의 칸의 온도가 부적절합니다.\n빠른 해결 부탁드립니다."
      break;
    case "Others":
      document.myform.msgField.value = "[" + no + "]\n"
      break;
    default:
      document.myform.msgField.value = "[" + no + "]\n"
      break;
  }
  console.log("selectVal() 작동중");
}

function send() {
  var phoneNum = findNum();
  if (cnt == 1) {
    location.href = "tel:" + phoneNum;
  } else {
    var bodyVal = document.myform.msgField.value;
    var varUA = navigator.userAgent.toLowerCase();
    if (varUA.match('android') != null) {
      location.href = "sms:" + phoneNum + "?body=" + bodyVal;
    } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
      location.href = "sms:" + phoneNum + "&body=" + bodyVal;
    } else {
      location.href = "sms:" + phoneNum + "?body=" + bodyVal;
    }
  }
  console.log(phoneNum + "\n" + bodyVal);
  console.log("send() 작동중");
}

function findNum() {
  var no = document.myform.trainNum.value;
  if (no.length == 6) {
    switch (no.substr(0, 3)) {
      case "381": //동해선
        cnt = 0;
        document.getElementById("form_Route_Menu").style.display = "none";
        return "1544-7769";
        break;
      default:
        cnt = 0;
        document.getElementById("form_Route_Menu").style.display = "none";
        return "정확한 지하철 번호를 입력해주세요[err01]";
    }
  } else if (no.length == 4) {
    switch (no.substr(0, 1)) {
      case "1": //부산 도시철도
        if (document.getElementById('select_Route').value == "metro") {
          document.getElementById("form_Route_Menu").style.display = "";
          cnt = 0;
          return "1544-5005";
        } else if (document.getElementById('select_Route').value == "lightRail") {
          document.getElementById("form_Route_Menu").style.display = "";
          cnt = 0;
          return "부산김해경전철 전화번호";
        } else {
          document.getElementById("form_Route_Menu").style.display = "none";
          cnt = 0;
          return "flag오류!!!!!";
        }
        break;
      case "2":
      case "3":
      case "4":
        cnt = 0;
        document.getElementById("form_Route_Menu").style.display = "none";
        return "1544-5005";
        break;
      default:
        cnt = 0;
        document.getElementById("form_Route_Menu").style.display = "none";
        return "정확한 지하철 번호를 입력해주세요[err03]";
    }
  } else {
    return "정확한 지하철 번호를 입력해주세요[err04]";
  }
  console.log("열차칸번호와 매치해서 값을 가져옴");
}
// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}
