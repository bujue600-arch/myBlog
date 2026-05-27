# 二叉树（1）：四大搜索（前中后序递归 + 分层遍历）

# 模板：

## 前中后序递归模板：

```JavaScript
const res = []
const order = (root) => {
    if (!root) return
    // 根左右/左根右/左右根
}
order(root)
return res
```

## 通用的 BFS 分层遍历模板：

这个模板不仅适用于二叉树的层序遍历，稍作修改后也适用于多叉树、图的层级遍历、以及计算最短路径步数等场景。

```JavaScript
function bfsLevelOrderTemplate(root) {
    // 1. 边界条件处理
    if (!root) return [];

    // 2. 初始化队列（也可以是其他数据结构，如双端队列，视语言和性能要求而定）
    const queue = [root];
    const result = []; // 用于存储最终结果，视具体题目而定

    // 3. 开始外层循环，每次循环代表处理完整的一层
    while (queue.length > 0) {
        // 4. 获取当前层节点的数量（这一步是分层的核心）
        const size = queue.length;

        // 用于临时存放当前层数据的容器
        const currentLevelData = [];

        // 5. 内层循环：严格迭代 size 次，只处理当前层的节点
        for (let i = 0; i < size; i++) {
            const node = queue.shift(); // 弹出当前节点

            /* ======================================= */
            /* 在此处执行对当前节点 `node` 的业务逻辑处理 */
            currentLevelData.push(node.val);
            /* ======================================= */

            // 6. 将下一层节点（子节点）加入队列
            // 如果是多叉树，可以遍历 node.children
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        // 7. 收集当前层的结果（根据题目要求决定是否保留）
        result.push(currentLevelData);
    }

    return result;
}
```

# [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)：

```JavaScript
var preorderTraversal = function (root) {
    const res = []
    const preorder = (root) => {
        if (!root) return
        res.push(root.val)
        preorder(root.left)
        preorder(root.right)
    }
    preorder(root)
    return res
};
```

# [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)：

```JavaScript
var inorderTraversal = function (root) {
    const res = []
    const inorder = (root) => {
        if (!root) return
        inorder(root.left)
        res.push(root.val)
        inorder(root.right)
    }
    inorder(root)
    return res
};
```

# [145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)：

```JavaScript
var postorderTraversal = function (root) {
    const res = []
    const postorder = (root) => {
        if (!root) return
        postorder(root.left)
        postorder(root.right)
        res.push(root.val)
    }
    postorder(root)
    return res
};
```

# [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)：

```JavaScript
var levelOrder = function(root) {
    const result = [];
    if (!root) {
        return result;
    }

    // 初始化队列，并将根节点入队
    const queue = [root];

    while (queue.length > 0) {
        // 关键点：记录当前层的节点个数
        const levelSize = queue.length;
        const currentLevel = [];

        // 遍历当前层的所有节点
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // 弹出队头节点
            currentLevel.push(node.val); // 记录节点值

            // 将下一层的子节点放入队列
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        // 将当前层的结果保存到最终结果中
        result.push(currentLevel);
    }

    return result;
};
```
