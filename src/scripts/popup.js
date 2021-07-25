document.addEventListener('DOMContentLoaded', () => {
    let elementsArray = document.querySelectorAll('.btn-build');

    elementsArray.forEach((elem) => {
        onBuildClick(elem);
    });
}, false);

function onBuildClick(btn) {
    btn.addEventListener('click', async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!isCorrectUrl(tab.url)) {
            executeFunction(tab.id, invalidUrlAlert);
        }
        else {
            sendClickMessage(tab.id, btn.id);
            window.close();
        }
    }, false);
}

// Checks for invalid websites
function sendClickMessage(tabId, targetId) {
    chrome.tabs.sendMessage(tabId, { targetId: targetId }, (response) => {
        console.log(response.status);
    });
}

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
    alert('Only use this extension on Axie Marketplace!');
}