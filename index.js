module.exports = canvasLineChart;

// var elem = document.createElement('canvas');
// canvasLineChart(elem, [[10 * (Math.sin(Date.now() / 1000) + 1), '#f00'], [20, '#0f0']], [10, '#fff']);
//=elem

function canvasLineChart(c, data, marker) {
    var width = 170 * 2;
    var height = 40 * 2;
    var chartHeight = 30 * 2;
    c.width = width;
    c.height = height;
    c.style.width = width / 2 + 'px';
    c.style.height = height / 2 + 'px';

    var ctx = c.getContext('2d');
    function xScale(_) {
      return (_ / 20);
    }

    var grd = ctx.createLinearGradient(20, 0, width - 40, 0);
    data.forEach(function(data, i) {
      grd.addColorStop(xScale(data[0]), data[1]);
    });
    ctx.fillStyle = grd;
    ctx.rect(20, 0, width - 40, height - 40);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(20, 20, 20, 0, 2 * Math.PI, false);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width - 20, 20, 20, 0, 2 * Math.PI, false);
    ctx.fill();

    if (marker) {
        ctx.fillStyle = '#3bb2d0';
        ctx.fillRect(xScale(marker[0]) * width, 0, 3, height);
        var xAnchor = xScale(marker[0]) * width;
        if (xAnchor < 20) xAnchor = 20;
        if (xAnchor > (width - 20)) xAnchor = width - 20;
        ctx.fillStyle = '#3bb2d0';
        ctx.fillRect(xAnchor - 20, chartHeight, 40, 20);
        ctx.fillStyle = '#fff';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('' + marker[1], xAnchor, chartHeight + 17);
    }
}
