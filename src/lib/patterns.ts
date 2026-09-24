export type Difficulty = "Easy" | "Medium" | "Hard";

export type Problem = {
  id: string;
  name: string;
  difficulty: Difficulty;
  note: string;
};

export type Pattern = {
  id: string;
  name: string;
  phase: string;
  recognize: string[];
  intuition: string;
  template: string;
  mistakes: string[];
  problems: Problem[];
};

function problems(
  patternId: string,
  rows: [string, Difficulty, string][],
): Problem[] {
  return rows.map(([name, difficulty, note]) => ({
    id: `${patternId}:${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    difficulty,
    note,
  }));
}

export const patterns: Pattern[] = [
  {
    id: "hashing",
    name: "Hashing / frequency",
    phase: "Rebuild",
    recognize: [
      "Need a pair, count, or membership in O(1)",
      "The array is unsorted and a sort would be extra work",
      "You care how many times a value appeared",
    ],
    intuition:
      "Trade memory for a second pass. Store what you have already seen, then ask the map a yes/no or a count.",
    template: `Map<Integer, Integer> freq = new HashMap<>();
for (int value : nums) {
    freq.merge(value, 1, Integer::sum);
}`,
    mistakes: [
      "Using a list scan inside the loop and calling it hashing",
      "Forgetting that int[] cannot be a HashMap key; use a String or a long encoding",
      "Updating the map before checking the complement in Two Sum",
    ],
    problems: problems("hashing", [
      ["Two Sum", "Easy", "The template. Say the complement out loud before you code."],
      ["Group Anagrams", "Medium", "Key is the sorted word or a 26-count signature."],
      ["Longest Consecutive Sequence", "Medium", "Set lookup. Only start counting at a number with no left neighbor."],
    ]),
  },
  {
    id: "prefix-hash",
    name: "Prefix sum + HashMap",
    phase: "Rebuild",
    recognize: [
      "Subarray sum, count of subarrays, or longest subarray with a property",
      "The property is about a range, not a single element",
      "Brute force is O(n^2) over every i..j",
    ],
    intuition:
      "prefix[j] - prefix[i] = k means you have seen prefix[j] - k before. Store earlier prefixes.",
    template: `Map<Integer, Integer> seen = new HashMap<>();
seen.put(0, 1);
int prefix = 0;
for (int value : nums) {
    prefix += value;
    // query seen.get(prefix - k) before inserting prefix
}`,
    mistakes: [
      "Putting the current prefix into the map before the query",
      "Forgetting the empty prefix 0",
      "Using this on an unsorted pair problem that is just Two Sum",
    ],
    problems: problems("prefix-hash", [
      ["Subarray Sum Equals K", "Medium", "Count version. seen stores frequency."],
      ["Contiguous Array", "Medium", "Treat 0 as -1. Longest subarray with sum 0."],
      ["Subarray Sums Divisible by K", "Medium", "Store prefix mod k. In Java, fix negative mods."],
    ]),
  },
  {
    id: "two-pointers",
    name: "Two pointers",
    phase: "Rebuild",
    recognize: [
      "Sorted array, or you are allowed to sort",
      "Pair, triplet, or two ends moving toward each other",
      "You can discard one side without missing the answer",
    ],
    intuition:
      "Sorted order gives you a direction. If the sum is too small, move left. If too big, move right.",
    template: `int left = 0;
int right = nums.length - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) return new int[] {left, right};
    if (sum < target) left++;
    else right--;
}`,
    mistakes: [
      "Skipping duplicate handling in 3Sum and returning the same triplet",
      "Moving both pointers when only one side is wrong",
      "Using two pointers on an unsorted array without sorting first",
    ],
    problems: problems("two-pointers", [
      ["Two Sum II", "Easy", "Sorted input. This is the skeleton."],
      ["3Sum", "Medium", "Sort, fix one index, two-pointer the rest, skip duplicates."],
      ["Container With Most Water", "Medium", "Move the shorter side. Area is width times min height."],
    ]),
  },
  {
    id: "sliding-window",
    name: "Sliding window",
    phase: "Rebuild",
    recognize: [
      "Contiguous subarray or substring",
      "Longest, shortest, or count of windows that satisfy a condition",
      "Adding the right end and shrinking from the left fixes the condition",
    ],
    intuition:
      "Maintain a window that is valid, or the smallest window that just became invalid. The answer hides in how the window changes, not in restarting from every index.",
    template: `int left = 0;
for (int right = 0; right < n; right++) {
    // add s.charAt(right)
    while (/* window breaks the rule */) {
        // remove s.charAt(left++)
    }
    // update answer from [left, right]
}`,
    mistakes: [
      "Restarting left from 0 on every right. That is brute force.",
      "Shrinking with if instead of while when one removal is not enough",
      "Treating at-most-K and exactly-K as the same. Exactly-K is atMost(K) - atMost(K-1).",
    ],
    problems: problems("sliding-window", [
      ["Longest Substring Without Repeating Characters", "Medium", "Last index of each char. Window of unique chars."],
      ["Max Consecutive Ones III", "Medium", "At most K zeros. The whole family of 'at most K' starts here."],
      ["Minimum Window Substring", "Hard", "Need vs have counts. Shrink while the window still covers the target."],
    ]),
  },
  {
    id: "binary-search",
    name: "Binary search",
    phase: "Rebuild",
    recognize: [
      "Sorted, rotated sorted, or a predicate that flips from false to true once",
      "Find first, last, or any position",
      "O(log n) is required or the array is huge",
    ],
    intuition:
      "Keep a range where the answer is still possible. Each step throws away half. Decide which half using the middle, then be strict about inclusive bounds.",
    template: `int left = 0;
int right = nums.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
}`,
    mistakes: [
      "mid = (left + right) / 2 overflowing on large bounds. Use left + (right - left) / 2",
      "left < right vs left <= right mixed up, so you loop forever or drop the last index",
      "On a rotated array, forgetting to first ask which half is sorted",
    ],
    problems: problems("binary-search", [
      ["Binary Search", "Easy", "Write it closed-interval until you cannot get it wrong."],
      ["Search in Rotated Sorted Array", "Medium", "One half is always sorted. Search there if target lies inside it."],
      ["Find First and Last Position", "Medium", "Two searches: lower bound and upper bound."],
    ]),
  },
  {
    id: "binary-search-answer",
    name: "Binary search on the answer",
    phase: "Rebuild",
    recognize: [
      "Minimize the maximum, or maximize the minimum",
      "A yes/no check exists: 'can I achieve capacity X?'",
      "The search space is a number range, not an index in the array",
    ],
    intuition:
      "If X works, every larger X works (or the opposite). Binary search the boundary. The check function is usually a greedy scan.",
    template: `int low = 1;
int high = maxPossible;
while (low < high) {
    int mid = low + (high - low) / 2;
    if (can(mid)) high = mid;
    else low = mid + 1;
}`,
    mistakes: [
      "Binary searching the array index instead of the answer value",
      "A check function that is not monotonic",
      "Off-by-one on low < high when you want the minimum feasible",
    ],
    problems: problems("binary-search-answer", [
      ["Koko Eating Bananas", "Medium", "Minimum speed. Check is hours needed at speed mid."],
      ["Capacity To Ship Packages Within D Days", "Medium", "Minimum capacity. Same shape as book allocation."],
      ["Split Array Largest Sum", "Hard", "This is book allocation / painter partition. One pattern, three stories."],
    ]),
  },
  {
    id: "matrix",
    name: "Matrix traversal",
    phase: "Rebuild",
    recognize: [
      "Grid, layers, diagonals, or in-place rotation",
      "Boundaries shrink as you walk",
      "You must visit every cell once in a defined order",
    ],
    intuition:
      "Name the boundaries: top, bottom, left, right. Move along one edge, then contract that boundary.",
    template: `int top = 0, bottom = m - 1, left = 0, right = n - 1;
while (top <= bottom && left <= right) {
    // walk right, down, left, up
    top++; bottom--; left++; right--;
}`,
    mistakes: [
      "Walking a side after the boundary already collapsed, duplicating cells",
      "Rotating by creating a second matrix when the question wants layers of 4-cycles",
      "Mixing this with island DFS. Islands are a graph, not a spiral.",
    ],
    problems: problems("matrix", [
      ["Spiral Matrix", "Medium", "Four directions, shrink bounds."],
      ["Rotate Image", "Medium", "Transpose, then reverse each row. Or cycle four cells."],
      ["Set Matrix Zeroes", "Medium", "First row and column as markers. Watch the corner cell."],
    ]),
  },
  {
    id: "fast-slow",
    name: "Fast / slow pointers",
    phase: "Rebuild",
    recognize: [
      "Linked list, find the middle, a cycle, or the cycle start",
      "You cannot index the list",
      "One pointer moving twice as fast meets the other",
    ],
    intuition:
      "In a cycle the fast pointer gains one step per loop and must land on the slow pointer. The meeting point is not always the start; reset one pointer to head to find the start.",
    template: `ListNode slow = head;
ListNode fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}`,
    mistakes: [
      "Null-checking only fast, then reading fast.next.next",
      "Returning the meeting node as the cycle entrance",
      "Using an extra HashSet when the question is teaching Floyd",
    ],
    problems: problems("fast-slow", [
      ["Middle of the Linked List", "Easy", "When fast finishes, slow is the middle."],
      ["Linked List Cycle", "Easy", "Meet means a cycle. No map."],
      ["Linked List Cycle II", "Medium", "After they meet, walk head and slow one step at a time."],
    ]),
  },
  {
    id: "reverse-list",
    name: "Linked list reversal",
    phase: "Rebuild",
    recognize: [
      "Reverse a whole list, k nodes, or the second half",
      "Palindrome list, reorder list",
      "You need previous, current, next",
    ],
    intuition:
      "Three pointers. Point current back to previous before you lose the rest of the list.",
    template: `ListNode prev = null;
