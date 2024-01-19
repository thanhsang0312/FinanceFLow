const bodyElement = document.querySelector('body');

// Scroll Tracker timeline (Done)

function scrollTracker() {
    const scrollTracker = document.querySelector('.scrolltracker__bar--progress');
    const windowHeight = document.querySelector('.homepage').scrollHeight;
    window.addEventListener('scroll', function () {
        let coordY = window.scrollY;
        let percent = 100 * coordY / (windowHeight - window.innerHeight);
        scrollTracker.style.width = `${percent}%`;
    })
}
scrollTracker();

// Loading Page

function loadingPage() {
    let loadedCount = 0;
    let imagesCount = document.querySelectorAll('img').length;

    let imgLoaded = imagesLoaded(bodyElement);

    imgLoaded.on('progress', (instance) => {
        loadedCount++;
        percent = Math.floor((loadedCount / imagesCount) * 100);
        progressBar(percent);
    }).on('always', (instance) => {
        console.log('always');
    }).on('fail', (instance) => {
        console.log('fail');
    }).on('done', (instance) => {
        console.log('done');
        hideLoading();
    })
}

function progressBar(percent) {
    const progressElement = document.querySelector('.loading__inner--progress');
    const percentLoading = document.querySelector('.loading__percent');
    progressElement.style.width = `${percent}%`;
    percentLoading.innerHTML = `${percent}%`;
}

function hideLoading() {
    const loadingElement = document.querySelector('.loading');
    loadingElement.classList.add('--is-loaded');
    bodyElement.classList.remove('--disable-scroll');
}

window.addEventListener('load', function () {
    loadingPage();
})

function handleUserSay() {
    let item = document.querySelector('.users__say');
    const userElement = document.querySelectorAll('.users__say--item');
    let flickity = new Flickity(item, {
        cellAlign: 'center',
        contain: true,
        groupCells: 2,
        prevNextButtons: false,
        on: {
            ready: function () {
                console.log('Flickity is ready');
            },
            change: function (index) {
                console.log('Slide changed to' + index);
            }
        }
    });

}
handleUserSay();

function handleHeader() {
    window.addEventListener('scroll', function () {
        let coordY = window.scrollY;
        if (coordY > document.querySelector('.hero__img').offsetTop) {
            document.querySelector('.header').classList.add('--bg');
        }
        else {
            document.querySelector('.header').classList.remove('--bg');
        }
    })
}
handleHeader();
