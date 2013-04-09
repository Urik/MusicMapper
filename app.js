function ArtistsCtrl($scope, $http) {
	$scope.artist ='';
	$scope.artists = [];
	$scope.queryArtist = '';
	$scope.depth = 3;
	$scope.limit = 5;
	addedBands = [];
	$scope.nodesCount = function() {
		return addedBands.length;
	};
	$scope.expectedNodes = function() {
		var i = 1;
		var result = 0;
		for (i = 1 ; i < $scope.depth + 1  ; i++) {
			result += Math.pow($scope.limit, i);
		}
		return 1 + result;
	};
	$scope.graph = {
		nodes: [], 
		artistName: ''
	};	
	$scope.output ='';
	graphInstance = null;
	$scope.turnOnLayout = function() {
		if (graphInstance) {
			graphInstance.startForceAtlas2();
			$scope.hideLabels();
		}
	};

	$scope.hideLabels = function(){
		graphInstance.iterNodes(function(n) {
			n.label = '';
		});
	};

	$scope.turnOffLayout = function(){
		if (graphInstance) {
			graphInstance.stopForceAtlas2();
			$scope.displayLabels();
		}
	};


	$scope.displayLabels = function() {
		graphInstance.iterNodes(function(n) {
			n.label = n.attr.artistName;
		});
	};

	$scope.getArtists = function(artist) {
		addedBands = [artist];
		search(artist, $scope.depth, {artistName: artist, depth: $scope.depth + 7, nodes: []}, addedBands, initializeGraph);
	};

	search = function(artist, depth, parent, addedBands, callback) {
		var artists = [];
		if (depth >= 1) {
			var encodedArtist = encodeURIComponent(artist);
			var encodedApiKey = encodeURIComponent('c6f5ad25b6120e5e42f312f4b6ebf4ad');
			var request = 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + encodedArtist + '&api_key=' + encodedApiKey + '&format=json&autocorrect=1';
			$http.get(request).success(function(data) {
				var response = JSON.stringify(data);
				if (data.similarartists) {
					artists = data.similarartists.artist;
				} else {
					artists = [];
				}
				if (artists instanceof Array) {
					artists = artists.filter(function(item) {
						return addedBands.indexOf(item.name) == -1;
					});
					if (artists.length > getLimit()) {
						artists = artists.slice(0, getLimit());
					}
					var pendingChildren = artists.length;
					if (pendingChildren == 0) {
						callback();
					}
					for(var i = 0 ; i < artists.length ; i++) {
						artistJson = artists[i];
						var newNode = {
							nodes: [],
							artistName: artistJson.name,
							parent: parent,
							depth: depth
						};
						parent.nodes.push(newNode);
						if (addedBands.indexOf(newNode.artistName) == -1) {
							addedBands.push(newNode.artistName);
							search(newNode.artistName, depth - 1, newNode, addedBands, function() {
								pendingChildren--;
								if(pendingChildren == 0) {
									callback(parent);
								}
							});
						}
					}
				} else {
					callback();
					return;
				}
			});
		} else {
			callback();
		}
	};
	
	initializeGraph = function(artistNode) {
		var canvas = document.getElementById('graph1');
		if (graphInstance == null) {
			graphInstance = sigma.init(canvas).graphProperties({
				minNodeSize: 0.5,
				maxNodeSize: 10,
				minEdgeSize: 1,
				maxEdgeSize: 1,
				}).drawingProperties({
					labelThreshold: 0
				});
		} else {
			graphInstance.emptyGraph();
		}
		populateGraph(graphInstance, artistNode, null, []);
		graphInstance.startForceAtlas2();
		graphInstance.draw();
	};

	populateGraph = function(graph, node, parent, addedBands) {
		if (addedBands.indexOf(node.artistName) == -1) {
			var label = '';
			graph.addNode(node.artistName, {
				label: label,
				artistName: node.artistName,
				'x': Math.random(),
				'y': Math.random(),
			 	'color': 'rgb('+Math.round(Math.random()*256)+','+
								Math.round(Math.random()*256)+','+
								Math.round(Math.random()*256)+')',
				size: 3 + node.depth
			});
			addedBands.push(node.artistName);
		}
		if (parent != null) {
			graph.addEdge(node.artistName + '_' + parent.artistName, node.artistName, parent.artistName);
		}
		for (var i = 0; i < node.nodes.length; i++) {
			populateGraph(graph, node.nodes[i], node, addedBands);
		}
	};

	$scope.messageShouldBeShown = function() {
		return $scope.queryArtist != '';
	};

	$scope.showResults = function() {
		return $scope.artists.length > 0;
	};
	getLimit = function() {
		if ($scope.depth == null) {
			return 0; //Don't specify a limit.
		} else {
			return $scope.limit;
		}
	};	
}