ListNode curr = head;
while (curr != null) {
    ListNode next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
}
return prev;`,
    mistakes: [
      "Losing curr.next before saving it",
      "In k-group, reversing a leftover group shorter than k",
      "Checking palindrome by copying into an ArrayList and calling it done. Reverse the second half.",
    ],
    problems: problems("reverse-list", [
      ["Reverse Linked List", "Easy", "Write it until the three lines are automatic."],
      ["Reverse Nodes in k-Group", "Hard", "Count k, reverse that segment, stitch, leave a short tail."],
      ["Palindrome Linked List", "Easy", "Middle, reverse second half, compare, restore if you care."],
    ]),
  },
  {
    id: "stack-queue",
    name: "Stack and queue",
    phase: "Core",
    recognize: [
      "Nested structure, last opened must close first",
      "Next smaller/greater is a different pattern; plain matching is this one",
      "You need undo, a min, or BFS order",
    ],
    intuition:
      "A stack remembers unfinished work in reverse. Parentheses, DFS, and monotonic problems all start from that.",
    template: `Deque<Character> stack = new ArrayDeque<>();
for (char ch : s.toCharArray()) {
    if (isOpen(ch)) stack.push(ch);
    else if (stack.isEmpty() || !matches(stack.pop(), ch)) return false;
}
return stack.isEmpty();`,
    mistakes: [
      "Using Stack instead of ArrayDeque. Stack is synchronized and slower; the idea is the same, the tool is Deque.",
      "Popping an empty stack on a leading close bracket",
      "Min Stack storing only the minimum, not the history of minima",
    ],
    problems: problems("stack-queue", [
      ["Valid Parentheses", "Easy", "Match pairs. Empty at the end."],
      ["Min Stack", "Medium", "Push the value and the running min together."],
      ["Implement Queue using Stacks", "Easy", "Input stack and output stack. Amortized O(1)."],
    ]),
  },
  {
    id: "monotonic-stack",
    name: "Monotonic stack",
    phase: "Core",
    recognize: [
      "Next greater, next smaller, previous greater",
      "Stock span, daily temperatures, histogram, trapping rain",
      "You would otherwise scan left or right for every index",
    ],
    intuition:
      "Keep indexes whose values are still waiting for a greater element, in increasing or decreasing order. When the new value beats the top, that top has found its answer.",
    template: `Deque<Integer> stack = new ArrayDeque<>();
