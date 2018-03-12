export function sendXmlHttpRequest(url, method, data, callback) {
        var xmlhttp;
        var self = this;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp) {
            xmlhttp.open(method, url, true);
            xmlhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    if (xmlhttp.response)
                        var response = JSON.parse(xmlhttp.response)
                    callback(response);
                }
            }

            // xmlhttp.setRequestHeader('x-api-key', data.apiKey)         //for sending headers
            if (data)
                xmlhttp.send(JSON.stringify(data));
            else
                xmlhttp.send();
        }
    }

