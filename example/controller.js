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

  function fillForPressure(cell) {
    return 'hsla(0, 0%, ' + cell.d.p/20.0 * 100 + '%, 1.0)';
  }

  var cellSets = [];
  var cellSetIndex = 0;

  d3.json('Cross_formation.With_a_default_reaction__pressure_should_oscillate_between_the_center_and_arm_cells.approved.txt',
    saveAndStart);

  function saveAndStart(cellData) {
    cellSets = cellData;
    renderCurrentSet();
  }

  function renderCurrentSet() {
    renderer.renderCells(cellSets[cellSetIndex]);
    cellSetIndex += 1;
  }

}

var theController = controller();
