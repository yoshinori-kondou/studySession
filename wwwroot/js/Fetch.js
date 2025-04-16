"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch = void 0;
var Fetch = /** @class */ (function () {
    //'/Home/SubmitForm'
    //formData) 
    function Fetch() {
        this.URL = "";
        this.formData = null;
        //URL: string, formData: any
        //this.URL = URL;
        //this.formData = formData
    }
    ;
    Fetch.prototype.post = function (URL, formData) {
        console.log('AAAAAAA', URL, formData);
        //// バックエンドへの送信
        //fetch(URL, {  // 'SubmitForm' はコントローラのアクションメソッド名
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/json'
        //    },
        //    body: JSON.stringify(formData)
        //})
        //    .then(response => {
        //        if (response.ok) {
        //            return response.json();
        //        } else {
        //            throw new Error('Something went wrong');
        //        }
        //    })
        //    .then(data => {
        //        alert('Form submitted successfully: ' + JSON.stringify(data));
        //    })
        //    .catch(error => {
        //        console.error('Error:', error);
        //        alert('Error submitting the form');
        //    });
    };
    return Fetch;
}());
exports.Fetch = Fetch;
//# sourceMappingURL=Fetch.js.map