for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
        int j = stack.pop();
        answer[j] = nums[i];
    }
    stack.push(i);
}`,
    mistakes: [
      "Storing values when you needed indexes for distance",
      "Increasing vs decreasing chosen by habit, not by the question",
      "Histogram: forgetting a sentinel 0 so the stack drains",
    ],
    problems: problems("monotonic-stack", [
      ["Daily Temperatures", "Medium", "Next warmer day. Store indexes."],
      ["Next Greater Element I", "Easy", "Same loop, then a map from value to answer."],
      ["Largest Rectangle in Histogram", "Hard", "Next and previous smaller. Width is between them."],
    ]),
  },
  {
    id: "intervals",
    name: "Intervals",
    phase: "Core",
    recognize: [
      "Meetings, ranges, merge, insert, how many overlap",
      "Sorting by start or by end changes the question",
      "A new interval may swallow several old ones",
    ],
    intuition:
      "Sort. Then one pass: if the current start is after the previous end, they are disjoint. Otherwise extend the end.",
    template: `Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
List<int[]> merged = new ArrayList<>();
for (int[] interval : intervals) {
    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
        merged.add(interval);
    } else {
        merged.get(merged.size() - 1)[1] =
            Math.max(merged.get(merged.size() - 1)[1], interval[1]);
    }
}`,
    mistakes: [
      "Sorting by end for merge, and by start for 'remove minimum to avoid overlap' — they are different",
      "Using < when the problem treats touching endpoints as overlap",
      "Inserting without considering the new interval sitting in a gap",
    ],
    problems: problems("intervals", [
      ["Merge Intervals", "Medium", "Sort by start, extend the last end."],
      ["Insert Interval", "Medium", "Three parts: before, overlapping, after."],
      ["Non-overlapping Intervals", "Medium", "Sort by end. Keep the interval that finishes first."],
    ]),
  },
  {
    id: "greedy",
    name: "Greedy",
    phase: "Core",
    recognize: [
      "A local choice never needs to be undone",
      "Jump as far as you can, schedule the earliest finish, give the smallest cookie that works",
      "You can prove the choice with an exchange argument, even informally",
    ],
    intuition:
      "Sort by the thing that matters, then take the best available choice. If you cannot explain why a later choice cannot beat it, it is not greedy — it is DP.",
    template: `// Jump Game II: track the farthest reach of this jump window
int jumps = 0, end = 0, far = 0;
for (int i = 0; i < nums.length - 1; i++) {
    far = Math.max(far, i + nums[i]);
    if (i == end) { jumps++; end = far; }
}`,
    mistakes: [
      "Greedy on a problem that needs you to try both choices. Coin change with weird denominations is DP.",
      "Sorting the wrong key",
      "Jump Game I (can reach) and II (minimum jumps) solved with the same code",
    ],
    problems: problems("greedy", [
      ["Jump Game", "Medium", "Track the farthest index you can reach."],
      ["Jump Game II", "Medium", "Count windows of jumps, not every step."],
      ["Gas Station", "Medium", "If total gas >= total cost, the unique start is where the tank bottomed out."],
    ]),
  },
  {
    id: "bit-xor",
    name: "Bit and XOR",
    phase: "Core",
    recognize: [
      "Every element appears twice except one, or twice except two",
      "Find the missing number without extra memory",
      "The problem mentions bits, parity, or 'constant space'",
    ],
    intuition:
      "XOR cancels pairs: a ^ a = 0 and a ^ 0 = a. For two singles, the lowest set bit of the XOR splits them into two groups.",
    template: `int xor = 0;
for (int value : nums) xor ^= value;
return xor;`,
    mistakes: [
      "Using XOR for counts of three. Single Number II needs bit counts mod 3.",
      "Forgetting 0 ^ x = x and dropping the missing number range",
      "Writing a HashSet solution and moving on. Do the bit version once.",
    ],
    problems: problems("bit-xor", [
      ["Single Number", "Easy", "XOR the array."],
      ["Single Number II", "Medium", "Count each bit mod 3."],
      ["Missing Number", "Easy", "XOR indexes and values, or the gauss formula."],
    ]),
  },
  {
    id: "backtracking",
    name: "Backtracking",
    phase: "Core",
    recognize: [
      "Generate all combinations, permutations, partitions, or placements",
      "You choose, explore, and undo",
      "Constraints prune the tree: queens attack, cells already used, remaining sum",
    ],
    intuition:
      "The state is the partial decision. Recurse with that decision applied, then revert it so the next sibling sees a clean board.",
    template: `void dfs(int start, int remain, List<Integer> path) {
    if (remain == 0) { answer.add(new ArrayList<>(path)); return; }
    for (int i = start; i < candidates.length; i++) {
        if (candidates[i] > remain) break;
        path.add(candidates[i]);
        dfs(i, remain - candidates[i], path);
        path.remove(path.size() - 1);
    }
}`,
    mistakes: [
      "Adding the path without copying it. The list is mutated later.",
      "Forgetting to undo a board cell",
      "Starting the next loop at 0 and generating permutations when you wanted combinations",
    ],
    problems: problems("backtracking", [
      ["Combination Sum", "Medium", "Reuse the same index if the number can repeat. Copy the path."],
      ["Permutations", "Medium", "Used array, or swap in place and swap back."],
      ["N-Queens", "Hard", "Column, diagonal, anti-diagonal sets. One queen per row."],
    ]),
  },
  {
    id: "tree-dfs",
    name: "Tree DFS",
    phase: "Core",
    recognize: [
      "Answer depends on both subtrees: height, diameter, path through a node",
      "You can return a value from the child and decide at the parent",
      "LCA, path sum, balanced tree",
    ],
    intuition:
      "A node asks its children for a small summary, then combines them. Global answers like diameter are updated as a side effect of that summary.",
    template: `int dfs(TreeNode node) {
    if (node == null) return 0;
    int left = dfs(node.left);
    int right = dfs(node.right);
    best = Math.max(best, left + right);
    return 1 + Math.max(left, right);
}`,
    mistakes: [
      "Returning the diameter from dfs and also using that return as height",
      "Path sum counting paths that must start at the root when any node can start",
      "Null pointer on node.left without a base case",
    ],
    problems: problems("tree-dfs", [
      ["Diameter of Binary Tree", "Easy", "Height returned, diameter stored outside."],
      ["Path Sum III", "Medium", "Prefix sums on the path down, backtrack the map."],
      ["Lowest Common Ancestor of a Binary Tree", "Medium", "If both sides return a node, this node is the LCA."],
    ]),
  },
  {
    id: "tree-bfs",
    name: "Tree BFS",
    phase: "Core",
    recognize: [
      "Level order, right view, width, minimum depth",
      "The answer is 'the first time I see a level'",
      "You need every node at distance d before distance d+1",
    ],
    intuition:
      "Queue plus the size of the current level. Process exactly that many nodes, then the queue holds the next level.",
    template: `Queue<TreeNode> queue = new ArrayDeque<>();
