var formElement=null;
var respuestaInput=null;
var respuestaInput2=null;	
var respuestaSelect=null;
var respuestaSelect2=null;
var respuestasCheckbox = [];
var respuestasCheckbox2 = [];
var respuestaRadio = null;
var respuestaRadio2 = null;
var respuestasMultiple=[];
var respuestasMultiple2=[];
var nota = 0;
var xmlDoc = null;

window.onload = function(){ 
	formElement=document.getElementById('myform');
	formElement.onsubmit=function(){
		inicializar();
		if (comprobar()){
			tituloCorreccion();
			corregirText("text", respuestaInput, "1ª");
			corregirSelect("sel", respuestaSelect, "2ª");
			corregirCheckbox("checkboxDiv", respuestasCheckbox, "3ª");
			corregirRadio("radioDiv", respuestaRadio, "4ª");
			corregirMultiple("selectMultiple", respuestasMultiple, "5ª");
			corregirText("text2", respuestaInput2, "6ª");
			corregirSelect("sel2", respuestaSelect2, "7ª");
			corregirCheckbox("checkboxDiv2", respuestasCheckbox2, "8ª");
			corregirRadio("radioDiv2", respuestaRadio2,"9ª");
			corregirMultiple("selectMultiple2", respuestasMultiple2, "10ª");
			presentarNota();
		}
		return false;
	}

	//	LEER XML de xml/preguntas.xml
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gestionarXml(this);
		}
	};
	xhttp.open("GET", "xml/preguntas.xml", true);
 	xhttp.send();

	//Funcion para no tener que usar el control en las preguntas de multiple select
	window.onmousedown = function (e) {
	    var el = e.target;
	    if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
		e.preventDefault();

		// toggle selection
		if (el.hasAttribute('selected')) el.removeAttribute('selected');
		else el.setAttribute('selected', '');

		// hack to correct buggy behavior
		var select = el.parentNode.cloneNode(true);
		el.parentNode.parentNode.replaceChild(select, el.parentNode);
	    }
	}

	document.getElementById("respuestasDetalladas").onclick = function(){
		document.getElementById("resultadoTotal").style.display = "none";
		document.getElementById("resultadosDiv").style.display = "block";
	}
}
//****************************************************************************************************
// 						Ponemos los datos del XML en el HTML
//****************************************************************************************************

