const bodyElement = document.querySelector('body');

// Scroll Tracker timeline (Done)

function scrollTracker() {
    const scrollTracker = document.querySelector('.scrolltracker__bar--progress');
    // const windowHeight = document.querySelector('body').offsetHeight;
    window.addEventListener('scroll', function () {
        let coordY = window.scrollY;
        let percent = 100 * coordY / (document.body.offsetHeight - window.innerHeight);
        scrollTracker.style.width = `${percent}%`;
    })
}
scrollTracker();

// Loading Page

function loadingPage() {
    if (bodyElement.classList.contains('homepage')) {

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
}



window.addEventListener('load', function () {
    loadingPage();
    handleUserSay();
})

function handleUserSay() {
    if (bodyElement.classList.contains('homepage')) {
        let item = document.querySelector('.users__say');
        const userElement = document.querySelectorAll('.users__say--item');
        let flickity = new FlickityResponsive(item, {
            cellAlign: 'center',
            contain: true,
            groupCells: 2,
            prevNextButtons: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        groupCells: 1,
                        cellAlign: 'left'
                    }
                }
            ],
            on: {
                ready: function () {
                    console.log('Flickity is ready');
                    // let maxHeight = getMaxHeight();
                    // console.log(maxHeight);
                    // for (let i = 0; i < userElement.length; i++) {
                    //     userElement[i].style.height = `${maxHeight}px`;
                    // }
                },
                change: function (index) {
                    console.log('Slide changed to' + index);
                }
            }
        });

        function getMaxHeight() {
            let max = 0;
            for (let i = 0; i < userElement.length; i++) {
                if (userElement[i].clientHeight > max) {
                    max = userElement[i].clientHeight;
                }
            }
            return max;
        }
    }
}


function handleHeader() {
    window.addEventListener('scroll', function () {
        let coordY = window.scrollY;
        if (coordY > 112) {
            document.querySelector('.header').classList.add('--bg-dblue');
        }
        else {
            document.querySelector('.header').classList.remove('--bg-dblue');
        }
    })
}
handleHeader();

// Toggle menu mobile

function handleMenuMobile() {
    const hamburgerElement = document.querySelector('.header__btn--hamburger');


    hamburgerElement.addEventListener('click', function () {
        hamburgerElement.classList.toggle('--active');
        document.querySelector('.nav-mobile').classList.toggle('active');
        document.querySelector('body').classList.toggle('--disable-scroll');
        document.querySelector('.header').classList.toggle('--bg');
        document.querySelector('.header').classList.remove('--bg-dblue');
    })
    window.addEventListener('resize', function () {
        if (document.body.clientWidth > 1000) {
            hamburgerElement.classList.remove('--active');
            bodyElement.classList.remove('--disable-scroll');
            document.querySelector('.nav-mobile').classList.remove('active');
        }
    })
}
handleMenuMobile();

// Click to open video popup (Done)

function openVideo() {
    if (bodyElement.classList.contains('homepage')) {
        let btnVideo = document.querySelector('.started__video');
        let pathElement = document.querySelector('.video__frame iframe');
        const popupVideoElement = document.querySelector('.popupvideo');

        btnVideo.setAttribute('data-key', 'JiOoPg_u6TU');
        btnVideo.addEventListener('click', e => {
            pathElement.setAttribute('src', `https://www.youtube.com/embed/${btnVideo.getAttribute('data-key')}?autoplay=1`);
            e.stopPropagation();
            popupVideoElement.classList.toggle('--show');
        })

        document.addEventListener('click', function () {
            popupVideoElement.classList.remove('--show');
            pathElement.setAttribute('src', '');
        })
    }
}
openVideo();

function handleBackToTop() {
    window.addEventListener('scroll', function () {
        let coordY = window.scrollY;
        if (coordY > document.body.scrollHeight / 2) {
            document.querySelector('.backtotop').classList.add('--active');
        }
        else {
            document.querySelector('.backtotop').classList.remove('--active');
        }
    })

    document.querySelector('.backtotop').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}