queue.add(root);
while (!queue.isEmpty()) {
    int size = queue.size();
    for (int i = 0; i < size; i++) {
        TreeNode node = queue.remove();
        if (node.left != null) queue.add(node.left);
        if (node.right != null) queue.add(node.right);
    }
}`,
    mistakes: [
      "Forgetting to snapshot queue.size() and then looping while the queue grows",
      "Right view by DFS right-first is fine, but know the BFS version too",
      "Maximum width: index nodes as heap indexes, watch overflow with long",
    ],
    problems: problems("tree-bfs", [
      ["Binary Tree Level Order Traversal", "Medium", "The size snapshot is the whole trick."],
      ["Binary Tree Right Side View", "Medium", "Last node of each level."],
      ["Maximum Width of Binary Tree", "Medium", "Store index with the node. Width is right - left + 1."],
    ]),
  },
  {
    id: "bst",
    name: "BST inorder property",
    phase: "Core",
    recognize: [
      "The tree is a BST, not a general binary tree",
      "Kth smallest, validate, successor, two sum",
      "Inorder is sorted",
    ],
    intuition:
      "Inorder walks values in sorted order. Most BST questions are 'do something on a sorted array' while you walk.",
    template: `void inorder(TreeNode node) {
    if (node == null) return;
    inorder(node.left);
    // node.val is the next sorted value
    inorder(node.right);
}`,
    mistakes: [
      "Running a general-tree LCA when the BST lets you compare with the target and drop a side",
      "Validating only against the parent, not against the whole ancestor range",
      "Collecting the entire inorder list when a counter would do",
    ],
    problems: problems("bst", [
      ["Validate Binary Search Tree", "Medium", "Pass a low and high bound, not just the parent."],
      ["Kth Smallest Element in a BST", "Medium", "Inorder count. Stop at k."],
      ["Lowest Common Ancestor of a BST", "Medium", "Split: one target on each side. Else go left or right."],
    ]),
  },
  {
    id: "heap",
    name: "Heap / priority queue",
    phase: "Core",
    recognize: [
      "Kth largest, top K, merge K sorted, running median",
      "You repeatedly need the current min or max",
      "Sorting fully is wasted work",
    ],
    intuition:
      "A heap of size K keeps only the candidates that can still win. Java's PriorityQueue is a min-heap; for max-heap pass a reverse comparator.",
    template: `PriorityQueue<Integer> heap = new PriorityQueue<>();
for (int value : nums) {
    heap.offer(value);
    if (heap.size() > k) heap.poll();
}
return heap.peek();`,
    mistakes: [
      "Default PriorityQueue treated as a max-heap",
      "Kth largest built with a heap of size n. Size K is the point.",
      "Median stream: the two heaps must stay balanced, and the max-heap holds the smaller half",
    ],
    problems: problems("heap", [
      ["Kth Largest Element in an Array", "Medium", "Min-heap of size k. Also know QuickSelect exists."],
      ["Top K Frequent Elements", "Medium", "Frequency map, then a heap of size k. Bucket sort is the follow-up."],
      ["Find Median from Data Stream", "Hard", "Max-heap left, min-heap right."],
    ]),
  },
  {
    id: "graph-traversal",
    name: "Graph BFS / DFS",
    phase: "Graphs",
    recognize: [
      "Grid of land and water, rooms, or connected components",
      "Shortest path in an unweighted graph",
      "Visit each node or cell once",
    ],
    intuition:
      "DFS explores a component. BFS explores by distance. Mark visited when you enqueue or enter, not when you leave, or you will process the same cell many times.",
    template: `void dfs(int r, int c) {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
}`,
    mistakes: [
      "Marking visited on exit, so the queue fills with duplicates",
      "Using DFS for shortest path in an unweighted grid",
      "Forgetting the 4-direction vs 8-direction the problem asked for",
    ],
    problems: problems("graph-traversal", [
      ["Number of Islands", "Medium", "Each DFS sinks one island."],
      ["Rotting Oranges", "Medium", "Multi-source BFS. Minute equals a layer."],
      ["Clone Graph", "Medium", "Map from original node to the copy. DFS or BFS."],
    ]),
  },
  {
    id: "cycle-bipartite",
    name: "Cycle and bipartite",
    phase: "Graphs",
    recognize: [
      "Detect a loop in directed or undirected graph",
      "Can you 2-color the nodes",
      "Prerequisites that might be circular",
    ],
    intuition:
      "Directed: three colors, visiting and visited. A back edge into visiting is a cycle. Undirected: a visited neighbor that is not the parent is a cycle. Bipartite: BFS colors, and a neighbor with your color breaks it.",
    template: `// 0 unseen, 1 visiting, 2 done
