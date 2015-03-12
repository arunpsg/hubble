var app = angular.module('formApp', []);

/*app.config( function( $controllerProvider ) {
    $controllerProvider.register( 'dashController', function( $scope) {
    }
}*/

app.controller('dashController', [ '$scope', function($scope) {

	
	$scope.helpUrl='http://www8.hp.com/us/en/privacy/terms-of-use.html';
	$scope.video = 'QWnXDZ7Ca4k';
	
	
	$scope.alertMe = function(cnt){
		alert(cnt);
		console.log(cnt);
	}
	
	$scope.addCSS = function(css){
		$scope.alertMe(css);
	}
	
	$scope.showVideo = false;
	$scope.videoId = '';
	
	
	$scope.showVideoModal = function (videoUrl){
		$scope.showVideo = true;
		$scope.videoId = $scope.video;
		$scope.videoCtrl('helpVideo', 'startVideo');
	}
	
	
	$scope.stopVideo = function(attId){
		$scope.showVideo = false;
		$scope.videoId = '';
		$scope.videoCtrl(attId, 'stopVideo');
	}
	
	$scope.videoCtrl = function(id, cmd) {
		if ($('#' + id)[0]) {
			$('#' + id)[0].contentWindow.postMessage(
					'{"event":"command","func":"' + cmd
							+ '","args":""}', '*');
		} else {
		}
	};
	
	$scope.showHelp = false;
	$scope.helpFile = '';
	$scope.showhelpModal = function (att){
		$scope.showHelp = true;
		$scope.helpFile = $scope.helpUrl;
	}
	$scope.hidehelpModal = function (){
		$scope.showHelp = false;
		$scope.helpFile = '';
	}
	
	
} ]);

app.directive("markable", function() {
    return {
        link: function(scope, elem, attrs) {
        	
        	 
        	
            elem.on("click", function() {
            	
            	if(elem.hasClass('toggleColor')){
            		elem.removeClass("toggleColor");
            		elem.removeClass("glyphicon-check");
            		elem.addClass("glyphicon-unchecked");            		
                    elem.parent().find(".taskName").removeClass("toggleColor");
            	}
            	else{
            		elem.addClass("toggleColor");
            		elem.removeClass("glyphicon-unchecked");
            		elem.addClass("glyphicon-check");            		
                    elem.parent().find(".taskName").addClass("toggleColor");
            	}
                
            });
        }
    };
    
    
});

app.directive("videocontent", function() {
	return {
		restrict : 'AE',
		templateUrl : '/dashboard/modals/video.html'
	};
});

app.directive("helpcontent", function() {
	return {
		restrict : 'AE',
		templateUrl : '/dashboard/modals/help.html'
	};
});



app.directive(
		'playvideo',
		function($sce, $location) {
			return {
				restrict : 'EA',
				scope : {
					video : '=',
					myid : '@',
					width : '@',
					height : '@',
				},
				replace : true,
				template : '<iframe id="{{myid}}"  width="{{width}}" height="{{height}}" src="{{url}}" frameborder="0" ></iframe>',
				link : function(scope) {
					var id = scope.myid;

					scope.$watch( 'video',
									function(newVal) {
										if (newVal) {
											scope.url = $sce
													.trustAsResourceUrl('https://www.youtube.com/embed/'+newVal+'?autoplay=1&enablejsapi=1&version=3&wmode=transparent&rel=0&playerapiid=ytplayer&controls=2&showinfo=1&autohide=1&origin=');
										}
										else{
											scope.url = '';
										}
									});

				}
			};
		});
app.directive(
		'helpdir',
		function($sce, $location) {
			return {
				restrict : 'EA',
				scope:{
					hlpcntent:'='
				},
				replace : true,
				template : '<iframe  width="100%" height="100%" src="{{targetHlpUrl}}" frameborder="0" ></iframe>',
				link : function(scope){
					scope.$watch('hlpcntent',function(newval){
						scope.targetHlpUrl =$sce
						.trustAsResourceUrl( newval);
					});
				}
			};
		});

