document.addEventListener('DOMContentLoaded', function () {
    debugger;

    var testButton = document.getElementById('testButton');

    testButton.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!isCorrectUrl(tab.url)) {
            executeAlert(tab.id, invalidUrlAlert);
        }
        else {
            executeAlert(tab.id, validUrlAlert);
        }
    }, false);
}, false);

function executeAlert(tabId, functionRef) {
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

function validUrlAlert() {
    alert("Axie Marketplace!");
}