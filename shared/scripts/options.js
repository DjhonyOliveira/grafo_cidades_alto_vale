export const options = {
    nodes: {
        shape: 'dot',
        scaling: { 
            min: 6, 
            max: 40     
        },
        font: { 
            size: 14, 
            face: 'Inter' 
        }
    },
    edges: {
        width: 2,
        font: { 
            align: 'middle' 
        },
        smooth: { 
            enabled: true, 
            type: 'dynamic' 
        }
    },
    groups: {
        pequena: { 
            color: { 
                background: '#90be6d' 
            }, 
            size: 12 
        }
    },
    physics: {
        stabilization: true,
        barnesHut: { 
            gravitationalConstant: -3000, 
            springLength: 200 
        }
    },
    interaction: {
        hover: true,
        tooltipDelay: 200,
        dragNodes: true,
        zoomView: true
    }
};