boolean dfs(int node) {
    state[node] = 1;
    for (int next : graph[node]) {
        if (state[next] == 1) return true;
        if (state[next] == 0 && dfs(next)) return true;
    }
    state[node] = 2;
    return false;
}`,
    mistakes: [
      "Using the undirected parent rule on a directed graph",
      "Two colors stored as visited boolean, so you cannot tell a back edge from a cross edge",
      "Building the adjacency list in the wrong direction for prerequisites",
    ],
    problems: problems("cycle-bipartite", [
      ["Course Schedule", "Medium", "Directed cycle. If there is a cycle, you cannot finish."],
      ["Is Graph Bipartite", "Medium", "Odd cycle means not bipartite. Color with BFS."],
      ["Redundant Connection", "Medium", "Undirected cycle. DSU fits this one even better."],
    ]),
  },
  {
    id: "topo",
    name: "Topological sort",
    phase: "Graphs",
    recognize: [
      "Ordering with prerequisites",
      "Alien dictionary, build order, course schedule II",
      "Directed acyclic graph",
    ],
    intuition:
      "Kahn: repeatedly take nodes with indegree 0. If you cannot take every node, there was a cycle. DFS postorder reversed is the other version.",
    template: `Queue<Integer> queue = new ArrayDeque<>();
for (int i = 0; i < n; i++) if (indegree[i] == 0) queue.add(i);
List<Integer> order = new ArrayList<>();
while (!queue.isEmpty()) {
    int node = queue.remove();
    order.add(node);
    for (int next : graph[node]) {
        if (--indegree[next] == 0) queue.add(next);
    }
}`,
    mistakes: [
      "Edge direction reversed, so indegree means the wrong thing",
      "Returning a partial order when a cycle left nodes behind",
      "Alien dictionary: comparing whole words instead of the first differing character",
    ],
    problems: problems("topo", [
      ["Course Schedule II", "Medium", "Kahn's algorithm. Return any valid order."],
      ["Course Schedule", "Medium", "Same graph. Here you only return whether the order is complete."],
      ["Alien Dictionary", "Hard", "Premium on LeetCode. Build edges from adjacent words, then topo. If you lack premium, redo Course Schedule II from a blank file."],
    ]),
  },
  {
    id: "shortest-path",
    name: "Shortest path",
    phase: "Graphs",
    recognize: [
      "Unweighted: BFS. Non-negative weights: Dijkstra. Negative edges: Bellman-Ford. All pairs: Floyd-Warshall",
      "A grid with cost, a network delay, flights with at most K stops",
    ],
    intuition:
      "Do not Dijkstra an unweighted maze. The algorithm follows the constraint. Dijkstra's heap pops the next closest settled node.",
    template: `PriorityQueue<int[]> heap = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
int[] dist = new int[n];
Arrays.fill(dist, Integer.MAX_VALUE);
dist[src] = 0;
heap.offer(new int[] {0, src});
while (!heap.isEmpty()) {
    int[] cur = heap.poll();
    if (cur[0] != dist[cur[1]]) continue;
    // relax edges
}`,
    mistakes: [
      "Missing the stale-heap check, so you relax outdated distances",
      "Bellman-Ford run |V| times and forgetting the extra pass only detects a negative cycle",
      "Floyd-Warshall k loop outside i, j. The order is k, then i, then j.",
    ],
    problems: problems("shortest-path", [
      ["Shortest Path in Binary Matrix", "Medium", "Unweighted. BFS, 8 directions."],
      ["Network Delay Time", "Medium", "Dijkstra. Answer is the max distance if every node is reached."],
      ["Cheapest Flights Within K Stops", "Medium", "Bellman-Ford limited to K+1 edges, or Dijkstra state (node, stops)."],
    ]),
  },
  {
    id: "dsu",
    name: "Disjoint set union",
    phase: "Graphs",
    recognize: [
      "Merge groups, connectivity, 'are these two in the same component' online",
      "Accounts merge, number of provinces, redundant edge",
      "You do not need the actual path, only the group",
    ],
    intuition:
      "Parent array plus rank or size. Find compresses the path. Union attaches the smaller tree under the larger.",
    template: `int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
}
boolean union(int a, int b) {
    int pa = find(a), pb = find(b);
    if (pa == pb) return false;
    parent[pb] = pa;
    return true;
}`,
    mistakes: [
      "Forgetting path compression and then timing out",
      "Union by comparing raw indexes instead of roots",
      "Accounts merge: union emails, then forget to map the root email back to a name",
    ],
    problems: problems("dsu", [
      ["Number of Provinces", "Medium", "Each successful union reduces the component count."],
      ["Redundant Connection", "Medium", "The edge that connects two nodes already in the same set."],
      ["Accounts Merge", "Medium", "Union emails that share an account. Group by root."],
    ]),
  },
  {
    id: "mst",
    name: "Minimum spanning tree",
    phase: "Graphs",
    recognize: [
      "Connect all points at minimum cost",
      "No cycles in the chosen edges, and every node ends up connected",
      "Kruskal sorts edges. Prim grows a frontier.",
    ],
    intuition:
      "Kruskal is 'sort edges, add if DSU says the endpoints are still disconnected'. Stop after n-1 edges.",
    template: `Arrays.sort(edges, Comparator.comparingInt(e -> e[2]));
int cost = 0, used = 0;
for (int[] edge : edges) {
    if (union(edge[0], edge[1])) {
        cost += edge[2];
        if (++used == n - 1) break;
    }
}`,
    mistakes: [
      "Adding an edge inside a component and calling it a tree",
      "Prim's decrease-key faked badly and visiting a node twice without a visited set",
      "Confusing MST with shortest path. Dijkstra does not build an MST in general.",
    ],
    problems: problems("mst", [
      ["Min Cost to Connect All Points", "Medium", "Manhattan distance edges. Kruskal or Prim."],
      ["Connecting Cities With Minimum Cost", "Medium", "Premium. If locked, re-implement Kruskal on a handwritten edge list until the DSU check is boring."],
      ["Optimize Water Distribution", "Hard", "Add a virtual well node. Still Kruskal."],
    ]),
  },
  {
    id: "dp-1d",
    name: "1D DP",
    phase: "DP",
    recognize: [
      "Climb stairs, rob houses, frog jumps, decode ways",
      "The answer at i depends on a fixed small set of earlier answers",
      "Recursion with the same arguments repeats",
    ],
    intuition:
      "Write the recurrence in words first. dp[i] is the answer for the prefix ending at i. Then see if you only need the last two values.",
    template: `int prev2 = 1; // ways to stand before the first step
