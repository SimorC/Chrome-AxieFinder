chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        resetBuild();

        switch (request.targetId) {
            case 'fish-1':
                searchFish1Build();
                break;
            default:
                sendResponse({ status: 'Build not implemented/found ):' });
        }

        sendResponse({ status: 'All good!' });
    }
);

function searchFish1Build() {
    document.getElementsByClassName('tab')[1].click();
    let searchInput = document.querySelector('[placeholder="Search parts and abilities"]');

    setTimeout(() => {
        searchInput.focus();
        findByContent('h6.text-gray-1', 'Tail Slap')[0].click();
        findByContent('h6.text-gray-1', 'Swift Escape')[0].click();
        findByContent('h6.text-gray-1', 'Star Shuriken')[1].click();
        findByContent('h6.text-gray-1', 'Fish Hook')[0].click();

        searchInput.blur();
        changeStats('Speed', 55, 61);
    }, 500);
}

function changeStats(stat, floor, ceiling) {
    document.getElementsByClassName('tab')[2].click();

    // TODO: No idea how to do the sliders, so that's going to be it for now
    let statElem = findByContent('.tracking-1', stat)[0];
    statElem.textContent += ' (' + floor + ' ~ ' + ceiling + ')';
}

function resetBuild() {
    document.getElementsByClassName('tab')[0].click();
    document.querySelector('.items-end .text-primary-4').click();
}

function findByContent(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, (element) => {
        return RegExp(text).test(element.textContent);
    });
}