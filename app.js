const state = {
  displayCurrency: "CNY",
  language: "en",
  currentMonth: new Date(2026, 4, 1),
  statsMode: "stats",
  activeBudgetCategory: null,
  editingTransactionId: null,
  editingAccountId: null,
  budgets: {
    total: 32000,
    categories: {
      "E-shopping": 1000,
      Food: 3000,
      Grocery: 800,
      Household: 900,
      Transport: 700,
      Apparel: 1200,
      Culture: 1200,
      Travel: 1800,
      Others: 26000,
    },
  },
  ratesToCny: {
    CNY: 1,
    EUR: 7.82,
    USD: 7.24,
  },
  accounts: [
    { name: "Cash", group: "Cash", currency: "CNY", balance: 0, liability: false },
    { name: "PayPal", group: "Accounts", currency: "EUR", balance: 5.19, liability: false },
    { name: "Alipay", group: "Accounts", currency: "CNY", balance: 55732.4, liability: false },
    { name: "WeChat", group: "Accounts", currency: "CNY", balance: -187.71, liability: true },
    { name: "Wise", group: "Accounts", currency: "USD", balance: 20, liability: false },
    { name: "招商银行", group: "Card", currency: "CNY", balance: 42.33, liability: false },
    { name: "北京银行", group: "Card", currency: "CNY", balance: 2365.7, liability: false },
    { name: "Revolut", group: "Debit Card", currency: "EUR", balance: -154.62, liability: true },
    { name: "AIB", group: "Debit Card", currency: "EUR", balance: 100, liability: false },
    { name: "Index Fund", group: "Investments", currency: "CNY", balance: 5935.71, liability: false },
  ],
  transactions: [
    { date: "2026-05-29", type: "income", amount: 8800, currency: "CNY", category: "Salary", account: "Alipay", note: "Salary", icon: "💼", description: "Monthly salary" },
    { date: "2026-05-29", type: "expense", amount: 188.5, currency: "CNY", category: "Food", account: "WeChat", note: "Dinner", icon: "🍜", description: "Noodles and tea" },
    { date: "2026-05-29", type: "expense", amount: 19.6, currency: "EUR", category: "E-shopping", account: "Revolut", note: "Stationery", icon: "🛍", description: "Notebook" },
    { date: "2026-05-28", type: "income", amount: 17091.85, currency: "CNY", category: "Freelance", account: "Alipay", note: "Project", icon: "💻", description: "Design payment" },
    { date: "2026-05-28", type: "expense", amount: 25.31, currency: "EUR", category: "E-shopping", account: "Revolut", note: "Accessories", icon: "🛍", description: "Online order" },
    { date: "2026-05-28", type: "expense", amount: 209.55, currency: "CNY", category: "Food", account: "WeChat", note: "Lunch", icon: "🍜", description: "Team lunch" },
    { date: "2026-05-27", type: "expense", amount: 17.53, currency: "EUR", category: "Apparel", account: "Revolut", note: "T-shirt", icon: "🥼", description: "Sale item" },
    { date: "2026-05-27", type: "expense", amount: 4.6, currency: "EUR", category: "Household", account: "Revolut", note: "Candle", icon: "🪑", description: "Home" },
    { date: "2026-05-26", type: "expense", amount: 67.59, currency: "CNY", category: "Transport", account: "Alipay", note: "Taxi", icon: "🚕", description: "Airport line" },
    { date: "2026-05-26", type: "expense", amount: 10.76, currency: "CNY", category: "Grocery", account: "Revolut", note: "盒马", icon: "🛒", description: "Fruit" },
    { date: "2026-05-26", type: "expense", amount: 11, currency: "CNY", category: "Transport", account: "Alipay", note: "Subway", icon: "🚕", description: "Line 10" },
    { date: "2026-05-26", type: "expense", amount: 399.37, currency: "CNY", category: "Travel", account: "Alipay", note: "Hotel", icon: "✈️", description: "Shanghai" },
    { date: "2026-05-26", type: "expense", amount: 6.46, currency: "EUR", category: "Food", account: "Revolut", note: "Coffee", icon: "🍜", description: "Morning coffee" },
    { date: "2026-05-26", type: "expense", amount: 38.58, currency: "CNY", category: "Culture", account: "Revolut", note: "Gift", icon: "🖼", description: "Museum shop" },
    { date: "2026-05-25", type: "expense", amount: 25290.98, currency: "CNY", category: "Others", account: "Alipay", note: "Annual payment", icon: "👛", description: "Large annual expense" },
  ],
};

state.accounts = state.accounts.map((account, index) => ({ id: `acc-${index + 1}`, ...account }));
state.transactions = state.transactions.map((transaction, index) => ({ id: `txn-${index + 1}`, ...transaction }));

const symbols = {
  CNY: "¥",
  EUR: "€",
  USD: "US$",
};

const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const categoryColors = ["#dabb75", "#ff995f", "#ffd84f", "#63ddc7", "#80ceff", "#76d975", "#b78cff", "#ff7b7b"];
const iconMap = { Food: "🍜", Travel: "✈️", Grocery: "🛒", Salary: "💼", Transfer: "⇄", Others: "👛", "E-shopping": "🛍", Freelance: "💻", Apparel: "🥼", Household: "🪑", Transport: "🚕", Culture: "🖼" };
const budgetCategories = ["E-shopping", "Food", "Grocery", "Household", "Transport", "Apparel", "Culture", "Travel", "Others"];

