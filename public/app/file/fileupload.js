angular.module('myApp').directive('fileModel',['$parse',function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var model = $parse(attr.fileModel);
      var modelSetter = model.assign;
      element.bind('change', function() {
        scope.$apply(function(){
          modelSetter(scope,element[0].files[0]);
        });  
      });

    }
  };
}])
.service('fileUpload',['$http',function($http) {
  this.uploadFileToUrl = function(file,uploadUrl)
  {
      var fd = new formData();
      fd.append('file',file);
      alert(JSON.stringify(fd));
      $http.post(uploadUrl,fd,{transformRequest:angular.identity,headers:{'Content-Type':undefined}}).success(function(){

      }).error(function(){

      });
  }
}])
.controller('fileupload',['$scope','fileUpload',function($scope,fileUpload){
  $scope.submit = function(){
    var file = $scope.myFile;
    alert(JSON.stringify(file));
    var uploadUrl ="/register";
    fileUpload.uploadFileToUrl(file,uploadUrl);
  };
}]);
