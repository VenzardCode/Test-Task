//Страница хранит иторию чекбоксов для каждой страны
let baseURL = 'http://universities.hipolabs.com/search?country=';
let lastSerch = JSON.parse(localStorage['lastSerch'] ? localStorage['lastSerch'] : '[]');
let table = document.getElementById("table")
let check = null;
let bCount = document.getElementById('bCount'); //Количестов отмеченных боксов

if (localStorage['lastSerch']) {
    onSearch(JSON.parse(localStorage['lastSerch']))
}
async function onSearch(country) {
    let url = baseURL + encodeURIComponent(country);
    try {
        let response = await fetch(url);
        if (response.status == 200) {
            let json = await response.json();

            if (json.length != 0) {
                lastSerch = country;
                if (localStorage[country] == null) {
                    localStorage[country] = '[]';
                }
                bCount.innerHTML = JSON.parse(localStorage[country]).length; //Обновление счечика 
                localStorage['lastSerch'] = JSON.stringify(lastSerch);
                let id = 1;
                //Хедер
                let text = "<table border='1'><tr><td>ID</td><td>Name</td><td>Country</td><td>Web pages</td><td>Alpha two code</td><td>State province</td><td>Domains</td><td>Сохранить в мой список</td><tr>"
                for (let j in json) { //формирование таблицы

                    text += "<tr><td>" + id++ + "</td>"; //id
                    text += "<td>" + json[j].name + "</td>"; //имя
                    text += "<td>" + json[j].country + "</td>"; //страна
                    text += "<td>"
                    for (let web_page in json[j].web_pages) { //web-страница

                        text += "<a href=" + json[j].web_pages[web_page] + ">" + json[j].web_pages[web_page] + "</a>" + " "
                    }
                    text += "</td>";
                    text += "<td>" + json[j].alpha_two_code + "</td>"; //Код
                    text += "<td>" + json[j]['state-province'] + "</td>"; //Штат / провинция
                    text += "<td>"
                    for (let domain in json[j].domains) {
                        text += json[j].domains[domain] + ' '
                    }
                    text += "</td>";
                    text += "<td><input type='checkbox' class='check'></td></tr>"; //CheckBox

                }
                text += "</table>"
                table.innerHTML = text;

                check = document.querySelectorAll(".check");
                check.forEach(box => {
                    let id = box.parentElement.parentElement.children[0].innerText; //id Строки
                    if (JSON.parse(localStorage[country]).includes(id)) {
                        box.defaultChecked = true;
                    }


                    box.onchange = function() {
                        if (box.checked) {

                            localStorage[country] = JSON.stringify(arrayAdd(JSON.parse(localStorage[country]), id)); //добавление id строки в localStorage
                        }
                        if (!box.checked) {

                            localStorage[country] = JSON.stringify(arrayRemove(JSON.parse(localStorage[country]), id)); //удаление id строки в localStorage

                        }
                        bCount.innerHTML = JSON.parse(localStorage[country]).length; //Обновление счечика 


                    }
                });
            } else {
                alert('Country not found');
            }
        }
        if (response.status >= 400 && response.status < 600) {
            throw new Error("Bad response from server");
        }


    } catch (error) {
        console.log(error);
    }
}
let send = document.getElementById('send');
let userInput = document.getElementById('userInput');
let reset = document.getElementById('reset');


send.onclick = function() {
    onSearch(userInput.value);

}
reset.onclick = function() {
    table.innerHTML = "";
    bCount.innerHTML = 0;


}



function arrayRemove(arr, value) {

    return arr.filter(function(ele) {
        return ele != value;
    });
}

function arrayAdd(arr, value) {
    arr.push(value);
    return arr
}