const copy = {
  en: {
    skipToContent: 'Skip to main content',
    wordmarkAria: 'Prysai LLM Playbook home',
    languageToggleAria: 'Choose interface language',
    menuAria: 'Open navigation',
    navAria: 'Main navigation',
    heroIndexAria: 'Page index',
    pathAria: 'Seven-level learning path',
    routesAria: 'Filter chapter routes',
    menu: 'Menu', menuClose: 'Close', navStart: 'Start with a problem', navFirst30: 'First 15 minutes', navPath: 'Learning path', navIndex: 'Project index', navRoutes: 'Reading routes', navLabs: 'Labs', navSkills: 'Skills', navUpdates: 'Update map', localeBannerFallback: 'The {requested} route is selected, but some interface strings or course units are still in migration. When a course unit is absent, Reader keeps this language and names the unit unavailable; it does not silently switch the course text to English.', localeManifestError: 'Locale routing is unavailable because the generated manifest did not load. English remains available; rebuild the manifest before relying on other routes.', localeBannerReady: 'Reading in {language}.', localeMenuAria: 'Interface languages', languageNameEnglish: 'English', languageNameChinese: 'Simplified Chinese', languageNameSpanish: 'Spanish', languageNameJapanese: 'Japanese', languageNameKorean: 'Korean', languageNameGerman: 'German', localeOptionFallback: 'English UI fallback',
    heroIndex: 'CODEX / LEARNING SYSTEM', heroEyebrow: 'Candidate guide · basic structure and checks pass', heroTitle: 'Practise checkable Codex work.', heroLede: 'Use a collaboration method designed to transfer across language-model tools, then practise it deeply in Codex: define the outcome, control context and authority, inspect the work, recover from failure, and keep evidence.', heroPrimary: 'Start the guided Codex path', heroSecondary: 'See the optional no-setup warm-up', heroRouteAria: 'Choose the recommended first route', heroRouteKicker: 'Choose by your starting condition', heroRouteGuidedTitle: 'Have a disposable project? Follow the guided path.', heroRouteGuidedBody: 'Start with Chapter 1. The first local edit comes after its scope and evidence boundary are visible.', heroRouteFixtureTitle: 'No disposable project yet? Use the safe fixture at the Chapter 2 decision.', heroRouteFixtureBody: 'It supplies one offline target and check. It does not replace the guided Codex path.', heroRouteBoundary: 'Candidate means the basic structure and checks pass; first-time reader outcomes are still unmeasured.', heroProofAria: 'First Win proof card', heroProofKicker: 'FIRST WIN / INSPECTABLE EXAMPLE', heroProofStatus: 'candidate · no participant run recorded', heroProofTitle: 'See what one checked result contains.', heroProofSourceLabel: 'SOURCE MESSAGE', heroProofSource: '“Hi, the workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come.”', heroProofPreserveLabel: 'PRESERVE FACTS', heroProofPreserve: 'Keep Friday at 10, the draft, and the reply request. Do not add a date, venue, reason, or contact method.', heroProofChecksLabel: 'THREE HUMAN CHECKS', heroProofCheckOne: 'Friday at 10 and the draft remain.', heroProofCheckTwo: 'People who cannot attend are asked to reply.', heroProofCheckThree: 'No unsupported detail appears.', heroProofReceiptLabel: 'BOUNDED RECEIPT', heroProofReceipt: 'One checked attempt can be recorded. It does not prove learning, transfer, or model performance.', heroProofLink: 'Open the full 15-minute check', heroFooter: 'Problem → protocol → action → evidence',
    startEyebrow: 'Start with the problem', startTitle: 'Do not start with a Skill.', startIntro: 'Start with the failure you need to avoid or the work you need to finish. Pick the smallest useful entry, then leave evidence.',
    problemStartTitle: 'I do not know where to start.', problemStartBody: 'Separate GPT, Codex, models, tools, Skills, and Agents before choosing a workflow.', problemStartLink: 'Open chapter 1 ↗', problemWrongFileTitle: 'Codex changed the wrong file.', problemWrongFileBody: 'Learn to inspect scope, diff, tests, and recovery before trusting a completion statement.', problemWrongFileLink: 'Open chapter 9 ↗', problemSkillTitle: 'I do not know which Skill to use.', problemSkillBody: 'Choose by task, risk, inputs, dependencies, and evidence—not by directory size.', problemSkillLink: 'Run lab 004 ↗', problemUpdateTitle: 'I need to update this safely.', problemUpdateBody: 'Use the fixed update map to find the canonical file, required source record, and validation gate.', problemUpdateLink: 'Open the update map ↗', problemIntakeTitle: 'I have a broad goal and do not know what to practise first.', problemIntakeBody: 'Ask one decision at a time. Pick one existing route, one checkable attempt, permitted help, and a smaller fallback.', problemIntakeLink: 'Open first-practice intake · candidate · not_run ↗', problemLanguageTitle: 'I want to practise one language skill.', problemLanguageBody: 'Define one observable performance, attempt it before instruction, correct one meaning-blocking error, then test a changed case.', problemLanguageLink: 'Open language route · candidate · not_run ↗', problemGeneralSkillTitle: 'I want to practise another real skill.', problemGeneralSkillBody: 'Turn an interview answer, explanation, or presentation into one timed performance, then retest it under a changed condition.', problemGeneralSkillLink: 'Open general skill route · candidate · not_run ↗', problemResearchTitle: 'I need to research one bounded question.', problemResearchBody: 'Tie the question to a decision, assign source owners, keep a claim ledger, search for disagreement, and stop on purpose.', problemResearchLink: 'Open research route · candidate · not_run ↗',
    first30Eyebrow: 'Your first 15 minutes', first30Title: 'Judge one answer. No setup.', first30Intro: 'The text, task, and checks are already filled in. Use any chat model; you need no files, terminal, Git, account connection, or special vocabulary.', stepOneTitle: 'Choose a reversible change.', stepOneBody: 'Use a sandbox file or a small documentation edit. Do not start with credentials, production, or a destructive command.', stepTwoTitle: 'Write the task contract.', stepTwoBody: 'State the goal, context, allowed actions, acceptance criteria, evidence, and stop condition.', stepThreeTitle: 'Let Codex inspect first.', stepThreeBody: 'Ask for the relevant files and current state before allowing an edit. Keep the scope visible.', stepFourTitle: 'Verify what changed.', stepFourBody: 'Review the diff, run the smallest relevant check, and record what was not tested.', checkCardLabel: 'A useful task contract', fieldGoalLabel: 'Goal', fieldGoal: 'Make one named change.', fieldContextLabel: 'Context', fieldContext: 'Only the files needed for this task.', fieldInputsLabel: 'Inputs', fieldInputs: 'Paths, current behavior, constraints.', fieldAllowedLabel: 'Allowed actions', fieldAllowed: 'Read and edit; pause before external effects.', fieldAcceptanceLabel: 'Acceptance', fieldAcceptance: 'A specific diff and check result.', fieldEvidenceLabel: 'Evidence', fieldEvidence: 'Diff, command, output, and limits.', fieldStopLabel: 'Stop when', fieldStop: 'Scope, authority, or evidence is missing.', contractHighlight: 'The safest first task is small, reversible, and easy to inspect.', openChapterTwo: 'Open chapter 2',
    starterEyebrow: 'Before → prompt → check → repair', starterTitle: 'Make one message clearer without changing its facts.', starterIntro: 'Read the original once, copy the filled prompt, then check the answer yourself. Target time: 15 minutes; actual beginner completion time has not been measured.', starterCopy: 'Copy first prompt', starterCopied: 'First prompt copied. Check the answer against all three lines.', starterCopyFailed: 'Copy failed. Select the prompt text manually.', starterBoundary: 'Ready. Completing this exercise records one checked attempt; it does not prove learning or general ability.', starterProgressionAria: 'Continue from the optional warm-up', starterDeepen: 'Choose another beginner practice', starterCodexPath: 'Start the Codex path: Chapter 1', starterBoundaryLab: 'Label the boundary: Lab 011 · draft / not_run', starterBoundedTask: 'Choose one bounded local task: Chapter 2', starterPractice: 'Run Lab 001: work with files and Git · draft / not_run', starterEvidence: 'Learn how to recover from a bad answer',
    protocolEyebrow: 'The working frame', protocolTitle: 'Every serious task needs a boundary.', protocolIntro: 'This frame is the common language between a person, a model, a tool, and an Agent. Use it before adding permissions or Skills.', protocolLink: 'Read the task protocol', protocolNote: 'If a missing input changes the scope, risk, or acceptance test, pause and ask. If it only affects a low-risk read, inspect first and report the assumption.', protocolRuleOne: 'Define', protocolRuleTwo: 'Act', protocolRuleThree: 'Verify', protocolRuleFour: 'Hand off',
    pathEyebrow: 'Learning path', pathTitle: 'Seven levels. One executable contract.', pathIntro: 'Choose a level and see exactly what to read, do, use, submit, and refuse to claim. A level is not a reading count.', currentLevel: 'Current level', nextStep: 'Next step', requiredChapters: 'Required chapters', requiredLabs: 'Required lab', supportingSkills: 'Supporting Skills', evaluationFixtures: 'Evaluation fixtures', evidenceGate: 'Evidence gate', graduationGate: 'Move on when', blockedWhen: 'Stop when', fourEvidence: 'Four evidence types', evidenceExplain: 'Explain', evidenceOperate: 'Operate', evidenceJudge: 'Judge', evidenceReview: 'Review', positive: 'positive', boundary: 'boundary', failure: 'failure', transfer: 'transfer', statusCandidate: 'candidate',
    labFirstSeen: 'Introduced', labReused: 'Reused from', labCapability: 'Capability', labArtifact: 'Artifact', labAcceptance: 'Acceptance',
    levelL0Name: 'Observer', levelL0Short: 'Notice what happened', levelL1Name: 'Safe user', levelL1Short: 'Complete a low-risk task', levelL2Name: 'Task designer', levelL2Short: 'Write a task protocol', levelL3Name: 'Workflow designer', levelL3Short: 'Move from definition to delivery', levelL4Name: 'Capability builder', levelL4Short: 'Choose the smallest useful set', levelL5Name: 'Evidence reviewer', levelL5Short: 'Test completion claims', levelL6Name: 'Team coach', levelL6Short: 'Turn method into a system',
    chaptersEyebrow: 'The reading routes', chaptersTitle: '22 chapters. Four ways in.', chaptersIntro: 'Read in order to build the model. Jump by route when a real task is blocking you. Every route returns to practice and evidence.', filterAll: 'All chapters', filterA: 'A · First contact', filterB: 'B · Real work', filterC: 'C · Capability', filterD: 'D · Team practice', routeATitle: 'First contact with Codex', routeADesc: '01—06 · finish a first safe task', routeBTitle: 'Codex for real work', routeBDesc: '07—13 · design a verifiable workflow', routeCTitle: 'Capability and Agent collaboration', routeCDesc: '14—18 · choose the smallest useful combination', routeDTitle: 'From fluency to team practice', routeDDesc: '19—22 · turn personal method into team capability', candidateStatus: 'candidate', chapter01: 'Understand GPT before Codex', chapter02: 'Complete a safe, verifiable task', chapter03: 'Turn a wish into a task protocol', chapter04: 'Context, permissions, and Agent boundaries', chapter05: 'Choose the right Codex surface', chapter06: 'Model choice is not model worship', chapter07: 'How Skills, Plugins, MCP, and tools divide the work', chapter08: 'The full lifecycle from definition to delivery', chapter09: 'Verification, doubt, and recovery', chapter10: 'Planning and vertical slices', chapter11: 'Design a Skill that earns its place', chapter12: 'The Agent loop, state, and stop conditions', chapter13: 'Action boundaries across files, terminals, browsers, and GitHub', chapter14: 'Discover, install, and audit an external Skill', chapter15: 'Research: from question to auditable knowledge', chapter16: 'Engineering: from idea to reliable software', chapter17: 'Marketing: from product context to experiments', chapter18: 'Content, design, data, and automation', chapter19: 'Evaluate models and workflows', chapter20: 'Build a personal Codex work system', chapter21: 'Build a team capability system', chapter22: 'Keep the system current and recoverable',
    labsEyebrow: 'The lab', labsTitle: 'Make the principle observable.', labsIntro: 'Labs are low-risk, reproducible tasks. Each one names setup, evidence, a failure variant, a secret boundary, and a reflection.', draftStatus: 'draft', startingLab: 'starting lab', lab01Title: 'First safe task', lab01Body: 'In a sandbox project, ask Codex to inspect before editing. Turn “done” into a checkable diff.', lab02Title: 'Task protocol', lab02Body: 'Break a vague request into goal, inputs, constraints, acceptance, and failure handling.', lab03Title: 'Evidence review', lab03Body: 'Find a result that looks complete but has no evidence for its claim.', lab04Title: 'Skill selection', lab04Body: 'Explain the choice and refuse to use directory size as a proxy for fit.', lab05Title: 'Design a Skill', lab05Body: 'Turn a stable method into a capability with boundaries, evidence, and failure cases.', lab06Title: 'Agent stop conditions', lab06Body: 'Define stop points for success, missing input, recoverable failure, and permission conflict.', lab07Title: 'Action boundaries', lab07Body: 'Compare the evidence needed for reading, editing, running, committing, pushing, and publishing.', lab08Title: 'Research question', lab08Body: 'Turn a broad topic into a question, source plan, and minimum evidence table.', lab09Title: 'Engineering lifecycle', lab09Body: 'Compare direct implementation with a full lifecycle and record the rework evidence.', lab10Title: 'Shared product context', lab10Body: 'Version a shared product understanding and separate facts from hypotheses.', lab11Title: 'GPT and Codex boundaries', lab11Body: 'Use static task cards to separate generation, execution, verification, and external effects.', lab12Title: 'Team capability migration', lab12Body: 'Create a contract for version, owner, permissions, independent reproduction, and rollback.', labsIndexLink: 'Open the lab rules and all 18 entries',
    skillsEyebrow: 'Capability layer', skillsTitle: 'Twenty-five Skills. Distinct jobs.', skillsIntro: 'A Skill is a method with a trigger, an input check, boundaries, stop conditions, an output contract, and a way to verify it.', skillCoach: 'Choose a learning path and practice boundary.', skillProtocol: 'Turn a vague request into an executable contract.', skillEvidence: 'Split completion claims into checkable evidence.', skillSelector: 'Choose a minimum viable capability set.', skillWorkflow: 'Manage stages, checkpoints, and hand-off.', skillResearch: 'Converge a question into auditable knowledge.', skillContext: 'Keep stable principles separate from changing facts.', skillLearningName: 'Learning Coach', skillLearning: 'Practise with recall, correction, delayed review, and transfer.', skillSourceName: 'Source Investigator', skillSource: 'Turn broad searches into bounded source-backed investigations.', skillSignalName: 'Field Signal Curator', skillSignal: 'Turn public reports into bounded demand evidence.', skillAdapterName: 'Platform Adapter Review', skillAdapter: 'Reject platform lessons without a sourced, runnable delta.', skillTriageName: 'Communication Failure Triage', skillTriage: 'Diagnose one failed interaction and retest the smallest repair.', skillBriefName: 'Dialogue Brief', skillBrief: 'Turn one untried low-risk request into a copy-ready first message.', skillFirstTurnCheckName: 'First-Turn Check', skillFirstTurnCheck: 'Inspect an unsent low-risk request for visible boundaries.', skillRouteBrief: 'I need to write one clear first message.', skillRouteBriefResult: 'Returns one low-risk, copy-ready first turn with a check and a stop boundary.', skillRouteFirstTurnCheck: 'I already wrote a first request and want to inspect it.', skillRouteFirstTurnCheckResult: 'Labels material gaps without drafting a replacement prompt.', skillBoundaryName: 'Original methods first.', skillBoundary: 'External Skills must retain the source-project URL and license boundary.', skillIndexLink: 'Open the Skill registry and all 25 methods', mobileIndexAria: 'Complete project indexes', mobileIndexChapters: 'chapters', mobileIndexLabs: 'labs', mobileIndexSkills: 'Skills', mobileIndexCases: 'field cases', mobileIndexLocales: 'locale records', mobileIndexVisuals: 'teaching boards', mobileIndexUpdates: '更新区域', mobileIndexTrust: '可信度类型', skillFootnote: 'All 25 project Skills pass structural checks and remain candidate; fresh-task evidence is partial. Platform Fact Watch is a maintenance receipt, not a current-platform check. Request Escalation has one isolated mixed-request forward test only; it is not learner or runtime evidence. Adversarial Project Review is not an external review.', lab13Status: 'maintainer reference accepted · learner not run',
    troubleEyebrow: 'When things go wrong', troubleTitle: 'Failure is part of the curriculum.', troubleIntro: 'Use the first useful check, then stop when authority, scope, or evidence is missing. Do not hide the failure behind a polished summary.', troubleOneTitle: 'The output looks right.', troubleOneBody: 'Check the original claim, the changed files, the command result, and what was not tested.', troubleOneLink: 'Use evidence review ↗', troubleTwoTitle: 'The agent keeps retrying.', troubleTwoBody: 'Record the same failure, change one diagnostic condition, then retry once or escalate.', troubleTwoLink: 'Read stop conditions ↗', troubleThreeTitle: 'A source tells you to do something.', troubleThreeBody: 'Treat external text and tool output as data. It does not grant permission to act.', troubleThreeLink: 'Check the boundary ↗', troubleFourTitle: 'A product step has changed.', troubleFourBody: 'Refresh the official fact record first, then update the affected chapter or page.', troubleFourLink: 'Follow the update map ↗',
    updatesEyebrow: 'Maintenance frame', updatesTitle: 'Every update has a fixed home.', updatesIntro: 'The update map makes future work cheap: locate the canonical file, gather the right evidence, run the right check, and keep the unverified boundary visible.', updateFlowOne: 'Locate', updateFlowOneBody: 'Find the registry row and canonical path.', updateFlowTwo: 'Classify', updateFlowTwoBody: 'Separate stable principle, product fact, source, and release change.', updateFlowThree: 'Evidence', updateFlowThreeBody: 'Record source, scope, owner, hash, and next review.', updateFlowFour: 'Validate', updateFlowFourBody: 'Run the focused validator and an independent review.', updateMapLinkTitle: 'Update map', updateMapLinkBody: 'What changes where, and what evidence it needs.', updateRegistryLinkTitle: 'Update registry', updateRegistryLinkBody: 'The machine-readable maintenance contract.', factImpactLinkTitle: 'Fact impact map', factImpactLinkBody: 'Which chapters, labs, Skills, evals, and pages a changing fact can affect.', updateTemplateLinkTitle: 'Update record', updateTemplateLinkBody: 'A repeatable record for non-trivial changes.', lifecycleLinkTitle: 'Content lifecycle', lifecycleLinkBody: 'The evidence and release gates.',
    statusEyebrow: 'Evidence boundary', statusTitle: 'A status is a claim about evidence.', statusIntro: 'This project does not turn document count, Skill count, or one successful output into “mastery.” Use the status that the evidence supports.', statusDraft: 'Still being written or missing the minimum check.', statusCandidate: 'Structure and basic checks pass; fresh evidence is still needed.', statusVerified: 'The declared scope has positive, boundary, failure, and transfer evidence.', statusProduction: 'Safety, maintenance, version, license, and release gates also pass.', statusSourceBefore: 'Current evidence is recorded in', statusSourceLink: 'the current status source', statusReviewBefore: ' and explained by ', statusReviewLink: 'the current-state review', statusSourceAfter: '; the page itself remains candidate until browser review is recorded.', nextEyebrow: 'Next action', nextTitle: 'Bring one small problem.', nextBody: 'Open the task contract, choose a reversible first step, and keep the diff. That is the shortest useful way to begin.', nextPrimary: 'Open chapter 2', nextSecondary: 'Then run lab 001', footerTagline: 'A practical learning and practice system for Codex.', mobileRouteFixture: 'Need a safe file? Open the fixture', visualCaseIntro: 'Two original boards show the core loop: make the work inspectable, then practise it under changed conditions.', visualCaseBoundary: 'project-authored teaching visuals · not runtime or learner evidence', footerMeta: 'candidate · evidence boundary reviewed 2026-08-13'
  },
  zh: {
    heroIndexAria: '页面索引',
    skipToContent: '跳到主要内容', wordmarkAria: 'Prysai 大模型实战手册首页', languageToggleAria: '选择界面语言', menuAria: '打开导航', navAria: '主导航', pathAria: '七级学习路径', routesAria: '筛选章节路线', menu: '菜单', menuClose: '关闭', navStart: '从问题开始', navFirst30: '前 30 分钟', navPath: '学习路径', navIndex: '项目索引', navRoutes: '阅读路线', navLabs: '实验室', navSkills: 'Skills', navUpdates: '更新地图', localeBannerFallback: '当前已选择 {requested} 路由，但部分界面文字或课程单元仍在迁移中。若课程单元尚未提供，Reader 会保持当前语言并明确标为暂不可用；不会悄悄把课程正文切换成英文。', localeManifestError: '语言路由不可用，因为生成的 manifest 没有加载。英文仍可用；在依赖其他语言路由前，请先重新生成 manifest。', localeBannerReady: '当前阅读语言：{language}。', localeMenuAria: '界面语言', languageNameEnglish: '英语', languageNameChinese: '简体中文', languageNameSpanish: '西班牙语', languageNameJapanese: '日语', languageNameKorean: '韩语', languageNameGerman: '德语', localeOptionFallback: '英文界面回退',
    heroIndex: 'CODEX / 学习系统', heroEyebrow: '候选指南 · 基础结构和检查已通过', heroTitle: '练习可检查的 Codex 工作。', heroLede: '使用一套旨在迁移到各类大语言模型工具的协作方法，再在 Codex 中深入实践：定义结果、控制上下文与权限、检查工作、从失败中恢复，并保留证据。', heroPrimary: '开始有引导的 Codex 路径', heroSecondary: '查看可选的免设置热身', heroRouteAria: '选择推荐的第一条路线', heroRouteKicker: '按你的起始条件选择', heroRouteGuidedTitle: '有可丢弃的项目？沿着引导路径开始。', heroRouteGuidedBody: '从第 1 章开始。第一次本地编辑会在范围和证据边界清楚之后出现。', heroRouteFixtureTitle: '还没有可丢弃的项目？在第 2 章的决策点使用安全夹具。', heroRouteFixtureBody: '它提供一个离线目标和检查，不替代有引导的 Codex 路径。', heroRouteBoundary: '候选表示基础结构和检查已通过；首次读者的学习结果仍未测量。', heroProofAria: 'First Win 证据卡', heroProofKicker: 'FIRST WIN / 可检查示例', heroProofStatus: '候选 · 尚无参与者运行记录', heroProofTitle: '看看一次可检查的结果包含什么。', heroProofSourceLabel: '原始消息', heroProofSource: '“你好，工作坊改期了。周五 10 点开始。请带上草稿。如果你不能参加，请告诉我。”', heroProofPreserveLabel: '保留事实', heroProofPreserve: '保留周五 10 点、草稿和回复要求；不要添加日期、地点、原因或联系方式。', heroProofChecksLabel: '三项人工检查', heroProofCheckOne: '周五 10 点和草稿仍然保留。', heroProofCheckTwo: '不能参加的人仍被要求回复。', heroProofCheckThree: '没有出现无依据的细节。', heroProofReceiptLabel: '有边界的回执', heroProofReceipt: '可以记录一次经过检查的尝试；它不证明已经学会、能够迁移，或模型表现。', heroProofLink: '打开完整的 15 分钟检查', heroFooter: '问题 → 协议 → 行动 → 证据',
    startEyebrow: '从问题开始', startTitle: '不要从 Skill 开始。', startIntro: '先说清楚你要避免的失败或要完成的工作。选择最小有效入口，然后留下证据。', problemStartTitle: '我不知道从哪里开始。', problemStartBody: '在选择工作流前，先分清 GPT、Codex、模型、工具、Skill 与 Agent。', problemStartLink: '打开第 1 章 ↗', problemWrongFileTitle: 'Codex 改错了文件。', problemWrongFileBody: '在相信完成声明前，检查范围、差异、测试与恢复方式。', problemWrongFileLink: '打开第 9 章 ↗', problemSkillTitle: '我不知道该用哪个 Skill。', problemSkillBody: '按任务、风险、输入、依赖和证据选择，不按目录大小选择。', problemSkillLink: '运行实验 004 ↗', problemUpdateTitle: '我需要安全地更新项目。', problemUpdateBody: '用固定更新地图找到规范文件、来源记录和验证门槛。', problemUpdateLink: '打开更新地图 ↗', problemIntakeTitle: '我的目标很宽泛，不知道先练什么。', problemIntakeBody: '一次只澄清一个决定：选一条已有路线、一次可检查尝试、允许的帮助和更小的回退。', problemIntakeLink: '打开首次练习入口 · candidate · not_run ↗',
    first30Eyebrow: '你的前 15 分钟', first30Title: '先判断一个答案，无需配置。', first30Intro: '原文、任务和检查标准都已经填好。任意聊天模型都可以；不需要文件、终端、Git、账户连接或专业词汇。', stepOneTitle: '选择可回滚的改动。', stepOneBody: '使用沙盒文件或小型文档修改。不要从凭据、生产环境或破坏性命令开始。', stepTwoTitle: '写任务协议。', stepTwoBody: '写清目标、上下文、允许行动、验收标准、证据和停止条件。', stepThreeTitle: '让 Codex 先检查。', stepThreeBody: '允许修改前，先让它说明相关文件和当前状态，保持范围可见。', stepFourTitle: '验证实际变化。', stepFourBody: '检查差异，运行最小相关检查，并记录没有测试什么。', checkCardLabel: '一个有用的任务协议', fieldGoalLabel: '目标', fieldGoal: '完成一个明确的改动。', fieldContextLabel: '上下文', fieldContext: '只提供完成任务所需的文件。', fieldInputsLabel: '输入', fieldInputs: '路径、当前行为、约束。', fieldAllowedLabel: '允许行动', fieldAllowed: '读取和编辑；外部副作用前暂停。', fieldAcceptanceLabel: '验收', fieldAcceptance: '明确的差异和检查结果。', fieldEvidenceLabel: '证据', fieldEvidence: '差异、命令、输出和限制。', fieldStopLabel: '停止条件', fieldStop: '范围、授权或证据缺失。', contractHighlight: '最安全的第一个任务应该足够小、可回滚，而且容易检查。', openChapterTwo: '打开第 2 章',
    starterEyebrow: '原文 → 提示词 → 自查 → 修正', starterTitle: '让一条消息更清楚，同时不改变事实。', starterIntro: '先读一遍原文，复制已填好的提示词，再亲自检查答案。目标用时 15 分钟；目前尚未测量零基础用户的实际完成时间。', starterCopy: '复制第一次提示词', starterCopied: '第一次提示词已复制，请按三项标准检查答案。', starterCopyFailed: '复制失败，请手动选择提示词文本。', starterBoundary: '准备好了。完成本练习只记录一次经过检查的尝试，不证明已经学会或具备普遍能力。', starterProgressionAria: '从可选热身继续', starterDeepen: '选择另一项新手练习', starterCodexPath: '开始 Codex 路径：第 1 章', starterBoundaryLab: '标注边界：实验 011 · draft / not_run', starterBoundedTask: '选择一个有边界的本地任务：第 2 章', starterPractice: '运行实验 001：使用文件和 Git · draft / not_run', starterEvidence: '学习如何修正不合格的答案',
    protocolEyebrow: '工作框架', protocolTitle: '每个严肃任务都需要边界。', protocolIntro: '这是人与模型、工具和 Agent 之间的共同语言。在增加权限或 Skill 前先使用它。', protocolLink: '阅读任务协议', protocolNote: '如果缺失输入会改变范围、风险或验收测试，就暂停并询问。如果只影响低风险读取，可以先检查并报告假设。', protocolRuleOne: '定义', protocolRuleTwo: '行动', protocolRuleThree: '验证', protocolRuleFour: '交接',
    pathEyebrow: '学习路径', pathTitle: '七个等级，一份可执行契约。', pathIntro: '选择一个等级，直接看到要读什么、做什么、使用什么、提交什么，以及哪些结论不能声称。等级不是阅读数量。', currentLevel: '当前等级', nextStep: '下一步', requiredChapters: '必读章节', requiredLabs: '必做实验', supportingSkills: '支撑 Skill', evaluationFixtures: '评测夹具', evidenceGate: '证据门槛', graduationGate: '进入下一阶段前', blockedWhen: '遇到这些情况先停止', positive: '正例', boundary: '边界例', failure: '失败例', transfer: '迁移例', fourEvidence: '四类证据', evidenceExplain: '解释', evidenceOperate: '操作', evidenceJudge: '判断', evidenceReview: '审查', levelL0Name: '观察者', levelL0Short: '知道发生了什么', levelL1Name: '安全使用者', levelL1Short: '完成低风险任务', levelL2Name: '任务设计者', levelL2Short: '写出任务协议', levelL3Name: '工作流设计者', levelL3Short: '从定义走到交付', levelL4Name: '能力构建者', levelL4Short: '选择最小有效组合', levelL5Name: '证据审查者', levelL5Short: '检验完成声明', levelL6Name: '团队教练', levelL6Short: '把方法变成系统',
    labFirstSeen: '首次引入', labReused: '复用自', labCapability: '新增能力', labArtifact: '新增产物', labAcceptance: '新增验收',
    chaptersEyebrow: '阅读路线', chaptersTitle: '22 章，四种进入方式。', chaptersIntro: '顺读建立心智模型；被真实任务卡住时按路线跳读。每条路线都会回到练习和证据。', filterAll: '全部章节', filterA: 'A · 初识 Codex', filterB: 'B · 真实工作', filterC: 'C · 能力扩展', filterD: 'D · 团队实践', routeATitle: '第一次接触 Codex', routeADesc: '01—06 · 完成第一个安全任务', routeBTitle: '把 Codex 用于真实工作', routeBDesc: '07—13 · 设计可验证工作流', routeCTitle: '能力与 Agent 协作', routeCDesc: '14—18 · 选择最小有效组合', routeDTitle: '从熟练到团队实践', routeDDesc: '19—22 · 把个人方法变成团队能力', candidateStatus: 'candidate', chapter01: '先理解 GPT，再理解 Codex', chapter02: '完成安全、可验证的任务', chapter03: '把愿望变成任务协议', chapter04: '上下文、权限与 Agent 边界', chapter05: '选择正确的 Codex 工作面', chapter06: '模型选择不是模型崇拜', chapter07: 'Skill、Plugin、MCP 与工具如何分工', chapter08: '从定义到交付的完整生命周期', chapter09: '验证、怀疑与恢复', chapter10: '规划与竖向切片', chapter11: '设计一个真正有用的 Skill', chapter12: 'Agent 的循环、状态与停止条件', chapter13: '文件、终端、浏览器与 GitHub 的行动边界', chapter14: '发现、安装和审查外部 Skill', chapter15: '研究：从问题到可审查知识', chapter16: '工程：从想法到可靠软件', chapter17: '营销：从产品理解到增长实验', chapter18: '内容、设计、数据与自动化', chapter19: '评估模型和工作流', chapter20: '建立个人 Codex 工作系统', chapter21: '建立团队能力系统', chapter22: '保持系统更新并可恢复',
    labsEyebrow: '实验室', labsTitle: '把原理变成可观察的动作。', labsIntro: '实验是低风险、可复现的任务。每个实验都写清设置、证据、失败变体、秘密边界和复盘。', draftStatus: 'draft', startingLab: '起点实验', lab01Title: '第一个安全任务', lab01Body: '在沙盒项目中，让 Codex 先检查再编辑，把“完成了”变成可检查的差异。', lab02Title: '任务协议', lab02Body: '把模糊请求拆成目标、输入、约束、验收和失败处理。', lab03Title: '证据审查', lab03Body: '发现一个看似完成却没有证据支撑声明的结果。', lab04Title: 'Skill 选择', lab04Body: '解释选择理由，拒绝用目录大小代替适配判断。', lab05Title: '设计一个 Skill', lab05Body: '把稳定方法变成有边界、有证据、有失败案例的能力包。', lab06Title: 'Agent 停止条件', lab06Body: '为成功、缺失输入、可恢复失败和权限冲突定义停点。', lab07Title: '行动边界', lab07Body: '比较读取、编辑、运行、提交、推送和发布需要的证据。', lab08Title: '研究问题', lab08Body: '把宽泛主题变成问题、来源计划和最小证据表。', lab09Title: '工程生命周期', lab09Body: '比较直接实现与完整生命周期，并记录返工证据。', lab10Title: '共享产品上下文', lab10Body: '版本化共享产品理解，并区分事实与假设。', lab11Title: 'GPT 与 Codex 边界', lab11Body: '用静态任务卡分清生成、执行、验证和外部副作用。', lab12Title: '团队能力迁移', lab12Body: '为版本、负责人、权限、独立复现和回滚建立契约。', labsIndexLink: '打开实验规则和全部 18 个入口',
    skillsEyebrow: '能力层', skillsTitle: '二十五个 Skill，各有职责。', skillsIntro: 'Skill 是带触发器、输入检查、边界、停止条件、输出契约和验证方式的方法包。', skillCoach: '选择学习路径和练习边界。', skillProtocol: '把模糊请求变成可执行契约。', skillEvidence: '把完成声明拆成可检查证据。', skillSelector: '选择最小有效能力组合。', skillWorkflow: '管理阶段、检查点和交接。', skillResearch: '把问题收敛为可审查知识。', skillContext: '分开稳定原则和易变事实。', skillLearningName: '学习教练', skillLearning: '通过回忆、纠错、延迟复习和迁移进行练习。', skillSourceName: '来源调查', skillSource: '把宽泛搜索变成有边界、有来源的调查。', skillSignalName: '现场信号整理', skillSignal: '把公开报告整理成有边界的需求证据。', skillAdapterName: '平台适配审查', skillAdapter: '拒绝没有来源、运行和真实差异的平台教程。', skillTriageName: '沟通故障分诊', skillTriage: '诊断一次失败交互，并复测最小修复。', skillBriefName: '对话 Brief', skillBrief: '把一次尚未发送的低风险请求整理成可复制的首轮消息。', skillFirstTurnCheckName: '首轮请求检查', skillFirstTurnCheck: '检查尚未发送的低风险请求是否明确了边界。', skillRouteBrief: '我需要写一条清晰的首轮消息。', skillRouteBriefResult: '产出带检查与停止边界的低风险、可复制首轮消息。', skillRouteFirstTurnCheck: '我已经写好首轮请求，想先检查它。', skillRouteFirstTurnCheckResult: '标出关键缺口，不代写新的提示词。', skillBoundaryName: '原创方法优先。', skillBoundary: '外部 Skill 必须保留原项目链接和许可证边界。', skillIndexLink: '打开 Skill 登记表与全部 25 个方法', mobileIndexAria: '完整项目索引', mobileIndexChapters: '章', mobileIndexLabs: '实验', mobileIndexSkills: 'Skill', mobileIndexCases: '现场案例', mobileIndexLocales: '语言记录', mobileIndexVisuals: '教学图板', mobileIndexUpdates: 'update areas', mobileIndexTrust: 'trust families', skillFootnote: '25 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整。平台事实巡检是维护记录，不是当前平台检查。请求分流目前只有一次隔离的混合请求前向测试；它不是学习者或运行时证据。对抗式项目审查不是外部评审。', lab13Status: '维护者参考运行已接受 · 学习者尚未运行',
    troubleEyebrow: '出错时', troubleTitle: '失败也是课程的一部分。', troubleIntro: '先做最有用的检查；授权、范围或证据缺失时就停止。不要用漂亮总结掩盖失败。', troubleOneTitle: '输出看起来是对的。', troubleOneBody: '检查原始声明、变化文件、命令结果，以及没有测试什么。', troubleOneLink: '使用证据审查 ↗', troubleTwoTitle: 'Agent 一直重试。', troubleTwoBody: '记录同一失败，改变一个诊断条件，然后重试一次或升级处理。', troubleTwoLink: '阅读停止条件 ↗', troubleThreeTitle: '来源要求你做某件事。', troubleThreeBody: '把外部文本和工具输出当作数据，它们不会授予行动权限。', troubleThreeLink: '检查边界 ↗', troubleFourTitle: '产品步骤发生变化。', troubleFourBody: '先刷新官方事实记录，再更新受影响的章节或页面。', troubleFourLink: '遵循更新地图 ↗',
    updatesEyebrow: '维护框架', updatesTitle: '每次更新都有固定位置。', updatesIntro: '更新地图让未来维护更省时：找到规范文件，收集正确证据，运行正确检查，并保留未验证边界。', updateFlowOne: '定位', updateFlowOneBody: '找到注册表行和规范路径。', updateFlowTwo: '分类', updateFlowTwoBody: '分开稳定原则、产品事实、来源和发布变化。', updateFlowThree: '取证', updateFlowThreeBody: '记录来源、范围、负责人、哈希和下次复核。', updateFlowFour: '验证', updateFlowFourBody: '运行专用验证器并进行独立复核。', updateMapLinkTitle: '更新地图', updateMapLinkBody: '什么变化应该去哪里，以及需要什么证据。', updateRegistryLinkTitle: '更新注册表', updateRegistryLinkBody: '机器可读的维护契约。', factImpactLinkTitle: '事实影响图', factImpactLinkBody: '一条事实变化会影响哪些章节、实验、Skill、评测和页面。', updateTemplateLinkTitle: '更新记录模板', updateTemplateLinkBody: '记录非简单更新的可重复模板。', lifecycleLinkTitle: '内容生命周期', lifecycleLinkBody: '证据和发布门槛。',
    statusEyebrow: '证据边界', statusTitle: '状态是关于证据的声明。', statusIntro: '本项目不把文档数量、Skill 数量或一次成功输出当作“掌握”。使用证据真正支持的状态。', statusDraft: '仍在编写，或尚未完成最低检查。', statusCandidate: '结构和基本检查通过，但仍需要新鲜证据。', statusVerified: '在声明范围内具备正例、边界例、失败例和迁移证据。', statusProduction: '安全、维护、版本、许可证和发布门槛也全部通过。', statusSourceBefore: '当前证据记录在', statusSourceLink: '当前状态源', statusReviewBefore: '，说明见', statusReviewLink: '当前状态审查记录', statusSourceAfter: '；在浏览器验收记录前，页面自身仍为 candidate。', nextEyebrow: '下一步', nextTitle: '带一个小问题来。', nextBody: '打开任务协议，选择可回滚的第一步并保留差异。这是最短的有效起点。', nextPrimary: '打开第 2 章', nextSecondary: '然后运行实验 001', footerTagline: '一套面向 Codex 的实用学习与实践系统。', mobileRouteExplore: '探索练习路线与完整索引', visualCaseIntro: '两张原创教学图展示核心闭环：让工作可检查，再在变化条件下练习。', visualCaseBoundary: '项目原创教学图 · 不是运行或学习者证据', footerMeta: '候选 · 证据边界复核于 2026-08-13'
  }
};

// The public identity is independent from the stable Codex route and internal
// identifiers. Keep that boundary explicit at the reader-facing entry point.
Object.assign(copy.en, {
  wordmarkAria: 'Prysai LLM Playbook home',
  heroIndex: 'LLM / PRACTICE SYSTEM',
  heroTitle: 'Turn a first LLM task into real work.',
  heroLede: 'Learn one practical method for working with language models, then practise it deeply in the Codex Practice Track: define the outcome, control context and authority, inspect the work, recover from failure, and keep evidence.',
  heroPrimary: 'Start the Codex Practice Track',
  footerTagline: 'An evidence-led LLM playbook, with Codex as the flagship practice track.',
});

Object.assign(copy.zh, {
  wordmarkAria: 'Prysai 大模型实战手册首页',
  heroIndex: 'LLM / 实践系统',
  heroTitle: '让第一项 LLM 任务变成真实工作。',
  heroLede: '学习与语言模型协作的实用方法，再在 Codex 旗舰实践路线中深入练习：定义结果，控制上下文和权限，检查工作，处理失败，并保留证据。',
  heroPrimary: '开始 Codex 旗舰实践路线',
  footerTagline: '一套循证的大模型实战手册，Codex 是当前旗舰实践路线。',
});

// The generated contract is the source of truth; this fallback keeps a direct file open usable during local edits.
const legacyLearningPath = {
  L0: { title: ['Observe, do not guess.', '观察，而不是猜测。'], description: ['Separate GPT, models, Codex, context, tools, Skills, and Agents. Start with observable inputs, actions, states, and evidence.', '先分清 GPT、模型、Codex、上下文、工具、Skill 与 Agent。学习从可观察的输入、行动、状态和证据开始。'], chapters: [['Chapter 1: Understand GPT before Codex', '第 1 章：先理解 GPT，再理解 Codex', '../book/chapters/01-gpt-and-codex-EN.md']], labs: [['Lab 011 · GPT and Codex boundaries', '实验 011 · GPT 与 Codex 边界', '../book/labs/lab-011-gpt-codex-boundaries-EN.md']], skills: [['Codex Coach', 'Codex Coach', '../skills/prysai-codex-coach/SKILL.md']], evaluations: ['concept-gpt-codex-tools-001'], evaluationTypes: ['positive', 'boundary'], gate: { explain: ['Name at least three boundaries between GPT, Codex, and ordinary chat.', '说出 GPT、Codex 与普通聊天之间至少三条边界。'], operate: ['Label input, action, state, and evidence on a static task card.', '在静态任务卡上标注输入、行动、状态和证据。'], judge: ['Refuse to infer access from a model or tool name.', '不根据模型或工具名称臆测访问权。'], review: ['Record what the task card cannot prove about runtime behavior.', '记录任务卡无法证明的运行时行为。'] }, graduation: ['Advance only when the learner can explain the four layers and identify an unverified claim.', '只有能解释四层关系并指出一个未验证声明时，才进入下一阶段。'], blocked: ['The learner treats a model, Skill, login, or tool name as proof of access or execution.', '把模型、Skill、登录或工具名称当成已获访问权或已执行的证据。'], status: 'candidate', next: ['Open chapter 1', '打开第 1 章'] },
  L1: { title: ['Start with a low-risk task.', '从低风险任务开始。'], description: ['Choose a reversible, observable task. Write the allowed actions and confirmation points, then complete a real but controlled delivery.', '选择可回滚、可观察的任务，写下允许行动和确认点，完成一个真实但受控的交付。'], chapters: [['Chapter 2: Complete a safe, verifiable task', '第 2 章：完成安全、可验证的任务', '../book/chapters/02-first-safe-task-EN.md']], labs: [['Lab 001 · First safe task', '实验 001 · 第一个安全任务', '../book/labs/lab-001-first-safe-task-EN.md']], skills: [['Task Protocol', 'Task Protocol', '../skills/prysai-task-protocol/SKILL.md']], evaluations: ['concept-evidence-and-mastery-002', 'protocol-vague-request-003', 'missing-input-no-file-021'], evaluationTypes: ['positive', 'boundary', 'failure'], gate: { explain: ['State the scope, allowed actions, acceptance check, and stop condition.', '说清范围、允许行动、验收检查和停止条件。'], operate: ['Inspect before editing in a sandbox and produce one named change.', '在沙盒中先检查再编辑，完成一个明确改动。'], judge: ['Compare the requested result with the actual diff and command output.', '将请求结果与实际差异、命令输出进行对照。'], review: ['Record untested scope and missing input instead of filling it in.', '记录未测试范围和缺失输入，不擅自补全。'] }, graduation: ['Advance with a task contract, pre-edit observation, diff, focused check, and explicit unverified list.', '提交任务协议、编辑前检查、差异、最小检查和明确的未验证列表后，才进入下一阶段。'], blocked: ['The task touches credentials, production, destructive actions, or an unavailable file.', '任务涉及凭据、生产环境、破坏性行动或不存在的文件。'], status: 'candidate', next: ['Open chapter 2', '打开第 2 章'] },
  L2: { title: ['Turn the wish into a protocol.', '把愿望写成协议。'], description: ['Write the goal, context, inputs, constraints, acceptance, failure handling, and delivery format so boundaries come before action.', '把目标、上下文、输入、约束、验收、失败处理与交付格式写清楚，让行动边界先于行动发生。'], chapters: [['Chapter 3 · Task protocol', '第 3 章 · 任务协议', '../book/chapters/03-task-protocol-EN.md'], ['Chapter 4 · Context and permissions', '第 4 章 · 上下文与权限', '../book/chapters/04-context-permissions-and-agent-EN.md'], ['Chapter 5 · Choose the surface', '第 5 章 · 选择工作面', '../book/chapters/05-choose-the-codex-surface-EN.md'], ['Chapter 6 · Model selection', '第 6 章 · 模型选择', '../book/chapters/06-model-selection-EN.md']], labs: [['Lab 002 · Task protocol', '实验 002 · 任务协议', '../book/labs/lab-002-task-protocol-EN.md']], skills: [['Task Protocol', 'Task Protocol', '../skills/prysai-task-protocol/SKILL.md'], ['Codex Coach', 'Codex Coach', '../skills/prysai-codex-coach/SKILL.md']], evaluations: ['protocol-reversible-first-step-004', 'skill-minimal-selection-005', 'context-minimum-relevant-007', 'permission-least-authority-009', 'evidence-runtime-vs-build-012', 'research-narrow-question-013', 'marketing-product-context-017', 'conversion-markdown-to-json-019', 'missing-input-auth-choice-022', 'conflict-source-vs-user-024', 'route-explicit-over-implicit-031', 'product-context-fact-hypothesis-034'], evaluationTypes: ['positive', 'boundary', 'failure'], gate: { explain: ['Explain why each input, constraint, and permission is necessary or excluded.', '解释每个输入、约束和权限为什么必要，或为什么排除。'], operate: ['Write and execute a small protocol without expanding scope.', '写出并执行一个小协议，不扩大允许范围。'], judge: ['Choose the smallest relevant context, Skill, tool, and check.', '选择最小相关上下文、Skill、工具和检查。'], review: ['Handle missing input, conflicting instructions, and evidence gaps.', '处理缺失输入、冲突指令和证据缺口。'] }, graduation: ['Advance when another person can execute the protocol and identify its stop conditions without guessing.', '当另一个人无需猜测就能执行协议并指出停止条件时，才进入下一阶段。'], blocked: ['A missing input changes scope, risk, authority, or acceptance and no confirmation is available.', '缺失输入会改变范围、风险、授权或验收，而又没有确认。'], status: 'candidate', next: ['Open chapter 3', '打开第 3 章'] },
  L3: { title: ['Make the workflow runnable and checkable.', '让工作流可运行、可检查。'], description: ['Organize work as define, plan, execute, verify, review, deliver, and maintain. Use vertical slices to keep evidence moving.', '沿着定义、计划、执行、验证、审查、交付和维护组织任务，用竖向切片持续产出证据。'], chapters: [['Chapter 8 · Full lifecycle', '第 8 章 · 完整生命周期', '../book/chapters/08-full-lifecycle-workflow-EN.md'], ['Chapter 9 · Verification and recovery', '第 9 章 · 验证与恢复', '../book/chapters/09-verification-and-recovery-EN.md'], ['Chapter 13 · Action boundaries', '第 13 章 · 行动边界', '../book/chapters/13-action-boundaries-EN.md']], labs: [['Lab 009 · Engineering lifecycle', '实验 009 · 工程生命周期', '../book/labs/lab-009-engineering-lifecycle-EN.md'], ['Lab 003 · Evidence review', '实验 003 · 证据审查', '../book/labs/lab-003-evidence-review-EN.md'], ['Lab 007 · Action boundaries', '实验 007 · 行动边界', '../book/labs/lab-007-action-boundaries-EN.md']], skills: [['Workflow Orchestrator', 'Workflow Orchestrator', '../skills/prysai-workflow-orchestrator/SKILL.md'], ['Evidence Review', 'Evidence Review', '../skills/prysai-evidence-review/SKILL.md'], ['Task Protocol', 'Task Protocol', '../skills/prysai-task-protocol/SKILL.md']], evaluations: ['skill-risk-aware-selection-006', 'context-untrusted-instructions-008', 'permission-destructive-data-010', 'evidence-claim-audit-011', 'research-source-conflict-014', 'engineering-plan-small-change-015', 'marketing-experiment-plan-018', 'conversion-table-to-learning-path-020', 'conflict-scope-vs-safety-023', 'failure-retry-budget-025', 'stop-missing-authority-027', 'stop-evidence-gap-028', 'route-ownership-boundaries-032', 'product-context-write-gate-033', 'evidence-scope-insufficient-stop-035', 'source-conflict-license-boundary-036'], evaluationTypes: ['positive', 'boundary', 'failure', 'transfer'], gate: { explain: ['Explain the dependency graph, stage boundaries, permission changes, and acceptance evidence.', '解释依赖图、阶段边界、权限变化和验收证据。'], operate: ['Run a vertical slice from definition to verification with an explicit checkpoint.', '用明确检查点跑通从定义到验证的一条竖向切片。'], judge: ['Stop or recover when authority, scope, source, or evidence is insufficient.', '授权、范围、来源或证据不足时，正确停止或恢复。'], review: ['Compare the plan, diff, logs, checks, failed attempt, and remaining limits.', '对照计划、差异、日志、检查、失败尝试和剩余限制。'] }, graduation: ['Advance with one complete workflow, one intentional failure or boundary case, and a transfer task in another domain.', '完成一条完整工作流、一个故意失败或边界案例，以及另一个领域的迁移任务后，才进入下一阶段。'], blocked: ['The workflow relies on hidden permissions, untrusted instructions, unrecorded retries, or a claim outside its evidence.', '工作流依赖隐藏权限、不可信指令、未记录的重试，或结论超出证据范围。'], status: 'candidate', next: ['Open chapter 8', '打开第 8 章'] },
  L4: { title: ['Choose the smallest useful capability.', '只选择最小有效能力。'], description: ['Choose Skills, tools, and surfaces by goal, lifecycle, risk, and dependency. “Install everything” is not a reason.', '按目标、生命周期、风险与依赖选择 Skill、工具和工作面；“全部安装”不是充分理由。'], chapters: [['Chapter 7 · Skills, Plugins, MCP, and tools', '第 7 章 · Skill、Plugin、MCP 与工具', '../book/chapters/07-skills-plugins-and-tools-EN.md'], ['Chapter 11 · Design a Skill', '第 11 章 · 设计一个 Skill', '../book/chapters/11-designing-a-skill-EN.md'], ['Chapter 14 · Audit an external Skill', '第 14 章 · 审查外部 Skill', '../book/chapters/14-discover-and-audit-skills-EN.md']], labs: [['Lab 004 · Skill selection', '实验 004 · Skill 选择', '../book/labs/lab-004-skill-selection-EN.md'], ['Lab 005 · Design a Skill', '实验 005 · 设计一个 Skill', '../book/labs/lab-005-design-a-skill-EN.md'], ['Lab 008 · Research question', '实验 008 · 研究问题', '../book/labs/lab-008-research-question-EN.md']], skills: [['Skill Selector', 'Skill Selector', '../skills/prysai-skill-selector/SKILL.md'], ['Research Router', 'Research Router', '../skills/prysai-research-router/SKILL.md']], evaluations: ['engineering-plan-regression-016', 'failure-scope-escalation-026', 'skill-install-confirmation-rollback-037'], evaluationTypes: ['positive', 'boundary', 'failure', 'transfer'], gate: { explain: ['Explain why each selected capability earns its place and what it does not cover.', '解释每个被选能力为什么值得使用，以及它不覆盖什么。'], operate: ['Use the minimum useful combination and preserve an installation or rollback record.', '使用最小有效组合，并保留安装或回滚记录。'], judge: ['Compare fit, dependency, permission, license, maintenance, and verification cost.', '比较适配、依赖、权限、许可证、维护和验证成本。'], review: ['Test a positive case, a boundary case, a failure case, and a transfer case before calling a Skill reliable.', '在称为可靠前，测试正例、边界例、失败例和迁移例。'] }, graduation: ['Advance when a reusable Skill or capability choice has a bounded contract, rollback path, and four-case evaluation plan.', '当可复用 Skill 或能力选择具备边界契约、回滚路径和四类案例评测计划时，才进入下一阶段。'], blocked: ['The choice is justified only by popularity, directory size, or an unverified performance claim.', '选择理由只有流行度、目录大小或未经验证的性能断言。'], status: 'candidate', next: ['Open chapter 7', '打开第 7 章'] },
  L5: { title: ['A completion claim needs evidence.', '完成声明必须有证据。'], description: ['Break “done” into checkable claims. Separate verified, partial, unverified, and unknowable, then name evidence for each claim.', '将“完成了”拆成可检查的断言，区分已验证、部分完成、未验证与无法判断，并为每项声明指定证据。'], chapters: [['Chapter 12 · Agent loop and stop', '第 12 章 · Agent 循环与停止', '../book/chapters/12-agent-loop-and-stop-EN.md'], ['Chapter 19 · Evaluate models and workflows', '第 19 章 · 评估模型和工作流', '../book/chapters/19-evaluate-models-and-workflows-EN.md']], labs: [['Lab 006 · Agent stop conditions', '实验 006 · Agent 停止条件', '../book/labs/lab-006-agent-stop-conditions-EN.md'], ['Lab 003 · Evidence review', '实验 003 · 证据审查', '../book/labs/lab-003-evidence-review-EN.md']], skills: [['Evidence Review', 'Evidence Review', '../skills/prysai-evidence-review/SKILL.md'], ['Workflow Orchestrator', 'Workflow Orchestrator', '../skills/prysai-workflow-orchestrator/SKILL.md']], evaluations: ['team-capability-package-029', 'workflow-checkpoint-gate-038'], evaluationTypes: ['positive', 'boundary', 'failure', 'transfer'], gate: { explain: ['Explain observable states, retry budgets, stop conditions, and the difference between output and proof.', '解释可观察状态、重试预算、停止条件，以及输出与证明的区别。'], operate: ['Run a bounded comparison or review with fixed inputs, checkpoints, and logs.', '用固定输入、检查点和日志完成一次有边界的对照或审查。'], judge: ['Classify claims as verified, partial, unverified, disputed, or unknowable within scope.', '在声明范围内把结论分类为已验证、部分完成、未验证、有争议或无法判断。'], review: ['Produce an independent review that names evidence, gaps, limits, and the next smallest check.', '产出独立审查，指出证据、缺口、限制和下一个最小检查。'] }, graduation: ['Advance with a fixed evaluation record and an independent review that refuses to overclaim.', '提交固定评测记录和拒绝过度断言的独立审查后，才进入下一阶段。'], blocked: ['There are no fixed inputs, no run log, no independent reviewer, or the evidence cannot support the claim.', '缺少固定输入、运行日志、独立复核，或证据无法支持声明。'], status: 'candidate', next: ['Open chapter 12', '打开第 12 章'] },
  L6: { title: ['Turn personal method into team capability.', '把个人方法沉淀为团队能力。'], description: ['Share context, Skills, evaluations, review, versioning, and contribution rules so the method can be reused and rechecked.', '共享上下文、Skill、评测、审查、版本与贡献规范，让能力可复用，也能在产品变化后重新审查。'], chapters: [['Chapter 20 · Personal work system', '第 20 章 · 个人工作系统', '../book/chapters/20-personal-codex-work-system-EN.md'], ['Chapter 21 · Team capability system', '第 21 章 · 团队能力系统', '../book/chapters/21-team-capability-system-EN.md'], ['Chapter 22 · Continuous update', '第 22 章 · 持续更新', '../book/chapters/22-continuous-update-and-future-proofing-EN.md']], labs: [['Lab 012 · Team capability migration', '实验 012 · 团队能力迁移', '../book/labs/lab-012-team-capability-migration-EN.md'], ['Lab 010 · Shared product context', '实验 010 · 共享产品上下文', '../book/labs/lab-010-product-context-EN.md']], skills: [['Product Context', 'Product Context', '../skills/prysai-product-context/SKILL.md'], ['Codex Coach', 'Codex Coach', '../skills/prysai-codex-coach/SKILL.md']], evaluations: ['team-capability-migration-030'], evaluationTypes: ['positive', 'boundary', 'failure', 'transfer'], gate: { explain: ['Explain ownership, versioning, permissions, source boundaries, maintenance triggers, and rollback.', '解释负责人、版本、权限、来源边界、维护触发器和回滚。'], operate: ['Migrate one personal method into a team-readable package without exposing secrets.', '把一个个人方法迁移为团队可读的能力包，不暴露秘密。'], judge: ['Separate stable principles, volatile facts, hypotheses, runtime evidence, and release claims.', '分开稳定原则、易变事实、假设、运行时证据和发布声明。'], review: ['Run an independent reproduction or rollback review and record what remains unverified.', '完成独立复现或回滚审查，并记录仍未验证的部分。'] }, graduation: ['This is the terminal level: keep the package current, reproducible, and recoverable.', '这是终点等级：保持能力包当前、可复现、可恢复。'], blocked: ['The method depends on one person, hidden credentials, unclear licensing, or an ownerless update path.', '方法依赖某一个人、隐藏凭据、许可证不清或没有负责人的更新路径。'], status: 'candidate', next: ['Open chapter 21', '打开第 21 章'] }
};
// Keep the legacy fallback aligned with the canonical English source paths.
const generatedLearningPath = window.CODEX_LEARNING_PATH?.levels;
const learningPathLevels = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
const hasGeneratedLearningPath = Boolean(generatedLearningPath) && learningPathLevels.every((level) => generatedLearningPath[level]);
const learningPath = hasGeneratedLearningPath ? generatedLearningPath : legacyLearningPath;

Object.assign(copy.en, {
  skillStarterEyebrow: 'Choose by situation', skillStarterTitle: 'Start here if the names mean nothing yet.', skillStarterIntro: 'These are starting routes, not automatic diagnoses. Open one method, check its required inputs, and stop if the boundary does not fit.', skillRouteUnclear: 'My task is still unclear.', skillRouteUnclearResult: 'Returns a bounded goal, inputs, actions, acceptance, and stop condition.', skillRouteLearnCodex: 'I need to learn Codex.', skillRouteLearnCodexResult: 'Returns a Codex learning level, experiment, evidence check, and reflection.', skillRouteLearnOther: 'I need to practise another capability.', skillRouteLearnOtherResult: 'Returns a baseline, correction, changed-case transfer attempt, and review cue.', skillRouteFailed: 'A preserved request and reply already failed.', skillRouteFailedResult: 'Returns one evidence-based diagnosis and a smallest comparable repair.', skillRouteVerify: 'I need to check an existing claim.', skillRouteVerifyResult: 'Returns what the evidence proves, misses, and requires next.',
  mobileRoutesAria: 'Choose your next move',
  mobileRouteTask: 'Get a first result in 15 minutes',
  mobileRoutePractice: 'Practise language, research, or another skill',
  mobileRouteIndexes: 'Browse the complete project indexes',
  mobileAllRoutes: 'Open every problem route',
  starterPreview: 'Preview the complete prompt',
  starterSequenceAria: 'Before, prompt, human check, and repair sequence',
  starterCheckOne: 'Facts kept — Friday at 10 and “bring the draft” remain.',
  starterCheckTwo: 'Action kept — anyone who cannot attend is asked to reply.',
  starterCheckThree: 'Nothing invented — no date, time zone, venue, deadline, sender, reason, contact method, or other fact appears.',
  starterCheckPass: 'PASS', starterCheckFail: 'FAIL', starterCheckUnsure: 'UNSURE',
  starterCheckGate: 'Record all three judgments before comparing with an example.',
  starterCheckReady: 'All three judgments are recorded. You can now compare with the illustrative answer.',
  starterCheckRecovery: 'A failed or uncertain check is recorded. Use the rescue prompt, then keep this record as a local observation.',
  starterCheckOneAria: 'Record whether facts were kept', starterCheckTwoAria: 'Record whether the requested action was kept', starterCheckThreeAria: 'Record whether unsupported details were added',
  starterCompare: 'Compare with one acceptable shape',
  starterComparisonBoundary: 'This illustrative answer stays hidden until all three judgments are recorded. It does not score your answer or prove learning.',
  starterExample: 'One acceptable shape: “The workshop starts Friday at 10. Please bring your draft. If you cannot attend, please reply.” Wording may differ; this is not the only correct answer.',
  starterRescueCopy: 'Copy rescue prompt',
  starterRescueCopied: 'Rescue prompt copied. Repair only the first failed check.',
  starterHelpLabel: 'Help used', starterHelpAria: 'Record help used', starterHelpPrompt: 'First prompt', starterHelpRescue: 'Rescue prompt', starterHelpBoth: 'Both prompts',
  starterCorrectionLabel: 'Correction after checking', starterCorrectionAria: 'Record correction status', starterCorrectionNotNeeded: 'Not needed', starterCorrectionCorrected: 'Corrected', starterCorrectionNotYet: 'Not yet', starterRecordNotRecorded: 'Not recorded',
  starterReceiptAria: 'Local First Win check record', starterCopyRecord: 'Copy my local check record', starterRecordCopied: 'Local check record copied. It contains statuses only, not your answer.', starterRecordCopyFailed: 'Could not copy the local check record. Select its text manually.', starterRecoveryLink: 'Open recovery handoff',
  starterReceiptLabel: 'Plain-language receipt',
  starterReceipt: 'Attempted · checked here · help used · corrected · not proven: learning, transfer, general writing ability, or model superiority.',
  navPath: 'Learning path',
  heroPrimary: 'Get a first result in 15 minutes',
  heroSecondary: 'Open the universal-core route',
  routeStatusAll: 'Showing all 22 chapters.',
  routeStatusA: 'Showing 6 chapters in A · First contact.',
  routeStatusB: 'Showing 7 chapters in B · Real work.',
  routeStatusC: 'Showing 5 chapters in C · Capability.',
  routeStatusD: 'Showing 4 chapters in D · Team practice.',
  labsIndexLink: 'Open the lab rules and all 18 entries',
  featuredLab: 'featured lab',
  lab13Title: 'Auditable vertical slice',
  lab13Body: 'Run one local Markdown change from protocol and baseline to checkpoint, diff, focused check, failure, and transfer.',
  lab14Title: 'Resume reconciliation',
  lab14Body: 'Reconcile the task pointer, target, branch, permissions, and side-effect state before continuing.',
  lab15Title: 'Evidence delivery',
  lab15Body: 'Split a completion sentence into claims, scopes, outputs, and the smallest next check.',
  lab16Title: 'Side-effect boundary',
  lab16Body: 'Separate diagnosis from installation, publication, restart, and other persistent actions.',
  lab17Title: 'Skill discovery audit',
  lab17Body: 'Check existence, discovery, loading, behavior, license, and adoption as separate claims.',
  lab18Title: 'Language transfer',
  lab18Body: 'Preserve an unaided baseline, correct one meaning-blocking error, then test a changed case without reusing lesson sentences.',
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
  skillStarterEyebrow: '按当前情况选择', skillStarterTitle: '如果这些名称还很陌生，从这里开始。', skillStarterIntro: '这是起点建议，不是自动诊断。先打开一个方法，检查必需输入；边界不匹配时就停止。', skillRouteUnclear: '我的任务还不清楚。', skillRouteUnclearResult: '产出有边界的目标、输入、动作、验收与停止条件。', skillRouteLearnCodex: '我需要学习 Codex。', skillRouteLearnCodexResult: '产出 Codex 学习等级、实验、证据检查与反思。', skillRouteLearnOther: '我需要练习另一项能力。', skillRouteLearnOtherResult: '产出基线、纠错、变式迁移尝试与复习提示。', skillRouteFailed: '我保留了已经失败的请求和回复。', skillRouteFailedResult: '产出一项有证据的诊断和最小可比修复。', skillRouteVerify: '我需要检查一个已有声明。', skillRouteVerifyResult: '说明证据能证明什么、缺什么、下一步检查什么。',
  mobileRoutesAria: '\u9009\u62e9\u4e0b\u4e00\u6b65',
  mobileRouteTask: '15 分钟完成第一次可检查的结果',
  mobileRoutePractice: '\u7ec3\u4e60\u8bed\u8a00\u3001\u7814\u7a76\u6216\u5176\u4ed6\u6280\u80fd',
  mobileRouteIndexes: '\u6d4f\u89c8\u5b8c\u6574\u9879\u76ee\u7d22\u5f15',
  mobileAllRoutes: '\u6253\u5f00\u5168\u90e8\u95ee\u9898\u8def\u7ebf',
  starterPreview: '\u9884\u89c8\u5b8c\u6574\u63d0\u793a\u8bcd',
  starterSequenceAria: '原文、提示词、人工检查与修正流程',
  starterCheckOne: '事实保留——星期五 10 点和“带上草稿”仍在。',
  starterCheckTwo: '行动保留——无法参加的人被要求回复。',
  starterCheckThree: '没有编造——未增加日期、时区、地点、截止时间、发送者、原因、联系方式或其他事实。',
  starterCheckPass: '通过', starterCheckFail: '失败', starterCheckUnsure: '不确定',
  starterCheckGate: '先记录三项判断，再对照示例。',
  starterCheckReady: '三项判断均已记录。现在可以对照示例答案。',
  starterCheckRecovery: '已记录失败或不确定项。请使用修正提示词，然后将这份记录保留为本地观察。',
  starterCheckOneAria: '记录事实是否保留', starterCheckTwoAria: '记录要求的行动是否保留', starterCheckThreeAria: '记录是否加入了无依据的细节',
  starterCompare: '对照一种合格形式',
  starterComparisonBoundary: '只有在三项判断都记录后才显示这一示例。它不会给你的回答打分，也不证明已经学会。',
  starterExample: '一种合格形式：“活动星期五 10 点开始，请带上草稿。如果无法参加，请回复。”措辞可以不同，这不是唯一标准答案。',
  starterRescueCopy: '复制修正提示词',
  starterRescueCopied: '修正提示词已复制，只修正第一项失败标准。',
  starterHelpLabel: '使用的帮助', starterHelpAria: '记录使用的帮助', starterHelpPrompt: '第一次提示词', starterHelpRescue: '修正提示词', starterHelpBoth: '两个提示词都用过',
  starterCorrectionLabel: '检查后的修正', starterCorrectionAria: '记录修正状态', starterCorrectionNotNeeded: '无需修正', starterCorrectionCorrected: '已修正', starterCorrectionNotYet: '尚未修正', starterRecordNotRecorded: '未记录',
  starterReceiptAria: '本地第一次结果检查记录', starterCopyRecord: '复制我的本地检查记录', starterRecordCopied: '本地检查记录已复制；其中只有状态，不含你的回答。', starterRecordCopyFailed: '无法复制本地检查记录，请手动选择文本。', starterRecoveryLink: '打开失败恢复路径',
  starterReceiptLabel: '人话版记录',
  starterReceipt: '已尝试 · 本次检查项 · 使用的帮助 · 是否修正 · 不证明：学习、迁移、普遍写作能力或模型优越性。',
  navPath: '\u5b66\u4e60\u8def\u5f84',
  heroPrimary: '15 分钟完成第一次可检查的结果',
  heroSecondary: '打开通用核心路线',
  routeStatusAll: '\u6b63\u5728\u663e\u793a\u5168\u90e8 22 \u7ae0\u3002',
  routeStatusA: '\u6b63\u5728\u663e\u793a A \u00b7 \u521d\u8bc6 Codex \u7684 6 \u7ae0\u3002',
  routeStatusB: '\u6b63\u5728\u663e\u793a B \u00b7 \u771f\u5b9e\u5de5\u4f5c\u7684 7 \u7ae0\u3002',
  routeStatusC: '\u6b63\u5728\u663e\u793a C \u00b7 \u80fd\u529b\u6269\u5c55\u7684 5 \u7ae0\u3002',
  routeStatusD: '\u6b63\u5728\u663e\u793a D \u00b7 \u56e2\u961f\u5b9e\u8df5\u7684 4 \u7ae0\u3002',
  labsIndexLink: '\u6253\u5f00\u5b9e\u9a8c\u89c4\u5219\u548c\u5168\u90e8 18 \u4e2a\u5165\u53e3',
  featuredLab: '\u7cbe\u9009\u5b9e\u9a8c',
  lab13Title: '\u53ef\u5ba1\u8ba1\u7684\u7ad6\u5411\u5207\u7247',
  lab13Body: '\u5728\u672c\u5730 Markdown \u4efb\u52a1\u4e2d\uff0c\u4ece\u534f\u8bae\u548c\u57fa\u7ebf\u5f00\u59cb\uff0c\u8d70\u5b8c\u68c0\u67e5\u70b9\u3001\u5dee\u5f02\u3001\u6700\u5c0f\u68c0\u67e5\u3001\u5931\u8d25\u4e0e\u8fc1\u79fb\u3002',
  lab14Title: '\u6062\u590d\u524d\u7684\u4efb\u52a1\u5bf9\u9f50',
  lab14Body: '\u5728\u7ee7\u7eed\u4e4b\u524d\uff0c\u5bf9\u9f50\u4efb\u52a1\u6307\u9488\u3001\u76ee\u6807\u3001\u5206\u652f\u3001\u6743\u9650\u548c\u526f\u4f5c\u7528\u72b6\u6001\u3002',
  lab15Title: '\u4ea4\u4ed8\u8bc1\u636e',
  lab15Body: '\u628a\u4e00\u53e5\u5b8c\u6210\u58f0\u660e\u62c6\u6210\u5177\u4f53\u7ed3\u8bba\u3001\u8303\u56f4\u3001\u8f93\u51fa\u548c\u6700\u5c0f\u4e0b\u4e00\u6b65\u68c0\u67e5\u3002',
  lab16Title: '\u526f\u4f5c\u7528\u8fb9\u754c',
  lab16Body: '\u628a\u8bca\u65ad\u4e0e\u5b89\u88c5\u3001\u53d1\u5e03\u3001\u91cd\u542f\u548c\u5176\u4ed6\u6301\u4e45\u6027\u52a8\u4f5c\u5206\u5f00\u3002',
  lab17Title: '\u6280\u80fd\u53d1\u73b0\u5ba1\u67e5',
  lab17Body: '\u5206\u522b\u68c0\u67e5\u662f\u5426\u5b58\u5728\u3001\u80fd\u5426\u53d1\u73b0\u3001\u662f\u5426\u52a0\u8f7d\u3001\u884c\u4e3a\u3001\u8bb8\u53ef\u8bc1\u548c\u91c7\u7528\u3002',
  lab18Title: '\u8bed\u8a00\u8fc1\u79fb',
  lab18Body: '\u4fdd\u7559\u65e0\u8f85\u52a9\u57fa\u7ebf\uff0c\u7ea0\u6b63\u4e00\u4e2a\u963b\u65ad\u610f\u4e49\u7684\u9519\u8bef\uff0c\u518d\u7528\u4e0d\u590d\u7528\u8bfe\u5802\u53e5\u5b50\u7684\u53d8\u5f0f\u4efb\u52a1\u6d4b\u8bd5\u3002',
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
  indexEyebrow: 'Project index', indexTitle: 'Know where each claim lives.', indexIntro: 'This is a human-readable map of the repository: what each layer stores, where to begin, and which source controls its status.',
  fileMapTitle: 'Repository map', fileMapIntro: 'Read the layer that matches the work. The public page is a guide; the files below are the source of truth.',
  fileSiteTitle: 'Public showcase', fileSiteBody: 'index.html, styles.css, app.js, and generated learning-path data.',
  fileChaptersTitle: 'Core learning text', fileChaptersBody: '22 chapters; current artifact status: candidate.',
  fileLabsTitle: 'Observable practice', fileLabsBody: '18 labs; current status: draft; run status: not_run.',
  fileSkillsTitle: 'Reusable methods', fileSkillsBody: '25 project Skills with triggers, boundaries, and evidence contracts.',
  fileDocsTitle: 'Governance and research', fileDocsBody: 'Status, sources, field reports, update rules, and quality records.',
  ledgerTitle: 'Content state', ledgerIntro: 'A compact reading of the current status source. Status describes evidence, not ambition.',
  ledgerProject: 'Project', ledgerChapters: 'Chapters · 22', ledgerLabs: 'Labs · 18', ledgerSkills: 'Skills · 25', ledgerResearch: 'Field research', ledgerResearchNote: 'user reports; not locally reproduced', ledgerSource: 'Open the current status source',
  localeTitle: 'Six-language route', localeIntro: 'Six repository entry locales are registered. All six route tokens are exposed; EN / 中文 UI is reviewed, while the other locales use an explicit English UI fallback during migration.',
  localeEnglish: 'available · default', localeChinese: 'available · current toggle', localeSpanish: 'route exposed · UI fallback', localeGerman: 'route exposed · UI fallback', localeJapanese: 'route exposed · UI fallback', localeKorean: 'route exposed · UI fallback', localeRule: 'Route rule: translated artifacts carry a locale suffix and link to the same locale. A route token is not the same as a completed translation or reviewed UI.',
  researchTitle: 'Real problems, with the boundary attached.', researchIntro: 'The research index turns public Codex issues, first-party safety guidance, and forum reports into symptoms, source-scoped boundaries, safe checks, and teaching links. It does not claim an official root cause or local reproduction.', researchBoundary: 'source-scoped guidance and public reports · no local reproduction recorded', researchIndexLink: 'Open the field-problems index', researchIndexBody: 'Codex, surfaces, handoffs, authentication, worktrees, and verification symptoms.', researchForumsLink: 'Read the forum case notes', researchForumsBody: 'Sandbox network allowlists, Windows spawn failures, approvals, encoding, and private paths.', researchLiveLink: 'Review three current field cases', researchLiveBody: 'Worktree target, hidden evidence, and verification scope; all remain unverified locally.', researchSafetyLink: 'Read the AI collaboration safety boundaries', researchSafetyBody: 'Prompt injection, minimum necessary input, action authority, and verification; source-backed candidate research.', researchReceiptsLink: 'Read the AI safety field signals', researchReceiptsBody: 'Public reports, claim classification, and a checkpoint for long research tasks; candidate research.', researchFirstTurnLink: 'Draft a universal first turn', researchFirstTurnBody: 'A six-field, text-only Spanish or research card; candidate research, not platform equivalence or an outcome claim.', researchPublicInterestLink: 'Run the public-interest safety inquiry', researchPublicInterestBody: 'A fixed fictional case: people, data boundary, human control, evidence, and stop; candidate / not_run.', problemPublicInterestSafetyTitle: 'I need to assess an AI idea that could affect people.', problemPublicInterestSafetyBody: 'Name one decision, the people it could burden, necessary data, human recourse, evidence, and the point where the work must stop.', problemPublicInterestSafetyLink: 'Run the fixed safety inquiry · candidate · not_run ↗',
});

Object.assign(copy.zh, {
  indexEyebrow: '\u9879\u76ee\u7d22\u5f15', indexTitle: '\u5148\u77e5\u9053\u6bcf\u4e2a\u7ed3\u8bba\u653e\u5728\u54ea\u91cc\u3002', indexIntro: '\u8fd9\u662f\u4ed3\u5e93\u7684\u4eba\u7c7b\u53ef\u8bfb\u5730\u56fe\uff1a\u6bcf\u5c42\u5b58\u4ec0\u4e48\u3001\u4ece\u54ea\u91cc\u5f00\u59cb\uff0c\u4ee5\u53ca\u54ea\u4e2a\u6e90\u6587\u4ef6\u63a7\u5236\u72b6\u6001\u3002',
  fileMapTitle: '\u4ed3\u5e93\u5730\u56fe', fileMapIntro: '\u6309\u5de5\u4f5c\u7c7b\u578b\u8bfb\u5bf9\u5e94\u7684\u5c42\u3002\u516c\u5f00\u9875\u9762\u662f\u6307\u5357\uff0c\u4e0b\u9762\u7684\u6587\u4ef6\u624d\u662f\u4fe1\u606f\u6e90\u3002',
  fileSiteTitle: '\u516c\u5f00\u5c55\u793a', fileSiteBody: 'index.html\u3001styles.css\u3001app.js \u4e0e\u751f\u6210\u7684\u5b66\u4e60\u8def\u5f84\u6570\u636e\u3002',
  fileChaptersTitle: '\u6838\u5fc3\u6559\u7a0b\u6b63\u6587', fileChaptersBody: '22 \u7ae0\uff1b\u5f53\u524d\u6587\u4ef6\u72b6\u6001\uff1acandidate\u3002',
  fileLabsTitle: '\u53ef\u89c2\u5bdf\u7684\u5b9e\u8df5', fileLabsBody: '18 \u4e2a\u5b9e\u9a8c\uff1b\u5f53\u524d\u72b6\u6001\uff1adraft\uff1b\u8fd0\u884c\u72b6\u6001\uff1anot_run\u3002',
  fileSkillsTitle: '\u53ef\u590d\u7528\u65b9\u6cd5', fileSkillsBody: '25 \u4e2a\u9879\u76ee Skill\uff0c\u5305\u542b\u89e6\u53d1\u3001\u8fb9\u754c\u4e0e\u8bc1\u636e\u5951\u7ea6\u3002',
  fileDocsTitle: '\u6cbb\u7406\u4e0e\u7814\u7a76', fileDocsBody: '\u72b6\u6001\u3001\u6765\u6e90\u3001\u73b0\u5b9e\u95ee\u9898\u3001\u66f4\u65b0\u89c4\u5219\u4e0e\u8d28\u91cf\u8bb0\u5f55\u3002',
  ledgerTitle: '\u5185\u5bb9\u72b6\u6001', ledgerIntro: '\u5f53\u524d\u72b6\u6001\u6e90\u7684\u7b80\u8bfb\u7248\u3002\u72b6\u6001\u63cf\u8ff0\u8bc1\u636e\uff0c\u4e0d\u63cf\u8ff0\u613f\u666f\u3002',
  ledgerProject: '\u9879\u76ee', ledgerChapters: '\u7ae0\u8282 \u00b7 22', ledgerLabs: '\u5b9e\u9a8c \u00b7 18', ledgerSkills: 'Skill \u00b7 25', ledgerResearch: '\u73b0\u5b9e\u95ee\u9898\u7814\u7a76', ledgerResearchNote: '\u7528\u6237\u62a5\u544a\uff1b\u672c\u5730\u672a\u590d\u73b0', ledgerSource: '\u6253\u5f00\u5f53\u524d\u72b6\u6001\u6e90',
  localeTitle: '\u516d\u8bed\u79cd\u8def\u7ebf', localeIntro: '\u4ed3\u5e93\u5df2\u767b\u8bb0\u516d\u79cd\u5165\u53e3\u8bed\u8a00\u3002\u5f53\u524d\u5c55\u793a\u9875\u53ea\u80fd\u5207\u6362 EN / \u4e2d\u6587\uff1b\u5176\u4ed6\u5165\u53e3\u5207\u7247\u4ecd\u5728\u8fc1\u79fb\u5ba1\u67e5\u4e2d\u3002',
  localeEnglish: '\u53ef\u7528 \u00b7 \u9ed8\u8ba4', localeChinese: '\u53ef\u7528 \u00b7 \u5f53\u524d\u5207\u6362', localeSpanish: '\u5165\u53e3\u5207\u7247 \u00b7 UI \u56de\u9000', localeGerman: '\u5165\u53e3\u5207\u7247 \u00b7 UI \u56de\u9000', localeJapanese: '\u5165\u53e3\u5207\u7247 \u00b7 UI \u56de\u9000', localeKorean: '\u5165\u53e3\u5207\u7247 \u00b7 UI \u56de\u9000', localeRule: '\u8def\u7531\u89c4\u5219\uff1a\u7ffb\u8bd1\u6587\u4ef6\u4f7f\u7528\u8bed\u8a00\u540e\u7f00\u5e76\u94fe\u5230\u540c\u4e00\u8bed\u8a00\u3002\u5f53\u524d\u8fc1\u79fb\u8986\u76d6\u5165\u53e3\u5207\u7247\uff0c\u4e0d\u4ee3\u8868\u6574\u672c\u4e66\u6216\u8fd0\u884c\u65f6 UI \u5df2\u5b8c\u6210\u516d\u8bed\u79cd\u652f\u6301\u3002',
  researchTitle: '\u628a\u73b0\u5b9e\u95ee\u9898\u548c\u8bc1\u636e\u8fb9\u754c\u4e00\u8d77\u653e\u4e0a\u3002', researchIntro: '\u7814\u7a76\u7d22\u5f15\u628a\u516c\u5f00 Codex issue\u3001\u4e00\u624b\u5b89\u5168\u6307\u5f15\u4e0e\u8bba\u575b\u62a5\u544a\u6574\u7406\u6210\u75c7\u72b6\u3001\u6709\u6765\u6e90\u8303\u56f4\u7684\u8fb9\u754c\u3001\u5b89\u5168\u68c0\u67e5\u4e0e\u6559\u5b66\u94fe\u63a5\u3002\u5b83\u4e0d\u58f0\u79f0\u5b98\u65b9\u6839\u56e0\u6216\u672c\u5730\u590d\u73b0\u3002', researchBoundary: '\u6709\u6765\u6e90\u8303\u56f4\u7684\u6307\u5f15\u4e0e\u516c\u5f00\u62a5\u544a \u00b7 \u6ca1\u6709\u672c\u5730\u590d\u73b0\u8bb0\u5f55', researchIndexLink: '\u6253\u5f00\u73b0\u5b9e\u95ee\u9898\u7d22\u5f15', researchIndexBody: 'Codex\u3001\u5de5\u4f5c\u9762\u3001\u4ea4\u63a5\u3001\u8ba4\u8bc1\u3001worktree \u4e0e\u9a8c\u8bc1\u75c7\u72b6\u3002', researchForumsLink: '\u9605\u8bfb\u8bba\u575b\u6848\u4f8b\u7b14\u8bb0', researchForumsBody: 'sandbox \u7f51\u7edc allowlist\u3001Windows spawn \u5931\u8d25\u3001\u5ba1\u6279\u3001\u7f16\u7801\u4e0e\u79c1\u5bc6\u8def\u5f84\u3002', researchLiveLink: '\u590d\u6838\u4e09\u4e2a\u5f53\u524d\u73b0\u573a\u6848\u4f8b', researchLiveBody: 'Worktree \u76ee\u6807\u3001\u9690\u85cf\u8bc1\u636e\u4e0e\u9a8c\u8bc1\u8d8a\u754c\uff1b\u672c\u5730\u5747\u672a\u590d\u73b0\u3002', researchSafetyLink: '\u9605\u8bfb AI \u534f\u4f5c\u5b89\u5168\u8fb9\u754c', researchSafetyBody: '\u63d0\u793a\u6ce8\u5165\u3001\u6700\u5c0f\u5fc5\u8981\u8f93\u5165\u3001\u884c\u52a8\u6743\u9650\u4e0e\u9a8c\u8bc1\uff1b\u6709\u6765\u6e90\u8303\u56f4\u7684 candidate \u7814\u7a76\u3002', researchReceiptsLink: '\u9605\u8bfb AI \u5b89\u5168\u73b0\u573a\u4fe1\u53f7', researchReceiptsBody: '\u516c\u5f00\u62a5\u544a\u3001\u65ad\u8a00\u5206\u7c7b\u4e0e\u957f\u4efb\u52a1\u7814\u7a76\u68c0\u67e5\u70b9\uff1b candidate \u7814\u7a76\u3002', researchFirstTurnLink: '\u8d77\u8349\u4e00\u6b21\u901a\u7528\u9996\u8f6e\u8bf7\u6c42', researchFirstTurnBody: '\u516d\u4e2a\u5b57\u6bb5\u7684\u7eaf\u6587\u672c\u897f\u73ed\u7259\u8bed\u6216\u7814\u7a76\u5361\uff1bcandidate \u7814\u7a76，\u4e0d\u4ee3\u8868\u5e73\u53f0\u7b49\u4ef7\u6216\u5b66\u4e60\u7ed3\u679c\u3002', researchPublicInterestLink: '\u8fd0\u884c\u516c\u5171\u5229\u76ca\u5b89\u5168\u8be2\u95ee', researchPublicInterestBody: '\u56fa\u5b9a\u865a\u6784\u6848\u4f8b：\u4eba\u3001\u6570\u636e\u8fb9\u754c\u3001\u4eba\u7c7b\u63a7\u5236\u3001\u8bc1\u636e\u548c\u505c\u6b62；candidate / not_run\u3002', problemPublicInterestSafetyTitle: '\u6211\u9700\u8981\u8bc4\u4f30\u4e00\u4e2a\u53ef\u80fd\u5f71\u54cd\u4ed6\u4eba\u7684 AI \u60f3\u6cd5\u3002', problemPublicInterestSafetyBody: '\u5199\u4e0b\u4e00\u4e2a\u51b3\u7b56\u3001\u53ef\u80fd\u627f\u62c5\u5f71\u54cd\u7684\u4eba\u3001\u5fc5\u8981\u6570\u636e\u3001\u4eba\u7c7b\u6551\u6d4e\u3001\u8bc1\u636e，\u4ee5\u53ca\u5fc5\u987b\u505c\u4e0b\u7684\u65f6\u70b9\u3002', problemPublicInterestSafetyLink: '\u8fd0\u884c\u56fa\u5b9a\u5b89\u5168\u8be2\u95ee \u00b7 candidate \u00b7 not_run \u2197'
});

Object.assign(copy.en, {
  visualCaseTitle: 'See the method in context.',
  visualCaseIntro: 'Teaching boards and a rendered concept case follow one thread: request → boundary → artifact → evidence.',
  visualCaseBoundary: 'local rendering evidence · no customer or live-system claim',
  visualModelLink: 'Request to evidence',
  visualModelBody: 'Scope, action, check, and bounded handoff.',
  visualSkillLink: 'Four evidence lenses',
  visualSkillBody: 'Existence, correctness, readiness, and learning.',
  visualFieldLink: 'Field signal → safe degradation',
  visualFieldBody: 'Three open reports; no local reproduction or official root-cause confirmation.',
  visualCaseLink: 'Beginner practice loop',
  visualCaseBody: 'Attempt first, correct one issue, vary the case, then keep a bounded receipt.'
});

Object.assign(copy.zh, {
  visualCaseTitle: '\u770b\u4e00\u4e2a\u65b9\u6cd5\u5982\u4f55\u4ea7\u751f\u4ea4\u4ed8\u7269\u3002',
  visualCaseIntro: '\u6559\u5b66\u56fe\u677f\u4e0e\u771f\u5b9e\u6e32\u67d3\u6848\u4f8b\u6cbf\u7740\u540c\u4e00\u6761\u7ebf\u7d22\uff1a\u8bf7\u6c42 \u2192 \u8fb9\u754c \u2192 \u4ea4\u4ed8\u7269 \u2192 \u8bc1\u636e\u3002',
  visualCaseBoundary: '\u672c\u5730\u6e32\u67d3 \u00b7 \u6982\u5ff5\u6848\u4f8b',
  visualModelLink: '\u4ece\u8bf7\u6c42\u5230\u8bc1\u636e',
  visualModelBody: '\u8303\u56f4\u3001\u884c\u52a8\u3001\u68c0\u67e5\u4e0e\u6709\u8fb9\u754c\u7684\u4ea4\u63a5\u3002',
  visualSkillLink: '\u56db\u4e2a\u8bc1\u636e\u955c\u5934',
  visualSkillBody: '\u5b58\u5728\u3001\u6b63\u786e\u3001\u53ef\u7528\u4e0e\u771f\u6b63\u5b66\u4f1a\u3002',
  visualFieldLink: '\u73b0\u573a\u4fe1\u53f7 \u2192 \u5b89\u5168\u964d\u7ea7',
  visualFieldBody: '\u4e09\u4e2a\u4ecd\u5f00\u653e\u7684\u516c\u5f00\u62a5\u544a\uff1b\u65e0\u672c\u5730\u590d\u73b0\u6216\u5b98\u65b9\u6839\u56e0\u786e\u8ba4\u3002',
  visualCaseLink: '\u5165\u95e8\u5b9e\u8df5\u5faa\u73af',
  visualCaseBody: '\u5148\u5c1d\u8bd5\uff0c\u53ea\u4fee\u6b63\u4e00\u4e2a\u95ee\u9898\uff0c\u6539\u53d8\u60c5\u5883\u540e\u518d\u7ec3\uff0c\u6700\u540e\u4fdd\u7559\u6709\u8fb9\u754c\u7684\u8bc1\u636e\u56de\u6267\u3002'
});

Object.assign(copy.en, {
  searchLabel: 'Search the Playbook',
  searchPlaceholder: 'Search chapters, labs, Skills, or field cases',
  searchSubmit: 'Search',
  searchTitle: 'Find a bounded answer.',
  searchClear: 'Clear',
  searchNoQuery: 'Type a word or phrase to search the Playbook.',
  searchLoading: 'Loading the local search index…',
  searchNoResults: 'No results for “{query}”. Try a chapter title, Skill name, or narrower phrase.',
  searchResultsCount: '{count} results for “{query}”.',
  searchIndexUnavailable: 'The local search index could not be loaded. Check the connection, then submit again to retry.',
  searchFallback: 'English source shown · requested translation is not ready',
  searchOpen: 'Open reader',
  searchKindChapter: 'Chapter',
  searchKindLab: 'Lab',
  searchKindSkill: 'Skill method',
  searchKindFieldNote: 'Field note',
  searchKindProject: 'Project entry',
  searchKindBook: 'Book entry',
  searchKindDocument: 'Document',
  navStart: 'Start here',
  startEyebrow: 'Start here · choose by problem',
  startTitle: 'What do you need to do?',
  startIntro: 'Choose the closest real problem. Each route names a first action, points to one canonical chapter or lab, and keeps the current evidence status visible.',
  problemStartTitle: 'I need a safe first task.',
  problemStartBody: 'Use a disposable or reversible change. Inspect before editing, then keep the diff and the check result.',
  problemStartLink: 'Open lab 001 · draft · not_run ↗',
  problemWrongFileTitle: 'The file or result is uncertain.',
  problemWrongFileBody: 'Freeze the next edit. Compare the requested scope, git diff, focused check, and remaining unknowns.',
  problemWrongFileLink: 'Open chapter 9 · candidate ↗',
  problemSkillTitle: 'I need to choose or design a Skill.',
  problemSkillBody: 'Start with the trigger, inputs, boundaries, and evidence contract; only then decide whether a Skill earns a place.',
  problemSkillLink: 'Open chapter 11 · candidate ↗',
  problemUpdateTitle: 'I need to publish or update safely.',
  problemUpdateBody: 'Locate the canonical file, attach the source record, run the relevant gate, and keep unverified claims out of the release.',
  problemUpdateLink: 'Open chapter 22 · candidate ↗',
  problemIntakeTitle: 'I have a broad goal and do not know what to practise first.',
  problemIntakeBody: 'Ask one decision at a time. Pick one existing route, one checkable attempt, permitted help, and a smaller fallback.',
  problemIntakeLink: 'Open first-practice intake · candidate · not_run ↗',
  problemLanguageTitle: 'I want to practise one language skill.',
  problemLanguageBody: 'Define one observable performance, attempt it before instruction, correct one meaning-blocking error, then test a changed case.',
  problemLanguageLink: 'Open language route · candidate · not_run ↗',
  problemResearchTitle: 'I need to research one bounded question.',
  problemResearchBody: 'Tie the question to a decision, assign source owners, keep a claim ledger, search for disagreement, and stop on purpose.',
  problemResearchLink: 'Open research route · candidate · not_run ↗',
  problemRecoveryTitle: 'The model answered the wrong task.',
  problemRecoveryBody: 'Preserve the request, visible context, actual reply, and expected result. Change one communication condition, then run a safe comparison.',
  problemRecoveryLink: 'Open recovery handoff · candidate · not_run ↗',
  repositoryStripAria: 'Canonical source directories and current boundaries',
  repositoryStripTitle: 'What this repository contains',
  repositoryStripIntro: 'The public reader is rendered from site/. The canonical learning and maintenance sources below keep their current evidence boundary visible.',
  repositoryChapters: '22 chapters · candidate',
  repositoryLabs: '18 labs · 2 maintainer references · 0 learner runs',
  repositorySkills: '25 reusable Skills · candidate',
  repositoryDocs: 'Governance and field research · candidate; reports not locally reproduced',
});

Object.assign(copy.zh, {
  searchLabel: '搜索 Prysai LLM Playbook',
  searchPlaceholder: '搜索章节、实验、Skill 或现实问题',
  searchSubmit: '搜索',
  searchTitle: '找到有边界的答案。',
  searchClear: '清除',
  searchNoQuery: '输入词语或短语，搜索 Prysai LLM Playbook。',
  searchLoading: '正在加载本地搜索索引……',
  searchNoResults: '没有找到“{query}”的结果。试试章节标题、Skill 名称或更窄的短语。',
  searchResultsCount: '“{query}”的结果：{count} 条。',
  searchIndexUnavailable: '本地搜索索引未能加载。请检查连接，然后再次提交搜索以重试。',
  searchFallback: '显示英文源文件 · 请求的翻译尚未就绪',
  searchOpen: '打开阅读器',
  searchKindChapter: '章节',
  searchKindLab: '实验',
  searchKindSkill: 'Skill 方法',
  searchKindFieldNote: '现场研究记录',
  searchKindProject: '项目入口',
  searchKindBook: '书稿入口',
  searchKindDocument: '文档',
  navStart: '从这里开始',
  startEyebrow: '从这里开始 · 按问题选择',
  startTitle: '你现在要做什么？',
  startIntro: '选择最接近你的真实问题。每条路线都说明第一步，指向一个正式章节或实验，并保留当前证据状态。',
  problemStartTitle: '我需要一个安全的第一个任务。',
  problemStartBody: '先用一个可丢弃或可回滚的改动。先检查再编辑，保留差异和检查结果。',
  problemStartLink: '打开实验 001 · draft · not_run ↗',
  problemWrongFileTitle: '文件或结果不确定。',
  problemWrongFileBody: '暂停下一次编辑。对照请求范围、git diff、针对性检查与剩余未知。',
  problemWrongFileLink: '打开第 9 章 · candidate ↗',
  problemSkillTitle: '我需要选择或设计一个 Skill。',
  problemSkillBody: '先写清触发条件、输入、边界与证据契约，再决定它是否值得成为一项 Skill。',
  problemSkillLink: '打开第 11 章 · candidate ↗',
  problemUpdateTitle: '我需要安全地发布或更新。',
  problemUpdateBody: '先找到规范文件，附上来源记录，运行对应门槛，不要把未验证的结论带进发布。',
  problemUpdateLink: '打开第 22 章 · candidate ↗',
  problemIntakeTitle: '我的目标很宽泛，不知道先练什么。',
  problemIntakeBody: '一次只澄清一个决定：选一条已有路线、一次可检查尝试、允许的帮助和更小的回退。',
  problemIntakeLink: '打开首次练习入口 · candidate · not_run ↗',
  problemLanguageTitle: '我想练习一项具体语言能力。',
  problemLanguageBody: '先定义可观察表现，再尝试；只纠正一个阻断意义的错误，然后用变化情境测试迁移。',
  problemLanguageLink: '打开语言路线 · candidate · not_run ↗',
  problemGeneralSkillTitle: '我想练习另一项真实技能。',
  problemGeneralSkillBody: '把面试回答、概念解释或演讲变成一次限时表现，再更换一个关键条件复测。',
  problemGeneralSkillLink: '打开通用技能路线 · candidate · not_run ↗',
  problemResearchTitle: '我需要研究一个有边界的问题。',
  problemResearchBody: '把问题绑定到决定，指定事实来源，保存声明台账，寻找反证，并按停止条件收束。',
  problemResearchLink: '打开研究路线 · candidate · not_run ↗',
  problemRecoveryTitle: '模型回答了错误的任务。',
  problemRecoveryBody: '保留原请求、可见上下文、实际回复和预期结果。只改变一个沟通条件，再进行安全对照。',
  problemRecoveryLink: '打开恢复交接 · candidate · not_run ↗',
  repositoryStripAria: '规范源文件夹与当前边界',
  repositoryStripTitle: '这个仓库包含什么',
  repositoryStripIntro: '公开阅读页面由 site/ 渲染。下面是教程与维护的规范源目录，它们保留当前证据边界。',
  repositoryChapters: '22 章 · candidate',
  repositoryLabs: '18 个实验 · 2 个维护者参考运行 · 0 个学习者运行',
  repositorySkills: '25 个可复用 Skill · candidate',
  repositoryDocs: '治理与现实研究 · candidate；报告尚未在本地复现',
});

Object.assign(copy.en, {
  skillCardIndex: '03 / SKILL PRACTICE',
  skillCardScope: 'fictional plan · no tool authority',
  skillCardTitle: 'Practise one small planning skill before asking for help.',
  skillCardIntro: 'Make a short fictional park-visit plan yourself. The model must wait, give one small hint, and then test the same skill under one changed limit.',
  skillCardStepOne: 'Copy the card into any text chat. It contains a fictional situation and needs no account, file, tool, or personal detail.',
  skillCardStepTwo: 'Write the first plan yourself within four minutes. Do not ask for a model plan or a polished replacement first.',
  skillCardStepThree: 'Accept one short hint, correct your own plan, then try the changed time limit without help.',
  skillCardLink: 'Read the skill-practice boundary',
  skillCardBoundary: 'Candidate practice only: a short fictional plan cannot prove planning ability, judgement, transfer, retention, safety, or independent performance.',
  skillPromptText: 'Help me practise making a small plan. Do not make the plan first.\n\nPractice task: plan a fictional 45-minute visit to a city park for one adult. Include a water bottle, a weather check, and one return-time reminder. This is not a real booking, travel decision, or weather forecast.\n\nBefore I write, show this fixed check: 3–5 steps; all three constraints appear; no unsupported local facts; and a person could follow the plan. Give me four minutes to write it. Do not show a model plan, expand it, or grade it before I respond.\n\nAfter my first attempt, name one consequential omission only. Ask one question or give a hint of no more than 12 words, then wait for my correction. Preserve both attempts. Then change only the visit length from 45 minutes to 20 minutes and ask for one new plan without help, using the same check.\n\nEnd with exactly one status: practised, demonstrated_on_this_task, transferred_to_time_limit_variation, or not_run. One session does not establish planning ability, judgement, safety, or independent performance.',
  promptCardShow: 'Show the prompt',
});

Object.assign(copy.zh, {
  skillCardIndex: '03 / 技能练习',
  skillCardScope: '虚构计划 · 不授予工具权限',
  skillCardTitle: '先自己练一次小型计划，再请求帮助。',
  skillCardIntro: '先自己完成一个虚构的公园访问计划。模型必须等待、只给一个小提示，再用一个变化后的限制检查同一项技能。',
  skillCardStepOne: '把卡片复制到任意纯文本对话。它使用虚构情境，不需要账号、文件、工具或个人信息。',
  skillCardStepTwo: '在四分钟内先自己写出计划。不要先索要模型计划或润色后的替代答案。',
  skillCardStepThree: '接受一个简短提示，自己修改计划，然后在没有帮助的情况下尝试变化后的时间限制。',
  skillCardLink: '阅读技能练习边界',
  skillCardBoundary: '仅为 candidate 练习：一份简短的虚构计划不能证明计划能力、判断力、迁移、记忆保持、安全或独立表现。',
  skillPromptText: '帮助我练习制定一个小计划。不要先替我制定计划。\n\n练习任务：为一名成年人制定一次虚构的 45 分钟城市公园访问计划。计划中要有水瓶、天气检查和一项返回时间提醒。这不是真实预订、出行决策或天气预报。\n\n在我写之前，先展示固定检查项：3–5 个步骤；三个限制都出现；不写未经证实的本地事实；并且一个人能够照着计划执行。给我四分钟写计划。在我回答前，不要展示示范计划、扩写或评分。\n\n在我的第一次尝试后，只指出一个重要遗漏。问一个问题或给出不超过 12 个词的提示，然后等待我自己修改。保留两次尝试。随后只把访问时长从 45 分钟改为 20 分钟，并用相同检查项要求我在没有帮助的情况下写一份新计划。\n\n最后只能给出一种状态：practised、demonstrated_on_this_task、transferred_to_time_limit_variation 或 not_run。一次练习不能证明计划能力、判断力、安全或独立表现。',
  promptCardShow: '显示提示词',
});

Object.assign(copy.en, {
  skillsTitle: 'Twenty-five Skills. Distinct jobs.',
  skillPromptCardName: 'Prompt Card Editor',
  skillPromptCard: 'Turn one authorized prompt idea into a source-aware teaching card.',
  skillAdversarialName: 'Adversarial Project Review',
  skillAdversarial: 'Rank material weaknesses before a publication or release decision.',
  skillEscalationName: 'Request Escalation',
  skillEscalation: 'Choose the smallest safe lane before drafting, researching, or acting.',
  skillComparisonName: 'LLM Comparison Protocol',
  skillComparison: 'Plan a fair two-candidate comparison without inventing a leaderboard.',
  skillPracticeTargetName: 'Practice Target',
  skillPracticeTarget: 'Turn a broad learning wish into one observable first attempt.',
  skillFactWatchName: 'Platform Fact Watch',
  skillFactWatch: 'Map a changing product claim before a named step misleads readers.',
  troubleFourBody: 'Keep the task goal; pause only the named step, then refresh the official fact record before resuming.',
  skillRouteEscalation: 'I am not sure what kind of help I need yet.',
  skillRouteEscalationResult: 'Chooses the smallest safe lane before drafting, researching, or acting.',
  skillIndexLink: 'Open the Skill registry and all 25 methods',
  skillFootnote: 'All 25 project Skills pass structural checks and remain candidate; fresh-task evidence is partial. Practice Target sets up one first attempt; it does not prove learning. Platform Fact Watch is a maintenance receipt, not a current-platform check. LLM Comparison Protocol is an unrun comparison method, not a model ranking. Adversarial Project Review is not an external review.',
  fileSkillsBody: '25 project Skills with triggers, boundaries, and evidence contracts.',
  ledgerSkills: 'Skills · 25',
  repositorySkills: '25 reusable Skills · candidate',
});

Object.assign(copy.zh, {
  skillsTitle: '二十五个 Skill，各有职责。',
  skillPromptCardName: '提示卡编辑器 Prompt Card Editor',
  skillPromptCard: '把一个已授权的提示想法整理成带来源边界的教学卡。',
  skillAdversarialName: '对抗式项目审查',
  skillAdversarial: '在发布或发行决定前排序最关键的项目弱点。',
  skillEscalationName: '请求分流',
  skillEscalation: '在起草、研究或行动前选择最小且安全的路径。',
  skillComparisonName: 'LLM 比较协议',
  skillComparison: '用固定条件规划两候选比较，不制造排行榜。',
  skillPracticeTargetName: '练习目标',
  skillPracticeTarget: '把宽泛的学习愿望变成一次可观察的首次尝试。',
  skillRouteEscalation: '我还不确定自己需要哪一种帮助。',
  skillRouteEscalationResult: '在起草、研究或行动前选择最小且安全的路径。',
  skillIndexLink: '打开 Skill 登记表与全部 25 个方法',
  skillFootnote: '25 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整。练习目标用于准备一次首次尝试，不能证明学习结果。平台事实巡检是维护记录，不是当前平台检查。LLM 比较协议尚未运行，不是模型排行榜。对抗式项目审查不代表外部评审。',
  fileSkillsBody: '25 \u4e2a\u9879\u76ee Skill，包含触发、边界与证据契约。',
  ledgerSkills: 'Skill \u00b7 25',
  repositorySkills: '25 个可复用 Skill · candidate',
});

Object.assign(copy.zh, {
  skillsTitle: '二十五个 Skill，各有职责。',
  skillFactWatchName: '平台事实巡检 Platform Fact Watch',
  skillFactWatch: '在命名步骤误导读者之前，先定位变化的产品事实。',
  skillIndexLink: '打开 Skill 登记表与全部 25 个方法',
  skillFootnote: '25 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整。练习目标用于准备一次首次尝试，不能证明学习结果。平台事实巡检是维护记录，不是当前平台检查。LLM 比较协议尚未运行，不是模型排行榜。对抗式项目审查不代表外部评审。',
  fileSkillsBody: '25 个项目 Skill，包含触发、边界与证据契约。',
  ledgerSkills: 'Skill · 25',
  repositorySkills: '25 个可复用 Skill · candidate',
  mobileIndexUpdates: '更新区域',
  mobileIndexTrust: '可信度类型',
  troubleFourBody: '保留任务目标；只暂停命名步骤，然后刷新官方事实记录再继续。',
});

Object.assign(copy.zh, {
  fileSkillsBody: '25 \u4e2a\u9879\u76ee Skill，包含触发、边界与证据契约。',
  ledgerSkills: 'Skill \u00b7 25',
});

Object.assign(copy.en, {
  heroSecondary: 'Try a five-minute prompt card',
  promptDeckEyebrow: 'Optional prompt cards · five minutes',
  promptDeckTitle: 'Start with one small conversation.',
  promptDeckIntro: 'Copy one original, text-only card. The language card needs no editing; the research card has two brackets. Inspect the response yourself, and keep the claim small: one attempt is not fluency, research, or a finished answer.',
  promptContractKicker: 'Before you send',
  promptContractTitle: 'Make six parts visible.',
  promptContractLink: 'Read the rationale',
  promptContractGridAria: 'Six fields to inspect in a first LLM request',
  promptContractOutcomeLabel: 'Outcome', promptContractOutcomeBody: 'One small, observable result.',
  promptContractContextLabel: 'Starting context', promptContractContextBody: 'What you know or supply.',
  promptContractResponseLabel: 'Requested response', promptContractResponseBody: 'The shape, length, or sequence.',
  promptContractLimitsLabel: 'Limits', promptContractLimitsBody: 'Data and actions that stay out.',
  promptContractCheckLabel: 'Check', promptContractCheckBody: 'What you will inspect yourself.',
  promptContractStopLabel: 'Stop and receipt', promptContractStopBody: 'When to stop and what to keep.',
  promptCardScope: 'text only · no tool authority',
  promptCardCopy: 'Copy prompt',
  promptCardCopied: 'Prompt copied. Follow the three steps, then inspect the reply yourself.',
  promptCardCopyFailed: 'Could not copy the prompt. Select the text manually.',
  spanishCardIndex: '01 / LANGUAGE PRACTICE',
  spanishCardTitle: 'Complete one short typed Spanish study-group time check.',
  spanishCardIntro: 'This text-only card uses fictional study details, waits for your typed attempt, and limits help to one meaning-blocking error.',
  spanishCardStepOne: 'Copy the card exactly as written. It already sets a fictional typed Spanish study-group time check.',
  spanishCardStepTwo: 'Paste it into any text chat. Do not add a real name, school, calendar, account, or payment detail.',
  spanishCardStepThree: 'Type the first answer yourself. A rough attempt is the point; do not ask for the answer first.',
  spanishCardLink: 'Read the practice boundary',
  spanishCardBoundary: 'Candidate text practice only: one typed session cannot show spoken conversation, pronunciation, listening, fluency, accuracy, retention, or independent performance.',
  spanishPromptText: 'Run one four-minute typed Spanish study-group time check with exactly four learner turns. You are a fictional classmate and write first. Use only short present-tense questions. I will type one answer after each question.\n\nFictional study card: Ana; a study group; Tuesday or Thursday; 6:00 or 6:30; library or online; bring one question. I may use the card and look up at most three single words. Do not request or accept a real name, school, calendar, account, address, contact, or payment detail.\n\nBefore turn one, show this fixed rubric: four learner turns; purpose and study group communicated; day and time clarified; place or online option communicated; Spanish understandable enough to continue. Do not teach, translate, or show a model answer before I reply. Preserve my first attempt and record lookups. Correct only the first meaning-blocking error: name the error type, then give a partial cue, then one worked fragment only if I still cannot continue. Ask me to correct it. Keep both attempts and do not call one successful exchange fluency, spoken conversation, or listening/pronunciation evidence.',
  researchCardIndex: '02 / RESEARCH PREP',
  researchCardTitle: 'Prepare a source check, not a verdict.',
  researchCardIntro: 'Turn one narrow question and the material you supplied into a small ledger of claims, gaps, and the next question.',
  researchCardStepOne: 'Copy the card, then replace only its two brackets.',
  researchCardStepTwo: 'Supply only material you may share. Leave personal, private, or high-stakes material out.',
  researchCardStepThree: 'Treat its table as preparation. Open and match sources yourself before relying on a claim.',
  researchCardLink: 'Read the research boundary',
  researchCardBoundary: 'It cannot prove a source exists, is current, or supports a claim. A generated table is not evidence on its own.',
  researchPromptText: 'I have five minutes to prepare a research check, not a final answer.\n\nQuestion: [one narrow question].\nMaterial I supplied: [URLs, titles, excerpts, or "none"].\n\nFirst, restate the question and name what evidence would be needed. Then make a three-row table with: possible claim, supplied source or "missing", and what would need checking. Do not invent citations, state that you opened a source you cannot access, or give a recommendation. Separate fact, report, and inference. If the material is missing, contradictory, personal, or high stakes, stop and tell me the smallest safe next step.\n\nEnd with: sources actually supplied, unknowns, and one question I should answer before continuing.',
});

Object.assign(copy.zh, {
  heroSecondary: '试用一张 5 分钟提示词卡',
  promptDeckEyebrow: '可选提示词卡 · 五分钟',
  promptDeckTitle: '先完成一次小对话。',
  promptDeckIntro: '复制一张项目原创的纯文本卡。语言卡无需修改；研究卡只有两个方括号需要替换。自行检查回复，保持结论很小：一次尝试不代表学会语言、完成研究或得到最终答案。',
  promptContractKicker: '发送前',
  promptContractTitle: '把六个部分写清楚。',
  promptContractLink: '阅读设计理由',
  promptContractGridAria: '首轮大模型请求中需要检查的六个字段',
  promptContractOutcomeLabel: '结果', promptContractOutcomeBody: '一个小而可观察的结果。',
  promptContractContextLabel: '起始上下文', promptContractContextBody: '你知道或提供的内容。',
  promptContractResponseLabel: '请求的回答', promptContractResponseBody: '回答的形式、长度或顺序。',
  promptContractLimitsLabel: '限制', promptContractLimitsBody: '不提供的数据，不允许的行动。',
  promptContractCheckLabel: '检查', promptContractCheckBody: '你要亲自核对的内容。',
  promptContractStopLabel: '停止和记录', promptContractStopBody: '何时停止，要保留什么。',
  promptCardScope: '纯文本 · 不授予工具权限',
  promptCardCopy: '复制提示词',
  promptCardCopied: '提示词已复制。按三步操作，再自行检查回复。',
  promptCardCopyFailed: '无法复制提示词，请手动选择文字。',
  spanishCardIndex: '01 / 语言练习',
  spanishCardTitle: '完成一次简短的文字版西班牙语学习小组时间确认。',
  spanishCardIntro: '这张纯文字卡可以原样复制：它使用虚构学习信息，先等待你的文字尝试，并且只处理一个阻碍含义的错误。',
  spanishCardStepOne: '原样复制整张卡。它已经设定了虚构的文字版西班牙语学习小组时间确认。',
  spanishCardStepTwo: '粘贴到任何纯文本对话中。不要加入真实姓名、学校、日历、账号或支付信息。',
  spanishCardStepThree: '自己先打字回答第一个问题。粗略尝试才是重点；不要先索要答案。',
  spanishCardLink: '阅读练习边界',
  spanishCardBoundary: '仅为 candidate 纯文字练习：一次打字对话不能证明真实口语、发音、听力、流利度、准确性、记忆保持或独立表现。',
  spanishPromptText: '进行一次四分钟文字版西班牙语学习小组时间确认，学习者恰好打字回答四轮。你是虚构同学并先用文字提问。只用简短的现在时问题。我会在每个问题后打字回答一次。\n\n虚构学习卡：Ana；学习小组；周二或周四；6:00 或 6:30；图书馆或线上；带一个问题。我可以使用这张卡，并最多查询三个单词。不要索要或接受真实姓名、学校、日历、账号、地址、联系方式或支付信息。\n\n第一轮前先展示固定量规：四轮学习者回答；目的和学习小组表达清楚；日期和时间已澄清；地点或线上方式表达清楚；西班牙语足以继续文字对话。不要在我回答前教学、翻译或展示模型答案。保留我的初次尝试并记录查询。只纠正第一个阻碍含义的错误：指出错误类型，然后给出部分提示；只有我仍无法继续时才给出一个示范片段。请我自行改正。保留两次尝试，不要把一次成功对话称为流利、真实口语或听力/发音证据。',
  researchCardIndex: '02 / 研究准备',
  researchCardTitle: '准备一次来源检查，不要索要裁决。',
  researchCardIntro: '把一个狭窄问题和你提供的材料变成一份小型台账：可能的声明、缺口和下一个问题。',
  researchCardStepOne: '复制这张卡，然后只替换其中两个方括号。',
  researchCardStepTwo: '只提供你可以分享的材料。不要放入个人、私密或高风险材料。',
  researchCardStepThree: '把表格当作准备工作。在依赖某项声明前，亲自打开并核对来源。',
  researchCardLink: '阅读研究边界',
  researchCardBoundary: '它不能证明来源存在、仍然有效，或确实支持某项声明。生成的表格本身不是证据。',
  researchPromptText: '我有五分钟准备一次研究检查，而不是得到最终答案。\n\n问题：[一个狭窄问题]。\n我提供的材料：[网址、标题、摘录，或“无”]。\n\n先复述问题，并说明需要哪些证据。然后做一个三行表格，包含：可能的声明、我提供的来源或“缺失”、以及需要核对的内容。不要虚构引用，不要声称你打开了无法访问的来源，也不要给出建议。区分事实、报告和推断。如果材料缺失、相互矛盾、涉及个人信息或高风险，请停止并告诉我最小的安全下一步。\n\n最后列出：实际提供的来源、未知之处，以及我继续前应回答的一个问题。',
});

Object.assign(copy.en, {
  heroPrimary: 'Start with a no-setup LLM check',
  heroSecondary: 'Start the Codex Practice Track',
  heroScope: 'One transferable method, with Codex as the current flagship practice track. Named platforms need their own current sources and runnable evidence before they become lessons.',
  heroRouteAria: 'Choose a first route by readiness',
  heroRouteKicker: 'Choose by what you have today',
  heroRouteNoSetupTitle: 'No project or coding background? Start with one no-setup check.',
  heroRouteNoSetupBody: 'Use any chat model and a fictional message. No files, tools, account connection, or private data.',
  heroRouteGuidedTitle: 'Have a disposable project and want Codex? Follow the guided path.',
  heroRouteGuidedBody: 'Start with Chapter 1. The first local edit comes after its scope and evidence boundary are visible.',
  heroRouteFixtureTitle: 'Need a safe file for the Codex path? Open the offline fixture.',
  heroRouteFixtureBody: 'It supplies one target and check after Chapter 2. It is a fallback, not a substitute for the guided path.',
  heroEyebrow: 'Start small · one task, one visible check',
  heroRouteBoundary: 'All three entries are candidate: the structure is checked, but reader outcomes are not yet measured.',
  heroProofAria: 'Optional warm-up proof card',
  heroProofKicker: 'OPTIONAL WARM-UP / INSPECTABLE EXAMPLE',
  heroProofLink: 'Open the optional 15-minute check',
  mobileRouteNoSetup: 'No project? Start with the no-setup check',
  mobileRouteTask: 'Have a disposable project? Start Codex',
  mobileRouteFixture: 'Need a safe file? Open the fixture',
  startIntro: 'For a real local Codex task, begin with one candidate path: boundary map, boundary lab, bounded task, then one reversible lab. Pick another route only when that path does not fit.',
  problemStartTitle: 'I want one safe Codex path.',
  problemStartBody: 'Start with the boundary map, then use Lab 011 to label it before choosing one disposable README change with a diff, focused check, and unverified list.',
  problemStartLink: 'Start Chapter 1 → Lab 011 → Chapter 2 → Lab 001 · candidate / draft ↗',
  first30Eyebrow: 'Optional 15-minute warm-up',
  first30Intro: 'The text, task, and checks are already filled in. Use any chat model; you need no files, terminal, Git, account connection, or special vocabulary. This warm-up rehearses one checking habit; start the Codex path above for a real local task.',
});

Object.assign(copy.zh, {
  heroPrimary: '先做一次免设置的 LLM 检查',
  heroSecondary: '开始 Codex 旗舰实践路线',
  heroScope: '一套可迁移方法，Codex 是当前旗舰实践轨道。任何命名平台都必须先具备当前来源与可运行证据，才能成为课程。',
  heroRouteAria: '按准备程度选择第一条路线',
  heroRouteKicker: '按你今天手头的条件选择',
  heroRouteNoSetupTitle: '没有项目或编程背景？先做一次免设置检查。',
  heroRouteNoSetupBody: '使用任意聊天模型和虚构消息；不需要文件、工具、账户连接或私人数据。',
  heroRouteGuidedTitle: '有可丢弃的项目，而且想练 Codex？走引导路径。',
  heroRouteGuidedBody: '从第 1 章开始。第一次本地编辑会在范围和证据边界清楚之后出现。',
  heroRouteFixtureTitle: 'Codex 路径需要安全文件？打开离线夹具。',
  heroRouteFixtureBody: '它在第 2 章之后提供一个目标和检查，是回退方案，不替代引导路径。',
  heroEyebrow: '从小处开始 · 一个任务，一项可见检查',
  heroRouteBoundary: '三条入口都还是 candidate：结构已检查，读者结果尚未测量。',
  heroProofAria: '可选热身证据卡',
  heroProofKicker: '可选热身 / 可检查示例',
  heroProofLink: '打开可选的 15 分钟检查',
  mobileRouteNoSetup: '没有项目？先做免设置检查',
  mobileRouteTask: '有可丢弃项目？开始 Codex',
  mobileRouteFixture: '需要安全文件？打开夹具',
  startIntro: '要完成真实的本地 Codex 任务，先走一条候选路径：理解边界、标注边界、确定任务、再做一次可回滚的实验。只有不适用时再选择其他路线。',
  problemStartTitle: '我想走一条安全的 Codex 路径。',
  problemStartBody: '先理解边界，再通过实验 011 标注它，然后选择一次可丢弃的 README 修改，并保留差异、针对性检查和未验证清单。',
  problemStartLink: '从第 1 章 → 实验 011 → 第 2 章 → 实验 001 开始 · candidate / draft ↗',
  first30Eyebrow: '可选的 15 分钟热身',
  first30Intro: '原文、任务和检查标准都已经填好。任意聊天模型都可以；不需要文件、终端、Git、账户连接或专业词汇。这个热身只练习一项检查习惯；真实本地任务请从上方的 Codex 路径开始。',
});

const fallbackLocales = {
  en: { suffix: 'EN', html_lang: 'en', display_name: 'English' },
  zh: { suffix: 'ZH', html_lang: 'zh-CN', display_name: '简体中文' },
  es: { suffix: 'ES', html_lang: 'es', display_name: 'Español' },
  ja: { suffix: 'JA', html_lang: 'ja', display_name: '日本語' },
  ko: { suffix: 'KO', html_lang: 'ko', display_name: '한국어' },
  de: { suffix: 'DE', html_lang: 'de', display_name: 'Deutsch' },
};
const loadedLocaleManifest = window.CODEX_LOCALE_MANIFEST;
const localeManifest = loadedLocaleManifest || {
  default_locale: 'en',
  locales: fallbackLocales,
  contents: {},
  aliases: {},
  path_index: {},
};
const requiredLocaleTokens = ['en', 'zh', 'es', 'ja', 'ko', 'de'];
const localeManifestAvailable = Boolean(
  loadedLocaleManifest
  && requiredLocaleTokens.every((token) => loadedLocaleManifest.locales?.[token])
  && loadedLocaleManifest.default_locale === 'en'
);
const localeTokens = Object.keys(localeManifest.locales);
const uiLocales = new Set(['en', 'zh', 'es', 'ja', 'ko', 'de']);
const languageStorageKey = 'prysai-llm-playbook-language';
const legacyLanguageStorageKey = 'codex-field-guide-language';
const languageParam = new URLSearchParams(window.location.search).get('lang');
const hasExplicitLanguageParam = languageParam !== null;
const hasValidLanguageParam = localeTokens.includes(languageParam);
let currentLanguage = hasValidLanguageParam ? languageParam : null;
if (!hasExplicitLanguageParam) {
  try {
    currentLanguage = localStorage.getItem(languageStorageKey);
    if (!currentLanguage) {
      currentLanguage = localStorage.getItem(legacyLanguageStorageKey);
      if (currentLanguage) localStorage.setItem(languageStorageKey, currentLanguage);
    }
  } catch (_) { currentLanguage = null; }
}
currentLanguage = localeTokens.includes(currentLanguage) ? currentLanguage : localeManifest.default_locale;
let effectiveUiLanguage = uiLocales.has(currentLanguage) ? currentLanguage : 'en';

Object.assign(copy.en, {
  promptDeckIntro: 'Choose one original, text-only card. The language and planning cards need no editing; the research card has two brackets. Inspect the response yourself, and keep the claim small: one attempt is not fluency, research, or a finished answer.',
});

Object.assign(copy.zh, {
  promptDeckIntro: '选择一张项目原创的纯文本卡。语言卡和计划卡无需修改；研究卡只有两个方括号需要替换。自行检查回复，保持结论很小：一次尝试不代表学会语言、完成研究或得到最终答案。',
});

Object.assign(copy.en, {
  skillsTitle: 'Twenty-five Skills. Distinct jobs.',
  skillInterruptionName: 'Interruption Checkpoint',
  skillInterruption: 'Preserve what is known before a retry, a model switch, or a new task.',
  skillIndexLink: 'Open the Skill registry and all 25 methods',
  skillFootnote: 'All 25 project Skills pass structural checks and remain candidate; fresh-task evidence is partial. Interruption Checkpoint preserves a task receipt; it does not retry or recover work. Practice Target sets up one first attempt; it does not prove learning. Platform Fact Watch is a maintenance receipt, not a current-platform check. LLM Comparison Protocol is an unrun comparison method, not a model ranking. Adversarial Project Review is not an external review.',
  fileSkillsBody: '25 project Skills with triggers, boundaries, and evidence contracts.',
  ledgerSkills: 'Skills · 25',
  repositorySkills: '25 reusable Skills · candidate',
});

Object.assign(copy.zh, {
  skillsTitle: '二十五个 Skill，各有职责。',
  skillInterruptionName: '中断检查点',
  skillInterruption: '在重试、切换模型或创建新任务前，保留已经知道的事实。',
  skillIndexLink: '打开 Skill 登记表与全部 25 个方法',
  skillFootnote: '25 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整。中断检查点只保留任务回执，不会重试或恢复工作。练习目标用于准备一次首次尝试，不能证明学习结果。平台事实巡检是维护记录，不是当前平台检查。LLM 比较协议尚未运行，不是模型排行榜。对抗式项目审查不代表外部评审。',
  fileSkillsBody: '25 \u4e2a\u9879\u76ee Skill，包含触发、边界与证据契约。',
  ledgerSkills: 'Skill \u00b7 25',
  repositorySkills: '25 个可复用 Skill · candidate',
});

Object.assign(copy.en, {
  skillsTitle: 'Twenty-five Skills. Distinct jobs.',
  skillHandoffName: 'Shift Handoff',
  skillHandoff: 'Separate reusable rules from today’s supplied work item.',
  skillIndexLink: 'Open the Skill registry and all 25 methods',
  skillFootnote: 'All 25 project Skills pass structural checks and remain candidate; fresh-task evidence is partial. Shift Handoff separates stable criteria from one new item; it does not execute or assume model memory. Interruption Checkpoint preserves a task receipt; it does not retry or recover work. Practice Target sets up one first attempt; it does not prove learning. Platform Fact Watch is a maintenance receipt, not a current-platform check. LLM Comparison Protocol is an unrun comparison method, not a model ranking. Adversarial Project Review is not an external review.',
  fileSkillsBody: '25 project Skills with triggers, boundaries, and evidence contracts.',
  ledgerSkills: 'Skills · 25',
  repositorySkills: '25 reusable Skills · candidate',
});

Object.assign(copy.zh, {
  skillsTitle: '二十五个 Skill，各有职责。',
  skillHandoffName: '工作交接',
  skillHandoff: '把稳定准则与当天提供的工作项分开。',
  skillIndexLink: '打开 Skill 登记表与全部 25 个方法',
  skillFootnote: '25 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整。工作交接会拆开稳定准则与当天这项内容，不会执行任务或假设模型记得上一轮。中断检查点只保留任务回执，不会重试或恢复工作。练习目标用于准备一次首次尝试，不能证明学习结果。平台事实巡检是维护记录，不是当前平台检查。LLM 比较协议尚未运行，不是模型排行榜。对抗式项目审查不代表外部评审。',
  fileSkillsBody: '25 \u4e2a\u9879\u76ee Skill，包含触发、边界与证据契约。',
  ledgerSkills: 'Skill \u00b7 25',
  repositorySkills: '25 个可复用 Skill · candidate',
});

const currentCopy = () => copy[effectiveUiLanguage] || copy.en;
const dataLanguage = () => effectiveUiLanguage;
const localeDisplayName = (language) => localeManifest.locales[language]?.display_name || language;
const localeHasUiCopy = (language) => uiLocales.has(language);
const localeIsReady = (record) => record?.exists && ['source', 'verified', 'production-ready'].includes(record.translation_status);
const localeCanRender = (record) => record?.exists && ['source', 'candidate', 'in-progress', 'verified', 'production-ready'].includes(record.translation_status);
const localeCourseCoverage = (language) => localeManifest.localization_coverage?.[language];
const localeCoverageLabel = (language) => {
  const coverage = localeCourseCoverage(language);
  if (!coverage) return '';
  const units = `${coverage.available_units}/${coverage.total_units}`;
  const ui = {
    en: { source: `Course: ${units} source units`, reviewPending: 'independent language review pending', registered: 'registered localized units', translated: `Course: ${units} translated units` },
    zh: { source: `课程：${units} 个源语言单元`, reviewPending: '独立语言审校待完成', registered: '已登记本地化单元', translated: `课程：${units} 个翻译单元` },
    es: { source: `Curso: ${units} unidades fuente`, reviewPending: 'revisión lingüística independiente pendiente', registered: 'unidades localizadas registradas', translated: `Curso: ${units} unidades traducidas` },
    ja: { source: `コース：${units} のソース言語ユニット`, reviewPending: '独立した言語レビュー待ち', registered: '登録済みローカライズユニット', translated: `コース：${units} の翻訳ユニット` },
    ko: { source: `코스: ${units} 소스 언어 유닛`, reviewPending: '독립 언어 검토 대기 중', registered: '등록된 현지화 유닛', translated: `코스: ${units} 번역 유닛` },
    de: { source: `Kurs: ${units} Quell-Einheiten`, reviewPending: 'unabhängige Sprachprüfung ausstehend', registered: 'registrierte lokalisierte Einheiten', translated: `Kurs: ${units} übersetzte Einheiten` },
  }[effectiveUiLanguage] || { source: '', reviewPending: '', registered: '', translated: '' };
  if (coverage.source_units === coverage.total_units) return ui.source;
  if (coverage.candidate_translation_units || coverage.reviewed_translation_units) {
    const review = coverage.candidate_translation_units ? ui.reviewPending : ui.registered;
    return `${ui.translated} · ${review}`;
  }
  return ui.translated;
};
const pagesArtifactMode = Boolean(window.CODEX_PAGES_ARTIFACT);
let searchIndex = window.CODEX_SEARCH_INDEX || null;
let searchIndexLoadPromise = null;
let searchRunGeneration = 0;
const pathFromHref = (href) => {
  if (!href || href.startsWith('#') || /^(?:https?:|mailto:|javascript:)/i.test(href)) return null;
  // Homepage cards may be authored either as a source Markdown link or as a
  // Reader link. Normalize both forms before looking them up in the locale
  // manifest so an existing Reader URL cannot pin a reader to English.
  if (/^reader\.html\?/i.test(href)) {
    try { return new URL(href, window.location.href).searchParams.get('path'); }
    catch (_) { return null; }
  }
  const path = href.split('#', 1)[0].split('?', 1)[0];
  if (!path.startsWith('../')) return null;
  return path.replace(/^\.\.\//, '');
};
const pagesPathFromHref = (href) => {
  const repositoryPath = pathFromHref(href);
  if (repositoryPath) return repositoryPath;
  if (!pagesArtifactMode || !href || href.startsWith('#') || href.startsWith('/') || /^(?:https?:|mailto:|javascript:|reader\.html)/i.test(href)) return null;
  const sitePath = href.split('#', 1)[0].split('?', 1)[0].replace(/^\.\//, '');
  return sitePath.endsWith('.md') ? `site/${sitePath}` : null;
};
const pagesHref = (href, language = currentLanguage) => {
  const path = pagesPathFromHref(href);
  if (!path || !path.endsWith('.md')) return href;
  const hash = href.includes('#') ? href.slice(href.indexOf('#')) : '';
  const localeQuery = localeTokens.includes(language) ? `&lang=${encodeURIComponent(language)}` : '';
  return `reader.html?path=${encodeURIComponent(path)}${localeQuery}${hash}`;
};
const contentFor = (contentId) => localeManifest.contents?.[contentId];
// Some older cards carry short catalog IDs (for example, "chapter-02").
// Normalize them before looking up a localized file, otherwise a readable
// candidate translation is incorrectly replaced by its English source.
const canonicalContentId = (contentId) => localeManifest.aliases?.[contentId] || contentId;
const contentIdForHref = (href) => localeManifest.path_index?.[pathFromHref(href) || ''];
const localizedContentHref = (contentId, fallbackHref) => {
  const content = contentFor(contentId);
  if (!content) return fallbackHref || '';
  const requested = content.locales?.[currentLanguage];
  // Do not silently swap the reader to English. A registered missing unit is
  // rendered as an explicit same-locale unavailable state by Reader.
  const target = requested;
  if (!target?.path) return fallbackHref || '';
  const hash = fallbackHref?.includes('#') ? fallbackHref.slice(fallbackHref.indexOf('#')) : '';
  return `../${target.path}${hash}`;
};
const localizeReaderLinks = () => {
  document.querySelectorAll('a[href]').forEach((anchor) => {
    if (anchor.closest('[data-language-switcher]')) return;
    const sourceHref = anchor.dataset.sourceHref || anchor.getAttribute('href');
    const contentId = canonicalContentId(anchor.dataset.contentId || contentIdForHref(sourceHref));
    if (!contentId) {
      if (pagesPathFromHref(sourceHref)?.endsWith('.md')) {
        anchor.dataset.sourceHref = sourceHref;
        anchor.href = pagesHref(sourceHref);
      }
      return;
    }
    anchor.dataset.sourceHref = sourceHref;
    anchor.dataset.contentId = contentId;
    const requested = contentFor(contentId)?.locales?.[currentLanguage];
    anchor.href = pagesHref(localizedContentHref(contentId, sourceHref));
    anchor.dataset.localeFallback = 'false';
    if (!localeCanRender(requested) && currentLanguage !== 'en') {
      anchor.title = `${localeDisplayName(currentLanguage)} translation pending · this link remains in the selected language`;
    } else if (!localeIsReady(requested) && currentLanguage !== 'en') {
      anchor.title = `${localeDisplayName(currentLanguage)} candidate translation · independent language review pending`;
    } else {
      anchor.removeAttribute('title');
    }
  });
};
const hrefForItem = (item) => {
  const fallbackHref = item.href || item[2] || '';
  const contentId = item.content_id || localeManifest.aliases?.[item.id];
  return pagesHref(contentId ? localizedContentHref(contentId, fallbackHref) : fallbackHref);
};

const searchNodes = {
  form: document.querySelector('[data-site-search]'),
  input: document.querySelector('[data-site-search-input]'),
  panel: document.querySelector('[data-search-panel]'),
  status: document.querySelector('[data-search-status]'),
  results: document.querySelector('[data-search-results]'),
  clear: document.querySelector('[data-search-clear]'),
};
const normalizeSearchQuery = (value) => String(value || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
const hasOrderedCjkCharacters = (query, candidate) => {
  if (!/^[\u3400-\u9fff]+$/u.test(query)) return false;
  let offset = 0;
  for (const character of query) {
    offset = candidate.indexOf(character, offset);
    if (offset === -1) return false;
    offset += 1;
  }
  return true;
};
const searchIndexAvailable = () => Boolean(
  searchIndex?.schema_version === '1'
  && Array.isArray(searchIndex.documents)
);
const loadSearchIndex = () => {
  if (searchIndexAvailable()) return Promise.resolve(searchIndex);
  if (searchIndexLoadPromise) return searchIndexLoadPromise;
  searchIndexLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'search-index.js?v=20260815-locale-route-continuity';
    script.async = true;
    script.dataset.searchIndexLoader = '';
    script.addEventListener('load', () => {
      searchIndex = window.CODEX_SEARCH_INDEX || null;
      if (searchIndexAvailable()) resolve(searchIndex);
      else reject(new Error('Search index contract is invalid.'));
    }, { once: true });
    script.addEventListener('error', () => reject(new Error('Search index request failed.')), { once: true });
    document.head.append(script);
  }).catch((error) => {
    searchIndexLoadPromise = null;
    throw error;
  });
  return searchIndexLoadPromise;
};
const searchKindKeys = { 'project-entry': 'Project', 'book-entry': 'Book', chapter: 'Chapter', lab: 'Lab', skill: 'Skill', 'field-note': 'FieldNote' };
const searchKindLabel = (kind) => currentCopy()[`searchKind${searchKindKeys[kind] || 'Document'}`] || kind;
const searchLocaleFor = (documentRecord) => {
  const requested = documentRecord.locales?.[currentLanguage];
  const english = documentRecord.locales?.en;
  if (requested?.exists && documentRecord.search?.[currentLanguage]) {
    if (requested.ready) return { searchLocale: currentLanguage, displayLocale: currentLanguage, record: requested, fallback: false };
    if (english?.exists) return { searchLocale: currentLanguage, displayLocale: 'en', record: english, fallback: true };
  }
  if (english?.exists && documentRecord.search?.en) return { searchLocale: 'en', displayLocale: 'en', record: english, fallback: currentLanguage !== 'en' };
  return null;
};
const searchScore = (documentRecord, query, locale) => {
  const record = documentRecord.locales?.[locale];
  const title = normalizeSearchQuery(record?.title);
  const snippet = normalizeSearchQuery(record?.snippet);
  const body = documentRecord.search?.[locale] || '';
  const aliases = normalizeSearchQuery(documentRecord.search_aliases?.[currentLanguage]);
  const tokens = query.split(' ').filter((token) => token.length > 1);
  const tokenMatches = (value) => tokens.filter((token) => value.includes(token)).length;
  const titleTokens = tokenMatches(title);
  const snippetTokens = tokenMatches(snippet);
  const bodyTokens = tokenMatches(body);
  const contentId = normalizeSearchQuery(documentRecord.content_id);
  const contentIdTokens = tokenMatches(contentId);
  let score = 0;
  if (title === query) score += 100;
  if (title.includes(query)) score += 80;
  if (snippet.includes(query)) score += 30;
  if (body.includes(query)) score += 10;
  if (contentId.includes(query)) score += 20;
  if (aliases === query) score += 110;
  if (aliases.includes(query)) score += 90;
  if (hasOrderedCjkCharacters(query, aliases)) score += 70;
  // A beginner often types the important words in a different order from the
  // document title (for example, "safe task"). Reward matches in names and
  // summaries much more than incidental words from a long page body.
  score += titleTokens * 35;
  score += snippetTokens * 10;
  score += bodyTokens * 2;
  score += contentIdTokens * 8;
  return score;
};
const searchHref = (documentRecord, record) => {
  const sourceHref = `../${record.path}`;
  return pagesHref(sourceHref, currentLanguage);
};
const renderSearch = (rawQuery = searchNodes.input?.value || '') => {
  if (!searchNodes.form || !searchNodes.panel) return;
  const query = normalizeSearchQuery(rawQuery);
  searchNodes.input.value = rawQuery;
  searchNodes.panel.hidden = !query;
  searchNodes.results.replaceChildren();
  if (!query) {
    searchNodes.status.textContent = currentCopy().searchNoQuery;
    return;
  }
  if (!searchIndexAvailable()) {
    searchNodes.status.textContent = currentCopy().searchIndexUnavailable;
    return;
  }
  const matches = searchIndex.documents
    .map((documentRecord) => {
      const selected = searchLocaleFor(documentRecord);
      if (!selected) return null;
      const score = searchScore(documentRecord, query, selected.searchLocale);
      return score ? { documentRecord, selected, score } : null;
    })
    .filter(Boolean)
    .sort((left, right) => right.score - left.score || (left.documentRecord.order || 0) - (right.documentRecord.order || 0))
    .slice(0, 12);
  searchNodes.status.textContent = matches.length
    ? currentCopy().searchResultsCount.replace('{count}', String(matches.length)).replace('{query}', rawQuery.trim())
    : currentCopy().searchNoResults.replace('{query}', rawQuery.trim());
  matches.forEach(({ documentRecord, selected }) => {
    const item = document.createElement('li');
    item.className = 'search-result';
    const link = document.createElement('a');
    link.href = searchHref(documentRecord, selected.record);
    link.className = 'search-result-link';
    const meta = document.createElement('span');
    meta.className = 'search-result-meta';
    meta.textContent = `${searchKindLabel(documentRecord.kind)}${documentRecord.number ? ` ${String(documentRecord.number).padStart(2, '0')}` : ''} · ${selected.displayLocale.toUpperCase()}`;
    const title = document.createElement('strong');
    title.textContent = selected.record.title || documentRecord.content_id;
    const snippet = document.createElement('span');
    snippet.className = 'search-result-snippet';
    snippet.textContent = selected.record.snippet || '';
    link.append(meta, title, snippet);
    if (selected.fallback) {
      const fallback = document.createElement('small');
      fallback.className = 'search-result-fallback';
      fallback.textContent = currentCopy().searchFallback;
      link.append(fallback);
    }
    item.append(link);
    searchNodes.results.append(item);
  });
};
const runSearch = async (rawQuery) => {
  const query = String(rawQuery || '').trim();
  const generation = ++searchRunGeneration;
  if (!query) {
    renderSearch('');
    return;
  }
  searchNodes.panel.hidden = false;
  searchNodes.status.textContent = currentCopy().searchLoading;
  searchNodes.results.replaceChildren();
  try {
    await loadSearchIndex();
    if (generation !== searchRunGeneration || searchNodes.input.value.trim() !== query) return;
    renderSearch(rawQuery);
  } catch (_) {
    if (generation !== searchRunGeneration || searchNodes.input.value.trim() !== query) return;
    searchNodes.status.textContent = currentCopy().searchIndexUnavailable;
  }
};
const initializeSearch = () => {
  if (!searchNodes.form) return;
  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
  let searchIntentObserved = false;
  searchNodes.input.addEventListener('input', () => {
    if (searchIntentObserved || !searchNodes.input.value.trim()) return;
    searchIntentObserved = true;
    void loadSearchIndex().catch(() => { searchIntentObserved = false; });
  });
  searchNodes.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchNodes.input.value.trim();
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    url.searchParams.set('lang', currentLanguage);
    window.history.replaceState({}, '', url);
    await runSearch(query);
    searchNodes.panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  searchNodes.clear.addEventListener('click', () => {
    searchRunGeneration += 1;
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
    renderSearch('');
    searchNodes.input.focus();
  });
  if (initialQuery) void runSearch(initialQuery);
};

const evaluationTypeLabels = (types) => types.map((type) => currentCopy()[type] || type).join(' · ');
const renderList = (selector, items, { link = false } = {}) => {
  const target = document.querySelector(selector);
  target.replaceChildren();
  items.forEach((item) => {
    const li = document.createElement('li');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = hrefForItem(item);
      anchor.dataset.contentId = item.content_id || localeManifest.aliases?.[item.id] || '';
      anchor.textContent = item.name?.[dataLanguage()] || item.name?.en || item[0] || '';
      li.append(anchor);
    } else {
      li.textContent = item;
    }
    target.append(li);
  });
};

const renderLabUses = (items, level) => {
  const target = document.querySelector('[data-level-labs]');
  target.replaceChildren();
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'lab-use';
    const heading = document.createElement('div');
    const anchor = document.createElement('a');
    anchor.href = hrefForItem(item);
    anchor.dataset.contentId = item.content_id || localeManifest.aliases?.[item.id] || '';
    anchor.textContent = item.name?.[dataLanguage()] || item.name?.en || item[0] || '';
    const badge = document.createElement('span');
    const reused = item.firstSeen !== level;
    badge.textContent = `${currentCopy()[reused ? 'labReused' : 'labFirstSeen']} ${item.firstSeen}`;
    heading.append(anchor, badge);
    const details = document.createElement('dl');
    [
      ['labCapability', item.newCapability],
      ['labArtifact', item.newArtifact],
      ['labAcceptance', item.newAcceptance],
    ].forEach(([label, value]) => {
      const term = document.createElement('dt');
      term.textContent = currentCopy()[label];
      const definition = document.createElement('dd');
      definition.textContent = value?.[dataLanguage()] || value?.en || '';
      details.append(term, definition);
    });
    li.append(heading, details);
    target.append(li);
  });
};

const setText = (element, value) => {
  const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
  if (textNode) textNode.nodeValue = value;
  else element.insertBefore(document.createTextNode(value), element.firstChild);
};

const applyLanguage = (language, { updateUrl = true } = {}) => {
  currentLanguage = localeTokens.includes(language) ? language : localeManifest.default_locale;
  effectiveUiLanguage = uiLocales.has(currentLanguage) ? currentLanguage : 'en';
  const strings = currentCopy();
  const metadata = localeManifest.locales[currentLanguage] || localeManifest.locales.en;
  document.documentElement.lang = localeManifest.locales[effectiveUiLanguage]?.html_lang || 'en';
  updateSeoMetadata(effectiveUiLanguage);
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
  const languageMenu = document.querySelector('[data-language-menu]');
  const languageToggle = document.querySelector('[data-language-toggle]');
  document.querySelector('[data-current-language]').textContent = metadata.suffix || currentLanguage.toUpperCase();
  languageMenu.setAttribute('aria-label', strings.localeMenuAria || 'Interface languages');
  languageToggle.setAttribute('aria-label', strings.languageToggleAria);
  document.querySelectorAll('[data-language-option]').forEach((element) => {
    const active = element.dataset.languageOption === currentLanguage;
    const unavailable = !localeManifestAvailable && element.dataset.languageOption !== 'en';
    element.classList.toggle('is-active', active);
    element.classList.toggle('is-unavailable', unavailable);
    if (active) element.setAttribute('aria-current', 'page');
    else element.removeAttribute('aria-current');
    if (unavailable) element.setAttribute('aria-disabled', 'true');
    else element.removeAttribute('aria-disabled');
    if (unavailable) element.title = strings.localeManifestError;
    else element.removeAttribute('title');
    const fallback = !localeHasUiCopy(element.dataset.languageOption);
    element.classList.toggle('is-fallback', fallback);
    const fallbackLabel = element.querySelector('[data-language-fallback]');
    const labelParts = [
      fallback ? (strings.localeOptionFallback || 'English UI fallback') : '',
      localeCoverageLabel(element.dataset.languageOption),
    ].filter(Boolean);
    if (fallbackLabel) fallbackLabel.textContent = labelParts.join(' · ');
    else if (labelParts.length) {
      const coverageLabel = document.createElement('small');
      coverageLabel.dataset.languageFallback = '';
      coverageLabel.textContent = labelParts.join(' · ');
      element.append(coverageLabel);
    }
    if (labelParts.length) element.setAttribute('aria-label', `${localeDisplayName(element.dataset.languageOption)}. ${labelParts.join('. ')}`);
    else element.removeAttribute('aria-label');
    const url = new URL(window.location.href);
    url.searchParams.set('lang', element.dataset.languageOption);
    element.href = `${url.pathname}${url.search}${url.hash}`;
  });
  updateLevel(document.querySelector('.level-tab.is-active')?.dataset.level || 'L0', false);
  updateRouteStatus(document.querySelector('.filter-button.is-active')?.dataset.filter || 'all');
  localizeReaderLinks();
  // The goal wizard is rendered from locale-specific templates. Rebuild the
  // visible step after a language change so its labels, fields, and deep link
  // never remain in the language that was active at page load.
  if (typeof refreshGoalWizardForLanguage === 'function') refreshGoalWizardForLanguage();
  if (searchNodes.form && searchIndexAvailable()) renderSearch(searchNodes.input.value);
  const banner = document.querySelector('[data-locale-banner]');
  const pageFallback = currentLanguage !== 'en' && !localeHasUiCopy(currentLanguage);
  const hasContentFallback = Boolean(document.querySelector('[data-locale-fallback="true"]'));
  const hasManifestError = !localeManifestAvailable;
  const showFallbackBanner = currentLanguage !== 'en' && (pageFallback || hasContentFallback);
  banner.hidden = !hasManifestError && !showFallbackBanner;
  if (!banner.hidden) {
    const text = hasManifestError
      ? strings.localeManifestError
      : strings.localeBannerFallback.replace('{requested}', metadata.display_name);
    document.querySelector('[data-locale-banner-text]').textContent = text;
  }
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', currentLanguage);
    window.history.replaceState({}, '', url);
  }
  try { localStorage.setItem(languageStorageKey, currentLanguage); } catch (_) { /* Persistence is optional. */ }
};

const localizedField = (data, key) => data?.[key]?.[effectiveUiLanguage] || data?.[key]?.en || '';
const updateLevel = (level, focus = false) => {
  const data = learningPath[level];
  const title = localizedField(data, 'headline') || localizedField(data, 'title');
  const description = localizedField(data, 'description') || localizedField(data, 'capability');
  const nextChapter = data.next?.chapter || data.chapters[0];
  const nextLab = data.next?.lab || data.labs[0];
  document.querySelectorAll('[data-level-label]').forEach((element) => { element.textContent = level; });
  document.querySelector('[data-level-title]').textContent = title;
  document.querySelector('[data-level-description]').textContent = description;
  // Some reading-path layouts intentionally omit a visible status chip. Keep
  // the structured state for routing, but do not make a missing decorative
  // surface break language changes or the rest of the learning-path panel.
  const levelStatus = document.querySelector('[data-level-status]');
  if (levelStatus) levelStatus.textContent = data.status;
  renderList('[data-level-chapters]', data.chapters, { link: true });
  renderLabUses(data.labs, level);
  renderList('[data-level-skills]', data.skills, { link: true });
  renderList('[data-level-evaluations]', data.evaluations);
  document.querySelector('[data-level-evaluation-summary]').textContent = `${data.evaluations.length} · ${evaluationTypeLabels(data.evaluationTypes)}`;
  const gate = document.querySelector('[data-level-gate]');
  gate.replaceChildren();
  ['explain', 'operate', 'judge', 'review'].forEach((key, index) => {
    const item = document.createElement('li');
    const label = document.createElement('b');
    label.textContent = currentCopy()[`evidence${key[0].toUpperCase()}${key.slice(1)}`];
    const text = document.createElement('span');
    text.textContent = localizedField(data.gate, key);
    item.append(label, text);
    gate.append(item);
  });
  document.querySelector('[data-level-graduation]').textContent = localizedField(data, 'graduation');
  document.querySelector('[data-level-blocked]').textContent = localizedField(data, 'blocked');
  const link = document.querySelector('[data-level-link]');
  link.href = hrefForItem(nextChapter);
  link.dataset.contentId = nextChapter.content_id || localeManifest.aliases?.[nextChapter.id] || '';
  link.querySelector('[data-level-link-text]').textContent = data.next?.label?.[effectiveUiLanguage] || data.next?.label?.en || (effectiveUiLanguage === 'zh' ? `打开${nextChapter.name?.zh || nextChapter[1]}` : `Open ${nextChapter.name?.en || nextChapter[0]}`);
  const labLink = document.querySelector('[data-level-lab-link]');
  labLink.href = hrefForItem(nextLab);
  labLink.dataset.contentId = nextLab.content_id || localeManifest.aliases?.[nextLab.id] || '';
  labLink.querySelector('[data-level-lab-link-text]').textContent = nextLab.name?.[effectiveUiLanguage] || nextLab.name?.en || '';
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
  document.querySelector('[data-route-status]').textContent = currentCopy()[key];
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
const setMenuState = (open) => {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? (currentCopy().menuCloseAria || currentCopy().menuClose || 'Close') : currentCopy().menuAria);
  const visibleLabel = menuToggle.querySelector('[data-i18n="menu"]');
  if (visibleLabel) visibleLabel.textContent = open ? (currentCopy().menuClose || 'Close') : currentCopy().menu;
};
const closeMenu = ({ returnFocus = false } = {}) => {
  nav.classList.remove('is-open');
  setMenuState(false);
  if (returnFocus) menuToggle.focus();
};
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  setMenuState(open);
  if (open) nav.querySelector('a')?.focus();
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
const languageToggle = document.querySelector('[data-language-toggle]');
const languageMenu = document.querySelector('[data-language-menu]');
const closeLanguageMenu = ({ returnFocus = false } = {}) => {
  languageMenu.hidden = true;
  languageToggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) languageToggle.focus();
};
languageToggle.addEventListener('click', () => {
  const open = languageMenu.hidden;
  languageMenu.hidden = !open;
  languageToggle.setAttribute('aria-expanded', String(open));
  if (open) languageMenu.querySelector('a.is-active')?.focus();
});
document.querySelectorAll('[data-language-option]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const unavailable = !localeManifestAvailable && link.dataset.languageOption !== 'en';
    if (unavailable) {
      event.preventDefault();
      languageMenu.hidden = false;
      languageToggle.setAttribute('aria-expanded', 'true');
      link.focus();
      return;
    }
    event.preventDefault();
    applyLanguage(link.dataset.languageOption);
    closeLanguageMenu({ returnFocus: true });
  });
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('[data-language-switcher]')) closeLanguageMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (nav.classList.contains('is-open')) closeMenu({ returnFocus: true });
  if (!languageMenu.hidden) closeLanguageMenu({ returnFocus: true });
});

const starterCopyButton = document.querySelector('[data-copy-starter]');
const starterPrompt = document.querySelector('[data-starter-prompt]');
const everydayPromptCopyButtons = [...document.querySelectorAll('[data-copy-everyday-prompt]')];
const starterCopyStatus = document.querySelector('[data-copy-starter-status]');

// Progressive enhancement keeps the first task ahead of the maintainer map.
// Source order remains readable when JavaScript is unavailable.
const projectMapSection = document.querySelector('#project-map');
const firstTaskSection = document.querySelector('#first-30');
if (projectMapSection && firstTaskSection) firstTaskSection.insertAdjacentElement('afterend', projectMapSection);

// Desktop opens the first route as an orientation aid. On a phone those six
// rows consume a full screen before the four route choices are visible.
if (window.matchMedia('(max-width: 480px)').matches) {
  document.querySelectorAll('.chapter-group').forEach((group) => { group.open = false; });
  const mobileContractDetails = document.querySelector('.mobile-contract-details');
  if (mobileContractDetails) mobileContractDetails.open = false;
}

starterCopyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(starterPrompt?.textContent || '');
    starterCopyStatus.textContent = currentCopy().starterCopied;
  } catch {
    starterCopyStatus.textContent = currentCopy().starterCopyFailed;
  }
});

everydayPromptCopyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const card = button.closest('[data-prompt-card]');
    const prompt = card?.querySelector('[data-everyday-prompt]')?.textContent || '';
    const status = card?.querySelector('[data-prompt-card-status]');
    try {
      await navigator.clipboard.writeText(prompt);
      if (status) status.textContent = currentCopy().promptCardCopied;
    } catch {
      if (status) status.textContent = currentCopy().promptCardCopyFailed;
    }
  });
});

// Keep the reader-facing inventory synchronized with the registered Skill
// source. Locale-specific course coverage remains governed by the matrix; this
// count does not imply that every Skill has runtime or learner evidence.
Object.assign(copy.en, {
  skillsTitle: 'Twenty-five Skills. Distinct jobs.',
  skillIndexLink: 'Open the Skill registry and all 25 methods',
  skillFootnote: 'All 25 project Skills pass structural checks and remain candidate; fresh-task evidence is partial. Platform Observation Record documents one visible surface; it is not a capability or safety claim. Practice Target sets up one first attempt; it does not prove learning. Interruption Checkpoint preserves a task receipt; it does not retry or recover work. Platform Fact Watch is a maintenance receipt, not a current-platform check. LLM Comparison Protocol is an unrun comparison method, not a model ranking. Adversarial Project Review is not an external review.',
  fileSkillsBody: '25 project Skills with triggers, boundaries, and evidence contracts.',
  ledgerSkills: 'Skills · 25',
  repositorySkills: '25 reusable Skills · candidate',
});
Object.assign(copy.zh, {
  skillsTitle: '二十五个 Skill，各有职责。',
  skillIndexLink: '打开 Skill 登记表与全部 25 个方法',
  skillFootnote: '25 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整。平台观察记录只记录一个可见工作面，不是能力或安全性声明。平台事实巡检是维护记录，不是当前平台检查。LLM 比较协议尚未运行，不是模型排行榜。对抗式项目审查不代表外部评审。',
  fileSkillsBody: '25 个项目 Skill，包含触发、边界与证据契约。',
  ledgerSkills: 'Skill · 25',
  repositorySkills: '25 个可复用 Skill · candidate',
});
Object.assign(copy.zh, {
  fileSkillsBody: '25 \u4e2a\u9879\u76ee Skill，包含触发、边界与证据契约。',
  ledgerSkills: 'Skill \u00b7 25',
});

const localePageMeta = {
  en: { title: 'Prysai LLM Playbook — LLM Guide, Prompts, and Reliable AI Work', description: 'Learn what LLMs are, write clearer prompts, and turn a first AI task into bounded, checkable work. Codex is the flagship practice track.' },
  zh: { title: 'Prysai 大模型实战手册：LLM 入门、提示词与可靠 AI 工作', description: '从理解大语言模型开始，学习写清提示词，并把第一次 AI 任务变成有边界、可检查的工作。Codex 是旗舰实践路线。' },
  es: { title: 'Prysai LLM Playbook — guía de LLM, prompts y trabajo fiable con IA', description: 'Aprende qué son los LLM, escribe prompts más claros y convierte una primera tarea de IA en trabajo acotado y comprobable.' },
  ja: { title: 'Prysai LLM プレイブック — LLM 入門、プロンプト、信頼できる AI 活用', description: 'LLM とは何かを学び、より明確なプロンプトを書き、最初の AI タスクを境界が明確で確認可能な仕事に変えます。' },
  ko: { title: 'Prysai LLM 플레이북 — LLM 입문, 프롬프트, 신뢰할 수 있는 AI 작업', description: 'LLM이 무엇인지 배우고 더 명확한 프롬프트를 작성하며 첫 AI 과제를 경계가 분명하고 확인 가능한 작업으로 바꾸세요.' },
  de: { title: 'Prysai LLM Playbook — LLM-Guide, Prompts und verlässliche KI-Arbeit', description: 'Lerne, was LLMs sind, schreibe klarere Prompts und mache aus einer ersten KI-Aufgabe begrenzte, überprüfbare Arbeit.' },
};

const seoBaseUrl = 'https://docs.prysai.com/llm-playbook/';
const seoLocaleHref = (language) => language === 'en' ? seoBaseUrl : `${seoBaseUrl}?lang=${language}`;
const setMetaContent = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute('content', value);
};
const updateSeoMetadata = (language) => {
  const locale = uiLocales.has(language) ? language : 'en';
  const metadata = localePageMeta[locale] || localePageMeta.en;
  const url = seoLocaleHref(locale);
  document.title = metadata.title;
  setMetaContent('meta[name="description"]', metadata.description);
  setMetaContent('meta[property="og:url"]', url);
  setMetaContent('meta[property="og:title"]', metadata.title);
  setMetaContent('meta[property="og:description"]', metadata.description);
  setMetaContent('meta[name="twitter:title"]', metadata.title);
  setMetaContent('meta[name="twitter:description"]', metadata.description);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', url);
  const structuredData = document.querySelector('#site-structured-data');
  if (structuredData) {
    const value = JSON.parse(structuredData.textContent || '{}');
    value.url = url;
    value.description = metadata.description;
    value.inLanguage = localeManifest.locales[locale]?.html_lang || locale;
    structuredData.textContent = JSON.stringify(value);
  }
};

copy.es = {
  'skipToContent': 'Saltar al contenido principal',
  'wordmarkAria': 'Inicio de Prysai LLM Playbook',
  'languageToggleAria': 'Elegir el idioma de la interfaz',
  'menuAria': 'Abrir la navegación',
  'navAria': 'Navegación principal',
  'heroIndexAria': 'Índice de la página',
  'pathAria': 'Ruta de aprendizaje de siete niveles',
  'routesAria': 'Filtrar rutas de capítulos',
  'menu': 'Menú',
  'menuClose': 'Cerrar',
  'navStart': 'Empieza aquí',
  'navFirst30': 'Primeros 15 minutos',
  'navPath': 'Ruta de aprendizaje',
  'navIndex': 'Índice del proyecto',
  'navRoutes': 'Rutas de lectura',
  'navLabs': 'Labs',
  'navSkills': 'Skills',
  'navUpdates': 'Mapa de actualizaciones',
  'localeBannerFallback': 'La ruta {requested} está seleccionada, pero algunas cadenas de la interfaz o unidades del curso aún están en migración. Cuando una unidad del curso no está disponible, Reader conserva este idioma y marca la unidad como no disponible; no cambia silenciosamente el texto del curso a inglés.',
  'localeManifestError': 'El enrutamiento de idiomas no está disponible porque el manifiesto generado no se cargó. El inglés sigue disponible; reconstruye el manifiesto antes de depender de otras rutas.',
  'localeBannerReady': 'Leyendo en {language}.',
  'localeMenuAria': 'Idiomas de la interfaz',
  'languageNameEnglish': 'English',
  'languageNameChinese': 'Simplified Chinese',
  'languageNameSpanish': 'Spanish',
  'languageNameJapanese': 'Japanese',
  'languageNameKorean': 'Korean',
  'languageNameGerman': 'German',
  'localeOptionFallback': 'Respaldo de interfaz en inglés',
  'heroIndex': 'LLM / SISTEMA DE PRÁCTICA',
  'heroEyebrow': 'Empieza pequeño · una tarea, una comprobación visible',
  'heroTitle': 'Convierte una primera tarea de LLM en trabajo real.',
  'heroLede': 'Aprende un método práctico para trabajar con modelos de lenguaje y luego practícalo a fondo en la Codex Practice Track: define el resultado, controla el contexto y la autoridad, inspecciona el trabajo, recupérate de los fallos y conserva evidencia.',
  'heroPrimary': 'Empieza con una comprobación de LLM sin configuración',
  'heroSecondary': 'Empieza la Codex Practice Track',
  'heroRouteAria': 'Elige una primera ruta según tu nivel',
  'heroRouteKicker': 'Elige según lo que tienes hoy',
  'heroRouteGuidedTitle': '¿Tienes un proyecto desechable y quieres usar Codex? Sigue la ruta guiada.',
  'heroRouteGuidedBody': 'Empieza con el Capítulo 1. La primera edición local llega cuando su alcance y su límite de evidencia son visibles.',
  'heroRouteFixtureTitle': '¿Necesitas un archivo seguro para la ruta de Codex? Abre el fixture sin conexión.',
  'heroRouteFixtureBody': 'Proporciona un objetivo y una comprobación después del Capítulo 2. Es un respaldo, no un sustituto de la ruta guiada.',
  'heroRouteBoundary': 'Las tres entradas son candidate: la estructura está comprobada, pero los resultados de los lectores aún no se miden.',
  'heroProofAria': 'Tarjeta de prueba de calentamiento opcional',
  'heroProofKicker': 'CALENTAMIENTO OPCIONAL / EJEMPLO INSPECCIONABLE',
  'heroProofStatus': 'candidate · sin ejecuciones de participantes registradas',
  'heroProofTitle': 'Mira qué contiene un resultado comprobado.',
  'heroProofSourceLabel': 'MENSAJE ORIGINAL',
  'heroProofSource': '“Hi, the workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come.”',
  'heroProofPreserveLabel': 'CONSERVAR LOS HECHOS',
  'heroProofPreserve': 'Conserva el viernes a las 10, el borrador y la solicitud de respuesta. No agregues fecha, lugar, motivo ni medio de contacto.',
  'heroProofChecksLabel': 'TRES COMPROBACIONES HUMANAS',
  'heroProofCheckOne': 'El viernes a las 10 y el borrador se conservan.',
  'heroProofCheckTwo': 'Se pide respuesta a quienes no puedan asistir.',
  'heroProofCheckThree': 'No aparece ningún detalle sin sustento.',
  'heroProofReceiptLabel': 'RECIBO ACOTADO',
  'heroProofReceipt': 'Se puede registrar un intento comprobado. No demuestra aprendizaje, transferencia ni rendimiento del modelo.',
  'heroProofLink': 'Abrir la comprobación opcional de 15 minutos',
  'heroFooter': 'Problema → protocolo → acción → evidencia',
  'startEyebrow': 'Empieza aquí · elige según el problema',
  'startTitle': '¿Qué necesitas hacer?',
  'startIntro': 'Para una tarea real de Codex local, empieza con una ruta candidate: mapa de límites, lab de límites, tarea acotada y luego un lab reversible. Elige otra ruta solo cuando esa ruta no encaje.',
  'problemStartTitle': 'Quiero una ruta segura de Codex.',
  'problemStartBody': 'Empieza con el mapa de límites y luego usa el Lab 011 para etiquetarlo, antes de elegir un cambio desechable de README con un diff, una comprobación enfocada y una lista sin verificar.',
  'problemStartLink': 'Empieza por el Capítulo 1 → Lab 011 → Capítulo 2 → Lab 001 · candidate / draft ↗',
  'problemWrongFileTitle': 'El archivo o el resultado es incierto.',
  'problemWrongFileBody': 'Congela la siguiente edición. Compara el alcance solicitado, el git diff, la comprobación enfocada y las incógnitas restantes.',
  'problemWrongFileLink': 'Abrir el capítulo 9 · candidate ↗',
  'problemSkillTitle': 'Necesito elegir o diseñar un Skill.',
  'problemSkillBody': 'Empieza por el disparador, las entradas, los límites y el contrato de evidencia; solo entonces decide si un Skill merece un lugar.',
  'problemSkillLink': 'Abrir el capítulo 11 · candidate ↗',
  'problemUpdateTitle': 'Necesito publicar o actualizar de forma segura.',
  'problemUpdateBody': 'Ubica el archivo canónico, adjunta el registro de la fuente, ejecuta la compuerta correspondiente y mantén las afirmaciones sin verificar fuera de la publicación.',
  'problemUpdateLink': 'Abrir el capítulo 22 · candidate ↗',
  'problemIntakeTitle': 'Tengo un objetivo amplio y no sé qué practicar primero.',
  'problemIntakeBody': 'Pregunta una decisión a la vez. Elige una ruta existente, un intento comprobable, la ayuda permitida y un respaldo más pequeño.',
  'problemIntakeLink': 'Abrir la admisión de primera práctica · candidate · not_run ↗',
  'problemLanguageTitle': 'Quiero practicar una habilidad de idioma.',
  'problemLanguageBody': 'Define un desempeño observable, intenta lograrlo antes de la instrucción, corrige un error que bloquee el significado y luego prueba un caso modificado.',
  'problemLanguageLink': 'Abrir la ruta de idiomas · candidate · not_run ↗',
  'problemGeneralSkillTitle': 'Quiero practicar otra habilidad real.',
  'problemGeneralSkillBody': 'Convierte una respuesta de entrevista, una explicación o una presentación en un desempeño cronometrado y vuelve a probarlo en una condición modificada.',
  'problemGeneralSkillLink': 'Abrir la ruta de habilidad general · candidate · not_run ↗',
  'problemResearchTitle': 'Necesito investigar una pregunta acotada.',
  'problemResearchBody': 'Vincula la pregunta a una decisión, asigna responsables de las fuentes, lleva un registro de afirmaciones, busca desacuerdos y detente a propósito.',
  'problemResearchLink': 'Abrir la ruta de investigación · candidate · not_run ↗',
  'first30Eyebrow': 'Calentamiento opcional de 15 minutos',
  'first30Title': 'Evalúa una respuesta. Sin configuración.',
  'first30Intro': 'El texto, la tarea y las comprobaciones ya están completos. Usa cualquier modelo de chat; no necesitas archivos, terminal, Git, cuenta conectada ni vocabulario especial. Este calentamiento ejercita un hábito de comprobación; para una tarea local real, empieza la ruta de Codex de arriba.',
  'stepOneTitle': 'Elige un cambio reversible.',
  'stepOneBody': 'Usa un archivo de sandbox o una edición pequeña de documentación. No empieces con credenciales, producción ni un comando destructivo.',
  'stepTwoTitle': 'Escribe el contrato de la tarea.',
  'stepTwoBody': 'Declara el objetivo, el contexto, las acciones permitidas, los criterios de aceptación, la evidencia y la condición de detención.',
  'stepThreeTitle': 'Deja que Codex inspeccione primero.',
  'stepThreeBody': 'Pide los archivos relevantes y el estado actual antes de permitir una edición. Mantén el alcance visible.',
  'stepFourTitle': 'Verifica qué cambió.',
  'stepFourBody': 'Revisa el diff, ejecuta la comprobación relevante más pequeña y registra lo que no se probó.',
  'checkCardLabel': 'Un contrato de tarea útil',
  'fieldGoalLabel': 'Objetivo',
  'fieldGoal': 'Haz un cambio con nombre concreto.',
  'fieldContextLabel': 'Contexto',
  'fieldContext': 'Solo los archivos necesarios para esta tarea.',
  'fieldInputsLabel': 'Entradas',
  'fieldInputs': 'Rutas, comportamiento actual, restricciones.',
  'fieldAllowedLabel': 'Acciones permitidas',
  'fieldAllowed': 'Leer y editar; pausa antes de efectos externos.',
  'fieldAcceptanceLabel': 'Aceptación',
  'fieldAcceptance': 'Un diff específico y un resultado de comprobación.',
  'fieldEvidenceLabel': 'Evidencia',
  'fieldEvidence': 'Diff, comando, salida y límites.',
  'fieldStopLabel': 'Detente cuando',
  'fieldStop': 'Falte alcance, autoridad o evidencia.',
  'contractHighlight': 'La primera tarea más segura es pequeña, reversible y fácil de inspeccionar.',
  'openChapterTwo': 'Abrir el capítulo 2',
  'starterEyebrow': 'Antes → prompt → comprobación → corrección',
  'starterTitle': 'Haz que un mensaje sea más claro sin cambiar sus hechos.',
  'starterIntro': 'Lee el original una vez, copia el prompt ya completado y luego comprueba la respuesta tú mismo. Tiempo objetivo: 15 minutos; el tiempo real de finalización de principiantes no se ha medido.',
  'starterCopy': 'Copiar el primer prompt',
  'starterCopied': 'Primer prompt copiado. Comprueba la respuesta contra las tres líneas.',
  'starterCopyFailed': 'No se pudo copiar. Selecciona el texto del prompt manualmente.',
  'starterBoundary': 'Listo. Completar este ejercicio registra un intento comprobado; no demuestra aprendizaje ni capacidad general.',
  'starterProgressionAria': 'Continuar desde el calentamiento opcional',
  'starterDeepen': 'Elige otra práctica para principiantes',
  'starterCodexPath': 'Empieza la ruta de Codex: Capítulo 1',
  'starterBoundaryLab': 'Etiqueta el límite: Lab 011 · draft / not_run',
  'starterBoundedTask': 'Elige una tarea local acotada: Capítulo 2',
  'starterPractice': 'Ejecuta el Lab 001: trabajar con archivos y Git · draft / not_run',
  'starterEvidence': 'Aprende a recuperarte de una mala respuesta',
  'protocolEyebrow': 'El marco de trabajo',
  'protocolTitle': 'Toda tarea seria necesita un límite.',
  'protocolIntro': 'Este marco es el lenguaje común entre una persona, un modelo, una herramienta y un Agent. Úsalo antes de agregar permisos o Skills.',
  'protocolLink': 'Leer el protocolo de tarea',
  'protocolNote': 'Si una entrada faltante cambia el alcance, el riesgo o la prueba de aceptación, pausa y pregunta. Si solo afecta una lectura de bajo riesgo, inspecciona primero e informa el supuesto.',
  'protocolRuleOne': 'Definir',
  'protocolRuleTwo': 'Actuar',
  'protocolRuleThree': 'Verificar',
  'protocolRuleFour': 'Entregar',
  'pathEyebrow': 'Ruta de aprendizaje',
  'pathTitle': 'Siete niveles. Un contrato ejecutable.',
  'pathIntro': 'Elige un nivel y mira exactamente qué leer, hacer, usar, entregar y qué afirmaciones rechazar. Un nivel no es una cantidad de lecturas.',
  'currentLevel': 'Nivel actual',
  'nextStep': 'Siguiente paso',
  'requiredChapters': 'Capítulos requeridos',
  'requiredLabs': 'Lab requerido',
  'supportingSkills': 'Skills de apoyo',
  'evaluationFixtures': 'Fixtures de evaluación',
  'evidenceGate': 'Compuerta de evidencia',
  'graduationGate': 'Avanza cuando',
  'blockedWhen': 'Detente cuando',
  'fourEvidence': 'Cuatro tipos de evidencia',
  'evidenceExplain': 'Explicar',
  'evidenceOperate': 'Operar',
  'evidenceJudge': 'Juzgar',
  'evidenceReview': 'Revisar',
  'positive': 'positivo',
  'boundary': 'límite',
  'failure': 'fallo',
  'transfer': 'transferencia',
  'statusCandidate': 'La estructura y las comprobaciones básicas pasan; todavía se necesita evidencia nueva.',
  'labFirstSeen': 'Introducido',
  'labReused': 'Reutilizado de',
  'labCapability': 'Capacidad',
  'labArtifact': 'Artefacto',
  'labAcceptance': 'Aceptación',
  'levelL0Name': 'Observador',
  'levelL0Short': 'Nota lo que sucedió',
  'levelL1Name': 'Usuario seguro',
  'levelL1Short': 'Completa una tarea de bajo riesgo',
  'levelL2Name': 'Diseñador de tareas',
  'levelL2Short': 'Escribe un protocolo de tarea',
  'levelL3Name': 'Diseñador de flujos de trabajo',
  'levelL3Short': 'Pasa de la definición a la entrega',
  'levelL4Name': 'Constructor de capacidades',
  'levelL4Short': 'Elige el conjunto útil más pequeño',
  'levelL5Name': 'Revisor de evidencia',
  'levelL5Short': 'Prueba las afirmaciones de finalización',
  'levelL6Name': 'Entrenador de equipo',
  'levelL6Short': 'Convierte el método en un sistema',
  'chaptersEyebrow': 'Las rutas de lectura',
  'chaptersTitle': '22 capítulos. Cuatro formas de entrar.',
  'chaptersIntro': 'Lee en orden para construir el modelo. Salta por ruta cuando una tarea real te bloquee. Toda ruta vuelve a la práctica y a la evidencia.',
  'filterAll': 'Todos los capítulos',
  'filterA': 'A · Primer contacto',
  'filterB': 'B · Trabajo real',
  'filterC': 'C · Capacidad',
  'filterD': 'D · Práctica en equipo',
  'routeATitle': 'Primer contacto con Codex',
  'routeADesc': '01—06 · completa una primera tarea segura',
  'routeBTitle': 'Codex para trabajo real',
  'routeBDesc': '07—13 · diseña un flujo de trabajo verificable',
  'routeCTitle': 'Capacidad y colaboración con Agent',
  'routeCDesc': '14—18 · elige la combinación útil más pequeña',
  'routeDTitle': 'De la fluidez a la práctica en equipo',
  'routeDDesc': '19—22 · convierte el método personal en capacidad de equipo',
  'candidateStatus': 'candidate',
  'chapter01': 'Entiende GPT antes de Codex',
  'chapter02': 'Completa una tarea segura y verificable',
  'chapter03': 'Convierte un deseo en un protocolo de tarea',
  'chapter04': 'Contexto, permisos y límites del Agent',
  'chapter05': 'Elige la superficie correcta de Codex',
  'chapter06': 'Elegir modelo no es adorar el modelo',
  'chapter07': 'Cómo dividen el trabajo los Skills, los Plugins, MCP y las herramientas',
  'chapter08': 'El ciclo de vida completo, de la definición a la entrega',
  'chapter09': 'Verificación, duda y recuperación',
  'chapter10': 'Planificación y rebanadas verticales',
  'chapter11': 'Diseña un Skill que se gane su lugar',
  'chapter12': 'El bucle del Agent, el estado y las condiciones de detención',
  'chapter13': 'Límites de acción en archivos, terminales, navegadores y GitHub',
  'chapter14': 'Descubre, instala y audita un Skill externo',
  'chapter15': 'Investigación: de la pregunta al conocimiento auditable',
  'chapter16': 'Ingeniería: de la idea al software confiable',
  'chapter17': 'Marketing: del contexto del producto a los experimentos',
  'chapter18': 'Contenido, diseño, datos y automatización',
  'chapter19': 'Evalúa modelos y flujos de trabajo',
  'chapter20': 'Construye un sistema de trabajo personal con Codex',
  'chapter21': 'Construye un sistema de capacidad de equipo',
  'chapter22': 'Mantén el sistema actualizado y recuperable',
  'labsEyebrow': 'El lab',
  'labsTitle': 'Haz que el principio sea observable.',
  'labsIntro': 'Los Labs son tareas de bajo riesgo y reproducibles. Cada uno nombra la configuración, la evidencia, una variante de fallo, un límite secreto y una reflexión.',
  'draftStatus': 'draft',
  'startingLab': 'lab inicial',
  'lab01Title': 'Primera tarea segura',
  'lab01Body': 'En un proyecto sandbox, pide a Codex que inspeccione antes de editar. Convierte el “listo” en un diff comprobable.',
  'lab02Title': 'Protocolo de tarea',
  'lab02Body': 'Descompón una solicitud vaga en objetivo, entradas, restricciones, aceptación y manejo de fallos.',
  'lab03Title': 'Revisión de evidencia',
  'lab03Body': 'Encuentra un resultado que parece completo pero no tiene evidencia para su afirmación.',
  'lab04Title': 'Selección de Skill',
  'lab04Body': 'Explica la elección y rehúsa usar el tamaño del directorio como indicador de idoneidad.',
  'lab05Title': 'Diseñar un Skill',
  'lab05Body': 'Convierte un método estable en una capacidad con límites, evidencia y casos de fallo.',
  'lab06Title': 'Condiciones de detención del Agent',
  'lab06Body': 'Define puntos de detención para el éxito, la entrada faltante, el fallo recuperable y el conflicto de permisos.',
  'lab07Title': 'Límites de acción',
  'lab07Body': 'Compara la evidencia necesaria para leer, editar, ejecutar, hacer commit, hacer push y publicar.',
  'lab08Title': 'Pregunta de investigación',
  'lab08Body': 'Convierte un tema amplio en una pregunta, un plan de fuentes y una tabla mínima de evidencia.',
  'lab09Title': 'Ciclo de vida de ingeniería',
  'lab09Body': 'Compara la implementación directa con un ciclo de vida completo y registra la evidencia del retrabajo.',
  'lab10Title': 'Contexto compartido del producto',
  'lab10Body': 'Versiona un entendimiento compartido del producto y separa los hechos de las hipótesis.',
  'lab11Title': 'Límites de GPT y Codex',
  'lab11Body': 'Usa tarjetas de tarea estáticas para separar la generación, la ejecución, la verificación y los efectos externos.',
  'lab12Title': 'Migración de capacidad de equipo',
  'lab12Body': 'Crea un contrato para la versión, el responsable, los permisos, la reproducción independiente y el rollback.',
  'labsIndexLink': 'Abrir las reglas del lab y las 18 entradas',
  'skillsEyebrow': 'Capa de capacidades',
  'skillsTitle': 'Veintitrés Skills. Trabajos distintos.',
  'skillsIntro': 'Un Skill es un método con un disparador, una comprobación de entradas, límites, condiciones de detención, un contrato de salida y una forma de verificarlo.',
  'skillCoach': 'Elige una ruta de aprendizaje y un límite de práctica.',
  'skillProtocol': 'Convierte una solicitud vaga en un contrato ejecutable.',
  'skillEvidence': 'Divide las afirmaciones de finalización en evidencia comprobable.',
  'skillSelector': 'Elige un conjunto mínimo viable de capacidades.',
  'skillWorkflow': 'Gestiona etapas, puntos de control y entregas.',
  'skillResearch': 'Converge una pregunta en conocimiento auditable.',
  'skillContext': 'Mantén los principios estables separados de los hechos cambiantes.',
  'skillLearningName': 'Entrenador de aprendizaje',
  'skillLearning': 'Practica con recuperación, corrección, repaso diferido y transferencia.',
  'skillSourceName': 'Investigador de fuentes',
  'skillSource': 'Convierte búsquedas amplias en investigaciones acotadas respaldadas por fuentes.',
  'skillSignalName': 'Curador de señales de campo',
  'skillSignal': 'Convierte informes públicos en evidencia acotada de demanda.',
  'skillAdapterName': 'Revisión de adaptadores de plataforma',
  'skillAdapter': 'Rechaza lecciones de plataforma sin un delta verificable respaldado por fuentes.',
  'skillTriageName': 'Triaje de fallos de comunicación',
  'skillTriage': 'Diagnostica una interacción fallida y vuelve a probar la reparación más pequeña.',
  'skillBriefName': 'Brief de diálogo',
  'skillBrief': 'Convierte una solicitud de bajo riesgo no probada en un primer mensaje listo para copiar.',
  'skillFirstTurnCheckName': 'Comprobación del primer turno',
  'skillFirstTurnCheck': 'Inspecciona una solicitud de bajo riesgo aún no enviada en busca de límites visibles.',
  'skillRouteBrief': 'Necesito escribir un primer mensaje claro.',
  'skillRouteBriefResult': 'Devuelve un primer turno de bajo riesgo, listo para copiar, con una comprobación y un límite de detención.',
  'skillRouteFirstTurnCheck': 'Ya escribí una primera solicitud y quiero inspeccionarla.',
  'skillRouteFirstTurnCheckResult': 'Señala las brechas relevantes sin redactar un prompt de reemplazo.',
  'skillBoundaryName': 'Primero los métodos originales.',
  'skillBoundary': 'Los Skills externos deben conservar la URL del proyecto de origen y el límite de licencia.',
  'skillIndexLink': 'Abrir el registro de Skills y los 23 métodos',
  'mobileIndexAria': 'Índices completos del proyecto',
  'mobileIndexChapters': 'capítulos',
  'mobileIndexLabs': 'labs',
  'mobileIndexSkills': 'Skills',
  'mobileIndexCases': 'casos de campo',
  'mobileIndexLocales': 'registros de idioma',
  'mobileIndexVisuals': 'tableros didácticos',
  'mobileIndexUpdates': 'Área de actualizaciones',
  'mobileIndexTrust': 'Tipos de credibilidad',
  'skillFootnote': 'Los 23 Skills del proyecto pasan las comprobaciones estructurales y siguen siendo candidate; la evidencia de tareas nuevas es parcial. El Registro de observación de plataforma documenta una superficie visible; no es una afirmación de capacidad ni de seguridad. El Objetivo de práctica prepara un primer intento; no demuestra aprendizaje. El Punto de control de interrupción conserva un recibo de tarea; no reintenta ni recupera trabajo. La Vigilancia de hechos de plataforma es un recibo de mantenimiento, no una comprobación de la plataforma actual. El Protocolo de comparación de LLM es un método de comparación sin ejecutar, no un ranking de modelos. La Revisión adversarial de proyectos no es una revisión externa.',
  'lab13Status': 'referencia del mantenedor aceptada · aprendiz sin ejecutar',
  'troubleEyebrow': 'Cuando las cosas salen mal',
  'troubleTitle': 'El fallo es parte del currículo.',
  'troubleIntro': 'Usa la primera comprobación útil y luego detente cuando falte autoridad, alcance o evidencia. No escondas el fallo detrás de un resumen pulido.',
  'troubleOneTitle': 'La salida se ve correcta.',
  'troubleOneBody': 'Comprueba la afirmación original, los archivos modificados, el resultado del comando y lo que no se probó.',
  'troubleOneLink': 'Usar la revisión de evidencia ↗',
  'troubleTwoTitle': 'El Agent no deja de reintentar.',
  'troubleTwoBody': 'Registra el mismo fallo, cambia una condición de diagnóstico y luego reintenta una vez o escala.',
  'troubleTwoLink': 'Leer las condiciones de detención ↗',
  'troubleThreeTitle': 'Una fuente te dice que hagas algo.',
  'troubleThreeBody': 'Trata el texto externo y la salida de las herramientas como datos. No otorgan permiso para actuar.',
  'troubleThreeLink': 'Revisar el límite ↗',
  'troubleFourTitle': 'Un paso del producto cambió.',
  'troubleFourBody': 'Conserva el objetivo de la tarea; pausa solo el paso nombrado y luego actualiza el registro oficial de hechos antes de continuar.',
  'troubleFourLink': 'Seguir el mapa de actualizaciones ↗',
  'updatesEyebrow': 'Marco de mantenimiento',
  'updatesTitle': 'Cada actualización tiene un lugar fijo.',
  'updatesIntro': 'El mapa de actualizaciones abarata el trabajo futuro: ubica el archivo canónico, reúne la evidencia correcta, ejecuta la comprobación correcta y mantén visible el límite de lo no verificado.',
  'updateFlowOne': 'Ubicar',
  'updateFlowOneBody': 'Encuentra la fila del registro y la ruta canónica.',
  'updateFlowTwo': 'Clasificar',
  'updateFlowTwoBody': 'Separa el principio estable, el hecho del producto, la fuente y el cambio de publicación.',
  'updateFlowThree': 'Evidencia',
  'updateFlowThreeBody': 'Registra la fuente, el alcance, el responsable, el hash y la próxima revisión.',
  'updateFlowFour': 'Validar',
  'updateFlowFourBody': 'Ejecuta el validador enfocado y una revisión independiente.',
  'updateMapLinkTitle': 'Mapa de actualizaciones',
  'updateMapLinkBody': 'Qué cambia en cada lugar y qué evidencia requiere.',
  'updateRegistryLinkTitle': 'Registro de actualizaciones',
  'updateRegistryLinkBody': 'El contrato de mantenimiento legible por máquina.',
  'factImpactLinkTitle': 'Mapa de impacto de hechos',
  'factImpactLinkBody': 'Qué capítulos, labs, Skills, evaluaciones y páginas puede afectar un hecho que cambia.',
  'updateTemplateLinkTitle': 'Registro de actualización',
  'updateTemplateLinkBody': 'Un registro reutilizable para cambios no triviales.',
  'lifecycleLinkTitle': 'Ciclo de vida del contenido',
  'lifecycleLinkBody': 'Las compuertas de evidencia y publicación.',
  'statusEyebrow': 'Límite de evidencia',
  'statusTitle': 'Un estado es una afirmación sobre la evidencia.',
  'statusIntro': 'Este proyecto no convierte la cantidad de documentos, la cantidad de Skills ni una salida exitosa en “dominio”. Usa el estado que la evidencia respalda.',
  'statusDraft': 'Todavía en redacción o sin la comprobación mínima.',
  'statusVerified': 'El alcance declarado tiene evidencia positiva, de límite, de fallo y de transferencia.',
  'statusProduction': 'También pasan las compuertas de seguridad, mantenimiento, versión, licencia y publicación.',
  'statusSourceBefore': 'La evidencia actual está registrada en',
  'statusSourceLink': 'la fuente de estado actual',
  'statusReviewBefore': ' y explicada por ',
  'statusReviewLink': 'la revisión de navegador acotada',
  'statusSourceAfter': '; la página sigue siendo candidate porque esta revisión cubre solo el alcance local registrado.',
  'nextEyebrow': 'Siguiente acción',
  'nextTitle': 'Trae un problema pequeño.',
  'nextBody': 'Abre el contrato de la tarea, elige un primer paso reversible y conserva el diff. Esa es la forma útil más corta de empezar.',
  'nextPrimary': 'Abrir el capítulo 2',
  'nextSecondary': 'Luego ejecuta el lab 001',
  'footerTagline': 'Un manual de LLM basado en evidencia, con Codex como ruta de práctica insignia.',
  'mobileRouteFixture': '¿Necesitas un archivo seguro? Abre el fixture',
  'visualCaseIntro': 'Los tableros didácticos y un caso conceptual renderizado siguen un mismo hilo: solicitud → límite → artefacto → evidencia.',
  'visualCaseBoundary': 'evidencia de renderizado local · sin afirmaciones sobre clientes ni sistemas en producción',
  'footerMeta': 'candidate · límite de evidencia revisado 2026-08-13',
  'skillStarterEyebrow': 'Elige según la situación',
  'skillStarterTitle': 'Empieza aquí si los nombres aún no significan nada.',
  'skillStarterIntro': 'Estas son rutas de inicio, no diagnósticos automáticos. Abre un método, comprueba sus entradas requeridas y detente si el límite no encaja.',
  'skillRouteUnclear': 'Mi tarea aún no está clara.',
  'skillRouteUnclearResult': 'Devuelve un objetivo acotado, entradas, acciones, aceptación y condición de detención.',
  'skillRouteLearnCodex': 'Necesito aprender Codex.',
  'skillRouteLearnCodexResult': 'Devuelve un nivel de aprendizaje de Codex, un experimento, una comprobación de evidencia y una reflexión.',
  'skillRouteLearnOther': 'Necesito practicar otra capacidad.',
  'skillRouteLearnOtherResult': 'Devuelve una línea base, una corrección, un intento de transferencia con caso modificado y una pista de revisión.',
  'skillRouteFailed': 'Una solicitud y una respuesta conservadas ya fallaron.',
  'skillRouteFailedResult': 'Devuelve un diagnóstico basado en evidencia y la reparación comparable más pequeña.',
  'skillRouteVerify': 'Necesito comprobar una afirmación existente.',
  'skillRouteVerifyResult': 'Devuelve qué prueba la evidencia, qué omite y qué se requiere después.',
  'mobileRoutesAria': 'Elige tu próximo movimiento',
  'mobileRouteTask': '¿Tienes un proyecto desechable? Empieza con Codex',
  'mobileRoutePractice': 'Practica idiomas, investigación u otra habilidad',
  'mobileRouteIndexes': 'Explora los índices completos del proyecto',
  'mobileAllRoutes': 'Abrir todas las rutas de problemas',
  'starterPreview': 'Vista previa del prompt completo',
  'starterSequenceAria': 'Secuencia de antes, prompt, comprobación humana y corrección',
  'starterCheckOne': 'Hechos conservados — el viernes a las 10 y “bring the draft” permanecen.',
  'starterCheckTwo': 'Acción conservada — se pide respuesta a quien no pueda asistir.',
  'starterCheckThree': 'Nada inventado — no aparece fecha, zona horaria, lugar, plazo, remitente, motivo, medio de contacto ni otro hecho.',
  'starterCheckPass': 'PASA',
  'starterCheckFail': 'FALLA',
  'starterCheckUnsure': 'INCIERTO',
  'starterCheckGate': 'Registra los tres juicios antes de comparar con un ejemplo.',
  'starterCheckReady': 'Los tres juicios están registrados. Ahora puedes comparar con la respuesta ilustrativa.',
  'starterCheckRecovery': 'Se registró una comprobación fallida o incierta. Usa el prompt de rescate y conserva este registro como observación local.',
  'starterCheckOneAria': 'Registra si los hechos se conservaron',
  'starterCheckTwoAria': 'Registra si se conservó la acción solicitada',
  'starterCheckThreeAria': 'Registra si se agregaron detalles sin sustento',
  'starterCompare': 'Compara con una forma aceptable',
  'starterComparisonBoundary': 'Esta respuesta ilustrativa permanece oculta hasta que se registren los tres juicios. No califica tu respuesta ni demuestra aprendizaje.',
  'starterExample': 'Una forma aceptable: “The workshop starts Friday at 10. Please bring your draft. If you cannot attend, please reply.” La redacción puede diferir; no es la única respuesta correcta.',
  'starterRescueCopy': 'Copiar el prompt de rescate',
  'starterRescueCopied': 'Prompt de rescate copiado. Corrige solo la primera comprobación fallida.',
  'starterHelpLabel': 'Ayuda utilizada',
  'starterHelpAria': 'Registra la ayuda utilizada',
  'starterHelpPrompt': 'Primer prompt',
  'starterHelpRescue': 'Prompt de rescate',
  'starterHelpBoth': 'Ambos prompts',
  'starterCorrectionLabel': 'Corrección después de comprobar',
  'starterCorrectionAria': 'Registra el estado de la corrección',
  'starterCorrectionNotNeeded': 'No fue necesaria',
  'starterCorrectionCorrected': 'Corregida',
  'starterCorrectionNotYet': 'Aún no',
  'starterRecordNotRecorded': 'No registrado',
  'starterReceiptAria': 'Registro local de la comprobación First Win',
  'starterCopyRecord': 'Copiar mi registro local de comprobación',
  'starterRecordCopied': 'Registro local de comprobación copiado. Contiene solo estados, no tu respuesta.',
  'starterRecordCopyFailed': 'No se pudo copiar el registro local de comprobación. Selecciona su texto manualmente.',
  'starterRecoveryLink': 'Abrir la entrega de recuperación',
  'starterReceiptLabel': 'Recibo en lenguaje claro',
  'starterReceipt': 'Intentado · comprobado aquí · ayuda utilizada · corregido · no se demuestra: aprendizaje, transferencia, capacidad general de escritura ni superioridad del modelo.',
  'routeStatusAll': 'Mostrando los 22 capítulos.',
  'routeStatusA': 'Mostrando 6 capítulos en A · Primer contacto.',
  'routeStatusB': 'Mostrando 7 capítulos en B · Trabajo real.',
  'routeStatusC': 'Mostrando 5 capítulos en C · Capacidad.',
  'routeStatusD': 'Mostrando 4 capítulos en D · Práctica en equipo.',
  'featuredLab': 'lab destacado',
  'lab13Title': 'Rebanada vertical auditable',
  'lab13Body': 'Ejecuta un cambio local de Markdown desde el protocolo y la línea base hasta el punto de control, el diff, la comprobación enfocada, el fallo y la transferencia.',
  'lab14Title': 'Reconciliación al reanudar',
  'lab14Body': 'Reconcilia el puntero de la tarea, el objetivo, la rama, los permisos y el estado de efectos secundarios antes de continuar.',
  'lab15Title': 'Entrega de evidencia',
  'lab15Body': 'Divide una frase de finalización en afirmaciones, alcances, salidas y la siguiente comprobación más pequeña.',
  'lab16Title': 'Límite de efectos secundarios',
  'lab16Body': 'Separa el diagnóstico de la instalación, la publicación, el reinicio y otras acciones persistentes.',
  'lab17Title': 'Auditoría de descubrimiento de Skills',
  'lab17Body': 'Comprueba la existencia, el descubrimiento, la carga, el comportamiento, la licencia y la adopción como afirmaciones separadas.',
  'lab18Title': 'Transferencia de idioma',
  'lab18Body': 'Conserva una línea base sin ayuda, corrige un error que bloquee el significado y luego prueba un caso modificado sin reutilizar las frases de la lección.',
  'learningPathWarning': 'Los datos de la ruta de aprendizaje no se cargaron. Se muestra el respaldo local; verifica los datos generados antes de confiar en esta ruta.',
  'skillCoachName': 'Entrenador de Codex',
  'skillProtocolName': 'Protocolo de tarea',
  'skillEvidenceName': 'Revisión de evidencia',
  'skillSelectorName': 'Selector de Skills',
  'skillWorkflowName': 'Orquestador de flujos de trabajo',
  'skillResearchName': 'Enrutador de investigación',
  'skillContextName': 'Contexto del producto',
  'indexEyebrow': 'Índice del proyecto',
  'indexTitle': 'Sabe dónde vive cada afirmación.',
  'indexIntro': 'Este es un mapa legible del repositorio: qué guarda cada capa, por dónde empezar y qué fuente controla su estado.',
  'fileMapTitle': 'Mapa del repositorio',
  'fileMapIntro': 'Lee la capa que corresponde al trabajo. La página pública es una guía; los archivos de abajo son la fuente de verdad.',
  'fileSiteTitle': 'Vitrina pública',
  'fileSiteBody': 'index.html, styles.css, app.js y los datos generados de la ruta de aprendizaje.',
  'fileChaptersTitle': 'Texto central de aprendizaje',
  'fileChaptersBody': '22 capítulos; estado actual del artefacto: candidate.',
  'fileLabsTitle': 'Práctica observable',
  'fileLabsBody': '18 labs; estado actual: draft; estado de ejecución: not_run.',
  'fileSkillsTitle': 'Métodos reutilizables',
  'fileSkillsBody': '23 Skills del proyecto con disparadores, límites y contratos de evidencia.',
  'fileDocsTitle': 'Gobernanza e investigación',
  'fileDocsBody': 'Estado, fuentes, informes de campo, reglas de actualización y registros de calidad.',
  'ledgerTitle': 'Estado del contenido',
  'ledgerIntro': 'Una lectura compacta de la fuente de estado actual. El estado describe evidencia, no ambición.',
  'ledgerProject': 'Proyecto',
  'ledgerChapters': 'Capítulos · 22',
  'ledgerLabs': 'Labs · 18',
  'ledgerSkills': 'Skills · 25',
  'ledgerResearch': 'Investigación de campo',
  'ledgerResearchNote': 'informes de usuarios; sin reproducción local',
  'ledgerSource': 'Abrir la fuente de estado actual',
  'localeTitle': 'Ruta de seis idiomas',
  'localeIntro': 'Se registran seis idiomas de entrada del repositorio. Los seis tokens de ruta están expuestos; la interfaz EN / 中文 está revisada, mientras que los demás idiomas usan un respaldo explícito de interfaz en inglés durante la migración.',
  'localeEnglish': 'disponible · predeterminado',
  'localeChinese': 'disponible · conmutador actual',
  'localeSpanish': 'ruta expuesta · respaldo de interfaz',
  'localeGerman': 'ruta expuesta · respaldo de interfaz',
  'localeJapanese': 'ruta expuesta · respaldo de interfaz',
  'localeKorean': 'ruta expuesta · respaldo de interfaz',
  'localeRule': 'Regla de ruta: los artefactos traducidos llevan un sufijo de idioma y enlazan al mismo idioma. Un token de ruta no equivale a una traducción completa ni a una interfaz revisada.',
  'researchTitle': 'Problemas reales, con el límite adjunto.',
  'researchIntro': 'El índice de investigación convierte los problemas públicos de Codex, la guía de seguridad de primera parte y los informes de foros en síntomas, límites con alcance de fuente, comprobaciones seguras y enlaces didácticos. No afirma una causa raíz oficial ni una reproducción local.',
  'researchBoundary': 'guía con alcance de fuente e informes públicos · sin reproducción local registrada',
  'researchIndexLink': 'Abrir el índice de problemas de campo',
  'researchIndexBody': 'Síntomas de Codex, superficies, entregas, autenticación, worktrees y verificación.',
  'researchForumsLink': 'Leer las notas de casos de los foros',
  'researchForumsBody': 'Listas de permitidos de red del sandbox, fallos de spawn en Windows, aprobaciones, codificación y rutas privadas.',
  'researchLiveLink': 'Revisar tres casos de campo actuales',
  'researchLiveBody': 'Objetivo del worktree, evidencia oculta y alcance de verificación; todo permanece sin verificar localmente.',
  'researchSafetyLink': 'Leer los límites de seguridad de la colaboración con IA',
  'researchSafetyBody': 'Inyección de prompts, entrada mínima necesaria, autoridad de acción y verificación; investigación candidate respaldada por fuentes.',
  'researchReceiptsLink': 'Leer las señales de campo de seguridad de la IA',
  'researchReceiptsBody': 'Informes públicos, clasificación de afirmaciones y un punto de control para tareas de investigación largas; investigación candidate.',
  'researchFirstTurnLink': 'Redactar un primer turno universal',
  'researchFirstTurnBody': 'Una tarjeta de seis campos, solo texto, en español o de investigación; investigación candidate, no equivalencia de plataformas ni afirmación de resultados.',
  'researchPublicInterestLink': 'Ejecutar la indagación de seguridad de interés público',
  'researchPublicInterestBody': 'Un caso ficticio fijo: personas, límite de datos, control humano, evidencia y detención; candidate / not_run.',
  'problemPublicInterestSafetyTitle': 'Necesito evaluar una idea de IA que podría afectar a personas.',
  'problemPublicInterestSafetyBody': 'Nombra una decisión, las personas a las que podría afectar, los datos necesarios, el recurso humano, la evidencia y el punto donde el trabajo debe detenerse.',
  'problemPublicInterestSafetyLink': 'Ejecutar la indagación de seguridad fija · candidate · not_run ↗',
  'visualCaseTitle': 'Mira el método en contexto.',
  'visualModelLink': 'De la solicitud a la evidencia',
  'visualModelBody': 'Alcance, acción, comprobación y entrega acotada.',
  'visualSkillLink': 'Cuatro lentes de evidencia',
  'visualSkillBody': 'Existencia, corrección, preparación y aprendizaje.',
  'visualFieldLink': 'Señal de campo → degradación segura',
  'visualFieldBody': 'Tres informes abiertos; sin reproducción local ni confirmación oficial de causa raíz.',
  'visualCaseLink': 'Bucle de práctica para principiantes',
  'visualCaseBody': 'Intenta primero, corrige un problema, varía el caso y luego conserva un recibo acotado.',
  'searchLabel': 'Buscar en el Playbook',
  'searchPlaceholder': 'Buscar capítulos, labs, Skills o casos de campo',
  'searchSubmit': 'Buscar',
  'searchTitle': 'Encuentra una respuesta acotada.',
  'searchClear': 'Limpiar',
  'searchNoQuery': 'Escribe una palabra o frase para buscar en el Playbook.',
  'searchLoading': 'Cargando el índice de búsqueda local…',
  'searchNoResults': 'Sin resultados para “{query}”. Prueba con un título de capítulo, un nombre de Skill o una frase más específica.',
  'searchResultsCount': '{count} resultados para “{query}”.',
  'searchIndexUnavailable': 'No se pudo cargar el índice de búsqueda local. Revisa la conexión y vuelve a enviar para reintentar.',
  'searchFallback': 'Se muestra la fuente en inglés · la traducción solicitada no está lista',
  'searchOpen': 'Abrir el lector',
  'searchKindChapter': 'Capítulo',
  'searchKindLab': 'Lab',
  'searchKindSkill': 'Método de Skill',
  'searchKindFieldNote': 'Nota de campo',
  'searchKindProject': 'Entrada de proyecto',
  'searchKindBook': 'Entrada de libro',
  'searchKindDocument': 'Documento',
  'problemRecoveryTitle': 'El modelo respondió a la tarea equivocada.',
  'problemRecoveryBody': 'Conserva la solicitud, el contexto visible, la respuesta real y el resultado esperado. Cambia una condición de comunicación y luego ejecuta una comparación segura.',
  'problemRecoveryLink': 'Abrir la entrega de recuperación · candidate · not_run ↗',
  'repositoryStripAria': 'Directorios de origen canónicos y límites actuales',
  'repositoryStripTitle': 'Qué contiene este repositorio',
  'repositoryStripIntro': 'El lector público se renderiza desde site/. Las fuentes canónicas de aprendizaje y mantenimiento de abajo mantienen visible su límite de evidencia actual.',
  'repositoryChapters': '22 capítulos · candidate',
  'repositoryLabs': '18 labs · 2 referencias del mantenedor · 0 ejecuciones de aprendices',
  'repositorySkills': '23 Skills reutilizables · candidate',
  'repositoryDocs': 'Gobernanza e investigación de campo · candidate; informes sin reproducción local',
  'skillCardIndex': '03 / PRÁCTICA DE SKILL',
  'skillCardScope': 'plan ficticio · sin autoridad de herramientas',
  'skillCardTitle': 'Practica una habilidad pequeña de planificación antes de pedir ayuda.',
  'skillCardIntro': 'Haz tú mismo un plan breve y ficticio de visita a un parque. El modelo debe esperar, dar una pista pequeña y luego probar la misma habilidad con un límite modificado.',
  'skillCardStepOne': 'Copia la tarjeta en cualquier chat de texto. Contiene una situación ficticia y no requiere cuenta, archivo, herramienta ni dato personal.',
  'skillCardStepTwo': 'Escribe tú mismo el primer plan en cuatro minutos. No pidas primero un plan del modelo ni un reemplazo pulido.',
  'skillCardStepThree': 'Acepta una pista corta, corrige tu propio plan y luego intenta el nuevo límite de tiempo sin ayuda.',
  'skillCardLink': 'Leer el límite de la práctica de Skills',
  'skillCardBoundary': 'Solo práctica candidate: un plan ficticio corto no puede demostrar capacidad de planificación, juicio, transferencia, retención, seguridad ni desempeño independiente.',
  'skillPromptText': 'Ayúdame a practicar cómo hacer un plan pequeño. No hagas el plan primero.\n\nTarea de práctica: planifica una visita ficticia de 45 minutos a un parque de la ciudad para un adulto. Incluye una botella de agua, una revisión del clima y un recordatorio de la hora de regreso. Esto no es una reserva real, una decisión de viaje ni un pronóstico del clima.\n\nAntes de que escriba, muestra esta comprobación fija: 3–5 pasos; aparecen las tres restricciones; sin hechos locales sin sustento; y una persona podría seguir el plan. Dame cuatro minutos para escribirlo. No muestres un plan del modelo, no lo amplíes ni lo califiques antes de que responda.\n\nDespués de mi primer intento, nombra solo una omisión importante. Haz una pregunta o da una pista de no más de 12 palabras y luego espera mi corrección. Conserva ambos intentos. Luego cambia solo la duración de la visita de 45 minutos a 20 minutos y pide un plan nuevo sin ayuda, usando la misma comprobación.\n\nTermina con exactamente un estado: practised, demonstrated_on_this_task, transferred_to_time_limit_variation o not_run. Una sesión no establece capacidad de planificación, juicio, seguridad ni desempeño independiente.',
  'promptCardShow': 'Mostrar el prompt',
  'skillPromptCardName': 'Editor de tarjetas de prompt',
  'skillPromptCard': 'Convierte una idea autorizada de prompt en una tarjeta didáctica consciente de las fuentes.',
  'skillAdversarialName': 'Revisión adversarial de proyectos',
  'skillAdversarial': 'Clasifica las debilidades materiales antes de una decisión de publicación o lanzamiento.',
  'skillEscalationName': 'Escalamiento de solicitudes',
  'skillEscalation': 'Elige el carril seguro más pequeño antes de redactar, investigar o actuar.',
  'skillComparisonName': 'Protocolo de comparación de LLM',
  'skillComparison': 'Planifica una comparación justa de dos candidatos sin inventar un ranking.',
  'skillPracticeTargetName': 'Objetivo de práctica',
  'skillPracticeTarget': 'Convierte un deseo amplio de aprendizaje en un primer intento observable.',
  'skillFactWatchName': 'Vigilancia de hechos de plataforma',
  'skillFactWatch': 'Traza una afirmación cambiante del producto antes de que un paso con nombre confunda a los lectores.',
  'skillRouteEscalation': 'Aún no estoy seguro de qué tipo de ayuda necesito.',
  'skillRouteEscalationResult': 'Elige el carril seguro más pequeño antes de redactar, investigar o actuar.',
  'promptDeckEyebrow': 'Tarjetas de prompt opcionales · cinco minutos',
  'promptDeckTitle': 'Empieza con una conversación pequeña.',
  'promptDeckIntro': 'Elige una tarjeta original, solo texto. Las tarjetas de idioma y de planificación no necesitan edición; la tarjeta de investigación tiene dos corchetes. Inspecciona la respuesta tú mismo y mantén la afirmación pequeña: un intento no es fluidez, investigación ni una respuesta terminada.',
  'promptContractKicker': 'Antes de enviar',
  'promptContractTitle': 'Haz visibles seis partes.',
  'promptContractLink': 'Leer la justificación',
  'promptContractGridAria': 'Seis campos para inspeccionar en una primera solicitud de LLM',
  'promptContractOutcomeLabel': 'Resultado',
  'promptContractOutcomeBody': 'Un resultado pequeño y observable.',
  'promptContractContextLabel': 'Contexto inicial',
  'promptContractContextBody': 'Lo que sabes o aportas.',
  'promptContractResponseLabel': 'Respuesta solicitada',
  'promptContractResponseBody': 'La forma, la extensión o la secuencia.',
  'promptContractLimitsLabel': 'Límites',
  'promptContractLimitsBody': 'Datos y acciones que quedan fuera.',
  'promptContractCheckLabel': 'Comprobación',
  'promptContractCheckBody': 'Lo que inspeccionarás tú mismo.',
  'promptContractStopLabel': 'Detención y recibo',
  'promptContractStopBody': 'Cuándo detenerte y qué conservar.',
  'promptCardScope': 'solo texto · sin autoridad de herramientas',
  'promptCardCopy': 'Copiar el prompt',
  'promptCardCopied': 'Prompt copiado. Sigue los tres pasos y luego inspecciona la respuesta tú mismo.',
  'promptCardCopyFailed': 'No se pudo copiar el prompt. Selecciona el texto manualmente.',
  'spanishCardIndex': '01 / PRÁCTICA DE IDIOMA',
  'spanishCardTitle': 'Completa una breve comprobación escrita de horario para un grupo de estudio en español.',
  'spanishCardIntro': 'Esta tarjeta de solo texto usa detalles ficticios de estudio, espera tu intento escrito y limita la ayuda a un error que bloquee el significado.',
  'spanishCardStepOne': 'Copia la tarjeta exactamente como está escrita. Ya plantea una comprobación ficticia de horario para un grupo de estudio en español.',
  'spanishCardStepTwo': 'Pégala en cualquier chat de texto. No agregues un nombre real, escuela, calendario, cuenta ni dato de pago.',
  'spanishCardStepThree': 'Escribe tú mismo la primera respuesta. Un intento imperfecto es el objetivo; no pidas la respuesta primero.',
  'spanishCardLink': 'Leer el límite de la práctica',
  'spanishCardBoundary': 'Solo práctica de texto candidate: una sesión escrita no puede mostrar conversación oral, pronunciación, comprensión auditiva, fluidez, precisión, retención ni desempeño independiente.',
  'spanishPromptText': 'Haz una comprobación escrita de cuatro minutos sobre la hora de un grupo de estudio en español, con exactamente cuatro turnos del aprendiz. Tú eres un compañero ficticio y escribes primero. Usa solo preguntas cortas en presente. Yo escribiré una respuesta después de cada pregunta.\n\nTarjeta de estudio ficticia: Ana; un grupo de estudio; martes o jueves; 6:00 o 6:30; biblioteca o en línea; llevar una pregunta. Puedo usar la tarjeta y consultar como máximo tres palabras sueltas. No solicites ni aceptes un nombre real, escuela, calendario, cuenta, dirección, contacto ni dato de pago.\n\nAntes del primer turno, muestra esta rúbrica fija: cuatro turnos del aprendiz; se comunican el propósito y el grupo; se aclaran día y hora; se comunica el lugar o la opción en línea; español lo bastante comprensible para continuar. No enseñes, traduzcas ni muestres una respuesta modelo antes de que responda. Conserva mi primer intento y registra las consultas. Corrige solo el primer error que bloquee el significado: nombra el tipo de error, luego da una pista parcial y, solo si todavía no puedo continuar, un fragmento resuelto. Pídeme que lo corrija. Conserva ambos intentos y no llames a un intercambio exitoso fluidez, conversación oral ni evidencia de comprensión auditiva o pronunciación.',
  'researchCardIndex': '02 / PREPARACIÓN DE INVESTIGACIÓN',
  'researchCardTitle': 'Prepara una comprobación de fuentes, no un veredicto.',
  'researchCardIntro': 'Convierte una pregunta acotada y el material que aportaste en un registro pequeño de afirmaciones, vacíos y la siguiente pregunta.',
  'researchCardStepOne': 'Copia la tarjeta y luego reemplaza solo sus dos corchetes.',
  'researchCardStepTwo': 'Aporta solo material que puedas compartir. Deja fuera el material personal, privado o de alto riesgo.',
  'researchCardStepThree': 'Trata su tabla como preparación. Abre y contrasta las fuentes tú mismo antes de confiar en una afirmación.',
  'researchCardLink': 'Leer el límite de la investigación',
  'researchCardBoundary': 'No puede demostrar que una fuente exista, esté vigente o respalde una afirmación. Una tabla generada no es evidencia por sí misma.',
  'researchPromptText': 'Tengo cinco minutos para preparar una comprobación de investigación, no una respuesta final.\n\nPregunta: [una pregunta acotada].\nMaterial que aporté: [URLs, títulos, extractos o "ninguno"].\n\nPrimero, reformula la pregunta y nombra qué evidencia se necesitaría. Luego haz una tabla de tres filas con: posible afirmación, fuente aportada o "falta", y qué habría que comprobar. No inventes citas, no afirmes que abriste una fuente a la que no puedes acceder ni des una recomendación. Separa el hecho, el informe y la inferencia. Si el material falta, se contradice, es personal o de alto riesgo, detente y dime el siguiente paso seguro más pequeño.\n\nTermina con: fuentes realmente aportadas, incógnitas y una pregunta que debería responder antes de continuar.',
  'heroScope': 'Un método transferible, con Codex como la vía práctica principal actual. Cada plataforma nombrada necesita fuentes actuales y evidencia reproducible antes de convertirse en una lección.',
  'heroRouteNoSetupTitle': '¿Sin proyecto ni experiencia en programación? Empieza con una comprobación sin configuración.',
  'heroRouteNoSetupBody': 'Usa cualquier modelo de chat y un mensaje ficticio. Sin archivos, herramientas, cuenta conectada ni datos privados.',
  'mobileRouteNoSetup': '¿Sin proyecto? Empieza con la comprobación sin configuración',
  'skillInterruptionName': 'Punto de control de interrupción',
  'skillInterruption': 'Conserva lo que se sabe antes de un reintento, un cambio de modelo o una tarea nueva.',
  'skillHandoffName': 'Entrega de turno',
  'skillHandoff': 'Separa las reglas reutilizables del elemento de trabajo de hoy.',
};

copy.ja = {
  'skipToContent': 'メインコンテンツへスキップ',
  'wordmarkAria': 'Prysai LLM Playbook ホーム',
  'languageToggleAria': 'インターフェース言語を選択',
  'menuAria': 'ナビゲーションを開く',
  'navAria': 'メインナビゲーション',
  'heroIndexAria': 'ページインデックス',
  'pathAria': '7レベルの学習パス',
  'routesAria': '章ルートを絞り込む',
  'menu': 'メニュー',
  'menuClose': '閉じる',
  'navStart': 'ここから始める',
  'navFirst30': '最初の15分',
  'navPath': '学習パス',
  'navIndex': 'プロジェクトインデックス',
  'navRoutes': 'リーディングルート',
  'navLabs': 'Lab',
  'navSkills': 'Skills',
  'navUpdates': 'アップデートマップ',
  'localeBannerFallback': '{requested} ルートが選択されていますが、一部のインターフェース文字列またはコースユニットはまだ移行中です。コースユニットがない場合、Reader はこの言語を維持し、そのユニットを利用不可と明示します。コースのテキストを英語に静かに切り替えることはありません。',
  'localeManifestError': '生成された manifest が読み込まれなかったため、ロケールルーティングは利用できません。英語は引き続き利用できます。他のルートに依存する前に manifest を再生成してください。',
  'localeBannerReady': '{language} で読んでいます。',
  'localeMenuAria': 'インターフェース言語',
  'languageNameEnglish': '英語',
  'languageNameChinese': '簡体字中国語',
  'languageNameSpanish': 'スペイン語',
  'languageNameJapanese': '日本語',
  'languageNameKorean': '韓国語',
  'languageNameGerman': 'ドイツ語',
  'localeOptionFallback': '英語 UI フォールバック',
  'heroIndex': 'LLM / 実践システム',
  'heroEyebrow': '小さく始める · 1つのタスク、1つの見えるチェック',
  'heroTitle': '最初の LLM タスクを本物の仕事にする。',
  'heroLede': '言語モデルを扱う実用的なメソッドを1つ学び、Codex プラクティストラックで深く練習してください:成果を定義し、コンテキストと権限を制御し、作業を検査し、失敗から回復し、エビデンスを保持します。',
  'heroPrimary': 'セットアップ不要の LLM チェックから始める',
  'heroSecondary': 'Codex プラクティストラックを開始する',
  'heroRouteAria': '準備状況に応じて最初のルートを選ぶ',
  'heroRouteKicker': '今日持っているものに応じて選ぶ',
  'heroRouteGuidedTitle': '使い捨てできるプロジェクトがあり、Codex を使いたいですか?ガイド付きパスに従ってください。',
  'heroRouteGuidedBody': '第1章から始めてください。最初のローカル編集は、範囲とエビデンス境界が見えるようになった後に行います。',
  'heroRouteFixtureTitle': 'Codex パス用の安全なファイルが必要ですか?オフラインのフィクスチャを開いてください。',
  'heroRouteFixtureBody': '第2章以降の1つのターゲットとチェックを提供します。これはフォールバックであり、ガイド付きパスの代わりではありません。',
  'heroRouteBoundary': '3つのエントリはすべて candidate です:構造はチェックされていますが、読者の成果はまだ測定されていません。',
  'heroProofAria': 'オプションのウォームアップ・プルーフカード',
  'heroProofKicker': 'オプションのウォームアップ / 検査可能な例',
  'heroProofStatus': 'candidate · 参加者の実行記録なし',
  'heroProofTitle': 'チェック済みの結果に何が含まれるかを見てみましょう。',
  'heroProofSourceLabel': '元のメッセージ',
  'heroProofSource': '“Hi, the workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come.”',
  'heroProofPreserveLabel': '保持する事実',
  'heroProofPreserve': '金曜10時、草稿、返信の依頼を保持する。日付、場所、理由、連絡手段を追加しない。',
  'heroProofChecksLabel': '3つの人間によるチェック',
  'heroProofCheckOne': '金曜10時と草稿は残っている。',
  'heroProofCheckTwo': '参加できない人は返信を求められている。',
  'heroProofCheckThree': '根拠のない詳細は現れない。',
  'heroProofReceiptLabel': '境界付きレシート',
  'heroProofReceipt': 'チェック済みの試行を1回記録できます。学習、転移、モデルの性能を証明するものではありません。',
  'heroProofLink': 'オプションの15分チェックを開く',
  'heroFooter': '問題 → プロトコル → アクション → エビデンス',
  'startEyebrow': 'ここから始める · 問題で選ぶ',
  'startTitle': '何をする必要がありますか?',
  'startIntro': '実際のローカル Codex タスクでは、1つの候補パスから始めてください:境界マップ、境界 Lab、境界のあるタスク、そしてリバーシブルな Lab 1つ。そのパスが合わない場合にのみ、別のルートを選んでください。',
  'problemStartTitle': '安全な Codex パスが1つ欲しい。',
  'problemStartBody': '境界マップから始め、Lab 011 でラベル付けしてから、diff、集中的なチェック、未検証リストを備えた使い捨ての README 変更を1つ選んでください。',
  'problemStartLink': '第1章から開始 → Lab 011 → 第2章 → Lab 001 · candidate / draft ↗',
  'problemWrongFileTitle': 'ファイルまたは結果が不明確です。',
  'problemWrongFileBody': '次の編集を停止してください。要求された範囲、git diff、集中的なチェック、残りの不明点を比較します。',
  'problemWrongFileLink': '第9章を開く · candidate ↗',
  'problemSkillTitle': 'Skill を選ぶか設計する必要があります。',
  'problemSkillBody': 'トリガー、入力、境界、エビデンス契約から始め、その後に Skill が居場所に値するかを判断してください。',
  'problemSkillLink': '第11章を開く · candidate ↗',
  'problemUpdateTitle': '安全に公開または更新する必要があります。',
  'problemUpdateBody': '正規のファイルを特定し、ソースレコードを添付し、関連するゲートを実行し、未検証の主張をリリースに含めないようにします。',
  'problemUpdateLink': '第22章を開く · candidate ↗',
  'problemIntakeTitle': '目標が広く、何を先に練習すべきか分かりません。',
  'problemIntakeBody': '一度に1つの決定だけを明確にしてください。既存のルートを1つ、チェック可能な試行を1つ、許可されるヘルプ、より小さなフォールバックを選びます。',
  'problemIntakeLink': '初回練習の受付を開く · candidate · not_run ↗',
  'problemLanguageTitle': '1つの言語スキルを練習したい。',
  'problemLanguageBody': '観察可能なパフォーマンスを1つ定義し、指導の前に試行し、意味を妨げるエラーを1つ訂正し、変更したケースをテストします。',
  'problemLanguageLink': '言語ルートを開く · candidate · not_run ↗',
  'problemGeneralSkillTitle': '別の実際のスキルを練習したい。',
  'problemGeneralSkillBody': '面接の回答、説明、プレゼンテーションを1つの制限時間付きパフォーマンスにし、変更した条件で再テストします。',
  'problemGeneralSkillLink': '一般スキルルートを開く · candidate · not_run ↗',
  'problemResearchTitle': '境界のある質問を1つ調査する必要があります。',
  'problemResearchBody': '質問を判断に結び付け、ソースの所有者を割り当て、主張の台帳を維持し、反対意見を探し、意図的に停止します。',
  'problemResearchLink': 'リサーチルートを開く · candidate · not_run ↗',
  'first30Eyebrow': 'オプションの15分ウォームアップ',
  'first30Title': '1つの回答を判定する。セットアップ不要。',
  'first30Intro': 'テキスト、タスク、チェックはすでに記入済みです。任意のチャットモデルを使用できます。ファイル、ターミナル、Git、アカウント接続、専門用語は不要です。このウォームアップは1つのチェック習慣を練習します。実際のローカルタスクには、上の Codex パスから始めてください。',
  'stepOneTitle': 'リバーシブルな変更を選ぶ。',
  'stepOneBody': 'サンドボックスファイルか、小さなドキュメント編集を使います。認証情報、本番環境、破壊的なコマンドから始めないでください。',
  'stepTwoTitle': 'タスク契約を書く。',
  'stepTwoBody': '目標、コンテキスト、許可されるアクション、受け入れ基準、エビデンス、停止条件を明記します。',
  'stepThreeTitle': 'Codex に先に検査させる。',
  'stepThreeBody': '編集を許可する前に、関連ファイルと現在の状態を求めます。範囲を見えるように保ちます。',
  'stepFourTitle': '何が変わったかを検証する。',
  'stepFourBody': 'diff をレビューし、最小の関連チェックを実行し、テストされなかったものを記録します。',
  'checkCardLabel': '有用なタスク契約',
  'fieldGoalLabel': '目標',
  'fieldGoal': '名前付きの変更を1つ行う。',
  'fieldContextLabel': 'コンテキスト',
  'fieldContext': 'このタスクに必要なファイルのみ。',
  'fieldInputsLabel': '入力',
  'fieldInputs': 'パス、現在の動作、制約。',
  'fieldAllowedLabel': '許可されるアクション',
  'fieldAllowed': '読み取りと編集。外部への影響の前に一時停止。',
  'fieldAcceptanceLabel': '受け入れ条件',
  'fieldAcceptance': '特定の diff とチェック結果。',
  'fieldEvidenceLabel': 'エビデンス',
  'fieldEvidence': 'diff、コマンド、出力、制限。',
  'fieldStopLabel': '停止条件',
  'fieldStop': '範囲、権限、またはエビデンスが欠けている。',
  'contractHighlight': '最も安全な最初のタスクは、小さく、リバーシブルで、検査しやすいものです。',
  'openChapterTwo': '第2章を開く',
  'starterEyebrow': '原文 → プロンプト → チェック → 修正',
  'starterTitle': '事実を変えずに、1つのメッセージを明確にする。',
  'starterIntro': '原文を1回読み、記入済みのプロンプトをコピーし、答えを自分でチェックしてください。目標時間:15分。初心者の実際の完了時間はまだ測定されていません。',
  'starterCopy': '最初のプロンプトをコピー',
  'starterCopied': '最初のプロンプトをコピーしました。3つの項目すべてに照らして答えを確認してください。',
  'starterCopyFailed': 'コピーに失敗しました。プロンプトのテキストを手動で選択してください。',
  'starterBoundary': '準備完了。この演習を完了すると、チェック済みの試行が1回記録されます。学習や一般的な能力を証明するものではありません。',
  'starterProgressionAria': 'オプションのウォームアップから続ける',
  'starterDeepen': '別の初心者練習を選ぶ',
  'starterCodexPath': 'Codex パスを開始:第1章',
  'starterBoundaryLab': '境界をラベル付け:Lab 011 · draft / not_run',
  'starterBoundedTask': '境界のあるローカルタスクを1つ選ぶ:第2章',
  'starterPractice': 'Lab 001 を実行:ファイルと Git の操作 · draft / not_run',
  'starterEvidence': '悪い回答から回復する方法を学ぶ',
  'protocolEyebrow': '作業の枠組み',
  'protocolTitle': '真剣なタスクには必ず境界が必要です。',
  'protocolIntro': 'この枠組みは、人、モデル、ツール、Agent の間の共通言語です。権限や Skill を追加する前に使ってください。',
  'protocolLink': 'タスクプロトコルを読む',
  'protocolNote': '欠けている入力が範囲、リスク、受け入れテストを変える場合は、一時停止して質問してください。低リスクの読み取りだけに影響する場合は、まず検査して仮定を報告してください。',
  'protocolRuleOne': '定義',
  'protocolRuleTwo': '実行',
  'protocolRuleThree': '検証',
  'protocolRuleFour': '引き継ぎ',
  'pathEyebrow': '学習パス',
  'pathTitle': '7つのレベル。1つの実行可能な契約。',
  'pathIntro': 'レベルを選ぶと、何を読み、何をし、何を使い、何を提出し、何を主張しないかを正確に確認できます。レベルは読んだ数ではありません。',
  'currentLevel': '現在のレベル',
  'nextStep': '次のステップ',
  'requiredChapters': '必須の章',
  'requiredLabs': '必須の Lab',
  'supportingSkills': 'サポートする Skill',
  'evaluationFixtures': '評価フィクスチャ',
  'evidenceGate': 'エビデンスゲート',
  'graduationGate': '次へ進むとき',
  'blockedWhen': '止まるとき',
  'fourEvidence': '4種類のエビデンス',
  'evidenceExplain': '説明',
  'evidenceOperate': '操作',
  'evidenceJudge': '判断',
  'evidenceReview': 'レビュー',
  'positive': '正例',
  'boundary': '境界例',
  'failure': '失敗例',
  'transfer': '転移例',
  'statusCandidate': '構造と基本チェックは合格。新鮮なエビデンスがまだ必要。',
  'labFirstSeen': '導入',
  'labReused': '再利用元',
  'labCapability': '能力',
  'labArtifact': '成果物',
  'labAcceptance': '受け入れ条件',
  'levelL0Name': '観察者',
  'levelL0Short': '何が起きたかに気づく',
  'levelL1Name': '安全なユーザー',
  'levelL1Short': '低リスクのタスクを完了する',
  'levelL2Name': 'タスクデザイナー',
  'levelL2Short': 'タスクプロトコルを書く',
  'levelL3Name': 'ワークフローデザイナー',
  'levelL3Short': '定義から納品へ進む',
  'levelL4Name': '能力構築者',
  'levelL4Short': '最小の有用な組み合わせを選ぶ',
  'levelL5Name': 'エビデンスレビュアー',
  'levelL5Short': '完了の主張を検証する',
  'levelL6Name': 'チームコーチ',
  'levelL6Short': 'メソッドをシステムにする',
  'chaptersEyebrow': 'リーディングルート',
  'chaptersTitle': '22章。4つの入り口。',
  'chaptersIntro': '順番に読んでモデルを構築してください。実際のタスクに詰まったら、ルートでジャンプしてください。すべてのルートは練習とエビデンスに戻ります。',
  'filterAll': 'すべての章',
  'filterA': 'A · 最初の接触',
  'filterB': 'B · 実際の仕事',
  'filterC': 'C · 能力',
  'filterD': 'D · チーム実践',
  'routeATitle': 'Codex との最初の接触',
  'routeADesc': '01—06 · 最初の安全なタスクを完了する',
  'routeBTitle': '実際の仕事に使う Codex',
  'routeBDesc': '07—13 · 検証可能なワークフローを設計する',
  'routeCTitle': '能力と Agent の協働',
  'routeCDesc': '14—18 · 最小の有用な組み合わせを選ぶ',
  'routeDTitle': '流暢さからチーム実践へ',
  'routeDDesc': '19—22 · 個人のメソッドをチームの能力にする',
  'candidateStatus': 'candidate',
  'chapter01': 'GPT を理解してから Codex へ',
  'chapter02': '安全で検証可能なタスクを完了する',
  'chapter03': '願望をタスクプロトコルに変える',
  'chapter04': 'コンテキスト、権限、Agent の境界',
  'chapter05': '適切な Codex の作業面を選ぶ',
  'chapter06': 'モデル選択はモデル崇拝ではない',
  'chapter07': 'Skill、Plugin、MCP、ツールがどのように仕事を分担するか',
  'chapter08': '定義から納品までの完全なライフサイクル',
  'chapter09': '検証、疑念、そして回復',
  'chapter10': '計画と縦断スライス',
  'chapter11': '居場所に値する Skill を設計する',
  'chapter12': 'Agent のループ、状態、停止条件',
  'chapter13': 'ファイル、ターミナル、ブラウザ、GitHub をまたぐ行動境界',
  'chapter14': '外部 Skill を発見、インストール、監査する',
  'chapter15': 'リサーチ:質問から監査可能な知識へ',
  'chapter16': 'エンジニアリング:アイデアから信頼できるソフトウェアへ',
  'chapter17': 'マーケティング:プロダクトコンテキストから実験へ',
  'chapter18': 'コンテンツ、デザイン、データ、自動化',
  'chapter19': 'モデルとワークフローを評価する',
  'chapter20': '個人の Codex ワークシステムを構築する',
  'chapter21': 'チームの能力システムを構築する',
  'chapter22': 'システムを最新で回復可能に保つ',
  'labsEyebrow': 'Lab',
  'labsTitle': '原則を観察可能にする。',
  'labsIntro': 'Lab は低リスクで再現可能なタスクです。それぞれがセットアップ、エビデンス、失敗バリアント、秘密の境界、リフレクションを明示します。',
  'draftStatus': 'draft',
  'startingLab': '開始用 Lab',
  'lab01Title': '最初の安全なタスク',
  'lab01Body': 'サンドボックスプロジェクトで、Codex に編集前に検査を依頼する。“完了”を検査可能な diff に変える。',
  'lab02Title': 'タスクプロトコル',
  'lab02Body': '曖昧なリクエストを、目標、入力、制約、受け入れ条件、失敗時の対応に分解する。',
  'lab03Title': 'エビデンスレビュー',
  'lab03Body': '完成しているように見えて、主張のエビデンスがない結果を見つける。',
  'lab04Title': 'Skill の選択',
  'lab04Body': '選択理由を説明し、ディレクトリサイズを適合性の代理指標として使うことを拒否する。',
  'lab05Title': 'Skill を設計する',
  'lab05Body': '安定したメソッドを、境界、エビデンス、失敗ケースを備えた能力にする。',
  'lab06Title': 'Agent の停止条件',
  'lab06Body': '成功、入力不足、回復可能な失敗、権限の競合について停止ポイントを定義する。',
  'lab07Title': '行動境界',
  'lab07Body': '読み取り、編集、実行、コミット、プッシュ、公開に必要なエビデンスを比較する。',
  'lab08Title': 'リサーチの問い',
  'lab08Body': '広いトピックを、問い、ソース計画、最小のエビデンス表に変える。',
  'lab09Title': 'エンジニアリングライフサイクル',
  'lab09Body': '直接実装と完全なライフサイクルを比較し、手戻りのエビデンスを記録する。',
  'lab10Title': '共有プロダクトコンテキスト',
  'lab10Body': '共有のプロダクト理解をバージョン管理し、事実と仮説を分ける。',
  'lab11Title': 'GPT と Codex の境界',
  'lab11Body': '静的タスクカードを使って、生成、実行、検証、外部への影響を分ける。',
  'lab12Title': 'チーム能力の移行',
  'lab12Body': 'バージョン、所有者、権限、独立した再現、ロールバックの契約を作る。',
  'labsIndexLink': 'Lab のルールと全18エントリを開く',
  'skillsEyebrow': '能力レイヤー',
  'skillsTitle': '23の Skill。それぞれに明確な役割。',
  'skillsIntro': 'Skill とは、トリガー、入力チェック、境界、停止条件、出力契約、検証方法を持つメソッドです。',
  'skillCoach': '学習パスと練習の境界を選びます。',
  'skillProtocol': '曖昧なリクエストを実行可能な契約に変えます。',
  'skillEvidence': '完了の主張を検査可能なエビデンスに分解します。',
  'skillSelector': '最小限の実現可能な能力セットを選びます。',
  'skillWorkflow': 'ステージ、チェックポイント、引き継ぎを管理します。',
  'skillResearch': '質問を監査可能な知識に収束させます。',
  'skillContext': '安定した原則を、変化する事実から分けておきます。',
  'skillLearningName': 'ラーニングコーチ',
  'skillLearning': '想起、訂正、遅延復習、転移で練習します。',
  'skillSourceName': 'ソース調査',
  'skillSource': '広い検索を、境界がありソースで裏付けられた調査に変えます。',
  'skillSignalName': 'フィールドシグナルキュレーター',
  'skillSignal': '公開レポートを境界のある需要エビデンスに変えます。',
  'skillAdapterName': 'プラットフォームアダプターレビュー',
  'skillAdapter': 'ソースがあり実行可能な差分のないプラットフォームの教訓は却下します。',
  'skillTriageName': 'コミュニケーション失敗トリアージ',
  'skillTriage': '失敗したやり取りを1つ診断し、最小の修正を再テストします。',
  'skillBriefName': 'ダイアログブリーフ',
  'skillBrief': '試していない低リスクのリクエストを1つ、コピー可能な最初のメッセージに変えます。',
  'skillFirstTurnCheckName': 'ファーストターンチェック',
  'skillFirstTurnCheck': '未送信の低リスクリクエストに、目に見える境界があるかを検査します。',
  'skillRouteBrief': '明確な最初のメッセージを1通書きたい。',
  'skillRouteBriefResult': 'チェックと停止境界を備えた、低リスクでコピー可能なファーストターンを1つ返します。',
  'skillRouteFirstTurnCheck': '最初のリクエストはすでに書いたので、それを検査したい。',
  'skillRouteFirstTurnCheckResult': '代替プロンプトを書かずに、重要なギャップを指摘します。',
  'skillBoundaryName': 'オリジナルのメソッドを優先する。',
  'skillBoundary': '外部 Skill は、ソースプロジェクトの URL とライセンス境界を保持する必要があります。',
  'skillIndexLink': 'Skill レジストリと全23メソッドを開く',
  'mobileIndexAria': '完全なプロジェクトインデックス',
  'mobileIndexChapters': '章',
  'mobileIndexLabs': 'Lab',
  'mobileIndexSkills': 'Skills',
  'mobileIndexCases': 'フィールドケース',
  'mobileIndexLocales': 'ロケールレコード',
  'mobileIndexVisuals': 'ティーチングボード',
  'mobileIndexUpdates': '更新エリア',
  'mobileIndexTrust': '信頼度タイプ',
  'skillFootnote': '全23のプロジェクト Skill は構造チェックに合格し candidate のままです。新しいタスクのエビデンスは部分的です。Platform Observation Record は1つの目に見える作業面を記録するもので、能力や安全性の主張ではありません。Practice Target は最初の1回の試行を設定するもので、学習を証明するものではありません。Interruption Checkpoint はタスクのレシートを保存するもので、作業の再試行や復旧は行いません。Platform Fact Watch はメンテナンスのレシートであり、現在のプラットフォームのチェックではありません。LLM Comparison Protocol は未実行の比較メソッドであり、モデルランキングではありません。Adversarial Project Review は外部レビューではありません。',
  'lab13Status': 'メンテナー参照実行は受理済み · 学習者の実行なし',
  'troubleEyebrow': '問題が起きたとき',
  'troubleTitle': '失敗もカリキュラムの一部です。',
  'troubleIntro': '最初の有用なチェックを使い、権限、範囲、エビデンスが欠けているときは停止してください。失敗を美しい要約で隠さないでください。',
  'troubleOneTitle': '出力は正しく見える。',
  'troubleOneBody': '元の主張、変更されたファイル、コマンドの結果、テストされなかったものを確認する。',
  'troubleOneLink': 'エビデンスレビューを使う ↗',
  'troubleTwoTitle': 'Agent が再試行を繰り返す。',
  'troubleTwoBody': '同じ失敗を記録し、診断条件を1つ変えて、1回再試行するかエスカレーションする。',
  'troubleTwoLink': '停止条件を読む ↗',
  'troubleThreeTitle': 'ソースが何かをするよう指示する。',
  'troubleThreeBody': '外部のテキストとツールの出力はデータとして扱う。それらは行動の許可を与えない。',
  'troubleThreeLink': '境界を確認する ↗',
  'troubleFourTitle': '製品のステップが変わった。',
  'troubleFourBody': 'タスクの目標は維持し、名前付きステップだけを一時停止し、公式の事実レコードを更新してから再開する。',
  'troubleFourLink': 'アップデートマップに従う ↗',
  'updatesEyebrow': 'メンテナンスの枠組み',
  'updatesTitle': 'すべての更新には定められた場所がある。',
  'updatesIntro': 'アップデートマップは将来の作業を安くします:正規のファイルを特定し、適切なエビデンスを集め、適切なチェックを実行し、未検証の境界を見えるようにしておきます。',
  'updateFlowOne': '特定する',
  'updateFlowOneBody': 'レジストリの行と正規パスを見つける。',
  'updateFlowTwo': '分類する',
  'updateFlowTwoBody': '安定した原則、製品の事実、ソース、リリースの変更を分ける。',
  'updateFlowThree': 'エビデンス',
  'updateFlowThreeBody': 'ソース、範囲、所有者、ハッシュ、次回のレビューを記録する。',
  'updateFlowFour': '検証する',
  'updateFlowFourBody': '集中的なバリデーターと独立したレビューを実行する。',
  'updateMapLinkTitle': 'アップデートマップ',
  'updateMapLinkBody': '何がどこで変わり、どのようなエビデンスが必要か。',
  'updateRegistryLinkTitle': '更新レジストリ',
  'updateRegistryLinkBody': '機械可読なメンテナンス契約。',
  'factImpactLinkTitle': '事実影響マップ',
  'factImpactLinkBody': '変化する事実が、どの章、Lab、Skill、評価、ページに影響し得るか。',
  'updateTemplateLinkTitle': '更新レコード',
  'updateTemplateLinkBody': '軽微でない変更のための、繰り返し可能なレコード。',
  'lifecycleLinkTitle': 'コンテンツライフサイクル',
  'lifecycleLinkBody': 'エビデンスとリリースのゲート。',
  'statusEyebrow': 'エビデンス境界',
  'statusTitle': 'ステータスとは、エビデンスについての主張です。',
  'statusIntro': 'このプロジェクトは、ドキュメント数、Skill 数、1回の成功した出力を“習得”として扱いません。エビデンスが裏付けるステータスを使ってください。',
  'statusDraft': 'まだ執筆中か、最低限のチェックが不足しています。',
  'statusVerified': '宣言された範囲で、正例、境界例、失敗例、転移例のエビデンスがあります。',
  'statusProduction': '安全、メンテナンス、バージョン、ライセンス、リリースの各ゲートも合格しています。',
  'statusSourceBefore': '現在のエビデンスは',
  'statusSourceLink': '現在のステータスソース',
  'statusReviewBefore': ' に記録され、その説明は ',
  'statusReviewLink': '範囲を限定したブラウザレビュー',
  'statusSourceAfter': '; このレビューは記録されたローカル範囲のみを対象とするため、ページは candidate のままです。',
  'nextEyebrow': '次のアクション',
  'nextTitle': '小さな問題を1つ持ってきてください。',
  'nextBody': 'タスク契約を開き、リバーシブルな最初のステップを選び、diff を保持してください。それが最短の有用な始め方です。',
  'nextPrimary': '第2章を開く',
  'nextSecondary': '次に Lab 001 を実行',
  'footerTagline': 'エビデンス主導の LLM プレイブック。Codex を旗艦のプラクティストラックとして。',
  'mobileRouteFixture': '安全なファイルが必要ですか?フィクスチャを開く',
  'visualCaseIntro': 'ティーチングボードとレンダリングされたコンセプトケースは1つの糸をたどります:リクエスト → 境界 → 成果物 → エビデンス。',
  'visualCaseBoundary': 'ローカルレンダリングのエビデンス · 顧客または実システムに関する主張なし',
  'footerMeta': 'candidate · エビデンス境界レビュー 2026-08-13',
  'skillStarterEyebrow': '状況に応じて選ぶ',
  'skillStarterTitle': '名前がまだ何も意味しない場合は、ここから始めてください。',
  'skillStarterIntro': 'これらはスタートルートであり、自動診断ではありません。1つのメソッドを開き、必須入力を確認し、境界が合わなければ停止してください。',
  'skillRouteUnclear': 'タスクがまだ曖昧です。',
  'skillRouteUnclearResult': '境界のある目標、入力、アクション、受け入れ条件、停止条件を返します。',
  'skillRouteLearnCodex': 'Codex を学ぶ必要があります。',
  'skillRouteLearnCodexResult': 'Codex の学習レベル、実験、エビデンスチェック、リフレクションを返します。',
  'skillRouteLearnOther': '別の能力を練習する必要があります。',
  'skillRouteLearnOtherResult': 'ベースライン、訂正、変更ケースでの転移の試行、レビューの手がかりを返します。',
  'skillRouteFailed': '保存されたリクエストと返信はすでに失敗しています。',
  'skillRouteFailedResult': 'エビデンスに基づく診断と、最小の同等な修正を返します。',
  'skillRouteVerify': '既存の主張を確認する必要があります。',
  'skillRouteVerifyResult': 'エビデンスが証明すること、欠けていること、次に必要なことを返します。',
  'mobileRoutesAria': '次の一手を選ぶ',
  'mobileRouteTask': '使い捨てできるプロジェクトがありますか?Codex を開始',
  'mobileRoutePractice': '言語、リサーチ、または別のスキルを練習',
  'mobileRouteIndexes': '完全なプロジェクトインデックスを閲覧',
  'mobileAllRoutes': 'すべての問題ルートを開く',
  'starterPreview': '完全なプロンプトをプレビュー',
  'starterSequenceAria': '原文、プロンプト、人間によるチェック、修正のシーケンス',
  'starterCheckOne': '事実は保持 — 金曜10時と“草稿を持ってくる”は残っている。',
  'starterCheckTwo': 'アクションは保持 — 参加できない人は返信を求められている。',
  'starterCheckThree': '何も捏造されていない — 日付、タイムゾーン、場所、締め切り、送信者、理由、連絡手段、その他の事実は現れない。',
  'starterCheckPass': '合格',
  'starterCheckFail': '不合格',
  'starterCheckUnsure': '不明',
  'starterCheckGate': '例と比較する前に、3つの判断をすべて記録してください。',
  'starterCheckReady': '3つの判断はすべて記録されました。これで例示の回答と比較できます。',
  'starterCheckRecovery': '失敗または不確かなチェックが記録されました。レスキュープロンプトを使い、この記録をローカルの観察として保持してください。',
  'starterCheckOneAria': '事実が保持されたかどうかを記録',
  'starterCheckTwoAria': '要求されたアクションが保持されたかどうかを記録',
  'starterCheckThreeAria': '根拠のない詳細が追加されたかどうかを記録',
  'starterCompare': '受け入れ可能な形の1つと比較する',
  'starterComparisonBoundary': 'この例示回答は、3つの判断がすべて記録されるまで非表示のままです。あなたの回答を採点したり、学習を証明したりするものではありません。',
  'starterExample': '受け入れ可能な形の1つ:“ワークショップは金曜10時に始まります。草稿をお持ちください。参加できない場合は返信してください。” 表現は異なっても構いません。これが唯一の正解ではありません。',
  'starterRescueCopy': 'レスキュープロンプトをコピー',
  'starterRescueCopied': 'レスキュープロンプトをコピーしました。最初に失敗したチェックのみ修正してください。',
  'starterHelpLabel': '使用したヘルプ',
  'starterHelpAria': '使用したヘルプを記録',
  'starterHelpPrompt': '最初のプロンプト',
  'starterHelpRescue': 'レスキュープロンプト',
  'starterHelpBoth': '両方のプロンプト',
  'starterCorrectionLabel': 'チェック後の訂正',
  'starterCorrectionAria': '訂正の状態を記録',
  'starterCorrectionNotNeeded': '不要',
  'starterCorrectionCorrected': '訂正済み',
  'starterCorrectionNotYet': '未訂正',
  'starterRecordNotRecorded': '未記録',
  'starterReceiptAria': 'ローカルのファーストウィン・チェック記録',
  'starterCopyRecord': '自分のローカルチェック記録をコピーする',
  'starterRecordCopied': 'ローカルチェック記録をコピーしました。含まれるのはステータスのみで、あなたの回答は含まれません。',
  'starterRecordCopyFailed': 'ローカルチェック記録をコピーできませんでした。テキストを手動で選択してください。',
  'starterRecoveryLink': '回復の引き継ぎを開く',
  'starterReceiptLabel': '平易なレシート',
  'starterReceipt': '試行した · ここでチェックした · ヘルプを使用した · 訂正した · 証明されないもの:学習、転移、一般的な文章能力、モデルの優越性。',
  'routeStatusAll': '全22章を表示中。',
  'routeStatusA': 'A · 最初の接触の6章を表示中。',
  'routeStatusB': 'B · 実際の仕事の7章を表示中。',
  'routeStatusC': 'C · 能力の5章を表示中。',
  'routeStatusD': 'D · チーム実践の4章を表示中。',
  'featuredLab': '注目の Lab',
  'lab13Title': '監査可能な縦断スライス',
  'lab13Body': 'プロトコルとベースラインから、チェックポイント、diff、集中的なチェック、失敗、転移まで、1つのローカル Markdown 変更を実行する。',
  'lab14Title': '再開時の整合',
  'lab14Body': '続行する前に、タスクポインター、ターゲット、ブランチ、権限、副作用の状態を整合させる。',
  'lab15Title': 'エビデンスの納品',
  'lab15Body': '完了の一文を、主張、範囲、出力、最小の次のチェックに分解する。',
  'lab16Title': '副作用の境界',
  'lab16Body': '診断を、インストール、公開、再起動、その他の永続的なアクションから分ける。',
  'lab17Title': 'Skill 発見の監査',
  'lab17Body': '存在、発見可能性、読み込み、動作、ライセンス、採用を別々の主張として確認する。',
  'lab18Title': '言語の転移',
  'lab18Body': '支援なしのベースラインを保持し、意味を妨げるエラーを1つ訂正し、レッスンの文を再利用せずに変更したケースをテストする。',
  'learningPathWarning': '学習パスのデータが読み込まれませんでした。ローカルフォールバックを表示しています。このルートに依存する前に、生成データを検証してください。',
  'skillCoachName': 'Codex コーチ',
  'skillProtocolName': 'タスクプロトコル',
  'skillEvidenceName': 'エビデンスレビュー',
  'skillSelectorName': 'スキルセレクター',
  'skillWorkflowName': 'ワークフローオーケストレーター',
  'skillResearchName': 'リサーチルーター',
  'skillContextName': 'プロダクトコンテキスト',
  'indexEyebrow': 'プロジェクトインデックス',
  'indexTitle': 'それぞれの主張がどこにあるかを把握する。',
  'indexIntro': 'これはリポジトリの人間が読めるマップです:各レイヤーが何を保存し、どこから始め、どのソースがステータスを管理するか。',
  'fileMapTitle': 'リポジトリマップ',
  'fileMapIntro': '作業に合ったレイヤーを読んでください。公開ページはガイドであり、下のファイルが真実のソースです。',
  'fileSiteTitle': '公開ショーケース',
  'fileSiteBody': 'index.html、styles.css、app.js、生成された学習パスデータ。',
  'fileChaptersTitle': 'コア学習テキスト',
  'fileChaptersBody': '22章。現在の成果物ステータス:candidate。',
  'fileLabsTitle': '観察可能な練習',
  'fileLabsBody': '18の Lab。現在のステータス:draft。実行ステータス:not_run。',
  'fileSkillsTitle': '再利用可能なメソッド',
  'fileSkillsBody': 'トリガー、境界、エビデンス契約を備えた23のプロジェクト Skill。',
  'fileDocsTitle': 'ガバナンスとリサーチ',
  'fileDocsBody': 'ステータス、ソース、フィールドレポート、更新ルール、品質レコード。',
  'ledgerTitle': 'コンテンツ状態',
  'ledgerIntro': '現在のステータスソースの簡潔な要約です。ステータスは野心ではなくエビデンスを表します。',
  'ledgerProject': 'プロジェクト',
  'ledgerChapters': '章 · 22',
  'ledgerLabs': 'Lab · 18',
  'ledgerSkills': 'Skills · 25',
  'ledgerResearch': 'フィールドリサーチ',
  'ledgerResearchNote': 'ユーザーレポート。ローカルでは再現されていない',
  'ledgerSource': '現在のステータスソースを開く',
  'localeTitle': '6言語ルート',
  'localeIntro': 'リポジトリのエントリとして6つのロケールが登録されています。6つのルートトークンはすべて公開されています。EN / 中文 UI はレビュー済みで、他のロケールは移行中、明示的な英語 UI フォールバックを使用します。',
  'localeEnglish': '利用可能 · デフォルト',
  'localeChinese': '利用可能 · 現在のトグル',
  'localeSpanish': 'ルート公開 · UI フォールバック',
  'localeGerman': 'ルート公開 · UI フォールバック',
  'localeJapanese': 'ルート公開 · UI フォールバック',
  'localeKorean': 'ルート公開 · UI フォールバック',
  'localeRule': 'ルートのルール:翻訳された成果物はロケールサフィックスを持ち、同じロケールにリンクします。ルートトークンは、完了した翻訳やレビュー済み UI と同じではありません。',
  'researchTitle': '実際の問題を、境界を添えて。',
  'researchIntro': 'リサーチインデックスは、公開されている Codex の issue、ファーストパーティの安全性ガイダンス、フォーラムのレポートを、症状、ソース範囲の境界、安全なチェック、ティーチングリンクに整理します。公式の根本原因やローカルでの再現を主張するものではありません。',
  'researchBoundary': 'ソース範囲のガイダンスと公開レポート · ローカルでの再現記録なし',
  'researchIndexLink': 'フィールド問題インデックスを開く',
  'researchIndexBody': 'Codex、作業面、引き継ぎ、認証、worktree、検証の症状。',
  'researchForumsLink': 'フォーラムのケースノートを読む',
  'researchForumsBody': 'サンドボックスネットワークの allowlist、Windows の spawn 失敗、承認、エンコーディング、プライベートパス。',
  'researchLiveLink': '現在のフィールドケースを3件レビューする',
  'researchLiveBody': 'worktree ターゲット、隠れたエビデンス、検証範囲。すべてローカルでは未検証のままです。',
  'researchSafetyLink': 'AI コラボレーションの安全性境界を読む',
  'researchSafetyBody': 'プロンプトインジェクション、必要最小限の入力、行動権限、検証。ソースで裏付けられた candidate リサーチ。',
  'researchReceiptsLink': 'AI 安全性のフィールドシグナルを読む',
  'researchReceiptsBody': '公開レポート、主張の分類、長時間のリサーチタスク用のチェックポイント。candidate リサーチ。',
  'researchFirstTurnLink': 'ユニバーサルなファーストターンをドラフトする',
  'researchFirstTurnBody': '6フィールドのテキストのみのスペイン語カードまたはリサーチカード。candidate リサーチであり、プラットフォームの同等性や成果の主張ではありません。',
  'researchPublicInterestLink': '公共の利益のための安全性調査を実行する',
  'researchPublicInterestBody': '固定の架空ケース:人々、データ境界、人間の制御、エビデンス、停止。candidate / not_run。',
  'problemPublicInterestSafetyTitle': '人々に影響を与える可能性のある AI のアイデアを評価する必要があります。',
  'problemPublicInterestSafetyBody': '1つの判断、負担がかかる可能性のある人々、必要なデータ、人間による救済手段、エビデンス、そして作業を止めなければならない時点を明記してください。',
  'problemPublicInterestSafetyLink': '固定の安全性調査を実行する · candidate · not_run ↗',
  'visualCaseTitle': 'メソッドを文脈の中で見る。',
  'visualModelLink': 'リクエストからエビデンスへ',
  'visualModelBody': '範囲、アクション、チェック、境界のある引き継ぎ。',
  'visualSkillLink': '4つのエビデンスレンズ',
  'visualSkillBody': '存在、正しさ、準備、学習。',
  'visualFieldLink': 'フィールドシグナル → 安全な縮退',
  'visualFieldBody': '3件の未解決レポート。ローカルでの再現も公式の根本原因の確認もない。',
  'visualCaseLink': '初心者練習ループ',
  'visualCaseBody': 'まず試行し、1つの問題を訂正し、ケースを変えて練習し、境界のあるレシートを保持します。',
  'searchLabel': 'プレイブックを検索',
  'searchPlaceholder': '章、Lab、Skill、フィールドケースを検索',
  'searchSubmit': '検索',
  'searchTitle': '境界のある答えを見つける。',
  'searchClear': 'クリア',
  'searchNoQuery': 'プレイブックを検索するには、単語またはフレーズを入力してください。',
  'searchLoading': 'ローカル検索インデックスを読み込み中…',
  'searchNoResults': '“{query}”の結果はありません。章のタイトル、Skill 名、またはより狭いフレーズをお試しください。',
  'searchResultsCount': '“{query}”の結果:{count}件。',
  'searchIndexUnavailable': 'ローカル検索インデックスを読み込めませんでした。接続を確認して、再度送信してお試しください。',
  'searchFallback': '英語のソースを表示中 · リクエストされた翻訳はまだ準備できていません',
  'searchOpen': 'リーダーを開く',
  'searchKindChapter': '章',
  'searchKindLab': 'Lab',
  'searchKindSkill': 'Skill メソッド',
  'searchKindFieldNote': 'フィールドノート',
  'searchKindProject': 'プロジェクトエントリ',
  'searchKindBook': 'ブックエントリ',
  'searchKindDocument': 'ドキュメント',
  'problemRecoveryTitle': 'モデルが間違ったタスクに回答しました。',
  'problemRecoveryBody': 'リクエスト、見えているコンテキスト、実際の返信、期待した結果を保持します。コミュニケーションの条件を1つ変えてから、安全な比較を実行します。',
  'problemRecoveryLink': '回復の引き継ぎを開く · candidate · not_run ↗',
  'repositoryStripAria': '正規のソースディレクトリと現在の境界',
  'repositoryStripTitle': 'このリポジトリに含まれるもの',
  'repositoryStripIntro': '公開リーダーは site/ からレンダリングされます。以下の正規の学習・メンテナンスソースは、現在のエビデンス境界を見えるようにしたままです。',
  'repositoryChapters': '22章 · candidate',
  'repositoryLabs': '18の Lab · メンテナー参照2件 · 学習者実行0件',
  'repositorySkills': '再利用可能な Skill 23件 · candidate',
  'repositoryDocs': 'ガバナンスとフィールドリサーチ · candidate。レポートはローカルで再現されていない',
  'skillCardIndex': '03 / スキル練習',
  'skillCardScope': '架空の計画 · ツール権限なし',
  'skillCardTitle': '助けを求める前に、小さな計画スキルを1つ練習する。',
  'skillCardIntro': '短い架空の公園訪問計画を自分で立ててください。モデルは待機し、小さなヒントを1つだけ与え、変更した制限の下で同じスキルをテストします。',
  'skillCardStepOne': 'カードを任意のテキストチャットにコピーします。架空の状況が含まれており、アカウント、ファイル、ツール、個人情報は不要です。',
  'skillCardStepTwo': '4分以内に最初の計画を自分で書きます。最初にモデルの計画や完成度の高い代替案を求めないでください。',
  'skillCardStepThree': '短いヒントを1つ受け入れ、自分の計画を訂正し、変更した制限時間を助けなしで試します。',
  'skillCardLink': 'スキル練習の境界を読む',
  'skillCardBoundary': 'candidate 練習のみ:短い架空の計画は、計画能力、判断力、転移、定着、安全性、独立したパフォーマンスを証明できません。',
  'skillPromptText': '小さな計画を立てる練習を手伝ってください。最初に計画を作らないでください。\n\n練習タスク:大人1人のための、架空の45分の都市公園訪問計画を立ててください。水筒、天気の確認、帰宅時間のリマインダー1つを含めてください。これは実際の予約、旅行の決定、天気予報ではありません。\n\n私が書く前に、この固定チェックを表示してください:3–5ステップ。3つの制約がすべて含まれている。根拠のないローカルの事実がない。人がその計画に従える。私に4分与えて書かせてください。私が応答する前に、モデルの計画を表示したり、拡張したり、採点したりしないでください。\n\n私の最初の試行の後、重要な欠落を1つだけ挙げてください。質問を1つするか、12語以内のヒントを与え、私の訂正を待ってください。両方の試行を保持してください。その後、訪問時間を45分から20分に変えるだけにして、同じチェックを使って、助けなしで新しい計画を1つ求め、私に書かせてください。\n\n最後に、ステータスを正確に1つだけ示してください:practised、demonstrated_on_this_task、transferred_to_time_limit_variation、not_run。1回のセッションは、計画能力、判断力、安全性、独立したパフォーマンスを確立しません。',
  'promptCardShow': 'プロンプトを表示',
  'skillPromptCardName': 'プロンプトカードエディター',
  'skillPromptCard': '承認済みのプロンプトアイデアを1つ、ソースを考慮したティーチングカードに変えます。',
  'skillAdversarialName': '敵対的プロジェクトレビュー',
  'skillAdversarial': '公開またはリリースの判断の前に、重大な弱点をランク付けします。',
  'skillEscalationName': 'リクエストエスカレーション',
  'skillEscalation': '起草、調査、行動の前に、最小の安全なレーンを選びます。',
  'skillComparisonName': 'LLM 比較プロトコル',
  'skillComparison': 'リーダーボードを捏造せずに、公正な2候補比較を計画します。',
  'skillPracticeTargetName': '練習ターゲット',
  'skillPracticeTarget': '広い学習の願いを、観察可能な最初の試行1つに変えます。',
  'skillFactWatchName': 'プラットフォームファクトウォッチ',
  'skillFactWatch': '名前付きステップが読者を誤解させる前に、変化する製品の主張をマッピングします。',
  'skillRouteEscalation': '自分がどのような支援を必要としているのか、まだ分からない。',
  'skillRouteEscalationResult': '起草、調査、行動の前に、最小の安全なレーンを選びます。',
  'promptDeckEyebrow': 'オプションのプロンプトカード · 5分',
  'promptDeckTitle': '小さな会話を1つから始める。',
  'promptDeckIntro': 'オリジナルのテキストのみのカードを1枚選んでください。言語カードと計画カードは編集不要です。リサーチカードには2つの角括弧があります。返信を自分で検査し、主張を小さく保ってください:1回の試行は、流暢さ、リサーチ、完成した回答ではありません。',
  'promptContractKicker': '送信前に',
  'promptContractTitle': '6つの部分を見えるようにする。',
  'promptContractLink': '根拠を読む',
  'promptContractGridAria': '最初の LLM リクエストで検査する6つのフィールド',
  'promptContractOutcomeLabel': '成果',
  'promptContractOutcomeBody': '小さく観察可能な結果を1つ。',
  'promptContractContextLabel': '開始コンテキスト',
  'promptContractContextBody': 'あなたが知っているか、提供するもの。',
  'promptContractResponseLabel': 'リクエストする返答',
  'promptContractResponseBody': '形式、長さ、順序。',
  'promptContractLimitsLabel': '制限',
  'promptContractLimitsBody': '対象外のデータとアクション。',
  'promptContractCheckLabel': 'チェック',
  'promptContractCheckBody': 'あなた自身が検査するもの。',
  'promptContractStopLabel': '停止とレシート',
  'promptContractStopBody': 'いつ停止し、何を保持するか。',
  'promptCardScope': 'テキストのみ · ツール権限なし',
  'promptCardCopy': 'プロンプトをコピー',
  'promptCardCopied': 'プロンプトをコピーしました。3つのステップに従い、返信を自分で検査してください。',
  'promptCardCopyFailed': 'プロンプトをコピーできませんでした。テキストを手動で選択してください。',
  'spanishCardIndex': '01 / 言語練習',
  'spanishCardTitle': '短い文字入力のスペイン語学習グループ時間確認を1回行う。',
  'spanishCardIntro': 'このテキストのみのカードは、架空の学習情報を使い、あなたの文字入力の試行を待ち、意味を妨げるエラー1つのみにヘルプを限定します。',
  'spanishCardStepOne': 'カードを書かれた通りにコピーしてください。すでに架空の文字入力スペイン語学習グループ時間確認が設定されています。',
  'spanishCardStepTwo': '任意のテキストチャットに貼り付けます。実際の名前、学校、予定表、アカウント、支払い情報を追加しないでください。',
  'spanishCardStepThree': '最初の回答を自分で入力します。大ざっぱな試行が目的です。最初に答えを求めないでください。',
  'spanishCardLink': '練習の境界を読む',
  'spanishCardBoundary': 'candidate のテキスト練習のみ:1回の文字入力セッションは、会話、発音、リスニング、流暢さ、正確さ、定着、独立したパフォーマンスを示すことはできません。',
  'spanishPromptText': '学習者のターンがちょうど4回になる、4分の文字入力スペイン語学習グループ時間確認を1回実行してください。あなたは架空の同級生で、最初に文字で質問します。短い現在形の質問だけを使ってください。私は各質問の後に1回ずつ文字で答えます。\n\n架空の学習カード: Ana。学習グループ。火曜または木曜。6:00または6:30。図書館またはオンライン。質問を一つ持参。私はカードを使ってもよく、最大3つの単語だけを調べてもかまいません。実際の名前、学校、予定表、アカウント、住所、連絡先、支払い情報を要求したり受け取ったりしないでください。\n\n最初のターンの前に、この固定ルーブリックを表示してください:学習者のターンが4回。目的と学習グループが伝わる。曜日と時刻が明確になる。場所またはオンラインの選択肢が伝わる。スペイン語が続けるのに十分理解できる。私が返信する前に、教えたり、翻訳したり、モデルの回答を表示したりしないでください。私の最初の試行を保持し、調べた単語を記録してください。最初の意味を妨げるエラーのみを訂正してください:エラーの種類を指摘し、部分的なヒントを与え、それでも続けられない場合にのみ、完成した断片を1つ示してください。私に訂正を求めてください。両方の試行を保持し、1回の成功したやり取りを、流暢さ、会話、リスニング/発音のエビデンスと呼ばないでください。',
  'researchCardIndex': '02 / リサーチ準備',
  'researchCardTitle': '判定ではなく、ソースチェックを準備する。',
  'researchCardIntro': '1つの狭い質問と、あなたが提供した材料を、主張、ギャップ、次の質問の小さな台帳に変えます。',
  'researchCardStepOne': 'カードをコピーし、2つの角括弧だけを置き換えます。',
  'researchCardStepTwo': '共有してもよい材料のみを提供してください。個人情報、プライベート、高リスクの材料は含めないでください。',
  'researchCardStepThree': 'その表は準備として扱ってください。主張に頼る前に、自分でソースを開いて照合してください。',
  'researchCardLink': 'リサーチの境界を読む',
  'researchCardBoundary': 'ソースが存在すること、最新であること、主張を裏付けることを証明できません。生成された表は、それ自体ではエビデンスではありません。',
  'researchPromptText': '最終回答ではなく、リサーチチェックを準備するために5分あります。\n\n質問:[1つの狭い質問]。\n私が提供した材料:[URL、タイトル、抜粋、または“なし”]。\n\nまず、質問を言い換え、どのようなエビデンスが必要かを挙げてください。次に、3行の表を作ってください:可能な主張、提供されたソースまたは“欠落”、そして確認が必要なもの。引用を捏造したり、アクセスできないソースを開いたと述べたり、推奨を与えたりしないでください。事実、レポート、推論を分けてください。材料が欠けている、矛盾している、個人情報を含む、または高リスクの場合は、停止して、最小の安全な次のステップを教えてください。\n\n最後に、実際に提供されたソース、不明な点、続ける前に私が答えるべき質問1つを示してください。',
  'heroScope': '転用できる方法は一つで、現在の旗艦実践トラックは Codex です。名称を挙げた各プラットフォームは、現行の出典と再現可能な根拠がそろって初めてレッスンになります。',
  'heroRouteNoSetupTitle': 'プロジェクトやプログラミングの経験がありませんか?セットアップ不要のチェックから始めてください。',
  'heroRouteNoSetupBody': '任意のチャットモデルと架空のメッセージを使用します。ファイル、ツール、アカウント接続、プライベートデータは不要です。',
  'mobileRouteNoSetup': 'プロジェクトがありませんか?セットアップ不要のチェックから始める',
  'skillInterruptionName': '割り込みチェックポイント',
  'skillInterruption': '再試行、モデルの切り替え、新しいタスクの前に、判明していることを保存する。',
  'skillHandoffName': 'シフト引き継ぎ',
  'skillHandoff': '再利用可能なルールと、今日渡された作業項目を分ける。',
};

copy.ko = {
  'skipToContent': '본문으로 건너뛰기',
  'wordmarkAria': 'Prysai LLM 플레이북 홈',
  'languageToggleAria': '인터페이스 언어 선택',
  'menuAria': '내비게이션 열기',
  'navAria': '주요 내비게이션',
  'heroIndexAria': '페이지 색인',
  'pathAria': '7단계 학습 경로',
  'routesAria': '챕터 경로 필터링',
  'menu': '메뉴',
  'menuClose': '닫기',
  'navStart': '여기서 시작',
  'navFirst30': '처음 15분',
  'navPath': '학습 경로',
  'navIndex': '프로젝트 색인',
  'navRoutes': '읽기 경로',
  'navLabs': '랩',
  'navSkills': 'Skill',
  'navUpdates': '업데이트 맵',
  'localeBannerFallback': '{requested} 경로가 선택되었지만 일부 인터페이스 문자열이나 과정 단위는 아직 마이그레이션 중입니다. 과정 단위가 없으면 Reader는 이 언어를 유지한 채 해당 단위를 사용할 수 없음으로 표시합니다. 과정 본문을 조용히 영어로 바꾸지 않습니다.',
  'localeManifestError': '생성된 매니페스트가 로드되지 않아 로케일 라우팅을 사용할 수 없습니다. 영어는 계속 사용할 수 있습니다. 다른 경로에 의존하기 전에 매니페스트를 다시 빌드하세요.',
  'localeBannerReady': '{language}(으)로 읽는 중입니다.',
  'localeMenuAria': '인터페이스 언어',
  'languageNameEnglish': '영어',
  'languageNameChinese': '중국어(간체)',
  'languageNameSpanish': '스페인어',
  'languageNameJapanese': '일본어',
  'languageNameKorean': '한국어',
  'languageNameGerman': '독일어',
  'localeOptionFallback': '영어 UI 폴백',
  'heroIndex': 'LLM / 실습 시스템',
  'heroEyebrow': '작게 시작하세요 · 과제 하나, 눈에 보이는 점검 하나',
  'heroTitle': '첫 LLM 과제를 실제 작업으로 만드세요.',
  'heroLede': '언어 모델과 작업하는 실용적인 방법 하나를 배우고, Codex 실습 트랙에서 깊이 연습하세요. 결과를 정의하고, 컨텍스트와 권한을 통제하고, 작업을 검사하고, 실패에서 회복하고, 증거를 남기세요.',
  'heroPrimary': '설정 없는 LLM 점검부터 시작',
  'heroSecondary': 'Codex 실습 트랙 시작',
  'heroRouteAria': '준비 상태에 따라 첫 경로 선택',
  'heroRouteKicker': '지금 가진 것에 따라 선택하세요',
  'heroRouteGuidedTitle': '버려도 되는 프로젝트가 있고 Codex를 배우고 싶으세요? 안내 경로를 따라가세요.',
  'heroRouteGuidedBody': '챕터 1부터 시작하세요. 범위와 증거 경계가 보인 다음에야 첫 로컬 편집이 이뤄집니다.',
  'heroRouteFixtureTitle': 'Codex 경로에 쓸 안전한 파일이 필요하세요? 오프라인 픽스처를 여세요.',
  'heroRouteFixtureBody': '챕터 2 이후에 쓸 대상과 점검 항목을 하나씩 제공합니다. 안내 경로를 대체하는 것이 아니라 폴백입니다.',
  'heroRouteBoundary': '세 진입점 모두 candidate입니다. 구조는 점검되었지만, 독자 결과는 아직 측정되지 않았습니다.',
  'heroProofAria': '선택 워밍업 증빙 카드',
  'heroProofKicker': '선택 워밍업 / 점검 가능한 예시',
  'heroProofStatus': 'candidate · 참가자 실행 기록 없음',
  'heroProofTitle': '점검된 결과 하나에 무엇이 들어 있는지 확인하세요.',
  'heroProofSourceLabel': '원본 메시지',
  'heroProofSource': '“Hi, the workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come.”',
  'heroProofPreserveLabel': '사실 보존',
  'heroProofPreserve': '금요일 10시, 초안, 회신 요청을 지키세요. 날짜, 장소, 이유, 연락 수단을 추가하지 마세요.',
  'heroProofChecksLabel': '인간 점검 3가지',
  'heroProofCheckOne': '금요일 10시와 초안이 그대로 남아 있습니다.',
  'heroProofCheckTwo': '참석할 수 없는 사람은 회신하도록 요청받습니다.',
  'heroProofCheckThree': '근거 없는 세부 내용이 나타나지 않습니다.',
  'heroProofReceiptLabel': '범위가 정해진 기록',
  'heroProofReceipt': '점검된 시도 하나를 기록할 수 있습니다. 학습, 전이, 모델 성능을 증명하지는 않습니다.',
  'heroProofLink': '선택 15분 점검 열기',
  'heroFooter': '문제 → 프로토콜 → 행동 → 증거',
  'startEyebrow': '여기서 시작 · 문제에 따라 선택',
  'startTitle': '무엇을 해야 하세요?',
  'startIntro': '실제 로컬 Codex 과제라면 후보 경로 하나로 시작하세요. 경계 지도, 경계 랩, 범위가 정해진 과제, 그리고 되돌릴 수 있는 랩 하나 순입니다. 그 경로가 맞지 않을 때만 다른 경로를 선택하세요.',
  'problemStartTitle': '안전한 Codex 경로 하나를 원합니다.',
  'problemStartBody': '경계 지도에서 시작하고, Lab 011로 경계를 표시한 다음, diff와 집중 점검, 미검증 목록을 갖춘 버려도 되는 README 변경 하나를 선택하세요.',
  'problemStartLink': '챕터 1 → Lab 011 → 챕터 2 → Lab 001 시작 · candidate / draft ↗',
  'problemWrongFileTitle': '파일이나 결과가 불확실합니다.',
  'problemWrongFileBody': '다음 편집을 멈추세요. 요청된 범위, git diff, 집중 점검, 남은 미지의 항목을 비교하세요.',
  'problemWrongFileLink': '챕터 9 열기 · candidate ↗',
  'problemSkillTitle': 'Skill을 선택하거나 설계해야 합니다.',
  'problemSkillBody': '트리거, 입력, 경계, 증거 계약부터 정하세요. 그래야 Skill이 자리 값을 하는지 결정할 수 있습니다.',
  'problemSkillLink': '챕터 11 열기 · candidate ↗',
  'problemUpdateTitle': '안전하게 게시하거나 업데이트해야 합니다.',
  'problemUpdateBody': '정식 파일을 찾고, 출처 기록을 붙이고, 관련 게이트를 실행하고, 미검증 주장을 릴리스에 넣지 마세요.',
  'problemUpdateLink': '챕터 22 열기 · candidate ↗',
  'problemIntakeTitle': '목표가 넓어 무엇부터 연습해야 할지 모르겠습니다.',
  'problemIntakeBody': '결정을 한 번에 하나씩 물어보세요. 기존 경로 하나, 점검 가능한 시도 하나, 허용된 도움, 더 작은 폴백을 선택하세요.',
  'problemIntakeLink': '첫 연습 진입점 열기 · candidate · not_run ↗',
  'problemLanguageTitle': '언어 능력 하나를 연습하고 싶습니다.',
  'problemLanguageBody': '관찰 가능한 수행 하나를 정의하고, 설명을 듣기 전에 시도하고, 의미를 막는 오류 하나를 교정한 다음, 변경된 사례로 다시 시험하세요.',
  'problemLanguageLink': '언어 경로 열기 · candidate · not_run ↗',
  'problemGeneralSkillTitle': '다른 실제 능력을 연습하고 싶습니다.',
  'problemGeneralSkillBody': '면접 답변, 설명, 발표를 제한 시간 안의 수행 하나로 만들고, 조건을 바꿔 다시 시험하세요.',
  'problemGeneralSkillLink': '일반 능력 경로 열기 · candidate · not_run ↗',
  'problemResearchTitle': '범위가 정해진 질문 하나를 조사해야 합니다.',
  'problemResearchBody': '질문을 결정과 연결하고, 출처 담당자를 지정하고, 주장 원장을 유지하고, 반대 의견을 찾아보고, 의도적으로 멈추세요.',
  'problemResearchLink': '조사 경로 열기 · candidate · not_run ↗',
  'first30Eyebrow': '선택 15분 워밍업',
  'first30Title': '답변 하나를 판단하세요. 설정이 필요 없습니다.',
  'first30Intro': '텍스트, 과제, 점검 항목이 이미 채워져 있습니다. 아무 채팅 모델이나 사용하세요. 파일, 터미널, Git, 계정 연결, 특별한 용어가 필요 없습니다. 이 워밍업은 점검 습관 하나를 연습하는 것입니다. 실제 로컬 과제는 위의 Codex 경로로 시작하세요.',
  'stepOneTitle': '되돌릴 수 있는 변경을 선택하세요.',
  'stepOneBody': '샌드박스 파일이나 작은 문서 편집을 사용하세요. 자격 증명, 프로덕션, 파괴적인 명령으로 시작하지 마세요.',
  'stepTwoTitle': '과제 계약을 작성하세요.',
  'stepTwoBody': '목표, 컨텍스트, 허용된 행동, 수락 기준, 증거, 중지 조건을 명시하세요.',
  'stepThreeTitle': 'Codex가 먼저 검사하게 하세요.',
  'stepThreeBody': '편집을 허용하기 전에 관련 파일과 현재 상태를 요청하세요. 범위를 계속 눈에 보이게 하세요.',
  'stepFourTitle': '무엇이 바뀌었는지 검증하세요.',
  'stepFourBody': 'diff를 검토하고, 가장 작은 관련 점검을 실행하고, 테스트하지 않은 것을 기록하세요.',
  'checkCardLabel': '유용한 과제 계약',
  'fieldGoalLabel': '목표',
  'fieldGoal': '이름이 붙은 변경 하나를 만드세요.',
  'fieldContextLabel': '컨텍스트',
  'fieldContext': '이 과제에 필요한 파일만.',
  'fieldInputsLabel': '입력',
  'fieldInputs': '경로, 현재 동작, 제약 조건.',
  'fieldAllowedLabel': '허용된 행동',
  'fieldAllowed': '읽기와 편집. 외부 영향 전에는 멈추세요.',
  'fieldAcceptanceLabel': '수락 기준',
  'fieldAcceptance': '구체적인 diff와 점검 결과.',
  'fieldEvidenceLabel': '증거',
  'fieldEvidence': 'diff, 명령, 출력, 한계.',
  'fieldStopLabel': '중지 조건',
  'fieldStop': '범위, 권한, 증거가 없을 때.',
  'contractHighlight': '가장 안전한 첫 과제는 작고, 되돌릴 수 있고, 검사하기 쉬운 것입니다.',
  'openChapterTwo': '챕터 2 열기',
  'starterEyebrow': '전 → 프롬프트 → 점검 → 수정',
  'starterTitle': '사실은 바꾸지 않고 메시지 하나를 더 명확하게 만드세요.',
  'starterIntro': '원본을 한 번 읽고, 채워진 프롬프트를 복사한 다음, 답변을 직접 점검하세요. 목표 시간: 15분. 실제 초보자 완료 시간은 측정되지 않았습니다.',
  'starterCopy': '첫 프롬프트 복사',
  'starterCopied': '첫 프롬프트를 복사했습니다. 세 가지 항목에 맞춰 답변을 점검하세요.',
  'starterCopyFailed': '복사에 실패했습니다. 프롬프트 텍스트를 직접 선택하세요.',
  'starterBoundary': '준비 완료. 이 연습을 완료하면 점검된 시도 하나가 기록됩니다. 학습이나 일반 능력을 증명하지는 않습니다.',
  'starterProgressionAria': '선택 워밍업에서 이어가기',
  'starterDeepen': '다른 초보 연습 선택',
  'starterCodexPath': 'Codex 경로 시작: 챕터 1',
  'starterBoundaryLab': '경계 표시: Lab 011 · draft / not_run',
  'starterBoundedTask': '범위가 정해진 로컬 과제 하나 선택: 챕터 2',
  'starterPractice': 'Lab 001 실행: 파일과 Git 다루기 · draft / not_run',
  'starterEvidence': '나쁜 답변에서 회복하는 법 배우기',
  'protocolEyebrow': '작업 프레임',
  'protocolTitle': '모든 진지한 과제에는 경계가 필요합니다.',
  'protocolIntro': '이 프레임은 사람, 모델, 도구, Agent 사이의 공통 언어입니다. 권한이나 Skill을 추가하기 전에 사용하세요.',
  'protocolLink': '과제 프로토콜 읽기',
  'protocolNote': '누락된 입력이 범위, 위험, 수락 테스트를 바꾼다면 멈추고 물어보세요. 저위험 읽기에만 영향을 준다면 먼저 검사하고 가정을 보고하세요.',
  'protocolRuleOne': '정의',
  'protocolRuleTwo': '실행',
  'protocolRuleThree': '검증',
  'protocolRuleFour': '인계',
  'pathEyebrow': '학습 경로',
  'pathTitle': '7개 레벨. 하나의 실행 가능한 계약.',
  'pathIntro': '레벨을 선택하면 무엇을 읽고, 하고, 사용하고, 제출하고, 어떤 주장을 거부해야 하는지 정확히 볼 수 있습니다. 레벨은 읽은 횟수가 아닙니다.',
  'currentLevel': '현재 레벨',
  'nextStep': '다음 단계',
  'requiredChapters': '필수 챕터',
  'requiredLabs': '필수 랩',
  'supportingSkills': '보조 Skill',
  'evaluationFixtures': '평가 픽스처',
  'evidenceGate': '증거 게이트',
  'graduationGate': '다음 단계로 넘어갈 때',
  'blockedWhen': '멈출 때',
  'fourEvidence': '증거 유형 4가지',
  'evidenceExplain': '설명',
  'evidenceOperate': '운용',
  'evidenceJudge': '판단',
  'evidenceReview': '검토',
  'positive': '긍정',
  'boundary': '경계',
  'failure': '실패',
  'transfer': '전이',
  'statusCandidate': '구조와 기본 점검은 통과했습니다. 새 증거가 아직 필요합니다.',
  'labFirstSeen': '도입',
  'labReused': '재사용 출처',
  'labCapability': '역량',
  'labArtifact': '산출물',
  'labAcceptance': '수락 기준',
  'levelL0Name': '관찰자',
  'levelL0Short': '무슨 일이 있었는지 알아차리기',
  'levelL1Name': '안전한 사용자',
  'levelL1Short': '저위험 과제 완료하기',
  'levelL2Name': '과제 설계자',
  'levelL2Short': '과제 프로토콜 작성하기',
  'levelL3Name': '워크플로 설계자',
  'levelL3Short': '정의에서 전달로 나아가기',
  'levelL4Name': '역량 구축자',
  'levelL4Short': '가장 작은 유용한 조합 선택하기',
  'levelL5Name': '증거 검토자',
  'levelL5Short': '완료 주장 검증하기',
  'levelL6Name': '팀 코치',
  'levelL6Short': '방법을 시스템으로 만들기',
  'chaptersEyebrow': '읽기 경로',
  'chaptersTitle': '22개 챕터. 네 가지 진입 방식.',
  'chaptersIntro': '순서대로 읽어 모델을 쌓으세요. 실제 과제가 막혀 있다면 경로별로 건너뛰세요. 모든 경로는 연습과 증거로 돌아옵니다.',
  'filterAll': '전체 챕터',
  'filterA': 'A · 첫 접촉',
  'filterB': 'B · 실제 작업',
  'filterC': 'C · 역량',
  'filterD': 'D · 팀 연습',
  'routeATitle': 'Codex와의 첫 접촉',
  'routeADesc': '01—06 · 첫 안전한 과제 완료',
  'routeBTitle': '실제 작업을 위한 Codex',
  'routeBDesc': '07—13 · 검증 가능한 워크플로 설계',
  'routeCTitle': '역량과 Agent 협업',
  'routeCDesc': '14—18 · 가장 작은 유용한 조합 선택',
  'routeDTitle': '유창함에서 팀 연습까지',
  'routeDDesc': '19—22 · 개인 방법을 팀 역량으로',
  'candidateStatus': 'candidate',
  'chapter01': 'Codex 이전에 GPT 이해하기',
  'chapter02': '안전하고 검증 가능한 과제 완료하기',
  'chapter03': '바람을 과제 프로토콜로 만들기',
  'chapter04': '컨텍스트, 권한, Agent 경계',
  'chapter05': '올바른 Codex 인터페이스 선택하기',
  'chapter06': '모델 선택은 모델 숭배가 아니다',
  'chapter07': 'Skill, Plugin, MCP, 도구가 작업을 나누는 방식',
  'chapter08': '정의부터 전달까지의 전체 수명 주기',
  'chapter09': '검증, 의심, 회복',
  'chapter10': '계획과 수직 슬라이스',
  'chapter11': '자리 값을 하는 Skill 설계하기',
  'chapter12': 'Agent 루프, 상태, 중지 조건',
  'chapter13': '파일, 터미널, 브라우저, GitHub에 걸친 행동 경계',
  'chapter14': '외부 Skill 발견, 설치, 감사',
  'chapter15': '조사: 질문에서 감사 가능한 지식까지',
  'chapter16': '엔지니어링: 아이디어에서 신뢰할 수 있는 소프트웨어까지',
  'chapter17': '마케팅: 제품 컨텍스트에서 실험까지',
  'chapter18': '콘텐츠, 디자인, 데이터, 자동화',
  'chapter19': '모델과 워크플로 평가하기',
  'chapter20': '개인 Codex 작업 시스템 구축하기',
  'chapter21': '팀 역량 시스템 구축하기',
  'chapter22': '시스템을 최신으로 유지하고 복구 가능하게 하기',
  'labsEyebrow': '랩',
  'labsTitle': '원리를 관찰 가능하게 만드세요.',
  'labsIntro': '랩은 저위험, 재현 가능한 과제입니다. 각 랩은 설정, 증거, 실패 변형, 비밀 경계, 성찰을 명시합니다.',
  'draftStatus': 'draft',
  'startingLab': '시작 랩',
  'lab01Title': '첫 안전한 과제',
  'lab01Body': '샌드박스 프로젝트에서 Codex가 편집 전에 검사하게 하세요. “됐다”를 점검 가능한 diff로 바꾸세요.',
  'lab02Title': '과제 프로토콜',
  'lab02Body': '모호한 요청을 목표, 입력, 제약, 수락 기준, 실패 처리로 나누세요.',
  'lab03Title': '증거 검토',
  'lab03Body': '완성된 것처럼 보이지만 주장에 대한 증거가 없는 결과를 찾아보세요.',
  'lab04Title': 'Skill 선택',
  'lab04Body': '선택 이유를 설명하고, 디렉터리 크기를 적합성의 대리 지표로 쓰는 것을 거부하세요.',
  'lab05Title': 'Skill 설계',
  'lab05Body': '안정적인 방법을 경계, 증거, 실패 사례를 갖춘 역량으로 만드세요.',
  'lab06Title': 'Agent 중지 조건',
  'lab06Body': '성공, 입력 누락, 회복 가능한 실패, 권한 충돌에 대한 중지 지점을 정의하세요.',
  'lab07Title': '행동 경계',
  'lab07Body': '읽기, 편집, 실행, 커밋, 푸시, 게시에 각각 필요한 증거를 비교하세요.',
  'lab08Title': '조사 질문',
  'lab08Body': '넓은 주제를 질문, 출처 계획, 최소 증거 표로 만드세요.',
  'lab09Title': '엔지니어링 수명 주기',
  'lab09Body': '직접 구현과 전체 수명 주기를 비교하고 재작업 증거를 기록하세요.',
  'lab10Title': '공유 제품 컨텍스트',
  'lab10Body': '공유된 제품 이해를 버전 관리하고, 사실과 가설을 분리하세요.',
  'lab11Title': 'GPT와 Codex 경계',
  'lab11Body': '정적 과제 카드를 사용해 생성, 실행, 검증, 외부 영향을 분리하세요.',
  'lab12Title': '팀 역량 마이그레이션',
  'lab12Body': '버전, 담당자, 권한, 독립 재현, 롤백에 대한 계약을 만드세요.',
  'labsIndexLink': '랩 규칙과 전체 18개 항목 열기',
  'skillsEyebrow': '역량 계층',
  'skillsTitle': '23개 Skill. 서로 다른 역할.',
  'skillsIntro': 'Skill은 트리거, 입력 점검, 경계, 중지 조건, 출력 계약, 검증 방법을 갖춘 메서드입니다.',
  'skillCoach': '학습 경로와 연습 경계를 선택하세요.',
  'skillProtocol': '모호한 요청을 실행 가능한 계약으로 만드세요.',
  'skillEvidence': '완료 주장을 점검 가능한 증거로 나누세요.',
  'skillSelector': '최소 실행 가능한 역량 조합을 선택하세요.',
  'skillWorkflow': '단계, 체크포인트, 인계를 관리하세요.',
  'skillResearch': '질문을 감사 가능한 지식으로 좁히세요.',
  'skillContext': '안정적인 원칙과 변하는 사실을 분리하세요.',
  'skillLearningName': '학습 코치',
  'skillLearning': '회상, 교정, 지연 복습, 전이로 연습하세요.',
  'skillSourceName': '출처 조사자',
  'skillSource': '넓은 검색을 범위가 정해진 출처 기반 조사로 바꾸세요.',
  'skillSignalName': '현장 신호 큐레이터',
  'skillSignal': '공개 보고서를 범위가 정해진 수요 증거로 바꾸세요.',
  'skillAdapterName': '플랫폼 어댑터 검토',
  'skillAdapter': '출처가 있고 실행 가능한 차이(delta)가 없는 플랫폼 교훈은 거부하세요.',
  'skillTriageName': '커뮤니케이션 실패 분류',
  'skillTriage': '실패한 상호작용 하나를 진단하고, 가장 작은 수정을 다시 시험하세요.',
  'skillBriefName': '대화 브리프',
  'skillBrief': '시도해 보지 않은 저위험 요청 하나를 복사해 쓸 수 있는 첫 메시지로 만드세요.',
  'skillFirstTurnCheckName': '첫 턴 점검',
  'skillFirstTurnCheck': '보내지 않은 저위험 요청에 보이는 경계가 있는지 검사하세요.',
  'skillRouteBrief': '명확한 첫 메시지 하나를 작성해야 합니다.',
  'skillRouteBriefResult': '점검 항목과 중지 경계를 갖춘 저위험, 복사 가능한 첫 턴 하나를 반환합니다.',
  'skillRouteFirstTurnCheck': '첫 요청을 이미 작성했고 검사하고 싶습니다.',
  'skillRouteFirstTurnCheckResult': '대체 프롬프트를 작성하지 않고 중대한 공백을 표시합니다.',
  'skillBoundaryName': '원본 방법 우선.',
  'skillBoundary': '외부 Skill은 원본 프로젝트 URL과 라이선스 경계를 유지해야 합니다.',
  'skillIndexLink': 'Skill 레지스트리와 전체 23개 메서드 열기',
  'mobileIndexAria': '전체 프로젝트 색인',
  'mobileIndexChapters': '챕터',
  'mobileIndexLabs': '랩',
  'mobileIndexSkills': 'Skill',
  'mobileIndexCases': '현장 사례',
  'mobileIndexLocales': '로케일 기록',
  'mobileIndexVisuals': '교수 보드',
  'mobileIndexUpdates': '업데이트 영역',
  'mobileIndexTrust': '신뢰도 유형',
  'skillFootnote': '프로젝트의 23개 Skill 모두 구조 검사를 통과했으며 candidate로 유지됩니다. 신규 과제 증거는 일부만 있습니다. 플랫폼 관찰 기록(Platform Observation Record)은 눈에 보이는 표면 하나를 문서화할 뿐, 역량이나 안전에 대한 주장이 아닙니다. 연습 목표(Practice Target)는 첫 시도 하나를 준비할 뿐, 학습을 증명하지 않습니다. 중단 체크포인트(Interruption Checkpoint)는 과제 기록을 보존할 뿐, 작업을 재시도하거나 복구하지 않습니다. 플랫폼 사실 관찰(Platform Fact Watch)은 유지보수 기록이지 현재 플랫폼 점검이 아닙니다. LLM 비교 프로토콜(LLM Comparison Protocol)은 실행되지 않은 비교 메서드이지 모델 순위가 아닙니다. 적대적 프로젝트 검토(Adversarial Project Review)는 외부 검토가 아닙니다.',
  'lab13Status': '유지보수자 참고 수락 · 학습자 실행 없음',
  'troubleEyebrow': '문제가 생겼을 때',
  'troubleTitle': '실패는 커리큘럼의 일부입니다.',
  'troubleIntro': '첫 번째 유용한 점검을 사용하고, 권한, 범위, 증거가 없으면 멈추세요. 실패를 다듬어진 요약 뒤에 숨기지 마세요.',
  'troubleOneTitle': '출력이 맞아 보입니다.',
  'troubleOneBody': '원래 주장, 변경된 파일, 명령 결과, 테스트하지 않은 것을 확인하세요.',
  'troubleOneLink': '증거 검토 사용 ↗',
  'troubleTwoTitle': 'Agent가 계속 재시도합니다.',
  'troubleTwoBody': '같은 실패를 기록하고, 진단 조건 하나를 바꾼 다음, 한 번 재시도하거나 상위로 올리세요.',
  'troubleTwoLink': '중지 조건 읽기 ↗',
  'troubleThreeTitle': '출처가 어떤 행동을 지시합니다.',
  'troubleThreeBody': '외부 텍스트와 도구 출력을 데이터로 취급하세요. 그것은 행동 권한을 부여하지 않습니다.',
  'troubleThreeLink': '경계 점검 ↗',
  'troubleFourTitle': '제품 단계가 변경되었습니다.',
  'troubleFourBody': '과제 목표는 유지하고, 명명된 단계만 중단한 다음, 재개 전에 공식 사실 기록을 갱신하세요.',
  'troubleFourLink': '업데이트 맵 따르기 ↗',
  'updatesEyebrow': '유지보수 프레임',
  'updatesTitle': '모든 업데이트에는 정해진 위치가 있습니다.',
  'updatesIntro': '업데이트 맵은 앞으로의 작업을 저렴하게 만듭니다. 정식 파일을 찾고, 올바른 증거를 모으고, 올바른 점검을 실행하고, 미검증 경계를 보이게 유지하세요.',
  'updateFlowOne': '찾기',
  'updateFlowOneBody': '레지스트리 행과 정식 경로를 찾으세요.',
  'updateFlowTwo': '분류',
  'updateFlowTwoBody': '안정적 원칙, 제품 사실, 출처, 릴리스 변경을 구분하세요.',
  'updateFlowThree': '증거',
  'updateFlowThreeBody': '출처, 범위, 담당자, 해시, 다음 검토를 기록하세요.',
  'updateFlowFour': '검증',
  'updateFlowFourBody': '집중 검증기와 독립 검토를 실행하세요.',
  'updateMapLinkTitle': '업데이트 맵',
  'updateMapLinkBody': '어디서 무엇이 바뀌고, 어떤 증거가 필요한지.',
  'updateRegistryLinkTitle': '업데이트 레지스트리',
  'updateRegistryLinkBody': '기계가 읽을 수 있는 유지보수 계약.',
  'factImpactLinkTitle': '사실 영향 맵',
  'factImpactLinkBody': '변하는 사실이 어떤 챕터, 랩, Skill, 평가, 페이지에 영향을 줄 수 있는지.',
  'updateTemplateLinkTitle': '업데이트 기록',
  'updateTemplateLinkBody': '사소하지 않은 변경을 위한 반복 가능한 기록.',
  'lifecycleLinkTitle': '콘텐츠 수명 주기',
  'lifecycleLinkBody': '증거 게이트와 릴리스 게이트.',
  'statusEyebrow': '증거 경계',
  'statusTitle': '상태는 증거에 대한 주장입니다.',
  'statusIntro': '이 프로젝트는 문서 수, Skill 수, 성공한 출력 하나를 “숙달”로 만들지 않습니다. 증거가 지지하는 상태를 사용하세요.',
  'statusDraft': '아직 작성 중이거나 최소 점검을 통과하지 못한 상태.',
  'statusVerified': '선언된 범위에 긍정, 경계, 실패, 전이 증거가 있습니다.',
  'statusProduction': '안전, 유지보수, 버전, 라이선스, 릴리스 게이트도 모두 통과합니다.',
  'statusSourceBefore': '현재 증거는 ',
  'statusSourceLink': '현재 상태 출처',
  'statusReviewBefore': '에 기록되어 있으며, 설명은 ',
  'statusReviewLink': '범위가 한정된 브라우저 검토',
  'statusSourceAfter': '를 참조합니다. 이 검토는 기록된 로컬 범위만 다루므로 이 페이지는 여전히 candidate로 유지됩니다.',
  'nextEyebrow': '다음 행동',
  'nextTitle': '작은 문제 하나를 가져오세요.',
  'nextBody': '과제 계약을 열고, 되돌릴 수 있는 첫 단계를 선택하고, diff를 보관하세요. 그것이 시작하기에 가장 짧고 유용한 방법입니다.',
  'nextPrimary': '챕터 2 열기',
  'nextSecondary': '그다음 Lab 001 실행',
  'footerTagline': '증거 기반 LLM 플레이북. Codex를 주력 연습 트랙으로 삼습니다.',
  'mobileRouteFixture': '안전한 파일이 필요하세요? 픽스처 열기',
  'visualCaseIntro': '교수 보드와 렌더링된 개념 사례는 하나의 흐름을 따릅니다: 요청 → 경계 → 산출물 → 증거.',
  'visualCaseBoundary': '로컬 렌더링 증거 · 고객 또는 라이브 시스템 주장 없음',
  'footerMeta': 'candidate · 증거 경계 검토 완료 2026-08-13',
  'skillStarterEyebrow': '상황에 따라 선택',
  'skillStarterTitle': '이름이 아직 아무 의미도 없으면 여기서 시작하세요.',
  'skillStarterIntro': '이것은 자동 진단이 아니라 시작 경로입니다. 메서드 하나를 열고, 필요한 입력을 확인하고, 경계가 맞지 않으면 멈추세요.',
  'skillRouteUnclear': '내 과제가 아직 불명확합니다.',
  'skillRouteUnclearResult': '범위가 정해진 목표, 입력, 행동, 수락 기준, 중지 조건을 반환합니다.',
  'skillRouteLearnCodex': 'Codex를 배워야 합니다.',
  'skillRouteLearnCodexResult': 'Codex 학습 레벨, 실험, 증거 점검, 성찰을 반환합니다.',
  'skillRouteLearnOther': '다른 역량을 연습해야 합니다.',
  'skillRouteLearnOtherResult': '기준선, 교정, 변경 사례 전이 시도, 검토 신호를 반환합니다.',
  'skillRouteFailed': '보존된 요청과 답변이 이미 실패했습니다.',
  'skillRouteFailedResult': '증거 기반 진단 하나와 비교 가능한 가장 작은 수정을 반환합니다.',
  'skillRouteVerify': '기존 주장을 확인해야 합니다.',
  'skillRouteVerifyResult': '증거가 증명하는 것, 놓친 것, 다음에 필요한 것을 반환합니다.',
  'mobileRoutesAria': '다음 행동 선택',
  'mobileRouteTask': '버려도 되는 프로젝트가 있으세요? Codex 시작',
  'mobileRoutePractice': '언어, 조사, 다른 능력 연습',
  'mobileRouteIndexes': '전체 프로젝트 색인 살펴보기',
  'mobileAllRoutes': '모든 문제 경로 열기',
  'starterPreview': '전체 프롬프트 미리보기',
  'starterSequenceAria': '전, 프롬프트, 인간 점검, 수정 순서',
  'starterCheckOne': '사실 유지 — 금요일 10시와 “초안 가져오기”가 남아 있습니다.',
  'starterCheckTwo': '행동 유지 — 참석할 수 없는 사람은 회신하도록 요청받습니다.',
  'starterCheckThree': '지어낸 것 없음 — 날짜, 시간대, 장소, 마감, 보낸 사람, 이유, 연락 수단 또는 다른 사실이 나타나지 않습니다.',
  'starterCheckPass': '통과',
  'starterCheckFail': '실패',
  'starterCheckUnsure': '불확실',
  'starterCheckGate': '예시와 비교하기 전에 세 판단을 모두 기록하세요.',
  'starterCheckReady': '세 판단이 모두 기록되었습니다. 이제 예시 답변과 비교할 수 있습니다.',
  'starterCheckRecovery': '실패했거나 불확실한 점검이 기록되었습니다. 구제 프롬프트를 사용하고, 이 기록을 로컬 관찰로 보관하세요.',
  'starterCheckOneAria': '사실 유지 여부 기록',
  'starterCheckTwoAria': '요청된 행동 유지 여부 기록',
  'starterCheckThreeAria': '근거 없는 세부 내용 추가 여부 기록',
  'starterCompare': '수용 가능한 형태 하나와 비교',
  'starterComparisonBoundary': '이 예시 답변은 세 판단이 모두 기록될 때까지 숨겨져 있습니다. 답변을 채점하거나 학습을 증명하지 않습니다.',
  'starterExample': '수용 가능한 형태 하나: “The workshop starts Friday at 10. Please bring your draft. If you cannot attend, please reply.” 표현은 달라질 수 있으며, 이것이 유일한 정답은 아닙니다.',
  'starterRescueCopy': '구제 프롬프트 복사',
  'starterRescueCopied': '구제 프롬프트를 복사했습니다. 첫 번째 실패한 점검만 수정하세요.',
  'starterHelpLabel': '사용한 도움',
  'starterHelpAria': '사용한 도움 기록',
  'starterHelpPrompt': '첫 프롬프트',
  'starterHelpRescue': '구제 프롬프트',
  'starterHelpBoth': '두 프롬프트 모두',
  'starterCorrectionLabel': '점검 후 교정',
  'starterCorrectionAria': '교정 상태 기록',
  'starterCorrectionNotNeeded': '불필요',
  'starterCorrectionCorrected': '교정됨',
  'starterCorrectionNotYet': '아직 안 함',
  'starterRecordNotRecorded': '기록 안 됨',
  'starterReceiptAria': '로컬 첫 성공 점검 기록',
  'starterCopyRecord': '내 로컬 점검 기록 복사',
  'starterRecordCopied': '로컬 점검 기록을 복사했습니다. 상태만 포함하며 답변은 포함하지 않습니다.',
  'starterRecordCopyFailed': '로컬 점검 기록을 복사할 수 없습니다. 텍스트를 직접 선택하세요.',
  'starterRecoveryLink': '복구 인계 열기',
  'starterReceiptLabel': '쉬운 말로 된 기록',
  'starterReceipt': '시도함 · 여기서 점검함 · 도움 사용함 · 교정함 · 증명되지 않음: 학습, 전이, 일반적 글쓰기 능력, 모델 우월성.',
  'routeStatusAll': '전체 22개 챕터를 표시 중입니다.',
  'routeStatusA': 'A · 첫 접촉 챕터 6개를 표시 중입니다.',
  'routeStatusB': 'B · 실제 작업 챕터 7개를 표시 중입니다.',
  'routeStatusC': 'C · 역량 챕터 5개를 표시 중입니다.',
  'routeStatusD': 'D · 팀 연습 챕터 4개를 표시 중입니다.',
  'featuredLab': '추천 랩',
  'lab13Title': '감사 가능한 수직 슬라이스',
  'lab13Body': '로컬 Markdown 변경 하나를 프로토콜과 기준선에서 시작해 체크포인트, diff, 집중 점검, 실패, 전이까지 진행하세요.',
  'lab14Title': '재개 조정',
  'lab14Body': '계속하기 전에 과제 포인터, 대상, 브랜치, 권한, 부작용 상태를 조정하세요.',
  'lab15Title': '증거 전달',
  'lab15Body': '완료 문장을 주장, 범위, 출력, 가장 작은 다음 점검으로 나누세요.',
  'lab16Title': '부작용 경계',
  'lab16Body': '진단을 설치, 게시, 재시작 등 지속적 행동과 분리하세요.',
  'lab17Title': 'Skill 발견 감사',
  'lab17Body': '존재, 발견, 로딩, 동작, 라이선스, 도입을 각각 별도의 주장으로 확인하세요.',
  'lab18Title': '언어 전이',
  'lab18Body': '도움 없이 만든 기준선을 보존하고, 의미를 막는 오류 하나를 교정한 다음, 수업 문장을 재사용하지 않고 변경된 사례를 시험하세요.',
  'learningPathWarning': '학습 경로 데이터를 로드하지 못했습니다. 로컬 폴백을 표시 중입니다. 이 경로에 의존하기 전에 생성된 데이터를 검증하세요.',
  'skillCoachName': 'Codex 코치',
  'skillProtocolName': '과제 프로토콜',
  'skillEvidenceName': '증거 검토',
  'skillSelectorName': 'Skill 선택기',
  'skillWorkflowName': '워크플로 오케스트레이터',
  'skillResearchName': '조사 라우터',
  'skillContextName': '제품 컨텍스트',
  'indexEyebrow': '프로젝트 색인',
  'indexTitle': '각 주장이 어디에 있는지 아세요.',
  'indexIntro': '이것은 리포지토리의 사람이 읽을 수 있는 지도입니다. 각 계층이 무엇을 저장하는지, 어디서 시작하는지, 어떤 출처가 상태를 관리하는지 보여줍니다.',
  'fileMapTitle': '리포지토리 지도',
  'fileMapIntro': '작업과 맞는 계층을 읽으세요. 공개 페이지는 안내서이며, 아래 파일이 진실의 원천입니다.',
  'fileSiteTitle': '공개 쇼케이스',
  'fileSiteBody': 'index.html, styles.css, app.js, 생성된 학습 경로 데이터.',
  'fileChaptersTitle': '핵심 학습 텍스트',
  'fileChaptersBody': '챕터 22개, 현재 산출물 상태: candidate.',
  'fileLabsTitle': '관찰 가능한 연습',
  'fileLabsBody': '랩 18개, 현재 상태: draft, 실행 상태: not_run.',
  'fileSkillsTitle': '재사용 가능한 메서드',
  'fileSkillsBody': '트리거, 경계, 증거 계약을 갖춘 프로젝트 Skill 23개.',
  'fileDocsTitle': '거버넌스와 조사',
  'fileDocsBody': '상태, 출처, 현장 보고서, 업데이트 규칙, 품질 기록.',
  'ledgerTitle': '콘텐츠 상태',
  'ledgerIntro': '현재 상태 출처를 간결하게 읽은 내용입니다. 상태는 야망이 아니라 증거를 설명합니다.',
  'ledgerProject': '프로젝트',
  'ledgerChapters': '챕터 · 22',
  'ledgerLabs': '랩 · 18',
  'ledgerSkills': 'Skill · 25',
  'ledgerResearch': '현장 조사',
  'ledgerResearchNote': '사용자 보고 · 로컬 재현 안 됨',
  'ledgerSource': '현재 상태 출처 열기',
  'localeTitle': '6개 언어 경로',
  'localeIntro': '리포지토리 진입 로케일 6개가 등록되어 있습니다. 6개 경로 토큰 모두 노출됩니다. EN / 中文 UI는 검토되었으며, 나머지 로케일은 마이그레이션 중 명시적 영어 UI 폴백을 사용합니다.',
  'localeEnglish': '사용 가능 · 기본값',
  'localeChinese': '사용 가능 · 현재 토글',
  'localeSpanish': '경로 노출 · UI 폴백',
  'localeGerman': '경로 노출 · UI 폴백',
  'localeJapanese': '경로 노출 · UI 폴백',
  'localeKorean': '경로 노출 · UI 폴백',
  'localeRule': '경로 규칙: 번역된 산출물은 로케일 접미사를 가지며 같은 로케일로 연결됩니다. 경로 토큰은 완료된 번역이나 검토된 UI와 다릅니다.',
  'researchTitle': '경계가 붙어 있는 실제 문제.',
  'researchIntro': '조사 색인은 공개된 Codex 이슈, 자사 안전 지침, 포럼 보고서를 증상, 출처 범위 경계, 안전 점검, 교육 링크로 바꿉니다. 공식 근본 원인이나 로컬 재현을 주장하지 않습니다.',
  'researchBoundary': '출처 범위 지침과 공개 보고서 · 로컬 재현 기록 없음',
  'researchIndexLink': '현장 문제 색인 열기',
  'researchIndexBody': 'Codex, 인터페이스, 인계, 인증, worktree, 검증 증상.',
  'researchForumsLink': '포럼 사례 노트 읽기',
  'researchForumsBody': '샌드박스 네트워크 허용 목록, Windows spawn 실패, 승인, 인코딩, 개인 경로.',
  'researchLiveLink': '현재 현장 사례 3건 검토',
  'researchLiveBody': 'worktree 대상, 숨겨진 증거, 검증 범위. 모두 로컬에서 미검증 상태입니다.',
  'researchSafetyLink': 'AI 협업 안전 경계 읽기',
  'researchSafetyBody': '프롬프트 인젝션, 최소 필요 입력, 행동 권한, 검증. 출처 기반 candidate 조사.',
  'researchReceiptsLink': 'AI 안전 현장 신호 읽기',
  'researchReceiptsBody': '공개 보고서, 주장 분류, 긴 조사 과제용 체크포인트. candidate 조사.',
  'researchFirstTurnLink': '보편적인 첫 턴 작성',
  'researchFirstTurnBody': '여섯 필드, 텍스트 전용 스페인어 또는 조사 카드. 플랫폼 동등성이나 결과 주장이 아닌 candidate 조사.',
  'researchPublicInterestLink': '공익 안전 조사 실행',
  'researchPublicInterestBody': '고정된 가상 사례: 사람, 데이터 경계, 인간 통제, 증거, 중지. candidate / not_run.',
  'problemPublicInterestSafetyTitle': '사람에게 영향을 줄 수 있는 AI 아이디어를 평가해야 합니다.',
  'problemPublicInterestSafetyBody': '결정 하나, 부담을 줄 수 있는 사람들, 필요한 데이터, 인간이 개입할 수 있는 수단, 증거, 그리고 작업을 반드시 중단해야 하는 지점을 명시하세요.',
  'problemPublicInterestSafetyLink': '고정 안전 조사 실행 · candidate · not_run ↗',
  'visualCaseTitle': '방법을 맥락 속에서 보세요.',
  'visualModelLink': '요청에서 증거까지',
  'visualModelBody': '범위, 행동, 점검, 범위가 정해진 인계.',
  'visualSkillLink': '증거 렌즈 네 가지',
  'visualSkillBody': '존재, 정확성, 준비 상태, 학습.',
  'visualFieldLink': '현장 신호 → 안전한 저하',
  'visualFieldBody': '열려 있는 보고서 3건. 로컬 재현이나 공식 근본 원인 확인 없음.',
  'visualCaseLink': '초보 연습 루프',
  'visualCaseBody': '먼저 시도하고, 문제 하나를 고치고, 사례를 바꾼 다음, 범위가 정해진 기록을 보관하세요.',
  'searchLabel': '플레이북 검색',
  'searchPlaceholder': '챕터, 랩, Skill, 현장 사례 검색',
  'searchSubmit': '검색',
  'searchTitle': '범위가 정해진 답을 찾으세요.',
  'searchClear': '지우기',
  'searchNoQuery': '플레이북을 검색할 단어나 문구를 입력하세요.',
  'searchLoading': '로컬 검색 색인을 불러오는 중…',
  'searchNoResults': '“{query}”에 대한 결과가 없습니다. 챕터 제목, Skill 이름, 더 좁은 문구를 시도해 보세요.',
  'searchResultsCount': '{count}건의 결과: “{query}”.',
  'searchIndexUnavailable': '로컬 검색 색인을 로드할 수 없습니다. 연결을 확인한 다음 다시 제출해 재시도하세요.',
  'searchFallback': '영어 원문 표시 · 요청한 번역이 아직 준비되지 않음',
  'searchOpen': 'Reader 열기',
  'searchKindChapter': '챕터',
  'searchKindLab': '랩',
  'searchKindSkill': 'Skill 메서드',
  'searchKindFieldNote': '현장 메모',
  'searchKindProject': '프로젝트 항목',
  'searchKindBook': '책 항목',
  'searchKindDocument': '문서',
  'problemRecoveryTitle': '모델이 잘못된 과제에 답했습니다.',
  'problemRecoveryBody': '요청, 보이는 컨텍스트, 실제 답변, 기대한 결과를 보존하세요. 커뮤니케이션 조건 하나를 바꾼 다음, 안전한 비교를 실행하세요.',
  'problemRecoveryLink': '복구 인계 열기 · candidate · not_run ↗',
  'repositoryStripAria': '정식 소스 디렉터리와 현재 경계',
  'repositoryStripTitle': '이 리포지토리가 포함하는 것',
  'repositoryStripIntro': '공개 Reader는 site/에서 렌더링됩니다. 아래의 정식 학습·유지보수 소스는 현재 증거 경계를 계속 보이게 유지합니다.',
  'repositoryChapters': '챕터 22개 · candidate',
  'repositoryLabs': '랩 18개 · 유지보수자 참고 2건 · 학습자 실행 0건',
  'repositorySkills': '재사용 가능한 Skill 23개 · candidate',
  'repositoryDocs': '거버넌스와 현장 조사 · candidate, 보고서는 로컬에서 재현되지 않음',
  'skillCardIndex': '03 / Skill 연습',
  'skillCardScope': '가상 계획 · 도구 권한 없음',
  'skillCardTitle': '도움을 요청하기 전에 작은 계획 능력 하나를 연습하세요.',
  'skillCardIntro': '짧은 가상 공원 방문 계획을 직접 만드세요. 모델은 기다렸다가 작은 힌트 하나만 주고, 변경된 제약 하나 아래에서 같은 능력을 시험해야 합니다.',
  'skillCardStepOne': '카드를 아무 텍스트 채팅에 복사하세요. 가상 상황을 담고 있으며 계정, 파일, 도구, 개인 정보가 필요 없습니다.',
  'skillCardStepTwo': '4분 안에 첫 계획을 직접 작성하세요. 먼저 모델 계획이나 다듬어진 대안을 요청하지 마세요.',
  'skillCardStepThree': '짧은 힌트 하나를 받아들이고, 자신의 계획을 교정한 다음, 도움 없이 변경된 시간 제약을 시도하세요.',
  'skillCardLink': '능력 연습 경계 읽기',
  'skillCardBoundary': 'candidate 연습일 뿐입니다. 짧은 가상 계획은 계획 능력, 판단력, 전이, 기억 유지, 안전, 독립 수행을 증명할 수 없습니다.',
  'skillPromptText': '제가 작은 계획 세우는 연습을 하게 도와주세요. 먼저 계획을 만들지 마세요.\n\n연습 과제: 성인 한 명이 도시 공원을 45분 동안 방문하는 가상 계획을 세우세요. 물병 하나, 날씨 확인, 귀가 시간 알림 하나를 포함하세요. 이것은 실제 예약, 여행 결정, 날씨 예보가 아닙니다.\n\n제가 작성하기 전에 이 고정 점검 항목을 보여주세요. 3–5단계, 세 가지 제약이 모두 포함될 것, 근거 없는 지역 사실이 없을 것, 한 사람이 그 계획을 따라 실행할 수 있을 것. 계획을 작성할 시간을 4분 주세요. 제가 응답하기 전에 모델 계획을 보여주거나, 확장하거나, 평가하지 마세요.\n\n제 첫 시도 후에는 중요한 누락 하나만 지적하세요. 질문 하나를 하거나 12단어 이하의 힌트를 하나 주고, 제 교정을 기다리세요. 두 시도를 모두 보존하세요. 그런 다음 방문 시간을 45분에서 20분으로만 바꾸고, 같은 점검 항목으로 도움 없이 새 계획 하나를 요청하세요.\n\n마지막에 정확히 상태 하나만 제시하세요. practised, demonstrated_on_this_task, transferred_to_time_limit_variation 또는 not_run. 한 번의 세션이 계획 능력, 판단력, 안전, 독립 수행을 입증하지는 않습니다.',
  'promptCardShow': '프롬프트 표시',
  'skillPromptCardName': '프롬프트 카드 편집기',
  'skillPromptCard': '승인된 프롬프트 아이디어 하나를 출처를 고려한 교육 카드로 만드세요.',
  'skillAdversarialName': '적대적 프로젝트 검토',
  'skillAdversarial': '게시나 릴리스 결정 전에 중대한 약점을 순위화하세요.',
  'skillEscalationName': '요청 상향',
  'skillEscalation': '작성, 조사, 실행 전에 가장 작은 안전한 경로를 선택하세요.',
  'skillComparisonName': 'LLM 비교 프로토콜',
  'skillComparison': '리더보드를 지어내지 않고 공정한 두 후보 비교를 계획하세요.',
  'skillPracticeTargetName': '연습 목표',
  'skillPracticeTarget': '넓은 학습 바람을 관찰 가능한 첫 시도 하나로 만드세요.',
  'skillFactWatchName': '플랫폼 사실 관찰',
  'skillFactWatch': '명명된 단계가 독자를 오도하기 전에 변하는 제품 주장을 지도화하세요.',
  'skillRouteEscalation': '어떤 종류의 도움이 필요한지 아직 모르겠습니다.',
  'skillRouteEscalationResult': '작성, 조사, 실행 전에 가장 작은 안전한 경로를 선택합니다.',
  'promptDeckEyebrow': '선택 프롬프트 카드 · 5분',
  'promptDeckTitle': '작은 대화 하나로 시작하세요.',
  'promptDeckIntro': '원본 텍스트 전용 카드 하나를 선택하세요. 언어 카드와 계획 카드는 편집이 필요 없고, 조사 카드에는 대괄호 두 개가 있습니다. 응답을 직접 점검하고, 주장을 작게 유지하세요. 한 번의 시도는 유창함, 조사, 완성된 답변이 아닙니다.',
  'promptContractKicker': '보내기 전에',
  'promptContractTitle': '여섯 부분을 보이게 만드세요.',
  'promptContractLink': '근거 읽기',
  'promptContractGridAria': '첫 LLM 요청에서 점검할 여섯 필드',
  'promptContractOutcomeLabel': '결과',
  'promptContractOutcomeBody': '작고 관찰 가능한 결과 하나.',
  'promptContractContextLabel': '시작 컨텍스트',
  'promptContractContextBody': '당신이 알고 있거나 제공하는 것.',
  'promptContractResponseLabel': '요청한 응답',
  'promptContractResponseBody': '형태, 길이, 순서.',
  'promptContractLimitsLabel': '제한',
  'promptContractLimitsBody': '배제되는 데이터와 행동.',
  'promptContractCheckLabel': '점검',
  'promptContractCheckBody': '당신이 직접 검사할 것.',
  'promptContractStopLabel': '중지와 기록',
  'promptContractStopBody': '언제 멈추고 무엇을 보관할지.',
  'promptCardScope': '텍스트 전용 · 도구 권한 없음',
  'promptCardCopy': '프롬프트 복사',
  'promptCardCopied': '프롬프트를 복사했습니다. 세 단계를 따른 다음, 답변을 직접 점검하세요.',
  'promptCardCopyFailed': '프롬프트를 복사할 수 없습니다. 텍스트를 직접 선택하세요.',
  'spanishCardIndex': '01 / 언어 연습',
  'spanishCardTitle': '짧은 스페인어 학습 모임 시간 확인을 타이핑으로 완료하세요.',
  'spanishCardIntro': '이 텍스트 전용 카드는 가상의 학습 정보를 사용하고, 당신의 타이핑 시도를 기다리며, 도움을 의미를 막는 오류 하나로 제한합니다.',
  'spanishCardStepOne': '카드를 적힌 그대로 복사하세요. 이미 가상의 타이핑 스페인어 학습 모임 시간 확인이 설정되어 있습니다.',
  'spanishCardStepTwo': '아무 텍스트 채팅에 붙여넣으세요. 실제 이름, 학교, 일정표, 계정, 결제 정보를 추가하지 마세요.',
  'spanishCardStepThree': '첫 답변을 직접 타이핑하세요. 서툰 시도가 바로 요점입니다. 먼저 답을 요청하지 마세요.',
  'spanishCardLink': '연습 경계 읽기',
  'spanishCardBoundary': 'candidate 텍스트 연습일 뿐입니다. 타이핑 세션 한 번으로 구어 대화, 발음, 듣기, 유창함, 정확성, 기억 유지, 독립 수행을 보여줄 수 없습니다.',
  'spanishPromptText': '네 번의 학습자 턴으로 정확히 구성된 4분짜리 스페인어 학습 모임 시간 확인 타이핑 연습을 진행하세요. 당신은 가상의 동급생이며 먼저 타이핑으로 질문합니다. 짧은 현재형 질문만 사용하세요. 각 질문 후에 제가 답변 하나를 타이핑합니다.\n\n가상 학습 카드: Ana, 학습 모임, 화요일 또는 목요일, 6:00 또는 6:30, 도서관 또는 온라인, 질문 하나 가져오기. 저는 카드를 사용할 수 있고 단어를 최대 세 개까지만 찾아볼 수 있습니다. 실제 이름, 학교, 일정표, 계정, 주소, 연락처, 결제 정보를 요청하거나 받아들이지 마세요.\n\n첫 턴 전에 이 고정 루브릭을 보여주세요. 학습자 턴 4번, 목적과 학습 모임이 전달될 것, 요일과 시간이 명확해질 것, 장소 또는 온라인 선택지가 전달될 것, 계속할 수 있을 만큼 스페인어가 이해 가능할 것. 제가 답하기 전에 가르치거나, 번역하거나, 모델 답변을 보여주지 마세요. 제 첫 시도를 보존하고 찾아본 단어를 기록하세요. 의미를 막는 첫 번째 오류만 교정하세요. 오류 유형을 말하고, 부분 단서를 주고, 그래도 계속할 수 없을 때만 예시 조각 하나를 보여주세요. 제가 고치도록 요청하세요. 두 시도를 모두 보존하고, 성공한 교류 한 번을 유창함, 구어 대화, 듣기/발음 증거라고 부르지 마세요.',
  'researchCardIndex': '02 / 조사 준비',
  'researchCardTitle': '판결이 아니라 출처 점검을 준비하세요.',
  'researchCardIntro': '좁은 질문 하나와 당신이 제공한 자료를 주장, 공백, 다음 질문으로 구성된 작은 원장으로 만드세요.',
  'researchCardStepOne': '카드를 복사한 다음 대괄호 두 개만 바꾸세요.',
  'researchCardStepTwo': '공유해도 되는 자료만 제공하세요. 개인적, 사적인, 고위험 자료는 넣지 마세요.',
  'researchCardStepThree': '그 표는 준비 자료로 취급하세요. 주장에 의존하기 전에 출처를 직접 열고 대조하세요.',
  'researchCardLink': '조사 경계 읽기',
  'researchCardBoundary': '출처가 존재하거나, 최신이거나, 주장을 뒷받침한다는 것을 증명할 수 없습니다. 생성된 표는 그 자체로 증거가 아닙니다.',
  'researchPromptText': '연구 점검을 준비할 시간은 5분이며, 최종 답변을 원하는 것이 아닙니다.\n\n질문: [좁은 질문 하나].\n제가 제공한 자료: [URL, 제목, 발췌문, 또는 "없음"].\n\n먼저 질문을 다시 말하고 어떤 증거가 필요한지 밝히세요. 그런 다음 가능한 주장, 제공된 출처 또는 "누락", 확인이 필요한 것 세 열로 된 표를 만드세요. 인용을 지어내지 말고, 접근할 수 없는 출처를 열었다고 말하지 말고, 권고를 하지 마세요. 사실, 보고, 추론을 구분하세요. 자료가 없거나, 모순되거나, 개인적이거나, 고위험인 경우 멈추고 가장 작은 안전한 다음 단계를 알려주세요.\n\n마지막에 이렇게 끝내세요. 실제로 제공된 출처, 미지의 항목, 계속하기 전에 제가 답해야 할 질문 하나.',
  'heroScope': '전이 가능한 방법은 하나이며 현재의 대표 실습 트랙은 Codex입니다. 이름을 붙인 각 플랫폼은 최신 출처와 재현 가능한 근거가 있어야 수업이 됩니다.',
  'heroRouteNoSetupTitle': '프로젝트나 코딩 경험이 없으세요? 설정 없는 점검 하나로 시작하세요.',
  'heroRouteNoSetupBody': '아무 채팅 모델과 가상 메시지를 사용하세요. 파일, 도구, 계정 연결, 개인 데이터가 필요 없습니다.',
  'mobileRouteNoSetup': '프로젝트가 없으세요? 설정 없는 점검부터 시작',
  'skillInterruptionName': '중단 체크포인트',
  'skillInterruption': '재시도, 모델 전환, 새 과제 전에 아는 것을 보존하세요.',
  'skillHandoffName': '교대 인계',
  'skillHandoff': '재사용 가능한 규칙과 오늘 제공된 작업 항목을 분리하세요.',
};

copy.de = {
  'skipToContent': 'Zum Hauptinhalt springen',
  'wordmarkAria': 'Prysai LLM Playbook – Startseite',
  'languageToggleAria': 'Oberflächensprache wählen',
  'menuAria': 'Navigation öffnen',
  'navAria': 'Hauptnavigation',
  'heroIndexAria': 'Seitenindex',
  'pathAria': 'Lernpfad mit sieben Stufen',
  'routesAria': 'Kapitelrouten filtern',
  'menu': 'Menü',
  'menuClose': 'Schließen',
  'navStart': 'Hier starten',
  'navFirst30': 'Erste 15 Minuten',
  'navPath': 'Lernpfad',
  'navIndex': 'Projektindex',
  'navRoutes': 'Leserouten',
  'navLabs': 'Labs',
  'navSkills': 'Skills',
  'navUpdates': 'Update-Karte',
  'localeBannerFallback': 'Die Route {requested} ist ausgewählt, aber einige Oberflächentexte oder Kurseinheiten befinden sich noch in der Migration. Fehlt eine Kurseinheit, behält Reader diese Sprache bei und markiert die Einheit als nicht verfügbar; er wechselt nicht stillschweigend auf englischen Kurstext.',
  'localeManifestError': 'Sprachrouting ist nicht verfügbar, weil das generierte Manifest nicht geladen werden konnte. Englisch bleibt verfügbar; erstelle das Manifest neu, bevor du dich auf andere Routen verlässt.',
  'localeBannerReady': 'Du liest auf {language}.',
  'localeMenuAria': 'Oberflächensprachen',
  'languageNameEnglish': 'Englisch',
  'languageNameChinese': 'Chinesisch (vereinfacht)',
  'languageNameSpanish': 'Spanisch',
  'languageNameJapanese': 'Japanisch',
  'languageNameKorean': 'Koreanisch',
  'languageNameGerman': 'Deutsch',
  'localeOptionFallback': 'Englische UI als Fallback',
  'heroIndex': 'LLM / PRAXISSYSTEM',
  'heroEyebrow': 'Klein anfangen · eine Aufgabe, eine sichtbare Prüfung',
  'heroTitle': 'Mache aus einer ersten LLM-Aufgabe echte Arbeit.',
  'heroLede': 'Lerne eine praktische Methode für die Arbeit mit Sprachmodellen und übe sie im Codex-Praxis-Track gründlich ein: Ergebnis definieren, Kontext und Befugnisse kontrollieren, die Arbeit prüfen, aus Fehlern lernen und Belege sichern.',
  'heroPrimary': 'Starte mit einem LLM-Check ohne Einrichtung',
  'heroSecondary': 'Starte den Codex-Praxis-Track',
  'heroRouteAria': 'Wähle eine erste Route passend zu deinem Ausgangspunkt',
  'heroRouteKicker': 'Wähle nach dem, was du heute hast',
  'heroRouteGuidedTitle': 'Du hast ein Wegwerfprojekt und willst Codex nutzen? Folge dem geführten Pfad.',
  'heroRouteGuidedBody': 'Beginne mit Kapitel 1. Die erste lokale Änderung folgt, sobald ihr Umfang und ihre Beleggrenze sichtbar sind.',
  'heroRouteFixtureTitle': 'Du brauchst eine sichere Datei für den Codex-Pfad? Öffne die Offline-Fixture.',
  'heroRouteFixtureBody': 'Sie liefert ab Kapitel 2 ein Ziel und eine Prüfung. Sie ist ein Fallback, kein Ersatz für den geführten Pfad.',
  'heroRouteBoundary': 'Alle drei Einträge sind candidate: Die Struktur ist geprüft, aber die Lernergebnisse der Leser sind noch nicht gemessen.',
  'heroProofAria': 'Optionale Aufwärmkarte mit geprüftem Beispiel',
  'heroProofKicker': 'OPTIONALES AUFWÄRMEN / PRÜFBARES BEISPIEL',
  'heroProofStatus': 'candidate · keine Teilnehmerdurchführung erfasst',
  'heroProofTitle': 'Sieh, was ein geprüftes Ergebnis enthält.',
  'heroProofSourceLabel': 'AUSGANGSNACHRICHT',
  'heroProofSource': '“Hi, the workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come.”',
  'heroProofPreserveLabel': 'FAKTEN BEHALTEN',
  'heroProofPreserve': 'Behalte Freitag um 10 Uhr, den Entwurf und die Bitte um Antwort. Füge kein Datum, keinen Ort, keinen Grund und keine Kontaktmöglichkeit hinzu.',
  'heroProofChecksLabel': 'DREI MENSCHLICHE PRÜFUNGEN',
  'heroProofCheckOne': 'Freitag um 10 Uhr und der Entwurf bleiben erhalten.',
  'heroProofCheckTwo': 'Wer nicht teilnehmen kann, wird um Antwort gebeten.',
  'heroProofCheckThree': 'Es taucht kein unbelegtes Detail auf.',
  'heroProofReceiptLabel': 'BEGRENZTE QUITTUNG',
  'heroProofReceipt': 'Ein geprüfter Versuch kann erfasst werden. Er beweist weder Lernen noch Transfer noch Modellleistung.',
  'heroProofLink': 'Den optionalen 15-Minuten-Check öffnen',
  'heroFooter': 'Problem → Protokoll → Handlung → Beleg',
  'startEyebrow': 'Hier starten · nach Problem wählen',
  'startTitle': 'Was musst du tun?',
  'startIntro': 'Für eine echte lokale Codex-Aufgabe beginne mit einem Kandidatenpfad: Grenzkarte, Grenz-Lab, begrenzte Aufgabe, dann ein umkehrbares Lab. Wähle eine andere Route nur, wenn dieser Pfad nicht passt.',
  'problemStartTitle': 'Ich möchte einen sicheren Codex-Pfad.',
  'problemStartBody': 'Beginne mit der Grenzkarte, nutze dann Lab 011, um sie zu beschriften, bevor du eine einmalige README-Änderung mit Diff, fokussierter Prüfung und Liste des Ungeprüften wählst.',
  'problemStartLink': 'Kapitel 1 → Lab 011 → Kapitel 2 → Lab 001 starten · candidate / draft ↗',
  'problemWrongFileTitle': 'Datei oder Ergebnis sind unsicher.',
  'problemWrongFileBody': 'Halte die nächste Änderung an. Vergleiche den gewünschten Umfang, den git diff, die fokussierte Prüfung und die verbleibenden Unbekannten.',
  'problemWrongFileLink': 'Kapitel 9 öffnen · candidate ↗',
  'problemSkillTitle': 'Ich muss ein Skill auswählen oder entwerfen.',
  'problemSkillBody': 'Beginne mit Trigger, Inputs, Grenzen und Belegvertrag; erst dann entscheide, ob ein Skill seinen Platz verdient.',
  'problemSkillLink': 'Kapitel 11 öffnen · candidate ↗',
  'problemUpdateTitle': 'Ich muss sicher veröffentlichen oder aktualisieren.',
  'problemUpdateBody': 'Finde die kanonische Datei, füge den Quellenbeleg hinzu, führe das passende Gate aus und halte unbelegte Behauptungen aus dem Release heraus.',
  'problemUpdateLink': 'Kapitel 22 öffnen · candidate ↗',
  'problemIntakeTitle': 'Ich habe ein breites Ziel und weiß nicht, womit ich zuerst üben soll.',
  'problemIntakeBody': 'Triff immer nur eine Entscheidung. Wähle eine bestehende Route, einen prüfbaren Versuch, erlaubte Hilfe und ein kleineres Fallback.',
  'problemIntakeLink': 'Erstübungs-Einstieg öffnen · candidate · not_run ↗',
  'problemLanguageTitle': 'Ich möchte eine Sprachfertigkeit üben.',
  'problemLanguageBody': 'Definiere eine beobachtbare Leistung, versuche sie vor jeder Anleitung, korrigiere einen bedeutungsblockierenden Fehler und teste dann einen veränderten Fall.',
  'problemLanguageLink': 'Sprachroute öffnen · candidate · not_run ↗',
  'problemGeneralSkillTitle': 'Ich möchte eine andere echte Fertigkeit üben.',
  'problemGeneralSkillBody': 'Verwandle eine Interviewantwort, Erklärung oder Präsentation in eine zeitlich begrenzte Darbietung und teste sie unter einer veränderten Bedingung erneut.',
  'problemGeneralSkillLink': 'Route für allgemeine Fertigkeiten öffnen · candidate · not_run ↗',
  'problemResearchTitle': 'Ich muss eine begrenzte Frage recherchieren.',
  'problemResearchBody': 'Verknüpfe die Frage mit einer Entscheidung, weise Quellenverantwortliche zu, führe ein Behauptungsregister, suche nach Widersprüchen und stoppe bewusst.',
  'problemResearchLink': 'Recherche-Route öffnen · candidate · not_run ↗',
  'first30Eyebrow': 'Optionaler 15-Minuten-Warm-up',
  'first30Title': 'Beurteile eine Antwort. Ohne Einrichtung.',
  'first30Intro': 'Text, Aufgabe und Prüfungen sind bereits ausgefüllt. Nutze ein beliebiges Chat-Modell; du brauchst keine Dateien, kein Terminal, kein Git, keine Kontoverbindung und kein Fachvokabular. Dieses Warm-up trainiert eine Prüfgewohnheit; für eine echte lokale Aufgabe starte oben den Codex-Pfad.',
  'stepOneTitle': 'Wähle eine umkehrbare Änderung.',
  'stepOneBody': 'Nutze eine Sandbox-Datei oder eine kleine Dokumentationsänderung. Beginne nicht mit Zugangsdaten, Produktion oder einem destruktiven Befehl.',
  'stepTwoTitle': 'Schreibe den Aufgabenvertrag.',
  'stepTwoBody': 'Benenne Ziel, Kontext, erlaubte Aktionen, Abnahmekriterien, Beleg und Abbruchbedingung.',
  'stepThreeTitle': 'Lass Codex zuerst prüfen.',
  'stepThreeBody': 'Bitte um die relevanten Dateien und den aktuellen Stand, bevor du eine Änderung zulässt. Halte den Umfang sichtbar.',
  'stepFourTitle': 'Prüfe, was sich geändert hat.',
  'stepFourBody': 'Sieh dir den Diff an, führe die kleinste passende Prüfung aus und dokumentiere, was nicht getestet wurde.',
  'checkCardLabel': 'Ein nützlicher Aufgabenvertrag',
  'fieldGoalLabel': 'Ziel',
  'fieldGoal': 'Eine benannte Änderung vornehmen.',
  'fieldContextLabel': 'Kontext',
  'fieldContext': 'Nur die für diese Aufgabe benötigten Dateien.',
  'fieldInputsLabel': 'Inputs',
  'fieldInputs': 'Pfade, aktuelles Verhalten, Einschränkungen.',
  'fieldAllowedLabel': 'Erlaubte Aktionen',
  'fieldAllowed': 'Lesen und Bearbeiten; vor externen Wirkungen pausieren.',
  'fieldAcceptanceLabel': 'Abnahme',
  'fieldAcceptance': 'Ein konkreter Diff und ein Prüfergebnis.',
  'fieldEvidenceLabel': 'Beleg',
  'fieldEvidence': 'Diff, Befehl, Ausgabe und Grenzen.',
  'fieldStopLabel': 'Stopp, wenn',
  'fieldStop': 'Umfang, Befugnis oder Beleg fehlen.',
  'contractHighlight': 'Die sicherste erste Aufgabe ist klein, umkehrbar und leicht zu prüfen.',
  'openChapterTwo': 'Kapitel 2 öffnen',
  'starterEyebrow': 'Vorher → Prompt → Prüfung → Reparatur',
  'starterTitle': 'Mache eine Nachricht klarer, ohne ihre Fakten zu verändern.',
  'starterIntro': 'Lies das Original einmal, kopiere den ausgefüllten Prompt und prüfe die Antwort dann selbst. Zielzeit: 15 Minuten; die tatsächliche Bearbeitungszeit von Anfängern wurde nicht gemessen.',
  'starterCopy': 'Ersten Prompt kopieren',
  'starterCopied': 'Erster Prompt kopiert. Prüfe die Antwort gegen alle drei Punkte.',
  'starterCopyFailed': 'Kopieren fehlgeschlagen. Wähle den Prompttext manuell aus.',
  'starterBoundary': 'Bereit. Das Abschließen dieser Übung erfasst einen geprüften Versuch; es beweist weder Lernen noch allgemeine Fähigkeit.',
  'starterProgressionAria': 'Nach dem optionalen Warm-up fortfahren',
  'starterDeepen': 'Eine andere Anfängerübung wählen',
  'starterCodexPath': 'Starte den Codex-Pfad: Kapitel 1',
  'starterBoundaryLab': 'Grenze beschriften: Lab 011 · draft / not_run',
  'starterBoundedTask': 'Wähle eine begrenzte lokale Aufgabe: Kapitel 2',
  'starterPractice': 'Führe Lab 001 aus: mit Dateien und Git arbeiten · draft / not_run',
  'starterEvidence': 'Lerne, wie du dich von einer schlechten Antwort erholst',
  'protocolEyebrow': 'Der Arbeitsrahmen',
  'protocolTitle': 'Jede ernsthafte Aufgabe braucht eine Grenze.',
  'protocolIntro': 'Dieser Rahmen ist die gemeinsame Sprache zwischen Person, Modell, Werkzeug und Agent. Nutze ihn, bevor du Berechtigungen oder Skills hinzufügst.',
  'protocolLink': 'Das Aufgabenprotokoll lesen',
  'protocolNote': 'Wenn ein fehlender Input Umfang, Risiko oder Abnahmetest verändert, pausiere und frage nach. Betrifft es nur ein risikoarmes Lesen, prüfe zuerst und dokumentiere die Annahme.',
  'protocolRuleOne': 'Definieren',
  'protocolRuleTwo': 'Handeln',
  'protocolRuleThree': 'Verifizieren',
  'protocolRuleFour': 'Übergeben',
  'pathEyebrow': 'Lernpfad',
  'pathTitle': 'Sieben Stufen. Ein ausführbarer Vertrag.',
  'pathIntro': 'Wähle eine Stufe und sieh genau, was du lesen, tun, nutzen, einreichen und nicht behaupten sollst. Eine Stufe ist keine Leseanzahl.',
  'currentLevel': 'Aktuelle Stufe',
  'nextStep': 'Nächster Schritt',
  'requiredChapters': 'Erforderliche Kapitel',
  'requiredLabs': 'Erforderliches Lab',
  'supportingSkills': 'Unterstützende Skills',
  'evaluationFixtures': 'Evaluations-Fixtures',
  'evidenceGate': 'Beleg-Gate',
  'graduationGate': 'Weiter, wenn',
  'blockedWhen': 'Stopp, wenn',
  'fourEvidence': 'Vier Belegarten',
  'evidenceExplain': 'Erklären',
  'evidenceOperate': 'Bedienen',
  'evidenceJudge': 'Beurteilen',
  'evidenceReview': 'Überprüfen',
  'positive': 'positiv',
  'boundary': 'Grenze',
  'failure': 'Fehler',
  'transfer': 'Transfer',
  'statusCandidate': 'Struktur und Basisprüfungen bestehen; frische Belege sind noch nötig.',
  'labFirstSeen': 'Eingeführt',
  'labReused': 'Wiederverwendet aus',
  'labCapability': 'Fähigkeit',
  'labArtifact': 'Artefakt',
  'labAcceptance': 'Abnahme',
  'levelL0Name': 'Beobachter',
  'levelL0Short': 'Wahrnehmen, was passiert ist',
  'levelL1Name': 'Sicherer Nutzer',
  'levelL1Short': 'Eine risikoarme Aufgabe abschließen',
  'levelL2Name': 'Aufgabendesigner',
  'levelL2Short': 'Ein Aufgabenprotokoll schreiben',
  'levelL3Name': 'Workflow-Designer',
  'levelL3Short': 'Von der Definition zur Auslieferung kommen',
  'levelL4Name': 'Fähigkeitsentwickler',
  'levelL4Short': 'Die kleinste sinnvolle Auswahl treffen',
  'levelL5Name': 'Belegprüfer',
  'levelL5Short': 'Abschlussbehauptungen prüfen',
  'levelL6Name': 'Team-Coach',
  'levelL6Short': 'Methode in ein System verwandeln',
  'chaptersEyebrow': 'Die Leserouten',
  'chaptersTitle': '22 Kapitel. Vier Einstiege.',
  'chaptersIntro': 'Lies der Reihe nach, um das Modell aufzubauen. Springe über eine Route, wenn dich eine echte Aufgabe blockiert. Jede Route führt zurück zu Übung und Beleg.',
  'filterAll': 'Alle Kapitel',
  'filterA': 'A · Erster Kontakt',
  'filterB': 'B · Echte Arbeit',
  'filterC': 'C · Fähigkeit',
  'filterD': 'D · Team-Praxis',
  'routeATitle': 'Erster Kontakt mit Codex',
  'routeADesc': '01—06 · eine erste sichere Aufgabe abschließen',
  'routeBTitle': 'Codex für echte Arbeit',
  'routeBDesc': '07—13 · einen verifizierbaren Workflow entwerfen',
  'routeCTitle': 'Fähigkeit und Agent-Zusammenarbeit',
  'routeCDesc': '14—18 · die kleinste sinnvolle Kombination wählen',
  'routeDTitle': 'Von Flüssigkeit zur Team-Praxis',
  'routeDDesc': '19—22 · persönliche Methode in Teamfähigkeit verwandeln',
  'candidateStatus': 'candidate',
  'chapter01': 'GPT verstehen, bevor du Codex nutzt',
  'chapter02': 'Eine sichere, verifizierbare Aufgabe abschließen',
  'chapter03': 'Einen Wunsch in ein Aufgabenprotokoll verwandeln',
  'chapter04': 'Kontext, Berechtigungen und Agent-Grenzen',
  'chapter05': 'Die richtige Codex-Oberfläche wählen',
  'chapter06': 'Modellwahl ist keine Modellverehrung',
  'chapter07': 'Wie Skills, Plugins, MCP und Werkzeuge die Arbeit aufteilen',
  'chapter08': 'Der vollständige Lebenszyklus von der Definition bis zur Auslieferung',
  'chapter09': 'Verifikation, Zweifel und Recovery',
  'chapter10': 'Planung und vertikale Slices',
  'chapter11': 'Ein Skill entwerfen, das seinen Platz verdient',
  'chapter12': 'Die Agent-Schleife, Zustand und Abbruchbedingungen',
  'chapter13': 'Aktionsgrenzen über Dateien, Terminals, Browser und GitHub hinweg',
  'chapter14': 'Ein externes Skill entdecken, installieren und auditieren',
  'chapter15': 'Recherche: von der Frage zu auditierbarem Wissen',
  'chapter16': 'Engineering: von der Idee zu zuverlässiger Software',
  'chapter17': 'Marketing: vom Produktkontext zu Experimenten',
  'chapter18': 'Content, Design, Daten und Automatisierung',
  'chapter19': 'Modelle und Workflows bewerten',
  'chapter20': 'Ein persönliches Codex-Arbeitssystem aufbauen',
  'chapter21': 'Ein Team-Fähigkeitssystem aufbauen',
  'chapter22': 'Das System aktuell und wiederherstellbar halten',
  'labsEyebrow': 'Das Lab',
  'labsTitle': 'Mache das Prinzip beobachtbar.',
  'labsIntro': 'Labs sind risikoarme, reproduzierbare Aufgaben. Jedes benennt Setup, Beleg, eine Fehlervariante, eine geheime Grenze und eine Reflexion.',
  'draftStatus': 'draft',
  'startingLab': 'Einstiegslab',
  'lab01Title': 'Erste sichere Aufgabe',
  'lab01Body': 'Bitte Codex in einem Sandbox-Projekt, vor dem Bearbeiten zu prüfen. Verwandle “done” in einen prüfbaren Diff.',
  'lab02Title': 'Aufgabenprotokoll',
  'lab02Body': 'Zerlege eine vage Anfrage in Ziel, Inputs, Einschränkungen, Abnahme und Fehlerbehandlung.',
  'lab03Title': 'Belegprüfung',
  'lab03Body': 'Finde ein Ergebnis, das vollständig wirkt, aber keinen Beleg für seine Behauptung hat.',
  'lab04Title': 'Skill-Auswahl',
  'lab04Body': 'Begründe die Auswahl und weigere dich, die Verzeichnisgröße als Maß für die Eignung zu nutzen.',
  'lab05Title': 'Ein Skill entwerfen',
  'lab05Body': 'Verwandle eine stabile Methode in eine Fähigkeit mit Grenzen, Belegen und Fehlerfällen.',
  'lab06Title': 'Agent-Abbruchbedingungen',
  'lab06Body': 'Definiere Stopppunkte für Erfolg, fehlenden Input, behebbaren Fehler und Berechtigungskonflikt.',
  'lab07Title': 'Aktionsgrenzen',
  'lab07Body': 'Vergleiche die Belege, die für Lesen, Bearbeiten, Ausführen, Committen, Pushen und Veröffentlichen nötig sind.',
  'lab08Title': 'Recherchefrage',
  'lab08Body': 'Verwandle ein breites Thema in eine Frage, einen Quellenplan und eine Mindest-Belegtabelle.',
  'lab09Title': 'Engineering-Lebenszyklus',
  'lab09Body': 'Vergleiche direkte Implementierung mit einem vollständigen Lebenszyklus und dokumentiere die Nacharbeitsbelege.',
  'lab10Title': 'Gemeinsamer Produktkontext',
  'lab10Body': 'Versioniere ein gemeinsames Produktverständnis und trenne Fakten von Hypothesen.',
  'lab11Title': 'GPT- und Codex-Grenzen',
  'lab11Body': 'Nutze statische Aufgabenkarten, um Generierung, Ausführung, Verifikation und externe Wirkungen zu trennen.',
  'lab12Title': 'Team-Fähigkeitsmigration',
  'lab12Body': 'Erstelle einen Vertrag für Version, Verantwortliche, Berechtigungen, unabhängige Reproduktion und Rollback.',
  'labsIndexLink': 'Die Lab-Regeln und alle 18 Einträge öffnen',
  'skillsEyebrow': 'Fähigkeitsebene',
  'skillsTitle': 'Dreiundzwanzig Skills. Klare Aufgaben.',
  'skillsIntro': 'Ein Skill ist eine Methode mit Trigger, Input-Prüfung, Grenzen, Abbruchbedingungen, einem Ausgabevertrag und einer Möglichkeit, sie zu verifizieren.',
  'skillCoach': 'Wähle einen Lernpfad und eine Übungsgrenze.',
  'skillProtocol': 'Verwandle eine vage Anfrage in einen ausführbaren Vertrag.',
  'skillEvidence': 'Zerlege Abschlussbehauptungen in prüfbare Belege.',
  'skillSelector': 'Wähle einen minimal tragfähigen Fähigkeitssatz.',
  'skillWorkflow': 'Verwalte Phasen, Checkpoints und Übergaben.',
  'skillResearch': 'Führe eine Frage zu auditierbarem Wissen zusammen.',
  'skillContext': 'Halte stabile Prinzipien von sich ändernden Fakten getrennt.',
  'skillLearningName': 'Learning Coach',
  'skillLearning': 'Übe mit Abruf, Korrektur, verzögerter Wiederholung und Transfer.',
  'skillSourceName': 'Source Investigator',
  'skillSource': 'Verwandle breite Suchen in begrenzte, quellenbasierte Untersuchungen.',
  'skillSignalName': 'Field Signal Curator',
  'skillSignal': 'Verwandle öffentliche Berichte in begrenzte Bedarfsbelege.',
  'skillAdapterName': 'Platform Adapter Review',
  'skillAdapter': 'Lehne Plattform-Lektionen ab, denen ein belegtes, ausführbares Delta fehlt.',
  'skillTriageName': 'Communication Failure Triage',
  'skillTriage': 'Diagnostiziere eine fehlgeschlagene Interaktion und teste die kleinste Reparatur erneut.',
  'skillBriefName': 'Dialogue Brief',
  'skillBrief': 'Verwandle eine unerprobte, risikoarme Anfrage in eine kopierfertige erste Nachricht.',
  'skillFirstTurnCheckName': 'First-Turn Check',
  'skillFirstTurnCheck': 'Prüfe eine noch nicht gesendete, risikoarme Anfrage auf sichtbare Grenzen.',
  'skillRouteBrief': 'Ich muss eine klare erste Nachricht schreiben.',
  'skillRouteBriefResult': 'Liefert einen risikoarmen, kopierfertigen ersten Turn mit Prüfung und Stopp-Grenze.',
  'skillRouteFirstTurnCheck': 'Ich habe bereits eine erste Anfrage geschrieben und möchte sie prüfen.',
  'skillRouteFirstTurnCheckResult': 'Kennzeichnet wesentliche Lücken, ohne einen Ersatz-Prompt zu entwerfen.',
  'skillBoundaryName': 'Originalmethoden zuerst.',
  'skillBoundary': 'Externe Skills müssen die URL des Quellprojekts und die Lizenzgrenze behalten.',
  'skillIndexLink': 'Das Skill-Register und alle 23 Methoden öffnen',
  'mobileIndexAria': 'Vollständige Projektindizes',
  'mobileIndexChapters': 'Kapitel',
  'mobileIndexLabs': 'Labs',
  'mobileIndexSkills': 'Skills',
  'mobileIndexCases': 'Feldberichte',
  'mobileIndexLocales': 'Locale-Einträge',
  'mobileIndexVisuals': 'Lehrtafeln',
  'mobileIndexUpdates': 'Update-Bereich',
  'mobileIndexTrust': 'Vertrauensarten',
  'skillFootnote': 'Alle 23 Projekt-Skills bestehen die Strukturprüfungen und bleiben candidate; die Belege aus frischen Aufgaben sind lückenhaft. Platform Observation Record dokumentiert eine sichtbare Oberfläche; es ist weder ein Fähigkeits- noch ein Sicherheitsanspruch. Practice Target richtet einen ersten Versuch ein; es beweist kein Lernen. Interruption Checkpoint bewahrt eine Aufgabenquittung; es wiederholt oder rettet keine Arbeit. Platform Fact Watch ist eine Wartungsquittung, keine Prüfung der aktuellen Plattform. LLM Comparison Protocol ist eine nicht ausgeführte Vergleichsmethode, kein Modellranking. Adversarial Project Review ist keine externe Prüfung.',
  'lab13Status': 'Maintainer-Referenz akzeptiert · keine Durchführung durch Lernende',
  'troubleEyebrow': 'Wenn etwas schiefgeht',
  'troubleTitle': 'Fehler sind Teil des Lernprogramms.',
  'troubleIntro': 'Nutze die erste brauchbare Prüfung und stoppe, wenn Befugnis, Umfang oder Beleg fehlen. Verstecke den Fehler nicht hinter einer polierten Zusammenfassung.',
  'troubleOneTitle': 'Die Ausgabe sieht richtig aus.',
  'troubleOneBody': 'Prüfe die ursprüngliche Behauptung, die geänderten Dateien, das Befehlsergebnis und das, was nicht getestet wurde.',
  'troubleOneLink': 'Belegprüfung nutzen ↗',
  'troubleTwoTitle': 'Der Agent versucht es immer wieder.',
  'troubleTwoBody': 'Dokumentiere denselben Fehler, ändere eine diagnostische Bedingung und versuche es dann einmal erneut oder eskaliere.',
  'troubleTwoLink': 'Abbruchbedingungen lesen ↗',
  'troubleThreeTitle': 'Eine Quelle sagt dir, du sollst etwas tun.',
  'troubleThreeBody': 'Behandle externe Texte und Werkzeugausgaben als Daten. Sie erteilen keine Erlaubnis zu handeln.',
  'troubleThreeLink': 'Die Grenze prüfen ↗',
  'troubleFourTitle': 'Ein Produktschritt hat sich geändert.',
  'troubleFourBody': 'Behalte das Aufgaben-Ziel; pausiere nur den genannten Schritt und aktualisiere dann den offiziellen Faktenstand, bevor du weitermachst.',
  'troubleFourLink': 'Der Update-Karte folgen ↗',
  'updatesEyebrow': 'Wartungsrahmen',
  'updatesTitle': 'Jedes Update hat einen festen Ort.',
  'updatesIntro': 'Die Update-Karte macht künftige Arbeit günstig: Finde die kanonische Datei, sammle die richtigen Belege, führe die richtige Prüfung aus und halte die Grenze des Unverifizierten sichtbar.',
  'updateFlowOne': 'Lokalisieren',
  'updateFlowOneBody': 'Finde die Registerzeile und den kanonischen Pfad.',
  'updateFlowTwo': 'Klassifizieren',
  'updateFlowTwoBody': 'Trenne stabiles Prinzip, Produktfakt, Quelle und Release-Änderung.',
  'updateFlowThree': 'Beleg',
  'updateFlowThreeBody': 'Dokumentiere Quelle, Umfang, Verantwortliche, Hash und nächste Prüfung.',
  'updateFlowFour': 'Validieren',
  'updateFlowFourBody': 'Führe den fokussierten Validator und eine unabhängige Prüfung aus.',
  'updateMapLinkTitle': 'Update-Karte',
  'updateMapLinkBody': 'Was sich wo ändert und welche Belege es braucht.',
  'updateRegistryLinkTitle': 'Update-Register',
  'updateRegistryLinkBody': 'Der maschinenlesbare Wartungsvertrag.',
  'factImpactLinkTitle': 'Fakt-Wirkungskarte',
  'factImpactLinkBody': 'Welche Kapitel, Labs, Skills, Evals und Seiten ein sich ändernder Fakt betreffen kann.',
  'updateTemplateLinkTitle': 'Update-Eintrag',
  'updateTemplateLinkBody': 'Ein wiederverwendbarer Eintrag für nicht triviale Änderungen.',
  'lifecycleLinkTitle': 'Content-Lebenszyklus',
  'lifecycleLinkBody': 'Die Beleg- und Release-Gates.',
  'statusEyebrow': 'Beleggrenze',
  'statusTitle': 'Ein Status ist eine Aussage über Belege.',
  'statusIntro': 'Dieses Projekt macht aus Dokumentanzahl, Skill-Anzahl oder einer erfolgreichen Ausgabe keine “Meisterschaft”. Nutze den Status, den die Belege stützen.',
  'statusDraft': 'Wird noch geschrieben oder es fehlt die Mindestprüfung.',
  'statusVerified': 'Der erklärte Umfang hat positive Belege sowie Belege zu Grenze, Fehler und Transfer.',
  'statusProduction': 'Auch die Gates für Sicherheit, Wartung, Version, Lizenz und Release bestehen.',
  'statusSourceBefore': 'Aktuelle Belege sind dokumentiert in',
  'statusSourceLink': 'der aktuellen Statusquelle',
  'statusReviewBefore': ' und erläutert durch ',
  'statusReviewLink': 'die eingegrenzte Browser-Überprüfung',
  'statusSourceAfter': '; die Seite bleibt candidate, weil diese Überprüfung nur den dokumentierten lokalen Umfang abdeckt.',
  'nextEyebrow': 'Nächster Schritt',
  'nextTitle': 'Bring ein kleines Problem mit.',
  'nextBody': 'Öffne den Aufgabenvertrag, wähle einen umkehrbaren ersten Schritt und behalte den Diff. Das ist der kürzeste sinnvolle Einstieg.',
  'nextPrimary': 'Kapitel 2 öffnen',
  'nextSecondary': 'Danach Lab 001 ausführen',
  'footerTagline': 'Ein evidenzgeleitetes LLM-Playbook, mit Codex als Flaggschiff-Praxis-Track.',
  'mobileRouteFixture': 'Du brauchst eine sichere Datei? Öffne die Fixture',
  'visualCaseIntro': 'Lehrtafeln und ein gerenderter Konzeptfall folgen einem roten Faden: Anfrage → Grenze → Artefakt → Beleg.',
  'visualCaseBoundary': 'lokale Render-Belege · kein Anspruch auf Kundensystem oder Live-System',
  'footerMeta': 'candidate · Beleggrenze geprüft 2026-08-13',
  'skillStarterEyebrow': 'Nach Situation wählen',
  'skillStarterTitle': 'Beginne hier, wenn dir die Namen noch nichts sagen.',
  'skillStarterIntro': 'Das sind Startrouten, keine automatischen Diagnosen. Öffne eine Methode, prüfe ihre erforderlichen Inputs und stoppe, wenn die Grenze nicht passt.',
  'skillRouteUnclear': 'Meine Aufgabe ist noch unklar.',
  'skillRouteUnclearResult': 'Liefert ein begrenztes Ziel, Inputs, Aktionen, Abnahme und eine Abbruchbedingung.',
  'skillRouteLearnCodex': 'Ich muss Codex lernen.',
  'skillRouteLearnCodexResult': 'Liefert eine Codex-Lernstufe, ein Experiment, eine Belegprüfung und eine Reflexion.',
  'skillRouteLearnOther': 'Ich muss eine andere Fähigkeit üben.',
  'skillRouteLearnOtherResult': 'Liefert eine Ausgangslage, eine Korrektur, einen Transferversuch mit verändertem Fall und einen Prüfhinweis.',
  'skillRouteFailed': 'Eine aufbewahrte Anfrage mit Antwort ist bereits fehlgeschlagen.',
  'skillRouteFailedResult': 'Liefert eine evidenzbasierte Diagnose und die kleinste vergleichbare Reparatur.',
  'skillRouteVerify': 'Ich muss eine bestehende Behauptung prüfen.',
  'skillRouteVerifyResult': 'Liefert, was die Belege beweisen, was ihnen fehlt und was als Nächstes nötig ist.',
  'mobileRoutesAria': 'Wähle deinen nächsten Schritt',
  'mobileRouteTask': 'Du hast ein Wegwerfprojekt? Starte Codex',
  'mobileRoutePractice': 'Übe Sprache, Recherche oder eine andere Fertigkeit',
  'mobileRouteIndexes': 'Die vollständigen Projektindizes durchsuchen',
  'mobileAllRoutes': 'Alle Problemrouten öffnen',
  'starterPreview': 'Den vollständigen Prompt ansehen',
  'starterSequenceAria': 'Ablauf: Vorher, Prompt, menschliche Prüfung und Reparatur',
  'starterCheckOne': 'Fakten erhalten — Freitag um 10 Uhr und “bring the draft” bleiben bestehen.',
  'starterCheckTwo': 'Handlung erhalten — wer nicht teilnehmen kann, wird um Antwort gebeten.',
  'starterCheckThree': 'Nichts erfunden — kein Datum, keine Zeitzone, kein Ort, keine Frist, kein Absender, kein Grund, keine Kontaktmöglichkeit oder sonstige Tatsache erscheint.',
  'starterCheckPass': 'BESTANDEN',
  'starterCheckFail': 'FEHLGESCHLAGEN',
  'starterCheckUnsure': 'UNSICHER',
  'starterCheckGate': 'Erfasse alle drei Urteile, bevor du mit einem Beispiel vergleichst.',
  'starterCheckReady': 'Alle drei Urteile sind erfasst. Du kannst jetzt mit der Beispielantwort vergleichen.',
  'starterCheckRecovery': 'Ein fehlgeschlagener oder unsicherer Check ist erfasst. Nutze den Rettungs-Prompt und behalte diesen Eintrag als lokale Beobachtung.',
  'starterCheckOneAria': 'Erfasse, ob die Fakten erhalten wurden',
  'starterCheckTwoAria': 'Erfasse, ob die gewünschte Handlung erhalten wurde',
  'starterCheckThreeAria': 'Erfasse, ob unbelegte Details hinzugefügt wurden',
  'starterCompare': 'Mit einer akzeptablen Form vergleichen',
  'starterComparisonBoundary': 'Diese Beispielantwort bleibt verborgen, bis alle drei Urteile erfasst sind. Sie bewertet deine Antwort nicht und beweist kein Lernen.',
  'starterExample': 'Eine akzeptable Form: “The workshop starts Friday at 10. Please bring your draft. If you cannot attend, please reply.” Der Wortlaut darf abweichen; das ist nicht die einzige richtige Antwort.',
  'starterRescueCopy': 'Rettungs-Prompt kopieren',
  'starterRescueCopied': 'Rettungs-Prompt kopiert. Repariere nur den ersten fehlgeschlagenen Check.',
  'starterHelpLabel': 'Genutzte Hilfe',
  'starterHelpAria': 'Erfasse die genutzte Hilfe',
  'starterHelpPrompt': 'Erster Prompt',
  'starterHelpRescue': 'Rettungs-Prompt',
  'starterHelpBoth': 'Beide Prompts',
  'starterCorrectionLabel': 'Korrektur nach der Prüfung',
  'starterCorrectionAria': 'Erfasse den Korrekturstatus',
  'starterCorrectionNotNeeded': 'Nicht nötig',
  'starterCorrectionCorrected': 'Korrigiert',
  'starterCorrectionNotYet': 'Noch nicht',
  'starterRecordNotRecorded': 'Nicht erfasst',
  'starterReceiptAria': 'Lokaler First-Win-Check-Eintrag',
  'starterCopyRecord': 'Meinen lokalen Check-Eintrag kopieren',
  'starterRecordCopied': 'Lokaler Check-Eintrag kopiert. Er enthält nur Statuswerte, nicht deine Antwort.',
  'starterRecordCopyFailed': 'Der lokale Check-Eintrag konnte nicht kopiert werden. Wähle seinen Text manuell aus.',
  'starterRecoveryLink': 'Recovery-Übergabe öffnen',
  'starterReceiptLabel': 'Quittung in einfacher Sprache',
  'starterReceipt': 'Versucht · hier geprüft · Hilfe genutzt · korrigiert · nicht bewiesen: Lernen, Transfer, allgemeine Schreibfähigkeit oder Modellüberlegenheit.',
  'routeStatusAll': 'Zeige alle 22 Kapitel.',
  'routeStatusA': 'Zeige 6 Kapitel in A · Erster Kontakt.',
  'routeStatusB': 'Zeige 7 Kapitel in B · Echte Arbeit.',
  'routeStatusC': 'Zeige 5 Kapitel in C · Fähigkeit.',
  'routeStatusD': 'Zeige 4 Kapitel in D · Team-Praxis.',
  'featuredLab': 'vorgestelltes Lab',
  'lab13Title': 'Auditierbarer vertikaler Slice',
  'lab13Body': 'Führe eine lokale Markdown-Änderung von Protokoll und Baseline bis zu Checkpoint, Diff, fokussierter Prüfung, Fehler und Transfer aus.',
  'lab14Title': 'Abgleich vor Fortsetzung',
  'lab14Body': 'Gleiche Aufgabenzeiger, Ziel, Branch, Berechtigungen und Nebenwirkungszustand ab, bevor du fortfährst.',
  'lab15Title': 'Beleglieferung',
  'lab15Body': 'Zerlege einen Abschlusssatz in Behauptungen, Umfänge, Ergebnisse und den kleinsten nächsten Check.',
  'lab16Title': 'Nebenwirkungsgrenze',
  'lab16Body': 'Trenne Diagnose von Installation, Veröffentlichung, Neustart und anderen dauerhaften Aktionen.',
  'lab17Title': 'Skill-Discovery-Audit',
  'lab17Body': 'Prüfe Existenz, Auffindbarkeit, Laden, Verhalten, Lizenz und Übernahme als getrennte Behauptungen.',
  'lab18Title': 'Sprachtransfer',
  'lab18Body': 'Behalte eine ohne Hilfe erstellte Ausgangslage bei, korrigiere einen bedeutungsblockierenden Fehler und teste dann einen veränderten Fall, ohne Sätze aus der Lektion wiederzuverwenden.',
  'learningPathWarning': 'Die Lernpfad-Daten konnten nicht geladen werden. Es wird der lokale Fallback angezeigt; prüfe die generierten Daten, bevor du dich auf diese Route verlässt.',
  'skillCoachName': 'Codex Coach',
  'skillProtocolName': 'Task Protocol',
  'skillEvidenceName': 'Evidence Review',
  'skillSelectorName': 'Skill Selector',
  'skillWorkflowName': 'Workflow Orchestrator',
  'skillResearchName': 'Research Router',
  'skillContextName': 'Product Context',
  'indexEyebrow': 'Projektindex',
  'indexTitle': 'Wissen, wo jede Behauptung lebt.',
  'indexIntro': 'Das ist eine menschenlesbare Karte des Repos: was jede Ebene speichert, wo du beginnst und welche Quelle ihren Status kontrolliert.',
  'fileMapTitle': 'Repository-Karte',
  'fileMapIntro': 'Lies die Ebene, die zur Arbeit passt. Die öffentliche Seite ist ein Leitfaden; die Dateien darunter sind die maßgebliche Quelle.',
  'fileSiteTitle': 'Öffentliche Präsentation',
  'fileSiteBody': 'index.html, styles.css, app.js und generierte Lernpfad-Daten.',
  'fileChaptersTitle': 'Kernlerntext',
  'fileChaptersBody': '22 Kapitel; aktueller Artefaktstatus: candidate.',
  'fileLabsTitle': 'Beobachtbare Praxis',
  'fileLabsBody': '18 Labs; aktueller Status: draft; Durchführungsstatus: not_run.',
  'fileSkillsTitle': 'Wiederverwendbare Methoden',
  'fileSkillsBody': '23 Projekt-Skills mit Triggern, Grenzen und Belegverträgen.',
  'fileDocsTitle': 'Governance und Recherche',
  'fileDocsBody': 'Status, Quellen, Feldberichte, Update-Regeln und Qualitätsaufzeichnungen.',
  'ledgerTitle': 'Inhaltsstand',
  'ledgerIntro': 'Eine kompakte Lektüre der aktuellen Statusquelle. Status beschreibt Belege, nicht Ambitionen.',
  'ledgerProject': 'Projekt',
  'ledgerChapters': 'Kapitel · 22',
  'ledgerLabs': 'Labs · 18',
  'ledgerSkills': 'Skills · 25',
  'ledgerResearch': 'Feldrecherche',
  'ledgerResearchNote': 'Nutzerberichte; nicht lokal reproduziert',
  'ledgerSource': 'Die aktuelle Statusquelle öffnen',
  'localeTitle': 'Sechssprachige Route',
  'localeIntro': 'Sechs Repository-Einstiegssprachen sind registriert. Alle sechs Routen-Tokens sind verfügbar; die EN- / 中文-Oberfläche ist geprüft, während die anderen Sprachen während der Migration einen expliziten englischen UI-Fallback verwenden.',
  'localeEnglish': 'verfügbar · Standard',
  'localeChinese': 'verfügbar · aktuell ausgewählt',
  'localeSpanish': 'Route verfügbar · UI-Fallback',
  'localeGerman': 'Route verfügbar · UI-Fallback',
  'localeJapanese': 'Route verfügbar · UI-Fallback',
  'localeKorean': 'Route verfügbar · UI-Fallback',
  'localeRule': 'Routenregel: übersetzte Artefakte tragen ein Sprach-Suffix und verlinken auf dieselbe Sprache. Ein Routen-Token ist nicht dasselbe wie eine abgeschlossene Übersetzung oder eine geprüfte Oberfläche.',
  'researchTitle': 'Echte Probleme, mit angehängter Grenze.',
  'researchIntro': 'Der Recherche-Index verwandelt öffentliche Codex-Issues, Sicherheitshinweise des Herstellers und Forenberichte in Symptome, quellenbezogene Grenzen, sichere Checks und Lehrmaterial-Links. Er beansprucht keine offizielle Ursache und keine lokale Reproduktion.',
  'researchBoundary': 'quellenbezogene Hinweise und öffentliche Berichte · keine lokale Reproduktion dokumentiert',
  'researchIndexLink': 'Den Index der Feldprobleme öffnen',
  'researchIndexBody': 'Codex-, Oberflächen-, Übergabe-, Authentifizierungs-, Worktree- und Verifikationssymptome.',
  'researchForumsLink': 'Die Forum-Fallnotizen lesen',
  'researchForumsBody': 'Sandbox-Netzwerk-Allowlists, Windows-Spawn-Fehler, Genehmigungen, Encoding und private Pfade.',
  'researchLiveLink': 'Drei aktuelle Feldberichte prüfen',
  'researchLiveBody': 'Worktree-Ziel, versteckte Belege und Verifikationsumfang; alles bleibt lokal unverifiziert.',
  'researchSafetyLink': 'Die Sicherheitsgrenzen der KI-Zusammenarbeit lesen',
  'researchSafetyBody': 'Prompt-Injection, minimal nötiger Input, Handlungsbefugnis und Verifikation; quellenbasierte Kandidatenrecherche.',
  'researchReceiptsLink': 'Die Feld-Signale zur KI-Sicherheit lesen',
  'researchReceiptsBody': 'Öffentliche Berichte, Klassifizierung von Behauptungen und ein Checkpoint für lange Rechercheaufgaben; Kandidatenrecherche.',
  'researchFirstTurnLink': 'Einen universellen ersten Turn entwerfen',
  'researchFirstTurnBody': 'Eine sechsfeldrige, textbasierte Spanisch- oder Recherchekarte; Kandidatenrecherche, kein Anspruch auf Plattformgleichwertigkeit oder Ergebnis.',
  'researchPublicInterestLink': 'Die Sicherheitsabfrage im öffentlichen Interesse durchführen',
  'researchPublicInterestBody': 'Ein festgelegter fiktiver Fall: Personen, Datengrenze, menschliche Kontrolle, Beleg und Stopp; candidate / not_run.',
  'problemPublicInterestSafetyTitle': 'Ich muss eine KI-Idee bewerten, die Menschen betreffen könnte.',
  'problemPublicInterestSafetyBody': 'Benenne eine Entscheidung, die Menschen, die sie belasten könnte, die nötigen Daten, den menschlichen Ausweg, den Beleg und den Punkt, an dem die Arbeit stoppen muss.',
  'problemPublicInterestSafetyLink': 'Die festgelegte Sicherheitsabfrage durchführen · candidate · not_run ↗',
  'visualCaseTitle': 'Sieh die Methode im Kontext.',
  'visualModelLink': 'Von der Anfrage zum Beleg',
  'visualModelBody': 'Umfang, Aktion, Prüfung und begrenzte Übergabe.',
  'visualSkillLink': 'Vier Beleg-Perspektiven',
  'visualSkillBody': 'Existenz, Korrektheit, Einsatzbereitschaft und Lernen.',
  'visualFieldLink': 'Feldsignal → sichere Degradation',
  'visualFieldBody': 'Drei offene Berichte; keine lokale Reproduktion oder offizielle Bestätigung der Ursache.',
  'visualCaseLink': 'Anfänger-Übungsschleife',
  'visualCaseBody': 'Zuerst versuchen, einen Punkt korrigieren, den Fall variieren, dann eine begrenzte Quittung behalten.',
  'searchLabel': 'Im Playbook suchen',
  'searchPlaceholder': 'Kapitel, Labs, Skills oder Feldberichte durchsuchen',
  'searchSubmit': 'Suchen',
  'searchTitle': 'Finde eine begrenzte Antwort.',
  'searchClear': 'Leeren',
  'searchNoQuery': 'Gib ein Wort oder eine Phrase ein, um im Playbook zu suchen.',
  'searchLoading': 'Lokaler Suchindex wird geladen…',
  'searchNoResults': 'Keine Ergebnisse für “{query}”. Versuche einen Kapiteltitel, einen Skill-Namen oder eine engere Phrase.',
  'searchResultsCount': '{count} Ergebnisse für “{query}”.',
  'searchIndexUnavailable': 'Der lokale Suchindex konnte nicht geladen werden. Prüfe die Verbindung und sende dann erneut, um es noch einmal zu versuchen.',
  'searchFallback': 'Englische Quelle angezeigt · angeforderte Übersetzung ist noch nicht fertig',
  'searchOpen': 'Reader öffnen',
  'searchKindChapter': 'Kapitel',
  'searchKindLab': 'Lab',
  'searchKindSkill': 'Skill-Methode',
  'searchKindFieldNote': 'Feldnotiz',
  'searchKindProject': 'Projekteintrag',
  'searchKindBook': 'Bucheintrag',
  'searchKindDocument': 'Dokument',
  'problemRecoveryTitle': 'Das Modell hat die falsche Aufgabe bearbeitet.',
  'problemRecoveryBody': 'Behalte die Anfrage, den sichtbaren Kontext, die tatsächliche Antwort und das erwartete Ergebnis. Ändere eine Kommunikationsbedingung und führe dann einen sicheren Vergleich durch.',
  'problemRecoveryLink': 'Recovery-Übergabe öffnen · candidate · not_run ↗',
  'repositoryStripAria': 'Kanonische Quellverzeichnisse und aktuelle Grenzen',
  'repositoryStripTitle': 'Was dieses Repository enthält',
  'repositoryStripIntro': 'Der öffentliche Reader wird aus site/ gerendert. Die kanonischen Lern- und Wartungsquellen unten halten ihre aktuelle Beleggrenze sichtbar.',
  'repositoryChapters': '22 Kapitel · candidate',
  'repositoryLabs': '18 Labs · 2 Maintainer-Referenzen · 0 Durchführungen durch Lernende',
  'repositorySkills': '23 wiederverwendbare Skills · candidate',
  'repositoryDocs': 'Governance und Feldrecherche · candidate; Berichte nicht lokal reproduziert',
  'skillCardIndex': '03 / SKILL-PRAXIS',
  'skillCardScope': 'fiktiver Plan · keine Werkzeugbefugnis',
  'skillCardTitle': 'Übe eine kleine Planungsfertigkeit, bevor du um Hilfe bittest.',
  'skillCardIntro': 'Erstelle selbst einen kurzen fiktiven Parkbesuchsplan. Das Modell muss warten, einen kleinen Hinweis geben und die gleiche Fertigkeit dann unter einer veränderten Vorgabe testen.',
  'skillCardStepOne': 'Kopiere die Karte in einen beliebigen Text-Chat. Sie enthält eine fiktive Situation und braucht kein Konto, keine Datei, kein Werkzeug und keine persönlichen Daten.',
  'skillCardStepTwo': 'Schreibe den ersten Plan selbst innerhalb von vier Minuten. Frage nicht zuerst nach einem Modellplan oder einer polierten Alternative.',
  'skillCardStepThree': 'Nimm einen kurzen Hinweis an, korrigiere deinen Plan und versuche dann das geänderte Zeitlimit ohne Hilfe.',
  'skillCardLink': 'Die Grenze der Skill-Übung lesen',
  'skillCardBoundary': 'Nur Kandidatenübung: Ein kurzer fiktiver Plan kann weder Planungsfähigkeit noch Urteilsvermögen, Transfer, Behalten, Sicherheit oder eigenständige Leistung beweisen.',
  'skillPromptText': 'Hilf mir, das Erstellen eines kleinen Plans zu üben. Erstelle den Plan nicht zuerst.\n\nÜbungsaufgabe: Plane einen fiktiven 45-minütigen Besuch eines Stadtparks für eine erwachsene Person. Enthalten sein müssen eine Wasserflasche, eine Wetterprüfung und eine Erinnerung an die Rückkehrzeit. Das ist keine echte Buchung, keine echte Reiseentscheidung und keine Wettervorhersage.\n\nBevor ich schreibe, zeige diesen festen Check: 3–5 Schritte; alle drei Vorgaben kommen vor; keine unbelegten lokalen Fakten; und eine Person könnte dem Plan folgen. Gib mir vier Minuten zum Schreiben. Zeige keinen Modellplan, erweitere ihn nicht und bewerte ihn nicht, bevor ich antworte.\n\nNach meinem ersten Versuch benenne nur eine folgenreiche Auslassung. Stelle eine Frage oder gib einen Hinweis von höchstens 12 Wörtern und warte dann auf meine Korrektur. Behalte beide Versuche. Ändere danach nur die Besuchsdauer von 45 Minuten auf 20 Minuten und bitte um einen neuen Plan ohne Hilfe, mit demselben Check.\n\nBeende mit genau einem Status: practised, demonstrated_on_this_task, transferred_to_time_limit_variation oder not_run. Eine Sitzung begründet keine Planungsfähigkeit, kein Urteilsvermögen, keine Sicherheit und keine eigenständige Leistung.',
  'promptCardShow': 'Prompt anzeigen',
  'skillPromptCardName': 'Prompt Card Editor',
  'skillPromptCard': 'Verwandle eine genehmigte Prompt-Idee in eine quellenbewusste Lehrkarte.',
  'skillAdversarialName': 'Adversarial Project Review',
  'skillAdversarial': 'Ordne wesentliche Schwächen ein, bevor du über Veröffentlichung oder Release entscheidest.',
  'skillEscalationName': 'Request Escalation',
  'skillEscalation': 'Wähle die kleinste sichere Spur, bevor du entwirfst, recherchierst oder handelst.',
  'skillComparisonName': 'LLM Comparison Protocol',
  'skillComparison': 'Plane einen fairen Zwei-Kandidaten-Vergleich, ohne ein Ranking zu erfinden.',
  'skillPracticeTargetName': 'Practice Target',
  'skillPracticeTarget': 'Verwandle einen breiten Lernwunsch in einen beobachtbaren ersten Versuch.',
  'skillFactWatchName': 'Platform Fact Watch',
  'skillFactWatch': 'Kartiere eine sich ändernde Produktbehauptung, bevor ein benannter Schritt die Leser in die Irre führt.',
  'skillRouteEscalation': 'Ich bin mir noch nicht sicher, welche Art von Hilfe ich brauche.',
  'skillRouteEscalationResult': 'Wählt die kleinste sichere Spur, bevor du entwirfst, recherchierst oder handelst.',
  'promptDeckEyebrow': 'Optionale Prompt-Karten · fünf Minuten',
  'promptDeckTitle': 'Beginne mit einem kleinen Gespräch.',
  'promptDeckIntro': 'Wähle eine originale, textbasierte Karte. Die Sprach- und Planungskarten müssen nicht bearbeitet werden; die Recherchekarte hat zwei Platzhalter. Prüfe die Antwort selbst und halte den Anspruch klein: Ein Versuch ist keine Sprachbeherrschung, keine Recherche und keine fertige Antwort.',
  'promptContractKicker': 'Bevor du sendest',
  'promptContractTitle': 'Mache sechs Teile sichtbar.',
  'promptContractLink': 'Die Begründung lesen',
  'promptContractGridAria': 'Sechs Felder, die du in einer ersten LLM-Anfrage prüfen solltest',
  'promptContractOutcomeLabel': 'Ergebnis',
  'promptContractOutcomeBody': 'Ein kleines, beobachtbares Ergebnis.',
  'promptContractContextLabel': 'Ausgangskontext',
  'promptContractContextBody': 'Was du weißt oder bereitstellst.',
  'promptContractResponseLabel': 'Gewünschte Antwort',
  'promptContractResponseBody': 'Form, Länge oder Reihenfolge.',
  'promptContractLimitsLabel': 'Grenzen',
  'promptContractLimitsBody': 'Daten und Aktionen, die ausgeschlossen bleiben.',
  'promptContractCheckLabel': 'Prüfung',
  'promptContractCheckBody': 'Was du selbst prüfen wirst.',
  'promptContractStopLabel': 'Stopp und Quittung',
  'promptContractStopBody': 'Wann du stoppst und was du behältst.',
  'promptCardScope': 'nur Text · keine Werkzeugbefugnis',
  'promptCardCopy': 'Prompt kopieren',
  'promptCardCopied': 'Prompt kopiert. Befolge die drei Schritte und prüfe die Antwort dann selbst.',
  'promptCardCopyFailed': 'Der Prompt konnte nicht kopiert werden. Wähle den Text manuell aus.',
  'spanishCardIndex': '01 / SPRACHÜBUNG',
  'spanishCardTitle': 'Führe eine kurze getippte spanische Terminabsprache für eine Lerngruppe durch.',
  'spanishCardIntro': 'Diese textbasierte Karte nutzt fiktive Lernangaben, wartet auf deinen getippten Versuch und begrenzt die Hilfe auf einen bedeutungsblockierenden Fehler.',
  'spanishCardStepOne': 'Kopiere die Karte genau so, wie sie geschrieben ist. Sie legt bereits eine fiktive getippte spanische Terminabsprache für eine Lerngruppe fest.',
  'spanishCardStepTwo': 'Füge sie in einen beliebigen Text-Chat ein. Füge keinen echten Namen, keine Schule, keinen Kalender, kein Konto und keine Zahlungsdaten hinzu.',
  'spanishCardStepThree': 'Tippe die erste Antwort selbst. Ein unvollkommener Versuch ist der Sinn der Übung; frage nicht zuerst nach der Antwort.',
  'spanishCardLink': 'Die Übungsgrenze lesen',
  'spanishCardBoundary': 'Nur Kandidaten-Textübung: Eine getippte Sitzung kann weder gesprochene Konversation noch Aussprache, Hörverstehen, Sprachbeherrschung, Genauigkeit, Behalten oder eigenständige Leistung zeigen.',
  'spanishPromptText': 'Führe eine vierminütige getippte spanische Terminabsprache für eine Lerngruppe mit genau vier Lernenden-Runden durch. Du bist eine erfundene Mitschülerin oder ein erfundener Mitschüler und schreibst zuerst. Verwende nur kurze Fragen im Präsens. Ich tippe nach jeder Frage eine Antwort.\n\nFiktive Lernkarte: Ana; Lerngruppe; Dienstag oder Donnerstag; 6:00 oder 6:30; Bibliothek oder online; eine Frage mitbringen. Ich darf die Karte nutzen und höchstens drei einzelne Wörter nachschlagen. Fordere keine echten Daten an und akzeptiere sie nicht: Name, Schule, Kalender, Konto, Adresse, Kontakt oder Zahlungsdaten.\n\nZeige vor Runde eins dieses feste Raster: vier Lernenden-Runden; Zweck und Lerngruppe übermittelt; Tag und Uhrzeit geklärt; Ort oder Online-Option übermittelt; Spanisch verständlich genug, um fortzufahren. Lehre nicht, übersetze nicht und zeige keine Modellantwort, bevor ich antworte. Behalte meinen ersten Versuch und dokumentiere Nachschlagevorgänge. Korrigiere nur den ersten bedeutungsblockierenden Fehler: Benenne den Fehlertyp, gib dann einen partiellen Hinweis und nur dann ein ausgearbeitetes Fragment, wenn ich immer noch nicht weitermachen kann. Bitte mich, ihn zu korrigieren. Behalte beide Versuche und bezeichne einen erfolgreichen Austausch nicht als Sprachbeherrschung, gesprochene Konversation oder Hör-/Aussprachebeleg.',
  'researchCardIndex': '02 / RECHERCHE-VORBEREITUNG',
  'researchCardTitle': 'Bereite eine Quellenprüfung vor, kein Urteil.',
  'researchCardIntro': 'Verwandle eine enge Frage und das von dir gelieferte Material in ein kleines Register aus Behauptungen, Lücken und der nächsten Frage.',
  'researchCardStepOne': 'Kopiere die Karte und ersetze dann nur ihre zwei Platzhalter.',
  'researchCardStepTwo': 'Liefere nur Material, das du teilen darfst. Lasse persönliche, private oder risikoreiche Inhalte weg.',
  'researchCardStepThree': 'Behandle die Tabelle als Vorbereitung. Öffne und gleiche die Quellen selbst ab, bevor du dich auf eine Behauptung verlässt.',
  'researchCardLink': 'Die Recherchegrenze lesen',
  'researchCardBoundary': 'Sie kann nicht beweisen, dass eine Quelle existiert, aktuell ist oder eine Behauptung stützt. Eine generierte Tabelle ist für sich genommen kein Beleg.',
  'researchPromptText': 'Ich habe fünf Minuten Zeit, um eine Rechercheprüfung vorzubereiten, keine finale Antwort.\n\nFrage: [eine enge Frage].\nVon mir geliefertes Material: [URLs, Titel, Auszüge oder "keins"].\n\nStelle zuerst die Frage neu dar und benenne, welche Belege nötig wären. Erstelle dann eine Tabelle mit drei Zeilen: mögliche Behauptung, gelieferte Quelle oder "fehlend", und was geprüft werden müsste. Erfinde keine Zitate, behaupte nicht, eine Quelle geöffnet zu haben, auf die du keinen Zugriff hast, und gib keine Empfehlung. Trenne Fakt, Bericht und Schlussfolgerung. Wenn das Material fehlt, widersprüchlich, persönlich oder risikoreich ist, stoppe und nenne mir den kleinsten sicheren nächsten Schritt.\n\nBeende mit: tatsächlich gelieferte Quellen, Unbekanntes und eine Frage, die ich beantworten sollte, bevor ich fortfahre.',
  'heroScope': 'Eine übertragbare Methode mit Codex als aktuellem Flaggschiff-Praxispfad. Eine benannte Plattform wird erst mit aktuellen Quellen und reproduzierbarer Evidenz zu einer Lektion.',
  'heroRouteNoSetupTitle': 'Kein Projekt oder keine Programmiererfahrung? Beginne mit einem Check ohne Einrichtung.',
  'heroRouteNoSetupBody': 'Nutze ein beliebiges Chat-Modell und eine fiktive Nachricht. Keine Dateien, keine Werkzeuge, keine Kontoverbindung und keine privaten Daten.',
  'mobileRouteNoSetup': 'Kein Projekt? Beginne mit dem Check ohne Einrichtung',
  'skillInterruptionName': 'Interruption Checkpoint',
  'skillInterruption': 'Bewahre, was bekannt ist, bevor du es erneut versuchst, das Modell wechselst oder eine neue Aufgabe beginnst.',
  'skillHandoffName': 'Shift Handoff',
  'skillHandoff': 'Trenne wiederverwendbare Regeln vom heutigen gelieferten Arbeitsobjekt.',
};

Object.assign(copy.en, {
  'localeTitle': 'Six-language route',
  'localeIntro': 'Six repository entry locales are registered, and every reader-facing page is available in all six: English, 简体中文, Español, 日本語, 한국어, Deutsch. No route needs an English fallback anymore.',
  'localeEnglish': 'available · default',
  'localeChinese': 'available · 简体中文',
  'localeSpanish': 'available · Español',
  'localeGerman': 'available · Deutsch',
  'localeJapanese': 'available · 日本語',
  'localeKorean': 'available · 한국어',
  'localeRule': 'Route rule: every translated artifact carries a locale suffix and links to the same locale. A route token now equals a completed, suffixed translation set.',
  'mobileIndexUpdates': 'Update areas',
  'mobileIndexTrust': 'Trust families',
  'menuCloseAria': 'Close navigation'
});

Object.assign(copy.zh, {
  'localeTitle': '六语种路线',
  'localeIntro': '仓库已登记六种入口语言，所有面向读者的页面均提供六语种版本：English、简体中文、Español、日本語、한국어、Deutsch。任何语言路由都不再需要英文回退。',
  'localeEnglish': '可用 · 默认',
  'localeChinese': '可用 · 简体中文',
  'localeSpanish': '可用 · Español',
  'localeGerman': '可用 · Deutsch',
  'localeJapanese': '可用 · 日本語',
  'localeKorean': '可用 · 한국어',
  'localeRule': '路由规则：每个翻译产物都带语言后缀并链接到同一语言；语言路由即完整的带后缀翻译集。',
  'mobileIndexUpdates': '更新区域',
  'mobileIndexTrust': '可信度类型',
  'menuCloseAria': '关闭导航'
});

Object.assign(copy.es, {
  'localeTitle': 'Ruta de seis idiomas',
  'localeIntro': 'Seis idiomas de entrada están registrados y todas las páginas para lectores existen en los seis: English, 简体中文, Español, 日本語, 한국어, Deutsch. Ninguna ruta necesita ya un respaldo en inglés.',
  'localeEnglish': 'disponible · por defecto',
  'localeChinese': 'disponible · 简体中文',
  'localeSpanish': 'disponible · Español',
  'localeGerman': 'disponible · Deutsch',
  'localeJapanese': 'disponible · 日本語',
  'localeKorean': 'disponible · 한국어',
  'localeRule': 'Regla de rutas: cada artefacto traducido lleva el sufijo de idioma y enlaza al mismo idioma; una ruta equivale a un conjunto completo de traducciones con sufijo.',
  'menuCloseAria': 'Cerrar navegación'
});

Object.assign(copy.ja, {
  'localeTitle': '6言語ルート',
  'localeIntro': '6つの入り口言語が登録され、すべての読者向けページが6言語で存在します：English、简体中文、Español、日本語、한국어、Deutsch。どの言語ルートも英語へのフォールバックは不要になりました。',
  'localeEnglish': '利用可能 · デフォルト',
  'localeChinese': '利用可能 · 简体中文',
  'localeSpanish': '利用可能 · Español',
  'localeGerman': '利用可能 · Deutsch',
  'localeJapanese': '利用可能 · 日本語',
  'localeKorean': '利用可能 · 한국어',
  'localeRule': 'ルート規則：翻訳された成果物はすべて言語サフィックスを持ち、同じ言語へリンクします。言語ルート＝完全な接尾辞付き翻訳セットです。',
  'menuCloseAria': 'ナビゲーションを閉じる'
});

Object.assign(copy.ko, {
  'localeTitle': '6개 언어 루트',
  'localeIntro': '6개의 진입 언어가 등록되어 있으며 모든 독자용 페이지가 6개 언어로 제공됩니다: English, 简体中文, Español, 日本語, 한국어, Deutsch. 이제 어떤 언어 루트도 영어 폴백이 필요하지 않습니다.',
  'localeEnglish': '사용 가능 · 기본값',
  'localeChinese': '사용 가능 · 简体中文',
  'localeSpanish': '사용 가능 · Español',
  'localeGerman': '사용 가능 · Deutsch',
  'localeJapanese': '사용 가능 · 日本語',
  'localeKorean': '사용 가능 · 한국어',
  'localeRule': '루트 규칙: 번역된 산출물은 모두 언어 접미사를 가지며 같은 언어로 연결됩니다. 언어 루트 = 완전한 접미사 번역 세트.',
  'menuCloseAria': '내비게이션 닫기'
});

Object.assign(copy.de, {
  'localeTitle': 'Sechs-Sprachen-Route',
  'localeIntro': 'Sechs Einstiegssprachen sind registriert, und jede leserorientierte Seite liegt in allen sechs Sprachen vor: English, 简体中文, Español, 日本語, 한국어, Deutsch. Keine Route braucht mehr einen englischen Fallback.',
  'localeEnglish': 'verfügbar · Standard',
  'localeChinese': 'verfügbar · 简体中文',
  'localeSpanish': 'verfügbar · Español',
  'localeGerman': 'verfügbar · Deutsch',
  'localeJapanese': 'verfügbar · 日本語',
  'localeKorean': 'verfügbar · 한국어',
  'localeRule': 'Routenregel: Jedes übersetzte Artefakt trägt das Sprachsuffix und verlinkt auf dieselbe Sprache; eine Sprachroute entspricht einem vollständigen, suffigierten Übersetzungssatz.',
  'menuCloseAria': 'Navigation schließen'
});

Object.assign(copy.en, {
  'skillsTitle': 'Twenty-five Skills. Distinct jobs.',
  'skillIndexLink': 'Open the Skill registry and all 25 methods',
  'skillFootnote': 'All 25 project Skills pass structural checks and remain candidate; fresh-task evidence is partial. Language Partner runs one typed exchange; it does not teach a language or promise fluency. Interview Rehearsal coaches one answer; it does not predict interview questions or promise an outcome. Interruption Checkpoint preserves a task receipt; it does not retry or recover work. Practice Target sets up one first attempt; it does not prove learning. Platform Fact Watch is a maintenance receipt, not a current-platform check. LLM Comparison Protocol is an unrun comparison method, not a model ranking. Adversarial Project Review is not an external review.',
  'fileSkillsBody': '25 project Skills with triggers, boundaries, and evidence contracts.',
  'ledgerSkills': 'Skills · 25',
  'repositorySkills': '25 reusable Skills · candidate',
  'skillRouteLanguagePartner': 'I want to practise a language by typing.',
  'skillRouteLanguagePartnerResult': 'Runs one fictional typed exchange; you write first, one correction at a time.',
  'skillRouteInterview': 'I want to rehearse one interview answer.',
  'skillRouteInterviewResult': 'Coaches one timed answer with a visible check and one changed question.',
  'skillLanguagePartnerName': 'Language Partner',
  'skillLanguagePartner': 'Run one bounded typed exchange in the learner\'s target language.',
  'skillInterviewName': 'Interview Rehearsal',
  'skillInterview': 'Rehearse one observable answer under a time limit.'
});
Object.assign(copy.zh, {
  'skillsTitle': '二十五个 Skill，各有职责。',
  'skillIndexLink': '打开 Skill 登记表与全部 25 个方法',
  'skillFootnote': '25 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整。语言伙伴只运行一次打字对话，不教语言、不承诺流利。面试演练只教练一个回答，不预测面试问题、不承诺结果。中断检查点只保留任务回执，不会重试或恢复工作。练习目标用于准备一次首次尝试，不能证明学习结果。平台事实巡检是维护记录，不是当前平台检查。LLM 比较协议尚未运行，不是模型排行榜。对抗式项目审查不代表外部评审。',
  'fileSkillsBody': '25 个项目 Skill，包含触发、边界与证据契约。',
  'ledgerSkills': 'Skill · 25',
  'repositorySkills': '25 个可复用 Skill · candidate',
  'skillRouteLanguagePartner': '我想用打字练习一门语言。',
  'skillRouteLanguagePartnerResult': '运行一段虚构的打字对话；你先写，一次只纠正一处。',
  'skillRouteInterview': '我想演练一个面试回答。',
  'skillRouteInterviewResult': '按时间限制教练一个可检查的回答，再给一个变式问题。',
  'skillLanguagePartnerName': '语言伙伴 Language Partner',
  'skillLanguagePartner': '在目标语言中运行一段有边界的打字对话。',
  'skillInterviewName': '面试演练 Interview Rehearsal',
  'skillInterview': '在时间限制下演练一个可观察的回答。'
});
Object.assign(copy.es, {
  'skillsTitle': 'Veinticinco Skills. Trabajos distintos.',
  'skillIndexLink': 'Abrir el registro de Skills y los 25 métodos',
  'skillFootnote': 'Los 25 Skills del proyecto pasan las comprobaciones estructurales y siguen siendo candidate; la evidencia de tareas nuevas es parcial. Language Partner ejecuta un intercambio escrito; no enseña un idioma ni promete fluidez. Interview Rehearsal entrena una respuesta; no predice preguntas de entrevista ni promete un resultado. Interruption Checkpoint conserva un recibo de tarea; no reintenta ni recupera trabajo. Practice Target prepara un primer intento; no demuestra aprendizaje. Platform Fact Watch es un recibo de mantenimiento, no una comprobación de la plataforma actual. LLM Comparison Protocol es un método de comparación sin ejecutar, no una clasificación de modelos. Adversarial Project Review no es una revisión externa.',
  'fileSkillsBody': '25 Skills del proyecto con disparadores, límites y contratos de evidencia.',
  'ledgerSkills': 'Skills · 25',
  'repositorySkills': '25 Skills reutilizables · candidate',
  'skillRouteLanguagePartner': 'Quiero practicar un idioma escribiendo.',
  'skillRouteLanguagePartnerResult': 'Ejecuta un intercambio ficticio por escrito; tú escribes primero, una corrección a la vez.',
  'skillRouteInterview': 'Quiero ensayar una respuesta de entrevista.',
  'skillRouteInterviewResult': 'Entrena una respuesta cronometrada con una comprobación visible y una pregunta variada.',
  'skillLanguagePartnerName': 'Language Partner (compañero de idiomas)',
  'skillLanguagePartner': 'Ejecuta un intercambio escrito acotado en el idioma objetivo del alumno.',
  'skillInterviewName': 'Interview Rehearsal (ensayo de entrevista)',
  'skillInterview': 'Ensaya una respuesta observable con límite de tiempo.'
});
Object.assign(copy.ja, {
  'skillsTitle': '25のSkill。それぞれ役割が違います。',
  'skillIndexLink': 'Skill レジストリと全25メソッドを開く',
  'skillFootnote': 'プロジェクトの25のSkill はすべて構造チェックに合格し candidate のままです。新しいタスクのエビデンスは部分的です。Language Partner は文字会話を1回実行するだけで、言語を教えたり流暢さを約束したりしません。Interview Rehearsal は回答を1つ練習するだけで、面接問題を予測したり結果を約束したりしません。Interruption Checkpoint はタスクのレシートを保存するもので、作業の再試行や復旧は行いません。Practice Target は最初の試行を設定するもので、学習を証明するものではありません。Platform Fact Watch はメンテナンスのレシートであり、現在のプラットフォームのチェックではありません。LLM Comparison Protocol は未実行の比較メソッドであり、モデルランキングではありません。Adversarial Project Review は外部レビューではありません。',
  'fileSkillsBody': 'プロジェクトの25のSkill（トリガー、境界、エビデンス契約付き）。',
  'ledgerSkills': 'Skills · 25',
  'repositorySkills': '再利用可能な25のSkill · candidate',
  'skillRouteLanguagePartner': 'タイピングで言語を練習したい。',
  'skillRouteLanguagePartnerResult': '架空の文字会話を1回実行。先にあなたが書き、一度に1つだけ直します。',
  'skillRouteInterview': '面接の答えを1つ練習したい。',
  'skillRouteInterviewResult': '制限時間付きで1つの回答を練習し、チェックと変形質問を出します。',
  'skillLanguagePartnerName': '言語パートナー Language Partner',
  'skillLanguagePartner': '学習者の目標言語で、境界のある文字会話を1回実行する。',
  'skillInterviewName': '面接リハーサル Interview Rehearsal',
  'skillInterview': '制限時間内で観察可能な回答を1つ練習する。'
});
Object.assign(copy.ko, {
  'skillsTitle': '스물다섯 개의 Skill. 역할이 각각 다릅니다.',
  'skillIndexLink': 'Skill 레지스트리와 25개 메서드 열기',
  'skillFootnote': '프로젝트의 25개 Skill 모두 구조 검사를 통과했으며 candidate로 유지됩니다. 신규 과제 증거는 일부만 있습니다. 언어 파트너는 문자 대화를 한 번 실행할 뿐, 언어를 가르치거나 유창함을 약속하지 않습니다. 면접 리허설은 답변 하나를 코칭할 뿐, 면접 문제를 예측하거나 결과를 약속하지 않습니다. 중단 체크포인트는 과제 기록을 보존할 뿐, 작업을 재시도하거나 복구하지 않습니다. 연습 목표는 첫 시도 하나를 준비할 뿐, 학습을 증명하지 않습니다. 플랫폼 사실 관찰은 유지보수 기록이지 현재 플랫폼 점검이 아닙니다. LLM 비교 프로토콜은 실행되지 않은 비교 메서드이지 모델 순위가 아닙니다. 적대적 프로젝트 검토는 외부 검토가 아닙니다.',
  'fileSkillsBody': '트리거, 경계, 증거 계약을 갖춘 프로젝트 Skill 25개.',
  'ledgerSkills': 'Skills · 25',
  'repositorySkills': '재사용 가능한 Skill 25개 · candidate',
  'skillRouteLanguagePartner': '언어를 타이핑으로 연습하고 싶어요.',
  'skillRouteLanguagePartnerResult': '가상의 문자 대화를 한 번 실행합니다. 먼저 직접 쓰고, 한 번에 하나만 고쳐 줍니다.',
  'skillRouteInterview': '면접 답변 하나를 연습하고 싶어요.',
  'skillRouteInterviewResult': '시간 제한 안에서 확인 가능한 답변 하나를 코칭하고, 변형 질문 하나를 냅니다.',
  'skillLanguagePartnerName': '언어 파트너 Language Partner',
  'skillLanguagePartner': '학습자의 목표 언어로 경계가 있는 문자 대화를 한 번 실행합니다.',
  'skillInterviewName': '면접 리허설 Interview Rehearsal',
  'skillInterview': '시간 제한 안에서 관찰 가능한 답변 하나를 연습합니다.'
});
Object.assign(copy.de, {
  'skillsTitle': 'Fünfundzwanzig Skills. Klar getrennte Aufgaben.',
  'skillIndexLink': 'Skill-Register und alle 25 Methoden öffnen',
  'skillFootnote': 'Alle 25 Projekt-Skills bestehen die Strukturprüfungen und bleiben candidate; die Belege aus frischen Aufgaben sind lückenhaft. Language Partner führt einen schriftlichen Austausch durch; es unterrichtet keine Sprache und verspricht keine Flüssigkeit. Interview Rehearsal trainiert eine Antwort; es sagt keine Interviewfragen voraus und verspricht kein Ergebnis. Interruption Checkpoint bewahrt eine Aufgabenquittung; es wiederholt oder rettet keine Arbeit. Practice Target richtet einen ersten Versuch ein; es beweist kein Lernen. Platform Fact Watch ist eine Wartungsquittung, keine Prüfung der aktuellen Plattform. LLM Comparison Protocol ist eine nicht ausgeführte Vergleichsmethode, kein Modellranking. Adversarial Project Review ist keine externe Prüfung.',
  'fileSkillsBody': '25 Projekt-Skills mit Triggern, Grenzen und Beleg-Verträgen.',
  'ledgerSkills': 'Skills · 25',
  'repositorySkills': '25 wiederverwendbare Skills · candidate',
  'skillRouteLanguagePartner': 'Ich möchte eine Sprache schreibend üben.',
  'skillRouteLanguagePartnerResult': 'Führt einen fiktiven schriftlichen Austausch durch; Sie schreiben zuerst, immer nur eine Korrektur.',
  'skillRouteInterview': 'Ich möchte eine Interview-Antwort proben.',
  'skillRouteInterviewResult': 'Trainiert eine zeitlich begrenzte Antwort mit sichtbarem Check und einer Variante.',
  'skillLanguagePartnerName': 'Language Partner (Sprachpartner)',
  'skillLanguagePartner': 'Führt einen begrenzten schriftlichen Austausch in der Zielsprache der Lernenden durch.',
  'skillInterviewName': 'Interview Rehearsal (Gesprächsprobe)',
  'skillInterview': 'Probt eine beobachtbare Antwort unter Zeitlimit.'
});

Object.assign(copy.en, {
  skillsTitle: 'Twenty-five Skills. Distinct jobs.',
  skillIndexLink: 'Open the Skill registry and all 25 methods',
  skillFootnote: 'All 25 project Skills pass structural checks and remain candidate; fresh-task evidence is partial. Language Partner runs one typed exchange; it does not teach a language or promise fluency. Interview Rehearsal coaches one answer; it does not predict interview questions or promise an outcome. Interruption Checkpoint preserves a task receipt; it does not retry or recover work. Practice Target sets up one first attempt; it does not prove learning. Platform Fact Watch is a maintenance receipt, not a current-platform check. LLM Comparison Protocol is an unrun comparison method, not a model ranking. Adversarial Project Review is not an external review.',
  fileSkillsBody: '25 project Skills with triggers, boundaries, and evidence contracts.',
  ledgerSkills: 'Skills · 25',
  repositorySkills: '25 reusable Skills · candidate',
  skillRouteLanguagePartner: 'I want to practise a language by typing.',
  skillRouteLanguagePartnerResult: 'Runs one fictional typed exchange; you write first, one correction at a time.',
  skillRouteInterview: 'I want to rehearse one interview answer.',
  skillRouteInterviewResult: 'Coaches one timed answer with a visible check and one changed question.',
  skillLanguagePartnerName: 'Language Partner',
  skillLanguagePartner: 'Run one bounded typed exchange in the learner\'s target language.',
  skillInterviewName: 'Interview Rehearsal',
  skillInterview: 'Rehearse one observable answer under a time limit.'
});
Object.assign(copy.zh, {
  skillsTitle: '二十五个 Skill，各有职责。',
  skillIndexLink: '打开 Skill 登记表与全部 25 个方法',
  skillFootnote: '25 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整。语言伙伴只运行一次打字对话，不教语言、不承诺流利。面试演练只教练一个回答，不预测面试问题、不承诺结果。中断检查点只保留任务回执，不会重试或恢复工作。练习目标用于准备一次首次尝试，不能证明学习结果。平台事实巡检是维护记录，不是当前平台检查。LLM 比较协议尚未运行，不是模型排行榜。对抗式项目审查不代表外部评审。',
  fileSkillsBody: '25 个项目 Skill，包含触发、边界与证据契约。',
  ledgerSkills: 'Skill · 25',
  repositorySkills: '25 个可复用 Skill · candidate',
  skillRouteLanguagePartner: '我想用打字练习一门语言。',
  skillRouteLanguagePartnerResult: '运行一段虚构的打字对话；你先写，一次只纠正一处。',
  skillRouteInterview: '我想演练一个面试回答。',
  skillRouteInterviewResult: '按时间限制教练一个可检查的回答，再给一个变式问题。',
  skillLanguagePartnerName: '语言伙伴 Language Partner',
  skillLanguagePartner: '在目标语言中运行一段有边界的打字对话。',
  skillInterviewName: '面试演练 Interview Rehearsal',
  skillInterview: '在时间限制下演练一个可观察的回答。'
});
Object.assign(copy.es, {
  skillsTitle: 'Veinticinco Skills. Trabajos distintos.',
  skillIndexLink: 'Abrir el registro de Skills y los 25 métodos',
  skillFootnote: 'Los 25 Skills del proyecto pasan las comprobaciones estructurales y siguen siendo candidate; la evidencia de tareas nuevas es parcial. Language Partner ejecuta un intercambio escrito; no enseña un idioma ni promete fluidez. Interview Rehearsal entrena una respuesta; no predice preguntas de entrevista ni promete un resultado. Interruption Checkpoint conserva un recibo de tarea; no reintenta ni recupera trabajo. Practice Target prepara un primer intento; no demuestra aprendizaje. Platform Fact Watch es un recibo de mantenimiento, no una comprobación de la plataforma actual. LLM Comparison Protocol es un método de comparación sin ejecutar, no una clasificación de modelos. Adversarial Project Review no es una revisión externa.',
  fileSkillsBody: '25 Skills del proyecto con disparadores, límites y contratos de evidencia.',
  ledgerSkills: 'Skills · 25',
  repositorySkills: '25 Skills reutilizables · candidate',
  skillRouteLanguagePartner: 'Quiero practicar un idioma escribiendo.',
  skillRouteLanguagePartnerResult: 'Ejecuta un intercambio ficticio por escrito; tú escribes primero, una corrección a la vez.',
  skillRouteInterview: 'Quiero ensayar una respuesta de entrevista.',
  skillRouteInterviewResult: 'Entrena una respuesta cronometrada con una comprobación visible y una pregunta variada.',
  skillLanguagePartnerName: 'Language Partner (compañero de idiomas)',
  skillLanguagePartner: 'Ejecuta un intercambio escrito acotado en el idioma objetivo del alumno.',
  skillInterviewName: 'Interview Rehearsal (ensayo de entrevista)',
  skillInterview: 'Ensaya una respuesta observable con límite de tiempo.'
});
Object.assign(copy.ja, {
  skillsTitle: '25のSkill。それぞれ役割が違います。',
  skillIndexLink: 'Skill レジストリと全25メソッドを開く',
  skillFootnote: 'プロジェクトの25のSkill はすべて構造チェックに合格し candidate のままです。新しいタスクのエビデンスは部分的です。Language Partner は文字会話を1回実行するだけで、言語を教えたり流暢さを約束したりしません。Interview Rehearsal は回答を1つ練習するだけで、面接問題を予測したり結果を約束したりしません。Interruption Checkpoint はタスクのレシートを保存するもので、作業の再試行や復旧は行いません。Practice Target は最初の試行を設定するもので、学習を証明するものではありません。Platform Fact Watch はメンテナンスのレシートであり、現在のプラットフォームのチェックではありません。LLM Comparison Protocol は未実行の比較メソッドであり、モデルランキングではありません。Adversarial Project Review は外部レビューではありません。',
  fileSkillsBody: 'プロジェクトの25のSkill（トリガー、境界、エビデンス契約付き）。',
  ledgerSkills: 'Skills · 25',
  repositorySkills: '再利用可能な25のSkill · candidate',
  skillRouteLanguagePartner: 'タイピングで言語を練習したい。',
  skillRouteLanguagePartnerResult: '架空の文字会話を1回実行。先にあなたが書き、一度に1つだけ直します。',
  skillRouteInterview: '面接の答えを1つ練習したい。',
  skillRouteInterviewResult: '制限時間付きで1つの回答を練習し、チェックと変形質問を出します。',
  skillLanguagePartnerName: '言語パートナー Language Partner',
  skillLanguagePartner: '学習者の目標言語で、境界のある文字会話を1回実行する。',
  skillInterviewName: '面接リハーサル Interview Rehearsal',
  skillInterview: '制限時間内で観察可能な回答を1つ練習する。'
});
Object.assign(copy.ko, {
  skillsTitle: '스물다섯 개의 Skill. 역할이 각각 다릅니다.',
  skillIndexLink: 'Skill 레지스트리와 25개 메서드 열기',
  skillFootnote: '프로젝트의 25개 Skill 모두 구조 검사를 통과했으며 candidate로 유지됩니다. 신규 과제 증거는 일부만 있습니다. 언어 파트너는 문자 대화를 한 번 실행할 뿐, 언어를 가르치거나 유창함을 약속하지 않습니다. 면접 리허설은 답변 하나를 코칭할 뿐, 면접 문제를 예측하거나 결과를 약속하지 않습니다. 중단 체크포인트는 과제 기록을 보존할 뿐, 작업을 재시도하거나 복구하지 않습니다. 연습 목표는 첫 시도 하나를 준비할 뿐, 학습을 증명하지 않습니다. 플랫폼 사실 관찰은 유지보수 기록이지 현재 플랫폼 점검이 아닙니다. LLM 비교 프로토콜은 실행되지 않은 비교 메서드이지 모델 순위가 아닙니다. 적대적 프로젝트 검토는 외부 검토가 아닙니다.',
  fileSkillsBody: '트리거, 경계, 증거 계약을 갖춘 프로젝트 Skill 25개.',
  ledgerSkills: 'Skills · 25',
  repositorySkills: '재사용 가능한 Skill 25개 · candidate',
  skillRouteLanguagePartner: '언어를 타이핑으로 연습하고 싶어요.',
  skillRouteLanguagePartnerResult: '가상의 문자 대화를 한 번 실행합니다. 먼저 직접 쓰고, 한 번에 하나만 고쳐 줍니다.',
  skillRouteInterview: '면접 답변 하나를 연습하고 싶어요.',
  skillRouteInterviewResult: '시간 제한 안에서 확인 가능한 답변 하나를 코칭하고, 변형 질문 하나를 냅니다.',
  skillLanguagePartnerName: '언어 파트너 Language Partner',
  skillLanguagePartner: '학습자의 목표 언어로 경계가 있는 문자 대화를 한 번 실행합니다.',
  skillInterviewName: '면접 리허설 Interview Rehearsal',
  skillInterview: '시간 제한 안에서 관찰 가능한 답변 하나를 연습합니다.'
});
Object.assign(copy.de, {
  skillsTitle: 'Fünfundzwanzig Skills. Klar getrennte Aufgaben.',
  skillIndexLink: 'Skill-Register und alle 25 Methoden öffnen',
  skillFootnote: 'Alle 25 Projekt-Skills bestehen die Strukturprüfungen und bleiben candidate; die Belege aus frischen Aufgaben sind lückenhaft. Language Partner führt einen schriftlichen Austausch durch; es unterrichtet keine Sprache und verspricht keine Flüssigkeit. Interview Rehearsal trainiert eine Antwort; es sagt keine Interviewfragen voraus und verspricht kein Ergebnis. Interruption Checkpoint bewahrt eine Aufgabenquittung; es wiederholt oder rettet keine Arbeit. Practice Target richtet einen ersten Versuch ein; es beweist kein Lernen. Platform Fact Watch ist eine Wartungsquittung, keine Prüfung der aktuellen Plattform. LLM Comparison Protocol ist eine nicht ausgeführte Vergleichsmethode, kein Modellranking. Adversarial Project Review ist keine externe Prüfung.',
  fileSkillsBody: '25 Projekt-Skills mit Triggern, Grenzen und Beleg-Verträgen.',
  ledgerSkills: 'Skills · 25',
  repositorySkills: '25 wiederverwendbare Skills · candidate',
  skillRouteLanguagePartner: 'Ich möchte eine Sprache schreibend üben.',
  skillRouteLanguagePartnerResult: 'Führt einen fiktiven schriftlichen Austausch durch; Sie schreiben zuerst, immer nur eine Korrektur.',
  skillRouteInterview: 'Ich möchte eine Interview-Antwort proben.',
  skillRouteInterviewResult: 'Trainiert eine zeitlich begrenzte Antwort mit sichtbarem Check und einer Variante.',
  skillLanguagePartnerName: 'Language Partner (Sprachpartner)',
  skillLanguagePartner: 'Führt einen begrenzten schriftlichen Austausch in der Zielsprache der Lernenden durch.',
  skillInterviewName: 'Interview Rehearsal (Gesprächsprobe)',
  skillInterview: 'Probt eine beobachtbare Antwort unter Zeitlimit.'
});

Object.assign(copy.en, {
  githubBadge: 'GitHub',
  githubBadgeAria: 'View project on GitHub'
});
Object.assign(copy.zh, {
  githubBadge: 'GitHub',
  githubBadgeAria: '在 GitHub 上查看项目'
});
Object.assign(copy.es, {
  githubBadge: 'GitHub',
  githubBadgeAria: 'Ver proyecto en GitHub'
});
Object.assign(copy.ja, {
  githubBadge: 'GitHub',
  githubBadgeAria: 'GitHub でプロジェクトを見る'
});
Object.assign(copy.ko, {
  githubBadge: 'GitHub',
  githubBadgeAria: 'GitHub에서 프로젝트 보기'
});
Object.assign(copy.de, {
  githubBadge: 'GitHub',
  githubBadgeAria: 'Projekt auf GitHub ansehen'
});

Object.assign(copy.en, {
  wizardEyebrow: 'Pick today\'s goal',
  wizardTitle: 'What do you want to get done today?',
  wizardIntro: 'Choose one goal, fill the smallest form, and copy a ready-to-use prompt. No account, no files, no setup — paste it into any chat model.',
  wizardStepOne: '1 · Choose a goal',
  wizardStepTwo: '2 · Add details',
  wizardStepThree: '3 · Copy your prompt',
  wizardGoalLanguage: 'Practise a language',
  wizardGoalWork: 'Write a work update',
  wizardGoalResearch: 'Check a research claim',
  wizardGoalInterview: 'Rehearse an interview answer',
  wizardGoalTask: 'Turn a task into a clear request',
  wizardGoalCodex: 'Start learning Codex',
  wizardBack: 'Back',
  wizardNext: 'Build my prompt',
  wizardCopy: 'Copy prompt',
  wizardCopied: 'Copied. Paste it into any chat model.',
  wizardReset: 'Start over',
  wizardPathLabel: 'Go deeper',
  wizardPromptLabel: 'Your ready-to-use prompt',
  wizardBoundary: 'One copied prompt is a practice attempt, not proof of learning, fluency, research quality, or model behaviour.'
});
Object.assign(copy.zh, {
  wizardEyebrow: '选择今天的目标',
  wizardTitle: '你今天想完成什么？',
  wizardIntro: '选一个目标，填写最少的字段，复制一条立即可用的提示词。无需账号、文件或配置——粘贴到任意聊天模型即可。',
  wizardStepOne: '1 · 选择目标',
  wizardStepTwo: '2 · 补充细节',
  wizardStepThree: '3 · 复制提示词',
  wizardGoalLanguage: '练习一门语言',
  wizardGoalWork: '写一条工作更新',
  wizardGoalResearch: '核查一条研究主张',
  wizardGoalInterview: '演练一个面试回答',
  wizardGoalTask: '把任务变成清晰请求',
  wizardGoalCodex: '开始学习 Codex',
  wizardBack: '返回',
  wizardNext: '生成提示词',
  wizardCopy: '复制提示词',
  wizardCopied: '已复制。粘贴到任意聊天模型即可。',
  wizardReset: '重新开始',
  wizardPathLabel: '深入学习',
  wizardPromptLabel: '你的立即可用提示词',
  wizardBoundary: '一条复制的提示词只是一次练习尝试，不证明学习、流利、研究质量或模型行为。'
});
Object.assign(copy.es, {
  wizardEyebrow: 'Elige tu objetivo de hoy',
  wizardTitle: '¿Qué quieres conseguir hoy?',
  wizardIntro: 'Elige un objetivo, completa el formulario más pequeño y copia un prompt listo para usar. Sin cuenta, sin archivos, sin configuración: pégalo en cualquier modelo de chat.',
  wizardStepOne: '1 · Elige un objetivo',
  wizardStepTwo: '2 · Añade los detalles',
  wizardStepThree: '3 · Copia tu prompt',
  wizardGoalLanguage: 'Practicar un idioma',
  wizardGoalWork: 'Escribir una actualización de trabajo',
  wizardGoalResearch: 'Verificar una afirmación de investigación',
  wizardGoalInterview: 'Ensayar una respuesta de entrevista',
  wizardGoalTask: 'Convertir una tarea en una petición clara',
  wizardGoalCodex: 'Empezar a aprender Codex',
  wizardBack: 'Atrás',
  wizardNext: 'Crear mi prompt',
  wizardCopy: 'Copiar prompt',
  wizardCopied: 'Copiado. Pégalo en cualquier modelo de chat.',
  wizardReset: 'Empezar de nuevo',
  wizardPathLabel: 'Profundizar',
  wizardPromptLabel: 'Tu prompt listo para usar',
  wizardBoundary: 'Un prompt copiado es un intento de práctica, no una prueba de aprendizaje, fluidez, calidad de investigación o comportamiento del modelo.'
});
Object.assign(copy.ja, {
  wizardEyebrow: '今日の目標を選ぶ',
  wizardTitle: '今日は何を成し遂げたいですか？',
  wizardIntro: '目標を一つ選び、最小限の項目を埋めて、すぐ使えるプロンプトをコピーします。アカウントもファイルも設定も不要で、任意のチャットモデルに貼り付けるだけです。',
  wizardStepOne: '1 · 目標を選ぶ',
  wizardStepTwo: '2 · 詳細を入力',
  wizardStepThree: '3 · プロンプトをコピー',
  wizardGoalLanguage: '言語を練習する',
  wizardGoalWork: '仕事の更新を書く',
  wizardGoalResearch: '研究の主張を確認する',
  wizardGoalInterview: '面接の回答を練習する',
  wizardGoalTask: 'タスクを明確な依頼にする',
  wizardGoalCodex: 'Codex を学び始める',
  wizardBack: '戻る',
  wizardNext: 'プロンプトを作成',
  wizardCopy: 'プロンプトをコピー',
  wizardCopied: 'コピーしました。任意のチャットモデルに貼り付けてください。',
  wizardReset: '最初から',
  wizardPathLabel: 'さらに学ぶ',
  wizardPromptLabel: 'すぐ使えるプロンプト',
  wizardBoundary: 'コピーしたプロンプトは練習の試行であり、学習・流暢さ・調査品質・モデルの挙動の証明ではありません。'
});
Object.assign(copy.ko, {
  wizardEyebrow: '오늘의 목표 고르기',
  wizardTitle: '오늘 무엇을 이루고 싶나요?',
  wizardIntro: '목표 하나를 고르고, 최소한의 항목만 채운 뒤 바로 쓸 수 있는 프롬프트를 복사하세요. 계정도 파일도 설정도 필요 없습니다. 아무 채팅 모델에 붙여넣으면 됩니다.',
  wizardStepOne: '1 · 목표 고르기',
  wizardStepTwo: '2 · 세부 정보 입력',
  wizardStepThree: '3 · 프롬프트 복사',
  wizardGoalLanguage: '언어 연습하기',
  wizardGoalWork: '업무 업데이트 작성하기',
  wizardGoalResearch: '연구 주장 확인하기',
  wizardGoalInterview: '면접 답변 연습하기',
  wizardGoalTask: '작업을 명확한 요청으로 만들기',
  wizardGoalCodex: 'Codex 배우기 시작하기',
  wizardBack: '뒤로',
  wizardNext: '프롬프트 만들기',
  wizardCopy: '프롬프트 복사',
  wizardCopied: '복사되었습니다. 아무 채팅 모델에 붙여넣으세요.',
  wizardReset: '다시 시작',
  wizardPathLabel: '더 깊이 배우기',
  wizardPromptLabel: '바로 쓸 수 있는 프롬프트',
  wizardBoundary: '복사한 프롬프트는 연습 시도일 뿐, 학습·유창함·연구 품질·모델 동작을 증명하지 않습니다.'
});
Object.assign(copy.de, {
  wizardEyebrow: 'Wähle dein heutiges Ziel',
  wizardTitle: 'Was möchtest du heute erreichen?',
  wizardIntro: 'Wähle ein Ziel, fülle das kleinste Formular aus und kopiere einen sofort nutzbaren Prompt. Kein Konto, keine Dateien, keine Einrichtung — füge ihn in ein beliebiges Chat-Modell ein.',
  wizardStepOne: '1 · Ziel wählen',
  wizardStepTwo: '2 · Details ergänzen',
  wizardStepThree: '3 · Prompt kopieren',
  wizardGoalLanguage: 'Eine Sprache üben',
  wizardGoalWork: 'Ein Arbeits-Update schreiben',
  wizardGoalResearch: 'Eine Forschungsaussage prüfen',
  wizardGoalInterview: 'Eine Interview-Antwort proben',
  wizardGoalTask: 'Eine Aufgabe in eine klare Anfrage verwandeln',
  wizardGoalCodex: 'Mit dem Lernen von Codex beginnen',
  wizardBack: 'Zurück',
  wizardNext: 'Prompt erstellen',
  wizardCopy: 'Prompt kopieren',
  wizardCopied: 'Kopiert. Füge ihn in ein beliebiges Chat-Modell ein.',
  wizardReset: 'Neu starten',
  wizardPathLabel: 'Tiefer einsteigen',
  wizardPromptLabel: 'Dein sofort nutzbarer Prompt',
  wizardBoundary: 'Ein kopierter Prompt ist ein Übungsversuch, kein Beweis für Lernen, Sprachgewandtheit, Recherchequalität oder Modellverhalten.'
});

Object.assign(copy.en, {
  wizardGoalLanguageOutcome: 'You get a four-turn practice prompt that waits for your answer.',
  wizardGoalWorkOutcome: 'You get a bounded update prompt that protects the facts you provide.',
  wizardGoalResearchOutcome: 'You get a source-check prompt that separates evidence from guesses.',
  wizardGoalInterviewOutcome: 'You get one timed rehearsal prompt with a visible self-check.',
  wizardGoalTaskOutcome: 'You get a compact task contract before an AI or tool starts acting.',
  wizardGoalCodexOutcome: 'You get a safe text-only first exercise and a route into the coding track.'
});
Object.assign(copy.zh, {
  wizardGoalLanguageOutcome: '得到一条四轮练习提示词，模型会等待你自己作答。',
  wizardGoalWorkOutcome: '得到一条有边界的工作更新提示词，保护你提供的事实。',
  wizardGoalResearchOutcome: '得到一条来源核查提示词，区分证据与猜测。',
  wizardGoalInterviewOutcome: '得到一条带可见自检的限时演练提示词。',
  wizardGoalTaskOutcome: '在 AI 或工具行动前，得到一份简明任务协议。',
  wizardGoalCodexOutcome: '得到一个安全的纯文字首练习，并进入编程实践路线。'
});
Object.assign(copy.es, {
  wizardGoalLanguageOutcome: 'Obtienes un prompt de práctica de cuatro turnos que espera tu respuesta.',
  wizardGoalWorkOutcome: 'Obtienes un prompt de actualización acotado que protege los hechos que aportas.',
  wizardGoalResearchOutcome: 'Obtienes un prompt para comprobar fuentes y separar evidencia de conjeturas.',
  wizardGoalInterviewOutcome: 'Obtienes un prompt para un ensayo cronometrado con una comprobación visible.',
  wizardGoalTaskOutcome: 'Obtienes un contrato de tarea breve antes de que una IA o herramienta actúe.',
  wizardGoalCodexOutcome: 'Obtienes un primer ejercicio seguro solo de texto y una ruta hacia la práctica de código.'
});
Object.assign(copy.ja, {
  wizardGoalLanguageOutcome: 'あなたの回答を待つ、4ターンの練習プロンプトが得られます。',
  wizardGoalWorkOutcome: 'あなたが示した事実を守る、範囲のある更新用プロンプトが得られます。',
  wizardGoalResearchOutcome: '根拠と推測を分ける、情報源確認用プロンプトが得られます。',
  wizardGoalInterviewOutcome: '見える自己チェック付きの、時間制限のある練習プロンプトが得られます。',
  wizardGoalTaskOutcome: 'AI やツールが動く前に、簡潔なタスク契約が得られます。',
  wizardGoalCodexOutcome: '安全なテキストだけの初回演習と、コーディング実践への入口が得られます。'
});
Object.assign(copy.ko, {
  wizardGoalLanguageOutcome: '내 답변을 기다리는 4턴 연습 프롬프트를 받습니다.',
  wizardGoalWorkOutcome: '내가 제공한 사실을 지키는 범위 있는 업무 업데이트 프롬프트를 받습니다.',
  wizardGoalResearchOutcome: '증거와 추측을 구분하는 출처 확인 프롬프트를 받습니다.',
  wizardGoalInterviewOutcome: '눈에 보이는 자기 점검이 있는 시간제한 연습 프롬프트를 받습니다.',
  wizardGoalTaskOutcome: 'AI나 도구가 행동하기 전에 간결한 작업 계약을 받습니다.',
  wizardGoalCodexOutcome: '안전한 텍스트 전용 첫 연습과 코딩 실습 경로를 받습니다.'
});
Object.assign(copy.de, {
  wizardGoalLanguageOutcome: 'Du erhältst einen Übungsprompt mit vier Runden, der auf deine Antwort wartet.',
  wizardGoalWorkOutcome: 'Du erhältst einen begrenzten Update-Prompt, der die von dir genannten Fakten schützt.',
  wizardGoalResearchOutcome: 'Du erhältst einen Prompt zur Quellenprüfung, der Belege von Vermutungen trennt.',
  wizardGoalInterviewOutcome: 'Du erhältst einen zeitlich begrenzten Übungsprompt mit sichtbarem Selbstcheck.',
  wizardGoalTaskOutcome: 'Du erhältst einen kompakten Aufgabenvertrag, bevor eine KI oder ein Tool handelt.',
  wizardGoalCodexOutcome: 'Du erhältst eine sichere erste Textübung und einen Weg zur Programmierpraxis.'
});

// Goal wizard: pick a goal, fill the smallest form, copy a ready-to-use prompt.
const goalTemplates = window.GOAL_TEMPLATES || {};
const goalWizard = document.querySelector('[data-goal-wizard]');
let wizardState = { goal: null };
const wizardGoalKeys = ['language', 'work', 'research', 'interview', 'task', 'codex'];
const goalTemplateFor = (goalKey) => (
  goalTemplates.goals?.[currentLanguage]?.[goalKey]
  || goalTemplates.goals?.en?.[goalKey]
  // Preserve compatibility with an earlier, flat generated template shape.
  || goalTemplates[currentLanguage]?.[goalKey]
  || goalTemplates.en?.[goalKey]
);

// A first-time reader comes here with a purpose, not a need to inspect the
// repository. Keep the catalogue available, but put it after the first useful
// result instead of between the hero and the action that the hero promises.
const projectMap = document.querySelector('#project-map');
const startSection = document.querySelector('#start');
if (projectMap && startSection) startSection.after(projectMap);

function wizardCopyKey(goalKey) {
  return { language: 'wizardGoalLanguage', work: 'wizardGoalWork', research: 'wizardGoalResearch', interview: 'wizardGoalInterview', task: 'wizardGoalTask', codex: 'wizardGoalCodex' }[goalKey] || 'wizardGoalLanguage';
}

function wizardOutcomeKey(goalKey) {
  return {
    language: 'wizardGoalLanguageOutcome', work: 'wizardGoalWorkOutcome',
    research: 'wizardGoalResearchOutcome', interview: 'wizardGoalInterviewOutcome',
    task: 'wizardGoalTaskOutcome', codex: 'wizardGoalCodexOutcome',
  }[goalKey] || 'wizardGoalLanguageOutcome';
}

function renderGoalOptions() {
  const container = document.querySelector('[data-goal-options]');
  if (!container) return;
  container.replaceChildren();
  const copyTable = currentCopy();
  wizardGoalKeys.forEach((key, index) => {
    const goal = goalTemplateFor(key);
    if (!goal) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'goal-wizard-option';
    button.dataset.goalKey = key;
    const num = document.createElement('span');
    num.className = 'goal-wizard-option-num';
    num.textContent = String(index + 1).padStart(2, '0');
    const label = document.createElement('strong');
    label.textContent = copyTable[wizardCopyKey(key)] || key;
    const outcome = document.createElement('small');
    outcome.textContent = copyTable[wizardOutcomeKey(key)] || 'A ready-to-use prompt and one next step.';
    button.append(num, label, outcome);
    button.addEventListener('click', () => {
      wizardState.goal = key;
      renderGoalFields();
    });
    container.append(button);
  });
}

function renderGoalFields() {
  const goal = goalTemplateFor(wizardState.goal);
  if (!goal) return;
  const fieldsBox = document.querySelector('[data-goal-fields]');
  fieldsBox.replaceChildren();
  goal.fields.forEach((field) => {
    const wrap = document.createElement('label');
    wrap.className = 'goal-wizard-field';
    const label = document.createElement('span');
    label.textContent = field.label;
    const input = document.createElement(field.key === 'facts' ? 'textarea' : 'input');
    if (input.tagName === 'TEXTAREA') { input.rows = 3; }
    else { input.type = 'text'; }
    input.placeholder = field.placeholder || '';
    input.dataset.fieldKey = field.key;
    input.required = true;
    wrap.append(label, input);
    fieldsBox.append(wrap);
  });
  showWizardPanel('fields');
  const first = fieldsBox.querySelector('input, textarea');
  if (first) first.focus();
}

function buildGoalPrompt() {
  const goal = goalTemplateFor(wizardState.goal);
  if (!goal) return '';
  let prompt = goal.template;
  document.querySelectorAll('[data-goal-fields] [data-field-key]').forEach((input) => {
    const value = input.value.trim();
    prompt = prompt.split('{' + input.dataset.fieldKey + '}').join(value || '[missing]');
  });
  return prompt;
}

function showWizardPanel(name) {
  document.querySelectorAll('[data-wizard-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.wizardPanel !== name;
  });
  document.querySelectorAll('[data-wizard-step-indicator]').forEach((indicator) => {
    const step = Number(indicator.dataset.wizardStepIndicator);
    const active = (name === 'goals' && step === 1) || (name === 'fields' && step === 2) || (name === 'prompt' && step === 3);
    indicator.classList.toggle('is-active', active);
  });
}

function renderGoalPrompt() {
  const prompt = buildGoalPrompt();
  const pre = document.querySelector('[data-goal-prompt]');
  pre.textContent = prompt;
  const goal = goalTemplateFor(wizardState.goal);
  const pathLink = document.querySelector('[data-goal-path]');
  if (goal && goal.path) {
    const contentId = canonicalContentId(contentIdForHref(goal.path));
    const path = contentId ? localizedContentHref(contentId, goal.path) : goal.path;
    pathLink.setAttribute('href', pagesHref(path));
  }
  const status = document.querySelector('[data-goal-copy-status]');
  if (status) status.textContent = '';
  showWizardPanel('prompt');
}

function initGoalWizard() {
  if (!goalWizard) return;
  renderGoalOptions();
  const form = document.querySelector('[data-goal-form]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderGoalPrompt();
  });
  const back = document.querySelector('[data-wizard-back]');
  back.addEventListener('click', () => {
    if (wizardState.goal) { wizardState.goal = null; renderGoalOptions(); }
    showWizardPanel('goals');
  });
  const reset = document.querySelector('[data-wizard-reset]');
  reset.addEventListener('click', () => {
    wizardState.goal = null;
    document.querySelector('[data-goal-form]').reset();
    renderGoalOptions();
    showWizardPanel('goals');
  });
  const copy = document.querySelector('[data-goal-copy]');
  copy.addEventListener('click', async () => {
    const prompt = document.querySelector('[data-goal-prompt]').textContent;
    const status = document.querySelector('[data-goal-copy-status]');
    try {
      await navigator.clipboard.writeText(prompt);
      if (status) status.textContent = currentCopy().wizardCopied || 'Copied.';
    } catch (_) {
      if (status) status.textContent = 'Copy failed. Select the prompt text manually.';
    }
  });
}

function refreshGoalWizardForLanguage() {
  if (!goalWizard) return;
  const activePanel = document.querySelector('[data-wizard-panel]:not([hidden])')?.dataset.wizardPanel;
  if (!wizardState.goal || activePanel === 'goals') {
    renderGoalOptions();
    return;
  }
  // A language change intentionally starts this small, disposable form again;
  // retaining entered text while changing the prompt language would be more
  // surprising than useful and could mix languages inside the result.
  wizardState.goal = null;
  renderGoalOptions();
  showWizardPanel('goals');
}

initGoalWizard();
Object.assign(copy.en, {
  heroIndex: 'A TEXTBOOK FOR USING LLMS',
  heroEyebrow: 'Start at Chapter 0 · read chapter by chapter',
  heroTitle: 'What are LLMs, and how do you use them well?',
  heroLede: 'This is a textbook: Chapter 0 explains what a large language model is, then each chapter teaches one layer of using it - tasks, context, tools, verification. Read in order, do the small experiments, and learn to check what a model tells you.',
  heroPrimary: 'Start Chapter 0: what is a large language model',
  heroSecondary: 'Read the table of contents',
  heroRouteKicker: 'One reading path - follow it from the start',
  heroRouteLessonZero: '0 · Chapter 0: what an LLM is',
  heroRouteLessonZeroBody: '20 minutes. Tokens, context, capabilities, and the honest limits.',
  heroRouteChapterOne: '1 · Chapter 1: GPT before Codex',
  heroRouteChapterOneBody: 'Separate a model, a tool, and an agent before trusting either.',
  heroRouteChapterTwo: '2 · Chapter 2: your first safe task',
  heroRouteChapterTwoBody: 'One small task, one visible check, one receipt.'
});
Object.assign(copy.zh, {
  heroIndex: 'LLM 使用教科书',
  heroEyebrow: '从第 0 章开始 · 逐章阅读',
  heroTitle: '大语言模型是什么，以及如何用好它？',
  heroLede: '这是一本教科书：第 0 章讲清什么是大语言模型，随后每章教授使用它的一个层次——任务、上下文、工具、验证。按顺序阅读，做小实验，学会检查模型告诉你的一切。',
  heroPrimary: '开始第 0 章：什么是大语言模型',
  heroSecondary: '查看完整目录',
  heroRouteKicker: '一条阅读主线——从头开始',
  heroRouteLessonZero: '0 · 第 0 章：LLM 是什么',
  heroRouteLessonZeroBody: '20 分钟。token、上下文、能力与诚实的边界。',
  heroRouteChapterOne: '1 · 第 1 章：先理解 GPT，再理解 Codex',
  heroRouteChapterOneBody: '在信任之前，分清模型、工具与 Agent。',
  heroRouteChapterTwo: '2 · 第 2 章：你的第一个安全任务',
  heroRouteChapterTwoBody: '一个小任务、一个可见检查、一份回执。'
});
Object.assign(copy.es, {
  heroIndex: 'UN MANUAL PARA USAR LLMs',
  heroEyebrow: 'Empieza en el Capítulo 0 · lee capítulo a capítulo',
  heroTitle: '¿Qué son los LLM y cómo usarlos bien?',
  heroLede: 'Esto es un manual: el Capítulo 0 explica qué es un modelo de lenguaje grande, y cada capítulo enseña una capa de su uso: tareas, contexto, herramientas, verificación. Lee en orden, haz los pequeños experimentos y aprende a comprobar lo que el modelo te dice.',
  heroPrimary: 'Empezar el Capítulo 0: qué es un LLM',
  heroSecondary: 'Leer el índice completo',
  heroRouteKicker: 'Una sola ruta de lectura: síguela desde el principio',
  heroRouteLessonZero: '0 · Capítulo 0: qué es un LLM',
  heroRouteLessonZeroBody: '20 minutos. Tokens, contexto, capacidades y los límites honestos.',
  heroRouteChapterOne: '1 · Capítulo 1: GPT antes de Codex',
  heroRouteChapterOneBody: 'Separa un modelo, una herramienta y un agente antes de confiar en ellos.',
  heroRouteChapterTwo: '2 · Capítulo 2: tu primera tarea segura',
  heroRouteChapterTwoBody: 'Una tarea pequeña, una comprobación visible, un recibo.'
});
Object.assign(copy.ja, {
  heroIndex: 'LLM を使いこなすための教科書',
  heroEyebrow: '第0章から始める · 章ごとに読む',
  heroTitle: '大規模言語モデルとは何か、そしてどう使えばよいのか？',
  heroLede: 'これは教科書です。第0章で大規模言語モデルとは何かを説明し、各章で使い方の層——タスク、コンテキスト、ツール、検証——を一つずつ教えます。順番に読み、小さな実験をやり、モデルが伝えることを確認する習慣を身につけてください。',
  heroPrimary: '第0章を始める：LLM とは何か',
  heroSecondary: '目次を読む',
  heroRouteKicker: '一つの読書経路——最初からたどる',
  heroRouteLessonZero: '0 · 第0章：LLM とは',
  heroRouteLessonZeroBody: '20分。トークン、コンテキスト、能力、そして正直な限界。',
  heroRouteChapterOne: '1 · 第1章：Codex より先に GPT を理解する',
  heroRouteChapterOneBody: 'モデル・ツール・エージェントを区別してから信頼する。',
  heroRouteChapterTwo: '2 · 第2章：最初の安全なタスク',
  heroRouteChapterTwoBody: '小さなタスク、見えるチェック、レシート。'
});
Object.assign(copy.ko, {
  heroIndex: 'LLM 사용 교과서',
  heroEyebrow: '0장부터 시작 · 장마다 읽기',
  heroTitle: 'LLM이란 무엇이고, 어떻게 잘 쓸까?',
  heroLede: '이것은 교과서입니다. 0장에서 대규모 언어 모델이 무엇인지 설명하고, 각 장에서 사용의 한 층(과제, 컨텍스트, 도구, 검증)을 가르칩니다. 순서대로 읽고, 작은 실험을 하고, 모델이 말하는 것을 확인하는 습관을 기르세요.',
  heroPrimary: '0장 시작하기: LLM이란 무엇인가',
  heroSecondary: '전체 목차 읽기',
  heroRouteKicker: '하나의 읽기 경로 — 처음부터 따라가기',
  heroRouteLessonZero: '0 · 0장: LLM이란',
  heroRouteLessonZeroBody: '20분. 토큰, 컨텍스트, 능력, 그리고 정직한 한계.',
  heroRouteChapterOne: '1 · 1장: Codex 전에 GPT 이해하기',
  heroRouteChapterOneBody: '모델·도구·에이전트를 구분한 뒤 신뢰하세요.',
  heroRouteChapterTwo: '2 · 2장: 첫 번째 안전한 과제',
  heroRouteChapterTwoBody: '작은 과제 하나, 보이는 확인 하나, 영수증 하나.'
});
Object.assign(copy.de, {
  heroIndex: 'EIN LEHRBUCH FÜR DEN LLM-EINSATZ',
  heroEyebrow: 'Beginne mit Kapitel 0 · lies Kapitel für Kapitel',
  heroTitle: 'Was sind LLMs und wie nutzt man sie gut?',
  heroLede: 'Dies ist ein Lehrbuch: Kapitel 0 erklärt, was ein großes Sprachmodell ist, und jedes Kapitel lehrt eine Ebene seiner Nutzung - Aufgaben, Kontext, Werkzeuge, Verifikation. Lies der Reihe nach, mach die kleinen Experimente und lerne, zu prüfen, was ein Modell dir sagt.',
  heroPrimary: 'Kapitel 0 beginnen: Was ist ein LLM',
  heroSecondary: 'Inhaltsverzeichnis lesen',
  heroRouteKicker: 'Ein Lese-Pfad - von Anfang an folgen',
  heroRouteLessonZero: '0 · Kapitel 0: Was ist ein LLM',
  heroRouteLessonZeroBody: '20 Minuten. Tokens, Kontext, Fähigkeiten und die ehrlichen Grenzen.',
  heroRouteChapterOne: '1 · Kapitel 1: GPT vor Codex verstehen',
  heroRouteChapterOneBody: 'Trenne Modell, Werkzeug und Agent, bevor du ihnen vertraust.',
  heroRouteChapterTwo: '2 · Kapitel 2: deine erste sichere Aufgabe',
  heroRouteChapterTwoBody: 'Eine kleine Aufgabe, ein sichtbarer Check, eine Quittung.'
});

Object.assign(copy.en, {
  heroRouteBoundary: 'Read in order. Chapter 0 and Chapter 1 lead into one book-length path — not a menu to choose from.'
});
Object.assign(copy.zh, {
  heroRouteBoundary: '按顺序阅读。第 0 章与第 1 章通向同一条完整主线——不是让你选择的菜单。'
});
Object.assign(copy.es, {
  heroRouteBoundary: 'Lee en orden. El Capítulo 0 y el Capítulo 1 llevan a un único recorrido por el libro, no a un menú para elegir.'
});
Object.assign(copy.ja, {
  heroRouteBoundary: '順番に読みましょう。第0章と第1章は、本全体へ続く一つの道です——選ぶためのメニューではありません。'
});
Object.assign(copy.ko, {
  heroRouteBoundary: '순서대로 읽으세요. 0장과 1장은 책 전체로 이어지는 하나의 길입니다 — 고르는 메뉴가 아닙니다.'
});
Object.assign(copy.de, {
  heroRouteBoundary: 'Lies der Reihe nach. Kapitel 0 und Kapitel 1 führen in einen einzigen Weg durch das Buch — kein Menü zum Auswählen.'
});

// Keep the reader-facing homepage focused on learning. Detailed evidence and
// release records remain available in the linked governance material.
Object.assign(copy.en, {
  heroProofStatus: 'Try it in your own chat',
  repositoryStripIntro: 'Start with the lesson, then use the exercises and reusable methods when you are ready to practise.',
  repositoryChapters: '22 chapters, from foundations to reliable work',
  repositoryLabs: '18 guided exercises for safe practice',
  repositorySkills: '25 reusable methods for recurring work',
  repositoryDocs: 'Sources, contribution guides, and project notes',
  fileChaptersBody: '22 chapters that build the method step by step.',
  fileLabsTitle: 'Guided practice',
  fileLabsBody: '18 low-risk exercises with clear checks and reflection.',
  localeTitle: 'Read in your language',
  localeIntro: 'Choose the language you read most naturally. Each route stays in that language as you move through the book.',
  localeEnglish: 'English', localeChinese: 'Simplified Chinese', localeSpanish: 'Spanish', localeGerman: 'German', localeJapanese: 'Japanese', localeKorean: 'Korean',
  localeRule: 'Use the language menu at the top of the page whenever you want to switch.',
  researchBoundary: 'Read the sources alongside the teaching notes, and treat them as starting points for your own investigation.',
  visualCaseBoundary: 'Use these diagrams to understand the method, then test it on a small task of your own.',
  starterBoundaryLab: 'Label the boundary: Lab 011', starterPractice: 'Run Lab 001: work with files and Git', openExercise: 'Open exercise'
});
Object.assign(copy.zh, {
  heroProofStatus: '在你自己的对话中试一试',
  repositoryStripIntro: '先从课程开始；准备练习时，再使用练习和可复用的方法。',
  repositoryChapters: '22 个章节，从基础走向可靠工作', repositoryLabs: '18 个安全练习，带你一步一步做', repositorySkills: '25 个可复用的方法，应对重复工作', repositoryDocs: '来源、贡献指南与项目说明',
  fileChaptersBody: '22 个章节，循序建立方法。', fileLabsTitle: '引导练习', fileLabsBody: '18 个低风险练习，提供清晰检查与复盘。',
  localeTitle: '用你的语言阅读', localeIntro: '选择你最自然的阅读语言。沿着课程前进时，整条路线都会保持该语言。',
  localeEnglish: 'English', localeChinese: '简体中文', localeSpanish: 'Español', localeGerman: 'Deutsch', localeJapanese: '日本語', localeKorean: '한국어',
  localeRule: '需要切换时，使用页面顶部的语言菜单。',
  researchBoundary: '把来源与教学说明一起阅读，并把它们当作你自己继续研究的起点。', visualCaseBoundary: '用这些图理解方法，然后在自己的小任务上试一试。',
  starterBoundaryLab: '标注边界：实验 011', starterPractice: '运行实验 001：处理文件与 Git', openExercise: '打开练习'
});
Object.assign(copy.es, {
  heroProofStatus: 'Pruébalo en tu propio chat', repositoryStripIntro: 'Empieza por la lección y usa los ejercicios y métodos reutilizables cuando estés listo para practicar.',
  repositoryChapters: '22 capítulos, de los fundamentos al trabajo fiable', repositoryLabs: '18 ejercicios guiados para practicar con seguridad', repositorySkills: '25 métodos reutilizables para tareas recurrentes', repositoryDocs: 'Fuentes, guías de contribución y notas del proyecto',
  fileChaptersBody: '22 capítulos que construyen el método paso a paso.', fileLabsTitle: 'Práctica guiada', fileLabsBody: '18 ejercicios de bajo riesgo con comprobaciones y reflexión claras.',
  localeTitle: 'Lee en tu idioma', localeIntro: 'Elige el idioma que lees con mayor naturalidad. La ruta se mantiene en ese idioma mientras avanzas por el libro.', localeEnglish: 'Inglés', localeChinese: 'Chino simplificado', localeSpanish: 'Español', localeGerman: 'Alemán', localeJapanese: 'Japonés', localeKorean: 'Coreano', localeRule: 'Usa el menú de idioma de la parte superior cuando quieras cambiar.',
  researchBoundary: 'Lee las fuentes junto con las notas didácticas y úsalas como punto de partida para tu propia investigación.', visualCaseBoundary: 'Usa estos diagramas para entender el método y después pruébalo en una tarea pequeña propia.', starterBoundaryLab: 'Marca el límite: laboratorio 011', starterPractice: 'Haz el laboratorio 001: archivos y Git', openExercise: 'Abrir ejercicio'
});
Object.assign(copy.ja, {
  heroProofStatus: '自分のチャットで試してみる', repositoryStripIntro: 'まずレッスンから始め、練習の準備ができたら演習と再利用可能な方法を使ってください。',
  repositoryChapters: '基礎から信頼できる仕事まで、全22章', repositoryLabs: '安全に練習するためのガイド付き演習18本', repositorySkills: '繰り返しの仕事に使える方法25個', repositoryDocs: '出典、貢献ガイド、プロジェクトノート',
  fileChaptersBody: '方法を段階的に身につける22章。', fileLabsTitle: 'ガイド付き練習', fileLabsBody: '明確な確認と振り返りを含む低リスクの演習18本。',
  localeTitle: '自分の言語で読む', localeIntro: '最も自然に読める言語を選んでください。本を進む間も、その言語で読み続けられます。', localeEnglish: '英語', localeChinese: '簡体中国語', localeSpanish: 'スペイン語', localeGerman: 'ドイツ語', localeJapanese: '日本語', localeKorean: '韓国語', localeRule: '切り替えたいときは、ページ上部の言語メニューを使ってください。',
  researchBoundary: '教材の説明と合わせて出典を読み、自分で調べるための出発点として使ってください。', visualCaseBoundary: 'この図で方法を理解したら、自分の小さなタスクで試してみましょう。', starterBoundaryLab: '境界を見分ける：Lab 011', starterPractice: 'Lab 001 を行う：ファイルと Git', openExercise: '演習を開く'
});
Object.assign(copy.ko, {
  heroProofStatus: '내 채팅에서 직접 해보기', repositoryStripIntro: '먼저 레슨을 시작하고, 연습할 준비가 되면 연습 문제와 재사용 가능한 방법을 활용하세요.',
  repositoryChapters: '기초부터 신뢰할 수 있는 작업까지, 22개 장', repositoryLabs: '안전한 연습을 위한 안내형 실습 18개', repositorySkills: '반복 작업에 쓰는 재사용 가능한 방법 25개', repositoryDocs: '출처, 기여 가이드, 프로젝트 노트',
  fileChaptersBody: '방법을 단계별로 쌓는 22개 장.', fileLabsTitle: '안내형 연습', fileLabsBody: '명확한 확인과 성찰이 있는 저위험 실습 18개.',
  localeTitle: '내 언어로 읽기', localeIntro: '가장 편하게 읽는 언어를 고르세요. 책을 따라가는 동안 그 언어로 계속 읽을 수 있습니다.', localeEnglish: '영어', localeChinese: '간체 중국어', localeSpanish: '스페인어', localeGerman: '독일어', localeJapanese: '일본어', localeKorean: '한국어', localeRule: '언어를 바꾸고 싶을 때는 페이지 위쪽의 언어 메뉴를 사용하세요.',
  researchBoundary: '학습 설명과 함께 출처를 읽고, 직접 조사하기 위한 출발점으로 활용하세요.', visualCaseBoundary: '이 도표로 방법을 이해한 다음, 자신의 작은 작업에서 시험해 보세요.', starterBoundaryLab: '경계 표시: Lab 011', starterPractice: 'Lab 001 실행: 파일과 Git', openExercise: '연습 열기'
});
Object.assign(copy.de, {
  heroProofStatus: 'Im eigenen Chat ausprobieren', repositoryStripIntro: 'Beginne mit der Lektion und nutze die Übungen und wiederverwendbaren Methoden, sobald du üben möchtest.',
  repositoryChapters: '22 Kapitel – von den Grundlagen zu zuverlässiger Arbeit', repositoryLabs: '18 angeleitete Übungen für sichere Praxis', repositorySkills: '25 wiederverwendbare Methoden für wiederkehrende Aufgaben', repositoryDocs: 'Quellen, Beitragsleitfäden und Projektnotizen',
  fileChaptersBody: '22 Kapitel, die die Methode Schritt für Schritt aufbauen.', fileLabsTitle: 'Angeleitete Praxis', fileLabsBody: '18 risikoarme Übungen mit klaren Prüfungen und Reflexion.',
  localeTitle: 'In deiner Sprache lesen', localeIntro: 'Wähle die Sprache, die du am natürlichsten liest. Auf deinem Weg durch das Buch bleibt die Route in dieser Sprache.', localeEnglish: 'Englisch', localeChinese: 'Vereinfachtes Chinesisch', localeSpanish: 'Spanisch', localeGerman: 'Deutsch', localeJapanese: 'Japanisch', localeKorean: 'Koreanisch', localeRule: 'Wenn du wechseln möchtest, verwende das Sprachmenü oben auf der Seite.',
  researchBoundary: 'Lies die Quellen zusammen mit den Lehrnotizen und nutze sie als Ausgangspunkt für deine eigene Recherche.', visualCaseBoundary: 'Nutze diese Diagramme, um die Methode zu verstehen, und probiere sie dann an einer eigenen kleinen Aufgabe aus.', starterBoundaryLab: 'Grenze markieren: Lab 011', starterPractice: 'Lab 001 durchführen: Dateien und Git', openExercise: 'Übung öffnen'
});

// The first screen should answer a reader's immediate question: what can I do
// with an LLM today? Keep the full curriculum one step away, not in the way.
Object.assign(copy.en, {
  heroPrimary: 'Choose what you want to do today', heroSecondary: 'First, understand what an LLM is',
  startEyebrow: 'Start here · one useful result today', startTitle: 'What do you want the model to help you do?',
  startIntro: 'Pick one real purpose. In under a minute, you will get a ready-to-use prompt and one clear next step; you do not need to understand the whole book first.',
  wizardEyebrow: 'Your first useful result', wizardTitle: 'Choose one thing you want help with now.',
  wizardIntro: 'Choose a purpose, add only the details that matter, then copy a prompt you can use in any chat model. No account, files, or setup required.'
});
Object.assign(copy.zh, {
  heroPrimary: '选择你今天要完成的事', heroSecondary: '先理解 LLM 是什么',
  startEyebrow: '从这里开始 · 今天得到一个有用结果', startTitle: '你想让大模型现在帮你做什么？',
  startIntro: '选择一个真实目的。不到一分钟，你会得到一条可直接使用的提示词和一个清晰的下一步；不必先读完整本书。',
  wizardEyebrow: '你的第一个有用结果', wizardTitle: '选择一件你现在想获得帮助的事。',
  wizardIntro: '选择目的，只补充必要信息，然后复制一条能用于任何聊天模型的提示词。不需要账号、文件或设置。'
});
Object.assign(copy.es, {
  heroPrimary: 'Elige lo que quieres hacer hoy', heroSecondary: 'Primero, entiende qué es un LLM',
  startEyebrow: 'Empieza aquí · un resultado útil hoy', startTitle: '¿En qué quieres que te ayude el modelo ahora?',
  startIntro: 'Elige un propósito real. En menos de un minuto tendrás un prompt listo para usar y un siguiente paso claro; no necesitas entender todo el libro primero.',
  wizardEyebrow: 'Tu primer resultado útil', wizardTitle: 'Elige una cosa para la que necesitas ayuda ahora.',
  wizardIntro: 'Elige un propósito, añade solo los datos necesarios y copia un prompt que puedas usar en cualquier modelo de chat. No necesitas cuenta, archivos ni configuración.'
});
Object.assign(copy.ja, {
  heroPrimary: '今日やりたいことを選ぶ', heroSecondary: 'まず LLM とは何かを知る',
  startEyebrow: 'ここから始める · 今日ひとつ役立つ結果を得る', startTitle: '今、モデルに何を手伝ってほしいですか？',
  startIntro: '実際の目的を一つ選んでください。1分以内に、そのまま使えるプロンプトと明確な次の一歩が得られます。本全体を先に理解する必要はありません。',
  wizardEyebrow: '最初の役立つ結果', wizardTitle: '今助けてほしいことを一つ選んでください。',
  wizardIntro: '目的を選び、必要な情報だけを加えて、どのチャットモデルでも使えるプロンプトをコピーします。アカウント、ファイル、設定は不要です。'
});
Object.assign(copy.ko, {
  heroPrimary: '오늘 하고 싶은 일을 고르기', heroSecondary: '먼저 LLM이 무엇인지 이해하기',
  startEyebrow: '여기서 시작 · 오늘 유용한 결과 하나', startTitle: '지금 모델이 무엇을 도와주면 좋겠나요?',
  startIntro: '실제 목적 하나를 고르세요. 1분 안에 바로 쓸 수 있는 프롬프트와 명확한 다음 단계가 생깁니다. 먼저 책 전체를 이해할 필요는 없습니다.',
  wizardEyebrow: '첫 번째 유용한 결과', wizardTitle: '지금 도움받고 싶은 일 하나를 고르세요.',
  wizardIntro: '목적을 고르고 필요한 정보만 추가한 뒤, 어떤 채팅 모델에도 쓸 수 있는 프롬프트를 복사하세요. 계정, 파일, 설정이 필요 없습니다.'
});
Object.assign(copy.de, {
  heroPrimary: 'Wähle, was du heute tun möchtest', heroSecondary: 'Zuerst verstehen, was ein LLM ist',
  startEyebrow: 'Hier beginnen · heute ein nützliches Ergebnis', startTitle: 'Wobei soll dir das Modell jetzt helfen?',
  startIntro: 'Wähle einen echten Zweck. In weniger als einer Minute erhältst du einen einsatzbereiten Prompt und einen klaren nächsten Schritt; du musst nicht zuerst das ganze Buch verstehen.',
  wizardEyebrow: 'Dein erstes nützliches Ergebnis', wizardTitle: 'Wähle eine Sache, bei der du jetzt Hilfe möchtest.',
  wizardIntro: 'Wähle einen Zweck, ergänze nur die nötigen Angaben und kopiere einen Prompt für jedes Chatmodell. Kein Konto, keine Dateien und keine Einrichtung nötig.'
});

// The home page is a place to begin, not a release dashboard. Evidence and
// availability remain explicit in the status and Reader views; action cards
// say what the reader can do next.
Object.assign(copy.en, {
  localeOptionFallback: '',
  localeBannerFallback: 'This language route is selected. If a requested page is unavailable, Reader keeps this language and explains the next step; it never substitutes an English course page without saying so.',
  localeTitle: 'Read in your language',
  localeIntro: 'Choose the language you read most naturally. The interface and the course route stay in that language as you move through the book.',
  localeRule: 'Switch languages from the menu at the top whenever you need to.',
  problemStartLink: 'Start Chapter 1 → Lab 011 → Chapter 2 → Lab 001 ↗',
  problemWrongFileLink: 'Learn the recovery check ↗', problemSkillLink: 'Learn how to choose a Skill ↗', problemUpdateLink: 'Learn the safe update path ↗',
  problemIntakeLink: 'Choose a first practice ↗', problemLanguageLink: 'Start a language practice ↗', problemGeneralSkillLink: 'Choose a skill practice ↗',
  problemResearchLink: 'Start the research route ↗', problemRecoveryLink: 'Repair one failed exchange ↗', problemPublicInterestSafetyLink: 'Run the safety inquiry ↗',
  footerMeta: 'Start small. Check what matters. Learn more with each task.'
});
Object.assign(copy.zh, {
  localeOptionFallback: '',
  localeBannerFallback: '当前已选择此语言路线。若所请求的页面暂不可用，Reader 会保持当前语言并说明下一步；不会在未说明的情况下替换为英文课程页面。',
  localeTitle: '用你的语言阅读', localeIntro: '选择你最自然的阅读语言。沿着课程前进时，界面与课程路线都会保持该语言。', localeRule: '需要切换时，使用页面顶部的语言菜单。',
  problemStartLink: '从第 1 章 → 实验 011 → 第 2 章 → 实验 001 开始 ↗',
  problemWrongFileLink: '学习如何恢复与检查 ↗', problemSkillLink: '学习如何选择 Skill ↗', problemUpdateLink: '学习安全更新路径 ↗',
  problemIntakeLink: '选择第一次练习 ↗', problemLanguageLink: '开始语言练习 ↗', problemGeneralSkillLink: '选择一项技能练习 ↗',
  problemResearchLink: '开始研究路线 ↗', problemRecoveryLink: '修复一次失败的对话 ↗', problemPublicInterestSafetyLink: '开始安全询问 ↗',
  footerMeta: '从小处开始。检查重要之处。每完成一个任务，多学会一点。'
});
Object.assign(copy.es, {
  localeOptionFallback: '',
  localeBannerFallback: 'Esta ruta de idioma está seleccionada. Si una página solicitada no está disponible, Reader conserva este idioma y explica el siguiente paso; nunca sustituye sin avisar una página del curso en inglés.',
  localeTitle: 'Lee en tu idioma', localeIntro: 'Elige el idioma que lees con mayor naturalidad. La interfaz y la ruta del curso se mantienen en ese idioma mientras avanzas.', localeRule: 'Usa el menú de idioma de la parte superior cuando quieras cambiar.',
  problemStartLink: 'Empieza por el Capítulo 1 → Lab 011 → Capítulo 2 → Lab 001 ↗',
  problemWrongFileLink: 'Aprende la comprobación de recuperación ↗', problemSkillLink: 'Aprende a elegir un Skill ↗', problemUpdateLink: 'Aprende la ruta de actualización segura ↗',
  problemIntakeLink: 'Elige una primera práctica ↗', problemLanguageLink: 'Empieza una práctica de idioma ↗', problemGeneralSkillLink: 'Elige una práctica de habilidad ↗',
  problemResearchLink: 'Empieza la ruta de investigación ↗', problemRecoveryLink: 'Repara un intercambio fallido ↗', problemPublicInterestSafetyLink: 'Realiza la indagación de seguridad ↗',
  footerMeta: 'Empieza poco a poco. Comprueba lo importante. Aprende con cada tarea.'
});
Object.assign(copy.ja, {
  localeOptionFallback: '',
  localeBannerFallback: 'この言語ルートが選択されています。リクエストしたページが利用できない場合、Reader はこの言語を維持して次の手順を説明します。説明なく英語のコースページに置き換えることはありません。',
  localeTitle: '自分の言語で読む', localeIntro: '最も自然に読める言語を選んでください。進行中も、画面とコースルートはその言語のままです。', localeRule: '切り替えたいときは、ページ上部の言語メニューを使ってください。',
  problemStartLink: '第1章 → Lab 011 → 第2章 → Lab 001 から始める ↗',
  problemWrongFileLink: '復旧チェックを学ぶ ↗', problemSkillLink: 'Skill の選び方を学ぶ ↗', problemUpdateLink: '安全な更新経路を学ぶ ↗',
  problemIntakeLink: '最初の練習を選ぶ ↗', problemLanguageLink: '語学練習を始める ↗', problemGeneralSkillLink: 'スキル練習を選ぶ ↗',
  problemResearchLink: 'リサーチルートを始める ↗', problemRecoveryLink: '失敗した対話を修復する ↗', problemPublicInterestSafetyLink: '安全性の調査を行う ↗',
  footerMeta: '小さく始める。大事なことを確かめる。一つのタスクごとに学ぶ。'
});
Object.assign(copy.ko, {
  localeOptionFallback: '',
  localeBannerFallback: '이 언어 경로가 선택되었습니다. 요청한 페이지를 이용할 수 없으면 Reader는 이 언어를 유지한 채 다음 단계를 설명합니다. 알리지 않고 영어 코스 페이지로 바꾸지 않습니다.',
  localeTitle: '내 언어로 읽기', localeIntro: '가장 편하게 읽는 언어를 고르세요. 진행하는 동안 인터페이스와 코스 경로는 그 언어로 유지됩니다.', localeRule: '언어를 바꾸고 싶을 때는 페이지 위쪽의 언어 메뉴를 사용하세요.',
  problemStartLink: '챕터 1 → Lab 011 → 챕터 2 → Lab 001 시작 ↗',
  problemWrongFileLink: '복구 점검 배우기 ↗', problemSkillLink: 'Skill 고르는 법 배우기 ↗', problemUpdateLink: '안전한 업데이트 경로 배우기 ↗',
  problemIntakeLink: '첫 연습 선택 ↗', problemLanguageLink: '언어 연습 시작 ↗', problemGeneralSkillLink: '기술 연습 선택 ↗',
  problemResearchLink: '조사 경로 시작 ↗', problemRecoveryLink: '실패한 대화 복구하기 ↗', problemPublicInterestSafetyLink: '안전성 조사 실행 ↗',
  footerMeta: '작게 시작하세요. 중요한 것을 확인하세요. 과제마다 더 배우세요.'
});
Object.assign(copy.de, {
  localeOptionFallback: '',
  localeBannerFallback: 'Diese Sprachroute ist ausgewählt. Wenn eine angeforderte Seite nicht verfügbar ist, bleibt Reader in dieser Sprache und erklärt den nächsten Schritt; es ersetzt sie nicht ohne Hinweis durch eine englische Kursseite.',
  localeTitle: 'In deiner Sprache lesen', localeIntro: 'Wähle die Sprache, die du am natürlichsten liest. Oberfläche und Kursroute bleiben beim Lesen in dieser Sprache.', localeRule: 'Zum Wechseln nutze jederzeit das Sprachmenü oben auf der Seite.',
  problemStartLink: 'Kapitel 1 → Lab 011 → Kapitel 2 → Lab 001 beginnen ↗',
  problemWrongFileLink: 'Den Recovery-Check lernen ↗', problemSkillLink: 'Lernen, ein Skill auszuwählen ↗', problemUpdateLink: 'Den sicheren Update-Pfad lernen ↗',
  problemIntakeLink: 'Eine erste Übung wählen ↗', problemLanguageLink: 'Eine Sprachübung beginnen ↗', problemGeneralSkillLink: 'Eine Übung für Fertigkeiten wählen ↗',
  problemResearchLink: 'Die Recherche-Route beginnen ↗', problemRecoveryLink: 'Einen fehlgeschlagenen Austausch reparieren ↗', problemPublicInterestSafetyLink: 'Die Sicherheitsprüfung durchführen ↗',
  footerMeta: 'Klein anfangen. Wichtiges prüfen. Mit jeder Aufgabe mehr lernen.'
});

Object.assign(copy.en, {
  navFirst30: 'Five-minute prompt practice',
  first30Eyebrow: 'A five-minute LLM prompt practice',
  first30Title: 'See why a clear prompt needs a human check.',
  first30Intro: 'Use any chat model. You will give it one small rewriting task, then check whether it preserved the facts instead of making helpful-sounding details up.'
});
Object.assign(copy.zh, {
  navFirst30: '5 分钟提示词练习',
  first30Eyebrow: '5 分钟 LLM 提示词练习',
  first30Title: '亲眼看看：清楚的提示词为什么还需要人工检查。',
  first30Intro: '任意聊天模型都可以。你会给它一个很小的改写任务，再检查它是否保留事实，而不是补出听起来很合理的细节。'
});
Object.assign(copy.es, {
  navFirst30: 'Práctica de prompt de cinco minutos',
  first30Eyebrow: 'Práctica de prompt para LLM de cinco minutos',
  first30Title: 'Comprueba por qué un prompt claro necesita revisión humana.',
  first30Intro: 'Usa cualquier modelo de chat. Le darás una pequeña tarea de reescritura y comprobarás si conservó los hechos en lugar de inventar detalles que suenan útiles.'
});
Object.assign(copy.ja, {
  navFirst30: '5分間のプロンプト練習',
  first30Eyebrow: '5分間の LLM プロンプト練習',
  first30Title: '明確なプロンプトにも人の確認が必要な理由を確かめる。',
  first30Intro: 'どのチャットモデルでも使えます。小さな書き換えを依頼し、もっともらしい詳細を足さずに事実を保てたか確認します。'
});
Object.assign(copy.ko, {
  navFirst30: '5분 프롬프트 연습',
  first30Eyebrow: '5분 LLM 프롬프트 연습',
  first30Title: '명확한 프롬프트에도 사람의 확인이 필요한 이유를 살펴보세요.',
  first30Intro: '어떤 채팅 모델이든 사용할 수 있습니다. 작은 다시 쓰기 작업을 요청하고, 그럴듯한 세부 정보를 지어내지 않고 사실을 지켰는지 확인합니다.'
});
Object.assign(copy.de, {
  navFirst30: 'Fünf-Minuten-Prompt-Übung',
  first30Eyebrow: 'Fünf-Minuten-LLM-Prompt-Übung',
  first30Title: 'Sieh, warum ein klarer Prompt eine menschliche Prüfung braucht.',
  first30Intro: 'Nutze ein beliebiges Chatmodell. Du gibst ihm eine kleine Umschreibaufgabe und prüfst, ob es Fakten bewahrt statt hilfreich klingende Details zu erfinden.'
});

// First prompt practice: teach one visible LLM behavior before introducing
// tracking vocabulary, lab records, or recovery workflows.
Object.assign(copy.en, {
  starterEyebrow: 'Your first prompt practice', starterTitle: 'Ask the model to improve a message without inventing facts.',
  starterIntro: 'This shows why prompts matter. A model can make a message sound better, but it may also add details you never supplied. Give one clear instruction, then check whether it followed it.',
  starterStepOne: '01 · READ THE ORIGINAL', starterSource: 'The workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come.',
  starterStepTwo: '02 · COPY THIS PROMPT INTO ANY CHAT MODEL', starterCopy: 'Copy prompt', starterCopied: 'Prompt copied. Paste it into a chat model, then read the answer against the three questions.', starterCopyFailed: 'Copy failed. Select the prompt text manually.',
  starterPrompt: 'Please rewrite the message below so it is clear and friendly.\n\nKeep every fact exactly the same. Do not add a date, place, reason, contact detail, or any other information that is not in the original.\n\nOriginal message:\n"The workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come."\n\nReturn only the rewritten message.',
  starterStepThree: '03 · READ THE ANSWER AND ASK THREE QUESTIONS', starterCheckOne: 'Does it still say Friday at 10?', starterCheckTwo: 'Does it still ask people to bring the draft and reply if they cannot come?', starterCheckThree: 'Did it avoid adding a date, place, reason, or contact detail?',
  starterCopiedHint: 'If all three answers are yes, the model followed this small instruction. If not, tell it exactly which fact it changed or invented, then try again.',
  starterExampleLabel: 'ONE ACCEPTABLE RESULT', starterExample: '“The workshop starts Friday at 10. Please bring your draft. If you cannot attend, please reply.”', starterExampleNote: 'The wording can differ. What matters is that the facts and the requested action stay the same.',
  starterWhyLabel: 'WHY THIS MATTERS', starterWhy: 'An LLM predicts useful-sounding text; it does not automatically know which missing details must stay unknown. A clear prompt and a quick check help you catch that difference.'
});
Object.assign(copy.zh, {
  starterEyebrow: '你的第一条提示词练习', starterTitle: '让模型把消息写得更清楚，但不要编造事实。',
  starterIntro: '这一步是为了让你亲眼看到：提示词为什么重要。模型能把消息写得更顺，但也可能补上你没有提供的细节。你只要给出一条清楚的要求，再检查它是否遵守即可。',
  starterStepOne: '01 · 先读原文', starterSource: '“工作坊改期了。周五 10 点开始。请带上草稿。如果你不能参加，请告诉我。”',
  starterStepTwo: '02 · 把这条提示词复制到任意聊天模型', starterCopy: '复制提示词', starterCopied: '提示词已复制。粘贴到聊天模型后，用下面三个问题检查答案。', starterCopyFailed: '复制失败，请手动选择提示词文本。',
  starterPrompt: '请把下面这条消息改写得清楚、友好。\n\n所有事实必须完全保留。不要添加原文没有的日期、地点、原因、联系方式或任何其他信息。\n\n原始消息：\n“工作坊改期了。周五 10 点开始。请带上草稿。如果你不能参加，请告诉我。”\n\n只返回改写后的消息。',
  starterStepThree: '03 · 阅读答案，再问自己三个问题', starterCheckOne: '它还保留了“周五 10 点开始”吗？', starterCheckTwo: '它还保留了“带上草稿”和“不能参加请回复”吗？', starterCheckThree: '它有没有额外编造日期、地点、原因或联系方式？',
  starterCopiedHint: '三个问题都是“有 / 没有”后，说明模型遵守了这次小要求。只要有一项不对，就直接告诉它改动或编造了哪条事实，再让它重写一次。',
  starterExampleLabel: '一种合格的结果', starterExample: '“工作坊将于周五 10 点开始。请带上草稿；如果不能参加，请回复告知。”', starterExampleNote: '措辞可以不同。关键是事实和需要对方完成的行动没有变。',
  starterWhyLabel: '为什么要做这一步', starterWhy: '大语言模型会生成听起来有用的文字，却不会自动知道哪些缺失的信息必须保持未知。一条清楚的提示词加一次快速检查，能帮你发现这个区别。'
});
Object.assign(copy.es, {
  starterEyebrow: 'Tu primera práctica de prompt', starterTitle: 'Pide al modelo que mejore un mensaje sin inventar hechos.', starterIntro: 'Esto muestra por qué importan los prompts. Un modelo puede mejorar un mensaje, pero también puede añadir detalles que no diste. Da una instrucción clara y comprueba si la siguió.', starterStepOne: '01 · LEE EL ORIGINAL', starterSource: '“El taller cambió. Empieza el viernes a las 10. Trae el borrador. Avísame si no puedes venir.”', starterStepTwo: '02 · COPIA ESTE PROMPT EN CUALQUIER MODELO DE CHAT', starterCopy: 'Copiar prompt', starterCopied: 'Prompt copiado. Pégalo en un modelo de chat y revisa la respuesta con las tres preguntas.', starterCopyFailed: 'No se pudo copiar. Selecciona el texto manualmente.', starterPrompt: 'Reescribe el siguiente mensaje para que sea claro y amable.\n\nConserva todos los hechos exactamente igual. No añadas una fecha, lugar, motivo, contacto ni ninguna información que no esté en el original.\n\nMensaje original:\n“El taller cambió. Empieza el viernes a las 10. Trae el borrador. Avísame si no puedes venir.”\n\nDevuelve solo el mensaje reescrito.', starterStepThree: '03 · LEE LA RESPUESTA Y HAZ TRES PREGUNTAS', starterCheckOne: '¿Sigue diciendo viernes a las 10?', starterCheckTwo: '¿Sigue pidiendo traer el borrador y avisar si no se puede asistir?', starterCheckThree: '¿Evita añadir fecha, lugar, motivo o contacto?', starterCopiedHint: 'Si las tres respuestas son sí, el modelo siguió esta instrucción pequeña. Si no, dile exactamente qué hecho cambió o inventó y vuelve a intentarlo.', starterExampleLabel: 'UN RESULTADO ACEPTABLE', starterExample: '“El taller empieza el viernes a las 10. Por favor, trae tu borrador. Si no puedes asistir, avísame.”', starterExampleNote: 'La redacción puede variar. Lo importante es conservar los hechos y la acción solicitada.', starterWhyLabel: 'POR QUÉ IMPORTA', starterWhy: 'Un LLM predice texto que suena útil; no sabe automáticamente qué detalles ausentes deben seguir siendo desconocidos. Un prompt claro y una comprobación rápida ayudan a detectar la diferencia.'
});
Object.assign(copy.ja, {
  starterEyebrow: '最初のプロンプト練習', starterTitle: '事実を作り足さずに、モデルにメッセージを分かりやすくしてもらう。', starterIntro: 'プロンプトがなぜ重要かを確かめる小さな練習です。モデルは文章を整えられますが、与えていない詳細を加えることもあります。明確に指示し、守られたかを確認します。', starterStepOne: '01 · 原文を読む', starterSource: '「ワークショップの予定が変わりました。金曜日の10時に始まります。下書きを持参してください。参加できない場合は知らせてください。」', starterStepTwo: '02 · このプロンプトを任意のチャットモデルにコピー', starterCopy: 'プロンプトをコピー', starterCopied: 'プロンプトをコピーしました。チャットモデルに貼り付け、三つの質問で答えを確認してください。', starterCopyFailed: 'コピーできませんでした。プロンプトを手動で選択してください。', starterPrompt: '次のメッセージを、分かりやすく親しみやすい文章に書き直してください。\n\nすべての事実を完全にそのまま残してください。原文にない日付、場所、理由、連絡先、その他の情報を追加しないでください。\n\n原文：\n「ワークショップの予定が変わりました。金曜日の10時に始まります。下書きを持参してください。参加できない場合は知らせてください。」\n\n書き直したメッセージだけを返してください。', starterStepThree: '03 · 答えを読み、三つの質問をする', starterCheckOne: '金曜日の10時と書かれていますか？', starterCheckTwo: '下書きの持参と、不参加なら知らせることが残っていますか？', starterCheckThree: '日付、場所、理由、連絡先を追加していませんか？', starterCopiedHint: '三つとも問題なければ、この小さな指示に従えています。違う場合は、変更・追加された事実を具体的に伝えて、もう一度試してください。', starterExampleLabel: '許容できる結果の一例', starterExample: '「ワークショップは金曜日の10時に始まります。下書きを持参してください。参加できない場合はお知らせください。」', starterExampleNote: '表現は異なって構いません。事実と求める行動が変わらないことが重要です。', starterWhyLabel: 'なぜ大切か', starterWhy: 'LLM は役に立ちそうな文章を予測しますが、欠けている詳細を未知のままにすべきだと自動で判断するわけではありません。明確なプロンプトと短い確認が、この違いを見つける助けになります。'
});
Object.assign(copy.ko, {
  starterEyebrow: '첫 번째 프롬프트 연습', starterTitle: '사실을 지어내지 않고 모델에게 메시지를 더 분명하게 고쳐 달라고 요청하세요.', starterIntro: '프롬프트가 왜 중요한지 보여 주는 작은 연습입니다. 모델은 메시지를 더 자연스럽게 만들 수 있지만, 제공하지 않은 세부 정보를 덧붙일 수도 있습니다. 한 가지를 분명히 지시하고 지켰는지 확인하세요.', starterStepOne: '01 · 원문 읽기', starterSource: '“워크숍 일정이 바뀌었습니다. 금요일 10시에 시작합니다. 초안을 가져오세요. 참석할 수 없으면 알려 주세요.”', starterStepTwo: '02 · 이 프롬프트를 원하는 채팅 모델에 복사', starterCopy: '프롬프트 복사', starterCopied: '프롬프트를 복사했습니다. 채팅 모델에 붙여 넣은 뒤 세 가지 질문으로 답을 확인하세요.', starterCopyFailed: '복사하지 못했습니다. 프롬프트 텍스트를 직접 선택하세요.', starterPrompt: '아래 메시지를 명확하고 친절하게 다시 작성해 주세요.\n\n모든 사실은 정확히 그대로 유지하세요. 원문에 없는 날짜, 장소, 이유, 연락처 또는 다른 정보를 추가하지 마세요.\n\n원문 메시지:\n“워크숍 일정이 바뀌었습니다. 금요일 10시에 시작합니다. 초안을 가져오세요. 참석할 수 없으면 알려 주세요.”\n\n다시 작성한 메시지만 반환하세요.', starterStepThree: '03 · 답을 읽고 세 가지를 확인하세요', starterCheckOne: '여전히 금요일 10시라고 되어 있나요?', starterCheckTwo: '초안을 가져오고 참석할 수 없으면 알리라는 요청이 남아 있나요?', starterCheckThree: '날짜, 장소, 이유 또는 연락처를 덧붙이지 않았나요?', starterCopiedHint: '세 가지 모두 맞으면 모델이 이 작은 지시를 따른 것입니다. 아니라면 무엇을 바꾸거나 지어냈는지 정확히 말하고 다시 시도하세요.', starterExampleLabel: '허용 가능한 결과 한 가지', starterExample: '“워크숍은 금요일 10시에 시작합니다. 초안을 가져와 주세요. 참석할 수 없으면 알려 주세요.”', starterExampleNote: '표현은 달라도 됩니다. 사실과 요청한 행동이 그대로인 것이 중요합니다.', starterWhyLabel: '왜 중요한가', starterWhy: 'LLM은 유용해 보이는 문장을 예측하지만, 빠진 세부 정보를 계속 모른 채 두어야 한다는 것을 자동으로 알지는 못합니다. 분명한 프롬프트와 빠른 점검이 그 차이를 찾아내는 데 도움을 줍니다.'
});
Object.assign(copy.de, {
  starterEyebrow: 'Deine erste Prompt-Übung', starterTitle: 'Bitte das Modell, eine Nachricht klarer zu machen, ohne Fakten zu erfinden.', starterIntro: 'Diese kleine Übung zeigt, warum Prompts wichtig sind. Ein Modell kann eine Nachricht besser formulieren, aber auch Details ergänzen, die du nie genannt hast. Gib eine klare Anweisung und prüfe, ob es ihr gefolgt ist.', starterStepOne: '01 · LIES DEN ORIGINALTEXT', starterSource: '„Der Workshop wurde verschoben. Er beginnt am Freitag um 10 Uhr. Bring den Entwurf mit. Gib Bescheid, wenn du nicht kommen kannst.“', starterStepTwo: '02 · KOPIERE DIESEN PROMPT IN EIN BELIEBIGES CHATMODELL', starterCopy: 'Prompt kopieren', starterCopied: 'Prompt kopiert. Füge ihn in ein Chatmodell ein und prüfe die Antwort mit den drei Fragen.', starterCopyFailed: 'Kopieren fehlgeschlagen. Wähle den Prompt-Text manuell aus.', starterPrompt: 'Schreibe die folgende Nachricht klar und freundlich um.\n\nErhalte alle Fakten exakt. Füge kein Datum, keinen Ort, keinen Grund, keine Kontaktangabe und keine andere Information hinzu, die nicht im Original steht.\n\nOriginalnachricht:\n„Der Workshop wurde verschoben. Er beginnt am Freitag um 10 Uhr. Bring den Entwurf mit. Gib Bescheid, wenn du nicht kommen kannst.“\n\nGib nur die umgeschriebene Nachricht zurück.', starterStepThree: '03 · LIES DIE ANTWORT UND STELLE DREI FRAGEN', starterCheckOne: 'Steht dort weiterhin Freitag um 10 Uhr?', starterCheckTwo: 'Bleibt die Bitte, den Entwurf mitzubringen und bei Abwesenheit Bescheid zu geben, erhalten?', starterCheckThree: 'Wurden kein Datum, Ort, Grund oder Kontakt ergänzt?', starterCopiedHint: 'Wenn alle drei Antworten ja sind, hat das Modell diese kleine Anweisung befolgt. Wenn nicht, benenne genau die geänderte oder erfundene Tatsache und versuche es erneut.', starterExampleLabel: 'EIN AKZEPTABLES ERGEBNIS', starterExample: '„Der Workshop beginnt am Freitag um 10 Uhr. Bitte bring deinen Entwurf mit. Wenn du nicht kommen kannst, gib bitte Bescheid.“', starterExampleNote: 'Die Formulierung darf abweichen. Wichtig ist, dass Fakten und gewünschte Handlung gleich bleiben.', starterWhyLabel: 'WARUM DAS WICHTIG IST', starterWhy: 'Ein LLM sagt nützlich klingenden Text voraus; es weiß nicht automatisch, welche fehlenden Details unbekannt bleiben müssen. Ein klarer Prompt und eine schnelle Prüfung helfen dir, den Unterschied zu erkennen.'
});

initializeSearch();
applyLanguage(currentLanguage, { updateUrl: hasExplicitLanguageParam && !hasValidLanguageParam });