int prev1 = 1;
for (int i = 2; i <= n; i++) {
    int cur = prev1 + prev2;
    prev2 = prev1;
    prev1 = cur;
}`,
    mistakes: [
      "Coding a 2D table for a recurrence that is one array",
      "House Robber including both neighbors",
      "Jumping to memo code before you can say the state in one sentence",
    ],
    problems: problems("dp-1d", [
      ["Climbing Stairs", "Easy", "Fibonacci. Say why dp[i] = dp[i-1] + dp[i-2]."],
      ["House Robber", "Medium", "Rob this house plus dp[i-2], or skip and take dp[i-1]."],
      ["House Robber II", "Medium", "Houses form a circle. Run the linear solution twice, without first or without last."],
    ]),
  },
  {
    id: "grid-dp",
    name: "Grid DP",
    phase: "DP",
    recognize: [
      "Paths across a grid, minimum path sum, falling paths, triangle",
      "You only move right/down, or to adjacent cells in the next row",
      "Overlapping subproblems on cells",
    ],
    intuition:
      "dp[r][c] comes from the cells that can move into it. Fill in an order that already knows those cells.",
    template: `for (int r = 0; r < m; r++) {
    for (int c = 0; c < n; c++) {
        if (r == 0 && c == 0) continue;
        int fromTop = r > 0 ? dp[r - 1][c] : Integer.MAX_VALUE;
        int fromLeft = c > 0 ? dp[r][c - 1] : Integer.MAX_VALUE;
        dp[r][c] = grid[r][c] + Math.min(fromTop, fromLeft);
    }
}`,
    mistakes: [
      "Integer overflow when seeding unreachable cells with Integer.MAX_VALUE and then adding",
      "Walking the grid with DFS and no memo, then wondering why it TLEs",
      "Unique Paths obstacles: a blocked cell is 0 ways, and it must not add into neighbors",
    ],
    problems: problems("grid-dp", [
      ["Unique Paths", "Medium", "Combinatorics works too. Still write the DP once."],
      ["Minimum Path Sum", "Medium", "Add the cell to the min of top and left."],
      ["Triangle", "Medium", "Bottom-up from the last row saves you the boundary pain."],
    ]),
  },
  {
    id: "knapsack",
    name: "Knapsack / subset DP",
    phase: "DP",
    recognize: [
      "Pick or skip each item once",
      "Subset sum, partition, coin change, target sum",
      "Capacity is the second dimension",
    ],
    intuition:
      "0/1: iterate capacity downward so each item is used once. Unbounded coins: iterate capacity upward so the same coin can be reused.",
    template: `boolean[] can = new boolean[target + 1];
can[0] = true;
for (int num : nums) {
    for (int sum = target; sum >= num; sum--) {
        can[sum] = can[sum] || can[sum - num];
    }
}`,
    mistakes: [
      "Looping capacity upward on a 0/1 problem and using an item twice",
      "Coin Change I (fewest coins) confused with Coin Change II (number of combinations)",
      "Partition: forgetting the total must be even, and the target is total/2",
    ],
    problems: problems("knapsack", [
      ["Partition Equal Subset Sum", "Medium", "0/1 subset sum to total/2."],
      ["Coin Change", "Medium", "Unbounded. Minimum count. Seed with a large number, not the combination count."],
      ["Target Sum", "Medium", "Same as count of subsets with a derived sum."],
    ]),
  },
  {
    id: "stock-dp",
    name: "Stock DP",
    phase: "DP",
    recognize: [
      "Buy and sell with a limit on transactions, a cooldown, or a fee",
      "State is day plus whether you hold a share, plus transactions left",
    ],
    intuition:
      "At each day you hold or you do not. Transitions are buy, sell, rest. Fees and cooldowns only change one transition.",
    template: `int hold = -prices[0];
int cash = 0;
for (int i = 1; i < prices.length; i++) {
    hold = Math.max(hold, cash - prices[i]);
    cash = Math.max(cash, hold + prices[i]);
}`,
    mistakes: [
      "One variable trying to remember a cooldown. Cooldown needs a third state.",
      "At most K transactions exploding into a new formula instead of a loop over k",
      "Selling and buying on the same day when the problem forbids it",
    ],
    problems: problems("stock-dp", [
      ["Best Time to Buy and Sell Stock", "Easy", "Min price so far, max profit. This is the one-transaction base."],
      ["Best Time to Buy and Sell Stock II", "Medium", "Unlimited trades. Add every upward difference, or the hold/cash pair."],
      ["Best Time to Buy and Sell Stock with Cooldown", "Medium", "Sold state cannot buy the next day."],
    ]),
  },
  {
    id: "lis",
    name: "LIS pattern",
    phase: "DP",
    recognize: [
      "Longest increasing subsequence, not subarray",
      "Russian dolls, divisible subset, maximum height stack of boxes",
      "Patience sorting / binary search on tails for O(n log n)",
    ],
    intuition:
      "O(n^2): dp[i] is the best chain ending at i. O(n log n): tails[len] is the smallest tail of an increasing subsequence of that length.",
    template: `int[] tails = new int[n];
