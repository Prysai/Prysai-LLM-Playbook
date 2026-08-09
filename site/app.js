const levelContent = {
  L0: { title: '观察，而不是猜测。', description: '先分清 GPT、模型、Codex、上下文、工具、Skill 与 Agent。学习从可观察的输入、行动、状态和证据开始。', link: '../book/chapters/01-gpt-and-codex.md', linkText: '第 1 章：先理解 GPT，再理解 Codex 的工作原理' },
  L1: { title: '从低风险任务开始。', description: '选择可回滚、可观察的任务，写下允许行动和确认点，完成一个真实但受控的交付。', link: '../book/chapters/02-first-safe-task.md', linkText: '第 2 章：完成第一个安全、可验证的任务' },
  L2: { title: '把愿望写成协议。', description: '把目标、背景、输入、约束、验收、失败处理与交付格式写清楚，让行动边界先于行动发生。', link: '../book/chapters/03-task-protocol.md', linkText: '第 3 章：把愿望变成任务协议' },
  L3: { title: '让工作流可运行、可检查。', description: '沿着定义、计划、执行、验证、审查、交付和维护组织任务，用竖向切片持续产出证据。', link: '../book/chapters/08-full-lifecycle-workflow.md', linkText: '第 8 章：从定义到交付的完整生命周期' },
  L4: { title: '只选择最小有效能力。', description: '按目标、生命周期、风险与依赖选择 Skill、工具和工作面；“全部安装”不是充分理由。', link: '../book/chapters/07-skills-plugins-and-tools.md', linkText: '第 7 章：Skill、Plugin、MCP 和工具如何分工' },
  L5: { title: '完成声明必须有证据。', description: '将“完成了”拆成可检查的断言，区分已验证、部分完成、未验证与无法判断，并为每项声明指定证据。', link: '../book/chapters/09-verification-and-recovery.md', linkText: '第 9 章：验证、怀疑与恢复' },
  L6: { title: '把个人方法沉淀为团队能力。', description: '共享上下文、Skill、评测、审查、版本与贡献规范，让能力可复用，也能在产品变化后重新审查。', link: '../book/chapters/21-team-capability-system.md', linkText: '第 21 章：建立团队能力系统' }
};

const updateLevel = (level) => {
  const data = levelContent[level];
  document.querySelectorAll('[data-level-label]').forEach((el) => { el.textContent = level; });
  document.querySelector('[data-level-title]').textContent = data.title;
  document.querySelector('[data-level-description]').textContent = data.description;
  const link = document.querySelector('[data-level-link]');
  link.href = data.link;
  link.firstChild.textContent = data.linkText + ' ';
};

document.querySelectorAll('.level-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.level-tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    updateLevel(tab.dataset.level);
  });
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.toggle('is-active', item === button));
    document.querySelectorAll('.chapter-group').forEach((group) => {
      const visible = filter === 'all' || group.dataset.route === filter;
      group.hidden = !visible;
      if (visible && filter !== 'all') group.open = true;
    });
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
