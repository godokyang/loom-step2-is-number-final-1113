---
loom_kind: requirement
id: d0228762-ba4b-4c28-a592-2734efc929c1
title: 新增 isFiniteNumber 命名导出
work_items:
  - id: wi-1
    title: index.js 新增 isFiniteNumber 命名导出
    deliverable: index.js 新增 module.exports.isFiniteNumber，默认导出不变
    completion: typeof 为 number 且有限返回 true，其余输入返回 false
    effort: 0.6
    depends_on: []
    status: done
    self_check: npm test 实际运行 144 passing（含现有约 130 用例与新增 isFiniteNumber 用例）；index.js 默认导出代码未改动，命名导出仅 typeof==='number' 且 isFinite 时返回 true；README 新增用法小节示例与实际行为一致；无新依赖。
  - id: wi-2
    title: test.js 补充 isFiniteNumber 用例
    deliverable: test.js 新增 describe 块覆盖有限/非有限用例
    completion: npm test 全部通过（含现有约 130 用例）
    effort: 0.6
    depends_on:
      - wi-1
    status: done
    self_check: test.js 新增 describe('isFiniteNumber') 两个用例组：有限 number（0、-0、负数、小数、MAX_VALUE、MIN_VALUE、EPSILON）断言 true；NaN、±Infinity、'3'、''、null、undefined、对象、数组、函数等断言 false（strictEqual）；并含默认导出行为回归用例。npm test 全部通过。
  - id: wi-3
    title: README 增加 isFiniteNumber 用法
    deliverable: README.md 新增用法小节，示例命名导出与默认导出区别
    completion: README 示例与实际行为一致
    effort: 0.4
    depends_on:
      - wi-1
    status: done
    self_check: README.md 新增 `## isFiniteNumber` 小节：示例覆盖命名导入写法（require('is-number').isFiniteNumber / 解构）、有限 number 返回 true、'3'/NaN/±Infinity/空值等返回 false，并说明命名导出与默认导出的区别及适用场景。
  - id: wi-4
    title: 维护需求文档工作事实并自检合入
    deliverable: docs/requirements/is-finite-number-export.md 工作事实更新，npm test 全绿
    completion: 自检通过并按工作项提交合入
    effort: 0.4
    depends_on:
      - wi-2
      - wi-3
---
# 新增 isFiniteNumber 命名导出

## 目标
在 is-number 库（index.js）上新增命名导出 `isFiniteNumber`，为使用者提供"严格有限数字"判断；现有默认导出（兼容数字与数字字符串）行为保持不变。

## 主要场景
- 使用者只想判断"值本身就是有限的 number 类型"，不希望 `'3'` 这类字符串被误判为数字。
- 现有依赖默认导出的使用方升级后行为完全不变。

## 范围与完成条件
- `index.js` 以命名导出形式提供 `isFiniteNumber`（CommonJS：`module.exports.isFiniteNumber = ...`），默认导出仍为原函数。
- `isFiniteNumber(x)` 仅当 `typeof x === 'number'` 且为有限值（非 NaN、非 ±Infinity）时返回 `true`；其余任何输入（字符串、布尔、null、undefined、对象、数组、函数、Date 等）返回 `false`。
- `test.js` 补充用例：有限 number（含 0、负数、小数、极大值）返回 true；NaN、±Infinity、`'3'`、`''`、null、undefined、对象等返回 false。
- README 增加用法小节，示例覆盖命名导入与默认导出的区别。
- 现有全部测试仍通过（`npm test`）。

## 用户限制
- 保留现有默认导出行为，不改动其语义。
- 沿用现有 CommonJS 结构与测试框架（Mocha），不引入新依赖。

## 工作事实
- 当前阶段：实现完成，自检通过
- 已完成：index.js 新增 `module.exports.isFiniteNumber`（默认导出不变）；test.js 新增 isFiniteNumber 用例（有限/非有限/默认导出回归，共 144 passing）；README 新增 `## isFiniteNumber` 用法小节；未引入新依赖，沿用 Mocha
- 阻碍：无
- 剩余工作：按工作项提交合入并同步
- 事实来源：index.js、test.js、README.md 与 `npm test` 实际运行结果（144 passing）
