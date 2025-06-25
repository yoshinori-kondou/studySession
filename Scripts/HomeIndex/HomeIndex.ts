//import Fetch = require ("./Fetch")


class Home {
    constructor() { };

    private ctrl = {
        employeeSelect: 'employeeSelect',
        modal: 'modal',
        entry: "entry",
        ID:"Id",
        hiddenEntry: "hiddenEntry",
        hiddenDelete: "hiddenDelete",
        LastName: "LastName",
        FirstName: "FirstName",
        FullNameKana: "FullNameKana",
        EntryYear: "EntryYear",
        EntryMonth: "EntryMonth",
        BirthDay: "BirthDay",
        Hobby: "Hobby",
    }

    private name = {
        LastName: '姓',
        FirstName: '名',
        FullNameKana: "フルネームカナ",

    }

    init() {


        this.setup();

    }

    /**
     * サーバーに情報を送信する処理
     * @param URL
     * @param formData
     * @param message
     */
    post(URL: string, formData: any, message:string) {
        // バックエンドへの送信
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    alert(message + 'に成功しました。');

                    let modal = document.getElementById(this.ctrl.modal);
                    if (modal != null) {
                        modal.style.display = "none";
                    }
                    
                    // ✅ POST成功後にGETリクエストを実行
                    return fetch('Home/AfterIndex', {
                        method: 'GET'
                    });
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(getResponse => {
                if (!getResponse.ok) {
                    throw new Error('GETリクエストに失敗しました');
                }
                return getResponse.text(); // もしくは .json() にする
            })
            .then(data => {
                // ✅ GETの結果を表示（ここは必要に応じて変えてOK）
                console.log('GETレスポンス:', data);
                // たとえば表示更新したいなら DOM 操作をここに入れる
                this.updateEmployeeList(data)
            })
            .catch(error => {
                console.error('エラー:', error);
            });
    }

    /**
     * 一覧にカードを再描画する
     * @param data  一覧の情報を格納したJSON
     * @returns
     */
    updateEmployeeList(data: any) {

        const container = document.querySelector('.container');
        if (!container) {
            console.error('コンテナ要素が見つかりません');
            return;
        }

        let jsondata = JSON.parse(data);

        container.innerHTML = ''; // 既存の内容をクリア

        jsondata.forEach((item: { id: number; lastName: string; firstName: string; entryYear: number; entryMonth: number; birthDay: string; hobby: string }, index: number) => {

            const isEven = index % 2 === 0;
            const headRotate = isEven ? 'head-rotate-red' : 'head-rotate-blue';
            const needleRotate = isEven ? 'needle-rotate-red' : 'needle-rotate-blue';
            const cardItemRotate = isEven ? 'card-item-rotate-red' : 'card-item-rotate-blue';
            const lineId = `line${Math.floor(index / 4) + 1}`;
            const cardId = `card${index + 1}`;
            const itemId = `Id_${index + 1}`;
            const isNewLine = index % 4 === 0;

            if (isNewLine) {
                const lineDiv = document.createElement('div');
                lineDiv.id = lineId;
                lineDiv.style.display = 'flex';
                container.appendChild(lineDiv);
            }

            const cardDiv = document.createElement('div');
            cardDiv.id = cardId;
            cardDiv.className = `card-item ${cardItemRotate} radio-div`;

            cardDiv.innerHTML = `
            <div class="pin">
                <div class="head ${headRotate}"></div>
                <div class="needle ${needleRotate}"></div>
            </div>
            <div class="item-center">
                <div style="width:85%;height:250px; border-radius:50%;">
                    <div class="card-item-image"></div>
                </div>
            </div>
            <div id="${itemId}" class="getItem" hidden>${item.id}</div>
            <div id="employeeName" class="margin-style">
                    <div class="set-font-weight getItem">${item.lastName} ${item.firstName}</div>
            </div>
            <div id="entryDay" class="margin-style">
                <div style="display:flex;">
                    <div class="icon-style margin-right-10">1</div>
                    <div class="set-font-weight getItem">${item.entryYear}.${item.entryMonth}</div>
                </div>
            </div>
            <div id="birthDay" class="margin-style">
                <div style="display:flex;">
                    <div class="icon-style margin-right-10">2</div>
                    <div class="set-font-weight getItem">${item.birthDay}</div>
                </div>
            </div>
            <div id="hobby" class="margin-style">
                <div style="display:flex;">
                    <div class="icon-style margin-right-10">3</div>
                    <div class="set-font-weight getItem">${item.hobby}</div>
                </div>
            </div>
        `;

            const currentLine = document.getElementById(lineId);
            currentLine?.appendChild(cardDiv);

            if ((index + 1) % 4 === 0 || index === data.length - 1) {
                const closingDiv = document.createElement('div');
                container.appendChild(closingDiv);
            }
        });

        this.grantSelected();
    }

