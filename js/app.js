/* Pulitzer Blitz Fitness — app logic */

const STORAGE_KEY = "pbf_state_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* corrupted or blocked storage — fall back to defaults */
  }
  return {
    onboarded: false,
    name: "",
    birthDate: "",
    birthType: "vaginal",
    cleared: false,
    completedLog: [], // { workoutId, dateISO }
    activeCategory: "all",
    activePhaseOverride: null, // let her browse other phases manually
  };
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    /* storage unavailable — app still works for this session */
  }
}

function weeksPostpartum() {
  if (!state.birthDate) return 0;
  const birth = new Date(state.birthDate);
  const now = new Date();
  const diffMs = now - birth;
  const weeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return Math.max(0, weeks);
}

function currentPhase() {
  return getPhaseForWeek(weeksPostpartum());
}

function isPhaseLocked(phase) {
  const cur = currentPhase();
  const order = PHASES.map((p) => p.id);
  const curIdx = order.indexOf(cur.id);
  const phaseIdx = order.indexOf(phase.id);
  if (phaseIdx <= curIdx) return false;
  return true;
}

function isPhaseClearanceGated(phase) {
  return (phase.id === "sunshine" || phase.id === "fullbloom") && !state.cleared;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function isCompletedToday(workoutId) {
  const today = todayISO();
  return state.completedLog.some((l) => l.workoutId === workoutId && l.dateISO === today);
}

function markComplete(workoutId) {
  state.completedLog.push({ workoutId, dateISO: todayISO() });
  saveState();
}

function computeStreak() {
  const days = new Set(state.completedLog.map((l) => l.dateISO));
  let streak = 0;
  let cursor = new Date();
  for (;;) {
    const iso = cursor.toISOString().slice(0, 10);
    if (days.has(iso)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function totalCompleted() {
  return state.completedLog.length;
}

function badgesEarned() {
  const total = totalCompleted();
  const streak = computeStreak();
  const badges = [];
  if (total >= 1) badges.push({ emoji: "🎀", label: "First Workout" });
  if (total >= 10) badges.push({ emoji: "💪", label: "10 Workouts" });
  if (total >= 25) badges.push({ emoji: "🌺", label: "25 Workouts" });
  if (streak >= 3) badges.push({ emoji: "🔥", label: "3-Day Streak" });
  if (streak >= 7) badges.push({ emoji: "☀️", label: "7-Day Streak" });
  if (weeksPostpartum() >= 6) badges.push({ emoji: "🎉", label: "6 Weeks Strong" });
  return badges;
}

/* ---------------- Rendering ---------------- */

const app = document.getElementById("app");

function render() {
  if (!state.onboarded) {
    renderOnboarding();
  } else {
    renderDashboard();
  }
}

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function renderOnboarding() {
  app.innerHTML = "";
  const card = el(`
    <div class="onboard-wrap">
      <div class="onboard-card">
        <div class="logo">🌺 Pulitzer Blitz <span class="script">Fitness</span> 🌺</div>
        <p class="tagline">Postpartum strength, preppy vibes. ✨</p>
        <form id="onboard-form">
          <label>What should we call you? 💌
            <input type="text" id="f-name" placeholder="Mama" maxlength="30" />
          </label>
          <label>Baby's birth date 👶
            <input type="date" id="f-date" required />
          </label>
          <label>How did you deliver? 🌷
            <select id="f-type">
              <option value="vaginal">Vaginal birth</option>
              <option value="csection">C-section</option>
            </select>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="f-cleared" />
            My provider has already cleared me for exercise
          </label>
          <div class="disclaimer">
            🩺 <strong>Before you bloom:</strong> This app is not medical advice.
            Please get clearance from your OB or midwife before starting any postpartum
            exercise program — typically around 6 weeks after a vaginal birth, or
            8–12 weeks after a C-section. Stop any activity and call your provider if you
            notice heavy bleeding, pelvic pain/pressure, leaking, or wound concerns.
          </div>
          <button type="submit" class="btn-primary">Let's Bloom 🌸</button>
        </form>
      </div>
    </div>
  `);
  app.appendChild(card);

  document.getElementById("onboard-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.name = document.getElementById("f-name").value.trim() || "Mama";
    state.birthDate = document.getElementById("f-date").value;
    state.birthType = document.getElementById("f-type").value;
    state.cleared = document.getElementById("f-cleared").checked;
    state.onboarded = true;
    saveState();
    render();
  });
}

function renderDashboard() {
  app.innerHTML = "";
  const phase = currentPhase();
  const week = weeksPostpartum();
  const affirmation = AFFIRMATIONS[week % AFFIRMATIONS.length];

  const header = el(`
    <header class="topbar">
      <div class="logo-small">🌺 Pulitzer Blitz <span class="script">Fitness</span></div>
      <button id="settings-btn" class="icon-btn" title="Settings">⚙️</button>
    </header>
  `);
  app.appendChild(header);

  const hero = el(`
    <section class="hero">
      <div class="hero-greeting">Hi ${escapeHtml(state.name)}! ${phase.emoji}</div>
      <div class="hero-week">Week ${week} postpartum &middot; <strong>${phase.label}</strong></div>
      <div class="hero-tagline">${phase.tagline}</div>
      ${phase.unlockNote && isPhaseClearanceGated(phase) ? `<div class="hero-note">🔒 ${phase.unlockNote}</div>` : ""}
      <div class="affirmation">💌 ${affirmation}</div>
    </section>
  `);
  app.appendChild(hero);

  const stats = el(`
    <section class="stats-row">
      <div class="stat-card"><div class="stat-num">${computeStreak()}</div><div class="stat-label">🔥 Day Streak</div></div>
      <div class="stat-card"><div class="stat-num">${totalCompleted()}</div><div class="stat-label">🎀 Workouts Done</div></div>
      <div class="stat-card"><div class="stat-num">${week}</div><div class="stat-label">🌴 Weeks Postpartum</div></div>
    </section>
  `);
  app.appendChild(stats);

  const badges = badgesEarned();
  if (badges.length) {
    const badgeRow = el(`<section class="badge-row">${badges
      .map((b) => `<span class="badge">${b.emoji} ${b.label}</span>`)
      .join("")}</section>`);
    app.appendChild(badgeRow);
  }

  // Category filter chips
  const chipsWrap = el(`
    <section class="chips-wrap">
      <button class="chip ${state.activeCategory === "all" ? "chip-active" : ""}" data-cat="all">✨ All</button>
      ${CATEGORIES.map(
        (c) => `<button class="chip ${state.activeCategory === c.id ? "chip-active" : ""}" data-cat="${c.id}">${c.emoji} ${c.label}</button>`
      ).join("")}
    </section>
  `);
  app.appendChild(chipsWrap);
  chipsWrap.querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeCategory = btn.dataset.cat;
      saveState();
      render();
    });
  });

  // Phase tabs
  const phaseTabs = el(`
    <section class="phase-tabs">
      ${PHASES.map((p) => {
        const locked = isPhaseLocked(p);
        const gated = !locked && isPhaseClearanceGated(p);
        const active = (state.activePhaseOverride || phase.id) === p.id;
        return `<button class="phase-tab ${active ? "phase-tab-active" : ""} ${locked || gated ? "phase-tab-locked" : ""}" data-phase="${p.id}">
          ${p.emoji} ${p.label} ${locked || gated ? "🔒" : ""}
        </button>`;
      }).join("")}
    </section>
  `);
  app.appendChild(phaseTabs);
  phaseTabs.querySelectorAll(".phase-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = getPhaseById(btn.dataset.phase);
      if (isPhaseLocked(p)) {
        alert(`This phase unlocks around week ${p.weeks[0]}. You're currently in ${phase.label} (week ${week}). 🌱`);
        return;
      }
      if (isPhaseClearanceGated(p)) {
        alert(`${p.unlockNote}\n\nOnce you have clearance, check "cleared for exercise" in Settings ⚙️ to unlock this phase.`);
        return;
      }
      state.activePhaseOverride = p.id;
      saveState();
      render();
    });
  });

  // Workout grid
  const visiblePhaseId = state.activePhaseOverride || phase.id;
  const filtered = WORKOUTS.filter((w) => {
    const matchesPhase = w.phase === visiblePhaseId;
    const matchesCat = state.activeCategory === "all" || w.category === state.activeCategory;
    return matchesPhase && matchesCat;
  });

  const grid = el(`<section class="workout-grid" id="workout-grid"></section>`);
  app.appendChild(grid);

  if (filtered.length === 0) {
    grid.appendChild(el(`<div class="empty-state">No workouts in this category for this phase yet — try "✨ All"! 🌸</div>`));
  } else {
    filtered.forEach((w) => grid.appendChild(renderWorkoutCard(w)));
  }

  document.getElementById("settings-btn").addEventListener("click", renderSettingsModal);
}

