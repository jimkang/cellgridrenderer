cellgridrenderer
================

This is a browser module for rendering grids of cells. The cells should be in this format:

    {
      d: {
        // Stuff
      },
      coords: [5, 2]
    }

Installation
------------

    npm install cellgridrenderer

Usage
-----

Include [D3](http://d3js.org/). Then, add this to your html file:

    <script src="node_modules/accessorizer.js"></script>
    <script src="cellgridrenderer.js"></script>

In a JavaScript file:

    var renderer = createCellGridRenderer({
      selectors: {
        svg: 'svg#board',
        root: 'g#root'        
      },
      cellWidth: 10,
      cellHeight: 10,
      cellClass: 'cell'
    });

[Here's a working example.](http://jimkang.com/cellgridrenderer/example)

License
-------

MIT.
