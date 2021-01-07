<!DOCTYPE html>
<html lang="es-es" dir="ltr">
<head>
<meta charset="utf-8" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Find It - reComercem Games - DAW2B - Grupo 1 "Xtrem Group" - Marcelo Goncevatt</title>
<meta name="title" content="Find It - reComercem Games - DAW2B - Grupo 1: Xtrm Group - Marcelo Goncevatt" />
<meta name="description" content="Find It - reComercem Games - DAW2B - Grupo 1: Xtrm Group - Marcelo Goncevatt" />
<meta name="keywords" content="Find It - reComercem Games - DAW2B - Grupo 1: Xtrm Group - Marcelo Goncevatt" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link href="css/findit.css" rel="stylesheet" type="text/css" />
</head>
<body onLoad="onloadFx()">

<!-- 
- Inicialmente el juego es una busqueda de diferencias que se ha cambiado a un "Donde esta wally"
- Esta idea permite configurar una image cualquiera y definir n areas para identificar elementos de una lista
- Es ideal para promover y realizar publicidad directa para acciones de marketing tipo "ofertas"
- Permitiria variarlos y tambien realizar sets de juegos diferentes
- Permite utilizar imagenes fotograficas en un contexto preparado y/o el uso de graficas creadas al efecto de la promocion
-->

<!-- Define contenedor base negro de ubicacion fija al 100% -->
<div id="BlackLayerBox" style="box-sizing: border-box; position:fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(255,255,255,.85); font-family:Arial, Helvetica, sans-serif; font-size:12px;">

	<?
	// - - - - - - - - - - - - - - - - - - - - Logo & Menu Part =>
	if ( file_exists( "../../_php_partials/00_game_header.php" ) ) { include_once("../../_php_partials/00_game_header.php"); }
	// - - - - - - - - - - - - - - - - - - - - Logo & Menu Part //
	?>

	<div id="langBox" style="position: fixed; top: 90px; left: 10px;">
		<h5 id="langTitle" style="margin: 0 0 5px;">Languages:</h5>
		<ul id="langList" style="padding: 0 0 0 15px; margin: 0;"></ul>
	</div>

	<!-- 
	Define contenedor principal del juego base blanco del juego 90%. 
	Ratio pantalla juego (imagen) 16:9 - Con un max-width: 1280px el height: 720px (1280 / 16 = 80 * 9 = 720) 
	-->
	<div id="MainBox" style="width: 90%; max-width:1024px; height:auto; margin: calc( ( 100vh - 620px ) / 2 ) auto 0; padding: 0;">
		
		<!-- Define barra de control e informacion:
		- Boton de cierre de juego
		- Contador de tipo countdown de 120 segundos que define la cantidad de puntos a asignar -->

		<div id="ControlBox" data-x="1024" data-y="576" data-items="20" data-marksize="30" data-sizextra="9" data-markused="0" data-visibility="0" data-markactive="-1" data-score="0" data-time="300">
			<button type="button" id="OpenListBtn" class="ControlBtns" onClick="displayBox(this,'thingsListBox',true,'txtContinue','txtPause')">Start Game</button>
			<div id="CounterdownBox">0"</div>
			<button id="EndGameBtn" class="ControlBtns" onClick="finishGame()">Finish Game</button>
			<div id="ScoreBox">0 Points</div>
			<button id="HelpBtn" class="ControlBtns" onClick="displayBox(this,'helpDataBox',true,'txtClose','txtView')">Open Help !!</button>
			<div id="RemainMarkerBox">20 Markers</div>
			<button id="ExitBtn" class="ControlBtns" onClick="displayBox(this,'',false,'','')">Exit Game</button>
		</div>

		<div id="GameLayerBox" style="position: relative; width: 100%; height: auto; background: center no-repeat #EEEBB5 url(images/recomercem_bg.png);">

			<img id="gameImage" src="" style="position:relative; width:100%; height:auto; z-index:10; visibility:hidden;" onClick="setMarker( event, this )" />

			<!-- Marcadores:
			- Box de bordes redondeados y color naranja en los fijadosSi no existe elemento debajo del click, lo crea 
			- Si no existe elemento debajo del click, lo crea 
			- Si existe, se "marca" para identificar el seleccionado (diferenciando color a "turquesa" y sombra ??)
			- Botones desplazar, Fijar y Eliminar marcador
			- Marcadores desplazables de tipo Drag&Drop limitados por los bordes del contenedor (se controla en funcion de drag)
			- -->

			<!-- Definir Lista de Cosas a Identificar en la imagen -->
			<ul id="thingsListBox" data-open="1"><h5 id="itmlistH5">Find:</h5></ul>

			<!-- Definir Help Data -->
			<div id="helpDataBox" data-open="0"></div>

		</div>

	</div>

</div>

<form id="endgame" action="/summary.html" method="POST">
	<input id="gameid" name="gameid" type="hidden" value="1" />
	<input id="finalscore" name="finalscore" type="hidden" value="" />
</form>

<script type="text/javascript" src="js/findit.js"></script>

</body>
