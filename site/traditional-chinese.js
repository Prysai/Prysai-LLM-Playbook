/*
 * Prysai's small Traditional Chinese presentation layer.
 *
 * The map is intentionally local and deterministic. It is used only for the
 * seventh locale's UI copy and generated metadata; it is not a translation
 * engine and it must not be used to rewrite a learner's submitted text.
 */
(() => {
  'use strict';

  const sourceCharacters = '与专业丢两严个为么义习书争于产亲仅从仓们价优伙会传体余偿储关内册写冲决况准凭划则创别务动区协单却历参发变台号后吗听启响团园围国图场坏声处备复够头夹学实审宽对寻导将尝层届属带帮并库应开异弃张归当录径忆怀态总惯愿战户执扩护报担拥择换据撑敛数断无旧时显晒暂机权条来构标样档检槛横残气汇沟没洁测浏润淀滚点热状独狭献环现画畅盖盘础确碍离种称稳竖筛简类纠约级纯纳线练组细织终经绑结给绝统继绪续维缀编网职联肃舰节范荐获营虚补装见观规视览觉触计订认讨让议记讲许论设访证评识诉诊词译试话询该详语误说请诺读课谁调负贡责败账质贴费赖践轨转轮软载较辅辑输辞边达迁过运还这进连迟适选遗采释里针钟链销错键长门闭问间阅队阵阶际险随隐静韩页顶项顺须预领题额风馆验骤鲜';
  const targetCharacters = '與專業丟兩嚴個為麼義習書爭於產親僅從倉們價優夥會傳體餘償儲關內冊寫衝決況準憑劃則創別務動區協單卻歷參發變臺號後嗎聽啟響團園圍國圖場壞聲處備復夠頭夾學實審寬對尋導將嘗層屆屬帶幫並庫應開異棄張歸當錄徑憶懷態總慣願戰戶執擴護報擔擁擇換據撐斂數斷無舊時顯曬暫機權條來構標樣檔檢檻橫殘氣匯溝沒潔測瀏潤澱滾點熱狀獨狹獻環現畫暢蓋盤礎確礙離種稱穩豎篩簡類糾約級純納線練組細織終經綁結給絕統繼緒續維綴編網職聯肅艦節範薦獲營虛補裝見觀規視覽覺觸計訂認討讓議記講許論設訪證評識訴診詞譯試話詢該詳語誤說請諾讀課誰調負貢責敗賬質貼費賴踐軌轉輪軟載較輔輯輸辭邊達遷過運還這進連遲適選遺採釋裡針鍾鏈銷錯鍵長門閉問間閱隊陣階際險隨隱靜韓頁頂項順須預領題額風館驗驟鮮';
  const characterMap = Object.fromEntries([...sourceCharacters].map((character, index) => [character, [...targetCharacters][index]]));

  // These are Taiwan-facing product terms. The character map handles the
  // orthography; this table handles terms whose regional word choice matters.
  const phraseMap = {
    '搜索章节': '搜尋章節',
    '项目索引': '專案索引',
    '学习路径': '學習路徑',
    '搜索': '搜尋',
    '文件': '檔案',
    '软件': '軟體',
    '链接': '連結',
    '项目': '專案',
    '账户': '帳戶',
    '帐号': '帳號',
    '账号': '帳號',
    '信息': '資訊',
    '资讯': '資訊',
    '程序': '程式',
    '用户': '使用者',
    '视频': '影片',
    '创建': '建立',
    '工作流程': '工作流程',
    '工作流': '工作流程',
    '内存': '記憶體',
    '硬盘': '硬碟',
    '网页': '網頁',
    '网络': '網路',
    '平台': '平臺',
    '默认': '預設',
    '设置': '設定',
    '保存': '儲存',
    '登录': '登入',
    '发布': '發佈',
    '资料': '資料',
    '数据': '資料',
    '连接': '連線',
    '回复': '回覆',
    '回执': '回執',
    '页面': '頁面',
    '菜单': '選單',
    '内容': '內容',
    '输出': '輸出',
    '输入': '輸入',
    '状态': '狀態',
    '重试': '重試',
    '失败': '失敗',
    '验证': '驗證',
    '证据': '證據',
    '来源': '來源',
    '翻译': '翻譯',
    '语言': '語言',
    '章节': '章節',
    '实验': '實驗',
    '实践': '實踐',
    '练习': '練習',
    '基础': '基礎',
    '检查': '檢查',
    '复核': '複核',
    '审查': '審查',
    '让': '讓',
    '选择': '選擇',
    '打开': '開啟',
    '关闭': '關閉',
    '更新': '更新',
    '运行': '執行',
    '发现': '發現',
    '处理': '處理',
    '查找': '尋找',
    '确认': '確認',
    '正确': '正確',
    '错误': '錯誤',
    '问题': '問題',
    '阅读': '閱讀',
    '开始': '開始',
    '完成': '完成',
    '当前': '目前',
    '自动': '自動',
    '切换': '切換',
    '简体中文': '簡體中文',
    '繁体中文': '繁體中文',
    '提示词': '提示詞',
  };
  // Match phrase keys in one pass. Sequential replacement is unsafe when a
  // target also contains a source key ("工作流程" would become
  // "工作流程程" after the "工作流" rule).
  const phrasePattern = new RegExp(
    Object.keys(phraseMap)
      .sort((left, right) => right.length - left.length)
      .map((source) => source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|'),
    'g',
  );

  function traditionalizeText(value) {
    let result = String(value);
    result = result.replace(phrasePattern, (source) => phraseMap[source]);
    return [...result].map((character) => characterMap[character] || character).join('');
  }

  function traditionalize(value) {
    if (typeof value === 'string') return traditionalizeText(value);
    if (typeof value === 'function') return (...args) => traditionalize(value(...args));
    if (Array.isArray(value)) return value.map((item) => traditionalize(item));
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, traditionalize(item)]));
    }
    return value;
  }

  window.PRYSAI_TRADITIONALIZE = traditionalize;
  window.PRYSAI_TRADITIONALIZE_TEXT = traditionalizeText;
})();
