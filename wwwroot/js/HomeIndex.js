"use strict";
//import Fetch = require ("./Fetch")
var Home = /** @class */ (function () {
    function Home() {
        this.ctrl = {
            employeeSelect: 'employeeSelect',
            modal: 'modal',
            entry: "entry",
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
    /* private fetch: any;*/
    Home.prototype.init = function () {
        this.setup();
    };
    Home.prototype.post = function (URL, formData, message) {
        // バックエンドへの送信
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(function (response) {
            console.log('BBNN', response);
            if (response.ok) {
                alert(message + 'に成功しました。 ');
            }
            else {
                throw new Error('Something went wrong');
            }
        });
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
                    break;
                case "2":
                    var selected = document.querySelectorAll('.selected');
                    if (selected.length != 0) {
                        var getItems = document.getElementById(selected[0].id);
                        var getItem = getItems === null || getItems === void 0 ? void 0 : getItems.querySelectorAll('.getItem');
                        var require = document === null || document === void 0 ? void 0 : document.querySelectorAll('.require');
                        for (var i = 0; i < require.length; i++) {
                            switch (require[i].id) {
                                case _this.ctrl.LastName:
                                    require[i].value = getItem[1].innerText.split(" ")[0];
                                    break;
                                case _this.ctrl.FirstName:
                                    require[i].value = getItem[1].innerText.split(" ")[1];
                                    break;
                                case _this.ctrl.EntryYear:
                                    require[i].value = getItem[2].innerText.split(".")[0];
                                    break;
                                case _this.ctrl.EntryMonth:
                                    require[i].value = getItem[2].innerText.split(".")[1];
                                    break;
                                case _this.ctrl.BirthDay:
                                    var pattern = /\//g;
                                    require[i].value = getItem[3].innerText.replace(pattern, "-");
                                    break;
                                case _this.ctrl.Hobby:
                                    require[i].value = getItem[4].innerText;
                            }
                        }
                        modal.style.display = "inline";
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
                        console.log(selectedDelete[0]);
                        if (DeleteFlag) {
                            var Id = _this.getId(selectedDelete);
                            var fromData = {
                                type: "delete",
                                Id: Id
                            };
                            _this.post("Home/Index", fromData, "delete");
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
        entry === null || entry === void 0 ? void 0 : entry.addEventListener('click', function () {
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
                var hiddenEntry = document.getElementById(_this.ctrl.hiddenEntry);
                var entryComfirmFlg = false;
                entryComfirmFlg = confirm("登録しますよろしいでしょうか？");
                if (entryComfirmFlg) {
                    var fromData = {
                        type: "entry"
                    };
                    _this.post("Home/Index", fromData, "登録");
                }
            }
        });
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
        //const Id: any = document.getElementById('Id');
        var pattarn = /\n/g;
        var Id = "";
        if (obj) {
            Id = obj === null || obj === void 0 ? void 0 : obj.innerText.replace(pattarn, "");
        }
        return parseInt(Id);
    };
    return Home;
}());
var home = new Home();
home.init();
//# sourceMappingURL=HomeIndex.js.map