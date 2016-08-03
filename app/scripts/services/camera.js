'use strict';

angular.module('promoodApp').service('CameraService',
  ['$http', '$window', '$q', '$rootScope', function ($http, $window, $q, $rootScope) {
    var photo;
    var photoName;
    var isProfilePhoto;
    var photoFinalURL;

    this.takePhotography = function(onPhotoURISuccess, onPhotoURIFail) {
      if(navigator.camera) {
        navigator.camera.getPicture(onPhotoURISuccess, onPhotoURIFail, {
          quality: 50,
          targetWidth: 1600,
          targetHeight: 900,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          saveToPhotoAlbum: true
        });
      }
    };

    // PHOTO PROFILE START
    var fileEntryScope = {};
    this.getPhotoProfileURL = function(){
      //console.log(cordova.file.dataDirectory);
      console.log('getPhotoProfile1');

      //var profileUrl = angular.fromJson( window.localStorage['profile'] );
      var profileUrl = window.localStorage['profile'];
      console.log('getPhotoProfile1.1: profile from localstorage ' + profileUrl);

      if (profileUrl){
        /*var profile = angular.fromJson(profileUrl);
        console.log('getPhotoProfile3 accesing photo profile:' + profile);*/
        return profileUrl;
      } else {
        console.log('profileURL is undifined');
      }
      return null;
    };

    this.savePhotoProfile = function (photo, _photoName, _isProfilePhoto){
      console.log('url received from camera: ' + photo);
      photoName = (new Date()).getTime() + _photoName;//profilePhoto.jpg;
      isProfilePhoto = _isProfilePhoto;//true;
      if (typeof cordova !== 'undefined'){
        resolveLocalFileSystemURL(photo, onSuccessGettingFile, onErrorGettingFile);
      }
    };

    var onSuccessGettingFile = function(fileEntry){
      console.log('success geting file:' + fileEntry.fullPath);
      fileEntryScope = fileEntry;
      requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
        //console.log('got the fs: ' + fs);
        fs.root.getDirectory("ProMoodData", {create: true}, onGettingFinalDirSuccess, onGettingFinalDirError);
      }, function(error){
        //console.log('error getting fs')
      });
    }

    var onErrorGettingFile = function(error){
      console.log('error getting file: ' + error);
    }

    var onGettingFinalDirSuccess = function(dirEntry){
      console.log('file entry to move: ' + fileEntryScope.fullPath);
      console.log('success getting final directory: ' + dirEntry.fullPath);
      fileEntryScope.moveTo(dirEntry, photoName, onMovingFileSuccess, onMovingFileError);
    }
    var onGettingFinalDirError = function(error){
      console.log('Error getting final directory: ' + error);
    }

    var onMovingFileSuccess = function(data){
      console.log('moving file success: ' + data.toURL());
      photoFinalURL = data.toURL();
      console.log('feelings this.photoFinalURL: ' + photoFinalURL);

      if (isProfilePhoto) {
        $rootScope.saveProfilePhotoToDataStorageAndShow(photoFinalURL);
      } else {
        $rootScope.saveGoodPhotoToDataStorageAndShow(photoFinalURL);
      }
    }
    var onMovingFileError = function(error){
      console.log('moving file error: ' + error);
    }

    this.getPhotoFinaUrl = function (){
      return photoFinalURL;
    };

    this.savePhotoGood = function (photo){
      console.log('url received from camera: ' + photo);
      photoName = ((new Date()).getTime())+'good.jpg';
      isProfilePhoto = false;
      if (typeof cordova !== 'undefined'){
        resolveLocalFileSystemURL(photo, onSuccessGettingFile, onErrorGettingFile);
      }
    };
// END PHOTO PROFILE



  }]
);
