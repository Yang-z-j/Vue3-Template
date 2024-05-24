// 系统自动更新提示
// 上一次src数据
let lastSrcs: string[];

// 自动刷新的间隔时间
const DURATION: number = 1000 * 60 * 60; // 1小时

// 正则表达式用于匹配<script>标签的src属性
const scriptReg = /<script.*src=["'](?<src>[^"']+)/gm;

// 异步函数，用于提取网页中的新<script>标签的src属性值
async function extractNewScripts(): Promise<string[]> {
  const html = await fetch('/?_timestamp=' + Date.now()).then(Response => Response.text());
  scriptReg.lastIndex = 0;
  const result = [];
  let match;
  while ((match = scriptReg.exec(html))) {
    result.push((match.groups || {}).src);
  }
  return result;
}

// 异步函数，用于判断是否有新的<script>标签出现
async function needUpdate(): Promise<boolean> {
  const newScripts = await extractNewScripts();
  if (!lastSrcs) {
    lastSrcs = newScripts;
    return false;
  }
  let result = false;
  if (lastSrcs.length !== newScripts.length) {
    result = true;
  }
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      result = true;
      break;
    }
  }
  lastSrcs = newScripts;
  return result;
}

// 自动刷新函数，使用递归调用
function autoRefresh(): void {
  setTimeout(async () => {
    const willUpdate = await needUpdate();
    if (willUpdate) {
      const result = confirm('系统有更新，点击确定更新页面');
      if (result) {
        location.reload();
      }
    }
    autoRefresh();
  }, DURATION);
}

// 如果是生产环境则执行自动刷新
if (process.env.NODE_ENV === 'production') {
  autoRefresh();
}
