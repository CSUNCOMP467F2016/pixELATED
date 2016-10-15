// Configure Require.js
var require = {
  paths: {
    app: 'js/app',
    jquery: 'external/jQuery/jquery-3.1.1.min',
    d3: 'external/D3/d3.v4.min',
    Canvas: 'js/Canvas',
    ToolController: 'js/ToolController'
  },
  shim: {
    // --- Use shim to mix together all THREE.js subcomponents
    /*'threeCore': { exports: 'THREE' },
    'TrackballControls': { deps: ['threeCore'], exports: 'THREE' },
    // --- end THREE sub-components
    'ImprovedNoise': { exports: 'ImprovedNoise' },
    'detector': { exports: 'Detector' },
    'stats': { exports: 'Stats' }*/
  }
};
