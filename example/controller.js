function controller() {
  // From Underscore, more or less.
  function defaults(obj, source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) {
          obj[prop] = source[prop];
        }
        else if (typeof obj[prop] === 'object') {
          obj[prop] = defaults(obj[prop], source[prop]);
        }        
      }
    }

    return obj;
  }

  var rendererDefaults = {
    selectors: {
      svg: 'svg#board'
    },
    cellWidth: 64,
    cellHeight: 64,
    cellClass: 'cell',
    customizeCellRendition: function customize(cell) {
      // Setting the fill for this <g> means <rect>s within it will use that 
      // fill, too.
      d3.select(this).attr('fill', fillForPressure);
    }
  };

  var renderers = [
    createCellGridRenderer(
      defaults({selectors: {root: '#default-cell-layer'}}, rendererDefaults)
    ),
    createCellGridRenderer(
      defaults({selectors: {root: '#faster-cell-layer'}}, rendererDefaults)
    ),
    createCellGridRenderer(
      defaults({selectors: {root: '#slosh-cell-layer'}}, rendererDefaults)
    ),
    createCellGridRenderer(
      defaults({selectors: {root: '#slow-cell-layer'}}, rendererDefaults)
    )
  ];

  function fillForPressure(cell) {
    return 'hsla(0, 0%, 0%, ' + cell.d.p/20.0 + ')';
  }

  var listOfCellSets = [];
  var cellSetsIndex = 0;

  function saveAndStart(error, cellData) {
    if (error) {
      console.log(error);
    }
    else {
      listOfCellSets = cellData;
      renderCurrentSet();
    }
  }

  function renderCurrentSet() {
    renderers.forEach(function render(renderer, i) {
      renderer.renderCells(listOfCellSets[i][cellSetsIndex]);
    });
  }

  // Assumption: All cell sets contain the same number of iterations.
  function advanceCellSets() {
    cellSetsIndex += 1;
    if (cellSetsIndex >= listOfCellSets[0].length) {
      cellSetsIndex = 0;
    }
  }

  function devanceCellSets() {
    cellSetsIndex -= 1;
    if (cellSetsIndex < 0) {
      cellSetsIndex = listOfCellSets[0].length - 1;
    }    
  }

  function renderNextSets() {
    advanceCellSets();
    renderCurrentSet();
  }

  function renderPreviousSets() {
    devanceCellSets();
    renderCurrentSet();
  }

  (function setUpKeyCommands() {
    var strokerouter = createStrokeRouter(d3.select(document));

    function routeToNext(key) {
      strokerouter.routeKeyUp(key, null, renderNextSets);
    }
    function routeToPrevious(key) {
      strokerouter.routeKeyUp(key, null, renderPreviousSets);
    }

    ['rightArrow', 'downArrow', 'space', 'enter', 'n'].forEach(routeToNext);
    ['leftArrow', 'upArrow', 'p'].forEach(routeToPrevious);
  })();

  d3.select('#next-button').on('click', renderNextSets);
  d3.select('#previous-button').on('click', renderPreviousSets);

  queue()
    .defer(d3.json, 
      'Cross_formation.With_a_default_reaction__pressure_should_oscillate_between_the_center_and_arm_cells.approved.txt'
    )
    .defer(d3.json, 
      'Cross_formation.With_a_faster_than_default_reaction__pressure_should_oscillate_between_the_center_and_arm_cells.approved.txt'
    )
    .defer(d3.json, 
      'Cross_formation.With_a_slosh_reaction__pressure_should_oscillate_rapidly_between_the_center_and_arm_cells.approved.txt'
    )
    .defer(d3.json, 
      'Cross_formation.With_a_slow_flow_reaction__pressure_should_eventually_reach_equalibrium_between_all_cells.approved.txt'
    )
    .awaitAll(saveAndStart);
}

var theController = controller();
