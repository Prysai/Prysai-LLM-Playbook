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
    menu: 'Menu', menuClose: 'Close', navStart: 'Start with a problem', navFirst30: 'First 15 minutes', navPath: 'Learning path', navIndex: 'Project index', navRoutes: 'Reading routes', navLabs: 'Labs', navSkills: 'Skills', navUpdates: 'Update map', localeBannerFallback: 'The {requested} route is available, but some UI or reader-facing content is still in migration. Showing the current available source where needed.', localeManifestError: 'Locale routing is unavailable because the generated manifest did not load. English remains available; rebuild the manifest before relying on other routes.', localeBannerReady: 'Reading in {language}.', localeMenuAria: 'Interface languages', languageNameEnglish: 'English', languageNameChinese: 'Simplified Chinese', languageNameSpanish: 'Spanish', languageNameJapanese: 'Japanese', languageNameKorean: 'Korean', languageNameGerman: 'German', localeOptionFallback: 'English UI fallback',
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
    skillsEyebrow: 'Capability layer', skillsTitle: 'Fourteen Skills. Distinct jobs.', skillsIntro: 'A Skill is a method with a trigger, an input check, boundaries, stop conditions, an output contract, and a way to verify it.', skillCoach: 'Choose a learning path and practice boundary.', skillProtocol: 'Turn a vague request into an executable contract.', skillEvidence: 'Split completion claims into checkable evidence.', skillSelector: 'Choose a minimum viable capability set.', skillWorkflow: 'Manage stages, checkpoints, and hand-off.', skillResearch: 'Converge a question into auditable knowledge.', skillContext: 'Keep stable principles separate from changing facts.', skillLearningName: 'Learning Coach', skillLearning: 'Practise with recall, correction, delayed review, and transfer.', skillSourceName: 'Source Investigator', skillSource: 'Turn broad searches into bounded source-backed investigations.', skillSignalName: 'Field Signal Curator', skillSignal: 'Turn public reports into bounded demand evidence.', skillAdapterName: 'Platform Adapter Review', skillAdapter: 'Reject platform lessons without a sourced, runnable delta.', skillTriageName: 'Communication Failure Triage', skillTriage: 'Diagnose one failed interaction and retest the smallest repair.', skillBriefName: 'Dialogue Brief', skillBrief: 'Turn one untried low-risk request into a copy-ready first message.', skillFirstTurnCheckName: 'First-Turn Check', skillFirstTurnCheck: 'Inspect an unsent low-risk request for visible boundaries.', skillRouteBrief: 'I need to write one clear first message.', skillRouteBriefResult: 'Returns one low-risk, copy-ready first turn with a check and a stop boundary.', skillRouteFirstTurnCheck: 'I already wrote a first request and want to inspect it.', skillRouteFirstTurnCheckResult: 'Labels material gaps without drafting a replacement prompt.', skillBoundaryName: 'Original methods first.', skillBoundary: 'External Skills must retain the source-project URL and license boundary.', skillIndexLink: 'Open the Skill registry and all 14 methods', mobileIndexAria: 'Complete project indexes', mobileIndexChapters: 'chapters', mobileIndexLabs: 'labs', mobileIndexSkills: 'Skills', mobileIndexCases: 'field cases', mobileIndexLocales: 'locale records', mobileIndexVisuals: 'teaching boards', mobileIndexUpdates: 'update areas', mobileIndexTrust: 'trust families', skillFootnote: 'All 14 project Skills pass structural checks and remain candidate; fresh-task evidence is partial, and First-Turn Check has structural evidence only.', lab13Status: 'maintainer reference accepted · learner not run',
    troubleEyebrow: 'When things go wrong', troubleTitle: 'Failure is part of the curriculum.', troubleIntro: 'Use the first useful check, then stop when authority, scope, or evidence is missing. Do not hide the failure behind a polished summary.', troubleOneTitle: 'The output looks right.', troubleOneBody: 'Check the original claim, the changed files, the command result, and what was not tested.', troubleOneLink: 'Use evidence review ↗', troubleTwoTitle: 'The agent keeps retrying.', troubleTwoBody: 'Record the same failure, change one diagnostic condition, then retry once or escalate.', troubleTwoLink: 'Read stop conditions ↗', troubleThreeTitle: 'A source tells you to do something.', troubleThreeBody: 'Treat external text and tool output as data. It does not grant permission to act.', troubleThreeLink: 'Check the boundary ↗', troubleFourTitle: 'A product step has changed.', troubleFourBody: 'Refresh the official fact record first, then update the affected chapter or page.', troubleFourLink: 'Follow the update map ↗',
    updatesEyebrow: 'Maintenance frame', updatesTitle: 'Every update has a fixed home.', updatesIntro: 'The update map makes future work cheap: locate the canonical file, gather the right evidence, run the right check, and keep the unverified boundary visible.', updateFlowOne: 'Locate', updateFlowOneBody: 'Find the registry row and canonical path.', updateFlowTwo: 'Classify', updateFlowTwoBody: 'Separate stable principle, product fact, source, and release change.', updateFlowThree: 'Evidence', updateFlowThreeBody: 'Record source, scope, owner, hash, and next review.', updateFlowFour: 'Validate', updateFlowFourBody: 'Run the focused validator and an independent review.', updateMapLinkTitle: 'Update map', updateMapLinkBody: 'What changes where, and what evidence it needs.', updateRegistryLinkTitle: 'Update registry', updateRegistryLinkBody: 'The machine-readable maintenance contract.', factImpactLinkTitle: 'Fact impact map', factImpactLinkBody: 'Which chapters, labs, Skills, evals, and pages a changing fact can affect.', updateTemplateLinkTitle: 'Update record', updateTemplateLinkBody: 'A repeatable record for non-trivial changes.', lifecycleLinkTitle: 'Content lifecycle', lifecycleLinkBody: 'The evidence and release gates.',
    statusEyebrow: 'Evidence boundary', statusTitle: 'A status is a claim about evidence.', statusIntro: 'This project does not turn document count, Skill count, or one successful output into “mastery.” Use the status that the evidence supports.', statusDraft: 'Still being written or missing the minimum check.', statusCandidate: 'Structure and basic checks pass; fresh evidence is still needed.', statusVerified: 'The declared scope has positive, boundary, failure, and transfer evidence.', statusProduction: 'Safety, maintenance, version, license, and release gates also pass.', statusSourceBefore: 'Current evidence is recorded in', statusSourceLink: 'the current status source', statusReviewBefore: ' and explained by ', statusReviewLink: 'the current-state review', statusSourceAfter: '; the page itself remains candidate until browser review is recorded.', nextEyebrow: 'Next action', nextTitle: 'Bring one small problem.', nextBody: 'Open the task contract, choose a reversible first step, and keep the diff. That is the shortest useful way to begin.', nextPrimary: 'Open chapter 2', nextSecondary: 'Then run lab 001', footerTagline: 'A practical learning and practice system for Codex.', mobileRouteFixture: 'Need a safe file? Open the fixture', visualCaseIntro: 'Two original boards show the core loop: make the work inspectable, then practise it under changed conditions.', visualCaseBoundary: 'project-authored teaching visuals · not runtime or learner evidence', footerMeta: 'candidate · evidence boundary reviewed 2026-08-13'
  },
  zh: {
    heroIndexAria: '页面索引',
    skipToContent: '跳到主要内容', wordmarkAria: 'Prysai 大模型实战手册首页', languageToggleAria: '选择界面语言', menuAria: '打开导航', navAria: '主导航', pathAria: '七级学习路径', routesAria: '筛选章节路线', menu: '菜单', menuClose: '关闭', navStart: '从问题开始', navFirst30: '前 30 分钟', navPath: '学习路径', navIndex: '项目索引', navRoutes: '阅读路线', navLabs: '实验室', navSkills: 'Skills', navUpdates: '更新地图', localeBannerFallback: '已提供 {requested} 路由，但部分界面或读者内容仍在迁移中；需要时显示当前可用源文件。', localeManifestError: '语言路由不可用，因为生成的 manifest 没有加载。英文仍可用；在依赖其他语言路由前，请先重新生成 manifest。', localeBannerReady: '当前阅读语言：{language}。', localeMenuAria: '界面语言', languageNameEnglish: '英语', languageNameChinese: '简体中文', languageNameSpanish: '西班牙语', languageNameJapanese: '日语', languageNameKorean: '韩语', languageNameGerman: '德语', localeOptionFallback: '英文界面回退',
    heroIndex: 'CODEX / 学习系统', heroEyebrow: '候选指南 · 基础结构和检查已通过', heroTitle: '练习可检查的 Codex 工作。', heroLede: '使用一套旨在迁移到各类大语言模型工具的协作方法，再在 Codex 中深入实践：定义结果、控制上下文与权限、检查工作、从失败中恢复，并保留证据。', heroPrimary: '开始有引导的 Codex 路径', heroSecondary: '查看可选的免设置热身', heroRouteAria: '选择推荐的第一条路线', heroRouteKicker: '按你的起始条件选择', heroRouteGuidedTitle: '有可丢弃的项目？沿着引导路径开始。', heroRouteGuidedBody: '从第 1 章开始。第一次本地编辑会在范围和证据边界清楚之后出现。', heroRouteFixtureTitle: '还没有可丢弃的项目？在第 2 章的决策点使用安全夹具。', heroRouteFixtureBody: '它提供一个离线目标和检查，不替代有引导的 Codex 路径。', heroRouteBoundary: '候选表示基础结构和检查已通过；首次读者的学习结果仍未测量。', heroProofAria: 'First Win 证据卡', heroProofKicker: 'FIRST WIN / 可检查示例', heroProofStatus: '候选 · 尚无参与者运行记录', heroProofTitle: '看看一次可检查的结果包含什么。', heroProofSourceLabel: '原始消息', heroProofSource: '“你好，工作坊改期了。周五 10 点开始。请带上草稿。如果你不能参加，请告诉我。”', heroProofPreserveLabel: '保留事实', heroProofPreserve: '保留周五 10 点、草稿和回复要求；不要添加日期、地点、原因或联系方式。', heroProofChecksLabel: '三项人工检查', heroProofCheckOne: '周五 10 点和草稿仍然保留。', heroProofCheckTwo: '不能参加的人仍被要求回复。', heroProofCheckThree: '没有出现无依据的细节。', heroProofReceiptLabel: '有边界的回执', heroProofReceipt: '可以记录一次经过检查的尝试；它不证明已经学会、能够迁移，或模型表现。', heroProofLink: '打开完整的 15 分钟检查', heroFooter: '问题 → 协议 → 行动 → 证据',
    startEyebrow: '从问题开始', startTitle: '不要从 Skill 开始。', startIntro: '先说清楚你要避免的失败或要完成的工作。选择最小有效入口，然后留下证据。', problemStartTitle: '我不知道从哪里开始。', problemStartBody: '在选择工作流前，先分清 GPT、Codex、模型、工具、Skill 与 Agent。', problemStartLink: '打开第 1 章 ↗', problemWrongFileTitle: 'Codex 改错了文件。', problemWrongFileBody: '在相信完成声明前，检查范围、差异、测试与恢复方式。', problemWrongFileLink: '打开第 9 章 ↗', problemSkillTitle: '我不知道该用哪个 Skill。', problemSkillBody: '按任务、风险、输入、依赖和证据选择，不按目录大小选择。', problemSkillLink: '运行实验 004 ↗', problemUpdateTitle: '我需要安全地更新项目。', problemUpdateBody: '用固定更新地图找到规范文件、来源记录和验证门槛。', problemUpdateLink: '打开更新地图 ↗', problemIntakeTitle: '我的目标很宽泛，不知道先练什么。', problemIntakeBody: '一次只澄清一个决定：选一条已有路线、一次可检查尝试、允许的帮助和更小的回退。', problemIntakeLink: '打开首次练习入口 · candidate · not_run ↗',
    first30Eyebrow: '你的前 15 分钟', first30Title: '先判断一个答案，无需配置。', first30Intro: '原文、任务和检查标准都已经填好。任意聊天模型都可以；不需要文件、终端、Git、账户连接或专业词汇。', stepOneTitle: '选择可回滚的改动。', stepOneBody: '使用沙盒文件或小型文档修改。不要从凭据、生产环境或破坏性命令开始。', stepTwoTitle: '写任务协议。', stepTwoBody: '写清目标、上下文、允许行动、验收标准、证据和停止条件。', stepThreeTitle: '让 Codex 先检查。', stepThreeBody: '允许修改前，先让它说明相关文件和当前状态，保持范围可见。', stepFourTitle: '验证实际变化。', stepFourBody: '检查差异，运行最小相关检查，并记录没有测试什么。', checkCardLabel: '一个有用的任务协议', fieldGoalLabel: '目标', fieldGoal: '完成一个明确的改动。', fieldContextLabel: '上下文', fieldContext: '只提供完成任务所需的文件。', fieldInputsLabel: '输入', fieldInputs: '路径、当前行为、约束。', fieldAllowedLabel: '允许行动', fieldAllowed: '读取和编辑；外部副作用前暂停。', fieldAcceptanceLabel: '验收', fieldAcceptance: '明确的差异和检查结果。', fieldEvidenceLabel: '证据', fieldEvidence: '差异、命令、输出和限制。', fieldStopLabel: '停止条件', fieldStop: '范围、授权或证据缺失。', contractHighlight: '最安全的第一个任务应该足够小、可回滚，而且容易检查。', openChapterTwo: '打开第 2 章',
    starterEyebrow: '原文 → 提示词 → 自查 → 修正', starterTitle: '让一条消息更清楚，同时不改变事实。', starterIntro: '先读一遍原文，复制已填好的提示词，再亲自检查答案。目标用时 15 分钟；目前尚未测量零基础用户的实际完成时间。', starterCopy: '复制第一次提示词', starterCopied: '第一次提示词已复制，请按三项标准检查答案。', starterCopyFailed: '复制失败，请手动选择提示词文本。', starterBoundary: '准备好了。完成本练习只记录一次经过检查的尝试，不证明已经学会或具备普遍能力。', starterProgressionAria: '从可选热身继续', starterDeepen: '选择另一项新手练习', starterCodexPath: '开始 Codex 路径：第 1 章', starterBoundaryLab: '标注边界：实验 011 · draft / not_run', starterBoundedTask: '选择一个有边界的本地任务：第 2 章', starterPractice: '运行实验 001：使用文件和 Git · draft / not_run', starterEvidence: '学习如何修正不合格的答案',
    protocolEyebrow: '工作框架', protocolTitle: '每个严肃任务都需要边界。', protocolIntro: '这是人与模型、工具和 Agent 之间的共同语言。在增加权限或 Skill 前先使用它。', protocolLink: '阅读任务协议', protocolNote: '如果缺失输入会改变范围、风险或验收测试，就暂停并询问。如果只影响低风险读取，可以先检查并报告假设。', protocolRuleOne: '定义', protocolRuleTwo: '行动', protocolRuleThree: '验证', protocolRuleFour: '交接',
    pathEyebrow: '学习路径', pathTitle: '七个等级，一份可执行契约。', pathIntro: '选择一个等级，直接看到要读什么、做什么、使用什么、提交什么，以及哪些结论不能声称。等级不是阅读数量。', currentLevel: '当前等级', nextStep: '下一步', requiredChapters: '必读章节', requiredLabs: '必做实验', supportingSkills: '支撑 Skill', evaluationFixtures: '评测夹具', evidenceGate: '证据门槛', graduationGate: '进入下一阶段前', blockedWhen: '遇到这些情况先停止', positive: '正例', boundary: '边界例', failure: '失败例', transfer: '迁移例', fourEvidence: '四类证据', evidenceExplain: '解释', evidenceOperate: '操作', evidenceJudge: '判断', evidenceReview: '审查', levelL0Name: '观察者', levelL0Short: '知道发生了什么', levelL1Name: '安全使用者', levelL1Short: '完成低风险任务', levelL2Name: '任务设计者', levelL2Short: '写出任务协议', levelL3Name: '工作流设计者', levelL3Short: '从定义走到交付', levelL4Name: '能力构建者', levelL4Short: '选择最小有效组合', levelL5Name: '证据审查者', levelL5Short: '检验完成声明', levelL6Name: '团队教练', levelL6Short: '把方法变成系统',
    labFirstSeen: '首次引入', labReused: '复用自', labCapability: '新增能力', labArtifact: '新增产物', labAcceptance: '新增验收',
    chaptersEyebrow: '阅读路线', chaptersTitle: '22 章，四种进入方式。', chaptersIntro: '顺读建立心智模型；被真实任务卡住时按路线跳读。每条路线都会回到练习和证据。', filterAll: '全部章节', filterA: 'A · 初识 Codex', filterB: 'B · 真实工作', filterC: 'C · 能力扩展', filterD: 'D · 团队实践', routeATitle: '第一次接触 Codex', routeADesc: '01—06 · 完成第一个安全任务', routeBTitle: '把 Codex 用于真实工作', routeBDesc: '07—13 · 设计可验证工作流', routeCTitle: '能力与 Agent 协作', routeCDesc: '14—18 · 选择最小有效组合', routeDTitle: '从熟练到团队实践', routeDDesc: '19—22 · 把个人方法变成团队能力', candidateStatus: 'candidate', chapter01: '先理解 GPT，再理解 Codex', chapter02: '完成安全、可验证的任务', chapter03: '把愿望变成任务协议', chapter04: '上下文、权限与 Agent 边界', chapter05: '选择正确的 Codex 工作面', chapter06: '模型选择不是模型崇拜', chapter07: 'Skill、Plugin、MCP 与工具如何分工', chapter08: '从定义到交付的完整生命周期', chapter09: '验证、怀疑与恢复', chapter10: '规划与竖向切片', chapter11: '设计一个真正有用的 Skill', chapter12: 'Agent 的循环、状态与停止条件', chapter13: '文件、终端、浏览器与 GitHub 的行动边界', chapter14: '发现、安装和审查外部 Skill', chapter15: '研究：从问题到可审查知识', chapter16: '工程：从想法到可靠软件', chapter17: '营销：从产品理解到增长实验', chapter18: '内容、设计、数据与自动化', chapter19: '评估模型和工作流', chapter20: '建立个人 Codex 工作系统', chapter21: '建立团队能力系统', chapter22: '保持系统更新并可恢复',
    labsEyebrow: '实验室', labsTitle: '把原理变成可观察的动作。', labsIntro: '实验是低风险、可复现的任务。每个实验都写清设置、证据、失败变体、秘密边界和复盘。', draftStatus: 'draft', startingLab: '起点实验', lab01Title: '第一个安全任务', lab01Body: '在沙盒项目中，让 Codex 先检查再编辑，把“完成了”变成可检查的差异。', lab02Title: '任务协议', lab02Body: '把模糊请求拆成目标、输入、约束、验收和失败处理。', lab03Title: '证据审查', lab03Body: '发现一个看似完成却没有证据支撑声明的结果。', lab04Title: 'Skill 选择', lab04Body: '解释选择理由，拒绝用目录大小代替适配判断。', lab05Title: '设计一个 Skill', lab05Body: '把稳定方法变成有边界、有证据、有失败案例的能力包。', lab06Title: 'Agent 停止条件', lab06Body: '为成功、缺失输入、可恢复失败和权限冲突定义停点。', lab07Title: '行动边界', lab07Body: '比较读取、编辑、运行、提交、推送和发布需要的证据。', lab08Title: '研究问题', lab08Body: '把宽泛主题变成问题、来源计划和最小证据表。', lab09Title: '工程生命周期', lab09Body: '比较直接实现与完整生命周期，并记录返工证据。', lab10Title: '共享产品上下文', lab10Body: '版本化共享产品理解，并区分事实与假设。', lab11Title: 'GPT 与 Codex 边界', lab11Body: '用静态任务卡分清生成、执行、验证和外部副作用。', lab12Title: '团队能力迁移', lab12Body: '为版本、负责人、权限、独立复现和回滚建立契约。', labsIndexLink: '打开实验规则和全部 18 个入口',
    skillsEyebrow: '能力层', skillsTitle: '十四个 Skill，各有职责。', skillsIntro: 'Skill 是带触发器、输入检查、边界、停止条件、输出契约和验证方式的方法包。', skillCoach: '选择学习路径和练习边界。', skillProtocol: '把模糊请求变成可执行契约。', skillEvidence: '把完成声明拆成可检查证据。', skillSelector: '选择最小有效能力组合。', skillWorkflow: '管理阶段、检查点和交接。', skillResearch: '把问题收敛为可审查知识。', skillContext: '分开稳定原则和易变事实。', skillLearningName: '学习教练', skillLearning: '通过回忆、纠错、延迟复习和迁移进行练习。', skillSourceName: '来源调查', skillSource: '把宽泛搜索变成有边界、有来源的调查。', skillSignalName: '现场信号整理', skillSignal: '把公开报告整理成有边界的需求证据。', skillAdapterName: '平台适配审查', skillAdapter: '拒绝没有来源、运行和真实差异的平台教程。', skillTriageName: '沟通故障分诊', skillTriage: '诊断一次失败交互，并复测最小修复。', skillBriefName: '对话 Brief', skillBrief: '把一次尚未发送的低风险请求整理成可复制的首轮消息。', skillFirstTurnCheckName: '首轮请求检查', skillFirstTurnCheck: '检查尚未发送的低风险请求是否明确了边界。', skillRouteBrief: '我需要写一条清晰的首轮消息。', skillRouteBriefResult: '产出带检查与停止边界的低风险、可复制首轮消息。', skillRouteFirstTurnCheck: '我已经写好首轮请求，想先检查它。', skillRouteFirstTurnCheckResult: '标出关键缺口，不代写新的提示词。', skillBoundaryName: '原创方法优先。', skillBoundary: '外部 Skill 必须保留原项目链接和许可证边界。', skillIndexLink: '打开 Skill 登记表与全部 14 个方法', mobileIndexAria: '完整项目索引', mobileIndexChapters: '章', mobileIndexLabs: '实验', mobileIndexSkills: 'Skill', mobileIndexCases: '现场案例', mobileIndexLocales: '语言记录', mobileIndexVisuals: '教学图板', mobileIndexUpdates: '更新区域', mobileIndexTrust: '可信度类型', skillFootnote: '14 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整，首轮请求检查目前只有结构性证据。', lab13Status: '维护者参考运行已接受 · 学习者尚未运行',
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
  fileSkillsTitle: 'Reusable methods', fileSkillsBody: '14 project Skills with triggers, boundaries, and evidence contracts.',
  fileDocsTitle: 'Governance and research', fileDocsBody: 'Status, sources, field reports, update rules, and quality records.',
  ledgerTitle: 'Content state', ledgerIntro: 'A compact reading of the current status source. Status describes evidence, not ambition.',
  ledgerProject: 'Project', ledgerChapters: 'Chapters · 22', ledgerLabs: 'Labs · 18', ledgerSkills: 'Skills · 14', ledgerResearch: 'Field research', ledgerResearchNote: 'user reports; not locally reproduced', ledgerSource: 'Open the current status source',
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
  fileSkillsTitle: '\u53ef\u590d\u7528\u65b9\u6cd5', fileSkillsBody: '14 \u4e2a\u9879\u76ee Skill\uff0c\u5305\u542b\u89e6\u53d1\u3001\u8fb9\u754c\u4e0e\u8bc1\u636e\u5951\u7ea6\u3002',
  fileDocsTitle: '\u6cbb\u7406\u4e0e\u7814\u7a76', fileDocsBody: '\u72b6\u6001\u3001\u6765\u6e90\u3001\u73b0\u5b9e\u95ee\u9898\u3001\u66f4\u65b0\u89c4\u5219\u4e0e\u8d28\u91cf\u8bb0\u5f55\u3002',
  ledgerTitle: '\u5185\u5bb9\u72b6\u6001', ledgerIntro: '\u5f53\u524d\u72b6\u6001\u6e90\u7684\u7b80\u8bfb\u7248\u3002\u72b6\u6001\u63cf\u8ff0\u8bc1\u636e\uff0c\u4e0d\u63cf\u8ff0\u613f\u666f\u3002',
  ledgerProject: '\u9879\u76ee', ledgerChapters: '\u7ae0\u8282 \u00b7 22', ledgerLabs: '\u5b9e\u9a8c \u00b7 18', ledgerSkills: 'Skill \u00b7 14', ledgerResearch: '\u73b0\u5b9e\u95ee\u9898\u7814\u7a76', ledgerResearchNote: '\u7528\u6237\u62a5\u544a\uff1b\u672c\u5730\u672a\u590d\u73b0', ledgerSource: '\u6253\u5f00\u5f53\u524d\u72b6\u6001\u6e90',
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
  searchLabel: 'Search the Field Guide',
  searchPlaceholder: 'Search chapters, labs, Skills, or field cases',
  searchSubmit: 'Search',
  searchTitle: 'Find a bounded answer.',
  searchClear: 'Clear',
  searchNoQuery: 'Type a word or phrase to search the Field Guide.',
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
  repositorySkills: '14 reusable Skills · candidate',
  repositoryDocs: 'Governance and field research · candidate; reports not locally reproduced',
});

