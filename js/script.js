const main = require('electron').remote.require('./main')

const herokuSocket = 'https://desolate-harbor-84232.herokuapp.com/';
const localSocket = 'http://localhost:3000';

// Mixing jQuery and Node.js code in the same file? Yes please!

function playFile() {
  console.log("playing", selectedFilepath);
  sendToVLC('?command=in_play&input=file:///' + selectedFilepath);
}

function sendToVLC(command) {
  $.get('http://:1234@127.0.0.1:8080/requests/status.xml' + command, function (response) {
    console.log(response);
  });
}

function play() {
  console.log('playing');
  sendToVLC('?command=pl_forceresume');
}

function pause() {
  console.log('pausing');
  sendToVLC('?command=pl_forcepause');
}

function getStatus() {
  $.get('http://:1234@127.0.0.1:8080/requests/status.xml', function (response) {
    console.log(response);
  });
}

function sendReady(){
  console.log('readyyyyyyy');
  socket.emit('client ready');
}

function sendPlay(){
  console.log('RQ play');
  socket.emit('request play');
}

function sendPause(){
  console.log('RQ pause');
  socket.emit('request pause');
}

var selectedFilepath = "";

function onFileInputChanged(files) {
  var filepath = files[0].path;
  selectedFilepath = files[0].path;
  main.startVLC(filepath);
  console.log('loaded!!');
  socket.emit('file loaded', filepath);
}
function togglePlay() {
  $.get('http://:1234@127.0.0.1:8080/requests/status.json?command=pl_pause', function (response) {
    console.log(response);
  });
}
var socket;

$(function () {

  var os = require('os');

  // Electron's UI library. We will need it for later.

  var shell = require('shell');


  socket = io(localSocket);// localhost
  // socket = io(herokuSocket);

  socket.on('welcome', function () {
    console.log('\n\nserver responded!!!');
  });

  socket.on('everyone ready', function () {
    console.log('everyone ready');
    playFile();
  });

  socket.on('fileLoaded', function () {
    console.log('fileLoaded');
  });

  socket.on('play', function () {
    console.log('play');
    play();
  });

  socket.on('pause', function () {
    console.log('pause');
    pause();
  });

  socket.on('accept', function () {
    console.log('accept');
  });


});


function disconnect() {
  socket.disconnect();
}

/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

'use strict';

; (function (document, window, index) {
  var inputs = document.querySelectorAll('.inputfile');
  Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
      labelVal = label.innerHTML;

    input.addEventListener('change', function (e) {
      onFileInputChanged(this.files);
      var fileName = '';
      if (this.files && this.files.length > 1)
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      else
        fileName = e.target.value.split('\\').pop();

      if (fileName)
        label.querySelector('span').innerHTML = fileName;
      else
        label.innerHTML = labelVal;
    });

    // Firefox bug fix
    input.addEventListener('focus', function () { input.classList.add('has-focus'); });
    input.addEventListener('blur', function () { input.classList.remove('has-focus'); });
  });
}(document, window, 0));