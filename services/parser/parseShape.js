module.exports = {
  shapeParser: function(content) {
    console.log('Parsing shapes...');
    const shapes = [];

    // Iterate through each operator in the content stream
    for (let i = 0; i < content.length; i++) {
        const op = content[i];

        // Check if the operator is for drawing a path
        if (op.fn === pdfjs.OPS.constructPath) {
            // Extract the path data
            const pathData = op.args;
            // Store the path data as a shape
            shapes.push({
                type: 'path',
                data: pathData
            });
        }
        // Additional checks for other shape drawing operators can be added here
        // For example: rectangles, circles, lines, etc.
    }

    console.log('Shapes parsed:', shapes);
    return shapes;
}
}