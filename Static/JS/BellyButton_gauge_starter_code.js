// Create the buildChart function.
function buildGauge(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
    console.log(resultArray);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata.filter(sampleObject => sampleObject.id == sample);
    console.log(metadata);

    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var firstPerson = metadata[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    console.log(otu_ids);
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var wfreq = metadata.map(person => person.wfreq).toString(parseFloat(wfreq));
    console.log(wfreq);


    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    console.log(yticks);

    console.log("This is in the gauge");
    //   // Use Plotly to plot the bar data and layout.
    //   Plotly.newPlot();

    //   // Use Plotly to plot the bubble data and layout.
    //   Plotly.newPlot();


    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      value: wfreq,
      title: { text: "<span style='font-size:24; color:#271f10; font-weight:bold'>Belly Button Washing Frequency</span><br><span style='font-size:18; color:#372c14; font-weight:bold'>Scrubs per Week</span>"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10], tickwidth: 2, dtick: 2, tickcolor: "#271f10" },
        steps: [
          { range: [0, 2], color: "433508" },
          { range: [2, 4], color: "5c4a0a" },
          { range: [4, 6], color: "756224" },
          { range: [6, 8], color: "cfb663" },
          { range: [8, 10], color: "ede4c4" }
        ],
        bar: { color: "black" },
        bgcolor: "#8a6d3b",
        borderwidth: 2,
        bordercolor: "#271f10"
      }

    }];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      paper_bgcolor: "#8a6d3b",
      font: {color:"#372c14", family: "Arial"}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}