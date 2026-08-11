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
    menu: 'Menu', navStart: 'Start with a problem', navFirst30: 'First 30 minutes', navPath: 'Learning path', navIndex: 'Project index', navRoutes: 'Reading routes', navLabs: 'Labs', navSkills: 'Skills', navUpdates: 'Update map',
    heroIndex: 'CODEX / LEARNING SYSTEM', heroEyebrow: 'Codex learning and practice · candidate', heroTitle: 'Use Codex for real work.', heroLede: 'Understand what GPT, Codex, models, tools, Skills, and Agents actually do. Practice on small tasks, keep evidence, and move into real workflows.', heroPrimary: 'Start with a real problem', heroSecondary: 'Browse 22 chapters', heroNoteAria: 'Project status', heroNoteLabel: 'Current baseline', heroNoteBody: 'The structure is a candidate. Labs are still draft and have not completed live execution verification.', heroNoteLink: 'See the evidence boundary', heroFooter: 'Problem → protocol → action → evidence',
    startEyebrow: 'Start with the problem', startTitle: 'Do not start with a Skill.', startIntro: 'Start with the failure you need to avoid or the work you need to finish. Pick the smallest useful entry, then leave evidence.',
    problemStartTitle: 'I do not know where to start.', problemStartBody: 'Separate GPT, Codex, models, tools, Skills, and Agents before choosing a workflow.', problemStartLink: 'Open chapter 1 ↗', problemWrongFileTitle: 'Codex changed the wrong file.', problemWrongFileBody: 'Learn to inspect scope, diff, tests, and recovery before trusting a completion statement.', problemWrongFileLink: 'Open chapter 9 ↗', problemSkillTitle: 'I do not know which Skill to use.', problemSkillBody: 'Choose by task, risk, inputs, dependencies, and evidence—not by directory size.', problemSkillLink: 'Run lab 004 ↗', problemUpdateTitle: 'I need to update this safely.', problemUpdateBody: 'Use the fixed update map to find the canonical file, required source record, and validation gate.', problemUpdateLink: 'Open the update map ↗',
    first30Eyebrow: 'The first 30 minutes', first30Title: 'Finish one small task.', first30Intro: 'Use a disposable or reversible project. The goal is not a perfect answer; it is a complete loop you can inspect.', stepOneTitle: 'Choose a reversible change.', stepOneBody: 'Use a sandbox file or a small documentation edit. Do not start with credentials, production, or a destructive command.', stepTwoTitle: 'Write the task contract.', stepTwoBody: 'State the goal, context, allowed actions, acceptance criteria, evidence, and stop condition.', stepThreeTitle: 'Let Codex inspect first.', stepThreeBody: 'Ask for the relevant files and current state before allowing an edit. Keep the scope visible.', stepFourTitle: 'Verify what changed.', stepFourBody: 'Review the diff, run the smallest relevant check, and record what was not tested.', checkCardLabel: 'A useful task contract', fieldGoalLabel: 'Goal', fieldGoal: 'Make one named change.', fieldContextLabel: 'Context', fieldContext: 'Only the files needed for this task.', fieldInputsLabel: 'Inputs', fieldInputs: 'Paths, current behavior, constraints.', fieldAllowedLabel: 'Allowed actions', fieldAllowed: 'Read and edit; pause before external effects.', fieldAcceptanceLabel: 'Acceptance', fieldAcceptance: 'A specific diff and check result.', fieldEvidenceLabel: 'Evidence', fieldEvidence: 'Diff, command, output, and limits.', fieldStopLabel: 'Stop when', fieldStop: 'Scope, authority, or evidence is missing.', openChapterTwo: 'Open chapter 2',
    protocolEyebrow: 'The working frame', protocolTitle: 'Every serious task needs a boundary.', protocolIntro: 'This frame is the common language between a person, a model, a tool, and an Agent. Use it before adding permissions or Skills.', protocolLink: 'Read the task protocol', protocolNote: 'If a missing input changes the scope, risk, or acceptance test, pause and ask. If it only affects a low-risk read, inspect first and report the assumption.', protocolRuleOne: 'Define', protocolRuleTwo: 'Act', protocolRuleThree: 'Verify', protocolRuleFour: 'Hand off',
    pathEyebrow: 'Learning path', pathTitle: 'Seven levels. One executable contract.', pathIntro: 'Choose a level and see exactly what to read, do, use, submit, and refuse to claim. A level is not a reading count.', currentLevel: 'Current level', nextStep: 'Next step', requiredChapters: 'Required chapters', requiredLabs: 'Required lab', supportingSkills: 'Supporting Skills', evaluationFixtures: 'Evaluation fixtures', evidenceGate: 'Evidence gate', graduationGate: 'Move on when', blockedWhen: 'Stop when', fourEvidence: 'Four evidence types', evidenceExplain: 'Explain', evidenceOperate: 'Operate', evidenceJudge: 'Judge', evidenceReview: 'Review', positive: 'positive', boundary: 'boundary', failure: 'failure', transfer: 'transfer', statusCandidate: 'candidate',
    levelL0Name: 'Observer', levelL0Short: 'Notice what happened', levelL1Name: 'Safe user', levelL1Short: 'Complete a low-risk task', levelL2Name: 'Task designer', levelL2Short: 'Write a task protocol', levelL3Name: 'Workflow designer', levelL3Short: 'Move from definition to delivery', levelL4Name: 'Capability builder', levelL4Short: 'Choose the smallest useful set', levelL5Name: 'Evidence reviewer', levelL5Short: 'Test completion claims', levelL6Name: 'Team coach', levelL6Short: 'Turn method into a system',
    chaptersEyebrow: 'The reading routes', chaptersTitle: '22 chapters. Four ways in.', chaptersIntro: 'Read in order to build the model. Jump by route when a real task is blocking you. Every route returns to practice and evidence.', filterAll: 'All chapters', filterA: 'A · First contact', filterB: 'B · Real work', filterC: 'C · Capability', filterD: 'D · Team practice', routeATitle: 'First contact with Codex', routeADesc: '01—06 · finish a first safe task', routeBTitle: 'Codex for real work', routeBDesc: '07—13 · design a verifiable workflow', routeCTitle: 'Capability and Agent collaboration', routeCDesc: '14—18 · choose the smallest useful combination', routeDTitle: 'From fluency to team practice', routeDDesc: '19—22 · turn personal method into team capability', candidateStatus: 'candidate', chapter01: 'Understand GPT before Codex', chapter02: 'Complete a safe, verifiable task', chapter03: 'Turn a wish into a task protocol', chapter04: 'Context, permissions, and Agent boundaries', chapter05: 'Choose the right Codex surface', chapter06: 'Model choice is not model worship', chapter07: 'How Skills, Plugins, MCP, and tools divide the work', chapter08: 'The full lifecycle from definition to delivery', chapter09: 'Verification, doubt, and recovery', chapter10: 'Planning and vertical slices', chapter11: 'Design a Skill that earns its place', chapter12: 'The Agent loop, state, and stop conditions', chapter13: 'Action boundaries across files, terminals, browsers, and GitHub', chapter14: 'Discover, install, and audit an external Skill', chapter15: 'Research: from question to auditable knowledge', chapter16: 'Engineering: from idea to reliable software', chapter17: 'Marketing: from product context to experiments', chapter18: 'Content, design, data, and automation', chapter19: 'Evaluate models and workflows', chapter20: 'Build a personal Codex work system', chapter21: 'Build a team capability system', chapter22: 'Keep the system current and recoverable',
    labsEyebrow: 'The lab', labsTitle: 'Make the principle observable.', labsIntro: 'Labs are low-risk, reproducible tasks. Each one names setup, evidence, a failure variant, a secret boundary, and a reflection.', draftStatus: 'draft', startingLab: 'starting lab', lab01Title: 'First safe task', lab01Body: 'In a sandbox project, ask Codex to inspect before editing. Turn “done” into a checkable diff.', lab02Title: 'Task protocol', lab02Body: 'Break a vague request into goal, inputs, constraints, acceptance, and failure handling.', lab03Title: 'Evidence review', lab03Body: 'Find a result that looks complete but has no evidence for its claim.', lab04Title: 'Skill selection', lab04Body: 'Explain the choice and refuse to use directory size as a proxy for fit.', lab05Title: 'Design a Skill', lab05Body: 'Turn a stable method into a capability with boundaries, evidence, and failure cases.', lab06Title: 'Agent stop conditions', lab06Body: 'Define stop points for success, missing input, recoverable failure, and permission conflict.', lab07Title: 'Action boundaries', lab07Body: 'Compare the evidence needed for reading, editing, running, committing, pushing, and publishing.', lab08Title: 'Research question', lab08Body: 'Turn a broad topic into a question, source plan, and minimum evidence table.', lab09Title: 'Engineering lifecycle', lab09Body: 'Compare direct implementation with a full lifecycle and record the rework evidence.', lab10Title: 'Shared product context', lab10Body: 'Version a shared product understanding and separate facts from hypotheses.', lab11Title: 'GPT and Codex boundaries', lab11Body: 'Use static task cards to separate generation, execution, verification, and external effects.', lab12Title: 'Team capability migration', lab12Body: 'Create a contract for version, owner, permissions, independent reproduction, and rollback.', labsIndexLink: 'Open the lab rules and all 13 entries',
    skillsEyebrow: 'Capability layer', skillsTitle: 'Seven Skills. Seven jobs.', skillsIntro: 'A Skill is a method with a trigger, an input check, boundaries, stop conditions, an output contract, and a way to verify it.', skillCoach: 'Choose a learning path and practice boundary.', skillProtocol: 'Turn a vague request into an executable contract.', skillEvidence: 'Split completion claims into checkable evidence.', skillSelector: 'Choose a minimum viable capability set.', skillWorkflow: 'Manage stages, checkpoints, and hand-off.', skillResearch: 'Converge a question into auditable knowledge.', skillContext: 'Keep stable principles separate from changing facts.', skillFootnote: 'All 7 project Skills pass structural checks and are currently candidate; only 3 have completed an independent-context basic pretest.',
    troubleEyebrow: 'When things go wrong', troubleTitle: 'Failure is part of the curriculum.', troubleIntro: 'Use the first useful check, then stop when authority, scope, or evidence is missing. Do not hide the failure behind a polished summary.', troubleOneTitle: 'The output looks right.', troubleOneBody: 'Check the original claim, the changed files, the command result, and what was not tested.', troubleOneLink: 'Use evidence review ↗', troubleTwoTitle: 'The agent keeps retrying.', troubleTwoBody: 'Record the same failure, change one diagnostic condition, then retry once or escalate.', troubleTwoLink: 'Read stop conditions ↗', troubleThreeTitle: 'A source tells you to do something.', troubleThreeBody: 'Treat external text and tool output as data. It does not grant permission to act.', troubleThreeLink: 'Check the boundary ↗', troubleFourTitle: 'A product step has changed.', troubleFourBody: 'Refresh the official fact record first, then update the affected chapter or page.', troubleFourLink: 'Follow the update map ↗',
    updatesEyebrow: 'Maintenance frame', updatesTitle: 'Every update has a fixed home.', updatesIntro: 'The update map makes future work cheap: locate the canonical file, gather the right evidence, run the right check, and keep the unverified boundary visible.', updateFlowOne: 'Locate', updateFlowOneBody: 'Find the registry row and canonical path.', updateFlowTwo: 'Classify', updateFlowTwoBody: 'Separate stable principle, product fact, source, and release change.', updateFlowThree: 'Evidence', updateFlowThreeBody: 'Record source, scope, owner, hash, and next review.', updateFlowFour: 'Validate', updateFlowFourBody: 'Run the focused validator and an independent review.', updateMapLinkTitle: 'Update map', updateMapLinkBody: 'What changes where, and what evidence it needs.', updateRegistryLinkTitle: 'Update registry', updateRegistryLinkBody: 'The machine-readable maintenance contract.', factImpactLinkTitle: 'Fact impact map', factImpactLinkBody: 'Which chapters, labs, Skills, evals, and pages a changing fact can affect.', updateTemplateLinkTitle: 'Update record', updateTemplateLinkBody: 'A repeatable record for non-trivial changes.', lifecycleLinkTitle: 'Content lifecycle', lifecycleLinkBody: 'The evidence and release gates.',
    statusEyebrow: 'Evidence boundary', statusTitle: 'A status is a claim about evidence.', statusIntro: 'This project does not turn document count, Skill count, or one successful output into “mastery.” Use the status that the evidence supports.', statusDraft: 'Still being written or missing the minimum check.', statusCandidate: 'Structure and basic checks pass; fresh evidence is still needed.', statusVerified: 'The declared scope has positive, boundary, failure, and transfer evidence.', statusProduction: 'Safety, maintenance, version, license, and release gates also pass.', statusSourceBefore: 'Current evidence is recorded in', statusSourceLink: 'the current status source', statusReviewBefore: ' and explained by ', statusReviewLink: 'the current-state review', statusSourceAfter: '; the page itself remains candidate until browser review is recorded.', nextEyebrow: 'Next action', nextTitle: 'Bring one small problem.', nextBody: 'Open the task contract, choose a reversible first step, and keep the diff. That is the shortest useful way to begin.', nextPrimary: 'Open chapter 2', nextSecondary: 'Then run lab 001', footerTagline: 'A practical learning and practice system for Codex.'
  },
  zh: {
    skipToContent: '跳到主要内容', wordmarkAria: 'Codex：从第一个任务到真实工作的首页', languageToggleAria: '切换为英文', menuAria: '打开导航', navAria: '主导航', heroIndexAria: '页面索引', pathAria: '七级学习路径', routesAria: '筛选章节路线', menu: '菜单', navStart: '从问题开始', navFirst30: '前 30 分钟', navPath: '学习路径', navIndex: '项目索引', navRoutes: '阅读路线', navLabs: '实验室', navSkills: 'Skills', navUpdates: '更新地图',
    heroIndex: 'CODEX / 学习系统', heroEyebrow: 'Codex 学习与实践 · candidate', heroTitle: '用 Codex 做成真实工作。', heroLede: '弄清 GPT、Codex、模型、工具、Skill 与 Agent 各自做什么。用小任务练习，留下证据，再进入真实工作流。', heroPrimary: '从一个真实问题开始', heroSecondary: '浏览 22 章', heroNoteAria: '项目状态', heroNoteLabel: '当前基线', heroNoteBody: '项目结构为 candidate。实验仍为 draft，尚未完成实际运行验证。', heroNoteLink: '查看证据边界', heroFooter: '问题 → 协议 → 行动 → 证据',
    startEyebrow: '从问题开始', startTitle: '不要从 Skill 开始。', startIntro: '先说清楚你要避免的失败或要完成的工作。选择最小有效入口，然后留下证据。', problemStartTitle: '我不知道从哪里开始。', problemStartBody: '在选择工作流前，先分清 GPT、Codex、模型、工具、Skill 与 Agent。', problemStartLink: '打开第 1 章 ↗', problemWrongFileTitle: 'Codex 改错了文件。', problemWrongFileBody: '在相信完成声明前，检查范围、差异、测试与恢复方式。', problemWrongFileLink: '打开第 9 章 ↗', problemSkillTitle: '我不知道该用哪个 Skill。', problemSkillBody: '按任务、风险、输入、依赖和证据选择，不按目录大小选择。', problemSkillLink: '运行实验 004 ↗', problemUpdateTitle: '我需要安全地更新项目。', problemUpdateBody: '用固定更新地图找到规范文件、来源记录和验证门槛。', problemUpdateLink: '打开更新地图 ↗',
    first30Eyebrow: '前 30 分钟', first30Title: '完成一个小任务。', first30Intro: '使用一次性的或可回滚的项目。目标不是得到漂亮答案，而是完成一个可以检查的闭环。', stepOneTitle: '选择可回滚的改动。', stepOneBody: '使用沙盒文件或小型文档修改。不要从凭据、生产环境或破坏性命令开始。', stepTwoTitle: '写任务协议。', stepTwoBody: '写清目标、上下文、允许行动、验收标准、证据和停止条件。', stepThreeTitle: '让 Codex 先检查。', stepThreeBody: '允许修改前，先让它说明相关文件和当前状态，保持范围可见。', stepFourTitle: '验证实际变化。', stepFourBody: '检查差异，运行最小相关检查，并记录没有测试什么。', checkCardLabel: '一个有用的任务协议', fieldGoalLabel: '目标', fieldGoal: '完成一个明确的改动。', fieldContextLabel: '上下文', fieldContext: '只提供完成任务所需的文件。', fieldInputsLabel: '输入', fieldInputs: '路径、当前行为、约束。', fieldAllowedLabel: '允许行动', fieldAllowed: '读取和编辑；外部副作用前暂停。', fieldAcceptanceLabel: '验收', fieldAcceptance: '明确的差异和检查结果。', fieldEvidenceLabel: '证据', fieldEvidence: '差异、命令、输出和限制。', fieldStopLabel: '停止条件', fieldStop: '范围、授权或证据缺失。', openChapterTwo: '打开第 2 章',
    protocolEyebrow: '工作框架', protocolTitle: '每个严肃任务都需要边界。', protocolIntro: '这是人与模型、工具和 Agent 之间的共同语言。在增加权限或 Skill 前先使用它。', protocolLink: '阅读任务协议', protocolNote: '如果缺失输入会改变范围、风险或验收测试，就暂停并询问。如果只影响低风险读取，可以先检查并报告假设。', protocolRuleOne: '定义', protocolRuleTwo: '行动', protocolRuleThree: '验证', protocolRuleFour: '交接',
    pathEyebrow: '学习路径', pathTitle: '七个等级，一份可执行契约。', pathIntro: '选择一个等级，直接看到要读什么、做什么、使用什么、提交什么，以及哪些结论不能声称。等级不是阅读数量。', currentLevel: '当前等级', nextStep: '下一步', requiredChapters: '必读章节', requiredLabs: '必做实验', supportingSkills: '支撑 Skill', evaluationFixtures: '评测夹具', evidenceGate: '证据门槛', graduationGate: '进入下一阶段前', blockedWhen: '遇到这些情况先停止', positive: '正例', boundary: '边界例', failure: '失败例', transfer: '迁移例', fourEvidence: '四类证据', evidenceExplain: '解释', evidenceOperate: '操作', evidenceJudge: '判断', evidenceReview: '审查', levelL0Name: '观察者', levelL0Short: '知道发生了什么', levelL1Name: '安全使用者', levelL1Short: '完成低风险任务', levelL2Name: '任务设计者', levelL2Short: '写出任务协议', levelL3Name: '工作流设计者', levelL3Short: '从定义走到交付', levelL4Name: '能力构建者', levelL4Short: '选择最小有效组合', levelL5Name: '证据审查者', levelL5Short: '检验完成声明', levelL6Name: '团队教练', levelL6Short: '把方法变成系统',
    chaptersEyebrow: '阅读路线', chaptersTitle: '22 章，四种进入方式。', chaptersIntro: '顺读建立心智模型；被真实任务卡住时按路线跳读。每条路线都会回到练习和证据。', filterAll: '全部章节', filterA: 'A · 初识 Codex', filterB: 'B · 真实工作', filterC: 'C · 能力扩展', filterD: 'D · 团队实践', routeATitle: '第一次接触 Codex', routeADesc: '01—06 · 完成第一个安全任务', routeBTitle: '把 Codex 用于真实工作', routeBDesc: '07—13 · 设计可验证工作流', routeCTitle: '能力与 Agent 协作', routeCDesc: '14—18 · 选择最小有效组合', routeDTitle: '从熟练到团队实践', routeDDesc: '19—22 · 把个人方法变成团队能力', candidateStatus: 'candidate', chapter01: '先理解 GPT，再理解 Codex', chapter02: '完成安全、可验证的任务', chapter03: '把愿望变成任务协议', chapter04: '上下文、权限与 Agent 边界', chapter05: '选择正确的 Codex 工作面', chapter06: '模型选择不是模型崇拜', chapter07: 'Skill、Plugin、MCP 与工具如何分工', chapter08: '从定义到交付的完整生命周期', chapter09: '验证、怀疑与恢复', chapter10: '规划与竖向切片', chapter11: '设计一个真正有用的 Skill', chapter12: 'Agent 的循环、状态与停止条件', chapter13: '文件、终端、浏览器与 GitHub 的行动边界', chapter14: '发现、安装和审查外部 Skill', chapter15: '研究：从问题到可审查知识', chapter16: '工程：从想法到可靠软件', chapter17: '营销：从产品理解到增长实验', chapter18: '内容、设计、数据与自动化', chapter19: '评估模型和工作流', chapter20: '建立个人 Codex 工作系统', chapter21: '建立团队能力系统', chapter22: '保持系统更新并可恢复',
    labsEyebrow: '实验室', labsTitle: '把原理变成可观察的动作。', labsIntro: '实验是低风险、可复现的任务。每个实验都写清设置、证据、失败变体、秘密边界和复盘。', draftStatus: 'draft', startingLab: '起点实验', lab01Title: '第一个安全任务', lab01Body: '在沙盒项目中，让 Codex 先检查再编辑，把“完成了”变成可检查的差异。', lab02Title: '任务协议', lab02Body: '把模糊请求拆成目标、输入、约束、验收和失败处理。', lab03Title: '证据审查', lab03Body: '发现一个看似完成却没有证据支撑声明的结果。', lab04Title: 'Skill 选择', lab04Body: '解释选择理由，拒绝用目录大小代替适配判断。', lab05Title: '设计一个 Skill', lab05Body: '把稳定方法变成有边界、有证据、有失败案例的能力包。', lab06Title: 'Agent 停止条件', lab06Body: '为成功、缺失输入、可恢复失败和权限冲突定义停点。', lab07Title: '行动边界', lab07Body: '比较读取、编辑、运行、提交、推送和发布需要的证据。', lab08Title: '研究问题', lab08Body: '把宽泛主题变成问题、来源计划和最小证据表。', lab09Title: '工程生命周期', lab09Body: '比较直接实现与完整生命周期，并记录返工证据。', lab10Title: '共享产品上下文', lab10Body: '版本化共享产品理解，并区分事实与假设。', lab11Title: 'GPT 与 Codex 边界', lab11Body: '用静态任务卡分清生成、执行、验证和外部副作用。', lab12Title: '团队能力迁移', lab12Body: '为版本、负责人、权限、独立复现和回滚建立契约。', labsIndexLink: '打开实验规则和全部 13 个入口',
    skillsEyebrow: '能力层', skillsTitle: '七个 Skill，七种职责。', skillsIntro: 'Skill 是带触发器、输入检查、边界、停止条件、输出契约和验证方式的方法包。', skillCoach: '选择学习路径和练习边界。', skillProtocol: '把模糊请求变成可执行契约。', skillEvidence: '把完成声明拆成可检查证据。', skillSelector: '选择最小有效能力组合。', skillWorkflow: '管理阶段、检查点和交接。', skillResearch: '把问题收敛为可审查知识。', skillContext: '分开稳定原则和易变事实。', skillFootnote: '7 个项目 Skill 均通过结构检查并暂列 candidate；目前只有 3 个完成独立上下文基础前测。',
    troubleEyebrow: '出错时', troubleTitle: '失败也是课程的一部分。', troubleIntro: '先做最有用的检查；授权、范围或证据缺失时就停止。不要用漂亮总结掩盖失败。', troubleOneTitle: '输出看起来是对的。', troubleOneBody: '检查原始声明、变化文件、命令结果，以及没有测试什么。', troubleOneLink: '使用证据审查 ↗', troubleTwoTitle: 'Agent 一直重试。', troubleTwoBody: '记录同一失败，改变一个诊断条件，然后重试一次或升级处理。', troubleTwoLink: '阅读停止条件 ↗', troubleThreeTitle: '来源要求你做某件事。', troubleThreeBody: '把外部文本和工具输出当作数据，它们不会授予行动权限。', troubleThreeLink: '检查边界 ↗', troubleFourTitle: '产品步骤发生变化。', troubleFourBody: '先刷新官方事实记录，再更新受影响的章节或页面。', troubleFourLink: '遵循更新地图 ↗',
    updatesEyebrow: '维护框架', updatesTitle: '每次更新都有固定位置。', updatesIntro: '更新地图让未来维护更省时：找到规范文件，收集正确证据，运行正确检查，并保留未验证边界。', updateFlowOne: '定位', updateFlowOneBody: '找到注册表行和规范路径。', updateFlowTwo: '分类', updateFlowTwoBody: '分开稳定原则、产品事实、来源和发布变化。', updateFlowThree: '取证', updateFlowThreeBody: '记录来源、范围、负责人、哈希和下次复核。', updateFlowFour: '验证', updateFlowFourBody: '运行专用验证器并进行独立复核。', updateMapLinkTitle: '更新地图', updateMapLinkBody: '什么变化应该去哪里，以及需要什么证据。', updateRegistryLinkTitle: '更新注册表', updateRegistryLinkBody: '机器可读的维护契约。', factImpactLinkTitle: '事实影响图', factImpactLinkBody: '一条事实变化会影响哪些章节、实验、Skill、评测和页面。', updateTemplateLinkTitle: '更新记录模板', updateTemplateLinkBody: '记录非简单更新的可重复模板。', lifecycleLinkTitle: '内容生命周期', lifecycleLinkBody: '证据和发布门槛。',
    statusEyebrow: '证据边界', statusTitle: '状态是关于证据的声明。', statusIntro: '本项目不把文档数量、Skill 数量或一次成功输出当作“掌握”。使用证据真正支持的状态。', statusDraft: '仍在编写，或尚未完成最低检查。', statusCandidate: '结构和基本检查通过，但仍需要新鲜证据。', statusVerified: '在声明范围内具备正例、边界例、失败例和迁移证据。', statusProduction: '安全、维护、版本、许可证和发布门槛也全部通过。', statusSourceBefore: '当前证据记录在', statusSourceLink: '当前状态源', statusReviewBefore: '，说明见', statusReviewLink: '当前状态审查记录', statusSourceAfter: '；在浏览器验收记录前，页面自身仍为 candidate。', nextEyebrow: '下一步', nextTitle: '带一个小问题来。', nextBody: '打开任务协议，选择可回滚的第一步并保留差异。这是最短的有效起点。', nextPrimary: '打开第 2 章', nextSecondary: '然后运行实验 001', footerTagline: '一套面向 Codex 的实用学习与实践系统。'
  }
};