int len = 0;
for (int value : nums) {
    int i = Arrays.binarySearch(tails, 0, len, value);
    if (i < 0) i = -(i + 1);
    tails[i] = value;
    if (i == len) len++;
}`,
    mistakes: [
      "Sorting when the order of the original array matters. LIS is not 'sort then count'.",
      "binarySearch insertion point handled wrong on negative results",
      "Divisible subset: sort first, then it becomes LIS with a divisibility check",
    ],
    problems: problems("lis", [
      ["Longest Increasing Subsequence", "Medium", "Write O(n^2) first. Then the tails array."],
      ["Largest Divisible Subset", "Medium", "Sort, then predecessor links so you can rebuild the subset."],
      ["Number of Longest Increasing Subsequence", "Medium", "Store length and count ending at i."],
    ]),
  },
  {
    id: "lcs",
    name: "LCS pattern",
    phase: "DP",
    recognize: [
      "Two strings, subsequence or substring in common",
      "Delete both to equal, shortest common supersequence, distinct subsequences",
      "A grid of i versus j",
    ],
    intuition:
      "If the characters match, take the diagonal plus one. If not, take the better of skipping i or skipping j.",
    template: `int[][] dp = new int[m + 1][n + 1];
for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        if (a.charAt(i - 1) == b.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;
        else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
}`,
    mistakes: [
      "Subsequence vs substring. Substring cannot skip in the middle; the streak resets.",
      "Indexing dp[i][j] against charAt(i) instead of charAt(i - 1)",
      "Shortest common supersequence is m + n - LCS, but rebuilding the string needs the table",
    ],
    problems: problems("lcs", [
      ["Longest Common Subsequence", "Medium", "The table above. Rebuild one string on paper."],
      ["Delete Operation for Two Strings", "Medium", "m + n - 2 * LCS."],
      ["Shortest Common Supersequence", "Hard", "Walk the LCS table and append the characters you skipped."],
    ]),
  },
  {
    id: "string-dp",
    name: "String DP",
    phase: "DP",
    recognize: [
      "Edit distance, palindrome cuts, wildcard, regex, distinct subsequences",
      "Two indexes, or a substring i..j",
    ],
    intuition:
      "Edit distance is insert, delete, replace. A match or replace comes from the diagonal. Insert and delete come from the neighbors.",
    template: `if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
    dp[i][j] = dp[i - 1][j - 1];
} else {
    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
}`,
    mistakes: [
      "Wildcard star consuming the wrong row. Draw a 4-character example before coding.",
      "Palindrome subsequence confused with palindrome substring",
      "Base row and column left as 0, so turning an empty string into 'abc' costs nothing",
    ],
    problems: problems("string-dp", [
      ["Longest Palindromic Subsequence", "Medium", "LCS of the string with its reverse."],
      ["Edit Distance", "Medium", "The three operations. Base cases are the gaps."],
      ["Distinct Subsequences", "Hard", "Count ways. Match uses diagonal plus the skip."],
    ]),
  },
  {
    id: "mcm",
    name: "MCM / partition DP",
    phase: "DP",
    recognize: [
      "Burst balloons, matrix chain, palindrome partitioning cost",
      "You split an array at every k between i and j and combine the two sides",
      "The interval length grows from small to large",
    ],
    intuition:
      "dp[i][j] is the best way to solve the slice i..j. Try every split. Fill short slices before long ones.",
    template: `for (int len = 2; len <= n; len++) {
    for (int i = 0; i + len - 1 < n; i++) {
        int j = i + len - 1;
        for (int k = i; k < j; k++) {
            dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + cost(i, k, j));
        }
    }
}`,
    mistakes: [
      "Filling the table by row before shorter lengths exist",
      "Burst balloons: forgetting the padded 1s on both ends, so the last balloon has no neighbors",
      "Trying to master five MCM problems. One blank rewrite of Burst Balloons is the goal.",
    ],
    problems: problems("mcm", [
      ["Burst Balloons", "Hard", "The one to blank-rewrite. Coins on the ends are 1."],
      ["Palindrome Partitioning II", "Hard", "Minimum cuts. Precompute which slices are palindromes."],
      ["Matrix Chain Multiplication", "Hard", "Not a LeetCode staple. If time is gone, skip and keep Burst Balloons sharp."],
    ]),
  },
  {
    id: "trie",
    name: "Trie",
    phase: "Strings",
    recognize: [
      "Many prefix queries",
      "Word search on a board with a dictionary",
      "XOR maximize: a binary trie of bits",
    ],
    intuition:
      "Each edge is a character. A word is a path. Sharing prefixes is the memory win. XOR trie walks the opposite bit when it exists.",
    template: `class Node {
    Node[] next = new Node[26];
    boolean word;
}
void insert(String word) {
    Node cur = root;
    for (char ch : word.toCharArray()) {
        int i = ch - 'a';
        if (cur.next[i] == null) cur.next[i] = new Node();
        cur = cur.next[i];
    }
    cur.word = true;
}`,
    mistakes: [
      "HashSet of every prefix when a trie was the point. A set is fine for one problem; still build the node version.",
      "Word Search II without pruning the trie, so you rescan dead branches",
      "Binary trie using characters instead of bits 0 and 1 from the high end",
    ],
    problems: problems("trie", [
      ["Implement Trie", "Medium", "Insert, search, startsWith."],
      ["Word Search II", "Hard", "Trie plus board DFS. Remove a word after you find it."],
      ["Maximum XOR of Two Numbers", "Medium", "Binary trie. Prefer the opposite bit from bit 31 downward."],
    ]),
  },
  {
    id: "string-algo",
    name: "KMP, Z, Rabin-Karp",
    phase: "Strings",
    recognize: [
      "Find a pattern in a text faster than checking every shift",
      "Longest prefix that is also a suffix",
      "Repeated string match, shortest palindrome",
    ],
    intuition:
      "LPS says how far to jump after a mismatch, because that prefix is already known to match. You never restart the text index.",
    template: `int[] lps(String pattern) {
    int[] pi = new int[pattern.length()];
    int len = 0;
    for (int i = 1; i < pattern.length();) {
        if (pattern.charAt(i) == pattern.charAt(len)) pi[i++] = ++len;
        else if (len > 0) len = pi[len - 1];
        else pi[i++] = 0;
    }
    return pi;
}`,
    mistakes: [
      "Incrementing i on a mismatch when len > 0, which skips a character",
      "Learning Z, KMP, and Rabin-Karp as three lifestyles. LPS plus one use is enough for interviews.",
      "Rabin-Karp without a double hash or a verify step, so a collision becomes a wrong match",
    ],
    problems: problems("string-algo", [
      ["Find the Index of the First Occurrence", "Easy", "Write KMP, not indexOf. The LPS array is the skill."],
      ["Shortest Palindrome", "Hard", "KMP on s + '#' + reverse(s). The last LPS value is the palindromic prefix."],
      ["Repeated String Match", "Medium", "Rabin-Karp or KMP. You need at most len(b)/len(a) + 2 copies."],
    ]),
  },
  {
    id: "sieve",
    name: "Sieve and factors",
    phase: "Strings",
    recognize: [
      "Many primality checks, not one",
      "Count primes under n, smallest prime factor, factorization of every number in a range",
    ],
    intuition:
      "Cross off multiples. Start marking from p*p, step by p. Smallest prime factor lets you factor in log time afterwards.",
    template: `boolean[] composite = new boolean[n];
