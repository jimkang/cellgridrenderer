function createCellGridRenderer(opts) {
  function cellId(cell) {
    return cell.d.name;
  }
  function getTransform(d) {
    return 'translate(' + 
      d.coords[0] * opts.cellWidth + ',' + 
      d.coords[1] * opts.cellHeight + 
      ') scale(' + opts.cellWidth + ', ' + opts.cellHeight + ')';
  }

  var tileRoot = d3.select(opts.selectors.root);

  function renderCells(cells) {
    var cellRenditions = tileRoot.selectAll('.' + opts.cellClass)
      .data(cells, cellId);

    var newCellRenditions = cellRenditions.enter()
      .append('g').classed(opts.cellClass, true)
      .attr('opacity', 0);

    newCellRenditions.append('rect').attr({
      x: 0,
      y: 0,
      width: 1,
      height: 1
    });

    if (opts.customizeCellRendition) {
      cellRenditions.each(opts.customizeCellRendition);
    }

    cellRenditions.transition().delay(300).duration(500).ease('linear')
      .attr('transform', getTransform);
    cellRenditions.transition().delay(800).duration(500).attr('opacity', 1);

    cellRenditions.exit().transition().duration(300)
      .attr('opacity', 0).remove();
  }

  return {
    renderCells: renderCells
  };
}


if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = createCellGridRenderer;
}
