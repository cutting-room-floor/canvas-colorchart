module.exports = canvasColorChart;
// var elem = document.createElement('canvas');
//setInterval(function() {
 // canvasLineChart(elem, [[10, 'rgba(0, 0, 0, 0.2)'], [20, '#0f0']], [10, '#FF0000']);
//}, 100);
//=elem

function canvasColorChart(c, width, data, marker) {
    width = width * 2;
    var height = 30 * 2;
    var chartHeight = 18 * 2;
    var padding = 8;
    var margin = (chartHeight / 2) - padding;
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

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, width, chartHeight);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    for (var i = 0; i < 21; i++) {
        ctx.fillRect(xScalePX(i), 0, 4, chartHeight);
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(margin, padding + 2, width - (margin * 2), chartHeight - (margin * 2) + 2);
    [
        { offset: margin, fill: data[0][1], counter: false },
        { offset: width - margin, fill: data[data.length - 1][1], counter: true }
    ].forEach(function(opts) {
        ctx.beginPath();
        ctx.arc(opts.offset, (chartHeight / 2) + 1, margin - 1, Math.PI / 2, Math.PI * 1.5, opts.counter);
        ctx.fillStyle = opts.fill;
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    });

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(margin, padding, width - (margin * 2), 2);
    ctx.fillRect(margin, chartHeight - padding, width - (margin * 2), 2);
    ctx.beginPath();

    ctx.globalCompositeOperation = 'source-atop';

    var grd = ctx.createLinearGradient(margin, 0, width - margin, 0);
    data.forEach(function(data, i) {
        grd.addColorStop(xScale(data[0]), data[1]);
    });
    ctx.fillStyle = grd;
    ctx.rect(margin, padding + 2, width - (margin * 2), chartHeight - (padding * 2) - 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';

    if (marker) {
        ctx.fillStyle = '#ddd';
        ctx.fillRect(xScalePX(marker[0]), 0, 3, chartHeight);
        var xAnchor = xScalePX(marker[0]);

        var labelWidth = marker[1].length * 12;
        var labelWidthH = labelWidth / 2;

        if (xAnchor < labelWidthH) xAnchor = labelWidthH;
        if (xAnchor > (width - labelWidthH)) xAnchor = width - labelWidthH - margin;
        ctx.fillStyle = '#ddd';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('' + marker[1], xAnchor, chartHeight + 20);
    }
}
