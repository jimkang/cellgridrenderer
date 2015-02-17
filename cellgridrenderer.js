function createCellGridRenderer(opts) {
  function cellId(cell) {
    return cell.d.name;
  }
  
  function cellX(cell) {
    return opts.cellWidth * (cell.coords[0] + 0.5);
  }

  function cellY(cell) {
    return opts.cellHeight * (cell.coords[1] + 0.5);
  }

  var tileRoot = d3.select(opts.selectors.root);

  function renderCells(cells) {
    var cellRenditions = tileRoot.selectAll('.' + opts.cellClass)
      .data(cells, cellId);

    var newCellRenditions = cellRenditions.enter()
      .append('g').classed(opts.cellClass, true)
      .attr('opacity', 0);

    newCellRenditions.append('rect').attr({
      x: cellX,
      y: cellY,
      width: opts.cellWidth,
      height: opts.cellHeight
    });

    if (opts.customizeCellRendition) {
      cellRenditions.each(opts.customizeCellRendition);
    }

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
