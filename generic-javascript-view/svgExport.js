// Enter this code into the Image Generation tab to export
// a ploty chart as an SVG and retain the info layer with
// the title and axis titles

// Remove an element with a specific class from the DOM
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// Remove the curso-crosshair class which is the interactive layer
// If this layer is present a series of black boxes will be added 
// to the SVG render
removeElementsByClass('cursor-crosshair');

try 
{	
	// Create a new serializer object which is needed to create
	// the string for the KNIME output
	var serializer = new XMLSerializer();

	// Get the graph element which is in the first 'main-svg' classed element
	// Plotly doesn't appear to use IDs we can use
	var svgElement = document.getElementsByClassName("main-svg")[0];


	// Get the info layer which is within the second 'main-svg' element
	// and can be fetched from the 'infolayer' class. The defs must
	// also be added to enable the legend to work
	var infoLayer = document.getElementsByClassName("main-svg")[1];
	svgElement.appendChild(infoLayer.getElementsByClassName('infolayer')[0]);
	svgElement.appendChild(infoLayer.getElementsByTagName('defs')[0]);


	var graph = serializer.serializeToString(svgElement);
	
	return graph;
} catch (err)
{
	return "<svg></svg>";
}