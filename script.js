const header = document.querySelector("[data-header]");
const estimate = document.querySelector("#estimate");
const couplers = document.querySelector("#couplers");
const pipes = document.querySelector("#pipes");
const days = document.querySelector("#days");
const form = document.querySelector("#quoteForm");
const formResult = document.querySelector("#formResult");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0
  }).format(value);
}

function updateEstimate() {
  const couplerCount = Number(couplers.value) || 0;
  const pipeMeters = Number(pipes.value) || 0;
  const rentalDays = Math.max(Number(days.value) || 1, 1);
  const couplerDaily = 0.006;
  const pipeDaily = 0.018;
  const subtotal = (couplerCount * couplerDaily + pipeMeters * pipeDaily) * rentalDays;
  const transport = subtotal > 0 ? 900 : 0;

  estimate.textContent = `约 ${formatCurrency(subtotal + transport)}`;
}

function handleQuoteSubmit(event) {
  event.preventDefault();
  const data = new FormData(form);
  const project = data.get("project").trim();
  const area = data.get("area").trim();
  const period = data.get("period");
  const materials = data.get("materials").trim() || "材料清单待补充";
  const recipient = "13913933537@163.com";
  const subject = `钢管脚手架扣件租赁询价 - ${project}`;
  const body = [
    "您好，我想咨询钢管脚手架扣件租赁：",
    "",
    `项目名称：${project}`,
    `所在区域：${area}`,
    `预计租期：${period}`,
    `材料需求：${materials}`,
    "",
    "请联系我确认报价，谢谢。"
  ].join("\n");
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  formResult.innerHTML = `已生成邮件，请在弹出的邮件窗口中发送。若没有自动打开，<a href="${mailto}">点这里发送到 ${recipient}</a>。`;
  window.location.href = mailto;
}

window.addEventListener("scroll", updateHeader, { passive: true });
[couplers, pipes, days].forEach((field) => field.addEventListener("input", updateEstimate));
form.addEventListener("submit", handleQuoteSubmit);

updateHeader();
updateEstimate();