const toCny = (amount, currency) => amount * state.ratesToCny[currency];
const fromCny = (amount, currency) => amount / state.ratesToCny[currency];

function formatMoney(amount, currency = state.displayCurrency) {
  return `${symbols[currency]} ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function t(en, zh) {
  return state.language === "zh" ? zh : en;
}

function displayFromCny(amount) {
  return formatMoney(fromCny(amount, state.displayCurrency), state.displayCurrency);
}

function transactionCny(transaction) {
  return toCny(transaction.amount, transaction.currency);
}

function getMonthKey(date = state.currentMonth) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getVisibleTransactions() {
  const key = getMonthKey();
  return state.transactions.filter((transaction) => transaction.date.startsWith(key));
}

function getMonthTitle() {
  return `${monthNames[state.currentMonth.getMonth()]} ${state.currentMonth.getFullYear()}`;
}

function getTotals() {
  return getVisibleTransactions().reduce(
    (totals, transaction) => {
      const amount = transactionCny(transaction);
      if (transaction.type === "income") totals.income += amount;
      if (transaction.type === "expense") totals.expense += amount;
      return totals;
    },
    { income: 0, expense: 0 },
  );
}

function groupBy(items, keyGetter) {
  return items.reduce((groups, item) => {
    const key = keyGetter(item);
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}

function renderTotals() {
  const totals = getTotals();
  document.querySelector("#trans-month-title").textContent = getMonthTitle();
  document.querySelector("#stats-title").textContent = getMonthTitle();
  document.querySelector("#trans-income").textContent = displayFromCny(totals.income);
  document.querySelector("#trans-expense").textContent = displayFromCny(totals.expense);
  document.querySelector("#trans-total").textContent = displayFromCny(totals.income - totals.expense);
  document.querySelector("#stats-income").textContent = displayFromCny(totals.income);
  document.querySelector("#stats-expense").textContent = displayFromCny(totals.expense);
  document.querySelector("#donut-total").textContent = displayFromCny(totals.expense);
}

function renderDaily() {
  const dailyList = document.querySelector("#daily-list");
  const groups = groupBy(
    [...getVisibleTransactions()].sort((a, b) => b.date.localeCompare(a.date)),
    (transaction) => transaction.date,
  );

  const entries = Object.entries(groups);
  if (!entries.length) {
    dailyList.innerHTML = `<div class="empty-state">${t("No transactions this month. Tap + to add one.", "这个月还没有交易记录，点右下角 + 添加一笔。")}</div>`;
    return;
  }

  dailyList.innerHTML = entries
    .map(([date, transactions]) => {
      const day = new Date(`${date}T12:00:00`);
      const income = transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + transactionCny(item), 0);
      const expense = transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + transactionCny(item), 0);
      return `
        <article class="day-group">
          <header class="day-head">
            <div class="day-title">
              <span class="day-number">${day.getDate()}</span>
              <span class="weekday">${weekNames[day.getDay()]}</span>
            </div>
            <span class="day-income income">${displayFromCny(income)}</span>
            <span class="day-expense expense">${displayFromCny(expense)}</span>
          </header>
          ${transactions.map(renderTransactionRow).join("")}
        </article>
      `;
    })
    .join("");
}

function renderTransactionRow(transaction) {
  const amountClass = transaction.type === "income" ? "income" : transaction.type === "transfer" ? "" : "expense";
  const sign = transaction.type === "income" || transaction.type === "transfer" ? "" : "-";
  const meta = transaction.type === "transfer" ? `${transaction.fromAccount} → ${transaction.toAccount}` : transaction.account;
  return `
    <button class="transaction-row" data-transaction-id="${transaction.id}" aria-label="查看或编辑 ${transaction.note}">
      <span class="emoji">${transaction.icon}</span>
      <span class="category">${transaction.category}</span>
      <span>
        <span class="note">${transaction.note}</span>
        <span class="subtext">${meta}</span>
      </span>
      <strong class="amount ${amountClass}">${sign}${formatMoney(transaction.amount, transaction.currency)}</strong>
    </button>
  `;
}

function renderCalendar() {
  const grid = document.querySelector("#calendar-grid");
  const groups = groupBy(getVisibleTransactions(), (transaction) => Number(transaction.date.slice(-2)));
  const daysInMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const transactions = groups[day] || [];
    const expense = transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + transactionCny(item), 0);
    const income = transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + transactionCny(item), 0);
    return `
      <div class="calendar-cell">
        <strong>${day}</strong>
        ${income ? `<span class="income">+${displayFromCny(income)}</span>` : ""}
        ${expense ? `<span class="expense">-${displayFromCny(expense)}</span>` : ""}
      </div>
    `;
  });
  grid.innerHTML = cells.join("");
}

function renderMonthly() {
  const list = document.querySelector("#monthly-list");
  const totals = getTotals();
  list.innerHTML = `
    <div class="month-card"><strong>${getMonthTitle()} Income</strong><span class="income">${displayFromCny(totals.income)}</span></div>
    <div class="month-card"><strong>${getMonthTitle()} Outcome</strong><span class="expense">${displayFromCny(totals.expense)}</span></div>
    <div class="month-card"><strong>Net Cash Flow</strong><span>${displayFromCny(totals.income - totals.expense)}</span></div>
  `;
}

function getCategoryStats() {
  const expenseTransactions = getVisibleTransactions().filter((transaction) => transaction.type === "expense");
  const total = expenseTransactions.reduce((sum, transaction) => sum + transactionCny(transaction), 0);
  const grouped = groupBy(expenseTransactions, (transaction) => transaction.category);
  return Object.entries(grouped)
    .map(([category, transactions], index) => {
      const amount = transactions.reduce((sum, transaction) => sum + transactionCny(transaction), 0);
      const sample = transactions[0];
      return {
        category,
        icon: sample.icon,
        amount,
        percent: total ? Math.round((amount / total) * 100) : 0,
        color: categoryColors[index % categoryColors.length],
      };
    })
    .sort((a, b) => b.amount - a.amount);
}

function getCategoryAmount(category) {
  return getVisibleTransactions()
    .filter((transaction) => transaction.type === "expense" && transaction.category === category)
    .reduce((sum, transaction) => sum + transactionCny(transaction), 0);
}

function getBudgetRows() {
  const statsCategories = getCategoryStats().map((item) => item.category);
  return [...new Set([...budgetCategories, ...statsCategories])].map((category) => {
    const used = getCategoryAmount(category);
    const budget = state.budgets.categories[category] || 0;
    const remaining = budget - used;
    const percent = budget ? Math.round((used / budget) * 100) : 0;
    return {
      category,
      icon: iconMap[category] || "👛",
      used,
      budget,
      remaining,
      percent,
      over: budget > 0 && used > budget,
    };
  });
}

function renderSummary() {
  const stats = getCategoryStats();
  document.querySelector("#summary-list").innerHTML = stats
    .map((item) => `
      <div class="summary-row">
        <span class="emoji">${item.icon}</span>
        <span>
          <strong>${item.category}</strong>
          <span class="bar"><span style="width:${item.percent}%; background:${item.color}"></span></span>
        </span>
        <strong>${displayFromCny(item.amount)}</strong>
      </div>
    `)
    .join("") || `<div class="empty-state">${t("No category summary this month.", "这个月还没有分类摘要。")}</div>`;
}

function renderDescription() {
  const rows = getVisibleTransactions()
    .filter((transaction) => transaction.description)
    .map((transaction) => `
      <button class="description-row" data-transaction-id="${transaction.id}" aria-label="查看或编辑 ${transaction.note}">
        <span class="emoji">${transaction.icon}</span>
        <span>
          <strong>${transaction.note}</strong>
          <span class="subtext">${transaction.description}</span>
        </span>
        <strong class="${transaction.type === "income" ? "income" : "expense"}">${formatMoney(transaction.amount, transaction.currency)}</strong>
      </button>
    `)
    .join("");
  document.querySelector("#description-list").innerHTML = rows || `<div class="empty-state">${t("No descriptions this month.", "这个月还没有带描述的记录。")}</div>`;
}

function renderStats() {
  const stats = getCategoryStats();
  const total = stats.reduce((sum, item) => sum + item.amount, 0);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const rings = stats
    .map((item) => {
      const share = total ? item.amount / total : 0;
      const length = share * circumference;
      const circle = `
        <circle cx="119" cy="119" r="${radius}" fill="none" stroke="${item.color}" stroke-width="62"
          stroke-dasharray="${length} ${circumference - length}" stroke-dashoffset="${-offset}"
          stroke-linecap="butt"></circle>
      `;
      offset += length;
      return circle;
    })
    .join("");
  document.querySelector("#donut-chart").innerHTML = `
    <svg viewBox="0 0 238 238" aria-hidden="true">
      <circle cx="119" cy="119" r="${radius}" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="62"></circle>
      ${rings}
    </svg>
  `;
  document.querySelector("#rank-list").innerHTML = stats
    .map((item) => `
      <div class="rank-row">
        <span class="percent" style="background:${item.color}">${item.percent}%</span>
        <strong>${item.icon} ${item.category}</strong>
        <strong>${displayFromCny(item.amount)}</strong>
      </div>
    `)
    .join("") || `<div class="empty-state">${t("No expense stats this month.", "这个月还没有支出统计。")}</div>`;
}

function renderBudget() {
  const used = getTotals().expense;
  const budget = state.budgets.total;
  const remaining = budget - used;
  const percent = budget ? Math.round((used / budget) * 100) : 0;
  const over = budget > 0 && used > budget;
  document.querySelector("#budget-remaining").textContent = displayFromCny(remaining);
  document.querySelector("#budget-monthly").textContent = displayFromCny(budget);
  document.querySelector("#budget-used").textContent = displayFromCny(used);
  document.querySelector("#budget-percent").textContent = `${percent}%`;
  document.querySelector("#budget-progress-bar").style.width = `${Math.min(percent, 100)}%`;
  document.querySelector("#budget-progress-bar").classList.toggle("is-over", over);
  document.querySelector("#budget-list").innerHTML = getBudgetRows()
    .map((row) => {
      const width = row.budget ? Math.min(row.percent, 100) : 0;
      return `
        <button class="budget-row" data-budget-category="${row.category}" aria-label="查看 ${row.category} 预算详情">
          <span class="budget-name">${row.icon} ${row.category}<small>${displayFromCny(row.budget)}</small></span>
          <span class="budget-bar"><span class="${row.over ? "is-over" : ""}" style="width:${width}%"></span></span>
          <span class="budget-numbers"><strong>${displayFromCny(row.used)}</strong><small>${row.budget ? row.percent : 0}%</small></span>
        </button>
      `;
    })
    .join("");
}

function renderStatsMode() {
  document.querySelectorAll("[data-stats-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.statsMode === state.statsMode);
  });
  document.querySelectorAll(".stats-content").forEach((content) => content.classList.remove("is-active"));
  document.querySelector(`#${state.statsMode}-content`)?.classList.add("is-active");
  document.querySelector("#budget-edit-btn").classList.toggle("is-visible", state.statsMode === "budget");
}

