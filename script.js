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

  formResult.textContent = `询价信息：${project}，${area}，预计租期${period}，需求：${materials}。`;
}

window.addEventListener("scroll", updateHeader, { passive: true });
[couplers, pipes, days].forEach((field) => field.addEventListener("input", updateEstimate));
form.addEventListener("submit", handleQuoteSubmit);

updateHeader();
updateEstimate();
