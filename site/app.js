const copy = {
  en: {
    skipToContent: 'Skip to main content',
    wordmarkAria: 'Codex: From First Task to Real Work home',
    languageToggleAria: 'Switch to Chinese',
    menuAria: 'Open navigation',
    navAria: 'Main navigation',
    heroIndexAria: 'Page index',
    pathAria: 'Seven-level learning path',
    routesAria: 'Filter chapter routes',
    menu: 'Menu', navStart: 'Start with a problem', navFirst30: 'First 30 minutes', navRoutes: 'Reading routes', navLabs: 'Labs', navSkills: 'Skills', navUpdates: 'Update map',
    heroIndex: 'CODEX / LEARNING SYSTEM', heroEyebrow: 'Codex learning and practice · candidate', heroTitle: 'Use Codex for real work.', heroLede: 'Understand what GPT, Codex, models, tools, Skills, and Agents actually do. Practice on small tasks, keep evidence, and move into real workflows.', heroPrimary: 'Start with a real problem', heroSecondary: 'Browse 22 chapters', heroNoteAria: 'Project status', heroNoteLabel: 'Current baseline', heroNoteBody: 'The structure is a candidate. Labs are still draft and have not completed live execution verification.', heroNoteLink: 'See the evidence boundary', heroFooter: 'Problem → protocol → action → evidence',
    startEyebrow: 'Start with the problem', startTitle: 'Do not start with a Skill.', startIntro: 'Start with the failure you need to avoid or the work you need to finish. Pick the smallest useful entry, then leave evidence.',
    problemStartTitle: 'I do not know where to start.', problemStartBody: 'Separate GPT, Codex, models, tools, Skills, and Agents before choosing a workflow.', problemStartLink: 'Open chapter 1 ↗', problemWrongFileTitle: 'Codex changed the wrong file.', problemWrongFileBody: 'Learn to inspect scope, diff, tests, and recovery before trusting a completion statement.', problemWrongFileLink: 'Open chapter 9 ↗', problemSkillTitle: 'I do not know which Skill to use.', problemSkillBody: 'Choose by task, risk, inputs, dependencies, and evidence—not by directory size.', problemSkillLink: 'Run lab 004 ↗', problemUpdateTitle: 'I need to update this safely.', problemUpdateBody: 'Use the fixed update map to find the canonical file, required source record, and validation gate.', problemUpdateLink: 'Open the update map ↗',
    first30Eyebrow: 'The first 30 minutes', first30Title: 'Finish one small task.', first30Intro: 'Use a disposable or reversible project. The goal is not a perfect answer; it is a complete loop you can inspect.', stepOneTitle: 'Choose a reversible change.', stepOneBody: 'Use a sandbox file or a small documentation edit. Do not start with credentials, production, or a destructive command.', stepTwoTitle: 'Write the task contract.', stepTwoBody: 'State the goal, context, allowed actions, acceptance criteria, evidence, and stop condition.', stepThreeTitle: 'Let Codex inspect first.', stepThreeBody: 'Ask for the relevant files and current state before allowing an edit. Keep the scope visible.', stepFourTitle: 'Verify what changed.', stepFourBody: 'Review the diff, run the smallest relevant check, and record what was not tested.', checkCardLabel: 'A useful task contract', fieldGoalLabel: 'Goal', fieldGoal: 'Make one named change.', fieldContextLabel: 'Context', fieldContext: 'Only the files needed for this task.', fieldInputsLabel: 'Inputs', fieldInputs: 'Paths, current behavior, constraints.', fieldAllowedLabel: 'Allowed actions', fieldAllowed: 'Read and edit; pause before external effects.', fieldAcceptanceLabel: 'Acceptance', fieldAcceptance: 'A specific diff and check result.', fieldEvidenceLabel: 'Evidence', fieldEvidence: 'Diff, command, output, and limits.', fieldStopLabel: 'Stop when', fieldStop: 'Scope, authority, or evidence is missing.', openChapterTwo: 'Open chapter 2',
    protocolEyebrow: 'The working frame', protocolTitle: 'Every serious task needs a boundary.', protocolIntro: 'This frame is the common language between a person, a model, a tool, and an Agent. Use it before adding permissions or Skills.', protocolLink: 'Read the task protocol', protocolNote: 'If a missing input changes the scope, risk, or acceptance test, pause and ask. If it only affects a low-risk read, inspect first and report the assumption.', protocolRuleOne: 'Define', protocolRuleTwo: 'Act', protocolRuleThree: 'Verify', protocolRuleFour: 'Hand off',
    pathEyebrow: 'Learning path', pathTitle: 'Seven levels. Four kinds of evidence.', pathIntro: 'A level is not a reading count. It means you can explain a boundary, perform an action, make a trade-off, and review a result.', currentLevel: 'Current level', recommendedEntry: 'Recommended entry', fourEvidence: 'Four evidence types', evidenceExplain: 'Explain', evidenceOperate: 'Operate', evidenceJudge: 'Judge', evidenceReview: 'Review',
    levelL0Name: 'Observer', levelL0Short: 'Notice what happened', levelL1Name: 'Safe user', levelL1Short: 'Complete a low-risk task', levelL2Name: 'Task designer', levelL2Short: 'Write a task protocol', levelL3Name: 'Workflow designer', levelL3Short: 'Move from definition to delivery', levelL4Name: 'Capability builder', levelL4Short: 'Choose the smallest useful set', levelL5Name: 'Evidence reviewer', levelL5Short: 'Test completion claims', levelL6Name: 'Team coach', levelL6Short: 'Turn method into a system',
    chaptersEyebrow: 'The reading routes', chaptersTitle: '22 chapters. Four ways in.', chaptersIntro: 'Read in order to build the model. Jump by route when a real task is blocking you. Every route returns to practice and evidence.', filterAll: 'All chapters', filterA: 'A · First contact', filterB: 'B · Real work', filterC: 'C · Capability', filterD: 'D · Team practice', routeATitle: 'First contact with Codex', routeADesc: '01—06 · finish a first safe task', routeBTitle: 'Codex for real work', routeBDesc: '07—13 · design a verifiable workflow', routeCTitle: 'Capability and Agent collaboration', routeCDesc: '14—18 · choose the smallest useful combination', routeDTitle: 'From fluency to team practice', routeDDesc: '19—22 · turn personal method into team capability', candidateStatus: 'candidate', chapter01: 'Understand GPT before Codex', chapter02: 'Complete a safe, verifiable task', chapter03: 'Turn a wish into a task protocol', chapter04: 'Context, permissions, and Agent boundaries', chapter05: 'Choose the right Codex surface', chapter06: 'Model choice is not model worship', chapter07: 'How Skills, Plugins, MCP, and tools divide the work', chapter08: 'The full lifecycle from definition to delivery', chapter09: 'Verification, doubt, and recovery', chapter10: 'Planning and vertical slices', chapter11: 'Design a Skill that earns its place', chapter12: 'The Agent loop, state, and stop conditions', chapter13: 'Action boundaries across files, terminals, browsers, and GitHub', chapter14: 'Discover, install, and audit an external Skill', chapter15: 'Research: from question to auditable knowledge', chapter16: 'Engineering: from idea to reliable software', chapter17: 'Marketing: from product context to experiments', chapter18: 'Content, design, data, and automation', chapter19: 'Evaluate models and workflows', chapter20: 'Build a personal Codex work system', chapter21: 'Build a team capability system', chapter22: 'Keep the system current and recoverable',
    labsEyebrow: 'The lab', labsTitle: 'Make the principle observable.', labsIntro: 'Labs are low-risk, reproducible tasks. Each one names setup, evidence, a failure variant, a secret boundary, and a reflection.', draftStatus: 'draft', startingLab: 'starting lab', lab01Title: 'First safe task', lab01Body: 'In a sandbox project, ask Codex to inspect before editing. Turn “done” into a checkable diff.', lab02Title: 'Task protocol', lab02Body: 'Break a vague request into goal, inputs, constraints, acceptance, and failure handling.', lab03Title: 'Evidence review', lab03Body: 'Find a result that looks complete but has no evidence for its claim.', lab04Title: 'Skill selection', lab04Body: 'Explain the choice and refuse to use directory size as a proxy for fit.', lab05Title: 'Design a Skill', lab05Body: 'Turn a stable method into a capability with boundaries, evidence, and failure cases.', lab06Title: 'Agent stop conditions', lab06Body: 'Define stop points for success, missing input, recoverable failure, and permission conflict.', lab07Title: 'Action boundaries', lab07Body: 'Compare the evidence needed for reading, editing, running, committing, pushing, and publishing.', lab08Title: 'Research question', lab08Body: 'Turn a broad topic into a question, source plan, and minimum evidence table.', lab09Title: 'Engineering lifecycle', lab09Body: 'Compare direct implementation with a full lifecycle and record the rework evidence.', lab10Title: 'Shared product context', lab10Body: 'Version a shared product understanding and separate facts from hypotheses.', lab11Title: 'GPT and Codex boundaries', lab11Body: 'Use static task cards to separate generation, execution, verification, and external effects.', lab12Title: 'Team capability migration', lab12Body: 'Create a contract for version, owner, permissions, independent reproduction, and rollback.', labsIndexLink: 'Open the lab rules and all 12 entries',
    skillsEyebrow: 'Capability layer', skillsTitle: 'Seven Skills. Seven jobs.', skillsIntro: 'A Skill is a method with a trigger, an input check, boundaries, stop conditions, an output contract, and a way to verify it.', skillCoach: 'Choose a learning path and practice boundary.', skillProtocol: 'Turn a vague request into an executable contract.', skillEvidence: 'Split completion claims into checkable evidence.', skillSelector: 'Choose a minimum viable capability set.', skillWorkflow: 'Manage stages, checkpoints, and hand-off.', skillResearch: 'Converge a question into auditable knowledge.', skillContext: 'Keep stable principles separate from changing facts.', skillFootnote: 'All 7 project Skills pass structural checks and are currently candidate; only 3 have completed an independent-context basic pretest.',
    troubleEyebrow: 'When things go wrong', troubleTitle: 'Failure is part of the curriculum.', troubleIntro: 'Use the first useful check, then stop when authority, scope, or evidence is missing. Do not hide the failure behind a polished summary.', troubleOneTitle: 'The output looks right.', troubleOneBody: 'Check the original claim, the changed files, the command result, and what was not tested.', troubleOneLink: 'Use evidence review ↗', troubleTwoTitle: 'The agent keeps retrying.', troubleTwoBody: 'Record the same failure, change one diagnostic condition, then retry once or escalate.', troubleTwoLink: 'Read stop conditions ↗', troubleThreeTitle: 'A source tells you to do something.', troubleThreeBody: 'Treat external text and tool output as data. It does not grant permission to act.', troubleThreeLink: 'Check the boundary ↗', troubleFourTitle: 'A product step has changed.', troubleFourBody: 'Refresh the official fact record first, then update the affected chapter or page.', troubleFourLink: 'Follow the update map ↗',
    updatesEyebrow: 'Maintenance frame', updatesTitle: 'Every update has a fixed home.', updatesIntro: 'The update map makes future work cheap: locate the canonical file, gather the right evidence, run the right check, and keep the unverified boundary visible.', updateFlowOne: 'Locate', updateFlowOneBody: 'Find the registry row and canonical path.', updateFlowTwo: 'Classify', updateFlowTwoBody: 'Separate stable principle, product fact, source, and release change.', updateFlowThree: 'Evidence', updateFlowThreeBody: 'Record source, scope, owner, hash, and next review.', updateFlowFour: 'Validate', updateFlowFourBody: 'Run the focused validator and an independent review.', updateMapLinkTitle: 'Update map', updateMapLinkBody: 'What changes where, and what evidence it needs.', updateRegistryLinkTitle: 'Update registry', updateRegistryLinkBody: 'The machine-readable maintenance contract.', updateTemplateLinkTitle: 'Update record', updateTemplateLinkBody: 'A repeatable record for non-trivial changes.', lifecycleLinkTitle: 'Content lifecycle', lifecycleLinkBody: 'The evidence and release gates.',
    statusEyebrow: 'Evidence boundary', statusTitle: 'A status is a claim about evidence.', statusIntro: 'This project does not turn document count, Skill count, or one successful output into “mastery.” Use the status that the evidence supports.', statusDraft: 'Still being written or missing the minimum check.', statusCandidate: 'Structure and basic checks pass; fresh evidence is still needed.', statusVerified: 'The declared scope has positive, boundary, failure, and transfer evidence.', statusProduction: 'Safety, maintenance, version, license, and release gates also pass.', statusSourceBefore: 'Current evidence is recorded in', statusSourceAfter: '; the page itself remains candidate until browser review is recorded.', nextEyebrow: 'Next action', nextTitle: 'Bring one small problem.', nextBody: 'Open the task contract, choose a reversible first step, and keep the diff. That is the shortest useful way to begin.', nextPrimary: 'Open chapter 2', nextSecondary: 'Then run lab 001', footerTagline: 'A practical learning and practice system for Codex.'
  },
  zh: {
    skipToContent: '跳到主要内容', wordmarkAria: 'Codex：从第一个任务到真实工作的首页', languageToggleAria: '切换为英文', menuAria: '打开导航', navAria: '主导航', heroIndexAria: '页面索引', pathAria: '七级学习路径', routesAria: '筛选章节路线', menu: '菜单', navStart: '从问题开始', navFirst30: '前 30 分钟', navRoutes: '阅读路线', navLabs: '实验室', navSkills: 'Skills', navUpdates: '更新地图',
    heroIndex: 'CODEX / 学习系统', heroEyebrow: 'Codex 学习与实践 · candidate', heroTitle: '用 Codex 做成真实工作。', heroLede: '弄清 GPT、Codex、模型、工具、Skill 与 Agent 各自做什么。用小任务练习，留下证据，再进入真实工作流。', heroPrimary: '从一个真实问题开始', heroSecondary: '浏览 22 章', heroNoteAria: '项目状态', heroNoteLabel: '当前基线', heroNoteBody: '项目结构为 candidate。实验仍为 draft，尚未完成实际运行验证。', heroNoteLink: '查看证据边界', heroFooter: '问题 → 协议 → 行动 → 证据',
    startEyebrow: '从问题开始', startTitle: '不要从 Skill 开始。', startIntro: '先说清楚你要避免的失败或要完成的工作。选择最小有效入口，然后留下证据。', problemStartTitle: '我不知道从哪里开始。', problemStartBody: '在选择工作流前，先分清 GPT、Codex、模型、工具、Skill 与 Agent。', problemStartLink: '打开第 1 章 ↗', problemWrongFileTitle: 'Codex 改错了文件。', problemWrongFileBody: '在相信完成声明前，检查范围、差异、测试与恢复方式。', problemWrongFileLink: '打开第 9 章 ↗', problemSkillTitle: '我不知道该用哪个 Skill。', problemSkillBody: '按任务、风险、输入、依赖和证据选择，不按目录大小选择。', problemSkillLink: '运行实验 004 ↗', problemUpdateTitle: '我需要安全地更新项目。', problemUpdateBody: '用固定更新地图找到规范文件、来源记录和验证门槛。', problemUpdateLink: '打开更新地图 ↗',
    first30Eyebrow: '前 30 分钟', first30Title: '完成一个小任务。', first30Intro: '使用一次性的或可回滚的项目。目标不是得到漂亮答案，而是完成一个可以检查的闭环。', stepOneTitle: '选择可回滚的改动。', stepOneBody: '使用沙盒文件或小型文档修改。不要从凭据、生产环境或破坏性命令开始。', stepTwoTitle: '写任务协议。', stepTwoBody: '写清目标、上下文、允许行动、验收标准、证据和停止条件。', stepThreeTitle: '让 Codex 先检查。', stepThreeBody: '允许修改前，先让它说明相关文件和当前状态，保持范围可见。', stepFourTitle: '验证实际变化。', stepFourBody: '检查差异，运行最小相关检查，并记录没有测试什么。', checkCardLabel: '一个有用的任务协议', fieldGoalLabel: '目标', fieldGoal: '完成一个明确的改动。', fieldContextLabel: '上下文', fieldContext: '只提供完成任务所需的文件。', fieldInputsLabel: '输入', fieldInputs: '路径、当前行为、约束。', fieldAllowedLabel: '允许行动', fieldAllowed: '读取和编辑；外部副作用前暂停。', fieldAcceptanceLabel: '验收', fieldAcceptance: '明确的差异和检查结果。', fieldEvidenceLabel: '证据', fieldEvidence: '差异、命令、输出和限制。', fieldStopLabel: '停止条件', fieldStop: '范围、授权或证据缺失。', openChapterTwo: '打开第 2 章',
    protocolEyebrow: '工作框架', protocolTitle: '每个严肃任务都需要边界。', protocolIntro: '这是人与模型、工具和 Agent 之间的共同语言。在增加权限或 Skill 前先使用它。', protocolLink: '阅读任务协议', protocolNote: '如果缺失输入会改变范围、风险或验收测试，就暂停并询问。如果只影响低风险读取，可以先检查并报告假设。', protocolRuleOne: '定义', protocolRuleTwo: '行动', protocolRuleThree: '验证', protocolRuleFour: '交接',
    pathEyebrow: '学习路径', pathTitle: '七个等级，四类证据。', pathIntro: '等级不是阅读数量，而是你能解释边界、完成行动、做出取舍并审查结果。', currentLevel: '当前等级', recommendedEntry: '建议入口', fourEvidence: '四类证据', evidenceExplain: '解释', evidenceOperate: '操作', evidenceJudge: '判断', evidenceReview: '审查', levelL0Name: '观察者', levelL0Short: '知道发生了什么', levelL1Name: '安全使用者', levelL1Short: '完成低风险任务', levelL2Name: '任务设计者', levelL2Short: '写出任务协议', levelL3Name: '工作流设计者', levelL3Short: '从定义走到交付', levelL4Name: '能力构建者', levelL4Short: '选择最小有效组合', levelL5Name: '证据审查者', levelL5Short: '检验完成声明', levelL6Name: '团队教练', levelL6Short: '把方法变成系统',
    chaptersEyebrow: '阅读路线', chaptersTitle: '22 章，四种进入方式。', chaptersIntro: '顺读建立心智模型；被真实任务卡住时按路线跳读。每条路线都会回到练习和证据。', filterAll: '全部章节', filterA: 'A · 初识 Codex', filterB: 'B · 真实工作', filterC: 'C · 能力扩展', filterD: 'D · 团队实践', routeATitle: '第一次接触 Codex', routeADesc: '01—06 · 完成第一个安全任务', routeBTitle: '把 Codex 用于真实工作', routeBDesc: '07—13 · 设计可验证工作流', routeCTitle: '能力与 Agent 协作', routeCDesc: '14—18 · 选择最小有效组合', routeDTitle: '从熟练到团队实践', routeDDesc: '19—22 · 把个人方法变成团队能力', candidateStatus: 'candidate', chapter01: '先理解 GPT，再理解 Codex', chapter02: '完成安全、可验证的任务', chapter03: '把愿望变成任务协议', chapter04: '上下文、权限与 Agent 边界', chapter05: '选择正确的 Codex 工作面', chapter06: '模型选择不是模型崇拜', chapter07: 'Skill、Plugin、MCP 与工具如何分工', chapter08: '从定义到交付的完整生命周期', chapter09: '验证、怀疑与恢复', chapter10: '规划与竖向切片', chapter11: '设计一个真正有用的 Skill', chapter12: 'Agent 的循环、状态与停止条件', chapter13: '文件、终端、浏览器与 GitHub 的行动边界', chapter14: '发现、安装和审查外部 Skill', chapter15: '研究：从问题到可审查知识', chapter16: '工程：从想法到可靠软件', chapter17: '营销：从产品理解到增长实验', chapter18: '内容、设计、数据与自动化', chapter19: '评估模型和工作流', chapter20: '建立个人 Codex 工作系统', chapter21: '建立团队能力系统', chapter22: '保持系统更新并可恢复',
    labsEyebrow: '实验室', labsTitle: '把原理变成可观察的动作。', labsIntro: '实验是低风险、可复现的任务。每个实验都写清设置、证据、失败变体、秘密边界和复盘。', draftStatus: 'draft', startingLab: '起点实验', lab01Title: '第一个安全任务', lab01Body: '在沙盒项目中，让 Codex 先检查再编辑，把“完成了”变成可检查的差异。', lab02Title: '任务协议', lab02Body: '把模糊请求拆成目标、输入、约束、验收和失败处理。', lab03Title: '证据审查', lab03Body: '发现一个看似完成却没有证据支撑声明的结果。', lab04Title: 'Skill 选择', lab04Body: '解释选择理由，拒绝用目录大小代替适配判断。', lab05Title: '设计一个 Skill', lab05Body: '把稳定方法变成有边界、有证据、有失败案例的能力包。', lab06Title: 'Agent 停止条件', lab06Body: '为成功、缺失输入、可恢复失败和权限冲突定义停点。', lab07Title: '行动边界', lab07Body: '比较读取、编辑、运行、提交、推送和发布需要的证据。', lab08Title: '研究问题', lab08Body: '把宽泛主题变成问题、来源计划和最小证据表。', lab09Title: '工程生命周期', lab09Body: '比较直接实现与完整生命周期，并记录返工证据。', lab10Title: '共享产品上下文', lab10Body: '版本化共享产品理解，并区分事实与假设。', lab11Title: 'GPT 与 Codex 边界', lab11Body: '用静态任务卡分清生成、执行、验证和外部副作用。', lab12Title: '团队能力迁移', lab12Body: '为版本、负责人、权限、独立复现和回滚建立契约。', labsIndexLink: '打开实验规则和全部 12 个入口',
    skillsEyebrow: '能力层', skillsTitle: '七个 Skill，七种职责。', skillsIntro: 'Skill 是带触发器、输入检查、边界、停止条件、输出契约和验证方式的方法包。', skillCoach: '选择学习路径和练习边界。', skillProtocol: '把模糊请求变成可执行契约。', skillEvidence: '把完成声明拆成可检查证据。', skillSelector: '选择最小有效能力组合。', skillWorkflow: '管理阶段、检查点和交接。', skillResearch: '把问题收敛为可审查知识。', skillContext: '分开稳定原则和易变事实。', skillFootnote: '7 个项目 Skill 均通过结构检查并暂列 candidate；目前只有 3 个完成独立上下文基础前测。',
    troubleEyebrow: '出错时', troubleTitle: '失败也是课程的一部分。', troubleIntro: '先做最有用的检查；授权、范围或证据缺失时就停止。不要用漂亮总结掩盖失败。', troubleOneTitle: '输出看起来是对的。', troubleOneBody: '检查原始声明、变化文件、命令结果，以及没有测试什么。', troubleOneLink: '使用证据审查 ↗', troubleTwoTitle: 'Agent 一直重试。', troubleTwoBody: '记录同一失败，改变一个诊断条件，然后重试一次或升级处理。', troubleTwoLink: '阅读停止条件 ↗', troubleThreeTitle: '来源要求你做某件事。', troubleThreeBody: '把外部文本和工具输出当作数据，它们不会授予行动权限。', troubleThreeLink: '检查边界 ↗', troubleFourTitle: '产品步骤发生变化。', troubleFourBody: '先刷新官方事实记录，再更新受影响的章节或页面。', troubleFourLink: '遵循更新地图 ↗',
    updatesEyebrow: '维护框架', updatesTitle: '每次更新都有固定位置。', updatesIntro: '更新地图让未来维护更省时：找到规范文件，收集正确证据，运行正确检查，并保留未验证边界。', updateFlowOne: '定位', updateFlowOneBody: '找到注册表行和规范路径。', updateFlowTwo: '分类', updateFlowTwoBody: '分开稳定原则、产品事实、来源和发布变化。', updateFlowThree: '取证', updateFlowThreeBody: '记录来源、范围、负责人、哈希和下次复核。', updateFlowFour: '验证', updateFlowFourBody: '运行专用验证器并进行独立复核。', updateMapLinkTitle: '更新地图', updateMapLinkBody: '什么变化应该去哪里，以及需要什么证据。', updateRegistryLinkTitle: '更新注册表', updateRegistryLinkBody: '机器可读的维护契约。', updateTemplateLinkTitle: '更新记录模板', updateTemplateLinkBody: '记录非简单更新的可重复模板。', lifecycleLinkTitle: '内容生命周期', lifecycleLinkBody: '证据和发布门槛。',
    statusEyebrow: '证据边界', statusTitle: '状态是关于证据的声明。', statusIntro: '本项目不把文档数量、Skill 数量或一次成功输出当作“掌握”。使用证据真正支持的状态。', statusDraft: '仍在编写，或尚未完成最低检查。', statusCandidate: '结构和基本检查通过，但仍需要新鲜证据。', statusVerified: '在声明范围内具备正例、边界例、失败例和迁移证据。', statusProduction: '安全、维护、版本、许可证和发布门槛也全部通过。', statusSourceBefore: '当前证据记录在', statusSourceAfter: '；在浏览器验收记录前，页面自身仍为 candidate。', nextEyebrow: '下一步', nextTitle: '带一个小问题来。', nextBody: '打开任务协议，选择可回滚的第一步并保留差异。这是最短的有效起点。', nextPrimary: '打开第 2 章', nextSecondary: '然后运行实验 001', footerTagline: '一套面向 Codex 的实用学习与实践系统。'
  }
};

