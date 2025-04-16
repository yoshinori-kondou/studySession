
export class Fetch {

    private URL = "";
    private formData = null

    //'/Home/SubmitForm'
    //formData) 
    constructor() {
        //URL: string, formData: any
        //this.URL = URL;
        //this.formData = formData
    };

    post(URL: string, formData: any) {


        console.log('AAAAAAA', URL, formData)

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

    }
}



