var app = require('app');  // Module to control application life.
var path = require('path');


var cmd=require('node-cmd');

var cp = require('child_process')
var vlcCommand = require('vlc-command')

exports.startVLC = file => {  
    console.log('FILE: ',file);
var directory = path.dirname(file).replace(/\s/g, '');
console.log('DIR: |'+directory+'|');
var gg = '--http-src '+directory;
console.log(gg);
  // vlcCommand(function (err, cmd) {
  //   if (err) return console.error('could not find vlc command path')
  //   console.log(cmd);
  //   if (process.platform === 'win32') {

  //     console.log('\n\nwindows!!');
  //     cp.execFile(cmd, ['--extraintf http ',gg,' --http-password 1234'], function (err, stdout) {
  //       if (err) return console.error(err)
  //       console.log(stdout)
  //     })
  //   } else {
  //     console.log('\n\n NOT windows!!');
  //     cp.exec(cmd + ' --extraintf http --http-src '+ directory +' --http-password 1234', function (err, stdout) {
  //       if (err) return console.error(err)
  //       console.log(stdout)
  //     })
  //   }
  // })
    // console.log('vlc ', directory ,' --http-password 1234');
    var g = '"D:\Downloads\Game.of.Thrones.S07E05.Eastwatch.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoT[ettv]\Game.of.Thrones.S07E05.Eastwatch.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoT[ettv].mkv"';
    // cmd.run('vlc --extraintf http --http-src '+directory+' --http-password 1234');
    cmd.run('vlc --extraintf http --http-password 1234');
//    'vlc --extraintf http --http-src D:\\Downloads\\Game.of.Thrones.S07E05.Eastwatch.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoT[ettv]\\ --http-password 1234'
    // cmd.run('vlc --extraintf http --http-src ', directory ,'--http-password 1234');
}

var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 625});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