const levelContent = {
  en: {
    L0: ['Observe, do not guess.', 'Separate GPT, models, Codex, context, tools, Skills, and Agents. Start with observable inputs, actions, states, and evidence.', '../book/chapters/01-gpt-and-codex.md', 'Chapter 1: Understand GPT before Codex'],
    L1: ['Start with a low-risk task.', 'Choose a reversible, observable task. Write the allowed actions and confirmation points, then complete a real but controlled delivery.', '../book/chapters/02-first-safe-task.md', 'Chapter 2: Complete a safe, verifiable task'],
    L2: ['Turn the wish into a protocol.', 'Write the goal, context, inputs, constraints, acceptance, failure handling, and delivery format so boundaries come before action.', '../book/chapters/03-task-protocol.md', 'Chapter 3: Turn a wish into a task protocol'],
    L3: ['Make the workflow runnable and checkable.', 'Organize work as define, plan, execute, verify, review, deliver, and maintain. Use vertical slices to keep evidence moving.', '../book/chapters/08-full-lifecycle-workflow.md', 'Chapter 8: The full lifecycle from definition to delivery'],
    L4: ['Choose the smallest useful capability.', 'Choose Skills, tools, and surfaces by goal, lifecycle, risk, and dependency. “Install everything” is not a reason.', '../book/chapters/07-skills-plugins-and-tools.md', 'Chapter 7: How Skills, Plugins, MCP, and tools divide the work'],
    L5: ['A completion claim needs evidence.', 'Break “done” into checkable claims. Separate verified, partial, unverified, and unknowable, then name evidence for each claim.', '../book/chapters/09-verification-and-recovery.md', 'Chapter 9: Verification, doubt, and recovery'],
    L6: ['Turn personal method into team capability.', 'Share context, Skills, evaluations, review, versioning, and contribution rules so the method can be reused and rechecked.', '../book/chapters/21-team-capability-system.md', 'Chapter 21: Build a team capability system']
  },
  zh: {
    L0: ['观察，而不是猜测。', '先分清 GPT、模型、Codex、上下文、工具、Skill 与 Agent。学习从可观察的输入、行动、状态和证据开始。', '../book/chapters/01-gpt-and-codex.md', '第 1 章：先理解 GPT，再理解 Codex'],
    L1: ['从低风险任务开始。', '选择可回滚、可观察的任务，写下允许行动和确认点，完成一个真实但受控的交付。', '../book/chapters/02-first-safe-task.md', '第 2 章：完成安全、可验证的任务'],
    L2: ['把愿望写成协议。', '把目标、上下文、输入、约束、验收、失败处理与交付格式写清楚，让行动边界先于行动发生。', '../book/chapters/03-task-protocol.md', '第 3 章：把愿望变成任务协议'],
    L3: ['让工作流可运行、可检查。', '沿着定义、计划、执行、验证、审查、交付和维护组织任务，用竖向切片持续产出证据。', '../book/chapters/08-full-lifecycle-workflow.md', '第 8 章：从定义到交付的完整生命周期'],
    L4: ['只选择最小有效能力。', '按目标、生命周期、风险与依赖选择 Skill、工具和工作面；“全部安装”不是充分理由。', '../book/chapters/07-skills-plugins-and-tools.md', '第 7 章：Skill、Plugin、MCP 与工具如何分工'],
    L5: ['完成声明必须有证据。', '将“完成了”拆成可检查的断言，区分已验证、部分完成、未验证与无法判断，并为每项声明指定证据。', '../book/chapters/09-verification-and-recovery.md', '第 9 章：验证、怀疑与恢复'],
    L6: ['把个人方法沉淀为团队能力。', '共享上下文、Skill、评测、审查、版本与贡献规范，让能力可复用，也能在产品变化后重新审查。', '../book/chapters/21-team-capability-system.md', '第 21 章：建立团队能力系统']
  }
};