Object.assign(copy.zh, {
  searchLabel: '搜索 Field Guide',
  searchPlaceholder: '搜索章节、实验、Skill 或现实问题',
  searchSubmit: '搜索',
  searchTitle: '找到有边界的答案。',
  searchClear: '清除',
  searchNoQuery: '输入词语或短语，搜索 Field Guide。',
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
  repositorySkills: '14 个可复用 Skill · candidate',
  repositoryDocs: '治理与现实研究 · candidate；报告尚未在本地复现',
});

Object.assign(copy.en, {
  skillsTitle: 'Fifteen Skills. Distinct jobs.',
  skillPromptCardName: 'Prompt Card Editor',
  skillPromptCard: 'Turn one authorized prompt idea into a source-aware teaching card.',
  skillIndexLink: 'Open the Skill registry and all 15 methods',
  skillFootnote: 'All 15 project Skills pass structural checks and remain candidate; fresh-task evidence is partial, and Prompt Card Editor has one isolated forward test only.',
  fileSkillsBody: '15 project Skills with triggers, boundaries, and evidence contracts.',
  ledgerSkills: 'Skills · 15',
  repositorySkills: '15 reusable Skills · candidate',
});

Object.assign(copy.zh, {
  skillsTitle: '十五个 Skill，各有职责。',
  skillPromptCardName: '提示卡编辑器 Prompt Card Editor',
  skillPromptCard: '把一个已授权的提示想法整理成带来源边界的教学卡。',
  skillIndexLink: '打开 Skill 登记表与全部 15 个方法',
  skillFootnote: '15 个项目 Skill 均通过结构检查并保持 candidate；新鲜任务证据仍不完整，提示卡编辑器仅有一次独立前向测试。',
  fileSkillsBody: '15 \u4e2a\u9879\u76ee Skill，包含触发、边界与证据契约。',
  ledgerSkills: 'Skill \u00b7 15',
  repositorySkills: '15 个可复用 Skill · candidate',
});

