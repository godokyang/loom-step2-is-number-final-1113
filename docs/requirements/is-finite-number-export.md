---
loom_kind: requirement
id: d0228762-ba4b-4c28-a592-2734efc929c1
title: 新增 isFiniteNumber 命名导出
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
- 当前阶段：需求共创（已收口，待用户确认）
- 已完成：目标与完成条件已与用户确认；本需求文档与版本计划已建立
- 阻碍：无
- 剩余工作：待确认后交需求 Agent 实现、自检、合入
- 事实来源：本轮用户答复；index.js、test.js、README.md 现状
