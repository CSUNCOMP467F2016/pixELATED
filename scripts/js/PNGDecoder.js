define(  [ 'Pako' ],
function (  Pako  ) {

  var PNGDecoder = function( url, callback ) {
    //Load the raw data file
    //Create a new XMLHttpRequest object
    xhr = new XMLHttpRequest;
    //Set it to a GET request for the url and make it asynchronous
    xhr.open( 'GET', url, true );
    //Say we want the raw binary data
    xhr.responseType = 'arraybuffer';
    //When our request has loaded, do this
    xhr.onload = function() {
      var data, png;
      //Store our received data into an array that we can manipulate
      data = new Uint8Array( xhr.response || xhr.mozResponseArrayBuffer );
      //Decode it
      png = decode( data );

      //Callback
      if( typeof callback === 'function' )
        callback( png );
    };
    //Send our request
    return xhr.send(null);
  }

  function decode( data ) {
    var i = { i: 0 };
    var inflator = new Pako.Inflate();
    var chunks = [];
    //Check if file is a valid PNG
    if( getSignature( data, i ) ) {
      //Get the header
      var header = getHeader( data, i );
      //Get all the chunks
      while( i.i < data.length ) {
        chunks.push( getNextChunk( data, i ) );
      }
      //Put all the data chunks into our decompressor
      for( var j = 0; j < chunks.length; j++ ) {
        if( chunks[j].type.full == 'IDAT' ) {
          //Our inflator needs to know which chunk is last
          if( j != chunks.length - 1 && chunks[j+1].type.full == 'IEND' ) {
            inflator.push( chunks[j].data, true ); //tre for last
          }
          else {
            inflator.push( chunks[j].data, false );
          }
        }
      }
      if( inflator.err ) {
        console.log( inflator.msg );
      }

      var output = inflator.result;
      return makeCanvasFromInflatedFullIDAT( header, output );
    }
    else {
      throw new Error( 'File is not a valid PNG' );
    }
    return false;
  }

  //First 11 bytes make up the PNG file signature
  /*
    Detect Channel: 1 Byte
    P: 1 Byte
    N: 1 Byte
    G: 1 Byte
    Carriage Return Character: 1 Byte
    Line Feed Character: 1 Byte
    DOS End Of File Character: 1 Byte
    Unix Line Feed Character: 1 Byte
    ASCII NUll: 1 Byte
    ASCII NUll: 1 Byte
    ASCII NUll: 1 Byte
  */
  function getSignature( data, i ) {
    var signature = {
      detectchannel: null,
      p: null,
      n: null,
      g: null,
      cr: null,
      lf: null,
      doseof: null,
      unixlf: null
    };

    signature.detectchannel = ( data[0] == 137 ) ? 8 : 7;
    signature.p = intToString( data[1] );
    signature.n = intToString( data[2] );
    signature.g = intToString( data[3] );
    signature.cr = intToString( data[4] );
    signature.lf = intToString( data[5] );
    signature.doseof = intToString( data[6] );
    signature.unixlf = intToString( data[7] );

    //Valid PNG signature always begins with: 137 80 78 71 13 10 26 10
    if( data[0] == 137 &&
        data[1] == 80 &&
        data[2] == 78 &&
        data[3] == 71 &&
        data[4] == 13 &&
        data[5] == 10 &&
        data[6] == 26 &&
        data[7] == 10 ) {
          i.i = 8;
          return true;
    }
    return false;
  }

  //Next 9 make up the header
  /*
    Length: 4 Bytes
    Width: 4 Bytes
    Height: 4 Bytes
    Bit Depth: 1 Byte
    Color Type: 1 Byte
    Compression Method: 1 Byte
    Filter Method: 1 Byte
    Interlace Method: 1 Byte
  */
  function getHeader( data, i ) {
    var header = {
      length: null,
      type: {
        i: null,
        h: null,
        d: null,
        r: null
      },
      data: {
        width: null,
        height: null,
        bitdepth: null,
        colortype: null,
        compression: null,
        filter: null,
        interlace: null
      },
      crc: null
    };

    //4 Bytes for the length always 13 for header
    header.length = get4ByteInt( data, 8 );

    //ancillary (if lowercase)
    header.type.i = intToString( data[12] );
    //private (if lowercase)
    header.type.h = intToString( data[13] );
    //unused
    header.type.d = intToString( data[14] );
    //safe to copy (if lowercase)
    header.type.r = intToString( data[15] );

    //4 Bytes each for width and height (neither can be 0)
    header.data.width = get4ByteInt( data, 16 );
    header.data.height = get4ByteInt( data, 20 );

    //is 1, 2, 4, 8 or 16
    header.data.bitdepth = data[24];
    //is 0, 2, 3, 4, 6
    //color type codes represent sums of the following values: 1 (palette used), 2 (color used), and 4 (alpha channel used)
    header.data.colortype = data[25];

    //must be 0
    header.data.compression = data[26];
    //must be 0
    header.data.filter = data[27];
    //must be 0 (no interlace) or 1 (adam7 interlace)
    header.data.interlace = data[28];

    //always 4 bytes
    header.crc = get4ByteInt( data, 29 );

    i.i = 33;

    return header;
  }

  function getNextChunk( data, i ) {
    var chunk = {
      length: null,
      type: {
        full: null,
        a: null,
        b: null,
        c: null,
        d: null
      },
      data: null,
      crc: null
    };

    chunk.length = get4ByteInt( data, i.i )

    chunk.type.a = intToString( data[i.i+4] );
    //private (if lowercase)
    chunk.type.b = intToString( data[i.i+5] );
    //unused
    chunk.type.c = intToString( data[i.i+6] );
    //safe to copy (if lowercase)
    chunk.type.d = intToString( data[i.i+7] );
    chunk.type.full = chunk.type.a + chunk.type.b + chunk.type.c + chunk.type.d;

    chunk.data = data.slice( i.i+8, i.i+8+chunk.length );

    chunk.crc = get4ByteInt( data, i.i+8+chunk.length );

    i.i = i.i + 12 + chunk.length;

    //console.log(chunk);
    return chunk;
  }

  //Takes in decompressed IDAT data, unfilters it, draws it to a canvas and returns the canvas.
  function makeCanvasFromInflatedFullIDAT( header, data ) {
    var width = header.data.width;
    var height = header.data.height;
    var filter;
    var dataindex = 0;
    var imgdataindex = 0;

    var canvas = document.createElement( 'canvas' );
    canvas.width = width;
    canvas.height = height;

    var context = canvas.getContext( '2d' );
    var imgData = context.createImageData( width, height );
    var bands = 3;

    for( var y = 0; y < height; y++ ) {
      //3 because 3 bands (RGB)
      //1 because the first byte of each scanline indicates its filter
      dataindex += 1;
      filter = data[ y * ((width*bands) + 1) ];
      for( var x = 1; x < width + 1; x++ ) {
        imgData.data[ imgdataindex + 0 ] = data[ dataindex + 0 ]; //Red
        imgData.data[ imgdataindex + 1 ] = data[ dataindex + 1 ]; //Blue
        imgData.data[ imgdataindex + 2 ] = data[ dataindex + 2 ]; //Green
        imgData.data[ imgdataindex + 3 ] = ( bands == 4 ) ? data[ dataindex + 3 ] : 255; //Alpha

        dataindex += bands;
        imgdataindex += 4;
      }
    }
    context.putImageData( imgData, 0, 0 );

    return canvas;
  }

  function get4ByteInt( data, i ) {
    var b0 = padByteString( data[i+0].toString(2) );
    var b1 = padByteString( data[i+1].toString(2) );
    var b2 = padByteString( data[i+2].toString(2) );
    var b3 = padByteString( data[i+3].toString(2) );
    return parseInt( b0 + b1 + b2 + b3, 2 );
  }
  function padByteString( str ) {
    var zeros = '00000000';
    return zeros.substring(0, zeros.length - str.length ) + str;
  }

  function intToString( byte ) {
    return String.fromCharCode( byte );
  }

  return PNGDecoder;

} );
