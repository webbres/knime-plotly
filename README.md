# knime-plotly
Plotly integration into KNIME.

*This library is seemingly redundant from KNIME 4 but may provide a useful hint for custom plotly charts *


## [Generic JavaScript View Examples](./generic-javascript-view/)

Integration so far is available through the Generic JavaScript view

The [Generic JavaScript View](https://nodepit.com/node/org.knime.js.base.node.viz.generic3.GenericJSViewNodeFactory) node allows the execution of JavaScript in an embedded or headless browser. 

Plotly can be integrated to provide interactive D3 based charts which can be rendered in the web portal or within the embedded browser (use chromium or chrome). 


## SVG Export

SVG export functionality is a paid for feature in Plotly. However, as the plots are rendered using SVG we can use some javascript to build our own SVG export feature. 

1. Get the graph SVG
2. Get the second SVG containing the legend and titles etc
3. Add the relevant info from SVG 2 into SVG 1
4. Return merged SVG

See [/generic-javascript-view/svgExport.js](/generic-javascript-view/svgExport.js) for implementation.



### [Violin chart](./generic-javascript-view/violin)

![./generic-javascript-view/violin/docs/live.png](./generic-javascript-view/violin/docs/live.png)
