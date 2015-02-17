function createFixedCellGridRenderer(opts) {
  function cellX(cell) {
    return opts.cellWidth * (cell.coords[0] + 0.5);
  }

  function cellY(cell) {
    return opts.cellHeight * (cell.coords[1] + 0.5);
  }

  var tileRoot = d3.select(opts.selectors.root);

  // renderCells never removes cell elements. It only hides them.
  function renderCells(cells) {
    var cellRenditions = tileRoot.selectAll('.' + opts.cellClass)
      .data(cells, opts.idFunction);

    var newCellRenditions = cellRenditions.enter()
      .append('g').classed(opts.cellClass, true);

    newCellRenditions
      .append('rect').attr({
        x: cellX,
        y: cellY,
        width: opts.cellWidth,
        height: opts.cellWidth
      });

    cellRenditions.attr('opacity', 1.0);

    if (opts.customUpdate) {
      opts.customUpdate(cellRenditions);
    }

    // Hide exited cells instead of removing.
    cellRenditions.exit()
      .attr('opacity', 0);
  }

  return {
    renderCells: renderCells
  };
}

if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = createFixedCellGridRenderer;
}
