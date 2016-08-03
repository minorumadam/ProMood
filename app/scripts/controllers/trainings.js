'use strict';

angular.module('promoodApp')
.controller('TrainingsController', function ($scope, $rootScope, $cordovaFile, $cordovaFileTransfer, $state, $cordovaMedia, $ionicPopup, $ionicLoading) {
  $rootScope.trainingDescriptionVisible = true;

  var trainingFile = "mindfulness.zip";
  var trainingDir  = "Trainings/Mindfulness/";
  var trainingUrl  = "http://d3hr4akwcd3lu9.cloudfront.net/";
  //var trainingUrl  = "http://pro-mood.s3.eu-central-1.amazonaws.com/trainings/";

    
  var initialize = function() {
    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");
  };
    
  $scope.startTraining = function (){
   
    $cordovaFile.checkDir(cordova.file.documentsDirectory, trainingDir)
      .then(function (success) {
        console.log('directory exists');
        startTraining();
      }, function (error) {
        console.log('directory does not exist');
        promptDownloadFile();
      });
  }
  
  var promptDownloadFile = function (){
    if (navigator.connection.type == Connection.NONE){
        console.log('user does not have internet');
        
        $ionicPopup.alert({
          title: 'Alert',
          template: "You need internet connection to download the training.",
          okText: 'Accept'
        });
        
        return;
    }   
      
    $ionicPopup.confirm({
         title: 'Training',
         template: 'To start the training we need to download it first'
       }).then(function(res) {
         if(res) {
           console.log('User accepted training download');
           downloadFile();
         } else {
           console.log('User canceled training download');
         }
       });
  }
  
  var promptStartTraining = function (){      
    $ionicPopup.confirm({
         title: 'Training',
         template: 'Your training is ready to use, would you like to start now?'
       }).then(function(res) {
         if(res) {
           console.log('User accepted start training');
           startTraining();
         } else {
           console.log('User canceled start training');
         }
       });
  }
  
  var startTraining = function(){
    $state.go("mindfulnessSinglePage");
  }

  var removeFile = function (onsuccess, onerror){
      $cordovaFile.removeFile(cordova.file.documentsDirectory, trainingFile)
      .then(function (success) {
         console.log('removing file success');
         onsuccess();
      }, function (error) {
        console.log("removing file failed");
         onerror(error);
      });
  }
  
  var unzipFile = function (){
    var src = cordova.file.documentsDirectory + trainingFile;
    var dest = cordova.file.documentsDirectory + trainingDir;
      
    zip.unzip(src, dest, 
              function(result){
                if (result == 0){ 
                    console.log('unzip success');
                    removeFile(function(){$scope.loading.hide();}, function(){$scope.loading.hide();});
                    promptStartTraining();
                } else {
                    console.log('unzip failure');
                }
             });
  }
      
  var downloadFile = function (){
    var url = trainingUrl + trainingFile;

    var targetPath = cordova.file.documentsDirectory + trainingFile;
    var trustHosts = true;
    var options = {};
      
    $scope.downloadProgress = 0;  
    
    $scope.loading = $ionicLoading.show({
        template: 'Downloading training ... ' + window.Math.round($scope.downloadProgress) + '% <ion-spinner icon="circles"></ion-spinner>',
        showBackdrop: true,
        scope: $scope
   }); 
      
    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(function(result) {
        console.log('download success');
        unzipFile();
      }, function(err) {
        console.log('download failure');
        $ionicLoading.hide();
      }, function (progress) {
        //$timeout(function () {
          //console.log('Download progress: ' + ((progress.loaded / progress.total) * 100) + '%');
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        
          $scope.loading = $ionicLoading.show({
                template: 'Downloading training ... ' + window.Math.round($scope.downloadProgress) + '% <ion-spinner icon="circles"></ion-spinner>',
                showBackdrop: true,
                scope: $scope
           }); 
        //})
      });
  }


  $scope.showTrainingDescription = function() {
    	if($rootScope.trainingDescriptionVisible == false){
			$rootScope.trainingDescriptionVisible = true;
		}else{
			$rootScope.trainingDescriptionVisible = false;
		}
  };


  initialize();
});