handleBackToTop();

function handlePostTab() {
    if (bodyElement.classList.contains('blogpage')) {

        const tabsElement = document.querySelectorAll('.tabs__item');
        const postListElement = document.querySelectorAll('.wrap');
        tabsElement.forEach((param) => {
            param.addEventListener('click', function () {
                // console.log(1);
                tabsElement.forEach(param => {
                    param.classList.remove('active');
                })
                this.classList.add('active');

                postListElement.forEach((param) => {
                    param.classList.remove('active');
                })

                let id = param.getAttribute('data-tab');

                // console.log(id);

                document.querySelector(`.post_tab-${id}`).classList.add('active');
            })
        })
    }
}
handlePostTab();

function handleAccordion() {
    let accElement = document.querySelectorAll('.accordion__content--title')
    const panelElement = document.querySelectorAll('.accordion__content--panel');

    accElement.forEach((param, index) => {
        param.addEventListener('click', function () {
            accElement.forEach((param, _index) => {
                if (index === _index) return
                param.classList.remove('active');
                param.nextElementSibling.style.maxHeight = null
            })
            this.classList.toggle('active');
            if (panelElement[index].style.maxHeight)
                panelElement[index].style.maxHeight = null
            else
                panelElement[index].style.maxHeight = `${panelElement[index].scrollHeight}px`;
        })
    })
}
handleAccordion()

function handleForm() {
    if (bodyElement.classList.contains('contactpage')) {

        const inputElement = document.querySelectorAll('.form-group input');
        const formElement = document.querySelector('.git__content--form');
        const messElement = document.querySelector('#mess');
        const mailElement = document.querySelector('#mail');
        const errorMessage = document.querySelectorAll('.error-message');

        function isRequired(element, index) {
            if (element.value === '') {
                errorMessage[index].classList.add('--is-empty');
                inputElement[index].classList.add('--is-empty');
                errorMessage[index].innerHTML = 'Please fill in this field!';
            } else {
                errorMessage[index].classList.remove('--is-empty');
                inputElement[index].classList.remove('--is-empty');
                errorMessage[index].innerHTML = '';
            }
        }

        function isEmail(element = '') {
            if (element.includes('@') === false) {
                errorMessage[1].classList.add('--is-empty');
                errorMessage[1].innerHTML = 'Please enter a correct email address!';
            }
        }

        formElement.addEventListener('submit', function (e) {
            e.preventDefault();
            inputElement.forEach((param, index) => {
                isRequired(param, index);
            })

            if (messElement.value === '') {
                errorMessage[4].classList.add('--is-empty');
                messElement.classList.add('--is-empty');
                errorMessage[4].innerHTML = 'Please fill in this field!';
            } else {
                errorMessage[4].classList.remove('--is-empty');
                messElement.classList.remove('--is-empty');
                errorMessage[4].innerHTML = '';
            }

            if (mailElement.value !== '') {
                isEmail(mailElement.value);
            }
        })

        inputElement.forEach((param, index) => {
            param.addEventListener('keydown', function () {
                errorMessage[index].classList.remove('--is-empty');
                errorMessage[index].innerHTML = '';
            })

            param.addEventListener('blur', function () {
                isRequired(param, index);
            })

            param.addEventListener('input', function () {
                param.classList.add('--is-typing');
            })
        })

        messElement.addEventListener('blur', function () {
            if (messElement.value === '') {
                errorMessage[4].classList.add('--is-empty');
                messElement.classList.add('--is-empty');
                errorMessage[4].innerHTML = 'Please fill in this field!';
            } else {
                errorMessage[4].classList.remove('--is-empty');
                messElement.classList.remove('--is-empty');
                errorMessage[4].innerHTML = '';
            }
        })
        messElement.addEventListener('input', function () {
            messElement.classList.add('--is-typing');
        })

        mailElement.addEventListener('blur', function () {
            if (mailElement.value !== '') {
                isEmail(mailElement.value);
            }
        })
    }
}
handleForm();
