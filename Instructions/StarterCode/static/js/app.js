function init() {
    var dropdown = d3.select('#selDataset');
    d3.json("samples.json").then(data => {
        console.log("read samples");
        // console.log(data);
        // console.log(data.samples[1]['sample_values'])
        //optionChanged()
       
       
            data.names.forEach((name)=>{
            dropdown.append('option').text(name).property('value',name);
        });
        let try1=data.names[0];
    buildCharts(try1);
    getMetadata(try1);
    });
}
    init();


    function optionChanged(newSample) {
        // Fetch new data each time a new sample is selected
        
        buildCharts(newSample);
        getMetadata(newSample);
        
    }


    function getMetadata(try1){
        d3.json("samples.json").then(data => {
         //demographic info

         demoInfo1 = data.metadata.filter(sample => sample.id == try1)[0];
        
         console.log(demoInfo1);
 
         d3.select('#sample-metadata').html('');
         d3.select('#sample-metadata').append("h6").text('id: '+demoInfo1['id']);
         d3.select('#sample-metadata').append("h6").text('ethnicity: '+demoInfo1['ethnicity']);
         d3.select('#sample-metadata').append("h6").text('gender: '+demoInfo1['gender']);
         d3.select('#sample-metadata').append("h6").text('age: '+demoInfo1['age']);
         d3.select('#sample-metadata').append("h6").text('location: '+demoInfo1['location']);
         d3.select('#sample-metadata').append("h6").text('bbtype: '+demoInfo1['bbtype']);
         d3.select('#sample-metadata').append("h6").text('wfreq: '+demoInfo1['wfreq']);

         
    });
   }

    //function to make visuals
    function buildCharts(try1){
        d3.json("samples.json").then(data => {
        defaultDataset = data.samples.filter(sample => sample.id == try1)[0];
        //console.log(defaultDataset);
        //optionChanged(value)
        
       console.log(try1);
        
        sample_vals=defaultDataset.sample_values;
        otu_idss=defaultDataset.otu_ids;
        otu_labelss=defaultDataset.otu_labels;
            
        
        //bar graph

        let bar_sample= sample_vals.slice(0,10).reverse();
        let bar_labels= otu_idss.slice(0,10).reverse(); 
        let bar_text= otu_labelss.slice(0,10).reverse();
      

        let trace1 = {
            y: bar_labels.map(otuID => `OTU ${otuID}`),
            x: bar_sample,
            text: bar_text,
            type: 'bar',
            orientation: 'h'
        }
        let data1= [trace1]
        Plotly.newPlot('bar', data1);

        //bubble graph
        let bubble_otu= (otu_idss);
        let bubble_sample= (sample_vals);

        //console.log(bubble_sample);

        let trace2 = {
            x: (bubble_otu),
            y: (bubble_sample),
            text: (otu_labelss),
            mode: 'markers',
            marker: {
            color: (bubble_otu),
            size: (bubble_sample),
            colorscale: 'Earth'
            }
        };
        
        let bubbleLayout= {
            title: 'Bacteria Cultures per Sample',
            margin: {t:0},
            hovermode: "closest",
            xaxis: {title: 'OTU ID'},
            margin: {t:30}
        };

        let data2=[trace2]
        Plotly.newPlot('bubble', data2, bubbleLayout);


        demoInfo1 = data.metadata.filter(sample => sample.id == try1)[0];
        let wfreqInfo = demoInfo1['wfreq']; //demoInfo1.wfreq;
        //console.log(wfreqInfo);

        let gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreqInfo,
                title: {text: '<b>Belly Button Washing Frequency</b> <br> Scrubs per week'},
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                        { range: [0, 1], color: 'rgb(248, 243, 236)' },
                        { range: [1, 2], color: 'rgb(244, 241, 229)' },
                        { range: [2, 3], color: 'rgb(233, 230, 202)' },
                        { range: [3, 4], color: 'rgb(229, 231, 179)' },
                        { range: [4, 5], color: 'rgb(213, 228, 157)' },
                        { range: [5, 6], color: 'rgb(183, 204, 146)' },
                        { range: [6, 7], color: 'rgb(140, 191, 136)' },
                        { range: [7, 8], color: 'rgb(138, 187, 143)' },
                        { range: [8, 9], color: 'rgb(133, 180, 138)' },
                    ],
                }
            }
        ];
            
        let gaugeLayout = { 
            width: 600, 
            height: 450, 
            margin: { t: 0, b: 0 } 
        };
        
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);
      });
    }


   

   
    
