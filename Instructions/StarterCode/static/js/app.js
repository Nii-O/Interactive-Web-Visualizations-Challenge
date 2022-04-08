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
        
        let bar_sample= (sample_vals[1].slice(0,13))
        bar_sample.sort(function compareFunction(firstNum, secondNum) {
            // resulting order is (1, 2, 3)
            return firstNum - secondNum;
        });
        
        
        
        console.log(otu_idss);

        let trace1 = {
            y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            x: (bar_sample),
            type: 'bar',
            orientation: 'h'
        }
        let data1= [trace1]
        Plotly.newPlot('bar', data1);


        let bubble_otu= (otu_idss[1]);
        let bubble_sample= (sample_vals[1]);

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

