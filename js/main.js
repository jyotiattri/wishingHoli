/*!
* main.js
*/

// MyWishes Class
(function(window) {
    "use strict";

    function instance() {
        var MyWishes = {};

        MyWishes.isAndroid = function() {
            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1;
            return isAndroid;
        };

        MyWishes.isMiniApp = function() {
            return typeof mywishesApp !== "undefined";
        };

        MyWishes.isFBSDKAvailable = function() {
            return typeof FB !== "undefined";
        };

        MyWishes.shareWhatsapp = function(shareString) {
            if (MyWishes.isMiniApp()) {
                mywishesApp.shareOnWhatsApp(shareString);
            } else {
                var whatsappHref = "whatsapp://send?text=" + shareString;
                window.location.href = whatsappHref;
            }
        };

        MyWishes.shareFacebook = function(shareString) {
            if (MyWishes.isMiniApp()) {
                mywishesApp.shareOnFacebook(shareString);
            } else if (MyWishes.isFBSDKAvailable()) {
                // This works only in web browsers
                FB.ui(
                    {
                        method: "share",
                        href: shareString
                    },
                    function(response) {
                        // console.log("Shared on facebook!");
                    }
                );
            } else {
                FB.ui(
                    {
                        method: "share",
                        href: shareString
                    },
                    function(response) {
                        // console.log("Shared on facebook!");
                    }
                );
            }
        };

        MyWishes.showToastMessage = function(message, longDuration) {
            if (MyWishes.isMiniApp()) {
                mywishesApp.makeToast(message, longDuration);
            } else {
                alert(message);
            }
        };

        MyWishes.openExternal = function(url) {
            if (MyWishes.isMiniApp()) {
                mywishesApp.openExternalLink(url);
            } else {
                window.location.href = url;
            }
        };

        MyWishes.openAppScheme = function(appURIScheme, appEventName) {
            if (MyWishes.isMiniApp()) {
                mywishesApp.openURISchemeWithEvent(appURIScheme, appEventName);
            }
            return;
        };

        return MyWishes;
    }

    if (typeof MyWishes === "undefined") {
        window.MyWishes = instance();
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

if (typeof jqs("name") === "undefined") {
    name = "";
}

var toggleModuleInitial = function() {
    document.querySelector(".create-module").style.display = "block";
    document.querySelector(".share-module").style.display = "none";
};

toggleModuleInitial();

var toggleModuleAfterCreation = function() {
    document.querySelector(".create-module").style.display = "none";
    document.querySelector(".share-module").style.display = "flex";
};

var checkName = function() {
    if (name.length !== 0) {
        name = name.replace(/-/g, " ");

        document.querySelector("#show-name").innerHTML = name;

        document.querySelector(".wishes").style.display = "block";
    } else {
        document.querySelector(".wishes").style.display = "none";
    }
};

checkName();

var formModal = document.getElementById("form-modal");

function formModalToggler() {
    formModal.classList.toggle("open");
}

document.querySelector(".show-form-btn").addEventListener("click", function() {
    formModalToggler();
});

document.querySelector(".close-form-btn").addEventListener("click", function() {
    formModalToggler();
});

document.getElementById("my-form").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!document.querySelector("#name-input").checkValidity()) {
        return;
    }

    name = document.querySelector("#name-input").value;

    document.querySelector("#show-name").innerHTML = name;

    document.querySelector("#name-input").value = "";

    document.querySelector(".wishes").style.display = "block";
    formModalToggler();
    document.querySelector(".wishes").style.display = "block";
    document.querySelector(".views").scrollTop = 0;
    toggleModuleAfterCreation();
});

var shareActionWA = function() {
    var shareString = "";
    var whatsappHref;
    shareString +=
        name +
        "* ने आपको * होली* की शुभकामनाएं भेजी हैं। %0A देखने के लिए अभी ब्लू लाइन को टच करें। %0A 👉";
    shareString += (window.location.href.split("?")[0] + "?name=" + name)
        .replace("#", "")
        .replace(/ /g, "-");
    if (typeof mywishesApp !== "undefined") {
        mywishesApp.shareOnWhatsApp(shareString.replace(/%0A/g, "\n"));
    } else if (MyWishes.isAndroid()) {
        whatsappHref = "whatsapp://send?text=" + shareString;
        window.location.href = whatsappHref;
    } else {
        whatsappHref = "whatsapp://send?text=" + shareString;
        window.location.href = whatsappHref;
    }
};

var shareActionFB = function() {
    name = name.replace(/ /g, "-");
    var shareString = (
        window.location.href.split("?")[0] +
        "?name=" +
        name
    ).replace("#", "");

    if (typeof mywishesApp !== "undefined") {
        mywishesApp.shareOnFacebook(shareString);
    } else if (MyWishes.isAndroid()) {
        FB.ui(
            {
                method: "share",
                href: shareString
            },
            function(response) {
                // console.log("Shared on facebook!");
            }
        );
    } else {
        FB.ui(
            {
                method: "share",
                href: shareString
            },
            function(response) {
                // console.log("Shared on facebook!");
            }
        );
    }
};
