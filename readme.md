# Aplicação Representando a estrutura de dados em grafos com base em aeroportos do Brasil

Este projeto tem por finalidade demonstrar a utilização de uma estrutura de dados muito utilizada, os grafos. A aplicação tem como base a ligação de aeroportos brasileiros por meio de um grafo. A aplicação é executada inteiramente no navegador, utilizando apenas HTML, CSS e JavaScript (o cálculo do menor caminho via algoritmo de Dijkstra roda no client-side).

---

## Requisitos

* Um navegador moderno.
* Um servidor HTTP simples para servir os arquivos estáticos (necessário porque `cidades.json` é carregado via `fetch`).

---

## Instruções de execução

Realize o clone deste repositório utilizando o comando a baixo:

```bash
git clone https://github.com/DjhonyOliveira/grafo_cidades_alto_vale.git
```

Posteriormente, navegue até a raiz do projeto e sirva os arquivos estáticos com qualquer servidor HTTP, por exemplo:

```bash
python3 -m http.server 8000
```

Endereço IP e porta utilizada deve ser validado conforme disponivel no ambiente a ser executado
