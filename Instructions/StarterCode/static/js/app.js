function init() {
    d3.json("samples.json").then(data => {
        console.log("read samples");
        console.log(data);
        console.log(data.samples[1]['sample_values'])

        sample_vals=[];
        otu_idss=[];
        otu_labelss=[];

        for (let i = 0; i<data.samples.length; i++){
            sample_vals.push( data.samples[i]['sample_values'])
            otu_idss.push(data.samples[i]['otu_ids'])
            otu_labelss.push(data.samples[i]['otu_labels'])

        }    
        
        let bar_sample= (sample_vals[1].slice(0,10))
        let bar_labels= otu_idss[1].slice(0,10).reverse() 
        bar_sample.sort(function compareFunction(firstNum, secondNum) {
            // resulting order is (1, 2, 3)
            return firstNum - secondNum;
        });
        
        console.log(bar_labels[5]);
        bar_labels_txt= []

        for (let i =0; i<10; i++){
            bar_labels_txt.push(bar_labels[i].toString())
        }

        console.log(bar_labels_txt);
        console.log(bar_sample);

        let trace1 = {
            y: (bar_labels_txt),
            x: bar_sample,
            // text: bar_labels,
            type: 'bar',
            orientation: 'h'
        }
        let data1= [trace1]
        Plotly.newPlot('bar', data1);


        let bubble_otu= (otu_idss[0]);
        let bubble_sample= (sample_vals[0]);

        console.log(bubble_sample);

        let trace2 = {
            x: (bubble_otu),
            y: (bubble_sample),
            mode: 'markers',
            marker: {
              color: (bubble_otu),
              size: (bubble_sample)
            }
        };
        let data2=[trace2]
        Plotly.newPlot('bubble', data2);
          
    });
}
function optionChanged(value) {
    console.log(value);
}

init();

// var barData = [
//     {
//       y: yticks,
//       x: sample_values.slice(0, 10).reverse(),
//       text: otu_labels.slice(0, 10).reverse(),
//       type: "bar",
//       orientation: "h",
//     }
//   ];
//   // Create the layout for the bar chart. 
//   var barLayout = {
//     title: "Top 10 Bacteria Cultures Found",
//     margin: { t: 30, l: 150 }
//   };
//   // Use Plotly to plot the data with the layout. 
//   Plotly.newPlot("bar", barData, barLayout);


//   use function buildCharts(sample) from line 7 to 54