function renderWorkoutCard(workout) {
  const done = isCompletedToday(workout.id);
  const card = el(`
    <div class="workout-card ${done ? "workout-done" : ""}" data-id="${workout.id}">
      <div class="workout-emoji">${workout.emoji}</div>
      <div class="workout-title">${workout.title}</div>
      <div class="workout-meta">⏱ ${workout.duration} min &middot; ${escapeHtml(workout.equipment)}</div>
      <div class="workout-summary">${escapeHtml(workout.summary)}</div>
      ${done ? `<div class="done-tag">✅ Done today!</div>` : ""}
    </div>
  `);
  card.addEventListener("click", () => renderWorkoutModal(workout));
  return card;
}

function renderWorkoutModal(workout) {
  const overlay = el(`
    <div class="modal-overlay">
      <div class="modal-card">
        <button class="modal-close" aria-label="Close">✕</button>
        <div class="modal-emoji">${workout.emoji}</div>
        <h2>${workout.title}</h2>
        <div class="modal-meta">⏱ ${workout.duration} min &middot; 🧰 ${escapeHtml(workout.equipment)}</div>
        <div class="modal-progress"><div class="modal-progress-fill" id="modal-progress-fill" style="width:0%"></div></div>
        <ol class="steps-list" id="steps-list"></ol>
        <div class="safety-box">⚠️ ${escapeHtml(workout.safetyNote)}</div>
        <button class="btn-primary" id="complete-btn">${isCompletedToday(workout.id) ? "✅ Completed Today" : "Mark Complete 🎀"}</button>
      </div>
    </div>
  `);
  document.body.appendChild(overlay);

  const stepsList = overlay.querySelector("#steps-list");
  workout.steps.forEach((step, idx) => renderStepRow(stepsList, step, idx, overlay));

  overlay.querySelector(".modal-close").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  const completeBtn = overlay.querySelector("#complete-btn");
  completeBtn.addEventListener("click", () => {
    if (!isCompletedToday(workout.id)) {
      markComplete(workout.id);
      completeBtn.textContent = "✅ Completed Today";
      render();
    }
  });
}

