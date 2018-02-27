/*!
* myMandir.js
*/

// MyMandir Class
(function(window) {
    "use strict";

    function instance() {
      var MyMandir = {};

      MyMandir.isAndroid = function() {
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1;
        return isAndroid;
      };

      MyMandir.isMiniApp = function() {
        return typeof mymandirApp !== "undefined";
      };

      MyMandir.isFBSDKAvailable = function() {
        return typeof FB !== "undefined";
      };

      MyMandir.shareWhatsapp = function(shareString) {
        if (MyMandir.isMiniApp()) {
          mymandirApp.shareOnWhatsApp(shareString);
        } else {
          var whatsappHref = "whatsapp://send?text=" + shareString;
          window.location.href = whatsappHref;
        }
      };

      MyMandir.shareFacebook = function(shareString) {
        if (MyMandir.isMiniApp()) {
          mymandirApp.shareOnFacebook(shareString);
        } else if (MyMandir.isFBSDKAvailable()) {
          // This works only in web browsers
          FB.ui(
            {
              method: "share",
              href: shareString
            },
            function(response) {
              console.log("Shared on facebook!");
            }
          );
        } else {
          FB.ui(
            {
              method: "share",
              href: shareString
            },
            function(response) {
              console.log("Shared on facebook!");
            }
          );
        }
      };

      MyMandir.showToastMessage = function(message, longDuration) {
        if (MyMandir.isMiniApp()) {
          mymandirApp.makeToast(message, longDuration);
        } else {
          alert(message);
        }
      };

      MyMandir.openExternal = function(url) {
        if (MyMandir.isMiniApp()) {
          mymandirApp.openExternalLink(url);
        } else {
          window.location.href = url;
        }
      };

      MyMandir.openAppScheme = function(appURIScheme, appEventName) {
        if (MyMandir.isMiniApp()) {
          mymandirApp.openURISchemeWithEvent(appURIScheme, appEventName);
        }
        return;
      };

      return MyMandir;
    }

    if (typeof MyMandir === "undefined") {
      window.MyMandir = instance();
    }
  })(window);



  var jqs = function(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split("&");
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split("=");
      if (sParameterName[0] === sParam) {
        return sParameterName[1];
      }
    }
  };

  window.jqs = jqs;

  var name = decodeURI(jqs("name"));
  console.log("NAME:", name);

  if (typeof jqs("name") === "undefined") {
    name = "";
  }

  var showNotification = function() {
  clevertap.notifications.push({
    "titleText":'Would you like to receive Push Notifications?',
    "bodyText":'We promise to only send you relevant content and give you updates on your transactions',
    "okButtonText":'Sign me up!',
    "rejectButtonText":'No thanks',
    "skipDialog":true,
    "okButtonColor":'#f28046'});
  };

  var toggleModuleInitial = function() {
    // $(".create-module").show();
    // $(".share-module").hide();
    document.querySelector(".create-module").style.display = "block";
    document.querySelector(".share-module").style.display = "none";

  };

  toggleModuleInitial();

  var toggleModuleAfterCreation = function() {
    // $(".create-module").hide();
    // $(".share-module").show();
    document.querySelector(".create-module").style.display = "none";
    document.querySelector(".share-module").style.display = "flex";
  };

  var checkName = function() {
    if (name.length !== 0) {
      name = name.replace(/-/g, " ");
      console.log("name is there", name);

      // $("#show-name").html(name);
      document.querySelector("#show-name").innerHTML = name;
      // $(".wishes").show();
    document.querySelector(".wishes").style.display = "block";
    // document.querySelector(".pyro").style.display = "block";


    } else {
      console.log("name NOT there");
      // $(".wishes").hide();
      document.querySelector(".wishes").style.display = "none";

    }
  };

  checkName();

  if (typeof mymandirApp !== "undefined") {
    var userid = mymandirApp.getUserId();
    fetch("https://api.mymandir.com/user/get?user=" + userid)
      .then(function(blob) {
        return blob.json();
      })
      .then(function(resp) {
        console.log("RESP", resp.name);
        if (resp.status === "verified") {
          name = '';
        }
      })
      .then(checkName);
  }

  var formModal = document.getElementById("form-modal");

  function formModalToggler() {
    formModal.classList.toggle("open");
  }
  // $(".show-form-btn").on("click", function() {
  document.querySelector(".show-form-btn").addEventListener('click', function() {
    formModalToggler();
  });

  // $(".close-form-btn").on("click", function() {
  document.querySelector(".close-form-btn").addEventListener('click', function() {
    formModalToggler();
  });

  document.getElementById("my-form").addEventListener("submit",  function(e) {
    e.preventDefault();
    console.log("trying to submit");
    if(!document.querySelector("#name-input").checkValidity()) {
      console.log("not submitting");
      return;
    }
    // document.querySelector(".pyro").style.display = "block";
    // // name = $("#name-input").val();
    name = document.querySelector("#name-input").value;
    // $("#show-name").html(name);
    document.querySelector("#show-name").innerHTML = name;
    // $("#name-input").val("");
    document.querySelector("#name-input").value = '';
    // $(".wishes").css("display", "block");
    document.querySelector(".wishes").style.display = "block";
    formModalToggler();
    // $(".views").scrollTop(0, 0);
    document.querySelector(".wishes").style.display = "block";
    document.querySelector(".views").scrollTop = 0;
    toggleModuleAfterCreation();
  });


  var shareActionWA = function() {
    var shareString = "";
    var whatsappHref;
    shareString += "महाकाल भक्त *"+name+"* ने आपको *महाशिवरात्रि* की शुभकामनाएं भेजी हैं। %0A देखने के लिए अभी ब्लू लाइन को टच करें। %0A 👉";
    shareString +=
      (window.location.href.split("?")[0] + "?name=" + name)
        .replace("#", "")
        .replace(/ /g, "-") +
      "%0A %0Amymandir ऐप्प डाउनलोड करें: https://goo.gl/QmFxeY";
    if (typeof mymandirApp !== "undefined") {
      console.log("shareString", shareString);
      mymandirApp.shareOnWhatsApp(shareString.replace(/%0A/g, "\n"));
    } else if (MyMandir.isAndroid()) {
      console.log("shareString", shareString);
      whatsappHref = "whatsapp://send?text=" + shareString;
      console.log("whatsAppref", whatsappHref);
      window.location.href = whatsappHref;
    } else {
      console.log("shareString", shareString);
      whatsappHref = "whatsapp://send?text=" + shareString;
      console.log("whatsAppref", whatsappHref);
      window.location.href = whatsappHref;
    }
    showNotification();
  };

  var shareActionFB = function() {
    name = name.replace(/ /g, "-");
    var shareString = (
      window.location.href.split("?")[0] +
      "?name=" +
      name
    ).replace("#", "");
    console.log(shareString);
    if (typeof mymandirApp !== "undefined") {
      mymandirApp.shareOnFacebook(shareString);
    } else if (MyMandir.isAndroid()) {
      FB.ui(
        {
          method: "share",
          href: shareString
        },
        function(response) {
          console.log("Shared on facebook!");
        }
      );
      // window.location.href = facebookHref;
    } else {
      FB.ui(
        {
          method: "share",
          href: shareString
        },
        function(response) {
          console.log("Shared on facebook!");
        }
      );
    }
    showNotification();
  };
