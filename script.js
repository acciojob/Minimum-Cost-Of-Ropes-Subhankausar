function calculateMinCost() {
  // Get the input string and split it into an array of rope lengths
  const inputString = document.getElementById("rope-lengths").value;
  const ropeLengths = inputString.split(',').map(Number);

  // Create a min-heap to store the rope lengths
  const minHeap = new MinHeap();
  
  // Insert all rope lengths into the min-heap
  for (let i = 0; i < ropeLengths.length; i++) {
    minHeap.insert(ropeLengths[i]);
  }

  let totalCost = 0;

  // Combine ropes until only one rope is left in the min-heap
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes from the min-heap
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of combining these two ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the combined rope back into the min-heap
    minHeap.insert(cost);
  }

  // Display the minimum cost in the result div
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Minimum Cost: ${totalCost}`;
}

// MinHeap class implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    const last = this.heap.pop();
    this.heap[0] = last;
    this.bubbleDown();
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp() {
    let currentIdx = this.size() - 1;
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      if (this.heap[currentIdx] < this.heap[parentIdx]) {
        [this.heap[currentIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[currentIdx]];
        currentIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  bubbleDown() {
    let currentIdx = 0;
    while (true) {
      const leftChildIdx = 2 * currentIdx + 1;
      const rightChildIdx = 2 * currentIdx + 2;
      let smallestIdx = currentIdx;

      if (leftChildIdx < this.size() && this.heap[leftChildIdx] < this.heap[smallestIdx]) {
        smallestIdx = leftChildIdx;
      }

      if (rightChildIdx < this.size() && this.heap[rightChildIdx] < this.heap[smallestIdx]) {
        smallestIdx = rightChildIdx;
      }

      if (smallestIdx !== currentIdx) {
        [this.heap[currentIdx], this.heap[smallestIdx]] = [this.heap[smallestIdx], this.heap[currentIdx]];
        currentIdx = smallestIdx;
      } else {
        break;
      }
    }
  }
}