// The generated contract is the source of truth; this fallback keeps a direct file open usable during local edits.
const legacyLearningPath = {
  L0: { title: ['Observe, do not guess.', '观察，而不是猜测。'], description: ['Separate GPT, models, Codex, context, tools, Skills, and Agents. Start with observable inputs, actions, states, and evidence.', '先分清 GPT、模型、Codex、上下文、工具、Skill 与 Agent。学习从可观察的输入、行动、状态和证据开始。'], chapters: [['Chapter 1: Understand GPT before Codex', '第 1 章：先理解 GPT，再理解 Codex', '../book/chapters/01-gpt-and-codex-EN.md']], labs: [['Lab 011 · GPT and Codex boundaries', '实验 011 · GPT 与 Codex 边界', '../book/labs/lab-011-gpt-codex-boundaries-EN.md']], skills: [['Codex Coach', 'Codex Coach', '../skills/prysai-codex-coach/SKILL.md']], evaluations: ['concept-gpt-codex-tools-001'], evaluationTypes: ['positive', 'boundary'], gate: { explain: ['Name at least three boundaries between GPT, Codex, and ordinary chat.', '说出 GPT、Codex 与普通聊天之间至少三条边界。'], operate: ['Label input, action, state, and evidence on a static task card.', '在静态任务卡上标注输入、行动、状态和证据。'], judge: ['Refuse to infer access from a model or tool name.', '不根据模型或工具名称臆测访问权。'], review: ['Record what the task card cannot prove about runtime behavior.', '记录任务卡无法证明的运行时行为。'] }, graduation: ['Advance only when the learner can explain the four layers and identify an unverified claim.', '只有能解释四层关系并指出一个未验证声明时，才进入下一阶段。'], blocked: ['The learner treats a model, Skill, login, or tool name as proof of access or execution.', '把模型、Skill、登录或工具名称当成已获访问权或已执行的证据。'], status: 'candidate', next: ['Open chapter 1', '打开第 1 章'] },
  L1: { title: ['Start with a low-risk task.', '从低风险任务开始。'], description: ['Choose a reversible, observable task. Write the allowed actions and confirmation points, then complete a real but controlled delivery.', '选择可回滚、可观察的任务，写下允许行动和确认点，完成一个真实但受控的交付。'], chapters: [['Chapter 2: Complete a safe, verifiable task', '第 2 章：完成安全、可验证的任务', '../book/chapters/02-first-safe-task-EN.md']], labs: [['Lab 001 · First safe task', '实验 001 · 第一个安全任务', '../book/labs/lab-001-first-safe-task-EN.md']], skills: [['Task Protocol', 'Task Protocol', '../skills/prysai-task-protocol/SKILL.md']], evaluations: ['concept-evidence-and-mastery-002', 'protocol-vague-request-003', 'missing-input-no-file-021'], evaluationTypes: ['positive', 'boundary', 'failure'], gate: { explain: ['State the scope, allowed actions, acceptance check, and stop condition.', '说清范围、允许行动、验收检查和停止条件。'], operate: ['Inspect before editing in a sandbox and produce one named change.', '在沙盒中先检查再编辑，完成一个明确改动。'], judge: ['Compare the requested result with the actual diff and command output.', '将请求结果与实际差异、命令输出进行对照。'], review: ['Record untested scope and missing input instead of filling it in.', '记录未测试范围和缺失输入，不擅自补全。'] }, graduation: ['Advance with a task contract, pre-edit observation, diff, focused check, and explicit unverified list.', '提交任务协议、编辑前检查、差异、最小检查和明确的未验证列表后，才进入下一阶段。'], blocked: ['The task touches credentials, production, destructive actions, or an unavailable file.', '任务涉及凭据、生产环境、破坏性行动或不存在的文件。'], status: 'candidate', next: ['Open chapter 2', '打开第 2 章'] },
  L2: { title: ['Turn the wish into a protocol.', '把愿望写成协议。'], description: ['Write the goal, context, inputs, constraints, acceptance, failure handling, and delivery format so boundaries come before action.', '把目标、上下文、输入、约束、验收、失败处理与交付格式写清楚，让行动边界先于行动发生。'], chapters: [['Chapter 3 · Task protocol', '第 3 章 · 任务协议', '../book/chapters/03-task-protocol-EN.md'], ['Chapter 4 · Context and permissions', '第 4 章 · 上下文与权限', '../book/chapters/04-context-permissions-and-agent-EN.md'], ['Chapter 5 · Choose the surface', '第 5 章 · 选择工作面', '../book/chapters/05-choose-the-codex-surface-EN.md'], ['Chapter 6 · Model selection', '第 6 章 · 模型选择', '../book/chapters/06-model-selection.md']], labs: [['Lab 002 · Task protocol', '实验 002 · 任务协议', '../book/labs/lab-002-task-protocol-EN.md']], skills: [['Task Protocol', 'Task Protocol', '../skills/prysai-task-protocol/SKILL.md'], ['Codex Coach', 'Codex Coach', '../skills/prysai-codex-coach/SKILL.md']], evaluations: ['protocol-reversible-first-step-004', 'skill-minimal-selection-005', 'context-minimum-relevant-007', 'permission-least-authority-009', 'evidence-runtime-vs-build-012', 'research-narrow-question-013', 'marketing-product-context-017', 'conversion-markdown-to-json-019', 'missing-input-auth-choice-022', 'conflict-source-vs-user-024', 'route-explicit-over-implicit-031', 'product-context-fact-hypothesis-034'], evaluationTypes: ['positive', 'boundary', 'failure'], gate: { explain: ['Explain why each input, constraint, and permission is necessary or excluded.', '解释每个输入、约束和权限为什么必要，或为什么排除。'], operate: ['Write and execute a small protocol without expanding scope.', '写出并执行一个小协议，不扩大允许范围。'], judge: ['Choose the smallest relevant context, Skill, tool, and check.', '选择最小相关上下文、Skill、工具和检查。'], review: ['Handle missing input, conflicting instructions, and evidence gaps.', '处理缺失输入、冲突指令和证据缺口。'] }, graduation: ['Advance when another person can execute the protocol and identify its stop conditions without guessing.', '当另一个人无需猜测就能执行协议并指出停止条件时，才进入下一阶段。'], blocked: ['A missing input changes scope, risk, authority, or acceptance and no confirmation is available.', '缺失输入会改变范围、风险、授权或验收，而又没有确认。'], status: 'candidate', next: ['Open chapter 3', '打开第 3 章'] },
  L3: { title: ['Make the workflow runnable and checkable.', '让工作流可运行、可检查。'], description: ['Organize work as define, plan, execute, verify, review, deliver, and maintain. Use vertical slices to keep evidence moving.', '沿着定义、计划、执行、验证、审查、交付和维护组织任务，用竖向切片持续产出证据。'], chapters: [['Chapter 8 · Full lifecycle', '第 8 章 · 完整生命周期', '../book/chapters/08-full-lifecycle-workflow.md'], ['Chapter 9 · Verification and recovery', '第 9 章 · 验证与恢复', '../book/chapters/09-verification-and-recovery.md'], ['Chapter 13 · Action boundaries', '第 13 章 · 行动边界', '../book/chapters/13-action-boundaries.md']], labs: [['Lab 009 · Engineering lifecycle', '实验 009 · 工程生命周期', '../book/labs/lab-009-engineering-lifecycle.md'], ['Lab 003 · Evidence review', '实验 003 · 证据审查', '../book/labs/lab-003-evidence-review.md'], ['Lab 007 · Action boundaries', '实验 007 · 行动边界', '../book/labs/lab-007-action-boundaries-EN.md']], skills: [['Workflow Orchestrator', 'Workflow Orchestrator', '../skills/prysai-workflow-orchestrator/SKILL.md'], ['Evidence Review', 'Evidence Review', '../skills/prysai-evidence-review/SKILL.md'], ['Task Protocol', 'Task Protocol', '../skills/prysai-task-protocol/SKILL.md']], evaluations: ['skill-risk-aware-selection-006', 'context-untrusted-instructions-008', 'permission-destructive-data-010', 'evidence-claim-audit-011', 'research-source-conflict-014', 'engineering-plan-small-change-015', 'marketing-experiment-plan-018', 'conversion-table-to-learning-path-020', 'conflict-scope-vs-safety-023', 'failure-retry-budget-025', 'stop-missing-authority-027', 'stop-evidence-gap-028', 'route-ownership-boundaries-032', 'product-context-write-gate-033', 'evidence-scope-insufficient-stop-035', 'source-conflict-license-boundary-036'], evaluationTypes: ['positive', 'boundary', 'failure', 'transfer'], gate: { explain: ['Explain the dependency graph, stage boundaries, permission changes, and acceptance evidence.', '解释依赖图、阶段边界、权限变化和验收证据。'], operate: ['Run a vertical slice from definition to verification with an explicit checkpoint.', '用明确检查点跑通从定义到验证的一条竖向切片。'], judge: ['Stop or recover when authority, scope, source, or evidence is insufficient.', '授权、范围、来源或证据不足时，正确停止或恢复。'], review: ['Compare the plan, diff, logs, checks, failed attempt, and remaining limits.', '对照计划、差异、日志、检查、失败尝试和剩余限制。'] }, graduation: ['Advance with one complete workflow, one intentional failure or boundary case, and a transfer task in another domain.', '完成一条完整工作流、一个故意失败或边界案例，以及另一个领域的迁移任务后，才进入下一阶段。'], blocked: ['The workflow relies on hidden permissions, untrusted instructions, unrecorded retries, or a claim outside its evidence.', '工作流依赖隐藏权限、不可信指令、未记录的重试，或结论超出证据范围。'], status: 'candidate', next: ['Open chapter 8', '打开第 8 章'] },
  L4: { title: ['Choose the smallest useful capability.', '只选择最小有效能力。'], description: ['Choose Skills, tools, and surfaces by goal, lifecycle, risk, and dependency. “Install everything” is not a reason.', '按目标、生命周期、风险与依赖选择 Skill、工具和工作面；“全部安装”不是充分理由。'], chapters: [['Chapter 7 · Skills, Plugins, MCP, and tools', '第 7 章 · Skill、Plugin、MCP 与工具', '../book/chapters/07-skills-plugins-and-tools.md'], ['Chapter 11 · Design a Skill', '第 11 章 · 设计一个 Skill', '../book/chapters/11-designing-a-skill.md'], ['Chapter 14 · Audit an external Skill', '第 14 章 · 审查外部 Skill', '../book/chapters/14-discover-and-audit-skills.md']], labs: [['Lab 004 · Skill selection', '实验 004 · Skill 选择', '../book/labs/lab-004-skill-selection.md'], ['Lab 005 · Design a Skill', '实验 005 · 设计一个 Skill', '../book/labs/lab-005-design-a-skill.md'], ['Lab 008 · Research question', '实验 008 · 研究问题', '../book/labs/lab-008-research-question.md']], skills: [['Skill Selector', 'Skill Selector', '../skills/prysai-skill-selector/SKILL.md'], ['Research Router', 'Research Router', '../skills/prysai-research-router/SKILL.md']], evaluations: ['engineering-plan-regression-016', 'failure-scope-escalation-026', 'skill-install-confirmation-rollback-037'], evaluationTypes: ['positive', 'boundary', 'failure', 'transfer'], gate: { explain: ['Explain why each selected capability earns its place and what it does not cover.', '解释每个被选能力为什么值得使用，以及它不覆盖什么。'], operate: ['Use the minimum useful combination and preserve an installation or rollback record.', '使用最小有效组合，并保留安装或回滚记录。'], judge: ['Compare fit, dependency, permission, license, maintenance, and verification cost.', '比较适配、依赖、权限、许可证、维护和验证成本。'], review: ['Test a positive case, a boundary case, a failure case, and a transfer case before calling a Skill reliable.', '在称为可靠前，测试正例、边界例、失败例和迁移例。'] }, graduation: ['Advance when a reusable Skill or capability choice has a bounded contract, rollback path, and four-case evaluation plan.', '当可复用 Skill 或能力选择具备边界契约、回滚路径和四类案例评测计划时，才进入下一阶段。'], blocked: ['The choice is justified only by popularity, directory size, or an unverified performance claim.', '选择理由只有流行度、目录大小或未经验证的性能断言。'], status: 'candidate', next: ['Open chapter 7', '打开第 7 章'] },
  L5: { title: ['A completion claim needs evidence.', '完成声明必须有证据。'], description: ['Break “done” into checkable claims. Separate verified, partial, unverified, and unknowable, then name evidence for each claim.', '将“完成了”拆成可检查的断言，区分已验证、部分完成、未验证与无法判断，并为每项声明指定证据。'], chapters: [['Chapter 12 · Agent loop and stop', '第 12 章 · Agent 循环与停止', '../book/chapters/12-agent-loop-and-stop.md'], ['Chapter 19 · Evaluate models and workflows', '第 19 章 · 评估模型和工作流', '../book/chapters/19-evaluate-models-and-workflows.md']], labs: [['Lab 006 · Agent stop conditions', '实验 006 · Agent 停止条件', '../book/labs/lab-006-agent-stop-conditions.md'], ['Lab 003 · Evidence review', '实验 003 · 证据审查', '../book/labs/lab-003-evidence-review.md']], skills: [['Evidence Review', 'Evidence Review', '../skills/prysai-evidence-review/SKILL.md'], ['Workflow Orchestrator', 'Workflow Orchestrator', '../skills/prysai-workflow-orchestrator/SKILL.md']], evaluations: ['team-capability-package-029', 'workflow-checkpoint-gate-038'], evaluationTypes: ['positive', 'boundary', 'failure', 'transfer'], gate: { explain: ['Explain observable states, retry budgets, stop conditions, and the difference between output and proof.', '解释可观察状态、重试预算、停止条件，以及输出与证明的区别。'], operate: ['Run a bounded comparison or review with fixed inputs, checkpoints, and logs.', '用固定输入、检查点和日志完成一次有边界的对照或审查。'], judge: ['Classify claims as verified, partial, unverified, disputed, or unknowable within scope.', '在声明范围内把结论分类为已验证、部分完成、未验证、有争议或无法判断。'], review: ['Produce an independent review that names evidence, gaps, limits, and the next smallest check.', '产出独立审查，指出证据、缺口、限制和下一个最小检查。'] }, graduation: ['Advance with a fixed evaluation record and an independent review that refuses to overclaim.', '提交固定评测记录和拒绝过度断言的独立审查后，才进入下一阶段。'], blocked: ['There are no fixed inputs, no run log, no independent reviewer, or the evidence cannot support the claim.', '缺少固定输入、运行日志、独立复核，或证据无法支持声明。'], status: 'candidate', next: ['Open chapter 12', '打开第 12 章'] },
  L6: { title: ['Turn personal method into team capability.', '把个人方法沉淀为团队能力。'], description: ['Share context, Skills, evaluations, review, versioning, and contribution rules so the method can be reused and rechecked.', '共享上下文、Skill、评测、审查、版本与贡献规范，让能力可复用，也能在产品变化后重新审查。'], chapters: [['Chapter 20 · Personal work system', '第 20 章 · 个人工作系统', '../book/chapters/20-personal-codex-work-system.md'], ['Chapter 21 · Team capability system', '第 21 章 · 团队能力系统', '../book/chapters/21-team-capability-system.md'], ['Chapter 22 · Continuous update', '第 22 章 · 持续更新', '../book/chapters/22-continuous-update-and-future-proofing.md']], labs: [['Lab 012 · Team capability migration', '实验 012 · 团队能力迁移', '../book/labs/lab-012-team-capability-migration.md'], ['Lab 010 · Shared product context', '实验 010 · 共享产品上下文', '../book/labs/lab-010-product-context.md']], skills: [['Product Context', 'Product Context', '../skills/prysai-product-context/SKILL.md'], ['Codex Coach', 'Codex Coach', '../skills/prysai-codex-coach/SKILL.md']], evaluations: ['team-capability-migration-030'], evaluationTypes: ['positive', 'boundary', 'failure', 'transfer'], gate: { explain: ['Explain ownership, versioning, permissions, source boundaries, maintenance triggers, and rollback.', '解释负责人、版本、权限、来源边界、维护触发器和回滚。'], operate: ['Migrate one personal method into a team-readable package without exposing secrets.', '把一个个人方法迁移为团队可读的能力包，不暴露秘密。'], judge: ['Separate stable principles, volatile facts, hypotheses, runtime evidence, and release claims.', '分开稳定原则、易变事实、假设、运行时证据和发布声明。'], review: ['Run an independent reproduction or rollback review and record what remains unverified.', '完成独立复现或回滚审查，并记录仍未验证的部分。'] }, graduation: ['This is the terminal level: keep the package current, reproducible, and recoverable.', '这是终点等级：保持能力包当前、可复现、可恢复。'], blocked: ['The method depends on one person, hidden credentials, unclear licensing, or an ownerless update path.', '方法依赖某一个人、隐藏凭据、许可证不清或没有负责人的更新路径。'], status: 'candidate', next: ['Open chapter 21', '打开第 21 章'] }
};
// Keep the legacy fallback aligned with the canonical English source paths.
legacyLearningPath.L2.chapters[3][2] = '../book/chapters/06-model-selection-EN.md';
const generatedLearningPath = window.CODEX_LEARNING_PATH?.levels;
const learningPathLevels = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
const hasGeneratedLearningPath = Boolean(generatedLearningPath) && learningPathLevels.every((level) => generatedLearningPath[level]);
const learningPath = hasGeneratedLearningPath ? generatedLearningPath : legacyLearningPath;

