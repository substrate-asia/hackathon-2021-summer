//[editor Javascript]

//Project:	DashboardX Admin - Responsive Admin Template
//Primary use:   Used only for the wysihtml5 Editor 


//Add text editor
    $(function () {
    "use strict";
 
 
    ClassicEditor
    .create( document.querySelector( '#editor1' ), {
        // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
    } )
    .then( editor => {
        window.editor = editor;
    } )
		.catch( err => {
		    console.error( err.stack );
} );
	//bootstrap WYSIHTML5 - text editor
	$('.textarea').wysihtml5();		
	
  });

