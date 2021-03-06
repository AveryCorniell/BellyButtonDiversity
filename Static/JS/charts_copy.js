function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildGauge(firstSample);
        buildMetadata(firstSample);
    });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    buildGauge(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        // Filter the data for the object with the desired sample number
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        // Use d3 to select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
        // 3. Create a variable that holds the samples array. 
        var samples = data.samples;
        // 4. Create a variable that filters the samples for the object with the desired sample number.
        var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
        console.log(resultArray);

        //  5. Create a variable that holds the first sample in the array.
        var result = resultArray[0];
        console.log(result);

        // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var otu_ids = result.otu_ids;
        console.log(otu_ids);
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // BUILD BAR CHART --------
        // 7. Create the yticks for the bar chart.
        // Hint: Get the the top 10 otu_ids and map them in descending order  
        //  so the otu_ids with the most bacteria are last. 

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        console.log(yticks);

        // Create a custom color scale.
        var customColors = [
            ['0.0', 'rgb(207,168,24)'],
            ['0.111111111111', 'rgb(184,149,21)'],
            ['0.222222222222', 'rgb(161,130,18)'],
            ['0.333333333333', 'rgb(138,111,15)'],
            ['0.444444444444', 'rgb(115,93,13)'],
            ['0.555555555556', 'rgb(92,81,10)'],
            ['0.666666666667', 'rgb(92,74,10)'],
            ['0.777777777778', 'rgb(92,67,10)'],
            ['0.888888888889', 'rgb(69,56,8)'],
            ['1.0', 'rgb(46,37,5)']
        ];

        
        // 8. Create the trace for the bar chart.
        var barData = [{
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            marker: {
                color: otu_ids,
                colorscale: customColors,
                line:{
                    color:"#271f10",
                    width: 2
                } 
            }
        }];

        // 9. Create the layout for the bar chart. 
        var barLayout = {
            title: {text: "<span style='font-size:24; color:#271f10; font-weight:bold'>Top 10 Bacteria Cultures Found</span>"},
            plot_bgcolor: "#8a6d3b",
            paper_bgcolor: "#8a6d3b",
            bgcolor: "#8a6d3b",
            yaxis: {
                tickfont: {
                    family: "Arial",
                    size: 14,
                    color: "#372c14"
                },
               style: {
                   fontWeight: "bold"
                }
            },
            xaxis:  {
                tickfont: {
                    family: "Arial",
                    size: 20,
                    color: "#372c14"
                },
               style: {
                   fontWeight: "bold"
                }
            },
        };

        // 10. Use Plotly to plot the data with the layout. 
        Plotly.newPlot("bar", barData, barLayout);

        // 1. Create the trace for the bubble chart.
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: customColors,
                line:{
                    color:"#271f10",
                    width: 2
                }
            }
        }];

        // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
            title:  {text: "<br><span style='font-size:24; color:#271f10; font-weight:bold'>      Bacteria Cultures Per Sample</span>"},
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "<span style='font-size:18; color:#372c14; font-weight:bold'>OTU ID</span>" },
            margin: { t: 30 },
            plot_bgcolor: "#8a6d3b",
            paper_bgcolor: "#8a6d3b",
            yaxis: {
                tickfont: {
                    family: "Arial",
                    size: 20,
                    color: "#372c14"
                },
               style: {
                   fontWeight: "bold"
                },
            },
            xaxis:  {
                tickfont: {
                    family: "Arial",
                    size: 20,
                    color: "#372c14"
                },
               style: {
                   fontWeight: "bold"
                },
            },
        };

        // 3. Use Plotly to plot the data with the layout.
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}
