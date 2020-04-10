'use strict'

const Helpers = use('Helpers')
const fs = use('fs')
const ytdl = use('ytdl-core')

class YoutubeController {
  getData ( link ) {

    return new Promise( ( resolve, reject ) => {
      ytdl.getInfo( link, function( err, info ) {
        if ( err ) {
          reject(err);
        }
        else {
          resolve(info);
        }
      });
    });

  }

  download_mp4 ( link, title, response ) {

    const target = Helpers.publicPath('video.mp4')
    var stream = ytdl(link)
      .pipe(
        fs.createWriteStream(target)
      );
    response.implicitEnd = false
    stream.on('finish', function() {
      response.attachment(target, title + '.mp4')
    });

  }

  download_mp3 ( link, title, response ) {

    const target = Helpers.publicPath('music.mp3')
    var stream = ytdl(link)
      .pipe(
        fs.createWriteStream(target)
      );
    response.implicitEnd = false
    stream.on('finish', function() {
      response.attachment(target, title + '.mp3')
    });

  }
}

module.exports = YoutubeController