Object.assign(copy.en, {
  navPath: 'Learning path',
  heroPrimary: 'Start a 30-minute safe task',
  heroSecondary: 'Choose a learning level',
  routeStatusAll: 'Showing all 22 chapters.',
  routeStatusA: 'Showing 6 chapters in A · First contact.',
  routeStatusB: 'Showing 7 chapters in B · Real work.',
  routeStatusC: 'Showing 5 chapters in C · Capability.',
  routeStatusD: 'Showing 4 chapters in D · Team practice.',
  labsIndexLink: 'Open the lab rules and all 13 entries',
  featuredLab: 'featured lab',
  lab13Title: 'Auditable vertical slice',
  lab13Body: 'Run one local Markdown change from protocol and baseline to checkpoint, diff, focused check, failure, and transfer.',
  learningPathWarning: 'Learning-path data did not load. Showing the local fallback; verify the generated data before relying on this route.',
  skillCoachName: 'Codex Coach',
  skillProtocolName: 'Task Protocol',
  skillEvidenceName: 'Evidence Review',
  skillSelectorName: 'Skill Selector',
  skillWorkflowName: 'Workflow Orchestrator',
  skillResearchName: 'Research Router',
  skillContextName: 'Product Context',
  statusReviewLink: 'the scoped browser review',
  statusSourceAfter: '; the page remains candidate because this review covers only the recorded local scope.'
});
Object.assign(copy.zh, {
  navPath: '\u5b66\u4e60\u8def\u5f84',
  heroPrimary: '\u5f00\u59cb\u4e00\u4e2a 30 \u5206\u949f\u7684\u5b89\u5168\u4efb\u52a1',
  heroSecondary: '\u9009\u62e9\u5b66\u4e60\u7b49\u7ea7',
  routeStatusAll: '\u6b63\u5728\u663e\u793a\u5168\u90e8 22 \u7ae0\u3002',
  routeStatusA: '\u6b63\u5728\u663e\u793a A \u00b7 \u521d\u8bc6 Codex \u7684 6 \u7ae0\u3002',
  routeStatusB: '\u6b63\u5728\u663e\u793a B \u00b7 \u771f\u5b9e\u5de5\u4f5c\u7684 7 \u7ae0\u3002',
  routeStatusC: '\u6b63\u5728\u663e\u793a C \u00b7 \u80fd\u529b\u6269\u5c55\u7684 5 \u7ae0\u3002',
  routeStatusD: '\u6b63\u5728\u663e\u793a D \u00b7 \u56e2\u961f\u5b9e\u8df5\u7684 4 \u7ae0\u3002',
  labsIndexLink: '\u6253\u5f00\u5b9e\u9a8c\u89c4\u5219\u548c\u5168\u90e8 13 \u4e2a\u5165\u53e3',
  featuredLab: '\u7cbe\u9009\u5b9e\u9a8c',
  lab13Title: '\u53ef\u5ba1\u8ba1\u7684\u7ad6\u5411\u5207\u7247',
  lab13Body: '\u5728\u672c\u5730 Markdown \u4efb\u52a1\u4e2d\uff0c\u4ece\u534f\u8bae\u548c\u57fa\u7ebf\u5f00\u59cb\uff0c\u8d70\u5b8c\u68c0\u67e5\u70b9\u3001\u5dee\u5f02\u3001\u6700\u5c0f\u68c0\u67e5\u3001\u5931\u8d25\u4e0e\u8fc1\u79fb\u3002',
  learningPathWarning: '\u5b66\u4e60\u8def\u5f84\u6570\u636e\u672a\u52a0\u8f7d\u3002\u5f53\u524d\u663e\u793a\u672c\u5730\u56de\u9000\u6570\u636e\uff0c\u8bf7\u5148\u6838\u5bf9\u751f\u6210\u6570\u636e\u518d\u4f9d\u8d56\u8fd9\u6761\u8def\u5f84\u3002',
  skillCoachName: 'Codex \u5b66\u4e60\u6559\u7ec3',
  skillProtocolName: '\u4efb\u52a1\u534f\u8bae Task Protocol',
  skillEvidenceName: '\u8bc1\u636e\u5ba1\u67e5 Evidence Review',
  skillSelectorName: 'Skill \u9009\u62e9\u5668 Skill Selector',
  skillWorkflowName: '\u5de5\u4f5c\u6d41\u7f16\u6392 Workflow Orchestrator',
  skillResearchName: '\u7814\u7a76\u8def\u7531 Research Router',
  skillContextName: '\u4ea7\u54c1\u4e0a\u4e0b\u6587 Product Context',
  statusReviewLink: '\u672c\u6b21\u8303\u56f4\u5316\u6d4f\u89c8\u5668\u9a8c\u6536',
  statusSourceAfter: '\uff1b\u672c\u6b21\u9a8c\u6536\u53ea\u8986\u76d6\u8bb0\u5f55\u7684\u672c\u5730\u8303\u56f4\uff0c\u9875\u9762\u4ecd\u4fdd\u6301 candidate\u3002'
});

