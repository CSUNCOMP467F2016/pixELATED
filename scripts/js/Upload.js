define(  [ 'jquery', 'Canvas' ],
function (     $   ,  Canvas  ) {

var Upload = {
	holder: document.getElementById('rightpanel'),
	tests: {
	      filereader: typeof FileReader != 'undefined',
	      dnd: 'draggable' in document.createElement('span'),
	      formdata: !!window.FormData,
	      progress: "upload" in new XMLHttpRequest
	    },
	support: {
	      filereader: document.getElementById('filereader'),
	      formdata: document.getElementById('formdata'),
	      progress: document.getElementById('progress')
	    },
	acceptedTypes: {
	      'image/png': true,
	      'image/jpeg': true,
	      'image/gif': true
	    },
	progress: document.getElementById('uploadprogress'),
	fileupload: document.getElementById('upload'),
    init: function() {
    	/*
    	"filereader formdata progress".split(' ').forEach(function (api) {
			if (Upload.tests[api] === false) {
    			Upload.support[api].className = 'fail';
 			}
 			else {
   				Upload.support[api].className = 'hidden';
 		 	}
		});
		*/
		if (Upload.tests.dnd) {
		  Upload.holder.ondragover = function () { $('#rightpanel').addClass( 'hover' ); return false; };
		  Upload.holder.ondragend = function () { $('#rightpanel').removeClass( 'hover' ); return false; };
		  Upload.holder.ondrop = function (e) {
			$('#rightpanel').removeClass( 'hover' );
			e.preventDefault();
			Upload.readfiles(e.dataTransfer.files);
		  }
		} else {
		  Upload.fileupload.className = 'hidden';
		  Upload.fileupload.querySelector('input').onchange = function () {
			Upload.readfiles(this.files);
		  };
		}
    },
    previewfile: function(file) {
	  if (Upload.tests.filereader === true && Upload.acceptedTypes[file.type] === true) {
		var reader = new FileReader();
		reader.onload = function (event) {
		  var image = new Image();
		  image.src = event.target.result;
		  //image.width = 600;
		  //Upload.holder.appendChild(image);
		  Canvas.setImage( image );
		};

		reader.readAsDataURL(file);
	  }  else {
		console.log(file);
	  }
	},
	readfiles: function(files) {
		var formData = Upload.tests.formdata ? new FormData() : null;
		for (var i = 0; i < files.length; i++) {
		  if (Upload.tests.formdata) formData.append('file', files[i]);
		  Upload.previewfile(files[i]);
		}

		if (Upload.tests.formdata) {
		  var xhr = new XMLHttpRequest();
		  xhr.open('POST', '/devnull.php');
		  xhr.onload = function() {
			//Upload.progress.value = Upload.progress.innerHTML = 100;
		  };

		  if (Upload.tests.progress) {
			xhr.upload.onprogress = function (event) {
			  if (event.lengthComputable) {
				var complete = (event.loaded / event.total * 100 | 0);
				//Upload.progress.value = Upload.progress.innerHTML = complete;
			  }
			}
		  }

		  xhr.send(formData);
		}
	}
};

return Upload;

} );
