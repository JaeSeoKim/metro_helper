var cnt; //sms==0&tel==1

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function input_TrainNum() {
  if (getParameterByName('trainNum') == "") {
    console.log("url에 지하철 데이터가 없음.");
  } else {
    document.getElementById("train_number").value = getParameterByName('trainNum');
    console.log("url에서 지하철 데이터 가져옴");
  }
  console.log("input_TrainNum() 작동함");

}

function input_Route() {
  if (getParameterByName('selRoute_1') == "korail") {
    document.getElementById('select_Route_1').value = 'korail';
    console.log("url에서 노선 정보 가져옴");
  } else if (getParameterByName('selRoute_1') == "airport") {
    document.getElementById('select_Route_1').value = 'airport';
    console.log("url에서 노선 정보 가져옴");
  } else if (getParameterByName('selRoute_1') == "incheon") {
    document.getElementById('select_Route_1').value = 'incheon';
    console.log("url에서 노선 정보 가져옴");
  }
  if (getParameterByName('selRoute_2') == "airport") {
    document.getElementById('select_Route_2').value = 'airport';
    console.log("url에서 노선 정보 가져옴");
  } else if (getParameterByName('selRoute_2') == "incheon") {
    document.getElementById('select_Route_2').value = 'incheon';
    console.log("url에서 노선 정보 가져옴");
  }
  if (getParameterByName('selRoute_3') == "airport") {
    document.getElementById('select_Route_3').value = 'airport';
    console.log("url에서 노선 정보 가져옴");
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
      case "311": //1호선(경부, 경인, 경원선)
      case "319": //광명셔틀
      case "321": //중앙선
      case "341": //4호선(과천, 안산선)
      case "331": //경의선 =
      case "351": //분당선, 수인선 =
      case "361": //경춘선 =
      case "368": //ITX-청춘
      case "371": //경강선 =
      case "381": //동해선
      case "391": //서해선 =
        cnt = 0;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "1544-7769";
        break;
      default:
        cnt = 0;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "정확한 지하철 번호를 입력해주세요[err01]";
    }
  } else if (no.length == 5) {
    switch (no.substr(0, 2)) {
      case "UL": //우이신설선
      case "ul":
        cnt = 1;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "02-3499-5561";
        break;
      default:
        cnt = 0;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "정확한 지하철 번호를 입력해주세요[err02]";
    }
  } else if (no.length == 4) {
    switch (no.substr(0, 1)) {
      case "1": //서울교통공사 1호선은 한국철도공사와 구분 필요
        if (document.getElementById('select_Route_1').value == "seoul") {
          document.getElementById("form_Route_1_Menu").style.display = "";
          cnt = 0;
          return "1577-1234";
        } else if (document.getElementById('select_Route_1').value == "korail") {
          document.getElementById("form_Route_1_Menu").style.display = "";
          cnt = 0;
          return "1544-7769";
        } else if (document.getElementById('select_Route_1').value == "airport") {
          document.getElementById("form_Route_1_Menu").style.display = "";
          cnt = 0;
          return "1599-7788";
        } else if (document.getElementById('select_Route_1').value == "incheon") {
          document.getElementById("form_Route_1_Menu").style.display = "";
          cnt = 0;
          return "1899-4446";
        } else {
          document.getElementById("form_Route_1_Menu").style.display = "none";
          cnt = 0;
          return "flag오류!!!!!";
        }
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        break;
      case "2":
        if (document.getElementById('select_Route_2').value == "seoul") {
          document.getElementById("form_Route_2_Menu").style.display = "";
          cnt = 0;
          return "1577-1234";
        } else if (document.getElementById('select_Route_2').value == "airport") {
          document.getElementById("form_Route_2_Menu").style.display = "";
          cnt = 0;
          return "1599-7788";
        } else if (document.getElementById('select_Route_2').value == "incheon") {
          document.getElementById("form_Route_2_Menu").style.display = "";
          cnt = 0;
          return "1899-4446";
        } else {
          document.getElementById("form_Route_2_Menu").style.display = "none";
          cnt = 0;
          return "flag오류!!!!!";
        }
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_1_Menu").style.display = "none";
        break;
      case "3":
        if (document.getElementById('select_Route_3').value == "seoul") {
          document.getElementById("form_Route_3_Menu").style.display = "";
          cnt = 0;
          return "1577-1234";
        } else if (document.getElementById('select_Route_3').value == "airport") {
          document.getElementById("form_Route_3_Menu").style.display = "";
          cnt = 0;
          return "1599-7788";
        } else {
          document.getElementById("form_Route_3_Menu").style.display = "none";
          cnt = 0;
          return "flag오류!!!!!";
        }
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        break;
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
        cnt = 0;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "1577-1234";
        break;
      case "9": //서울시메트로9호선
        cnt = 0;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "1544-4009";
        break;
      case "D": //신분당선
      case "d":
        cnt = 1;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "031-8018-7777";
        break;
      case "U": //의정부경전철
      case "u":
        cnt = 1;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "031-820-1000";
        break;
      case "Y": //용인 경전철(에버라인)
      case "y":
        cnt = 1;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "031-329-3500";
        break;
      default:
        cnt = 0;
        document.getElementById("form_Route_1_Menu").style.display = "none";
        document.getElementById("form_Route_3_Menu").style.display = "none";
        document.getElementById("form_Route_2_Menu").style.display = "none";
        return "정확한 지하철 번호를 입력해주세요[err03]";
    }
  } else {
    document.getElementById("form_Route_1_Menu").style.display = "none";
    document.getElementById("form_Route_3_Menu").style.display = "none";
    document.getElementById("form_Route_2_Menu").style.display = "none";
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
