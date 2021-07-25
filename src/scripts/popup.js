document.addEventListener('DOMContentLoaded', function () {
    let elementsArray = document.querySelectorAll(".btn-build");
    
    elementsArray.forEach(function (elem) {
        onBuildClick(elem);
    });
}, false);

function onBuildClick(btn) {
    btn.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!isCorrectUrl(tab.url)) {
            executeFunction(tab.id, invalidUrlAlert);
        }
        else {
            executeFunction(tab.id, searchBuild);
            window.close();
        }
    }, false);
}

function searchBuild() {
    document.getElementsByClassName("tab")[1].click();
    let searchInput = document.querySelector('[placeholder="Search parts and abilities"]');

    setTimeout(() => {
        searchInput.focus();
        contains("h6.text-gray-1", "Tail Slap")[0].click();
        contains("h6.text-gray-1", "Swift Escape")[0].click();
        contains("h6.text-gray-1", "Star Shuriken")[1].click();
        contains("h6.text-gray-1", "Fish Hook")[0].click();

        searchInput.blur();
    }, 500);

    let f = function contains(selector, text) {
        var elements = document.querySelectorAll(selector);
        return [].filter.call(elements, function (element) {
            return RegExp('/^' + text + '$/').test(element.textContent);
        });
    }

    function contains(selector, text) {
        var elements = document.querySelectorAll(selector);
        return [].filter.call(elements, function (element) {
            return RegExp(text).test(element.textContent);
        });
    }
}

// Checks for invalid websites
function executeFunction(tabId, functionRef) {
    chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        function: functionRef
    });
}

function isCorrectUrl(url) {
    return url.startsWith('https://marketplace.axieinfinity.com');
}

function invalidUrlAlert() {
    alert("Only use this extension on Axie Marketplace!");
}