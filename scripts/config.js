// Configure Require.js
var require = {
  paths: {
    app: 'js/app',

    jquery: 'external/jQuery/jquery-3.1.1.min',
    d3: 'external/D3/d3.v4.min',
    Caman: 'external/CamanJS/caman.full.min',

    Canvas: 'js/Canvas',
    ToolController: 'js/ToolController',
    Upload: 'js/Upload',

    //tools
    BrushTool: 'js/Tools/BrushTool' ,
    RotateTool: 'js/Tools/RotateTool',
    MirrorTool: 'js/Tools/MirrorTool',
    ColorizeTool: 'js/Tools/ColorizeTool'

  },
  shim: {
    'Caman': { exports: 'Caman' }
  }
};
