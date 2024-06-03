# Pathfinding Algorithm Visualizer
An interactive visualization tool for common pathfinding algorithms.

## Technologies Used
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

## Live Site Link
Directly access and use my visualization tool without any downloads <a href="https://connorusaty.github.io/pathfinding-visualizer/" target="_blank">here</a>.

## Video Demo
https://youtu.be/V61U_hktB9I

## Features
<ul>
  <li>Includes A* Search, Dijkstra's, Breadth-First Search, and Depth-First Search pathfinding algorithms</li>
  <li>Three different heuristics available for A* Search</li>
  <li>Adjustable animation speeds for algorithm visualization</li>
  <li>Instant revisualization with a new algorithm selection or new Start or Finish node locations</li>
  <li>Real-time unique maze generation utilizing algorithms such as recursive division</li>
  <li>Full How-to-Use guide</li>
  <li>Fully responsive design, including the grid on reload</li>
</ul>

## Meet the Algorithms
<h4>A* Search:</h4> <p>A* Search is a weighted pathfinding algorithm that guarantees the shortest path. It combines the advantages of both Dijkstra's Algorithm and a heuristic approach. A* evaluates each potential path based on a cost function that considers both the distance traveled from the start node and the estimated remaining distance to the goal. This algorithm uses a priority queue (often implemented with a min-heap) to efficiently explore promising paths first. The time complexity of A* depends on the heuristic function used and can range from O(1) to exponential time.</p>

<h4>Dijkstra's Algorithm:</h4> <p>Dijkstra's Algorithm is a weighted pathfinding algorithm that guarantees finding the shortest path. It explores the graph by gradually moving from the start node to neighboring nodes with the lowest accumulated cost. Dijkstra's Algorithm uses a priority queue (often implemented with a min-heap) to prioritize the nodes with the lowest cost to be checked next. The time complexity of Dijkstra's Algorithm is O((V + E) log V), where V represents the number of vertices and E represents the number of edges in the graph.</p>

<h4>Breadth-First Search (BFS):</h4> <p>Breadth-First Search is an unweighted pathfinding algorithm that guarantees the shortest path in terms of the number of edges. It explores the graph by systematically visiting all the neighbors of a node before moving to the next level of neighbors. BFS uses a queue data structure to maintain the order of node exploration. The time complexity of BFS is O(V + E), where V represents the number of vertices and E represents the number of edges in the graph.</p>

<h4>Depth-First Search (DFS):</h4> <p>Depth-First Search is an unweighted pathfinding algorithm that does not guarantee the shortest path. It explores the graph by traversing as far as possible along each branch before backtracking. For example as far right as possible, then as far down, etc. DFS uses a stack (usually implemented with a recursive function call or an explicit stack) to keep track of the nodes to visit. The time complexity of DFS is O(V + E), where V represents the number of vertices and E represents the number of edges in the graph.</p>

## Heuristics
<h4>Manhattan Distance:</h4> <p>The Manhattan Distance heuristic calculates the straight-line distance between two points on a grid-like graph. It measures the distance by summing the absolute differences between the x-coordinates and y-coordinates of the current node and the goal node.</p>

<h4>Euclidean Distance:</h4> <p>The Euclidean Distance heuristic calculates the straight-line distance between two points in a continuous space. It measures the distance using the Euclidean formula, which considers the square root of the sum of the squares of the differences between the x-coordinates and y-coordinates of the current node and the goal node.</p>

<h4>Diagonal Distance:</h4> <p>The Diagonal Distance heuristic calculates the diagonal distance between two points on a grid-like graph. It measures the distance by taking the maximum absolute difference between the x-coordinates and y-coordinates of the current node and the goal node.</p>
