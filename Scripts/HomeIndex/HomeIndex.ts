//import Fetch = require ("./Fetch")


class Home {
    constructor() { };

   /* private fetch: any;*/

    init() {


        this.setup();

    }

    post(URL: string, formData: any, message:string) {

        // バックエンドへの送信
        fetch(URL, {  // 'SubmitForm' はコントローラのアクションメソッド名
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {

                console.log('BBNN', response)
                if (response.ok) {
                    alert(message + 'に成功しました。 ' )
                } else {
                    throw new Error('Something went wrong');
                }
            })

    }

    private ctrl = {
        employeeSelect: 'employeeSelect',
        modal: 'modal',
        entry: "entry",
        hiddenEntry: "hiddenEntry",
        hiddenDelete:"hiddenDelete",
        LastName: "LastName",
        FirstName: "FirstName",
        FullNameKana: "FullNameKana",
        EntryYear: "EntryYear",
        EntryMonth: "EntryMonth",
        BirthDay: "BirthDay",
        Hobby:"Hobby",
    }

    private name = {
        LastName: '姓',
        FirstName: '名',
        FullNameKana: "フルネームカナ",

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
                    break
                case "2":

                    let selected = document.querySelectorAll('.selected');
                    if (selected.length != 0) {
                        let getItems = document.getElementById(selected[0].id);
                        let getItem: any = getItems?.querySelectorAll('.getItem')
                        let require: any = document?.querySelectorAll('.require')

                        for (let i = 0; i < require.length; i++) {

                            switch (require[i].id) {
                                case this.ctrl.LastName:
                                    require[i].value = getItem[1].innerText.split(" ")[0]
                                    break

                                case this.ctrl.FirstName:
                                    require[i].value = getItem[1].innerText.split(" ")[1]
                                    break

                                case this.ctrl.EntryYear:
                                    require[i].value = getItem[2].innerText.split(".")[0]
                                    break
                                case this.ctrl.EntryMonth:
                                    require[i].value = getItem[2].innerText.split(".")[1]
                                    break
                                case this.ctrl.BirthDay:
                                    const pattern = /\//g;
                                    require[i].value = getItem[3].innerText.replace(pattern, "-");
                                    break
                                case this.ctrl.Hobby:
                                    require[i].value = getItem[4].innerText     
                            }
                        }

                        modal.style.display = "inline";
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

                        console.log(selectedDelete[0])

                        if (DeleteFlag) {

                            let Id = this.getId(selectedDelete)
                         
                            let fromData = {
                                type: "delete",
                                Id: Id
                            }
                            this.post("Home/Index", fromData,"delete");
                        }
                    } else {
                        alert("削除する社員を選択してください。")
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

        entry?.addEventListener('click', () => {
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
                const hiddenEntry: any = document.getElementById(this.ctrl.hiddenEntry)
                let entryComfirmFlg = false;
                entryComfirmFlg = confirm("登録しますよろしいでしょうか？");
                if (entryComfirmFlg) {
                    let fromData = {
                        type: "entry"
                    }
                    this.post("Home/Index", fromData, "登録");
                }
            }
        })

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

        //const Id: any = document.getElementById('Id');

        const pattarn = /\n/g;

        let Id = ""

        if (obj) {
            Id = obj?.innerText.replace(pattarn, "");
        }

        return parseInt(Id)
    }

}

const home = new Home();
home.init()