Object.assign(copy.en, {
  heroBriefAria: 'Project at a glance',
  briefMapTitle: 'Project index', briefMapBody: 'Files, roles, and entry points',
  briefStatusTitle: 'Evidence ledger', briefStatusBody: 'candidate · draft · not run',
  briefLanguageTitle: 'Six-language route', briefLanguageBody: '6 entry slices · UI EN / 中文',
  briefResearchTitle: 'Field problems', briefResearchBody: 'User reports, bounded evidence',
  indexEyebrow: 'Project index', indexTitle: 'Know where each claim lives.', indexIntro: 'This is a human-readable map of the repository: what each layer stores, where to begin, and which source controls its status.',
  fileMapTitle: 'Repository map', fileMapIntro: 'Read the layer that matches the work. The public page is a guide; the files below are the source of truth.',
  fileSiteTitle: 'Public showcase', fileSiteBody: 'index.html, styles.css, app.js, and generated learning-path data.',
  fileChaptersTitle: 'Core learning text', fileChaptersBody: '22 chapters; current artifact status: candidate.',
  fileLabsTitle: 'Observable practice', fileLabsBody: '13 labs; current status: draft; run status: not_run.',
  fileSkillsTitle: 'Reusable methods', fileSkillsBody: '7 project Skills with triggers, boundaries, and evidence contracts.',
  fileDocsTitle: 'Governance and research', fileDocsBody: 'Status, sources, field reports, update rules, and quality records.',
  ledgerTitle: 'Content state', ledgerIntro: 'A compact reading of the current status source. Status describes evidence, not ambition.',
  ledgerProject: 'Project', ledgerChapters: 'Chapters · 22', ledgerLabs: 'Labs · 13', ledgerSkills: 'Skills · 7', ledgerResearch: 'Field research', ledgerResearchNote: 'user reports; not locally reproduced', ledgerSource: 'Open the current status source',
  localeTitle: 'Six-language route', localeIntro: 'Six repository entry locales are registered. The runtime showcase currently switches EN / 中文; the other entry slices are still in migration review.',
  localeEnglish: 'available · default', localeChinese: 'available · current toggle', localeSpanish: 'entry slice · UI not exposed', localeGerman: 'entry slice · UI not exposed', localeJapanese: 'entry slice · UI not exposed', localeKorean: 'entry slice · UI not exposed', localeRule: 'Route rule: translated artifacts carry a locale suffix and link to the same locale. This migration covers entry slices; it does not claim that the whole book or runtime UI is complete in six languages.',
  researchTitle: 'Real problems, with the boundary attached.', researchIntro: 'The research index turns public Codex issues and forum reports into symptoms, versions, safe checks, and teaching links. It does not claim an official root cause or local reproduction.', researchBoundary: 'user reports and community advice · no local reproduction recorded', researchIndexLink: 'Open the field-problems index', researchIndexBody: 'Codex, surfaces, handoffs, authentication, worktrees, and verification symptoms.', researchForumsLink: 'Read the forum case notes', researchForumsBody: 'Sandbox network allowlists, Windows spawn failures, approvals, encoding, and private paths.'
});