    setup() {
        let select: any = document.getElementById(this.ctrl.employeeSelect);
        let modal: any = document.getElementById(this.ctrl.modal);
        let entry = document.getElementById(this.ctrl.entry);

        select?.addEventListener('change', (e: any) => {
            switch (e.target.value) {
                case "":
                    break
                case "1":
                    modal.style.display = "inline";
                    // 変更画面用に文言の変更
                    this.updateCard(e.target.value)
                    break
                case "2":

                    let selected = document.querySelectorAll('.selected');
                    if (selected.length != 0) {
                        let getItems = document.getElementById(selected[0].id);
                        let getItem: any = getItems?.querySelectorAll('.getItem')
                        let require: any = document?.querySelectorAll('.require')

                        for (let i = 0; i < require.length; i++) {

                            switch (require[i].id) {
                                case this.ctrl.ID:
                                    require[i].value = getItem[0].innerText.trim();
                                    console.log("aa", require[i].value)
                                    break
                                case this.ctrl.LastName:
                                    require[i].value = getItem[1].innerText.split(" ")[0]

                                    break
                                case this.ctrl.FirstName:
                                    require[i].value = getItem[1].innerText.split(" ")[1]
                                    break
                                case this.ctrl.FullNameKana:
                                    require[i].value = getItem[2].innerText.trim();
                                    break
                                case this.ctrl.EntryYear:
                                    require[i].value = getItem[3].innerText.split(".")[0]
                                    break
                                case this.ctrl.EntryMonth:
                                    require[i].value = getItem[3].innerText.split(".")[1]
                                    break
                                case this.ctrl.BirthDay:
                                    const pattern = /\//g;
                                    require[i].value = getItem[4].innerText.replace(pattern, "-");
                                    break
                                case this.ctrl.Hobby:
                                    require[i].value = getItem[5].innerText
                            }
                        }

                        modal.style.display = "inline";

                        // 変更画面用に文言の変更
                        this.updateCard(e.target.value)

                    } else {
                        alert("変更する社員を選択してください。")
                    }

                    //getItem
                    break
                case "3":
                    let selectedDelete = document.querySelectorAll('.selected');
                    if (selectedDelete.length != 0) {

                        let DeleteFlag = false;

                        DeleteFlag = confirm("選択したユーザを削除します。\n本当によろしいでしょうか？")

                        if (DeleteFlag) {

                            let Id = this.getId(selectedDelete)
                         
                            let formData = {
                                type: "delete",
                                Id: Id
                            }
                            this.post("Home/Index", formData, "削除");

                        }
                    } else {
                        alert("削除する社員を選択してください。");
                    }
                    break
            }
            select.value = "";
        })

        window.onclick = function (event) {
            var flag = false;
            if (event.target == modal) { 
                if (modal) {
                    flag = confirm("入力した内容が消えます\n閉じてもよろしいでしょうか？")
                    if (flag) {
                        modal.style.display = "none";

                        const require: any = document.querySelectorAll('.require');
                        for (let i = 0; i < require.length; i++) {
                            let obj: any = document.getElementById(require[i].id);
                            obj.value = "";
                        }
                    }
                }
            }
        }

        // ボタンクリック時のイベント
        entry?.addEventListener('click', (e : any) => {
            const require: any = document.querySelectorAll('.require');
            let flag = false;
            for (let i = 0; i < require.length; i++) {

                let obj:any = document.getElementById(require[i].id)

                if (!obj.value) {
                    obj.focus();
                    flag = true;

                    let message = obj?.parentElement.innerText.split("\n")[0];

                    alert(message + "は入力必須です。");
                    return;
                }
            }

            if (!flag) {

                let type = e.target.value == "作成" ? "entry" : "update" ; 

                let entryComfirmFlg: boolean = confirm(`${e.target.value}しますよろしいでしょうか？`);
                if (entryComfirmFlg) {
                    let col:any = document.querySelectorAll('.main');

                    if (col.length > 0) {

                        let formData = {
                            type: type,
                            Id: col[0].children[0].value,// Id
                            LastName: col[0].children[1].children[1].value,// 姓
                            FirstName:col[0].children[2].children[1].value,// 名
                            FullNameKana: col[0].children[3].children[1].value,// フルネームカナ
                            EntryYear:col[0].children[4].children[1].value,// 入社年
                            EntryMonth:col[0].children[4].children[2].value,// 入社月
                            BirthDay: col[0].children[5].children[1].value,// 生年月日
                            Hobby: col[0].children[6].children[1].value,// 趣味
                        }
                        this.post("Home/Index", formData, e.target.value);
                    }
                }
            }
        })

        this.grantSelected();
    }