function updateModalProgress(overlay) {
  const total = overlay.querySelectorAll(".step-row").length;
  const done = overlay.querySelectorAll(".step-row.step-row-done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  overlay.querySelector("#modal-progress-fill").style.width = pct + "%";
}

function renderStepRow(container, step, idx, overlay) {
  const iconKey = inferIconKey(step.name, step.detail);
  const metric = parseStepMetric(step.detail);

  const row = el(`
    <li class="step-row">
      <div class="step-icon">${getIconSvg(iconKey)}</div>
      <div class="step-body">
        <label class="step-check-label">
          <input type="checkbox" class="step-check" />
          <strong>${escapeHtml(step.name)}</strong>
        </label>
        <div class="step-detail">${escapeHtml(step.detail)}</div>
        <div class="step-widget" id="widget-${idx}"></div>
      </div>
    </li>
  `);
  container.appendChild(row);

  const widget = row.querySelector(`#widget-${idx}`);
  if (metric.type === "reps") {
    widget.appendChild(renderRepWidget(metric));
  } else if (metric.type === "timer") {
    widget.appendChild(renderTimerWidget(metric));
  }

  row.querySelector(".step-check").addEventListener("change", (e) => {
    row.classList.toggle("step-row-done", e.target.checked);
    updateModalProgress(overlay);
  });
}

function renderRepWidget(metric) {
  const wrap = el(`<div class="rep-widget"></div>`);
  for (let s = 0; s < metric.sets; s++) {
    const row = el(`<div class="rep-row"></div>`);
    if (metric.reps <= 20) {
      for (let r = 0; r < metric.reps; r++) {
        const dot = el(`<button type="button" class="rep-dot" aria-label="rep"></button>`);
        dot.addEventListener("click", () => {
          const dots = Array.from(row.querySelectorAll(".rep-dot"));
          const clickedIdx = dots.indexOf(dot);
          const alreadyFilled = dot.classList.contains("rep-dot-filled");
          dots.forEach((d, i) => d.classList.toggle("rep-dot-filled", alreadyFilled ? i > clickedIdx : i <= clickedIdx));
        });
        row.appendChild(dot);
      }
    } else {
      const counter = el(`
        <div class="rep-counter">
          <span class="rep-counter-num">0</span> / ${metric.reps}
          <button type="button" class="rep-counter-btn" aria-label="add rep">+</button>
        </div>
      `);
      const num = counter.querySelector(".rep-counter-num");
      let count = 0;
      counter.querySelector(".rep-counter-btn").addEventListener("click", () => {
        count = count >= metric.reps ? 0 : count + 1;
        num.textContent = count;
      });
      row.appendChild(counter);
    }
    wrap.appendChild(row);
  }
  if (metric.sets > 1) {
    wrap.appendChild(el(`<div class="rep-widget-label">${metric.sets} sets &times; ${metric.reps} reps — tap to track ✨</div>`));
  }
  return wrap;
}

function renderTimerWidget(metric) {
  const CIRC = 2 * Math.PI * 26;
  const wrap = el(`
    <div class="timer-widget">
      <div class="timer-ring-wrap">
        <svg viewBox="0 0 60 60" class="timer-ring">
          <circle cx="30" cy="30" r="26" class="timer-ring-bg" />
          <circle cx="30" cy="30" r="26" class="timer-ring-fg" stroke-dasharray="${CIRC}" stroke-dashoffset="0" />
        </svg>
        <div class="timer-text">${metric.seconds}s</div>
      </div>
      <button type="button" class="timer-btn">▶ Start</button>
      ${metric.rounds > 1 ? `<div class="timer-round">Round <span class="timer-round-num">1</span> / ${metric.rounds}</div>` : ""}
    </div>
  `);
  const fg = wrap.querySelector(".timer-ring-fg");
  const text = wrap.querySelector(".timer-text");
  const btn = wrap.querySelector(".timer-btn");
  const roundNum = wrap.querySelector(".timer-round-num");
  let remaining = metric.seconds;
  let round = 1;
  let timerId = null;

  function tick() {
    remaining -= 1;
    text.textContent = `${remaining}s`;
    fg.setAttribute("stroke-dashoffset", String(CIRC * (1 - remaining / metric.seconds)));
    if (remaining <= 0) {
      clearInterval(timerId);
      timerId = null;
      if (round < metric.rounds) {
        text.textContent = "Round done! 🎉";
        btn.textContent = "▶ Next Round";
      } else {
        text.textContent = "Done! 🎉";
        btn.textContent = "↺ Reset";
      }
    }
  }

  btn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      btn.textContent = "▶ Start";
      return;
    }
    if (remaining <= 0) {
      if (round < metric.rounds && btn.textContent === "▶ Next Round") {
        round += 1;
        if (roundNum) roundNum.textContent = round;
      } else {
        round = 1;
        if (roundNum) roundNum.textContent = round;
      }
      remaining = metric.seconds;
      fg.setAttribute("stroke-dashoffset", "0");
    }
    btn.textContent = "⏸ Pause";
    timerId = setInterval(tick, 1000);
  });

  return wrap;
}