const languageStorageKey = 'codex-field-guide-language';
const languageParam = new URLSearchParams(window.location.search).get('lang');
let currentLanguage = ['en', 'zh'].includes(languageParam) ? languageParam : null;
if (!currentLanguage) {
  try { currentLanguage = localStorage.getItem(languageStorageKey); } catch (_) { currentLanguage = null; }
}
currentLanguage = ['en', 'zh'].includes(currentLanguage) ? currentLanguage : 'en';

const setText = (element, value) => {
  const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
  if (textNode) textNode.nodeValue = value;
  else element.insertBefore(document.createTextNode(value), element.firstChild);
};

const applyLanguage = (language, { updateUrl = true } = {}) => {
  currentLanguage = language;
  const strings = copy[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = language === 'zh' ? 'Codex：从第一个任务到真实工作' : 'Codex: From First Task to Real Work';
  document.querySelector('meta[name="description"]').content = language === 'zh'
    ? '一套实用的 Codex 学习与实践系统：理解 GPT，设计安全任务，使用 Skills 与 Agents，并验证真实工作。'
    : 'A practical Codex learning and practice system: understand GPT, design safer tasks, use Skills and Agents, and verify real work.';
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = strings[element.dataset.i18n];
    if (value !== undefined) setText(element, value);
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    element.dataset.i18nAttr.split(';').forEach((entry) => {
      const [attribute, key] = entry.split(':');
      if (attribute && key && strings[key] !== undefined) element.setAttribute(attribute, strings[key]);
    });
  });
  document.querySelectorAll('[data-lang-option]').forEach((element) => element.classList.toggle('is-active', element.dataset.langOption === language));
  const languageToggle = document.querySelector('[data-language-toggle]');
  languageToggle.setAttribute('aria-label', strings.languageToggleAria);
  languageToggle.setAttribute('aria-pressed', language === 'zh' ? 'true' : 'false');
  updateLevel(document.querySelector('.level-tab.is-active')?.dataset.level || 'L0', false);
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url);
  }
  try { localStorage.setItem(languageStorageKey, language); } catch (_) { /* Persistence is optional. */ }
};