Object.assign(copy.zh, {
  heroBriefAria: '\u9879\u76ee\u901f\u89c8',
  briefMapTitle: '\u9879\u76ee\u7d22\u5f15', briefMapBody: '\u6587\u4ef6\u3001\u7528\u9014\u4e0e\u5165\u53e3',
  briefStatusTitle: '\u8bc1\u636e\u53f0\u8d26', briefStatusBody: 'candidate \u00b7 draft \u00b7 not run',
  briefLanguageTitle: '\u516d\u8bed\u79cd\u8def\u7ebf', briefLanguageBody: '6 \u4e2a\u5165\u53e3\u5207\u7247 \u00b7 UI \u4ec5 EN / \u4e2d\u6587',
  briefResearchTitle: '\u73b0\u5b9e\u95ee\u9898', briefResearchBody: '\u7528\u6237\u62a5\u544a\uff0c\u8bc1\u636e\u6709\u8fb9\u754c',
  indexEyebrow: '\u9879\u76ee\u7d22\u5f15', indexTitle: '\u5148\u77e5\u9053\u6bcf\u4e2a\u7ed3\u8bba\u653e\u5728\u54ea\u91cc\u3002', indexIntro: '\u8fd9\u662f\u4ed3\u5e93\u7684\u4eba\u7c7b\u53ef\u8bfb\u5730\u56fe\uff1a\u6bcf\u5c42\u5b58\u4ec0\u4e48\u3001\u4ece\u54ea\u91cc\u5f00\u59cb\uff0c\u4ee5\u53ca\u54ea\u4e2a\u6e90\u6587\u4ef6\u63a7\u5236\u72b6\u6001\u3002',
  fileMapTitle: '\u4ed3\u5e93\u5730\u56fe', fileMapIntro: '\u6309\u5de5\u4f5c\u7c7b\u578b\u8bfb\u5bf9\u5e94\u7684\u5c42\u3002\u516c\u5f00\u9875\u9762\u662f\u6307\u5357\uff0c\u4e0b\u9762\u7684\u6587\u4ef6\u624d\u662f\u4fe1\u606f\u6e90\u3002',
  fileSiteTitle: '\u516c\u5f00\u5c55\u793a', fileSiteBody: 'index.html\u3001styles.css\u3001app.js \u4e0e\u751f\u6210\u7684\u5b66\u4e60\u8def\u5f84\u6570\u636e\u3002',
  fileChaptersTitle: '\u6838\u5fc3\u6559\u7a0b\u6b63\u6587', fileChaptersBody: '22 \u7ae0\uff1b\u5f53\u524d\u6587\u4ef6\u72b6\u6001\uff1acandidate\u3002',
  fileLabsTitle: '\u53ef\u89c2\u5bdf\u7684\u5b9e\u8df5', fileLabsBody: '13 \u4e2a\u5b9e\u9a8c\uff1b\u5f53\u524d\u72b6\u6001\uff1adraft\uff1b\u8fd0\u884c\u72b6\u6001\uff1anot_run\u3002',
  fileSkillsTitle: '\u53ef\u590d\u7528\u65b9\u6cd5', fileSkillsBody: '7 \u4e2a\u9879\u76ee Skill\uff0c\u5305\u542b\u89e6\u53d1\u3001\u8fb9\u754c\u4e0e\u8bc1\u636e\u5951\u7ea6\u3002',
  fileDocsTitle: '\u6cbb\u7406\u4e0e\u7814\u7a76', fileDocsBody: '\u72b6\u6001\u3001\u6765\u6e90\u3001\u73b0\u5b9e\u95ee\u9898\u3001\u66f4\u65b0\u89c4\u5219\u4e0e\u8d28\u91cf\u8bb0\u5f55\u3002',
  ledgerTitle: '\u5185\u5bb9\u72b6\u6001', ledgerIntro: '\u5f53\u524d\u72b6\u6001\u6e90\u7684\u7b80\u8bfb\u7248\u3002\u72b6\u6001\u63cf\u8ff0\u8bc1\u636e\uff0c\u4e0d\u63cf\u8ff0\u613f\u666f\u3002',
  ledgerProject: '\u9879\u76ee', ledgerChapters: '\u7ae0\u8282 \u00b7 22', ledgerLabs: '\u5b9e\u9a8c \u00b7 13', ledgerSkills: 'Skill \u00b7 7', ledgerResearch: '\u73b0\u5b9e\u95ee\u9898\u7814\u7a76', ledgerResearchNote: '\u7528\u6237\u62a5\u544a\uff1b\u672c\u5730\u672a\u590d\u73b0', ledgerSource: '\u6253\u5f00\u5f53\u524d\u72b6\u6001\u6e90',
  localeTitle: '\u516d\u8bed\u79cd\u8def\u7ebf', localeIntro: '\u4ed3\u5e93\u5df2\u767b\u8bb0\u516d\u79cd\u5165\u53e3\u8bed\u8a00\u3002\u5f53\u524d\u5c55\u793a\u9875\u53ea\u80fd\u5207\u6362 EN / \u4e2d\u6587\uff1b\u5176\u4ed6\u5165\u53e3\u5207\u7247\u4ecd\u5728\u8fc1\u79fb\u5ba1\u67e5\u4e2d\u3002',
  localeEnglish: '\u53ef\u7528 \u00b7 \u9ed8\u8ba4', localeChinese: '\u53ef\u7528 \u00b7 \u5f53\u524d\u5207\u6362', localeSpanish: '\u5165\u53e3\u5207\u7247 \u00b7 UI \u672a\u5f00\u653e', localeGerman: '\u5165\u53e3\u5207\u7247 \u00b7 UI \u672a\u5f00\u653e', localeJapanese: '\u5165\u53e3\u5207\u7247 \u00b7 UI \u672a\u5f00\u653e', localeKorean: '\u5165\u53e3\u5207\u7247 \u00b7 UI \u672a\u5f00\u653e', localeRule: '\u8def\u7531\u89c4\u5219\uff1a\u7ffb\u8bd1\u6587\u4ef6\u4f7f\u7528\u8bed\u8a00\u540e\u7f00\u5e76\u94fe\u5230\u540c\u4e00\u8bed\u8a00\u3002\u5f53\u524d\u8fc1\u79fb\u8986\u76d6\u5165\u53e3\u5207\u7247\uff0c\u4e0d\u4ee3\u8868\u6574\u672c\u4e66\u6216\u8fd0\u884c\u65f6 UI \u5df2\u5b8c\u6210\u516d\u8bed\u79cd\u652f\u6301\u3002',
  researchTitle: '\u628a\u73b0\u5b9e\u95ee\u9898\u548c\u8bc1\u636e\u8fb9\u754c\u4e00\u8d77\u653e\u4e0a\u3002', researchIntro: '\u7814\u7a76\u7d22\u5f15\u628a\u516c\u5f00 Codex issue \u4e0e\u8bba\u575b\u62a5\u544a\u6574\u7406\u6210\u75c7\u72b6\u3001\u7248\u672c\u3001\u5b89\u5168\u68c0\u67e5\u4e0e\u6559\u5b66\u94fe\u63a5\u3002\u5b83\u4e0d\u58f0\u79f0\u5b98\u65b9\u6839\u56e0\u6216\u672c\u5730\u590d\u73b0\u3002', researchBoundary: '\u7528\u6237\u62a5\u544a\u4e0e\u793e\u533a\u5efa\u8bae \u00b7 \u6ca1\u6709\u672c\u5730\u590d\u73b0\u8bb0\u5f55', researchIndexLink: '\u6253\u5f00\u73b0\u5b9e\u95ee\u9898\u7d22\u5f15', researchIndexBody: 'Codex\u3001\u5de5\u4f5c\u9762\u3001\u4ea4\u63a5\u3001\u8ba4\u8bc1\u3001worktree \u4e0e\u9a8c\u8bc1\u75c7\u72b6\u3002', researchForumsLink: '\u9605\u8bfb\u8bba\u575b\u6848\u4f8b\u7b14\u8bb0', researchForumsBody: 'sandbox \u7f51\u7edc allowlist\u3001Windows spawn \u5931\u8d25\u3001\u5ba1\u6279\u3001\u7f16\u7801\u4e0e\u79c1\u5bc6\u8def\u5f84\u3002'
});

