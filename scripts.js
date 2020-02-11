
//1. Возможности менять скорость воспроизведения (playbackRate)
// 2. Возможности перематывать +25 секунд / -10 секунд (currentTime)
// 3. Изменение иконочки с play на pause и обратно. ( ►  /  ❚ ❚  - это шрифтовые иконки, можете скопировать их в код)
// Доп задачи
// 4. Реализуйте перематывание видоса. Когда вы зажимаете прогресс бар и меняете текущее время.
// 5. Отображайте текущее время  и общее время видоса.

const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const progressBar = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');
const play = document.querySelector('.player__button');
const time = document.querySelector('#time');
const allTime = document.querySelector('#all-time');
const volume = document.querySelector('[name="volume"]');
const input= document.querySelectorAll('.player__slider');
const timePlay = document.querySelectorAll('[name="timePlay"]');
// playbackRate - home

function toggleVideo() {
    allTime.value = timeVideo(video.duration);
    if(video.paused) {
        play.textContent = '❚❚';
        video.play();
    } else {
        play.textContent = '►';
        video.pause();
    }
}

timePlay.forEach((time) => {
    time.addEventListener('click', function () {
        video.currentTime = video.currentTime + parseInt(time.dataset.skip);
    });
});

input.forEach((element) => {
    element.addEventListener('input', function () {
        console.log(element.name);
        if (element.name === 'volume') {
            video.volume = element.value;
        } else if (element.name === 'playbackRate') {
            video.playbackRate = element.value;
        }
    });
});

function timeVideo(time){
    let seconds = Math.floor(time % 60),
        minutes = Math.floor((time / 60) % 60),
        hours = Math.floor((time / (60 * 60)) % 24);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    hours = (hours < 10) ? "0" + hours : hours;

    return hours + ":" + minutes + ":" + seconds;
}

toggle.addEventListener('click', toggleVideo);
video.addEventListener('timeupdate', function () {
    time.value = timeVideo(video.currentTime);
    progressBar.style.flexBasis = video.currentTime * 100 / video.duration + '%';
});

progress.addEventListener('click', function (event) {
   let clickTime = event.offsetX * 100 / parseFloat(progress.offsetWidth);
   video.currentTime = video.duration * clickTime / 100;
   progressBar.style.flexBasis = clickTime + '%';
});
