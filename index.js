module.exports = canvasLineChart;
// var elem = document.createElement('canvas');
//setInterval(function() {
// canvasLineChart(elem, [[10 * (Math.sin(Date.now() / 1000) + 1), 'rgba(0, 0, 0, 0.2)'], [20, '#0f0']], [20, '#FF0000']);
//}, 100);
//=elem

function canvasLineChart(c, data, marker) {
    var width = 170 * 2;
    var height = 40 * 2;
    var chartHeight = 20 * 2;
    c.width = width;
    c.height = height;
    c.style.width = width / 2 + 'px';
    c.style.height = height / 2 + 'px';

    var ctx = c.getContext('2d');
    function xScale(_) {
      return (_ / 20);
    }

    ctx.fillStyle = '#fff';
    [width - chartHeight / 2, chartHeight / 2].forEach(function(offset) {
        ctx.beginPath();
        ctx.arc(offset, chartHeight/2 - 1, chartHeight/2 - 1, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    });

    ctx.fillRect(chartHeight/2, 1, width - chartHeight, chartHeight - 2);

    ctx.fillStyle = '#000';
    ctx.fillRect(chartHeight/2, 0, width - chartHeight, 1);
    ctx.fillRect(chartHeight/2, chartHeight - 2, width - chartHeight, 1);
    ctx.beginPath();

    ctx.globalCompositeOperation = 'source-atop';
    var grd = ctx.createLinearGradient(0, 0, width, 0);
    data.forEach(function(data, i) {
      grd.addColorStop(xScale(data[0]), data[1]);
    });
    ctx.fillStyle = grd;
    ctx.rect(0, 0, width, chartHeight);
    ctx.fill();

  	ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  	for (var i = 0; i < 20; i++) {
      ctx.fillRect(xScale(i) * width, 0, 2, height);
  	}

    ctx.globalCompositeOperation = 'source-over';

    if (marker) {
        ctx.fillStyle = '#3bb2d0';
        ctx.fillRect(Math.min(width - 3, xScale(marker[0]) * width), 0, 3, height);
        var xAnchor = xScale(marker[0]) * width;

        var labelWidth = 230;
        var labelWidthH = labelWidth / 2;

        if (xAnchor < labelWidthH) xAnchor = labelWidthH;
        if (xAnchor > (width - labelWidthH)) xAnchor = width - labelWidthH;
        ctx.fillStyle = '#3bb2d0';
        ctx.fillRect(xAnchor - labelWidthH, chartHeight, labelWidth, height - chartHeight);
        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('' + marker[1], xAnchor, chartHeight + 27);
    }
}

