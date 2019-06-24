// "use strict";

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

function input_PhoneNum() {
  var num = findNum();
  var no = document.myform.trainNum.value;
  if (no == "" || no==null) {
    console.log("err findNum() 에서 데이터를 발견 못함");
  }else {
    document.myform.phoneNum.value = num;
    console.log("document.myform.phoneNum.value에 데이터를 입력함.");
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

function sendSMS() {

  var phoneNum = findNum();
  var bodyVal = document.myform.msgField.value;
  var varUA = navigator.userAgent.toLowerCase();
  if (varUA.match('android') != null) {
    location.href = "sms:" + phoneNum + "?body=" + bodyVal;
  } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
    location.href = "sms:" + phoneNum + "&body=" + bodyVal;
  } else {
    location.href = "sms:" + phoneNum + "?body=" + bodyVal;
  }
  console.log(phoneNum + "\n" + bodyVal);
  console.log("sendSMS() 작동중");
}

function findNum() {
  var no = document.myform.trainNum.value;
  if (no.length == 6) {
    switch (no.substr(0, 3)) {
      case "311":
      case "341":
        return "1544-7788";
        break;
      case "321":
      case "331":
      case "351":
        return "1544-7769";
        break;
      case "361":
      case "371":
        return "데이터가 없음...(1)";
        break;
      default:
        return "정확한 지하철 번호를 입력해주세요[err01]";
    }
  } else if (no.length == 4) {
    switch (no.substr(0, 1)) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
        return "1577-1234";
        break;
      case "9":
        return "1544-4009";
        break;
      case "D":
        return "031-8018-7777";
        break;
      case "U":
      case "Y":
        return "데이터가 없음...(2)";
        break;
      default:
        return "정확한 지하철 번호를 입력해주세요[err02]";
      }
  } else {
    return "정확한 지하철 번호를 입력해주세요[err03]";
  }
  console.log("열차칸번호와 매치해서 값을 가져옴");
}

function changeColor(obj) {
  obj.style.borderBottomColor = "#4d36bd";

}

function changeOrignal(obj) {
  obj.style.borderBottomColor = "gray";
}