Object.assign(copy.en, {
  heroSecondary: 'Try a five-minute prompt card',
  promptDeckEyebrow: 'Optional prompt cards · five minutes',
  promptDeckTitle: 'Start with one small conversation.',
  promptDeckIntro: 'Copy one original, text-only card. Replace only the brackets, inspect the response yourself, and keep the claim small: one attempt is not fluency, research, or a finished answer.',
  promptDeckVisualAlt: 'Six visible fields for a bounded first request',
  promptDeckVisualLabel: 'See the six-field check before you send',
  promptCardScope: 'text only · no tool authority',
  promptCardCopy: 'Copy prompt',
  promptCardCopied: 'Prompt copied. Replace only the brackets, then inspect the reply yourself.',
  promptCardCopyFailed: 'Could not copy the prompt. Select the text manually.',
  spanishCardIndex: '01 / LANGUAGE PRACTICE',
  spanishCardTitle: 'Write one short Spanish reply.',
  spanishCardIntro: 'Use an ordinary, non-sensitive situation. The model waits for your attempt, suggests no more than two changes, and asks for a revision.',
  spanishCardLink: 'Read the practice boundary',
  spanishCardBoundary: 'Candidate practice only: one session cannot show fluency, accuracy, retention, or independent performance.',
  spanishPromptText: 'I have five minutes for beginner Spanish practice.\n\nOutcome: I want to write one polite two-sentence reply for [a simple situation].\nStarting context: [words I know, a self-written attempt, or "unknown"].\n\nGive me one short situation and wait for my reply. Do not assign a level or claim that I have learned Spanish. After I reply, point out at most two changes that would most affect meaning or politeness. For each change, say whether you are uncertain. Ask me for one revision.\n\nDo not use personal information, browse, contact anyone, or turn this into a study plan. End by listing: my first reply, my revision, help used, one thing I should check elsewhere, and the smallest next practice or stop condition.',
  researchCardIndex: '02 / RESEARCH PREP',
  researchCardTitle: 'Prepare a source check, not a verdict.',
  researchCardIntro: 'Turn one narrow question and the material you supplied into a small ledger of claims, gaps, and the next question.',
  researchCardLink: 'Read the research boundary',
  researchCardBoundary: 'It cannot prove a source exists, is current, or supports a claim. A generated table is not evidence on its own.',
  researchPromptText: 'I have five minutes to prepare a research check, not a final answer.\n\nQuestion: [one narrow question].\nMaterial I supplied: [URLs, titles, excerpts, or "none"].\n\nFirst, restate the question and name what evidence would be needed. Then make a three-row table with: possible claim, supplied source or "missing", and what would need checking. Do not invent citations, state that you opened a source you cannot access, or give a recommendation. Separate fact, report, and inference. If the material is missing, contradictory, personal, or high stakes, stop and tell me the smallest safe next step.\n\nEnd with: sources actually supplied, unknowns, and one question I should answer before continuing.',
});

