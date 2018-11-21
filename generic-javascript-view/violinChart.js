// Load Plotly - Requires jQuery (tick Dependencies above)
require.config({
    paths: {
        'Plotly': 'https://cdn.plot.ly/plotly-latest.min'
    }
});

/////////////////////////////////////////////////////////////////////
//////////// User config section ///////////////////////////////////


// Enter the columns you wish to plot. This is case sensitive!
var columnNames = ['Universe_0_0', 'Universe_0_1', 'Universe_1_0'];

// The column that contains the label. This column may contain a 
// single value or multiple values. If multiple values are present
// then this value is used to group and/or seperate values out on the
// x axis.
var labelColName = 'Cluster Membership';

///////////////////// End of user config section //////////////////
///////////////////////////////////////////////////////////////////





// Configure the layout for the violin plot
// See plotly javascript documentation for more information
var layout = {
	 yaxis: {
	   zeroline: true
	 },
	 xaxis: {
	   zeroline: true
	 },
	 violinmode: 'group',
	 title: 'Violin chart - preformatted'
};


// Get the column data and store in an array
// The index positions of the array need to 
// match the columnNames array
var colData = [];

for (var col of columnNames)
{
	colData.push(knimeDataTable.getColumn(indexOfColumnName(col)));
}

var columns = knimeDataTable.getColumnNames();

// Find the index position of the named column
function indexOfColumnName(name) {
	var columnNames = knimeDataTable.getColumnNames();

	var index;

	for (var i = 0; i < columnNames.length; i++)
	{
		if(name === columnNames[i]) {
			index = i;
			break;
		}
	}

	return index;
}


// Calculate the data for the violin plot
function getData()
{

	var plotData = [];

	for(var i = 0; i < columnNames.length; i++)
	{
		var data = knimeDataTable.getColumn(indexOfColumnName(columnNames[i]));
		var label = knimeDataTable.getColumn(indexOfColumnName(labelColName));
	
	
		var data = {
			x: label,
			y: data,
			type: 'violin',
	          name: columnNames[i],
	          box: {
	            visible: true
	          },
	          meanline: {
	            visible: true
	          }//,
//	          fillcolor: '#7474C1',
//	          line: {
//	          	color: 'black'
//	          }
		};

		plotData.push(data);
	}
		
	return plotData;
}


// Now plot the chart
require(['Plotly'], function (Plotly) {
	(
		function() {
			var d3 = Plotly.d3;
			
			var WIDTH_IN_PERCENT_OF_PARENT = 80,
			    HEIGHT_IN_PERCENT_OF_PARENT = 80;
			
			var gd3 = d3.select('body')
			    .append('div');
//			    .style({
//			        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
//			        'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',
//			
//			        height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
//			        'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
//			    });
			
			var gd = gd3.node();

			var data = getData();
			
			Plotly.plot(gd, data, layout);
			
			window.onresize = function() {
			    Plotly.Plots.resize(gd);
			};
		}
	)();
});columnNames