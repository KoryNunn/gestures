module.exports = function findLineByLeastSquares(points) {
    var sum_x = 0,
        sum_y = 0,
        sum_xy = 0,
        sum_xx = 0,
        count = 0,
        x = 0,
        y = 0,
        numberOfPoints = points.length,
        results = [];

    /*
     * Nothing to do.
     */
    if (numberOfPoints === 0) {
        return [];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (var v = 0; v < numberOfPoints; v++) {
        x = points[v].x;
        y = points[v].y;
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }

    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     */
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;


    for (var v = 0; v < numberOfPoints; v++) {
        results.push({
            x: points[v].x,
            y: points[v].x * m + b
        });
    }

    return results;
}