function renderSettingsModal() {
  const overlay = el(`
    <div class="modal-overlay">
      <div class="modal-card">
        <button class="modal-close" aria-label="Close">✕</button>
        <h2>⚙️ Settings</h2>
        <form id="settings-form">
          <label>Name 💌
            <input type="text" id="s-name" value="${escapeAttr(state.name)}" maxlength="30" />
          </label>
          <label>Baby's birth date 👶
            <input type="date" id="s-date" value="${escapeAttr(state.birthDate)}" required />
          </label>
          <label>Delivery type 🌷
            <select id="s-type">
              <option value="vaginal" ${state.birthType === "vaginal" ? "selected" : ""}>Vaginal birth</option>
              <option value="csection" ${state.birthType === "csection" ? "selected" : ""}>C-section</option>
            </select>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="s-cleared" ${state.cleared ? "checked" : ""} />
            I've been cleared by my provider for exercise
          </label>
          <button type="submit" class="btn-primary">Save 🎀</button>
        </form>
        <button id="reset-data" class="btn-secondary">Reset All Progress</button>
      </div>
    </div>
  `);
  document.body.appendChild(overlay);
  overlay.querySelector(".modal-close").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  overlay.querySelector("#settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.name = document.getElementById("s-name").value.trim() || "Mama";
    state.birthDate = document.getElementById("s-date").value;
    state.birthType = document.getElementById("s-type").value;
    state.cleared = document.getElementById("s-cleared").checked;
    state.activePhaseOverride = null;
    saveState();
    overlay.remove();
    render();
  });
  overlay.querySelector("#reset-data").addEventListener("click", () => {
    if (confirm("This will erase all progress and settings. Are you sure?")) {
      localStorage.removeItem(STORAGE_KEY);
      state = loadState();
      overlay.remove();
      render();
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

render();