Object.assign(copy.zh, {
  heroSecondary: '试用一张 5 分钟提示词卡',
  promptDeckEyebrow: '可选提示词卡 · 五分钟',
  promptDeckTitle: '先完成一次小对话。',
  promptDeckIntro: '复制一张项目原创的纯文本卡，只替换方括号中的内容，然后自行检查回复。保持结论很小：一次尝试不代表学会语言、完成研究或得到最终答案。',
  promptDeckVisualAlt: '一条有边界的首轮请求包含的六个可见字段',
  promptDeckVisualLabel: '发送前查看六字段检查',
  promptCardScope: '纯文本 · 不授予工具权限',
  promptCardCopy: '复制提示词',
  promptCardCopied: '提示词已复制。只替换方括号中的内容，然后自行检查回复。',
  promptCardCopyFailed: '无法复制提示词，请手动选择文字。',
  spanishCardIndex: '01 / 语言练习',
  spanishCardTitle: '写一条简短的西班牙语回复。',
  spanishCardIntro: '只用于普通、非敏感的情境。模型会等你先尝试，最多提出两项修改，再请你修订。',
  spanishCardLink: '阅读练习边界',
  spanishCardBoundary: '仅为 candidate 练习：一次对话不能证明流利度、准确性、记忆保持或独立表现。',
  spanishPromptText: '我有五分钟练习初级西班牙语。\n\n目标：我想为[一个简单情境]写一条礼貌的两句回复。\n起始背景：[我认识的词、我自己写的尝试，或“未知”]。\n\n请给我一个简短情境，然后等待我的回复。不要给我定级，也不要声称我已经学会西班牙语。等我回复后，最多指出两项最影响含义或礼貌的修改。对于每项修改，请说明你是否不确定。请我完成一次修订。\n\n不要使用个人信息、浏览网页、联系任何人，也不要把它变成学习计划。最后列出：我的第一次回复、我的修订、使用过的帮助、我应在别处核对的一件事，以及下一次最小练习或停止条件。',
  researchCardIndex: '02 / 研究准备',
  researchCardTitle: '准备一次来源检查，不要索要裁决。',
  researchCardIntro: '把一个狭窄问题和你提供的材料变成一份小型台账：可能的声明、缺口和下一个问题。',
  researchCardLink: '阅读研究边界',
  researchCardBoundary: '它不能证明来源存在、仍然有效，或确实支持某项声明。生成的表格本身不是证据。',
  researchPromptText: '我有五分钟准备一次研究检查，而不是得到最终答案。\n\n问题：[一个狭窄问题]。\n我提供的材料：[网址、标题、摘录，或“无”]。\n\n先复述问题，并说明需要哪些证据。然后做一个三行表格，包含：可能的声明、我提供的来源或“缺失”、以及需要核对的内容。不要虚构引用，不要声称你打开了无法访问的来源，也不要给出建议。区分事实、报告和推断。如果材料缺失、相互矛盾、涉及个人信息或高风险，请停止并告诉我最小的安全下一步。\n\n最后列出：实际提供的来源、未知之处，以及我继续前应回答的一个问题。',
});