(function() {
  //Breakpoints
  var charlie = 500;
  var delta = 700;
  var echo = 900;

  //Master click handler
  window.addEventListener("click", clickActions, false);
  /*
  window.addEventListener("resize", resizeActions, false);

  function resizeActions(e){
    if(window.innerWidth < 500){
       let m = document.querySelector('.MOD_MENU_Nav');
      m.style.overflow = "hidden";
       }
  }*/

  function clickActions(e) {
    var el = e.target;

    //if clicked on child (image) of a lightbox - MODULISE THIS!
    var lightboxLink = isChildOf(el, "AP_lightbox");
    if (lightboxLink) {
      e.preventDefault();
      //send full res image url to lightbx
      MODULE_LIGHTBOX.lightboxCreate(lightboxLink, lightboxLink.href);
    }

    //if a submenu toggle button was clicked
    if (el.classList.contains("subMenuToggle")) {
      //grab the UL that is the neighbour of the submenu toggle button
      var submenu = el.previousElementSibling;
      if (submenu.tagName === "UL") {
        //toggle the submenu
        MODULE_MENU.toggleMenu(null, submenu);
        //set parent UL to height 'auto' so that the single column mbile menu grows with the opening of the submenu drawers
        var parentUl = isChildOf(submenu, "AP_Menu_List");
        if (parentUl && window.innerWidth < charlie) {
          parentUl.style.overflow = "visible";
        }
      }
    }
    //if an accordion tab is clicked
    if (el.classList.contains("AP_accordion_tab")) {
      MODULE_ACCORDION.accordionManager(el);
    }
  }

  //=============================================

  //UTILITY createEl, creates and returns a dom element using supplied argument details el:element type i.e. 'div'. classes:the classnames. parent:the parent element. id:the id of the element. content:text content if requires a textnode. imgsrc:source of image if we're created an img element.
  function createEl(el, classes, parent, id, content, imgsrc, href, title) {
    var newEl = document.createElement(el);
    //class
    if (classes) {
      var c = document.createAttribute("class");
      c.value = classes;
      newEl.setAttributeNode(c);
    }
    //data attributes
    if (id) {
      var d = document.createAttribute("data-module-id");
      d.value = id;
      newEl.setAttributeNode(d);
    }
    //text content
    if (content) {
      var t = document.createTextNode(content);
      newEl.appendChild(t);
    }
    if (imgsrc) {
      var i = document.createAttribute("src");
      i.value = imgsrc;
      newEl.setAttributeNode(i);
    }
    parent.appendChild(newEl);
    return newEl;
  } //END createEl

  //UTILITY isChildOf, If the supplied element 'el' is a descendant of an element with the classname of 'classTerm' return the element with the classname of 'classTerm', otherwise return false.
  function isChildOf(el, classTerm) {
    if (el.parentElement === null) {
      return false;
    }
    while (!el.parentElement.classList.contains(classTerm) && el !== null) {
      //now make el equal its parent.
      el = el.parentElement;
      //if el's parent NOW equals null, it means we're ne away from the root so return false, becasue we couldn't find any matches for classTerm.
      if (el.parentElement === null) {
        return false;
      }
    }
    return el.parentElement;
  }

  //JAVASCRIPT MODULES FOR DETACHED COMPONENTS
  var MODULE_MENU = function() {
    //Menu 1
    //convert nodelist to array for MS Edge fix
    var MOD_MENU_Button = [].slice.call(document.querySelectorAll(".MOD_MENU_Button"));
    MOD_MENU_Button.forEach(function(i) {
      i.addEventListener("click", toggleMenu);
    });

    function toggleMenu(event, el) {
      //if we've clicked a main menu burger button, make 'el' the main Menu_List of that menu
      //IMPROVEMENT: UTILITY FUNCTION THAT FETCHES MATCHING NEIGHBOURING NODES INSTEAD OF RELYING ON THE BELOW THAT AP_Menu_List IS THE VERY NEXT ELEMENT.
      if (event !== null && this.nextElementSibling.className === "AP_Menu_List") {
        el = this.nextElementSibling;
      }
      var heightPixels = el.style.height;
      var heightInt = heightPixels.substr(0, heightPixels.length - 2);
      //if the height is greater than 0, then we need to close the menu:
      if (heightInt > 0) {
        el.style.overflow = "hidden";
        el.style.height = "0px";
      } else {
        el.style.height = el.scrollHeight + "px";
      }
    }

    //Create the submenu buttons for menu1
    //grab 'li' children
    var MOD_MENU_Li = document.querySelectorAll(".MOD_MENU_Nav ul li");
    for (var _iterator = Array.from(MOD_MENU_Li), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var li = _ref;

      var subMenu = li.getElementsByTagName("ul");
      //if there is a submenu present
      if (subMenu.length > 0) {
        li.classList.add("hasSubmenu");
        var subMenuToggle = createEl("button", "subMenuToggle", li, null, "▼");
        subMenuToggle.setAttribute("aria-label", "Open Submenu");
        subMenuToggle.setAttribute("title", "Open Submenu");
      }
    }
    return {
      toggleMenu: toggleMenu
    };
  }();
  var MODULE_LIGHTBOX = function() {
    //Lightbox
    function lightboxCreate(aTag, imgsrc) {
      //make sure lightbox isn't open already
      if (document.querySelector(".AP_ligtbox_window")) {
        return;
      }

      var lb = createEl("div", "AP_ligtbox_window", document.body, null, null, null);
      lb.addEventListener("click", closeLightbox, false);

      var lbImg = createEl("div", "AP_ligtbox_img", lb);
      lbImg.style.backgroundImage = "url(" + imgsrc + ")";
      lbImg.setAttribute("role", "img");

      //Close button
      var closeBtn = createEl("button", "AP_ligtbox_close", lbImg, null, "×");
      closeBtn.setAttribute("aria-label", "Close");
      closeBtn.setAttribute("title", "Close");
      closeBtn.setAttribute("autofocus", "autofocus");

      //if there is a figcaption present, lets use it
      if (aTag.querySelector("figcaption")) {
        var caption = aTag.querySelector("figcaption").textContent;
        var captionEl = createEl("p", "AP_lightbox_Caption", lbImg, null, caption);
        lbImg.setAttribute("aria-label", caption);
        //if adding aria-label to img, then add aria-hidden to the p tag to prevent duplication
        captionEl.setAttribute("aria-hidden", true);
      }

      //remove lightbox
      function closeLightbox() {
        while (lb.firstChild) {
          lb.removeChild(lb.firstChild);
        }
        lb.parentNode.removeChild(lb);
      }
    }
    return {
      lightboxCreate: lightboxCreate
    };
  }(); //END MODULE_LIGHTBOX

  //Accordion
  var MODULE_ACCORDION = function() {
    // setAutoTimer will hold the setTimeout timer for switching the panels height to 'auto' when the CSS transition has finished. It is an object as it needs to be accessible throughout this module.
    var setAutoTimer = {};
    var MODULE_ACCORDION_Panels = document.querySelectorAll(".AP_accordion_panel");
    //collapse all tab panels to begin with
    for (var _iterator2 = Array.from(MODULE_ACCORDION_Panels), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var i = _ref2;

      i.style.height = 0;
    }
    //accordionManager is called whenever an accordion tab is clicked
    function accordionManager(el) {
      if (el.nextElementSibling.classList.contains("AP_accordion_panel")) {
        (function() {
          //toggle .open class on clicked tab
          el.classList.toggle("open");
          //toggle height of accordion panel
          var panel = el.nextElementSibling;
          if (parseInt(panel.style.height, 10) > 0 || panel.style.height === "auto") {
            //When we close the draws we need make sure the height is an actual number, not "auto", this is because CSS transitions can't animate from a value of "auto".  First we cancel any timers that are waiting 0.3s for the CSS transition to finish.
            clearTimeout(setAutoTimer.timer);
            // Second, we set the current style height to the same value as the scrollheight.
            panel.style.height = panel.scrollHeight + "px";

            // Third, we create a promise to listen for when the style height matches the scrollHeight value. Without the promise this would all happen in a split second and the CSS will begin animating from "auto" and not the value of scrollHeight.
            var p = new Promise(function(resolve, reject) {
              if (panel.style.height === panel.scrollHeight + "px") {
                resolve();
              }
            });

            p.then(function() {
              panel.style.height = "0";
            });
          } else {
            panel.style.height = panel.scrollHeight + "px";
            //wait 0.3s for CSS transition to finish before settings height to "auto"
            setAutoTimer.timer = setTimeout(function() {
              panel.style.height = "auto";
            }, 300);
          }
        })();
      }
    }
    return {
      accordionManager: accordionManager
    };
  }();
})(); //END MAIN IIFE
