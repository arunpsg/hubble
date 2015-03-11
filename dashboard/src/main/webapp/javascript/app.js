var app = angular.module('formApp', []);

/*app.config( function( $controllerProvider ) {
    $controllerProvider.register( 'dashController', function( $scope) {
    }
}*/

app.controller('dashController', [ '$scope', function($scope) {

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
		$scope.videoId = videoUrl;
	}
	
	
	$scope.showHelp = false;
	$scope.helpFile = '';
	
	
	$scope.showhelpModal = function (videoUrl){
		$scope.showHelp = true;
		$scope.helpFile = videoUrl;
	}
	
	
} ]);

app.directive("markable", function() {
    return {
        link: function(scope, elem, attrs) {
        	
        	 
        	
            elem.on("click", function() {
            	
            	if(elem.hasClass('toggleColor')){
            		elem.removeClass("toggleColor");
                    elem.parent().find(".taskName").removeClass("toggleColor");
            	}
            	else{
            		elem.addClass("toggleColor");
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