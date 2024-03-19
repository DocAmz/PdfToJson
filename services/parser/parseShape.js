module.exports = {
  shapeParser: function(content) {
    console.log('Parsing shapes...');
    const shapes = [];
    let currentPath = [];

    for (let i = 0; i < content.fnArray.length; i++) {
        const operation = content.fnArray[i];
        const args = content.argsArray[i];

        if (args === null || args === undefined) {
            continue; // Skip if args are null or undefined
        }

        switch (operation) {
            case 70: // MoveTo
                if (currentPath.length > 0) {
                    shapes.push(currentPath); // Save previous path
                    currentPath = []; // Start a new path
                }
                currentPath.push({ type: 'MoveTo', x: args[0], y: args[1] });
                break;
            case 71: // LineTo
                currentPath.push({ type: 'LineTo', x: args[0], y: args[1] });
                break;
            case 12: // ClosePath
                currentPath.closed = true;
                break;
            default:
                // Ignore other operations for now
                break;
        }
    }

    if (currentPath.length > 0) {
        shapes.push(currentPath); // Save the last path
    }
        console.log('Shapes parsed:', shapes);
        return shapes;
    }
}