function renderRateControl() {
  const input = document.querySelector("#manual-rate");
  const currency = state.displayCurrency;
  input.value = state.ratesToCny[currency];
  input.disabled = currency === "CNY";
  input.setAttribute("aria-label", currency === "CNY" ? "CNY exchange rate" : `1 ${currency} to CNY exchange rate`);
}

function renderAccounts() {
  const list = document.querySelector("#account-list");
  const groups = groupBy(state.accounts, (account) => account.group);
  const assets = state.accounts.filter((account) => !account.liability && account.balance >= 0).reduce((sum, account) => sum + toCny(account.balance, account.currency), 0);
  const liabilities = state.accounts.filter((account) => account.liability || account.balance < 0).reduce((sum, account) => sum + toCny(account.balance, account.currency), 0);

  document.querySelector("#asset-total").textContent = displayFromCny(assets);
  document.querySelector("#liability-total").textContent = displayFromCny(liabilities);
  document.querySelector("#net-total").textContent = displayFromCny(assets + liabilities);

  list.innerHTML = Object.entries(groups)
    .map(([group, accounts]) => {
      const groupTotal = accounts.reduce((sum, account) => sum + toCny(account.balance, account.currency), 0);
      return `
        <div class="account-row is-group">
          <span>${group}</span>
          <strong>${displayFromCny(groupTotal)}</strong>
        </div>
        ${accounts
          .map((account) => `
            <button class="account-row" data-account-id="${account.id}" aria-label="查看或编辑 ${account.name}">
              <span>${account.name}<small>${account.currency} balance: ${formatMoney(account.balance, account.currency)}</small></span>
              <strong class="${account.balance < 0 ? "expense" : "income"}">${displayFromCny(toCny(account.balance, account.currency))}</strong>
            </button>
          `)
          .join("")}
      `;
    })
    .join("");

  const accountSelect = document.querySelector("#trans-account-select");
  accountSelect.innerHTML = state.accounts.map((account) => `<option>${account.name}</option>`).join("");
  document.querySelector("#transfer-from-select").innerHTML = state.accounts.map((account) => `<option>${account.name}</option>`).join("");
  document.querySelector("#transfer-to-select").innerHTML = state.accounts.map((account) => `<option>${account.name}</option>`).join("");
}

