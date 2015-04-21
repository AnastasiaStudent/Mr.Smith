/*
 *
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

 */

currentPage = {};
//document.getElementById("fullList").style.visibility = "hidden";
//document.addEventListener("deviceready", listeEinblenden, false);
currentPage.init = function() {
	WL.Logger.debug("full :: init");
	
};

currentPage.back = function() {
	WL.Logger.debug("full :: back");
	$("#pagePort").load(pagesHistory.pop());
};
currentPage.listeEinblenden=function (){
	document.getElementById("fullList").style.visibility = "visible";
	alert (document.getElementById("fullList").style.visibility);
}

currentPage.dienstladen = function(dienstName) {
	WL.Logger.debug("full :: Dienstladen" + " - " + dienstName);
	// Wait for device API libraries to load
	//document.removeEventListener("deviceready", openInAppBrowser, false);
	openInAppBrowser();
	var InAppBrowserReference;
	function openInAppBrowser() {
		// Url wird abgerufen dienstname ist der Filterkriterium
		var url = "http://m.facebook.de";
		InAppBrowserReference = window.open(url, '_blank',
				'location=no,toolbar=yes');
		InAppBrowserReference.addEventListener('loaderror',
				closeInAppBrowserErr);
		InAppBrowserReference.addEventListener('loadstop', scriptEinfuegen);
		InAppBrowserReference.addEventListener('exit', closeInAppBrowser);
	}
	function scriptEinfuegen() {
		var feldEmail = "document.getElementsByName('email')[0].value=";// wird
																		// abgerufen
		var feldPass = "document.getElementsByName('pass')[0].value=";// wird
																		// abgerufen
		var email = "anastasiabaron@web.de";// wird abgerufen
		var pass = "mrsmith2004";// wird berechnet
		var codeText = feldEmail + "'" + email + "'; " + feldPass + "'" + pass
				+ "'; ";
		InAppBrowserReference.executeScript({
			code : codeText
		}, function() {
			alert("Javascriptcode wurde erfolgreich hinzugefügt.");
		});
	}
	function closeInAppBrowserErr(event) {
		if (event.url.match("/close")) {
			InAppBrowserReference.close();

		}
	}

	function closeInAppBrowser(event) {
	InAppBrowserReference.removeEventListener('loaderror',
				closeInAppBrowserErr);
		InAppBrowserReference.removeEventListener('loadstop',
				replaceHeaderImage);
		InAppBrowserReference.removeEventListener('exit', closeInAppBrowser);
		InAppBrowserReference.close();
		InAppBrowserReference=null;
		
	}
	;
};
