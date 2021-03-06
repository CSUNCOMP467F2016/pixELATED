// Configure Require.js
var require = {
  paths: {
    app: 'js/app',

    jquery: 'external/jQuery/jquery-3.1.1.min',
    d3: 'external/D3/d3.v4.min',
    Caman: 'external/CamanJS/caman.full.min',
    Farbtastic: 'external/Farbtastic/farbtastic12/farbtastic/farbtastic',
    //Cropperjs: 'external/Cropperjs/dist/cropper.min',
    Cropperjs: 'external/Cropperjs/dist/cropper',
    Croppie: 'external/Croppie/croppie',
    Pako: 'external/Pako/pako_inflate.min',

    Canvas: 'js/Canvas',
    ToolController: 'js/ToolController',
    Upload: 'js/Upload',
    PNGDecoder: 'js/PNGDecoder',

    //tools
    BrushTool: 'js/Tools/BrushTool' ,
    RotateTool: 'js/Tools/RotateTool',
    MirrorTool: 'js/Tools/MirrorTool',
    ColorizeTool: 'js/Tools/ColorizeTool',
    CropTool: 'js/Tools/CropTool',
    SatAndHueTool: 'js/Tools/SatAndHueTool',
    BriAndConTool: 'js/Tools/BriAndConTool',
    ClearCanvasTool: 'js/Tools/ClearCanvasTool',
    EraseTool: 'js/Tools/EraseTool',
    BucketTool: 'js/Tools/BucketTool',
	  NoiseTool: 'js/Tools/NoiseTool',
    SepiaAndExposureTool: 'js/Tools/SepiaAndExposureTool',
    ExportTool: 'js/Tools/ExportTool',
    ContourTool: 'js/Tools/ContourTool'

  },
  shim: {
    'Caman': { exports: 'Caman' },
    'Farbtastic': { deps: ['jquery'],}
  }
};
