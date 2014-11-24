module.exports = canvasColorChart;
// var elem = document.createElement('canvas');
//setInterval(function() {
 // canvasLineChart(elem, [[10, 'rgba(0, 0, 0, 0.2)'], [20, '#0f0']], [10, '#FF0000']);
//}, 100);
//=elem

function canvasColorChart(c, data, marker) {
    var width = 169 * 2;
    var height = 30 * 2;
    var chartHeight = 18 * 2;
    var margin = 5;
    c.width = width;
    c.height = height;
    c.style.width = width / 2 + 'px';
    c.style.height = height / 2 + 'px';

    var ctx = c.getContext('2d');
    function xScale(_) {
        return (_ / 20);
    }
    function xScalePX(_) {
        return ~~Math.min(Math.max(0, ((_ / 20) * (width - (margin * 2))) + margin), width - margin);
    }
    ctx.fillStyle = '#fff';
    [width - (chartHeight / 2) - margin, margin + chartHeight / 2].forEach(function(offset) {
        ctx.beginPath();
        ctx.arc(offset, chartHeight/2 - 1, chartHeight/2 - 1, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    });

    ctx.fillRect(chartHeight/2 + margin, 1, width - chartHeight - margin, chartHeight - 2);

    ctx.fillStyle = '#000';
    ctx.fillRect(chartHeight/2, 0, width - chartHeight, 1);
    ctx.fillRect(chartHeight/2, chartHeight - 2, width - chartHeight, 1);
    ctx.beginPath();

    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (var i = 0; i < 20; i++) {
        ctx.fillRect(xScalePX(i), 0, 2, height);
    }

    var grd = ctx.createLinearGradient(margin, 0, width - margin, 0);
    data.forEach(function(data, i) {
        grd.addColorStop(xScale(data[0]), data[1]);
    });
    ctx.fillStyle = grd;
    ctx.rect(0, 0, width, chartHeight);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';

    if (marker) {
        ctx.fillStyle = '#3bb2d0';
        ctx.fillRect(xScalePX(marker[0]), 0, 3, height);
        var xAnchor = xScalePX(marker[0]);

        var labelWidth = 230;
        var labelWidthH = labelWidth / 2;

        if (xAnchor < labelWidthH) xAnchor = labelWidthH;
        if (xAnchor > (width - labelWidthH)) xAnchor = width - labelWidthH - margin;
        ctx.fillStyle = '#3bb2d0';
        ctx.fillRect(xAnchor - labelWidthH, chartHeight, labelWidth, height - chartHeight);
        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('' + marker[1], xAnchor, chartHeight + 18);
    }
}