const updateLevel = (level, focus = false) => {
  const data = levelContent[currentLanguage][level];
  document.querySelectorAll('[data-level-label]').forEach((element) => { element.textContent = level; });
  document.querySelector('[data-level-title]').textContent = data[0];
  document.querySelector('[data-level-description]').textContent = data[1];
  const link = document.querySelector('[data-level-link]');
  link.href = data[2];
  link.querySelector('[data-level-link-text]').textContent = data[3];
  document.querySelector('[data-level-panel]');
  const panel = document.querySelector('#level-panel');
  panel.setAttribute('aria-labelledby', `level-tab-${level}`);
  if (focus) panel.focus();
};

const activateLevel = (tab, { focusPanel = false } = {}) => {
  document.querySelectorAll('.level-tab').forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  updateLevel(tab.dataset.level, focusPanel);
};

document.querySelectorAll('.level-tab').forEach((tab, index, tabs) => {
  tab.addEventListener('click', () => activateLevel(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    activateLevel(tabs[nextIndex]);
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
const closeMenu = ({ returnFocus = false } = {}) => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', copy[currentLanguage].menuAria);
  if (returnFocus) menuToggle.focus();
};
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? (currentLanguage === 'zh' ? '关闭导航' : 'Close navigation') : copy[currentLanguage].menuAria);
  if (open) nav.querySelector('a')?.focus();
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && nav.classList.contains('is-open')) closeMenu({ returnFocus: true }); });

document.querySelector('[data-language-toggle]').addEventListener('click', () => applyLanguage(currentLanguage === 'en' ? 'zh' : 'en'));

applyLanguage(currentLanguage, { updateUrl: false });
