<?php

function dijkstra($graph, $start, $end) {
    $dist  = [];
    $prev  = [];
    $queue = [];

    foreach ($graph as $vertex => $edges) {
        $dist[$vertex]  = INF;
        $queue[$vertex] = INF;
        $prev[$vertex]  = null;
    }

    $dist[$start] = 0;
    $queue[$start] = 0;

    while (!empty($queue)) {
        $u = array_search(min($queue), $queue);
        if ($u === $end) break;

        unset($queue[$u]);

        if (!empty($graph[$u])) {
            foreach ($graph[$u] as $neighbor => $cost) {
                $alt = $dist[$u] + $cost;
                if ($alt < $dist[$neighbor]) {
                    $dist[$neighbor]  = $alt;
                    $prev[$neighbor]  = $u;
                    $queue[$neighbor] = $alt;
                }
            }
        }
    }

    $path = [];
    $u = $end;
    if ($prev[$u] !== null || $u === $start) {
        while ($u !== null) {
            array_unshift($path, $u);
            $u = $prev[$u];
        }
    }

    return [
        "distance" => $dist[$end],
        "path"     => $path
    ];
}

$json = file_get_contents("cidades.json");
$data = json_decode($json, true);

$graph = [];

foreach ($data["edges"] as $edge) {
    $graph[$edge["from"]][$edge["to"]] = $edge["length"];
    $graph[$edge["to"]][$edge["from"]] = $edge["length"];
}

$start = $_POST["cidade_origem"]  ?? "1";
$end   = $_POST["cidade_destino"] ?? "1";

$result = dijkstra($graph, $start, $end);

header('Content-Type: application/json');
echo json_encode($result);