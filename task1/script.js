let images = document.querySelectorAll('.img');
let h2Date = document.createElement('h2');
document.body.insertBefore(h2Date, document.getElementById('wrapper'));
let h2Count = document.createElement('h2');
document.body.insertBefore(h2Count, document.getElementById('wrapper'));
let delImagesAlts = JSON.parse(localStorage['delImagesAlts'] ? localStorage['delImagesAlts'] : '[]'); //Масив удаленных изображений
let delImagesCount = JSON.parse(localStorage['delImagesCount'] ? localStorage['delImagesCount'] : document.getElementsByClassName('img').length);
let modalWind = document.getElementById('modalWind');


let modalImg = document.getElementById('modalImg');
images.forEach(img => {
    img.onclick = function() { //увелечение по клику
        modalWind.style.display = "block";
        modalImg.src = this.src;

    }
    if (delImagesAlts.includes(img.alt)) {
        let item = img.nextElementSibling; //кнопка удаления изображения
        img.style.display = 'none';

        item.style.display = 'none';
    }

});
let getDateTime = function() {
    let today = new Date()
    let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);

    let date = day + '.' + month + '.' + today.getFullYear();
    let hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    let minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    let time = hour + ":" + minutes;
    return date.toString() + '  ' + time.toString();
};
let getData = function() {
    setInterval(function() { //обновление времени и счетчика изображений
        h2Date.innerHTML = getDateTime();
        h2Count.innerHTML = 'На странице всего ' + delImagesCount + ' изображений. <br> '
    })



};
getData();

let del = document.querySelectorAll('.delete');

del.forEach(span => {
    span.onclick = function() { //удаление по клику
        let item = span.previousElementSibling;
        item.style.display = 'none';
        item.className = '';
        delImagesCount--;
        localStorage['delImagesCount'] = JSON.stringify(delImagesCount);

        span.style.display = 'none';
        if (!delImagesAlts.includes(item.alt)) {
            delImagesAlts.push(item.alt);
            localStorage['delImagesAlts'] = JSON.stringify(delImagesAlts);
        }


    }
})

let modalClose = document.getElementById('modalClose');
modalClose.onclick = function() {
    modalWind.style.display = "none";
};
document.getElementById('restore').onclick = function() {
    images.forEach(img => {


        let item = img.nextElementSibling;
        img.style.display = '';
        item.style.display = '';
        img.className = 'img';


    });
    delImagesAlts = [];
    delImagesCount = document.getElementsByClassName('img').length;

    localStorage.clear();
}