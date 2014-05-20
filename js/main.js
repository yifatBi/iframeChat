$(document).ready(function(){
    var frameNum = 0;
    $("#test").draggable();

    //Add iframe every plus button click
    $('#plusBtn').click(function() {
        var currIframe = document.createElement('iframe');
        var myDiv = document.getElementById('test');
        frameNum++;
        currIframe.id = "iframe" + frameNum;
        currIframe.src = "iframe.html";
        currIframe.class = "ui-widget-content";
        myDiv.appendChild(currIframe);
        $("#" +currIframe.id).draggable();
    })
    //onMessage event
    if (window.addEventListener) {
        // For standards-compliant web browsers
        window.addEventListener("message", displayMessage, false);
    }
    else {
        window.attachEvent("onmessage", displayMessage);
    }
    function displayMessage (evt) {
        var systemMessage = "joined the conversation";
        var targetFrame = document.getElementsByTagName('iframe');
        var data;
        var data = "[" + evt.data.frame + "]-" + evt.data.message;
        if(evt.data.frame == "system"){
            data += systemMessage;
        }
        var len;
        for (var i = 0, len = targetFrame.length; i < len; i++) {
            targetFrame[i].contentWindow.postMessage(data, '*');
        }
    }

});