function renderAll() {
  renderTotals();
  renderDaily();
  renderCalendar();
  renderMonthly();
  renderSummary();
  renderDescription();
  renderStats();
  renderBudget();
  renderStatsMode();
  renderAccounts();
  renderRateControl();
  applyLanguage();
}

function bindNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("is-active"));
      document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("is-active"));
      button.classList.add("is-active");
      document.querySelector(`#screen-${button.dataset.screen}`).classList.add("is-active");
      document.querySelector("#add-trans-btn").style.display = button.dataset.screen === "more" ? "none" : "grid";
    });
  });

  document.querySelectorAll(".view-tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".view-tab").forEach((item) => item.classList.remove("is-active"));
      document.querySelectorAll(".trans-view").forEach((view) => view.classList.remove("is-active"));
      button.classList.add("is-active");
      document.querySelector(`#view-${button.dataset.view}`).classList.add("is-active");
    });
  });

  document.querySelectorAll(".month-nav").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentMonth = new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + Number(button.dataset.step), 1);
      renderAll();
    });
  });

  document.querySelectorAll("[data-stats-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.statsMode = button.dataset.statsMode;
      renderStatsMode();
    });
  });

  document.querySelector("#budget-setting-btn").addEventListener("click", () => openBudgetSettingModal());
  document.querySelector("#budget-edit-btn").addEventListener("click", () => openBudgetSettingModal(state.activeBudgetCategory));
  document.querySelector("#budget-list").addEventListener("click", (event) => {
    const row = event.target.closest("[data-budget-category]");
    if (row) openBudgetDetail(row.dataset.budgetCategory);
  });
  document.querySelector("#budget-detail-list").addEventListener("click", (event) => {
    const row = event.target.closest("[data-transaction-id]");
    if (!row) return;
    document.querySelector("#budget-detail-modal").close();
    openTransactionModal(row.dataset.transactionId);
  });
}