function gestionarXml(dadesXml){
	xmlDoc = dadesXml.responseXML;


	//**********	TEXT	**********
	var tituloPregunta=xmlDoc.getElementsByTagName("title")[0].innerHTML;
	var idPregunta= "tituloInput";
	ponerDatosText(tituloPregunta, idPregunta);
	respuestaInput=xmlDoc.getElementById("quest001").getElementsByTagName("answer")[0].innerHTML;
	
	//**********	TEXT 2	**********
	tituloPregunta=xmlDoc.getElementsByTagName("title")[5].innerHTML;
	idPregunta= "tituloInput2";
	ponerDatosText(tituloPregunta, idPregunta);
	respuestaInput2=xmlDoc.getElementById("quest006").getElementsByTagName("answer")[0].innerHTML;


	//**********	SELECT	**********
	tituloPregunta=xmlDoc.getElementsByTagName("title")[1].innerHTML;
	idPregunta = "tituloSelect";
	var selectPosition = 0;
	var xpath="/questions/question[@id='quest002']/option";
	var nodeSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelect(tituloPregunta,nodeSelect, idPregunta, selectPosition);
	respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[2].innerHTML);

	//**********	SELECT 2	**********
	tituloPregunta=xmlDoc.getElementsByTagName("title")[6].innerHTML;
	idPregunta = "tituloSelect2";
	selectPosition = 2;
	xpath="/questions/question[@id='quest007']/option";
	nodeSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelect(tituloPregunta,nodeSelect, idPregunta, selectPosition);
	respuestaSelect2= parseInt(xmlDoc.getElementById("quest007").getElementsByTagName("answer")[0].innerHTML);

	//**********	CHECKBOX	**********
	tituloPregunta = xmlDoc.getElementsByTagName("title")[2].innerHTML;
	var idDiv = "checkboxDiv";
	idPregunta = "tituloCheckbox";
	xpath="/questions/question[@id='quest003']/option";
	var nodesCheckbox = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
	ponerDatosCheckboxHtml(tituloPregunta,nodesCheckbox, idDiv, idPregunta, "chckbx");
	
	var nres = xmlDoc.getElementById("quest003").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasCheckbox[i]=xmlDoc.getElementById("quest003").getElementsByTagName("answer")[i].innerHTML;
	}
	
	//**********	CHECKBOX 2	**********
	tituloPregunta = xmlDoc.getElementsByTagName("title")[7].innerHTML;
	idDiv = "checkboxDiv2";
	idPregunta = "tituloCheckbox2";
	xpath="/questions/question[@id='quest008']/option";
	var nodesCheckbox = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
	ponerDatosCheckboxHtml(tituloPregunta,nodesCheckbox, idDiv, idPregunta, "chckbx2");
	
	nres = xmlDoc.getElementById("quest008").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasCheckbox2[i]=xmlDoc.getElementById("quest008").getElementsByTagName("answer")[i].innerHTML;
	}

	//**********	RADIO	**********
	tituloPregunta = xmlDoc.getElementsByTagName("title")[3].innerHTML;
	idDiv = "radioDiv";
	idPregunta = "tituloRadio";
	xpath="/questions/question[@id='quest004']/option";
	var nodesRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
	ponerDatosRadio(tituloPregunta,nodesRadio, idDiv, idPregunta, "rd");

	respuestaRadio=xmlDoc.getElementById("quest004").getElementsByTagName("answer")[0].innerHTML;	
	
	//**********	RADIO 2	**********
	tituloPregunta = xmlDoc.getElementsByTagName("title")[8].innerHTML;
	idDiv = "radioDiv2";
	idPregunta = "tituloRadio2";	
	xpath="/questions/question[@id='quest009']/option";
	nodesRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null); 
	ponerDatosRadio(tituloPregunta,nodesRadio, idDiv, idPregunta, "rd2");
	 
	respuestaRadio2=xmlDoc.getElementById("quest009").getElementsByTagName("answer")[0].innerHTML;	

	//**********	MULTIPLE	**********
	tituloPregunta = xmlDoc.getElementsByTagName("title")[4].innerHTML;
	idPregunta = "tituloMultiple";
	selectPosition = 1;
	xpath="/questions/question[@id='quest005']/option";
	nodeSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelect(tituloPregunta,nodeSelect, idPregunta, selectPosition);

	nres = xmlDoc.getElementById("quest005").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasMultiple[i]=xmlDoc.getElementById("quest005").getElementsByTagName("answer")[i].innerHTML;
	}

	//**********	MULTIPLE2	**********
	tituloPregunta = xmlDoc.getElementsByTagName("title")[9].innerHTML;
	idPregunta = "tituloMultiple2";
	selectPosition = 3;
	var xpath="/questions/question[@id='quest010']/option";
	var nodeSelect = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelect(tituloPregunta,nodeSelect, idPregunta, selectPosition);

	nres = xmlDoc.getElementById("quest010").getElementsByTagName('answer').length;
	for (i = 0; i < nres; i++) { 
		respuestasMultiple2[i]=xmlDoc.getElementById("quest010").getElementsByTagName("answer")[i].innerHTML;
	}
}
//****************************************************************************************************
//							implementación de la corrección
//****************************************************************************************************

