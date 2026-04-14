import { useMemo, useState } from 'react';

const QUESTIONS = [
  {
    text: '当你走进一个陌生聚会时，你通常会怎么做？',
    options: [
      { label: '先找角落，观察全场', score: 0 },
      { label: '等别人来搭话', score: 1 },
      { label: '主动和 1-2 个人聊聊', score: 2 },
      { label: '很快融入一个小圈子', score: 3 },
      { label: '直接成为全场气氛组组长', score: 4 }
    ]
  },
  {
    text: '朋友找你倾诉烦恼时，你第一反应更接近哪种？',
    options: [
      { label: '先递纸巾，再安静听完', score: 0 },
      { label: '认真听，再给稳妥建议', score: 1 },
      { label: '共情+建议，五五开', score: 2 },
      { label: '一边安慰一边想办法', score: 3 },
      { label: '立刻切到“救援队长”模式', score: 4 }
    ]
  },
  {
    text: '做决定时，你更依赖哪一种方式？',
    options: [
      { label: '列清单，慢慢权衡', score: 0 },
      { label: '多问几个人再定', score: 1 },
      { label: '理性和直觉各占一半', score: 2 },
      { label: '快速判断，边做边调', score: 3 },
      { label: '第一感觉就是答案', score: 4 }
    ]
  },
  {
    text: '你更喜欢哪种周末安排？',
    options: [
      { label: '独处充电，低耗能模式', score: 0 },
      { label: '和熟人小范围见面', score: 1 },
      { label: '白天出门，晚上回家', score: 2 },
      { label: '朋友局排满，但留点空档', score: 3 },
      { label: '从早嗨到晚，行程拉满', score: 4 }
    ]
  },
  {
    text: '你在团队合作中更常扮演的角色是？',
    options: [
      { label: '稳稳执行，低调可靠', score: 0 },
      { label: '补位型选手，哪里缺补哪里', score: 1 },
      { label: '协调沟通，连接不同成员', score: 2 },
      { label: '推动节奏，让事情动起来', score: 3 },
      { label: '天然 C 位，带队冲锋', score: 4 }
    ]
  },
  {
    text: '遇到突发变化时，你通常会？',
    options: [
      { label: '先慌 3 秒，再重建计划', score: 0 },
      { label: '确认影响范围后再行动', score: 1 },
      { label: '快速接受，然后调整', score: 2 },
      { label: '觉得刺激，马上切新方案', score: 3 },
      { label: '越突然越兴奋，现场开秀', score: 4 }
    ]
  },
  {
    text: '面对压力时，你更可能？',
    options: [
      { label: '先断联一会儿自我修复', score: 0 },
      { label: '找最信任的人聊聊', score: 1 },
      { label: '自己扛一半，外援一半', score: 2 },
      { label: '把压力转成行动清单', score: 3 },
      { label: '压力越大，我越有梗', score: 4 }
    ]
  },
  {
    text: '你在社交媒体上的状态更像？',
    options: [
      { label: '潜水型，偶尔点赞', score: 0 },
      { label: '发得不多，但很认真', score: 1 },
      { label: '有感就发，随缘更新', score: 2 },
      { label: '活跃互动，评论区常驻', score: 3 },
      { label: '更新高频，账号像综艺', score: 4 }
    ]
  },
  {
    text: '如果临时有一场即兴演讲，你会？',
    options: [
      { label: '紧张但能讲完', score: 0 },
      { label: '准备几分钟再上', score: 1 },
      { label: '边讲边想，基本流畅', score: 2 },
      { label: '很快进入状态，越讲越顺', score: 3 },
      { label: '直接把现场讲成脱口秀', score: 4 }
    ]
  },
  {
    text: '你希望别人对你的第一印象是？',
    options: [
      { label: '靠谱稳重', score: 0 },
      { label: '温和友善', score: 1 },
      { label: '真诚有趣', score: 2 },
      { label: '自信有感染力', score: 3 },
      { label: '超有记忆点，出场即高光', score: 4 }
    ]
  }
];

function getResult(score) {
  if (score >= 32) {
    return {
      level: 'S 级：宇宙显眼包',
      color: 'text-brand-700',
      summary: '你是高能量社交发动机，气场拉满，话题制造能力一流。',
      actions: ['继续保持你的幽默感', '适当留一点舞台给别人', '把你的热情用于带动团队']
    };
  }

  if (score >= 24) {
    return {
      level: 'A 级：稳定魅力王',
      color: 'text-emerald-700',
      summary: '你在轻松和稳重之间平衡得很好，属于大家都愿意相处的类型。',
      actions: ['在关键场合多主动一点', '维持你有分寸的表达风格', '尝试主持一次小型活动']
    };
  }

  if (score >= 16) {
    return {
      level: 'B 级：温柔观察家',
      color: 'text-amber-700',
      summary: '你慢热但真诚，通常先观察再投入，一旦熟悉就很有存在感。',
      actions: ['给自己一点表达空间', '把想法更直接地说出来', '在熟悉圈层里多尝试主导']
    };
  }

  return {
    level: 'C 级：神秘省电模式',
    color: 'text-rose-700',
    summary: '你偏内向谨慎，社交电量宝贵，但你的深度和专注是独特优势。',
    actions: ['在安全场景下逐步表达', '从一对一交流建立自信', '把你的独特观点记录和分享出来']
  };
}

export default function App() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const answeredCount = useMemo(
    () => answers.filter((value) => value !== null).length,
    [answers]
  );
  const totalScore = useMemo(
    () => answers.reduce((sum, value) => sum + (value ?? 0), 0),
    [answers]
  );
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);
  const result = getResult(totalScore);

  const onAnswer = (questionIndex, score) => {
    const next = [...answers];
    next[questionIndex] = score;
    setAnswers(next);
  };

  const onSubmit = () => {
    if (answeredCount !== QUESTIONS.length) return;
    setShowResult(true);
  };

  const onReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShowResult(false);
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8">
      <section className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-100/60 backdrop-blur md:p-8">
        <div className="mb-6">
          <p className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-900">
            Silly Big Personality Test
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            SBTI 测试网站
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
            这是一个轻松搞笑向的 Silly Big Personality Test。每题 0-4 分，总分越高说明你的“人格舞台感”越强。
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
            <span>完成进度</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-5">
          {QUESTIONS.map((question, index) => (
            <article key={question.text} className="rounded-xl border border-slate-200 p-4 md:p-5">
              <p className="text-sm font-semibold text-slate-900 md:text-base">
                {index + 1}. {question.text}
              </p>
              <div className="mt-3 grid gap-2 md:grid-cols-5">
                {question.options.map((option) => {
                  const active = answers[index] === option.score;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => onAnswer(index, option.score)}
                      className={[
                        'rounded-lg border px-3 py-2 text-xs font-medium transition md:text-sm',
                        active
                          ? 'border-brand-500 bg-brand-50 text-brand-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50'
                      ].join(' ')}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={answeredCount !== QUESTIONS.length}
            className="rounded-lg bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-900 disabled:cursor-not-allowed disabled:opacity-45"
          >
            查看测试结果
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            重新测试
          </button>
          <p className="text-sm text-slate-500">
            你的搞笑人格能量值：<span className="font-semibold text-slate-700">{totalScore}</span> / 40
          </p>
        </div>

        {showResult && (
          <section className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
            <h2 className="text-lg font-bold text-slate-900">测试结论</h2>
            <p className={`mt-2 text-base font-semibold ${result.color}`}>{result.level}</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{result.summary}</p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-900">建议下一步：</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {result.actions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
