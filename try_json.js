
"use strict";
(function () {
    window.onload = function () {
        // document.getElementById("send").onclick = send;
        get();
        // setInterval(function(){
        //     document.getElementById('comments').innerHTML = '';
        //     get();
        // }, 5000);

    };

    function get() {
    let url = 'http://localhost:3000';
    fetch(url)
        .then(checkStatus)
        .then(function (responseText) {
            console.log('sdfsdfsdf')
            let json = JSON.parse(responseText);
            // for (let i = 0; i < json.messages.length; i++) {
            //     let h2 = document.createElement('h2');
            //     let p = document.createElement('p');
            //     h2.textContent = json.messages[i].name;
            //     p.textContent = json.messages[i].comment;
            //     document.getElementById('comments').appendChild(h2);
            //     document.getElementById('comments').appendChild(p);
            // }
            console.log(json)
        
        });
    }
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.text();
        } else if (response.status == 404) {
            // sends back a different error when we have a 404 than when we have
            // a different error
            return Promise.reject(new Error("Message not sent :("));
        } else {

            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }
})();