function corregirText(id, respuesta, numPreg){
	var s=document.getElementById(id).value;     
	if (s.toLowerCase()==respuesta) {
		darRespuestaHtml(numPreg + " pregunta: 1 punto");
		nota +=1;
	}else {
		darRespuestaHtml(numPreg + " pregunta: 0 puntos");
	}
}
function corregirSelect(id, respuesta, numPreg){
	var sel = document.getElementById(id); 
	if (sel.selectedIndex-1==respuesta) {
		darRespuestaHtml(numPreg + " pregunta: 1 punto");
		nota +=1;
	} else darRespuestaHtml(numPreg + " pregunta: 0 puntos");
}
function corregirCheckbox(id, respuestas,numPreg){
	var notaCheckbox = 0;
	var escorrecta = [];
	var inputs = document.getElementById(id).getElementsByTagName("input");
	for (i = 0; i < inputs.length; i++) {  
		if(inputs[i].checked) {
			escorrecta[i]=false;     
			for (j = 0; j < respuestas.length; j++) {
				if (i==respuestas[j]) escorrecta[i]=true;
			}
			//si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
			if (escorrecta[i]) {
				nota +=1.0/respuestas.length;  //dividido por el número de respuestas posibles
				notaCheckbox +=1.0/respuestas.length;
			} else {
				nota -=1.0/respuestas.length;  //dividido por el número de respuestas posibles   
			}   
		}
	}
	if (notaCheckbox != 1){
		darRespuestaHtml(numPreg + " pregunta: " + notaCheckbox + " puntos");
	} else darRespuestaHtml(numPreg + " pregunta: " + notaCheckbox + " punto");
}
function corregirRadio(id, respuesta, numPreg){
	var notaRadio = 0;
	var input = document.getElementById(id).getElementsByTagName("input");
	var escorrecta = null;
	for (i = 0; i < input.length; i++) {  //"rd" es el nombre asignado a todos los radio.
		if(input[i].checked) {
			escorrecta=false;   
			if (i==respuesta) escorrecta=true;
			//si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
			if (escorrecta) {
				notaRadio +=1.0;  //dividido por el número de respuestas posibles
				nota +=1.0;
			}   
		}
	}
	if (notaRadio != 1){
		darRespuestaHtml(numPreg + " pregunta: " + notaRadio + " puntos")
	} else darRespuestaHtml(numPreg + " pregunta: " + notaRadio + " punto")
}

