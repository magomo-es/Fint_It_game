// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Init =>

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - onload =>

function onloadFx() {

	setGameData();

	createMarkers();

	createItemList();

	traslateLang( 'eng' );

	document.getElementById("CounterdownBox").innerHTML = gameData.dataset.time + '"';

	// - - - - - traking mouse pointer

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - onload //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Init //




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Language =>

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - default data lang //

// - - - - - default lang data
var setLanguage = 'eng', langElemAry, langTextAry, setAvailableLangs, jsonLangElement = [], jsonLangText = [];
var setAvailableLangs = [ 'eng', 'esp', 'cat' ];
// - - - - - default JSON lang data
jsonLangElement['eng'] = '{"OpenListBtn":"<span>Start </span>Game","EndGameBtn":"Finish Game","HelpBtn":"<span>View </span>Help !","itmlistH5":"Find the following targets (logos and/or icons):","ExitBtn":"Quit Game","langTitle":"Languages:"}';
jsonLangElement['esp'] = '{"OpenListBtn":"<span>Iniciar </span>Juego","EndGameBtn":"Finalizar Partida","HelpBtn":"<span>Ver </span>Ayuda !","itmlistH5":"Encuentra los siguientes objetivos (logos y/o iconos):","ExitBtn":"Abandonar Juego","langTitle":"Idiomas:"}';
jsonLangElement['cat'] = '{"OpenListBtn":"<span>Iniciar </span>Joc","EndGameBtn":"Finalitzar Partida","HelpBtn":"<span>Veure </span>Ajuda !","itmlistH5":"Troba els següents objectius (logos i/o icones)","ExitBtn":"Abandonar Joc","langTitle":"Idiomes:"}';
jsonLangText['eng'] = '{"txtStart":"Start","txtView":"View","txtClose":"Close","txtPause":"Pause","txtContinue":"Continue","txtPoints":"Points","txtMarkers":"Markers","txtExitConfirm":"If you exit the game, you\'re gonna lose all the work you made it in. DO YOU REALLY WANT TO EXIT THE GAME ?"}';
jsonLangText['esp'] = '{"txtStart":"Inicio","txtView":"Ver","txtClose":"Cerrar","txtPause":"Pausa","txtContinue":"Continuar","txtPoints":"Puntos","txtMarkers":"Marcas","txtExitConfirm":"Si sales del juego, perderás todo el trabajo que hiciste. ¿DE VERDAD QUIERES SALIR DEL JUEGO?"}';
jsonLangText['cat'] = '{"txtStart":"Inici","txtView":"Veure","txtClose":"Tancar","txtPause":"Pausa","txtContinue":"Continuar","txtPoints":"Punts","txtMarkers":"Marques","txtExitConfirm":"Si sals del joc, perdràs tot el treball que vas fer. DE DEBÒ VOLS SORTIR DEL JOC?"}';	

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Genera lista de idiomas =>
for( tmpKey in setAvailableLangs ) {
	let tmpElement = document.createElement("LI");
	tmpElement.id = setAvailableLangs[ tmpKey ];
	tmpElement.style.padding = "3px 0";
	tmpElement.style.textTransform = "uppercase";
	tmpElement.style.cursor = "pointer";	
	tmpElement.addEventListener("click", function () { traslateLang( this.id ); });
	tmpElement.innerHTML = setAvailableLangs[ tmpKey ];
	document.getElementById('langList').appendChild(tmpElement);
}

// - - - - - funcion de get Lang Data con AJAX
function traslateLang( theLang ) {
	// open the lang config file
	var xRequest = new XMLHttpRequest();
	xRequest.open('GET', '/lang/text'+theLang+'.js', false); 
	xRequest.send(null);
	if (xRequest.status == 200) { 
		jsonLangText[theLang] = xRequest.responseText; 
	}
	// open the lang config file
	var xRequest = new XMLHttpRequest();
	xRequest.open('GET', '/lang/elem'+theLang+'.js', false); 
	xRequest.send(null);
	if (xRequest.status == 200) { 
		jsonLangElement[theLang] = xRequest.responseText; 
		console.log( "calling with traslateLang( "+setLanguage+" );" );
		traslateLang( setLanguage );
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - default data lang //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - funcion de traslate =>

function traslateLang( keyLang ) {

	// traduccion de elementos juego
	setLanguage = keyLang;
	langElemAry = JSON.parse( jsonLangElement[ keyLang ] );
	langTextAry = JSON.parse( jsonLangText[ keyLang ] );
	for( var indexKey in langElemAry ) { document.getElementById( indexKey ).innerHTML = langElemAry[ indexKey ]; }

	// info extras
	document.getElementById("ScoreBox").innerHTML = "0 " + langTextAry['txtPoints'];
	var tmpMarkers = ( parseInt( gameData.dataset.items ) - parseInt( gameData.dataset.markused ) );
	document.getElementById("RemainMarkerBox").innerHTML =  + tmpMarkers + " " + langTextAry['txtMarkers'];

	// traduccion de pistas
	var itmlist;
	for( var i = 0; i < theGameClues[ keyLang ].length; i++ ) {
		itmlist = document.getElementById("itmlist_"+i);
		itmlist.innerHTML = theGameClues[ keyLang ][i];
	}

	// traduccion de ayuda
	document.getElementById("helpDataBox").innerHTML = theGameHelp[ keyLang ];
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - funcion de traslate //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Language //




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - SYSTEM VARS =>

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - activeMarker
var activeMarker = null; // marcador activo


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - InExecution control
var inExecution = true, theOpener = "OpenListBtn"; // marcador activo


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - gameData
var gameData = document.getElementById("ControlBox"); // objeto de informacion de juego
// gameData.dataset.x="1280"
// gameData.dataset.y="720"
// gameData.dataset.items="20"
// gameData.dataset.marksize="30"
// gameData.dataset.markborder="4"
// gameData.dataset.markused="0"
// gameData.dataset.visibility="1"
// gameData.dataset.markactive="0"
// gameData.dataset.score="0"
// gameData.dataset.time="120"
var fullMarkerSize = parseInt( gameData.dataset.marksize ) + ( parseInt( gameData.dataset.sizextra ) * 2 );
var halfMarkerSize = parseInt( fullMarkerSize / 2 );


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - gameData
var gameLayerBox = document.getElementById("GameLayerBox"); // game layer

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - gameData
var gameImage = document.getElementById("gameImage"); // game image


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - CountDown
var theCounter, inPause = true; startCountDown( 1000 );


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Game Default Data
if ( !theGameImage ) { var theGameImage = "images/gameimg_1.jpg"; }

if ( !theGameTargets ) { 
	//	var theGameTargets = JSON.parse( '[{"description":"Item 00","x":100,"y":100},{"description":"Item 01","x":100,"y":200},{"description":"Item 02","x":100,"y":300},{"description":"Item 03","x":100,"y":400},{"description":"Item 04","x":100,"y":500},{"description":"Item 05","x":300,"y":100},{"description":"Item 06","x":300,"y":200},{"description":"Item 07","x":300,"y":300},{"description":"Item 08","x":300,"y":400},{"description":"Item 09","x":300,"y":500},{"description":"Item 10","x":500,"y":100},{"description":"Item 11","x":500,"y":200},{"description":"Item 12","x":500,"y":300},{"description":"Item 13","x":500,"y":400},{"description":"Item 14","x":500,"y":500},{"description":"Item 15","x":900,"y":100},{"description":"Item 16","x":900,"y":200},{"description":"Item 17","x":900,"y":300},{"description":"Item 18","x":900,"y":400},{"description":"Item 19","x":900,"y":500}]' );
	var theGameTargets = [
		{"x":19,"y":100,"xx":89,"yy":153},
		{"x":153,"y":98,"xx":231,"yy":158},
		{"x":277,"y":14,"xx":349,"yy":68},
		{"x":424,"y":76,"xx":493,"yy":133},
		{"x":924,"y":96,"xx":1007,"yy":143},
		{"x":114,"y":311,"xx":181,"yy":368},
		{"x":14,"y":348,"xx":76,"yy":403},
		{"x":899,"y":212,"xx":966,"yy":282},
		{"x":911,"y":302,"xx":996,"yy":345},
		{"x":702,"y":196,"xx":767,"yy":257},
		{"x":376,"y":248,"xx":443,"yy":309},
		{"x":281,"y":250,"xx":353,"yy":320},
		{"x":467,"y":200,"xx":526,"yy":261},
		{"x":397,"y":335,"xx":474,"yy":406},
		{"x":587,"y":393,"xx":655,"yy":449},
		{"x":878,"y":449,"xx":949,"yy":516},
		{"x":958,"y":478,"xx":1011,"yy":566},
		{"x":788,"y":533,"xx":925,"yy":568},
		{"x":673,"y":504,"xx":761,"yy":562},
		{"x":85,"y":526,"xx":173,"yy":572}
	];
}

if ( !theGameClues ) { 

	var theGameClues = [];
	theGameClues['eng'] = ["Complete development IDE from Microsoft.","Internet services company with a recognized and pioneering search engine founded in 1994.","Open source, cross-platform, runtime environment based on JavaScript.","General-purpose programming language that is especially adapted to web development.","Search engine that emphasizes privacy by not recording user information.","Germany hosting, cloud and domain service provider owned by Deutsche Telekom.","Interpreted programming language, dialect of the ECMAScript standard.","Commodore International Company.","Software icon that allows a user to operate a computer remotely.","Discontinued vector graphic editor for Macromedia / Adobe web designs.","Recognized manufacturer of computers and electronic devices in the USA.","Japanese manufacturer of computers and electronic devices.","Microsoft presentation editing program.","File transfer software based on client server protocol.","Hybrid programming language and general purpose widely used and that its name derives and complements the so-called ANSI.","Cross-platform library or open source toolkit for web site and application design.","Windows 98 logo.","Manufacturer of large equipment and the first Personal Computer with MSDOS.","Version control software designed by Linus Torvalds.","Programming language originally developed by Sun Microsystems (Oracle)."];
	theGameClues['esp'] = ["Completo IDE de desarrollo de Microsoft.","Empresa de servicios de internet con un reconocido y pionero motor de busqueda fundado 1994.","Entorno en tiempo de ejecución, multiplataforma y de código abierto basado en JavaScript.","Lenguaje de programación de uso general que se adapta especialmente al desarrollo web.","Motor de búsqueda que hace hincapié en la privacidad al no registrar la información del usuario.","Prestador de servicios de alojamiento, cloud y dominios de Alemania cuyo propietaria es Deutsche Telekom.","Lenguaje de programación interpretado, dialecto del estándar ECMAScript.","Empresa Commodore International.","Icono del software que permite a un usuario utilizar un ordenador a distancia.","Editor gráfico vectorial orientado a diseños web de Macromedia/Adobe ya descatalogado.","Reconocido fabricante de ordenadores y dispositivos electronicos de EEUU.","Fabricante japonés de ordenadores y dispositivos electrónicos.","Programa de edición de presentaciones de Microsoft.","Software de transferencia de archivos basado en protocolo cliente servidor.","Lenguaje de programación híbrido y propósito general muy utilizado y que su nombre deriva y complementa el denominado ANSI.","Biblioteca multiplataforma o conjunto de herramientas de código abierto para diseño de sitios y aplicaciones web.","Logotipo de Windows 98.","Fabricante de grandes equipos y del primer Personal Computer con MSDOS.","Software de control de versiones diseñado por Linus Torvalds.","Lenguaje de programación desarrollado originalmente por Sun Microsystems (Oracle)."];
	theGameClues['cat'] = ["Complet IDE de desenvolupament de Microsoft.","Empresa de serveis d'internet amb un reconegut i pioner motor de cerca fundat 1994.","Entorn en temps d'execució, multiplataforma i de codi obert basat en JavaScript.","Llenguatge de programació d'ús general que s'adapta especialment a el desenvolupament web.","Motor de cerca que posa l'accent en la privacitat a ell no registrar la informació de l'usuari.","Prestador de serveis d'allotjament, cloud i dominis d'Alemanya el propietària és Deutsche Telekom.","Llenguatge de programació interpretat, dialecte de l'estàndard ECMAScript.","Empresa Commodore International.","Icona de l'programari que permet a un usuari utilitzar un ordinador a distància.","Editor gràfic vectorial orientat a dissenys web de Macromedia / Adobe ja descatalogat.","Reconegut fabricant d'ordinadors i dispositius electrònics dels EUA.","Fabricant japonès d'ordinadors i dispositius electrònics.","Programa d'edició de presentacions de Microsoft.","Programari de transferència d'arxius basat en protocol client servidor.","Llenguatge de programació híbrid i propòsit general molt utilitzat i que el seu nom deriva i complementa l'anomenat ANSI.","Biblioteca multiplataforma o conjunt d'eines de codi obert per a disseny de llocs i aplicacions web.","Logotip de Windows 98.","Fabricant de grans equips i del primer Personal Computer amb MSDOS.","Programari de control de versions dissenyat per Linus Torvalds.","Llenguatge de programació desenvolupat originalment per Sun Microsystems (Oracle)"];

}


if ( !theGameHelp ) { 

	var theGameHelp = [];
	theGameHelp['eng'] = "<p>Game inspired by the book series \"Where's Wally\" (Where is Wally), created by the British cartoonist Martin Handford in 1987, where the user has a limited time (5 ') to find the requested objectives and indicate them by using the mouse pointer generating a mark. These pointers are selectable, draggable, dockable, and removable. The number of markers available is the same as the objectives.</p><p>Before starting the game, the tracks of the objectives to be located are displayed and can be seen as many times as desired without time penalty.</p><p>When the user views an option that pauses the game, the execution time stops and the main image is not displayed until the option is returned.</p><p>The game allows you to leave the game without registering any score at any time during the game. After the game is over, points are calculated by dividing the time remaining by the number of objectives and multiplying by the number of targets found.</p>";
	theGameHelp['esp'] = "<p>Juego inspirado en la serie de libros \“Where's Wally\” (Donde esta Wally), creada por el dibujante británico Martin Handford en 1987, donde el usuario dispone de un tiempo limitado (5’) para encontrar los objetivos solicitados e indicarlos mediante el uso del puntero del mouse generando una marca. Estos punteros son seleccionables, arrastrables, fijables y eliminables. La cantidad de marcadores disponibles es la misma que los objetivos. </p><p>Antes de comenzar el juego se visualizan las pistas de los objetivos a localizar y se pueden ver tantas veces como se desee sin penalización de tiempo.</p><p>Cuando el usuario visualiza alguna opción que genere una pausa sobre el juego, el tiempo de ejecución se detiene y no se visualiza la imagen principal hasta que se retorne de la opción.</p><p>El juego permite abandonar la partida sin registrar ninguna puntuación en cualquier momento de la partida. Una vez finalizado el juego, los puntos se calculan dividiendo el tiempo restante por la cantidad de objetivos y multiplicado por la cantidad de targets encontrados.</p>";
	theGameHelp['cat'] = "<p>Joc inspirat en la sèrie de llibres \"Where 's Wally\" (On aquesta Wally), creada pel dibuixant britànic Martin Handford el 1987, on l'usuari disposa d'un temps limitat (5') per trobar els objectius sol·licitats i indicar-los mitjançant l'ús de l' punter de el ratolí generant una marca. Aquests punters són seleccionables, arrossegables, fixables i eliminables. La quantitat de marcadors disponibles és la mateixa que els objectius.</p><p>Abans de començar el joc es visualitzen les pistes dels objectius a localitzar i es poden veure tantes vegades com es vulgui sense penalització de temps.</p><p>Quan l'usuari visualitza alguna opció que generi una pausa sobre el joc, el temps d'execució s'atura i no es visualitza la imatge principal fins que es retorni de l'opció.</p><p>El joc permet abandonar la partida sense registrar cap puntuació en qualsevol moment de la partida. Un cop finalitzat el joc, els punts es calculen dividint el temps restant per la quantitat d'objectius i multiplicat per la quantitat de targets trobats.</p>";

}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - setGameData =>

function setGameData() {

	// - - - - carga los set de juegos disponibles. Si no existe, se utilizara el default. Esta funcion se destina a cargar odiferentes set de juegos.
	gameImage.src = theGameImage;

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - setGameData //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - SYSTEM VARS //



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Targets =>

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - createItemList =>

function createItemList() {

	var thingsListBox = document.getElementById("thingsListBox");
	var itmlist;

	for( var i = 0; i < theGameTargets.length; i++ ) {

		itmlist = document.createElement("LI");
		itmlist.id = "itmlist_" + i;
		itmlist.classList.add( "searchItemLst" );
		itmlist.setAttribute( "data-state", 0 );
		itmlist.innerHTML = theGameClues[setLanguage][i];
		thingsListBox.appendChild( itmlist );

	}

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - createItemList //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Targets =>




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Markers =>

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Crea elemento opciones de marcador =>
var markerFixer = document.createElement("DIV");
markerFixer.id = "markerThumbtack";
//markerFixer.class="markerOptions";
markerFixer.classList.add("markerOptions");
markerFixer.classList.add("markerOptsRight");
markerFixer.onclick = unselectMarker;
markerFixer.innerHTML = '<svg viewBox="0 0 384 512"><path fill="currentColor" d="M306.5 186.6l-5.7-42.6H328c13.2 0 24-10.8 24-24V24c0-13.2-10.8-24-24-24H56C42.8 0 32 10.8 32 24v96c0 13.2 10.8 24 24 24h27.2l-5.7 42.6C29.6 219.4 0 270.7 0 328c0 13.2 10.8 24 24 24h144v104c0 .9.1 1.7.4 2.5l16 48c2.4 7.3 12.8 7.3 15.2 0l16-48c.3-.8.4-1.7.4-2.5V352h144c13.2 0 24-10.8 24-24 0-57.3-29.6-108.6-77.5-141.4zM50.5 304c8.3-38.5 35.6-70 71.5-87.8L138 96H80V48h224v48h-58l16 120.2c35.8 17.8 63.2 49.4 71.5 87.8z" class=""></path></svg>';
var markerDelete = document.createElement("DIV");
markerDelete.id = "markerTrash";
markerDelete.classList.add("markerOptions");
markerDelete.classList.add("markerOptsRight");
markerDelete.onclick = deleteMarker;
markerDelete.innerHTML = '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z" class=""></path></svg>';
var markerOptions = document.createElement("DIV");
markerOptions.id = "markerOption";
markerOptions.style.display = "block";
markerOptions.style.position = "relative";
markerOptions.style.marginTop = "-32px";
markerOptions.appendChild(markerFixer);
markerOptions.appendChild(markerDelete);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Crea elemento opciones de marcador //


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - createMarkers =>

function createMarkers() {

	var tmpItems = parseInt( gameData.dataset.items );

	var markerInner = '<svg role="img" style="width: 100%;height: 100%; filter: drop-shadow(0px 0px 2px rgb(0, 0, 0));" viewBox="0 0 320 512" onClick="checkthis(this.parentElement)"><path fill="currentColor" d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z" class=""></path></svg>';

	var thingsListBox = document.getElementById("thingsListBox");

	var markerElement;

	for( var i = 0; i < tmpItems; i++ ) {

		markerElement = document.createElement("DIV");
		markerElement.id = "marker_" + i
		markerElement.classList.add("markersBox");
		markerElement.classList.add("markersOffline");
		markerElement.setAttribute( "data-id", i );
		markerElement.setAttribute( "data-state", 0 );
		markerElement.innerHTML = markerInner;

		gameLayerBox.appendChild( markerElement );

	}

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - createMarkers //


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - setMarker =>

function checkthis( targetObj ) {

	if ( parseInt( targetObj.dataset.state ) == 1 && targetObj.dataset.id != gameData.dataset.markactive ) { 

		selectMarker( targetObj ); 

	}

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - setMarker =>


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - setMarker =>

function setMarker( ev, targetObj ) {

	// control de marcadores usados
	if ( parseInt( gameData.dataset.markused ) < parseInt( gameData.dataset.items ) ) {

		var varX = parseInt( gameData.dataset.x );
		var varY = parseInt( gameData.dataset.y );

		// calc X
		var targetX = ev.offsetX - halfMarkerSize;

		// calc Y
		var targetY = ev.offsetY - halfMarkerSize;

		//console.log( 'fullMarkerSize: ' + fullMarkerSize + ' | halfMarkerSize: ' +  halfMarkerSize + ' | targetX: ' + targetX + ' | targetY: ' + targetY );
		// control X
		if ( targetX < 0 ) { targetX = 0; } else if ( (targetX + fullMarkerSize) >= ( varX ) ) { targetX = ( varX - fullMarkerSize ); }
		// control Y
		if ( targetY < 0 ) { targetY = 0; } else if ( (targetY + fullMarkerSize) >= ( varY ) ) { targetY = ( varY - fullMarkerSize ); }
		//console.log( 'fullMarkerSize: ' + fullMarkerSize + ' | halfMarkerSize: ' +  halfMarkerSize + ' | targetX: ' + targetX + ' | targetY: ' + targetY );

		// selecciona proximo marcador libre
		markerObj = getNextMarker();

		// posiciona y activa marcador
		markerObj.classList.remove("markersOffline");
		markerObj.classList.add("markersInline");
		//markerObj.style.top = targetY + "px";
		markerObj.style.top = (targetY * 100) / gameLayerBox.offsetHeight + "%";
		//markerObj.style.left = targetX + "px";
		markerObj.style.left = (targetX * 100) / gameLayerBox.offsetWidth + "%";

		markerObj.dataset.state = "1";

		// asigna como seleccionado
		selectMarker( markerObj );

		// suma a marcadores usados
		gameData.dataset.markused = parseInt( gameData.dataset.markused ) + 1;
		// visualiza marcadores restantes
		document.getElementById("RemainMarkerBox").innerHTML = ( parseInt( gameData.dataset.items ) - parseInt( gameData.dataset.markused ) ) + " " + langTextAry["txtMarkers"];



	} else { 

		alert("Ya se han utilizado todos los marcadores disponibles (" + gameData.dataset.markused + "/" + gameData.dataset.items + "), debe eliminar o desplazar alguno de los marcadores de la imagen");

	}

}	

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - setMarker //


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - getNextMarker =>

function getNextMarker() { 
	// retorna primer marcador libre de la lista
	return markerObj = document.querySelector('.markersBox[data-state="0"]');
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - getNextMarker //


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - selectMarker =>

function selectMarker( targetObj ) {

	// unselect lastone
	if ( activeMarker ) { unselectMarker(); }

	activeMarker = targetObj;

	gameData.dataset.markactive = targetObj.dataset.id

	targetObj.style.cursor = "move";
	targetObj.classList.remove("markersInactive");
	targetObj.classList.add("markersActive");

	//console.log( parseInt(targetObj.style.left.substring(0, targetObj.style.left.length-2)) + ' > ( parseInt( ' + gameData.dataset.x + ' ) / 2 ) ' );

	if ( targetObj.offsetLeft > ( gameData.offsetWidth / 2 ) ) {
		markerFixer.classList.remove("markerOptsRight");
		markerFixer.classList.add("markerOptsLeft");
		markerDelete.classList.remove("markerOptsRight");
		markerDelete.classList.add("markerOptsLeft");
	} else {
		markerFixer.classList.remove("markerOptsLeft");
		markerFixer.classList.add("markerOptsRight");
		markerDelete.classList.remove("markerOptsLeft");
		markerDelete.classList.add("markerOptsRight");
	}

	targetObj.appendChild( markerOptions );

	// - - - - - Make the DIV element PSEUDO-DRAGGABLE
	dragActiveMarker();

//	targetObj.draggable = "true";
//	targetObj.ondragstart = onDragStartMarker;	// El evento ocurre cuando el usuario comienza a arrastrar un elemento

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - selectMarker //


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - dragActiveMarker =>

function dragActiveMarker(){

	var dragOK = true;
	
	var mouseX, mouseY;

	var dataLayer = gameLayerBox.getBoundingClientRect();

    activeMarker.onmousedown = dragMarker; // asigna funcion "dragMarker" de desplazamiento de elemento cuando el boton esta presionado

	function dragMarker( ev ) {
		ev = ev || window.event; // toma parametro o evento ocurrido
		ev.preventDefault(); // prevencion de evento por default
		// - - - - - coordenadas de puntero de raton
		mouseX = ev.clientX;
		mouseY = ev.clientY;
	    document.onmousemove = draggingMarker; // Inicia funcion cuando el mouse se desplaza (no boton presionado)
	    document.onmouseup = dropMarker; // Finaliza desplazamiento de elemento cuando se suelta el boton del mouse
	}

	function draggingMarker( ev ) {
		ev = ev || window.event; // toma parametro o evento ocurrido
		ev.preventDefault(); // prevencion de evento por default
		// calcula coordenadas de puntero de raton
		var tmpX = activeMarker.offsetLeft - ( mouseX - ev.clientX ); 
		var tmpY = activeMarker.offsetTop - ( mouseY - ev.clientY );
		// - - - - - control de outside layer
		if ( tmpX < 0 ) { tmpX = 0; } 
		else if ( ( tmpX + fullMarkerSize ) >= dataLayer.width ) { tmpX = dataLayer.width - fullMarkerSize; } 
		if ( tmpY < 0 ) { mouseY = tmpY = 0; } 
		else if ( ( tmpY + fullMarkerSize ) >= dataLayer.height ) { mouseY = tmpY = dataLayer.height - fullMarkerSize; } 
		// - - - - - establece posicion de marcador
		//activeMarker.style.left = ( tmpX ) + "px";
		activeMarker.style.left = (tmpX * 100) / gameLayerBox.offsetWidth + "%";
		//activeMarker.style.top = ( tmpY ) + "px";
		activeMarker.style.top = (tmpY * 100) / gameLayerBox.offsetHeight + "%";
		mouseX = ev.clientX;		
		mouseY = ev.clientY;
		// control de visualizacion de opciones
		if ( activeMarker.offsetLeft > ( gameData.offsetWidth / 2 ) ) {
			markerFixer.classList.remove("markerOptsRight");
			markerFixer.classList.add("markerOptsLeft");
			markerDelete.classList.remove("markerOptsRight");
			markerDelete.classList.add("markerOptsLeft");
		} else {
			markerFixer.classList.remove("markerOptsLeft");
			markerFixer.classList.add("markerOptsRight");
			markerDelete.classList.remove("markerOptsLeft");
			markerDelete.classList.add("markerOptsRight");
		}

	}

	function dropMarker() { // stop moving when mouse
		document.onmouseup = null;
		document.onmousemove = null;
	}

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - dragActiveMarker //


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - unselectMarker =>

function unselectMarker() {

	// unset active marker (markactive)
	gameData.dataset.markactive = "-1";

	// modify pointer
	activeMarker.style.cursor = "pointer";

	// no es necesario para mover pero si lo es para fijar el elemento
	activeMarker.removeChild( markerOptions );

	// reasign classes
	activeMarker.classList.remove("markersActive");
	activeMarker.classList.add("markersInactive");

	// deactivate drag
	activeMarker.onmousedown = null;

	// clean var activeMaker
	activeMarker = null;

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - unselectMarker =>


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - deleteMarker =>

function deleteMarker() {

	activeMarker.classList.remove("markersInline");
	activeMarker.classList.add("markersOffline");
	activeMarker.style.top = "0";
	activeMarker.style.left = "-50px";
	activeMarker.dataset.state = "0";

	// suma a marcadores usados
	gameData.dataset.markused = parseInt( gameData.dataset.markused ) - 1;
	// visualiza marcadores restantes
	document.getElementById("RemainMarkerBox").innerHTML = ( parseInt( gameData.dataset.items ) - parseInt( gameData.dataset.markused ) ) + " " + langTextAry["txtMarkers"];

	unselectMarker();

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - visibilityMarkersAll =>

function visibilityMarkersAll() { 

	var visibilityValue;

	if ( parseInt( gameData.dataset.visibility ) == 1 ) { 

		visibilityValue = "hidden"; 
		gameData.dataset.visibility = 0;

	} else { 

		visibilityValue = "visible"; 
		gameData.dataset.visibility = 1;

	}

	var theResult = document.querySelectorAll('.markersBox');

	if ( theResult ) {

		for ( var i = 0; i < theResult.length; i++ ) { theResult[i].style.visibility = visibilityValue; } 

	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - visibilityMarkersAll //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Markers //




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Menu Options =>

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - openbox =>

function displayBox( originObj, boxId, optionText, openBoxText, closeBoxText ) { 

	//alert( inExecution + " | " + theOpener + " | " + originObj.id + " | " + boxId );

	var rootElement = document.documentElement;
	var colorWhite = getComputedStyle(rootElement).getPropertyValue("--colWhite");
	var colorPrimary = getComputedStyle(rootElement).getPropertyValue("--colPrimary");

	if ( !inExecution || theOpener == originObj.id ) {

		var targetObj;

		if ( boxId ) { targetObj = document.getElementById( boxId ); }
	
		if ( !targetObj ) { // sin elemento para abrir 

			inExecution = true; theOpener = originObj.id;
			
			visibilityMarkersAll();

			document.getElementById("gameImage").style.visibility = "hidden";
	
			pauseCountDown();

			originObj.style.backgroundColor = colorPrimary;
			originObj.style.color = colorWhite;

			if ( confirm( langTextAry['txtExitConfirm'] ) ) { 
				
				window.location.href = "http://recomercem.es/index.html"; 
		
			} else {

				visibilityMarkersAll();

				document.getElementById("gameImage").style.visibility = "visible";

				pauseCountDown();

				originObj.style.backgroundColor = colorWhite;
				originObj.style.color = colorPrimary;

				inExecution = false; theOpener = "";
				
			}

		} else if ( targetObj.dataset.open == "0" ) { 
	
			inExecution = true;
			theOpener = originObj.id;
	
			targetObj.style.height = "auto"; 
			targetObj.style.padding = "10px"; 
			targetObj.dataset.open = "1";
	
			if ( optionText ) { originObj.children[0].innerHTML = langTextAry[openBoxText]+" "; }

			originObj.style.backgroundColor = colorPrimary;	// old era "#ffcb00";
			originObj.style.color = colorWhite;
	
			visibilityMarkersAll();

			document.getElementById("gameImage").style.visibility = "hidden";
	
			pauseCountDown();
	
		} else { 
	
			inExecution = false;
			theOpener = "";
	
			targetObj.style.height = "0"; 
			targetObj.style.padding = "0"; 
			targetObj.dataset.open = "0";
	
			if ( optionText ) { originObj.children[0].innerHTML = langTextAry[closeBoxText]+" "; }

			originObj.style.backgroundColor = colorWhite;
			originObj.style.color = colorPrimary;	// old era "#ffcb00";
	
			visibilityMarkersAll();

			pauseCountDown();
	
			document.getElementById("gameImage").style.visibility = "visible";
	
		} 

	}

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - openbox //


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - finishGame =>

function finishGame() {

	endCountDown();

	visibilityMarkersAll();

	document.getElementById("gameImage").style.visibility = "hidden";

	document.getElementById("OpenListBtn").onclick = null;
	document.getElementById("EndGameBtn").onclick = null;
	document.getElementById("HelpBtn").onclick = null;

	// - - - - - Control de aciertos (collisions?) =>

	var targetsFinded = 0;

	var theMarkers = document.querySelectorAll('.markersBox[data-state="1"]');

	var logstring;

	if ( theMarkers ) {

		for ( var i = 0; i < theMarkers.length; i++ ) { 

			tLeft = theMarkers[i].offsetLeft + halfMarkerSize;
			tTop = theMarkers[i].offsetTop + halfMarkerSize;

			gotIt = false;

console.log( "Marker point "+tLeft+","+tTop+" => ");

			for( var j = 0; j < theGameTargets.length; j++ ) {

				if ( tLeft > theGameTargets[j]['x'] && tLeft < theGameTargets[j]['xx'] && 
					 tTop > theGameTargets[j]['y'] && tTop < theGameTargets[j]['yy'] ) {

					gotIt = true;

				}

console.log( "- target "+theGameTargets[j]['x']+","+theGameTargets[j]['y']+" - "+ (theGameTargets[j]['xx'])+","+(theGameTargets[j]['yy'])+((gotIt)?"GOT":"") );

			}

			if (gotIt) { 
				++targetsFinded; 
console.log( ">>> Encontrado !" );
			} else {
console.log( "--- no one got it" );
			}

		} 

	}

	// - - - - - Control de aciertos (collisions?) //

	var elapsedTime = parseInt ( gameData.dataset.time );
	var pointsByTarget = parseInt ( elapsedTime / parseInt ( gameData.dataset.items ) );
	var totalScore = pointsByTarget * targetsFinded;

	gameData.dataset.score = totalScore;
	document.getElementById("ScoreBox").innerHTML = totalScore + " " + langTextAry["txtPoints"];

	alert("Finish the Game & Get my Points': You\'ve got " + targetsFinded + " of " + gameData.dataset.items + " targets. Your final score is " + totalScore + " points !!!" );

	// resumen de juego y salida a summary por formulario post
	document.getElementById('finalscore').value = totalScore;
	document.getElementById('endgame').submit();

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - finishGame //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Menu Options //




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - CountDown =>

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - startCountDown =>

function startCountDown( nTime ) {

	theCounter = window.setInterval( function() {

		if ( !inPause ) {

			var tmpTime = parseInt( gameData.dataset.time ) - 1;

			if ( tmpTime < 0 ) { 

				inPause = true; 

				finishGame();

			} else {

				gameData.dataset.time = tmpTime;

				document.getElementById("CounterdownBox").innerHTML = gameData.dataset.time + '"';

			}

		}

	}, nTime );

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - startCountDown //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - pauseCountDown =>

function pauseCountDown() { inPause = !inPause; }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - pauseCountDown //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - endCountDown =>

function endCountDown() { window.clearTimeout( theCounter ); inPause = false; }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - endCountDown //

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - CountDown //




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - TrakingMouse //

var mouseTrack = false; 
var pntrX = document.getElementById("pointerX"); 
var pntrY = document.getElementById("pointerY"); 
//setMouseTrack();
function setMouseTrack() { 
	if ( !mouseTrack ) { 
		gameImage.addEventListener( 'mousemove', e => { pntrX.innerHTML = parseInt(e.offsetX); pntrY.innerHTML = parseInt(e.offsetY); } ); 
	} else { 
		gameImage.removeEventListener( 'mousemove', e => { } ); 
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - TrakingMouse //