function bindModals() {
  const transactionModal = document.querySelector("#transaction-modal");
  const accountModal = document.querySelector("#account-modal");

  document.querySelector("#add-trans-btn").addEventListener("click", () => openTransactionModal());
  document.querySelector("#search-btn").addEventListener("click", () => openSearchModal());
  document.querySelector("#add-account-btn").addEventListener("click", () => openAccountModal());
  document.querySelector("#edit-account-btn").addEventListener("click", () => {
    document.querySelector("#screen-accounts").classList.toggle("is-editing");
    showToast(document.querySelector("#screen-accounts").classList.contains("is-editing") ? t("Account edit mode is on. Tap any account to edit.", "账户编辑模式已开启，点击任一账户进行修改。") : t("Account edit mode is off.", "账户编辑模式已关闭。"));
  });

  document.querySelector("#daily-list").addEventListener("click", (event) => {
    const row = event.target.closest("[data-transaction-id]");
    if (row) openTransactionModal(row.dataset.transactionId);
  });
  document.querySelector("#description-list").addEventListener("click", (event) => {
    const row = event.target.closest("[data-transaction-id]");
    if (row) openTransactionModal(row.dataset.transactionId);
  });
  document.querySelector("#account-list").addEventListener("click", (event) => {
    const row = event.target.closest("[data-account-id]");
    if (row) openAccountModal(row.dataset.accountId);
  });
  document.querySelector("#close-search-btn").addEventListener("click", () => document.querySelector("#search-modal").close());
  document.querySelector("#search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    renderSearchResults(document.querySelector("#search-input").value);
  });
  document.querySelector("#search-results").addEventListener("click", (event) => {
    const row = event.target.closest("[data-search-transaction-id]");
    if (!row) return;
    document.querySelector("#search-modal").close();
    openTransactionModal(row.dataset.searchTransactionId);
  });
  document.querySelectorAll('#transaction-form [name="type"]').forEach((input) => {
    input.addEventListener("change", () => updateTransactionFields());
  });
  document.querySelector('#transaction-form [name="currency"]').addEventListener("change", updateTransferEstimate);
  document.querySelector('#transaction-form [name="amount"]').addEventListener("input", updateTransferEstimate);
  document.querySelector('#transaction-form [name="transferRate"]').addEventListener("input", updateTransferEstimate);

  document.querySelector("#transaction-form").addEventListener("submit", (event) => {
    if (event.submitter?.value === "delete") {
      const id = new FormData(event.currentTarget).get("id");
      state.transactions = state.transactions.filter((transaction) => transaction.id !== id);
      showToast(t("Transaction deleted.", "交易已删除。"));
      renderAll();
      return;
    }
    if (event.submitter?.value !== "save") return;
    const data = new FormData(event.currentTarget);
    const category = data.get("category");
    const type = data.get("type");
    const payload = {
      id: data.get("id") || `txn-${Date.now()}`,
      date: data.get("date"),
      type,
      amount: Number(data.get("amount")),
      currency: data.get("currency"),
      category: type === "transfer" ? "Transfer" : category,
      account: type === "transfer" ? data.get("fromAccount") : data.get("account"),
      fromAccount: data.get("fromAccount"),
      toAccount: data.get("toAccount"),
      transferRate: Number(data.get("transferRate")) || state.ratesToCny[data.get("currency")] || 1,
      toAmount: Number(data.get("toAmount")) || 0,
      fees: Number(data.get("fees")) || 0,
      note: data.get("note") || (type === "transfer" ? "Transfer" : category),
      icon: type === "transfer" ? "⇄" : iconMap[category] || "👛",
      description: data.get("description") || "Added manually",
    };
    const index = state.transactions.findIndex((transaction) => transaction.id === payload.id);
    if (index >= 0) {
      state.transactions[index] = payload;
      showToast(t("Transaction updated.", "交易已更新。"));
    } else {
      state.transactions.unshift(payload);
      showToast(t("Transaction added.", "交易已添加。"));
    }
    renderAll();
  });

  document.querySelector("#account-form").addEventListener("submit", (event) => {
    const data = new FormData(event.currentTarget);
    if (event.submitter?.value === "delete") {
      const id = data.get("id");
      const account = state.accounts.find((item) => item.id === id);
      state.accounts = state.accounts.filter((item) => item.id !== id);
      if (account) {
        const fallback = state.accounts[0]?.name || "Cash";
        state.transactions.forEach((transaction) => {
          if (transaction.account === account.name) transaction.account = fallback;
        });
      }
      showToast(t("Account deleted. Related transactions moved to the first account.", "账户已删除，相关交易已移到第一个账户。"));
      renderAll();
      return;
    }
    if (event.submitter?.value !== "save") return;
    const oldAccount = state.accounts.find((account) => account.id === data.get("id"));
    const payload = {
      id: data.get("id") || `acc-${Date.now()}`,
      name: data.get("name"),
      group: data.get("group"),
      currency: data.get("currency"),
      balance: Number(data.get("balance")),
      liability: data.get("liability") === "on",
    };
    const index = state.accounts.findIndex((account) => account.id === payload.id);
    if (index >= 0) {
      state.accounts[index] = payload;
      if (oldAccount && oldAccount.name !== payload.name) {
        state.transactions.forEach((transaction) => {
          if (transaction.account === oldAccount.name) transaction.account = payload.name;
        });
      }
      showToast(t("Account updated.", "账户已更新。"));
    } else {
      state.accounts.push(payload);
      showToast(t("Account added.", "账户已添加。"));
    }
    renderAll();
  });

  document.querySelector("#budget-detail-edit").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#budget-detail-modal").close();
    openBudgetSettingModal(state.activeBudgetCategory);
  });

  document.querySelector("#budget-setting-form").addEventListener("submit", (event) => {
    if (event.submitter?.value !== "save") return;
    const data = new FormData(event.currentTarget);
    state.budgets.total = Number(data.get("total")) || 0;
    budgetCategories.forEach((category) => {
      state.budgets.categories[category] = Number(data.get(`budget-${category}`)) || 0;
    });
    showToast(t("Budget updated.", "预算已更新。"));
    renderAll();
  });
}

