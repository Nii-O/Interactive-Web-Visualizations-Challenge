function init() {
    d3.json("samples.json").then(data => {
        console.log("read samples");
        console.log(data);
        console.log(data.samples[1]['sample_values'])

        sample_vals=[];
        otu_idss=[];
        otu_labelss=[];

        for (let i = 0; i<10; i++){
            sample_vals.push( data.samples[1]['sample_values'][i])
            otu_idss.push(data.samples[1]['otu_ids'][i])
            otu_labelss.push(data.samples[1]['otu_labels'][i])

        }    
        
        sample_vals.sort(function compareFunction(firstNum, secondNum) {
            // resulting order is (1, 2, 3)
            return firstNum - secondNum;
        });

        console.log(otu_idss);
        let trace1 = {
            y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            x: (sample_vals),
            type: 'bar',
            orientation: 'h'
        }
        let data1= [trace1]
        Plotly.newPlot('bar', data1);

        let trace2 = {
            x: (otu_idss),
            y: (sample_vals),
            mode: 'markers',
            marker: {
              color: (otu_idss),
              size: (sample_vals)
            }
        };
        let data2=[trace2]
        Plotly.newPlot('bubble', data);
          
    });
}
function optionChanged(value) {
    console.log(value);
}

init();