function corregirMultiple(id, respuestas, numPreg){
	var escorrecta = [];
	var multiple = document.getElementById(id);
	var puntuacion = 0;
	for (var i = 0; i<multiple.options.length; i ++){
		if(multiple.options[i].selected){
			for (var j = 0; j<respuestas.length; j++){
				if(multiple.options[i].value == respuestas[j]){
					escorrecta.push(multiple.options[i].value);
				}
			}
		}
	}
	if (escorrecta.length > 0){
		puntuacion = escorrecta.length / respuestas.length;
		nota += puntuacion;
	}
	if (puntuacion != 1 & puntuacion != 0){
		darRespuestaHtml(numPreg + " pregunta: " + puntuacion.toFixed(1) + " puntos")
	} else if (puntuacion == 0){
		darRespuestaHtml(numPreg + " pregunta: 0 puntos");
	} else darRespuestaHtml(numPreg + " pregunta: 1 punto")
}
//****************************************************************************************************
//							poner los datos recibios en el HTML	
//****************************************************************************************************
function ponerDatosText(title, id){
	document.getElementById(id).innerHTML = title;
}
function ponerDatosSelect(title ,nodes, id, selPosition){
	document.getElementById(id).innerHTML=title;
	var select = document.getElementsByTagName("select")[selPosition];
	var result = nodes.iterateNext();
	i=0;
	while (result) {
		var option = document.createElement("option");
		option.text = result.innerHTML;
		option.value=i+1; i++;
		select.options.add(option);
		result = nodes.iterateNext();
	}  
}
function ponerDatosCheckboxHtml(title,nodes, iDiv, idPreg, tag){
	var checkboxContainer=document.getElementById(iDiv);
	document.getElementById(idPreg).innerHTML = title;
	var result = nodes.iterateNext();
	i=0;
	while (result) {
		var input = document.createElement("input");
		var label = document.createElement("label");   
		label.innerHTML = result.innerHTML;
		label.setAttribute("for", tag +i);
		input.type="checkbox";
		input.name= tag;
		input.id= tag +i; i++;
		checkboxContainer.appendChild(input);
		checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(document.createElement("br"));
		result = nodes.iterateNext();
		}    
}
function ponerDatosRadio(title,nodes, iDiv, idPreg, tag){
	var radioContainer=document.getElementById(iDiv);
	document.getElementById(idPreg).innerHTML = title;
	var result = nodes.iterateNext();
	i=0;
	while (result) {
		var input = document.createElement("input");
		var label = document.createElement("label");   
		label.innerHTML = result.innerHTML;
		label.setAttribute("for", tag +i);
		input.type="radio";
		input.name= tag;
		input.id= tag +i; i++;
		radioContainer.appendChild(input);
		radioContainer.appendChild(label);
		radioContainer.appendChild(document.createElement("br"));
		result = nodes.iterateNext();
		}    
}
//****************************************************************************************************
//						Gestionar la presentación de las respuestas
//****************************************************************************************************
function darRespuestaHtml(r){
	var p = document.createElement("p");
	var node = document.createTextNode(r);
	p.appendChild(node);
	document.getElementById('resultadosDiv').appendChild(p);
}
function darRespuestaTotal(r){
	document.getElementById("myform").style.display = "none";
	document.getElementById("resultadoTotal").style.display = "block";
	var p = document.createElement("p");
	var p2 = document.getElementById("respuestasDetalladas");
	p.id="total";
	p2.id="respuestasDetalladas";  
	var node = document.createTextNode(r);
	var node2= document.createTextNode("Para puntuación detallada, pulsa aquí:");
	p.appendChild(node);
	p2.appendChild(node2);
	document.getElementById('resultadoTotal').appendChild(p);
	document.getElementById('resultadoTotal').appendChild(p2);

}
function tituloCorreccion(){
	darRespuestaHtml("Puntuaci\u00F3n obtenida por pregunta:");
}
function presentarNota(){
	darRespuestaTotal("Puntuación total: "+ nota.toFixed(2));	
}
//	inicializar la corrección
function inicializar(){
	document.getElementById('resultadosDiv').innerHTML = "";
	nota=0.0;
}
//****************************************************************************************************
//									Comprobar respuestas 
//****************************************************************************************************
function comprobar(){
	var f=formElement;
	var checked=false;
	var checked2=false;
	var radioSelected=false;
	var radioSelected2=false;
	for (i = 0; i < f.chckbx.length; i++) {  //"chckbx" es el nombre asignado a todos los checkbox
		if (f.chckbx[i].checked) checked=true;
	}
	for (i = 0; i < f.chckbx2.length; i++) {  //"chckbx" es el nombre asignado a todos los checkbox
		if (f.chckbx2[i].checked) checked2=true;
	}
	for (i = 0; i < f.rd.length; i++) {
		if (f.rd[i].checked) radioSelected=true;
	}
	for (i = 0; i < f.rd2.length; i++) {
		if (f.rd2[i].checked) radioSelected2=true;
	}
	if (document.getElementById("text").value == "") {
		document.getElementById("text").focus();
		alert("La 1ª pregunta es obligatoria");
		return false;
	} else if (f.elements[1].selectedIndex==0) {
		document.getElementById("sel").focus();
		alert("Selecciona una de las opciones en la 2ª pregunta");
		return false;
	} if (!checked) {    
		document.getElementById("tituloCheckbox").scrollIntoView();
		alert("Debes elegir una opción en la 3ª pregunta");
		return false;
	} else if (!radioSelected) { 
		document.getElementById("tituloRadio").scrollIntoView();
		alert("Selecciona una opción en la 4ª pregunta");
		return false;
	} else if (document.getElementById("selectMultiple").selectedIndex == -1){
		alert("Responde la 5ª pregunta");
		document.getElementById("tituloMultiple").scrollIntoView();
		return false;
	} else 	if (document.getElementById("text2").value == "") {
		document.getElementById("text2").focus();
		alert("La 6ª pregunta es obligatoria");
		return false;
	} else if (document.getElementById("sel2").selectedIndex==0) {
		document.getElementById("sel2").focus();
		alert("Selecciona una de las opciones en la 7ª pregunta");
		return false;
	} else if (!checked2) {    
		document.getElementById("tituloCheckbox2").scrollIntoView();
		alert("Debes elegir una opción en la 8ª pregunta");
		return false;
	} else if (!radioSelected2) { 
		document.getElementById("tituloRadio2").scrollIntoView();
		alert("Selecciona una opción en la 9ª pregunta");
		return false;
	} else if (document.getElementById("selectMultiple2").selectedIndex == -1){
		alert("Responde la 10ª pregunta");
		document.getElementById("selectMultiple2").scrollIntoView();
		return false;
	}else return true;
}