function bindMore() {
  document.querySelector("#export-records-btn").addEventListener("click", () => openDataModal("export"));
  document.querySelector("#import-records-btn").addEventListener("click", () => openDataModal("import"));
  document.querySelector("#language-btn").addEventListener("click", () => {
    document.querySelector('#language-form [name="language"]').value = state.language;
    document.querySelector("#language-modal").showModal();
  });
  document.querySelector("#language-form").addEventListener("submit", (event) => {
    if (event.submitter?.value !== "save") return;
    const selected = new FormData(event.currentTarget).get("language");
    state.language = selected === "system" ? "en" : selected;
    applyLanguage();
    showToast(t("Language updated.", "语言已更新。"));
  });
  document.querySelector("#data-form").addEventListener("submit", async (event) => {
    if (event.submitter?.value !== "confirm") return;
    const data = new FormData(event.currentTarget);
    if (data.get("mode") === "export") {
      exportTransactions(data.get("start"), data.get("end"));
    } else {
      await importTransactions(event.currentTarget.elements.file.files[0]);
    }
  });
}

function openDataModal(mode) {
  const form = document.querySelector("#data-form");
  form.reset();
  form.elements.mode.value = mode;
  form.elements.start.value = `${getMonthKey()}-01`;
  form.elements.end.value = `${getMonthKey()}-${String(new Date(state.currentMonth.getFullYear(), state.currentMonth.getMonth() + 1, 0).getDate()).padStart(2, "0")}`;
  document.querySelector("#data-title").textContent = mode === "export" ? t("Export Records", "记录导出") : t("Import Records", "记录导入");
  document.querySelector("#data-confirm-btn").textContent = mode === "export" ? "Export" : "Import";
  document.querySelector("#data-description").textContent = mode === "export"
    ? t("Export Trans. data in the selected date range as a JSON file for future restore.", "将指定日期范围内的交易数据导出为 JSON 文件，可用于换手机后恢复。")
    : t("Choose a previously exported JSON file. Imported transactions will be appended.", "选择之前导出的 JSON 文件，导入后会追加到当前交易数据中。");
  document.querySelector(".import-only").hidden = mode === "export";
  document.querySelector("#data-modal").showModal();
}