const evaluationTypeLabels = (types) => types.map((type) => copy[currentLanguage][type] || type).join(' · ');
const renderList = (selector, items, { link = false } = {}) => {
  const target = document.querySelector(selector);
  target.replaceChildren();
  items.forEach((item) => {
    const li = document.createElement('li');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = item.href || item[2];
      anchor.textContent = item.name?.[currentLanguage] || item[currentLanguage === 'zh' ? 1 : 0];
      li.append(anchor);
    } else {
      li.textContent = item;
    }
    target.append(li);
  });
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
  const learningPathWarning = document.querySelector('[data-learning-path-warning]');
  learningPathWarning.hidden = hasGeneratedLearningPath;
  document.querySelectorAll('[data-lang-option]').forEach((element) => element.classList.toggle('is-active', element.dataset.langOption === language));
  const languageToggle = document.querySelector('[data-language-toggle]');
  languageToggle.setAttribute('aria-label', strings.languageToggleAria);
  languageToggle.setAttribute('aria-pressed', language === 'zh' ? 'true' : 'false');
  updateLevel(document.querySelector('.level-tab.is-active')?.dataset.level || 'L0', false);
  updateRouteStatus(document.querySelector('.filter-button.is-active')?.dataset.filter || 'all');
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url);
  }
  try { localStorage.setItem(languageStorageKey, language); } catch (_) { /* Persistence is optional. */ }
};

