"use strict";

function generate_results() {
    // Extracting the data from the form
    let params = (new URL(document.location)).searchParams;
    if (params.has("city")){
        let city = params.get("city");
        console.log(city);
        // Filling-in the placeholder element (finished later - see step 3)
        let placeholder = document.getElementById('theresult');
        //placeholder.innerHTML = `The city you are searching for is: ${city}`;
        
        // Exercise # 2 - Beginning
        let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=84333ed1e3b5de0a85ebd078cd8f713c&mode=xml`;
        console.log(queryURL);

        // 1. Making the query (https://www.w3schools.com/js/js_ajax_http.asp - last two tables)
        let xmlHttp = new XMLHttpRequest(); // Create an XMLHttpRequest object
        xmlHttp.open("GET", queryURL); // Set the request method and URL
        xmlHttp.send(); // Initiates (sends) the request
        // Defines a function to be called when the readyState property changes
        xmlHttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                // readyState: holds the status of the XMLHttpRequest (0: request not initialized, 1: server connection established, 2: request received, 3: processing request, 4: request finished and response is ready)
                // status: returns the status-number of a request (200: "OK", 403: "Forbidden", 404: "Not Found")
                let retrievedData = this.responseXML; // Returns the response as document (XML data)
                console.log(retrievedData);
                
                // 2. Data parsing
                // (can try this in the console, the retrievedData XML document object has similar
                // methods as an HTML document object: 'getElementById', 'getElementsByTagName', etc.
                // https://www.w3schools.com/xml/xml_dom.asp)
                let retrievedCity = retrievedData.getElementsByTagName("city")[0].getAttribute("name");
                let sky = retrievedData.getElementsByTagName("weather")[0].getAttribute("value");
                let temperature = retrievedData.getElementsByTagName("temperature")[0];
                let currentTemperature = temperature.getAttribute("value");
                let scaleTemperature = temperature.getAttribute("unit");

                // 3. Rendering data
                // INSERT THEM IN THE PLACE HOLDER (THE COMMENTED LINE)
                placeholder.innerHTML = `Current temperature and conditions for ${retrievedCity}
                 now are ${currentTemperature} in ${scaleTemperature} with ${sky}`;
            }
        };
    }
}

window.onload = generate_results();