Object.assign(copy.en, {
  heroPrimary: 'Start the Codex Practice Track',
  heroSecondary: 'See the optional no-setup warm-up',
  heroRouteAria: 'Choose the recommended first route',
  heroRouteKicker: 'Choose by your starting condition',
  heroRouteGuidedTitle: 'Have a disposable project? Follow the guided path.',
  heroRouteGuidedBody: 'Start with Chapter 1. The first local edit comes after its scope and evidence boundary are visible.',
  heroRouteFixtureTitle: 'No disposable project yet? Use the safe fixture at the Chapter 2 decision.',
  heroRouteFixtureBody: 'It supplies one offline target and check. It does not replace the guided Codex path.',
  heroEyebrow: 'Candidate guide · basic structure and checks pass',
  heroRouteBoundary: 'Candidate means the basic structure and checks pass; first-time reader outcomes are still unmeasured.',
  heroProofAria: 'Optional warm-up proof card',
  heroProofKicker: 'OPTIONAL WARM-UP / INSPECTABLE EXAMPLE',
  heroProofLink: 'Open the optional 15-minute check',
  mobileRouteTask: 'Start the Codex Practice Track',
  mobileRouteFixture: 'Need a safe file? Open the fixture',
  startIntro: 'For a real local Codex task, begin with one candidate path: boundary map, boundary lab, bounded task, then one reversible lab. Pick another route only when that path does not fit.',
  problemStartTitle: 'I want one safe Codex path.',
  problemStartBody: 'Start with the boundary map, then use Lab 011 to label it before choosing one disposable README change with a diff, focused check, and unverified list.',
  problemStartLink: 'Start Chapter 1 → Lab 011 → Chapter 2 → Lab 001 · candidate / draft ↗',
  first30Eyebrow: 'Optional 15-minute warm-up',
  first30Intro: 'The text, task, and checks are already filled in. Use any chat model; you need no files, terminal, Git, account connection, or special vocabulary. This warm-up rehearses one checking habit; start the Codex path above for a real local task.',
});

