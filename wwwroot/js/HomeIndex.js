"use strict";
//import Fetch = require ("./Fetch")
var Home = /** @class */ (function () {
    function Home() {
        this.ctrl = {
            employeeSelect: 'employeeSelect',
            modal: 'modal',
            entry: "entry",
            ID: "Id",
            hiddenEntry: "hiddenEntry",
            hiddenDelete: "hiddenDelete",
            LastName: "LastName",
            FirstName: "FirstName",
            FullNameKana: "FullNameKana",
            EntryYear: "EntryYear",
            EntryMonth: "EntryMonth",
            BirthDay: "BirthDay",
            Hobby: "Hobby",
        };
        this.name = {
            LastName: '姓',
            FirstName: '名',
            FullNameKana: "フルネームカナ",
        };
    }
    ;
    Home.prototype.init = function () {
        this.setup();
    };
    /**
     * サーバーに情報を送信する処理
     * @param URL
     * @param formData
     * @param message
     */
    Home.prototype.post = function (URL, formData, message) {
        var _this = this;
        // バックエンドへの送信
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(function (response) {
            if (response.ok) {
                alert(message + 'に成功しました。');
                var modal = document.getElementById(_this.ctrl.modal);
                if (modal != null) {
                    modal.style.display = "none";
                }
                // ✅ POST成功後にGETリクエストを実行
                return fetch('Home/AfterIndex', {
                    method: 'GET'
                });
            }
            else {
                throw new Error('Something went wrong');
            }
        })
            .then(function (getResponse) {
            if (!getResponse.ok) {
                throw new Error('GETリクエストに失敗しました');
            }
            return getResponse.text(); // もしくは .json() にする
        })
            .then(function (data) {
            // ✅ GETの結果を表示（ここは必要に応じて変えてOK）
            console.log('GETレスポンス:', data);
            // たとえば表示更新したいなら DOM 操作をここに入れる
            _this.updateEmployeeList(data);
        })
            .catch(function (error) {
            console.error('エラー:', error);
        });
    };
    /**
     * 一覧にカードを再描画する
     * @param data  一覧の情報を格納したJSON
     * @returns
     */
    Home.prototype.updateEmployeeList = function (data) {
        var container = document.querySelector('.container');
        if (!container) {
            console.error('コンテナ要素が見つかりません');
            return;
        }
        var jsondata = JSON.parse(data);
        container.innerHTML = ''; // 既存の内容をクリア
        jsondata.forEach(function (item, index) {
            var isEven = index % 2 === 0;
            var headRotate = isEven ? 'head-rotate-red' : 'head-rotate-blue';
            var needleRotate = isEven ? 'needle-rotate-red' : 'needle-rotate-blue';
            var cardItemRotate = isEven ? 'card-item-rotate-red' : 'card-item-rotate-blue';
            var lineId = "line".concat(Math.floor(index / 4) + 1);
            var cardId = "card".concat(index + 1);
            var itemId = "Id_".concat(index + 1);
            var isNewLine = index % 4 === 0;
            if (isNewLine) {
                var lineDiv = document.createElement('div');
                lineDiv.id = lineId;
                lineDiv.style.display = 'flex';
                container.appendChild(lineDiv);
            }
            var cardDiv = document.createElement('div');
            cardDiv.id = cardId;
            cardDiv.className = "card-item ".concat(cardItemRotate, " radio-div");
            cardDiv.innerHTML = "\n            <div class=\"pin\">\n                <div class=\"head ".concat(headRotate, "\"></div>\n                <div class=\"needle ").concat(needleRotate, "\"></div>\n            </div>\n            <div class=\"item-center\">\n                <div style=\"width:85%;height:250px; border-radius:50%;\">\n                    <div class=\"card-item-image\"></div>\n                </div>\n            </div>\n            <div id=\"").concat(itemId, "\" class=\"getItem\" hidden>").concat(item.id, "</div>\n            <div id=\"employeeName\" class=\"margin-style\">\n                    <div class=\"set-font-weight getItem\">").concat(item.lastName, " ").concat(item.firstName, "</div>\n            </div>\n            <div id=\"entryDay\" class=\"margin-style\">\n                <div style=\"display:flex;\">\n                    <div class=\"icon-style margin-right-10\">1</div>\n                    <div class=\"set-font-weight getItem\">").concat(item.entryYear, ".").concat(item.entryMonth, "</div>\n                </div>\n            </div>\n            <div id=\"birthDay\" class=\"margin-style\">\n                <div style=\"display:flex;\">\n                    <div class=\"icon-style margin-right-10\">2</div>\n                    <div class=\"set-font-weight getItem\">").concat(item.birthDay, "</div>\n                </div>\n            </div>\n            <div id=\"hobby\" class=\"margin-style\">\n                <div style=\"display:flex;\">\n                    <div class=\"icon-style margin-right-10\">3</div>\n                    <div class=\"set-font-weight getItem\">").concat(item.hobby, "</div>\n                </div>\n            </div>\n        ");
            var currentLine = document.getElementById(lineId);
            currentLine === null || currentLine === void 0 ? void 0 : currentLine.appendChild(cardDiv);
            if ((index + 1) % 4 === 0 || index === data.length - 1) {
                var closingDiv = document.createElement('div');
                container.appendChild(closingDiv);
            }
        });
        this.grantSelected();
    };
    Home.prototype.setup = function () {
        var _this = this;
        var select = document.getElementById(this.ctrl.employeeSelect);
        var modal = document.getElementById(this.ctrl.modal);
        var entry = document.getElementById(this.ctrl.entry);
        select === null || select === void 0 ? void 0 : select.addEventListener('change', function (e) {
            switch (e.target.value) {
                case "":
                    break;
                case "1":
                    modal.style.display = "inline";
                    // 変更画面用に文言の変更
                    _this.updateCard(e.target.value);
                    break;
                case "2":
                    var selected = document.querySelectorAll('.selected');
                    if (selected.length != 0) {
                        var getItems = document.getElementById(selected[0].id);
                        var getItem = getItems === null || getItems === void 0 ? void 0 : getItems.querySelectorAll('.getItem');
                        var require = document === null || document === void 0 ? void 0 : document.querySelectorAll('.require');
                        for (var i = 0; i < require.length; i++) {
                            switch (require[i].id) {
                                case _this.ctrl.ID:
                                    require[i].value = getItem[0].innerText.trim();
                                    console.log("aa", require[i].value);
                                    break;
                                case _this.ctrl.LastName:
                                    require[i].value = getItem[1].innerText.split(" ")[0];
                                    break;
                                case _this.ctrl.FirstName:
                                    require[i].value = getItem[1].innerText.split(" ")[1];
                                    break;
                                case _this.ctrl.FullNameKana:
                                    require[i].value = getItem[2].innerText.trim();
                                    break;
                                case _this.ctrl.EntryYear:
                                    require[i].value = getItem[3].innerText.split(".")[0];
                                    break;
                                case _this.ctrl.EntryMonth:
                                    require[i].value = getItem[3].innerText.split(".")[1];
                                    break;
                                case _this.ctrl.BirthDay:
                                    var pattern = /\//g;
                                    require[i].value = getItem[4].innerText.replace(pattern, "-");
                                    break;
                                case _this.ctrl.Hobby:
                                    require[i].value = getItem[5].innerText;
                            }
                        }
                        modal.style.display = "inline";
                        // 変更画面用に文言の変更
                        _this.updateCard(e.target.value);
                    }
                    else {
                        alert("変更する社員を選択してください。");
                    }
                    //getItem
                    break;
                case "3":
                    var selectedDelete = document.querySelectorAll('.selected');
                    if (selectedDelete.length != 0) {
                        var DeleteFlag = false;
                        DeleteFlag = confirm("選択したユーザを削除します。\n本当によろしいでしょうか？");
                        if (DeleteFlag) {
                            var Id = _this.getId(selectedDelete);
                            var formData = {
                                type: "delete",
                                Id: Id
                            };
                            _this.post("Home/Index", formData, "削除");
                        }
                    }
                    else {
                        alert("削除する社員を選択してください。");
                    }
                    break;
            }
            select.value = "";
        });
        window.onclick = function (event) {
            var flag = false;
            if (event.target == modal) {
                if (modal) {
                    flag = confirm("入力した内容が消えます\n閉じてもよろしいでしょうか？");
                    if (flag) {
                        modal.style.display = "none";
                        var require = document.querySelectorAll('.require');
                        for (var i = 0; i < require.length; i++) {
                            var obj = document.getElementById(require[i].id);
                            obj.value = "";
                        }
                    }
                }
            }
        };
        // ボタンクリック時のイベント
        entry === null || entry === void 0 ? void 0 : entry.addEventListener('click', function (e) {
            var require = document.querySelectorAll('.require');
            var flag = false;
            for (var i = 0; i < require.length; i++) {
                var obj = document.getElementById(require[i].id);
                if (!obj.value) {
                    obj.focus();
                    flag = true;
                    var message = obj === null || obj === void 0 ? void 0 : obj.parentElement.innerText.split("\n")[0];
                    alert(message + "は入力必須です。");
                    return;
                }
            }
            if (!flag) {
                var type = e.target.value == "作成" ? "entry" : "update";
                var entryComfirmFlg = confirm("".concat(e.target.value, "\u3057\u307E\u3059\u3088\u308D\u3057\u3044\u3067\u3057\u3087\u3046\u304B\uFF1F"));
                if (entryComfirmFlg) {
                    var col = document.querySelectorAll('.main');
                    if (col.length > 0) {
                        var formData = {
                            type: type,
                            Id: col[0].children[0].value, // Id
                            LastName: col[0].children[1].children[1].value, // 姓
                            FirstName: col[0].children[2].children[1].value, // 名
                            FullNameKana: col[0].children[3].children[1].value, // フルネームカナ
                            EntryYear: col[0].children[4].children[1].value, // 入社年
                            EntryMonth: col[0].children[4].children[2].value, // 入社月
                            BirthDay: col[0].children[5].children[1].value, // 生年月日
                            Hobby: col[0].children[6].children[1].value, // 趣味
                        };
                        _this.post("Home/Index", formData, e.target.value);
                    }
                }
            }
        });
        this.grantSelected();
    };
    Home.prototype.grantSelected = function () {
        var divs = document.querySelectorAll('.radio-div');
        divs.forEach(function (div) {
            div.addEventListener('click', function () {
                // すべてのdivから "selected" クラスを削除
                divs.forEach(function (d) { return d.classList.remove('selected'); });
                // クリックされたdivに "selected" クラスを追加
                div.classList.add('selected');
            });
        });
    };
    Home.prototype.getId = function (selectedDelete) {
        var res = selectedDelete[0].id.replace("card", "");
        var obj = document.getElementById("Id_" + res);
        var pattarn = /\n/g;
        var Id = "";
        if (obj) {
            Id = obj === null || obj === void 0 ? void 0 : obj.innerText.replace(pattarn, "");
        }
        return parseInt(Id);
    };
    Home.prototype.fileUplord = function () {
        var input = document.getElementById('photoInput');
        var img = document.getElementById('previewImage');
        var zoom = document.getElementById('rangeZoom');
        var scale = 1;
        var offsetX = 0;
        var offsetY = 0;
        var dragging = false;
        var startX, startY;
        input.addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (file) {
                img.src = URL.createObjectURL(file);
            }
        });
        zoom.addEventListener('input', function () {
            scale = zoom.value;
            updateTransform();
        });
        img.addEventListener('mousedown', function (e) {
            dragging = true;
            startX = e.clientX - offsetX;
            startY = e.clientY - offsetY;
            img.style.cursor = 'grabbing';
        });
        document.addEventListener('mousemove', function (e) {
            if (dragging) {
                offsetX = e.clientX - startX;
                offsetY = e.clientY - startY;
                updateTransform();
            }
        });
        document.addEventListener('mouseup', function () {
            dragging = false;
            img.style.cursor = 'grab';
        });
        function updateTransform() {
            img.style.transform = "translate(".concat(offsetX, "px, ").concat(offsetY, "px) scale(").concat(scale, ")");
        }
    };
    Home.prototype.updateCard = function (num) {
        // タイトルの名称を変更
        var title = document.getElementById("modalTitle");
        // ボタンの名称変更
        var button_Name = document.getElementById("entry");
        switch (num) {
            case "1":
                title.innerHTML = "社員作成";
                button_Name.value = "作成";
                button_Name.classList.remove("btn-danger");
                button_Name.classList.add("btn-primary");
                break;
            case "2":
                title.innerHTML = "社員変更";
                button_Name.value = "更新";
                button_Name.classList.remove("btn-primary");
                button_Name.classList.add("btn-danger");
                break;
        }
    };
    return Home;
}());
var home = new Home();
home.init();
//# sourceMappingURL=HomeIndex.js.map