const updateLevel = (level, focus = false) => {
  const data = learningPath[level];
  const languageIndex = currentLanguage === 'zh' ? 1 : 0;
  const title = data.headline?.[currentLanguage] || data.title?.[languageIndex];
  const description = data.description?.[currentLanguage] || data.capability?.[currentLanguage] || data.description?.[languageIndex];
  const nextChapter = data.next?.chapter || data.chapters[0];
  const nextLab = data.next?.lab || data.labs[0];
  document.querySelectorAll('[data-level-label]').forEach((element) => { element.textContent = level; });
  document.querySelector('[data-level-title]').textContent = title;
  document.querySelector('[data-level-description]').textContent = description;
  document.querySelector('[data-level-status]').textContent = data.status;
  renderList('[data-level-chapters]', data.chapters, { link: true });
  renderList('[data-level-labs]', data.labs, { link: true });
  renderList('[data-level-skills]', data.skills, { link: true });
  renderList('[data-level-evaluations]', data.evaluations);
  document.querySelector('[data-level-evaluation-summary]').textContent = `${data.evaluations.length} · ${evaluationTypeLabels(data.evaluationTypes)}`;
  const gate = document.querySelector('[data-level-gate]');
  gate.replaceChildren();
  ['explain', 'operate', 'judge', 'review'].forEach((key, index) => {
    const item = document.createElement('li');
    const label = document.createElement('b');
    label.textContent = copy[currentLanguage][`evidence${key[0].toUpperCase()}${key.slice(1)}`];
    const text = document.createElement('span');
     text.textContent = data.gate[key][currentLanguage] || data.gate[key][languageIndex];
    item.append(label, text);
    gate.append(item);
  });
  document.querySelector('[data-level-graduation]').textContent = data.graduation[currentLanguage] || data.graduation[languageIndex];
  document.querySelector('[data-level-blocked]').textContent = data.blocked[currentLanguage] || data.blocked[languageIndex];
  const link = document.querySelector('[data-level-link]');
  link.href = nextChapter.href || nextChapter[2];
  link.querySelector('[data-level-link-text]').textContent = data.next?.label?.[currentLanguage] || data.next?.label?.[languageIndex] || (currentLanguage === 'zh' ? `打开${nextChapter.name?.zh || nextChapter[1]}` : `Open ${nextChapter.name?.en || nextChapter[0]}`);
  const labLink = document.querySelector('[data-level-lab-link]');
  labLink.href = nextLab.href || nextLab[2];
  labLink.querySelector('[data-level-lab-link-text]').textContent = nextLab.name?.[currentLanguage] || nextLab[languageIndex];
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

const updateRouteStatus = (filter) => {
  const key = filter === 'all' ? 'routeStatusAll' : `routeStatus${filter}`;
  document.querySelector('[data-route-status]').textContent = copy[currentLanguage][key];
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
    document.querySelectorAll('.filter-button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.chapter-group').forEach((group) => {
      const visible = filter === 'all' || group.dataset.route === filter;
      group.hidden = !visible;
      if (visible && filter !== 'all') group.open = true;
    });
    updateRouteStatus(filter);
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
