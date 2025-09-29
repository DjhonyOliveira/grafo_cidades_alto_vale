import { options } from './options.js';

let network, nodes, edges;

async function initGraph() {
    const response = await fetch("cidades.json");
    const data = await response.json();

    nodes = new vis.DataSet(data.nodes);
    edges = new vis.DataSet(data.edges.map(edge => ({
        id: `${edge.from}-${edge.to}`,
        from: edge.from,
        to: edge.to,
        label: edge.label,
        length: edge.distance
    })));

    const container = document.getElementById("network");
    network = new vis.Network(container, { nodes, edges }, options);

    bindEvents();
}

function bindEvents() {
    document.getElementById('fitBtn').onclick = () => network.fit({ animation: true });

    document.getElementById('exportBtn').onclick = () => {
        const canvas  = network.canvas.frame.canvas;
        const dataUrl = canvas.toDataURL('image/png');
        const a       = document.createElement('a');
        a.href = dataUrl;
        a.download = 'grafo-cidades.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    network.on('hoverNode', function() {
        network.body.container.style.cursor = 'pointer';
    });
    network.on('blurNode', function() { 
        network.body.container.style.cursor = 'default'; 
    });

    network.on('selectNode', function(params) {
        const selected  = params.nodes[0];
        const connected = network.getConnectedNodes(selected);

        nodes.forEach(node => { 
            nodes.update({ id: node.id, color: undefined }); 
        });

        connected.forEach(id => { 
            nodes.update({ id: id, color: { background:'#cfe9ff' } }); 
        });

        nodes.update({ id: selected, color:{ background:'#8ecae6' } });
    });

    document.getElementById("rotaForm").addEventListener("submit", async function(e) {
        e.preventDefault();

        const origem  = document.getElementById("origem").value;
        const destino = document.getElementById("destino").value;

        const response = await fetch("calcula.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `cidade_origem=${origem}&cidade_destino=${destino}`
        });

        const result = await response.json();
        console.log(result);

        edges.forEach(edge => {
            edges.update({ id: edge.id, color: { color: "black" }, width: 1 });
        });

        for (let i = 0; i < result.path.length - 1; i++) {
            const from = result.path[i];
            const to   = result.path[i+1];
            const edgeId1 = `${from}-${to}`;
            const edgeId2 = `${to}-${from}`;

            if (edges.get(edgeId1)) {
                edges.update({ id: edgeId1, color: { color: "red" }, width: 3 });
            } else if (edges.get(edgeId2)) {
                edges.update({ id: edgeId2, color: { color: "red" }, width: 3 });
            }
        }
    });
}

initGraph();