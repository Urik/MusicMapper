<!doctype html>
<html lang="en" ng-app>
<head>
<meta charset="utf-8">
<title>Music Mapper</title>
<link rel="stylesheet" href="css/app.css">
<link rel="stylesheet" href="css/bootstrap.css">
<style>
      body {
        padding-top: 20px; /* 60px to make the container go all the way to the bottom of the topbar */
      }
</style>
<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-39806427-1']);
	  _gaq.push(['_setDomainName', 'aws.af.cm']);
	  _gaq.push(['_setAllowLinker', true]);
	  _gaq.push(['_trackPageview']);

	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();

</script>

</head>
<body>
	<div id="wrap">
		<div class="container" ng-controller="ArtistsCtrl">
			<div class="row">
				<div class="span12">
					<h1 class="title">MusicMapper (beta)</h1>
				</div>
			</div>
			<div class="row buttons-bar">
				<div class="span12" style="top: 50%; margin-top: 20px;">
					<form>
						<input type="text" class="input-medium search-query" ng-model="artist" placeholder="Band name">
						<input type="number" placeholder="Search limits" ng-model="limit" class="input-medium search-query"> 
						<input type="number" placeholder="Depth of query" ng-model="depth" class="input-medium search-query"> 
						<button class="btn" ng-click="getArtists(artist)">Get similar artists</button>
					</form>
				</div>
			</div>
			<div class="row">
				<div class="span12">
					<p>Nodes count: {{nodesCount()}}</p>
					<p>Expected nodes: {{expectedNodes()}}</p>
				</div>
			</div>
			<div class="row">
				<div class="span12 sigma-parent" ng-mouseover="turnOffLayout()" ng-mouseleave="turnOnLayout()">
					<div id="graph1"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="footer">
		<div class="container footer-content">
			<div class="row">
				<div class="span9">
					<address>
						<strong>Uri Berman</strong><br>
						Email: uriberman@gmail.com <br>
						<a href="https://github.com/Urik">Github</a> <br>
						<a href="http://www.linkedin.com/profile/view?id=61083105">LinkedIn</a><br>
					</address>
					<p>Please report any bug or feature request to </br><strong>uriberman+musicmapper@gmail.com</strong>.
				</div>
				
				<div class="span3">
					<h4>Technologies used:</h4>
					<dl>
						<dt>Framework</dt>
						<dd><a href="http://angularjs.org/">AngularJS</a></dd>
						<dt>Graph rendering</dt>
						<dd><a href="http://sigmajs.org/">SigmaJS</a></dd>
						<dt>Bands database</dt>
						<dd><a href="http://last.fm/">last.fm</a></dd>
						<dt>CSS framework</dt>
						<dd><a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a></dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
	<script src="angular.min.js"></script>
	<script src="app.js"></script>
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="sigma.min.js"></script>
	<script src="sigma.forceatlas2.js"></script>
</body>
</html>