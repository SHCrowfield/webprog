var http = new XMLHttpRequest();



function listaz() {
	http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			/*itt atadjuk feldolgozasra a valaszban elerheto XML adatot*/
			feldolgoz(this.responseXML);
			szures();
		}
	};
	http.open("get", "marvel.xml", true);
	http.send();
}

var films;
var rendezo;
let year;
let title;



function feldolgoz() {

	var i;
	var xmlDoc = http.responseXML;
	films = xmlDoc.getElementsByTagName("FILM");
	document.getElementById("tartalom").innerHTML = "";
	document.getElementById("lista").innerHTML = "";

	var list = '<option id="lista" value="0">*</option>'

	for (i = 0; i < films.length; i++) {
		rendezo = films[i].getElementsByTagName("DIRECTOR")[0].childNodes[0].nodeValue;

		list += '<option id="lista" value="' + rendezo + '">' + rendezo + '</option>';
	}

	document.getElementById('lista').innerHTML = list;


}

function szures() {

		

	let tablazat =
		'<table><tr><th>Cím</th><th>Rendező</th><th>Év</th><th>Profit</th></tr>';

	for (let i = 0; i < films.length; i++) {
		rendezo = films[i].getElementsByTagName("DIRECTOR")[0].childNodes[0].nodeValue;
		year = films[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
		title = films[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
		

		if (document.getElementById('elore').checked) {



			if ((document.getElementById('lista').value == rendezo ||
				document.getElementById('lista').value == "0" ) && (year < document.getElementById("ev").value)&&
				(title.includes(document.getElementById("cim").value)||document.getElementById("cim").value =="")) {
				tablazat += '<tr><td>';
				tablazat += films[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
				tablazat += '</td><td>';
				tablazat += films[i].getElementsByTagName("DIRECTOR")[0].childNodes[0].nodeValue;
				tablazat += '</td><td>';
				tablazat += films[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
				tablazat += '</td><td>';
				tablazat += films[i].getElementsByTagName("INCOME")[0].childNodes[0].nodeValue - films[i].getElementsByTagName("BUDGET")[0].childNodes[0].nodeValue + "M $";
				tablazat += '</td></tr>';
			}
		}else{
			if ((document.getElementById('lista').value == rendezo ||
				document.getElementById('lista').value == "0" ) && (year > document.getElementById("ev").value)&&
				(title.includes(document.getElementById("cim").value)||document.getElementById("cim").value =="")) {
				tablazat += '<tr><td>';
				tablazat += films[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
				tablazat += '</td><td>';
				tablazat += films[i].getElementsByTagName("DIRECTOR")[0].childNodes[0].nodeValue;
				tablazat += '</td><td>';
				tablazat += films[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
				tablazat += '</td><td>';
				tablazat += films[i].getElementsByTagName("INCOME")[0].childNodes[0].nodeValue - films[i].getElementsByTagName("BUDGET")[0].childNodes[0].nodeValue + "M $";
				tablazat += '</td></tr>';
			}
		}
	}
	tablazat += '</table>';

	document.getElementById('tartalom').innerHTML = tablazat;


}