function exportTransactions(start, end) {
  const rows = state.transactions.filter((transaction) => transaction.date >= start && transaction.date <= end);
  const payload = {
    app: "Aurum Ledger",
    exportedAt: new Date().toISOString(),
    start,
    end,
    transactions: rows,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `aurum-ledger-${start}-to-${end}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast(t(`Exported ${rows.length} records.`, `已导出 ${rows.length} 条记录。`));
}

async function importTransactions(file) {
  if (!file) {
    showToast(t("Choose a file to import.", "请选择要导入的文件。"));
    return;
  }
  try {
    const payload = JSON.parse(await file.text());
    const rows = Array.isArray(payload) ? payload : payload.transactions;
    if (!Array.isArray(rows)) throw new Error("Invalid import file");
    const imported = rows.map((transaction, index) => ({
      ...transaction,
      id: transaction.id && !state.transactions.some((item) => item.id === transaction.id) ? transaction.id : `txn-import-${Date.now()}-${index}`,
    }));
    state.transactions.push(...imported);
    showToast(t(`Imported ${imported.length} records.`, `已导入 ${imported.length} 条记录。`));
    renderAll();
  } catch {
    showToast(t("Import failed. Check the file format.", "导入失败，请确认文件格式正确。"));
  }
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function applyLanguage() {
  const zh = state.language === "zh";
  setText("#trans-title", zh ? "交易" : "Trans.");
  setText("#accounts-title", zh ? "账户" : "Accounts");
  setText("#more-title", zh ? "更多" : "More");
  setText('[data-stats-mode="stats"]', zh ? "统计" : "Stats");
  setText('[data-stats-mode="budget"]', zh ? "预算" : "Budget");
  document.querySelectorAll(".view-tab").forEach((button) => {
    const labels = {
      daily: ["Daily", "每日"],
      calendar: ["Calendar", "日历"],
      monthly: ["Monthly", "月度"],
      summary: ["Summary", "摘要"],
      description: ["Description", "描述"],
    };
    const pair = labels[button.dataset.view];
    if (pair) button.textContent = zh ? pair[1] : pair[0];
  });
  const stripLabels = document.querySelectorAll(".monthly-strip span");
  ["Income", "Exp.", "Total"].forEach((label, index) => {
    if (stripLabels[index]) stripLabels[index].textContent = zh ? ["收入", "支出", "合计"][index] : label;
  });
  const accountLabels = document.querySelectorAll(".account-summary span");
  ["Assets", "Liabilities", "Total"].forEach((label, index) => {
    if (accountLabels[index]) accountLabels[index].textContent = zh ? ["资产", "负债", "合计"][index] : label;
  });
  setText(".nav-item[data-screen='trans'] strong", "5/29");
  setText(".nav-item[data-screen='stats'] strong", zh ? "统计" : "Stats");
  setText(".nav-item[data-screen='accounts'] strong", zh ? "账户" : "Accounts");
  setText(".nav-item[data-screen='more'] strong", zh ? "更多" : "More");
  setText(".settings-list h2", zh ? "数据" : "Data");
  const settingsHeads = document.querySelectorAll(".settings-list h2");
  if (settingsHeads[1]) settingsHeads[1].textContent = zh ? "偏好" : "Preferences";
  setText("#export-records-btn strong", zh ? "记录导出" : "Export Records");
  setText("#export-records-btn small", zh ? "导出指定日期范围内的交易数据" : "Export Trans. data for a date range");
  setText("#import-records-btn strong", zh ? "记录导入" : "Import Records");
  setText("#import-records-btn small", zh ? "从备份文件恢复交易数据" : "Restore Trans. data from a backup file");
  setText("#language-btn strong", zh ? "语言" : "Language");
  setText("#language-summary", zh ? "中文" : "English");
  document.querySelector("#search-input").placeholder = zh ? "搜索分类、账户、备注、描述..." : "Search category, account, note, description...";
  setText("#search-form h2", zh ? "搜索" : "Search");
  setText("#search-form .gold-text", zh ? "完成" : "Done");
  setText("#language-form h2", zh ? "语言" : "Language");
  const languageLabel = document.querySelector("#language-form label");
  if (languageLabel?.firstChild) languageLabel.firstChild.textContent = zh ? "语言 " : "Language ";
  setText("#language-form .setting-description", zh ? "默认语言为英文。修改后会立即更新应用标签。" : "Default is English. Changing this updates the app labels immediately.");
  setText("#language-form .outline-btn", zh ? "取消" : "Cancel");
  setText("#language-form .gold-btn", zh ? "保存语言" : "Save language");
  setText("#language-form .gold-text", zh ? "保存" : "Save");
}

function updateTransactionFields() {
  const type = document.querySelector('#transaction-form [name="type"]:checked').value;
  document.querySelector("#normal-fields").hidden = type === "transfer";
  document.querySelector("#transfer-fields").hidden = type !== "transfer";
  if (type === "transfer") updateTransferEstimate();
}

function updateTransferEstimate() {
  const form = document.querySelector("#transaction-form");
  const amount = Number(form.elements.amount.value) || 0;
  const rate = Number(form.elements.transferRate.value) || state.ratesToCny[form.elements.currency.value] || 1;
  form.elements.toAmount.value = (amount * rate).toFixed(2);
}

function openSearchModal() {
  const input = document.querySelector("#search-input");
  input.value = "";
  document.querySelector("#search-results").innerHTML = `<div class="empty-state">${t("Enter a keyword, then press Enter or Done.", "输入关键词后，按回车或点击 Done 查看结果。")}</div>`;
  document.querySelector("#search-modal").showModal();
  setTimeout(() => input.focus(), 50);
}

function renderSearchResults(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    document.querySelector("#search-results").innerHTML = `<div class="empty-state">${t("Enter a keyword to search transactions.", "请输入关键词搜索交易。")}</div>`;
    return;
  }
  const matches = state.transactions.filter((transaction) => {
    return [transaction.category, transaction.account, transaction.fromAccount, transaction.toAccount, transaction.note, transaction.description, transaction.currency]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalized));
  });
  document.querySelector("#search-results").innerHTML = matches
    .map((transaction) => `
      <button class="description-row" data-search-transaction-id="${transaction.id}" aria-label="打开 ${transaction.note}">
        <span class="emoji">${transaction.icon}</span>
        <span>
          <strong>${transaction.note}</strong>
          <span class="subtext">${transaction.date} · ${transaction.category} · ${transaction.account || transaction.fromAccount}</span>
        </span>
        <strong class="${transaction.type === "expense" ? "expense" : "income"}">${formatMoney(transaction.amount, transaction.currency)}</strong>
      </button>
    `)
    .join("") || `<div class="empty-state">${t("No matching records found.", "没有找到匹配记录。")}</div>`;
}

function openTransactionModal(id = null, forcedType = null) {
  const form = document.querySelector("#transaction-form");
  const transaction = state.transactions.find((item) => item.id === id);
  state.editingTransactionId = id;
  form.reset();
  form.elements.id.value = transaction?.id || "";
  form.elements.date.value = transaction?.date || `${getMonthKey()}-01`;
  form.elements.amount.value = transaction?.amount ?? 88;
  form.elements.currency.value = transaction?.currency || "CNY";
  form.elements.category.value = transaction?.category || "Food";
  form.elements.account.value = transaction?.account || state.accounts[0]?.name || "";
  form.elements.fromAccount.value = transaction?.fromAccount || transaction?.account || state.accounts[0]?.name || "";
  form.elements.toAccount.value = transaction?.toAccount || state.accounts[1]?.name || state.accounts[0]?.name || "";
  form.elements.transferRate.value = transaction?.transferRate || state.ratesToCny[transaction?.currency || "CNY"] || 1;
  form.elements.toAmount.value = transaction?.toAmount || ((transaction?.amount || 88) * Number(form.elements.transferRate.value)).toFixed(2);
  form.elements.fees.value = transaction?.fees || 0;
  form.elements.note.value = transaction?.note || "Coffee";
  form.elements.description.value = transaction?.description || "";
  form.querySelector(`[name="type"][value="${forcedType || transaction?.type || "expense"}"]`).checked = true;
  updateTransactionFields();
  document.querySelector("#transaction-modal-title").textContent = transaction ? "Edit Trans." : "Add Trans.";
  document.querySelector("#delete-transaction-btn").hidden = !transaction;
  form.querySelector(".modal-actions").classList.toggle("two-actions", !transaction);
  document.querySelector("#transaction-form .gold-btn").textContent = transaction ? "Save changes" : "Add transaction";
  document.querySelector("#transaction-modal").showModal();
}

function handleLaunchAction() {
  const action = new URLSearchParams(window.location.search).get("action");
  if (action === "search") {
    openSearchModal();
    return;
  }
  if (["income", "expense", "transfer"].includes(action)) {
    openTransactionModal(null, action);
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js").catch(() => {
    // The app still works without offline caching.
  });
}

function openAccountModal(id = null) {
  const form = document.querySelector("#account-form");
  const account = state.accounts.find((item) => item.id === id);
  state.editingAccountId = id;
  form.reset();
  form.elements.id.value = account?.id || "";
  form.elements.name.value = account?.name || "New Wallet";
  form.elements.group.value = account?.group || "Cash";
  form.elements.currency.value = account?.currency || "CNY";
  form.elements.balance.value = account?.balance ?? 1000;
  form.elements.liability.checked = Boolean(account?.liability);
  document.querySelector("#account-modal-title").textContent = account ? "Edit Account" : "Add Account";
  document.querySelector("#delete-account-btn").hidden = !account;
  form.querySelector(".modal-actions").classList.toggle("two-actions", !account);
  document.querySelector("#account-form .gold-btn").textContent = account ? "Save changes" : "Add account";
  document.querySelector("#account-modal").showModal();
}

function openBudgetDetail(category) {
  state.activeBudgetCategory = category;
  const row = getBudgetRows().find((item) => item.category === category);
  const transactions = getVisibleTransactions().filter((transaction) => transaction.type === "expense" && transaction.category === category);
  document.querySelector("#budget-detail-title").textContent = `${row.icon} ${category}`;
  document.querySelector("#detail-budget").textContent = displayFromCny(row.budget);
  document.querySelector("#detail-used").textContent = displayFromCny(row.used);
  document.querySelector("#detail-remaining").textContent = displayFromCny(row.remaining);
  document.querySelector("#detail-chart").innerHTML = `
    <span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span class="is-active">${monthNames[state.currentMonth.getMonth()]}</span>
    <div class="mini-bar ${row.over ? "is-over" : ""}" style="height:${Math.min(Math.max(row.percent, 8), 120)}px"></div>
  `;
  document.querySelector("#budget-detail-list").innerHTML = groupBudgetTransactions(transactions);
  document.querySelector("#budget-detail-modal").showModal();
}

function groupBudgetTransactions(transactions) {
  const groups = groupBy(transactions.sort((a, b) => b.date.localeCompare(a.date)), (transaction) => transaction.date);
  return Object.entries(groups)
    .map(([date, items]) => {
      const day = new Date(`${date}T12:00:00`);
      const total = items.reduce((sum, item) => sum + transactionCny(item), 0);
      return `
        <article class="day-group">
          <header class="day-head">
            <div class="day-title"><span class="day-number">${day.getDate()}</span><span class="weekday">${weekNames[day.getDay()]}</span></div>
            <span></span><span class="day-expense expense">${displayFromCny(total)}</span>
          </header>
          ${items.map(renderTransactionRow).join("")}
        </article>
      `;
    })
    .join("") || `<div class="empty-state">${t("No expenses in this category this month.", "这个分类本月还没有消费。")}</div>`;
}

function openBudgetSettingModal(category = null) {
  document.querySelector('#budget-setting-form [name="total"]').value = state.budgets.total;
  document.querySelector("#budget-setting-list").innerHTML = budgetCategories
    .map((item) => `
      <label class="budget-input-row ${item === category ? "is-focused" : ""}">
        <span>${iconMap[item] || "👛"} ${item}</span>
        <input name="budget-${item}" type="number" min="0" step="0.01" value="${state.budgets.categories[item] || 0}" />
      </label>
    `)
    .join("");
  document.querySelector("#budget-setting-modal").showModal();
}

async function refreshRates() {
  const note = document.querySelector("#rate-note");
  note.textContent = "正在同步实时汇率...";
  try {
    const [eur, usd] = await Promise.all([
      fetch("https://api.frankfurter.app/latest?from=EUR&to=CNY").then((response) => response.json()),
      fetch("https://api.frankfurter.app/latest?from=USD&to=CNY").then((response) => response.json()),
    ]);
    state.ratesToCny.EUR = eur.rates.CNY;
    state.ratesToCny.USD = usd.rates.CNY;
    note.textContent = `已同步: EUR ${state.ratesToCny.EUR.toFixed(3)}, USD ${state.ratesToCny.USD.toFixed(3)}`;
  } catch {
    note.textContent = `无法联网，继续使用内置汇率: EUR ${state.ratesToCny.EUR}, USD ${state.ratesToCny.USD}`;
  }
  renderAll();
}

function bindCurrency() {
  document.querySelector("#display-currency").addEventListener("change", (event) => {
    state.displayCurrency = event.target.value;
    renderAll();
  });
  document.querySelector("#apply-manual-rate").addEventListener("click", () => {
    const currency = state.displayCurrency;
    const rate = Number(document.querySelector("#manual-rate").value);
    if (currency === "CNY") {
      showToast(t("CNY exchange rate is fixed at 1.", "人民币汇率固定为 1。"));
      return;
    }
    if (!rate || rate <= 0) {
      showToast(t("Enter a valid exchange rate.", "请输入有效汇率。"));
      return;
    }
    state.ratesToCny[currency] = rate;
    showToast(t(`Applied: 1 ${currency} = ${rate} CNY`, `已应用: 1 ${currency} = ${rate} CNY`));
    renderAll();
  });
}

bindNavigation();
bindModals();
bindCurrency();
bindMore();
renderAll();
handleLaunchAction();
registerServiceWorker();
