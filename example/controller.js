function controller() {
  var renderer = createCellGridRenderer({
    selectors: {
      svg: 'svg#board',
      root: 'g#celllayer'        
    },
    cellWidth: 64,
    cellHeight: 64,
    cellClass: 'cell',
    customizeCellRendition: function customize(cell) {
      // Setting the fill for this <g> means <rect>s within it will use that 
      // fill, too.
      d3.select(this).attr('fill', fillForPressure);
    }
  });

  var pressureColor = d3.scale.linear()
    .range(['red', 'blue'])
    // .range([d3.lab(50, -86, -107), d3.lab(50, 98, 74)])
    .interpolate(d3.interpolateLab);

  function fillForPressure(cell) {
    return pressureColor(cell.d.p/10.0);
    //'hsla(0, 0%, ' + cell.d.p/20.0 * 100 + '%, 1.0)';
  }

  var cellSets = [];
  var cellSetIndex = 0;

  function saveAndStart(cellData) {
    cellSets = cellData;
    renderCurrentSet();
  }

  function renderCurrentSet() {
    renderer.renderCells(cellSets[cellSetIndex]);
  }

  function advanceCellSet() {
    cellSetIndex += 1;
    if (cellSetIndex >= cellSets.length) {
      cellSetIndex = 0;
    }    
  }

  function devanceCellSet() {
    cellSetIndex -= 1;
    if (cellSetIndex < 0) {
      cellSetIndex = cellSets.length - 1;
    }    
  }

  function renderNextSet() {
    advanceCellSet();
    renderCurrentSet();
  }

  function renderPreviousSet() {
    devanceCellSet();
    renderCurrentSet();
  }

  d3.json('Cross_formation.With_a_default_reaction__pressure_should_oscillate_between_the_center_and_arm_cells.approved.txt',
    saveAndStart);

  (function setUpKeyCommands() {
    var strokerouter = createStrokeRouter(d3.select(document));

    function routeToNext(key) {
      strokerouter.routeKeyUp(key, null, renderNextSet);
    }
    function routeToPrevious(key) {
      strokerouter.routeKeyUp(key, null, renderPreviousSet);
    }

    ['rightArrow', 'downArrow', 'space', 'enter', 'n'].forEach(routeToNext);
    ['leftArrow', 'upArrow', 'p'].forEach(routeToPrevious);
  })();

  d3.select('#next-button').on('click', renderNextSet);
  d3.select('#previous-button').on('click', renderPreviousSet);
}

var theController = controller();
