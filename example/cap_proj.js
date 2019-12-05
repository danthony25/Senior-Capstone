(function () {
    "use strict";

    let name = "";
    let user_cat = "";
    let user_state = "";

    window.onload = function() {
        document.getElementById("home").addEventListener("click", reload);
        document.getElementById("about").addEventListener("click", change);
        get();
        document.getElementById("submit").onclick = requestCharities;
        
        // setInterval(function(){
        //     document.getElementById('comments').innerHTML = '';
        //     get();
        // }, 5000);

    };

    /**
    If home is clicked the page reloads
    **/
    function reload() {
        location.reload();
    }

    function change() {
        let search = document.getElementById("search");
        search.innerHTML = "";
        let hElement = document.createElement("H2");
        let t = document.createTextNode("About Page");
        hElement.appendChild(t);
        search.appendChild(hElement);
        let p = document.createElement("p");
        let pText = document.createTextNode("Welcome to the Non-Profit Charity Webpage!\n");
        p.appendChild(pText);
        search.appendChild(p);
        search.appendChild(document.createTextNode("\n"));
        let p2 = document.createElement("p");
        let p2Text = document.createTextNode("This is a webpage created by Aleah Crawford" + 
            " and Anthony Dominguez in completion of our senior project for the University of Arizona.");
        p.appendChild(p2Text);
        search.appendChild(p2);
        let p3 = document.createElement("p");
        let p3Text = document.createTextNode("This webpage is designed to help you find" + 
            " various non-profit charities with your specific interest in mind.")
        p.appendChild(p3Text);
        search.appendChild(p3);
        let h3Element = document.createElement("H3");
        let t3 = document.createTextNode("How it Works");
        h3Element.appendChild(t3);
        search.appendChild(h3Element);
        let p4 = document.createElement("p");
        let p4Text = document.createTextNode("You can enter a specific charity name, select a" +
         " charity category, or select a state and we will output a list of non-profit charities" +
         " that fit your personal search");
        p.appendChild(p4Text);
        search.appendChild(p4);
        let p5 = document.createElement("p");
        let p5Text = document.createTextNode("Once you see a charity that you like, just click" +
            " on it and you will be redirected to the charity's specific page. There you can" +
            " learn information about the charity and decide whether or not you would like to" +
            " donate. If it is a charity you know you can also leave a comment so others can " +
            "see.")
        p5.appendChild(p5Text);
        search.appendChild(p5);
        let p6 = document.createElement("p");
        let p6Text = document.createTextNode("All information was provided by Charity Navigator (CN)")
        p6.appendChild(p6Text);
        p6.style.fontsize = "5px";
        search.appendChild(p6);
        let p7 = document.createElement("p");
        let s = "Charity Navigator";
        let l = s.link("https://www.CharityNavigator.org");
        p7.innerHTML = l;
        search.appendChild(p7);


    }


    function get() {
        let url = 'http://localhost:3000';
        let type = []
        let state = []
        fetch(url)
            .then(checkStatus)
            .then(function (responseText) {
                let json = JSON.parse(responseText);
                let select = document.getElementById("type");
                let sel_state = document.getElementById("state");

                // for (let i = 0; i < json.messages.length; i++) {
                //     let h2 = document.createElement('h2');
                //     let p = document.createElement('p');
                //     h2.textContent = json.messages[i].name;
                //     p.textContent = json.messages[i].comment;
                //     document.getElementById('comments').appendChild(h2);
                //     document.getElementById('comments').appendChild(p);
                // }
                for(let i = 0; i < json.length; i++) {
                    if (type.includes(json[i]["Category"])) {
                        continue;
                    }   else {
                        type.push(json[i]["Category"]); 
                    }
                }

                for(let i = 0; i < json.length; i++) {
                    if (state.includes(json[i]["State"])) {
                        continue;
                    } else {
                        state.push(json[i]["State"]);
                    }
                }

                for(let j = 0; j < type.length; j++) {
                    let options = type[j];
                    let el = document.createElement("option");
                    el.textContent = options;
                    el.value = options;
                    select.appendChild(el);
                }

                state = state.sort()

                for(let j = 0; j < state.length; j++) {
                    let opt = state[j];
                    let el2 = document.createElement("option");
                    el2.textContent = opt;
                    el2.value = opt;
                    sel_state.appendChild(el2);
                }



            });
                
    }

    function requestCharities() {
        let name_lst = [];
        let store = 0;
        name = document.getElementById("name").value;
        user_cat = document.getElementById("type").value;
        user_state = document.getElementById("state").value;

        let url = 'http://localhost:3000';
        fetch(url)
            .then(checkStatus)
            .then(function (responseText) {
                let json = JSON.parse(responseText);
                let body = document.getElementById("search");

                for(let i = 0; i < json.length; i++) {
                    name_lst.push(json[i]["Charity Name"])
                }

                body.style.margin = "20px";
                body.innerHTML = "";

                let h4 = document.createElement("h4");
                if(name && (name_lst.includes(name))) {
                    h4.innerHTML = "Results for " + name + ":";
                }

                else if((user_cat && user_state) && (user_cat != "Choose a Category") &&
                 (user_state != "Choose a State")) {
                    h4.innerHTML = "Results for " + user_cat + " in " + user_state + ":";
                }

                else if(user_cat && (user_cat != "Choose a Category")) {
                    h4.innerHTML = "Results for " + user_cat + ":";
                }

                else if(user_state && (user_state != "Choose a State")) {
                    h4.innerHTML = "Results for " + user_state + ":";
                }

                else {
                    h4.innerHTML = "No Results Try Again";
                }

                h4.style.fontsize = "22px";
                body.appendChild(h4);

                let table = document.createElement("table");
                let tr = document.createElement("tr");
                let th1 = document.createElement("th");
                th1.innerHTML = "#";     
                tr.appendChild(th1);
                let th2 = document.createElement("th");
                th2.innerHTML = "Name";   
                tr.appendChild(th2);

                let th3 = document.createElement("th");
                th3.innerHTML = "Charity Category"; 
                tr.appendChild(th3);

                tr.style.backgroundColor = "#E0FFFF";
                table.appendChild(tr); 
                table.style.width = "100%";
 

                for(let i=0; i < json.length; i++) {
                    let tr = document.createElement("tr");
                    let th1 = document.createElement("th");
                    if(name && (json[i]["Charity Name"] == name)) {
                        store = i;
                        tr.setAttribute("id", store);
                        tr.addEventListener("click", charClick); 
                        th1.innerHTML = i;   
                        tr.appendChild(th1);

                        let th2 = document.createElement("th");
                        th2.innerHTML = json[store]["Charity Name"]; 
                        tr.appendChild(th2);

                        let th3 = document.createElement("th");
                        let brew = json[store]["Category"];
                        let upper = brew.charAt(0).toUpperCase() + brew.slice(1);
                        th3.innerHTML = upper;
                        tr.appendChild(th3); 
                        table.appendChild(tr);

                        if (i % 2 != 0) {
                            tr.style.backgroundColor = "#ADD8E6";
                        }
                        else {
                            tr.style.backgroundColor = "#4682B4";
                        }

                    }

                    else if(((user_cat && user_state) && (user_cat != "Choose a Category") &&
                    (user_state != "Choose a State"))) {
                        
                    }
                }
                body.appendChild(table);
            })
                
            
            .catch(function(error) {
                console.log(error);
            });
    }

    function charClick() {
        let value = this.id; // This is what gets the charity index
        let url = 'http://localhost:3000';
        let body = document.getElementById("search"); 
        body.style.margin = "20px";
        body.innerHTML = "";

        fetch(url)
            .then(checkStatus)
            .then(function (responseText) {
                let json = JSON.parse(responseText);
                let h3 = document.createElement("h3");
                h3.style.marginBottom = "4px";
                h3.style.textDecoration = "underline";
                h3.innerHTML = json[value]["Charity Name"];
                body.appendChild(h3);

                let h4 = document.createElement("h4");
                h4.style.fontsize = "1.2em"
                h4.innerHTML = json[value]["Cause"];
                body.appendChild(h4);

                let h5 = document.createElement("h5");
                h5.style.fontsize = "1em";
                h5.innerHTML = json[value]["Tagline"];
                body.appendChild(h5);

                let miss = document.createElement("p");
                miss.innerHTML = json[value]["Mission"];
                body.appendChild(miss);

                let loc = document.createElement("p");
                loc.innerHTML = "Location: " + json[value]["Street Address 1"] + " " +
                json[value]["Street Address 2"] + ", " + json[value]["City"] + ", " +
                json[value]["State"] + " " + json[value]["Postal Code"];
                body.appendChild(loc);

                let graph = document.createElement('canvas');

                graph.setAttribute("id", "chart");
                // let chrt = document.getElementById('chart')
                graph.width = 200;
                graph.height = 50;
                body.appendChild(graph);
                myChart(json, value);


     })

    }
    function myChart(json, value) {

        // let charity = "Mount Desert Island Biological Laboratory"

        let myChart = document.getElementById('chart').getContext('2d');

        // Global Options
        Chart.defaults.global.defaultFontFamily = 'Lato';
        Chart.defaults.global.defaultFontSize = 18;
        Chart.defaults.global.defaultFontColor = '#777';
        let charity_e = parseInt(json[value]['Expenses'], 10) / 1000000
        let charity_cat = json[value]['Category']
        // for (i = 0; i < json.length; i++) {
        //     if (json[i]['Charity Name'] == charity) {
        //         charity_e = parseInt(json[i]['Expenses'], 10) / 1000000
        //         // let charity_r = json[i]['M'] 
        //         charity_cat = json[i]['Category']
        //     }

        // }

        let total = 0
        let expenses = 0
        for (let i = 0; i < json.length; i++) {
            if (json[i]['Category'] == charity_cat) {
                expenses += parseInt(json[i]['Expenses'], 10)
                // let charity_r = json[i]['M'] 
                total += 1
            }
        }
        let average = (expenses / total) / 1000000;
        console.log(expenses);
        let max = charity_e;
        if (average > charity_e) {
            max = average
        }
        max = Math.ceil(max)

        // console.log(charity_e)

        let massPopChart = new Chart(myChart, {
            type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
            data: {
                labels: [json[value]['Charity Name'], charity_cat],
                datasets: [{
                    label: 'Money USD (Millions)',
                    data: [
                        charity_e,
                        average
                    ],
                    //backgroundColor:'green',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)'

                    ],
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Expenses Compared to Category Avgerage',
                    fontSize: 12
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#000'
                    }
                },
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            fontSize: 12

                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,

                            // stepValue: 1,
                            max: max
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }

                },
                tooltips: {
                    enabled: true
                }
            }
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