# 链表

## 模板

1. `const dummy = new ListNode()`
2. 明确 `pre` / `cur`
3. `while`（明确条件）{ 节点操作（移除 / 合并 / 交换）+ 更新 `pre` / `cur` }
4. `return dummy.next`

## [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

```JavaScript
var reverseList = function (head) {
    let pre = null
    let cur = head

    while (cur) {
        let nxt = cur.next
        cur.next = pre
        pre = cur
        cur = nxt
    }
    return pre
};
```

## [203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)

```JavaScript
var removeElements = function (head, val) {
    const dummy = new ListNode(null, head)
    let pre = dummy
    let cur = head

    while (cur) {
        if (cur.val === val) {
            pre.next = cur.next
            cur = pre.next
        } else {
            pre = cur
            cur = cur.next
        }
    }
    return dummy.next
};
```

## [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

```JavaScript
var mergeTwoLists = function (list1, list2) {
    const dummy = new ListNode(null, null)
    let h1 = list1
    let h2 = list2
    let pre = dummy
    let cur

    while (h1 && h2) {
        if (h1.val <= h2.val) {
            cur = h1
            h1 = h1.next
        } else {
            cur = h2
            h2 = h2.next
        }
        pre.next = cur
        pre = cur
    }

    pre.next = h1 ?? h2 // 记住
    return dummy.next
};
```

## [2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)

```JavaScript
var addTwoNumbers = function (l1, l2) {
    const dummy = new ListNode(); // 哨兵节点
    let cur = dummy;
    let carry = 0; // 进位值

    while (l1 || l2 || carry) {
        let sum = carry;
        if (l1) {
            sum += l1.val; // 节点值和进位加在一起
            l1 = l1.next; // 下一个节点
        }
        if (l2) {
            sum += l2.val; // 节点值和进位加在一起
            l2 = l2.next; // 下一个节点
        }
        cur = cur.next = new ListNode(sum % 10); // 每个节点保存一个数位
        carry = Math.floor(sum / 10); // 新的进位
    }
    return dummy.next; // 哨兵节点的下一个节点就是头节点
};
```

## [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)

```JavaScript
var swapPairs = function (head) {
    const dummy = new ListNode(null, head)
    let pre = dummy
    let cur = head

    while (cur && cur.next) {
        let nxt = cur.next
        pre.next = cur.next
        cur.next = nxt.next
        nxt.next = cur

        pre = cur
        cur = cur.next
    }
    return dummy.next
};
```
