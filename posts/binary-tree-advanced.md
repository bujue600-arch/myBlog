# 二叉树（2）：进阶

# [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)：

## 简单递归：

```JavaScript
var maxDepth = function(root) {
    if(!root) {
        return 0;
    } else {
        const left = maxDepth(root.left);
        const right = maxDepth(root.right);
        return Math.max(left, right) + 1;
    }
};
```

## 层序模板：

```JavaScript
var maxDepth = function (root) {
    let res = 0
    if (!root) return res
    const queue = [root]

    while (queue.length) {
        res++
        let size = queue.length

        for (let i = 0; i < size; i++) {
            let node = queue.shift()
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
    }
    return res
};
```

# [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)：

## 简单递归：

```JavaScript
var isValidBST = function (root, left = -Infinity, right = Infinity) {
    if (!root) return true

    return root.val > left
        && root.val < right
        && isValidBST(root.left, left, root.val)
        && isValidBST(root.right, root.val, right)
};
```

## 中序 + 验证是否严格递增：

```JavaScript
var isValidBST = function (root) {
    if (!root) return false
    const res = []

    const inorder = (root) => {
        if (!root) return

        inorder(root.left)
        res.push(root.val)
        inorder(root.right)
    }

    inorder(root)

    for (let i = 0; i < res.length; i++) {
        if (res[i] >= res[i + 1]) return false
    }
    return true
};
```

# [112. 路径总和](https://leetcode.cn/problems/path-sum/)：

这题没想到比较好的四大搜索做法，欢迎补充

```JavaScript
var hasPathSum = function (root, targetSum) {
    if (!root) return false
    if (root && !root.left && !root.right) return targetSum === root.val

    return hasPathSum(root.left, targetSum - root.val)
        || hasPathSum(root.right, targetSum - root.val)
};
```

# [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)：

这题没想到比较好的四大搜索做法，欢迎补充

```JavaScript
var sortedArrayToBST = function (nums) {
    if(!nums.length) return
    let mid = Math.floor(nums.length / 2)
    let arr1 = nums.slice(0, mid)
    let arr2 = nums.slice(mid + 1, nums.length)

    return node = new TreeNode(nums[mid], sortedArrayToBST(arr1), sortedArrayToBST(arr2))
};
```

# [662. 二叉树最大宽度](https://leetcode.cn/problems/maximum-width-of-binary-tree/)：

层序遍历 + 编号统计宽度

```JavaScript
var widthOfBinaryTree = function(root) {
  const queue = [[root, 0]];
  let res = 0; // 全局维护最大值
  let left = 0; // 记录当前层最左边节点的计数值
  let right = 0; // 记录当前层最右边节点的计数值
  while (queue.length) {
    left = queue[0][1];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      let [h, pos] = queue.shift();
      right = pos;
      if (h.left) queue.push([h.left, 2 * (pos - left)]); // 重点，优化掉左边不需要计数的部分
      if (h.right) queue.push([h.right, 2 * (pos - left) + 1]);
    }
    res = Math.max(res, right - left + 1);
  }
  return res;
}
```

# [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)：

层序遍历 + 只记录每层最后一个

```JavaScript
var rightSideView = function (root) {
    const res = []
    if (!root) return res
    const queue = [root]

    while (queue.length) {
        let size = queue.length
        res.push(queue[size - 1].val)

        for (let i = 0; i < size; i++) {
            const node = queue.shift()

            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
    }
    return res
};
```
