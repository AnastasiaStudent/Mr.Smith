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
var list;
var indexGlobal;
currentPage.init = function() {
	WL.Logger.debug("full :: init");

	$.getJSON("dienste.json", function(result) {
		list=result;
		$.each(result, function(i, field) {
			$("#fullList").append(
					'<a class="item item-avatar" href="#" onclick="currentPage.dienstladen('
							+ "'" + i + "'" + ')"> <img src="'
							+ field.logo + '"><h2>' + field.dienstname
							+ '</h2> </a>');

		});
	});

};

currentPage.loadPage = function(pageName) {
	WL.Logger.debug("full :: loadPage :: pageName: " + pageName);
	pagesHistory.push(path + "pages/full.html");
	$("#pagePort").load(path + "pages/" + pageName + ".html", function() {
		$.getScript(path + "js/" + pageName + ".js", function() {
			if (currentPage.init) {
				currentPage.init();
			}
		});
	});

};

currentPage.back = function() {
	WL.Logger.debug("full :: back");
	$("#pagePort").load(pagesHistory.pop());
};

currentPage.dienstladen = function(dienstNr) {
	WL.Logger.debug("full :: Dienstladen" + " - " + dienstNr);
	// Wait for device API libraries to load
	//document.addEventListener("deviceready", openInAppBrowser(dienstName),false);
	openInAppBrowser(dienstNr);
};
var InAppBrowserReference;
function openInAppBrowser(index) {
	indexGlobal=index;
	var url = list[index].url;
	InAppBrowserReference = window.open(url, '_blank',
			'location=no,toolbar=yes');
	InAppBrowserReference.addEventListener('loaderror', closeInAppBrowserErr);
	InAppBrowserReference.addEventListener('loadstop', scriptEinfuegen);
	InAppBrowserReference.addEventListener('exit', closeInAppBrowser);
};
function scriptEinfuegen() {
	var feldEmail;
	var feldPass;
	var email;
	var pass;
	if(list[indexGlobal].namefeld_identifikator=="id"){
		feldEmail = "document.getElementById("+"'"+list[indexGlobal].namefeld+"').value=";
	}
	else if (list[indexGlobal].namefeld_identifikator=="name"){
		feldEmail = "document.getElementsByName('"+list[indexGlobal].namefeld+"')[0].value=";
	}
	else {
		
	}

	if(list[indexGlobal].passfeld_identifikator=="id"){
		feldPass = "document.getElementById("+"'"+list[indexGlobal].passfeld+"').value=";
	}
	else if (list[indexGlobal].namefeld_identifikator=="name"){
		feldPass = "document.getElementsByName('"+list[indexGlobal].passfeld+"')[0].value=";
	}
	else {
		
	}
	
	email = list[indexGlobal].user;// To Do Mehrauswahl
	
	
//	feldEmail = "document.getElementsByName('email')[0].value=";
//feldPass = "document.getElementsByName('pass')[0].value=";

pass = "mrsmith2004";// wird berechnet

	var codeText = feldEmail + "'" + email + "'; " + feldPass + "'" + pass
			+ "'; ";
	InAppBrowserReference.executeScript({
		code : codeText
	}, function() {
		alert("Javascriptcode wurde erfolgreich hinzugefügt.");
	});
};
function closeInAppBrowserErr(event) {
	if (event.url.match("/close")) {
		InAppBrowserReference.close();
	}
};

function closeInAppBrowser(event) {

	InAppBrowserReference
			.removeEventListener('loaderror', closeInAppBrowserErr);
	InAppBrowserReference.removeEventListener('loadstop', scriptEinfuegen);
	InAppBrowserReference.removeEventListener('exit', closeInAppBrowser);
	InAppBrowserReference.close();
}