for (int p = 2; p * p < n; p++) {
    if (composite[p]) continue;
    for (int m = p * p; m < n; m += p) composite[m] = true;
}`,
    mistakes: [
      "Trial dividing every number up to n when one sieve would do",
      "p * p overflowing int. Cast to long.",
      "Spending a week on math. Two problems, then back to DP or the project.",
    ],
    problems: problems("sieve", [
      ["Count Primes", "Medium", "Sieve of Eratosthenes."],
      ["Smallest Prime Factor practice", "Easy", "Not one famous prompt. Build spf[1..n] and factor 12 numbers by hand with it."],
      ["Factorial Trailing Zeroes", "Medium", "Count factors of 5. This is the math question that actually shows up."],
    ]),
  },
];

export const patternById = new Map(patterns.map((pattern) => [pattern.id, pattern]));

export const allProblems = patterns.flatMap((pattern) =>
  pattern.problems.map((problem) => ({ ...problem, pattern })),
);

export const problemById = new Map(allProblems.map((problem) => [problem.id, problem]));

const leetcodeSlug: Record<string, string | null> = {
  "Two Sum II": "two-sum-ii-input-array-is-sorted",
  "Find First and Last Position": "find-first-and-last-position-of-element-in-sorted-array",
  "Capacity To Ship Packages Within D Days": "capacity-to-ship-packages-within-d-days",
  "Lowest Common Ancestor of a BST": "lowest-common-ancestor-of-a-binary-search-tree",
  "Implement Trie": "implement-trie-prefix-tree",
  "Maximum XOR of Two Numbers": "maximum-xor-of-two-numbers-in-an-array",
  "Find the Index of the First Occurrence": "find-the-index-of-the-first-occurrence-in-a-string",
  "Optimize Water Distribution": "optimize-water-distribution-in-a-village",
  "Smallest Prime Factor practice": null,
  "Matrix Chain Multiplication": null,
};

export function problemUrl(name: string) {
  if (Object.prototype.hasOwnProperty.call(leetcodeSlug, name)) {
    const slug = leetcodeSlug[name];
    return slug ? `https://leetcode.com/problems/${slug}/` : null;
  }
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `https://leetcode.com/problems/${slug}/`;
}

export const drills: { prompt: string; patternId: string; why: string }[] = [
  {
    prompt: "Sorted array. Find two indexes that add up to a target.",
    patternId: "two-pointers",
    why: "Sorted means one side can be discarded.",
  },
  {
    prompt: "Unsorted array. Count subarrays whose sum is K.",
    patternId: "prefix-hash",
    why: "Range sum becomes a prefix difference you have seen.",
  },
  {
    prompt: "Longest substring with at most K distinct characters.",
    patternId: "sliding-window",
    why: "Contiguous, and shrinking the left repairs the condition.",
  },
  {
    prompt: "Minimum eating speed so the hours fit in H.",
    patternId: "binary-search-answer",
    why: "If a speed works, every faster speed works.",
  },
  {
    prompt: "Next warmer day for each temperature.",
    patternId: "monotonic-stack",
    why: "Next greater to the right, answered when a bigger value arrives.",
  },
  {
    prompt: "Detect if a directed prerequisite graph has a loop.",
    patternId: "cycle-bipartite",
    why: "Three colors. An edge into a visiting node is a back edge.",
  },
  {
    prompt: "Return any valid course order, or say it is impossible.",
    patternId: "topo",
    why: "Indegree zero nodes are the ones you can take now.",
  },
  {
    prompt: "Kth largest in a stream of numbers.",
    patternId: "heap",
    why: "A heap of size K, not a full sort.",
  },
  {
    prompt: "Rob houses in a line. Cannot rob neighbors.",
    patternId: "dp-1d",
    why: "Take or skip, and the skip depends on the previous house only.",
  },
  {
    prompt: "Can you partition the array into two equal-sum subsets?",
    patternId: "knapsack",
    why: "0/1 subset sum. Loop the capacity downward.",
  },
  {
    prompt: "Minimum edits to turn one word into another.",
    patternId: "string-dp",
    why: "Insert, delete, replace on a pair of prefixes.",
  },
  {
    prompt: "Merge overlapping meeting times.",
    patternId: "intervals",
    why: "Sort by start, then extend the last end.",
  },
  {
    prompt: "Connect every point with minimum total Manhattan cost.",
    patternId: "mst",
    why: "A tree on all nodes. Kruskal plus DSU.",
  },
  {
    prompt: "Shortest path in a maze of open cells, each step costs 1.",
    patternId: "shortest-path",
    why: "Unweighted means BFS, not Dijkstra.",
  },
  {
    prompt: "Find a pattern inside a long text without restarting every time.",
    patternId: "string-algo",
    why: "LPS tells you the longest prefix you can keep after a mismatch.",
  },
  {
    prompt: "Maximum XOR of any two numbers in an array.",
    patternId: "trie",
    why: "Binary trie, walk the opposite bit from the top.",
  },
];