Object.assign(copy.zh, {
  heroPrimary: '开始 Codex 旗舰实践路线',
  heroSecondary: '查看可选的免设置热身',
  heroRouteAria: '选择推荐的第一条路线',
  heroRouteKicker: '按你的起始条件选择',
  heroRouteGuidedTitle: '有可丢弃的项目？沿着引导路径开始。',
  heroRouteGuidedBody: '从第 1 章开始。第一次本地编辑会在范围和证据边界清楚之后出现。',
  heroRouteFixtureTitle: '还没有可丢弃的项目？在第 2 章的决策点使用安全夹具。',
  heroRouteFixtureBody: '它提供一个离线目标和检查，不替代有引导的 Codex 路径。',
  heroEyebrow: '候选指南 · 基础结构和检查已通过',
  heroRouteBoundary: '候选表示基础结构和检查已通过；首次读者的学习结果仍未测量。',
  heroProofAria: '可选热身证据卡',
  heroProofKicker: '可选热身 / 可检查示例',
  heroProofLink: '打开可选的 15 分钟检查',
  mobileRouteTask: '开始 Codex 旗舰实践路线',
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
const uiLocales = new Set(['en', 'zh']);
const languageStorageKey = 'codex-field-guide-language';
const languageParam = new URLSearchParams(window.location.search).get('lang');
const hasExplicitLanguageParam = languageParam !== null;
const hasValidLanguageParam = localeTokens.includes(languageParam);
let currentLanguage = hasValidLanguageParam ? languageParam : null;
if (!hasExplicitLanguageParam) {
  try { currentLanguage = localStorage.getItem(languageStorageKey); } catch (_) { currentLanguage = null; }
}
currentLanguage = localeTokens.includes(currentLanguage) ? currentLanguage : localeManifest.default_locale;
let effectiveUiLanguage = uiLocales.has(currentLanguage) ? currentLanguage : 'en';

const currentCopy = () => copy[effectiveUiLanguage] || copy.en;
const dataLanguage = () => effectiveUiLanguage === 'zh' ? 'zh' : 'en';
const localeDisplayName = (language) => localeManifest.locales[language]?.display_name || language;
const localeHasUiCopy = (language) => uiLocales.has(language);
const localeIsReady = (record) => record?.exists && ['source', 'verified', 'production-ready'].includes(record.translation_status);
const pagesArtifactMode = Boolean(window.CODEX_PAGES_ARTIFACT);
let searchIndex = window.CODEX_SEARCH_INDEX || null;
let searchIndexLoadPromise = null;
let searchRunGeneration = 0;
const pathFromHref = (href) => {
  if (!href || href.startsWith('#') || /^(?:https?:|mailto:|javascript:)/i.test(href)) return null;
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
const contentIdForHref = (href) => localeManifest.path_index?.[pathFromHref(href) || ''];
const localizedContentHref = (contentId, fallbackHref) => {
  const content = contentFor(contentId);
  if (!content) return fallbackHref || '';
  const requested = content.locales?.[currentLanguage];
  const target = localeIsReady(requested) ? requested : content.locales?.en;
  if (!target?.path) return fallbackHref || '';
  const hash = fallbackHref?.includes('#') ? fallbackHref.slice(fallbackHref.indexOf('#')) : '';
  return `../${target.path}${hash}`;
};
const localizeReaderLinks = () => {
  document.querySelectorAll('a[href]').forEach((anchor) => {
    if (anchor.closest('[data-language-switcher]')) return;
    const sourceHref = anchor.dataset.sourceHref || anchor.getAttribute('href');
    const contentId = anchor.dataset.contentId || contentIdForHref(sourceHref);
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
    anchor.dataset.localeFallback = localeIsReady(requested) ? 'false' : 'true';
    if (!localeIsReady(requested) && currentLanguage !== 'en') {
      anchor.title = `${localeDisplayName(currentLanguage)} translation pending · current available source`;
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
    script.src = 'search-index.js?v=20260813-lazy-search';
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
      anchor.textContent = item.name?.[dataLanguage()] || item[dataLanguage() === 'zh' ? 1 : 0];
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
    anchor.textContent = item.name?.[dataLanguage()] || item[dataLanguage() === 'zh' ? 1 : 0];
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
  document.title = effectiveUiLanguage === 'zh' ? 'Prysai 大模型实战手册：从第一个任务到可靠交付' : 'Prysai LLM Playbook — From First Task to Reliable Work';
  document.querySelector('meta[name="description"]').content = effectiveUiLanguage === 'zh'
    ? '学习可迁移的大语言模型协作方法，并在 Codex 旗舰轨道中深入实践。'
    : 'Learn a practical language-model collaboration method, then practise it deeply in the Codex Practice Track.';
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
    if (fallbackLabel) fallbackLabel.textContent = fallback ? (strings.localeOptionFallback || 'English UI fallback') : '';
    const url = new URL(window.location.href);
    url.searchParams.set('lang', element.dataset.languageOption);
    element.href = `${url.pathname}${url.search}${url.hash}`;
  });
  updateLevel(document.querySelector('.level-tab.is-active')?.dataset.level || 'L0', false);
  updateRouteStatus(document.querySelector('.filter-button.is-active')?.dataset.filter || 'all');
  localizeReaderLinks();
  if (typeof renderFirstWinRecord === 'function') renderFirstWinRecord();
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

const updateLevel = (level, focus = false) => {
  const data = learningPath[level];
  const languageIndex = dataLanguage() === 'zh' ? 1 : 0;
  const title = data.headline?.[dataLanguage()] || data.title?.[languageIndex];
  const description = data.description?.[dataLanguage()] || data.capability?.[dataLanguage()] || data.description?.[languageIndex];
  const nextChapter = data.next?.chapter || data.chapters[0];
  const nextLab = data.next?.lab || data.labs[0];
  document.querySelectorAll('[data-level-label]').forEach((element) => { element.textContent = level; });
  document.querySelector('[data-level-title]').textContent = title;
  document.querySelector('[data-level-description]').textContent = description;
  document.querySelector('[data-level-status]').textContent = data.status;
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
    text.textContent = data.gate[key][dataLanguage()] || data.gate[key][languageIndex];
    item.append(label, text);
    gate.append(item);
  });
  document.querySelector('[data-level-graduation]').textContent = data.graduation[dataLanguage()] || data.graduation[languageIndex];
  document.querySelector('[data-level-blocked]').textContent = data.blocked[dataLanguage()] || data.blocked[languageIndex];
  const link = document.querySelector('[data-level-link]');
  link.href = hrefForItem(nextChapter);
  link.dataset.contentId = nextChapter.content_id || localeManifest.aliases?.[nextChapter.id] || '';
  link.querySelector('[data-level-link-text]').textContent = data.next?.label?.[dataLanguage()] || data.next?.label?.[languageIndex] || (dataLanguage() === 'zh' ? `打开${nextChapter.name?.zh || nextChapter[1]}` : `Open ${nextChapter.name?.en || nextChapter[0]}`);
  const labLink = document.querySelector('[data-level-lab-link]');
  labLink.href = hrefForItem(nextLab);
  labLink.dataset.contentId = nextLab.content_id || localeManifest.aliases?.[nextLab.id] || '';
  labLink.querySelector('[data-level-lab-link-text]').textContent = nextLab.name?.[dataLanguage()] || nextLab.name?.[languageIndex];
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
  menuToggle.setAttribute('aria-label', open ? (effectiveUiLanguage === 'zh' ? '关闭导航' : 'Close navigation') : currentCopy().menuAria);
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
const rescueCopyButton = document.querySelector('[data-copy-rescue]');
const rescuePrompt = document.querySelector('[data-rescue-prompt]');
const starterCopyStatus = document.querySelector('[data-copy-starter-status]');
const firstWinChecks = [...document.querySelectorAll('[data-first-win-check]')];
const firstWinCompare = document.querySelector('[data-first-win-compare]');
const firstWinComparison = document.querySelector('[data-first-win-comparison]');
const firstWinReceipt = document.querySelector('[data-first-win-receipt]');
const firstWinGate = document.querySelector('[data-first-win-check-gate]');
const firstWinCopyRecord = document.querySelector('[data-copy-first-win-record]');
const firstWinRecordStatus = document.querySelector('[data-first-win-record-status]');
const firstWinHelp = document.querySelector('[data-first-win-help]');
const firstWinCorrection = document.querySelector('[data-first-win-correction]');
const firstWinRecoveryLink = document.querySelector('[data-first-win-recovery-link]');

const firstWinRecord = () => {
  const values = Object.fromEntries(['facts_kept', 'action_kept', 'nothing_invented'].map((name) => [
    name,
    document.querySelector(`[data-first-win-check="${name}"]:checked`)?.value || 'NOT_RECORDED',
  ]));
  const firstNonPass = Object.entries(values).find(([, value]) => value !== 'PASS')?.[0] || 'none';
  const complete = Object.values(values).every((value) => value !== 'NOT_RECORDED');
  const accepted = complete && firstNonPass === 'none';
  return { ...values, firstNonPass, complete, accepted };
};

const renderFirstWinRecord = () => {
  if (!firstWinReceipt || !firstWinGate) return;
  const record = firstWinRecord();
  const help = firstWinHelp?.value || 'not_recorded';
  const correction = firstWinCorrection?.value || 'not_recorded';
  firstWinReceipt.textContent = [
    'task: fictional-workshop-message',
    `facts_kept: ${record.facts_kept.toLowerCase()}`,
    `action_kept: ${record.action_kept.toLowerCase()}`,
    `nothing_invented: ${record.nothing_invented.toLowerCase()}`,
    `first_nonpass: ${record.firstNonPass}`,
    `help_used: ${help}`,
    `correction: ${correction}`,
    `judgment_state: ${record.accepted ? 'all_checks_marked_pass' : record.complete ? 'not_all_checks_marked_pass' : 'incomplete'}`,
    'claim_limit: one self-recorded checked attempt; not evidence of learning, transfer, or model quality',
  ].join('\n');
  firstWinCompare.disabled = !record.complete;
  firstWinRecoveryLink.hidden = !record.complete || record.accepted;
  if (!record.complete) firstWinGate.textContent = currentCopy().starterCheckGate;
  else if (record.accepted) firstWinGate.textContent = currentCopy().starterCheckReady;
  else firstWinGate.textContent = currentCopy().starterCheckRecovery;
};

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
    if (firstWinHelp && firstWinHelp.value === 'not_recorded') firstWinHelp.value = 'first_prompt';
    renderFirstWinRecord();
  } catch {
    starterCopyStatus.textContent = currentCopy().starterCopyFailed;
  }
});

rescueCopyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(rescuePrompt?.textContent || '');
    starterCopyStatus.textContent = currentCopy().starterRescueCopied;
    if (firstWinHelp) {
      firstWinHelp.value = firstWinHelp.value === 'first_prompt' ? 'both' : 'rescue_prompt';
    }
    renderFirstWinRecord();
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

firstWinChecks.forEach((input) => input.addEventListener('change', renderFirstWinRecord));
firstWinHelp?.addEventListener('change', renderFirstWinRecord);
firstWinCorrection?.addEventListener('change', renderFirstWinRecord);
firstWinCompare?.addEventListener('click', () => {
  if (firstWinCompare.disabled) return;
  firstWinComparison.hidden = false;
  firstWinCompare.setAttribute('aria-expanded', 'true');
});
firstWinCopyRecord?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(firstWinReceipt?.textContent || '');
    firstWinRecordStatus.textContent = currentCopy().starterRecordCopied;
  } catch {
    firstWinRecordStatus.textContent = currentCopy().starterRecordCopyFailed;
  }
});
renderFirstWinRecord();

initializeSearch();
applyLanguage(currentLanguage, { updateUrl: hasExplicitLanguageParam && !hasValidLanguageParam });
