chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        resetBuild();

        switch (request.targetId) {
            case 'fish-1':
                searchFish1Build();
                break;
            case 'plant-1':
                searchPlant1Build();
                break;
            case 'beast-1':
                searchBeast1Build();
            default:
                sendResponse({ status: 'Build not implemented/found ):' });
        }

        sendResponse({ status: 'All good!' });
    }
);

/// Page manipulation
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

/// Builds
function searchParts(parts) {
    parts.forEach(part => {
        findByContent('h6.text-gray-1', part.name)[part.index].click();
    });
}

// Fish
function searchFish1Build() {
    document.getElementsByClassName('tab')[1].click();
    let searchInput = document.querySelector('[placeholder="Search parts and abilities"]');

    setTimeout(() => {
        searchInput.focus();
        searchParts([
            { name: 'Tail Slap', index: 0 },
            { name: 'Swift Escape', index: 0 },
            { name: 'Star Shuriken', index: 1 },
            { name: 'Fish Hook', index: 0 }
        ]);

        searchInput.blur();
        changeStats('Speed', 55, 61);
    }, 500);
}

// Plant
function searchPlant1Build() {
    document.getElementsByClassName('tab')[1].click();
    let searchInput = document.querySelector('[placeholder="Search parts and abilities"]');

    setTimeout(() => {
        searchInput.focus();
        searchParts([
            { name: 'October Treat', index: 0 },
            { name: 'Vegetal Bite', index: 1 }
        ]);

        searchInput.blur();
        changeStats('Speed', 27, 31);
        changeStats('Health', 60, 61);
    }, 500);
}

// Beast
function searchBeast1Build() {
    document.getElementsByClassName('tab')[1].click();
    let searchInput = document.querySelector('[placeholder="Search parts and abilities"]');

    setTimeout(() => {
        searchInput.focus();

        searchCommonBeastBuild(searchInput, { name: 'Night Steal', index: 0 });
    }, 500);
}

function searchCommonBeastBuild(searchInput, tail) {
    searchParts([
        { name: 'Single Combat', index: 1 },
        { name: 'Sinister Strike', index: 0 },
        tail
    ]);

    searchInput.blur();
    changeStats('Morale', 60, 61);
}