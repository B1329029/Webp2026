var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

var allData = [];
var filteredData = [];
var currentPage = 1;
var pageSize = 10;

var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();

xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        var dataset = JSON.parse(this.responseText);
        allData = dataset;
        filteredData = dataset;
        renderTable();
    }
};

function renderTable() {
    delOldData();

    var start = (currentPage - 1) * pageSize;
    var end = start + pageSize;
    var pageData = filteredData.slice(start, end);

    var tbody = document.querySelector("#csie tbody");

    pageData.forEach(function (data) {
        var row = tbody.insertRow();

        var title = data.title || "無資料";
        var location = (data.showInfo && data.showInfo[0]) ? data.showInfo[0].location : "無資料";
        var price = (data.showInfo && data.showInfo[0]) ? data.showInfo[0].price : "無資料";

        row.insertCell(0).innerHTML = title;
        row.insertCell(1).innerHTML = location;
        row.insertCell(2).innerHTML = price;
    });

    updatePageInfo();
}

function nextPage() {
    if (currentPage * pageSize < filteredData.length) {
        currentPage++;
        renderTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function updatePageInfo() {
    var totalPage = Math.ceil(filteredData.length / pageSize) || 1;
    document.getElementById("pageInfo").innerText =
        "第 " + currentPage + " 頁 / 共 " + totalPage + " 頁";
}

function searchByName(keyword) {
    currentPage = 1;

    filteredData = allData.filter(function (data) {
        return data.title && data.title.includes(keyword);
    });

    renderTable();
}

function delOldData() {
    var tbody = document.querySelector("#csie tbody");
    tbody.innerHTML = "";
}
