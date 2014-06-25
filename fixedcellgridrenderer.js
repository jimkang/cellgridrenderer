function createFixedCellGridRenderer(opts) {
  var a = createAccessorizer();
  a.cacheAccessor('id', function id(cell) {
    return cell.coords[0] + '_' + cell.coords[1];
  });
  a.cacheAccessor('transform', function getTransform(d) {
    return 'translate(' 
      + d.coords[0] * opts.cellWidth + ',' 
      + d.coords[1] * opts.cellHeight 
      + ') scale(' + opts.cellWidth + ', ' + opts.cellHeight + ')';
  });

  var tileRoot = d3.select(opts.selectors.root);

  // This function adds the initial elements for the cells. No new elements 
  // will be added by renderCells.
  function initialRender(cells) {
    var cellRenditions = tileRoot.selectAll('.' + opts.cellClass)
      .data(cells, a.id);

    var newCellRenditions = cellRenditions.enter()
      .append('g').classed(opts.cellClass, true)
      .attr('opacity', 0);

    newCellRenditions.append('rect').attr({
      x: 0,
      y: 0,
      width: 1,
      height: 1
    });

    if (opts.customUpdate) {
      opts.customUpdate(cellRenditions);
    }

    cellRenditions.transition()
      .attr('transform', a.transform);
    cellRenditions.transition().delay(300).duration(500).attr('opacity', 1);
  }

  function renderCells(cells) {
    var cellRenditions = tileRoot.selectAll('.' + opts.cellClass)
      .data(cells, a.id);

    if (opts.customUpdate) {
      opts.customUpdate(cellRenditions);
    }
  }

  return {
    initialRender: initialRender,
    renderCells: renderCells
  };
}