    grantSelected() {
        const divs = document.querySelectorAll('.radio-div');

        divs.forEach(div => {
            div.addEventListener('click', () => {
                // すべてのdivから "selected" クラスを削除
                divs.forEach(d => d.classList.remove('selected'));

                // クリックされたdivに "selected" クラスを追加
                div.classList.add('selected');
            });
        });
    }

    getId(selectedDelete: any) {
        let res = selectedDelete[0].id.replace("card", "");

        const obj = document.getElementById("Id_" + res);

        const pattarn = /\n/g;

        let Id = ""

        if (obj) {
            Id = obj?.innerText.replace(pattarn, "");
        }

        return parseInt(Id)
    }

    fileUplord() {

        const input: any = document.getElementById('photoInput');
        const img : any = document.getElementById('previewImage');
        const zoom: any = document.getElementById('rangeZoom');

        let scale = 1;
        let offsetX = 0;
        let offsetY = 0;
        let dragging = false;
        let startX: number, startY: number;

        input.addEventListener('change', (e: any) => {
            const file = e.target.files[0];
            if (file) {
                img.src = URL.createObjectURL(file);
            }
        });

        zoom.addEventListener('input', () => {
            scale = zoom.value;
            updateTransform();
        });

        img.addEventListener('mousedown', (e: any) => {
            dragging = true;
            startX = e.clientX - offsetX;
            startY = e.clientY - offsetY;
            img.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (dragging) {
                offsetX = e.clientX - startX;
                offsetY = e.clientY - startY;
                updateTransform();
            }
        });

        document.addEventListener('mouseup', () => {
            dragging = false;
            img.style.cursor = 'grab';
        });

        function updateTransform() {
            img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        }
    }

    updateCard(num : string) {

        // タイトルの名称を変更
        const title: any = document.getElementById("modalTitle");
        // ボタンの名称変更
        const button_Name: any = document.getElementById("entry");

        switch (num) {
            case "1":
                title.innerHTML = "社員作成";
                button_Name.value = "作成";
                button_Name.classList.remove("btn-danger");
                button_Name.classList.add("btn-primary");
                break
            case "2":
                title.innerHTML = "社員変更";
                button_Name.value = "更新";
                button_Name.classList.remove("btn-primary");
                button_Name.classList.add("btn-danger");
                break
        }

        
        

        
        

    }


     

   
}

const home = new Home();
home.init()




