// ═══════════════════════════════════════════
// SERENIMINDS v5 — CLIENT PORTAL
// ═══════════════════════════════════════════

var ClientStore = {
  isLoggedIn: false,
  currentClient: null,
  _selectedType: null,
  _selectedClinician: null,
};

function toggleClientMode() {
  var isClient = document.body.classList.contains('client-mode');
  if (isClient) {
    document.body.classList.remove('client-mode');
    switchView('dashboard');
    document.getElementById('client-toggle').textContent = 'Client View';
  } else {
    document.body.classList.add('client-mode');
    if (ClientStore.isLoggedIn) switchView('client-dashboard');
    else switchView('client-login');
    document.getElementById('client-toggle').textContent = 'Admin View';
  }
}

function clientLogin() {
  var phoneEl = document.getElementById('client-phone');
  var phone = phoneEl ? phoneEl.value : '';
  if (!phone || phone.length < 10) { showToast('Enter a valid phone number', 'error'); return; }
  ClientStore.isLoggedIn = true;
  var client = Store.clients.find(function(c) { return c.phone === phone; });
  if (!client) {
    client = { id: 'SRN-' + String(Store.clients.length + 1).padStart(3, '0'), name: phone, phone: phone, age: '', gender: '', paymentType: 'self_pay', status: 'active' };
    Store.clients.push(client);
  }
  ClientStore.currentClient = client;
  document.body.classList.add('client-mode');
  document.getElementById('client-toggle').textContent = 'Admin View';
  switchView('client-dashboard');
  renderClientDashboard();
  showToast('Welcome!', 'success');
}

function startClientIntake() {
  document.body.classList.add('client-mode');
  document.getElementById('client-toggle').textContent = 'Admin View';
  switchView('client-intake');
  renderIntakeStep1();
}

function renderIntakeStep1() {
  var types = document.getElementById('intake-types');
  if (!types) return;
  types.innerHTML = Store.serviceTypes.filter(function(s) { return s.category === 'clinical' && s.maxClients <= 2; }).map(function(s) {
    return '<div class="client-card" data-type="' + s.name + '"><div style="font-weight:600;font-size:14px">' + s.name + '</div><div style="font-size:12px;color:var(--text2);margin-top:4px">KES ' + s.price + ' - ' + s.defaultDuration + ' min</div></div>';
  }).join('');
}

function intakeNext(step) {
  var steps = document.querySelectorAll('#view-client-intake [id^="intake-step-"]');
  for (var i = 0; i < steps.length; i++) steps[i].style.display = 'none';
  var target = document.getElementById('intake-step-' + step);
  if (target) target.style.display = '';
  var dots = document.querySelectorAll('#intake-steps .step-dot');
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove('current', 'done');
    if (i < step - 1) dots[i].classList.add('done');
    if (i === step - 1) dots[i].classList.add('current');
  }
  if (step === 2) renderIntakeStep2();
}

function renderIntakeStep2() {
  var genders = document.getElementById('intake-gender');
  if (genders) {
    var genderOpts = ['No Preference', 'Male', 'Female'];
    genders.innerHTML = genderOpts.map(function(g) {
      var val = g.toLowerCase().replace(' ', '_');
      return '<div class="client-card" data-gender="' + val + '" data-container="intake-gender">' + g + '</div>';
    }).join('');
  }
  var avail = document.getElementById('intake-availability');
  if (avail) {
    var slots = ['Morning (7AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-8PM)', 'Weekends'];
    avail.innerHTML = slots.map(function(a) {
      return '<div class="client-card toggle-card" data-avail="' + a + '">' + a + '</div>';
    }).join('');
  }
}

function submitClientIntake() {
  var nameEl = document.getElementById('intake-name');
  var phoneEl = document.getElementById('intake-phone');
  var name = nameEl ? nameEl.value : '';
  var phone = phoneEl ? phoneEl.value : '';
  if (!name || !phone) { showToast('Please enter your name and phone number', 'error'); return; }
  var client = {
    id: 'SRN-' + String(Store.clients.length + 1).padStart(3, '0'),
    name: name, phone: phone, age: '', gender: '', paymentType: 'self_pay',
    status: 'active', clinician: '', nextAppt: null,
    reasonForVisit: (document.getElementById('intake-reason') || {}).value || '',
  };
  Store.clients.push(client);
  ClientStore.currentClient = client;
  ClientStore.isLoggedIn = true;
  Store.auditLog.unshift({ ts: new Date().toISOString().slice(0, 16).replace('T', ' '), user: name, action: 'SIGNUP', obj: 'Client ' + client.id, detail: 'Self-registered via client portal' });
  showToast('Welcome, ' + name + '! Your intake is complete.', 'success');
  switchView('client-booking');
  renderBookingStep1();
}

function renderBookingStep1() {
  var types = document.getElementById('booking-types');
  if (!types) return;
  types.innerHTML = Store.serviceTypes.filter(function(s) { return s.category === 'clinical' && s.maxClients <= 2; }).map(function(s) {
    return '<div class="client-card" data-type="' + s.name + '"><div style="font-weight:600;font-size:14px">' + s.name + '</div><div style="font-size:12px;color:var(--text2);margin-top:4px">KES ' + s.price + ' - ' + s.defaultDuration + ' min</div></div>';
  }).join('');
}

function renderBookingClinicians() {
  var c = document.getElementById('booking-clinicians');
  if (!c) return;
  var clinicians = [{ name: 'Dr. Otieno', gender: 'male' }, { name: 'Dr. Wanjiku', gender: 'female' }];
  c.innerHTML = clinicians.map(function(cl) {
    return '<div class="client-card" data-clinician="' + cl.name + '">' + cl.name + ' <span style="font-size:11px;color:var(--text2)">' + cl.gender + '</span></div>';
  }).join('');
  renderBookingSlots();
}

function renderBookingSlots() {
  var slots = document.getElementById('booking-slots');
  if (!slots) return;
  var times = ['07:00', '08:30', '10:00', '11:30', '13:00', '14:30', '16:00'];
  slots.innerHTML = times.map(function(t) {
    var roomA = Store.appointments.filter(function(a) { return a.date === Store.currentDate && a.time === t && a.room === 'A'; }).length;
    var roomB = Store.appointments.filter(function(a) { return a.date === Store.currentDate && a.time === t && a.room === 'B'; }).length;
    var available = roomA === 0 || roomB === 0;
    var room = roomA === 0 ? 'A' : 'B';
    var cls = 'booking-slot' + (available ? '' : ' unavailable');
    return '<div class="' + cls + '" data-time="' + t + '" data-room="' + room + '"' + (available ? ' data-available="1"' : '') + '>' + t + '<br><span style="font-size:10px">' + (available ? 'Room ' + room + ' available' : 'Full') + '</span></div>';
  }).join('');
  var btn = document.getElementById('confirm-booking-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Select a time slot first'; btn.style.background = 'var(--border)'; btn.style.color = 'var(--text3)'; }
}

function selectBookingType(el) {
  var cards = document.querySelectorAll('#booking-types .client-card');
  for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
  el.classList.add('selected');
  ClientStore._selectedType = el.getAttribute('data-type');
  renderBookingClinicians();
}

function selectBookingClinician(el) {
  var cards = document.querySelectorAll('#booking-clinicians .client-card');
  for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
  el.classList.add('selected');
  ClientStore._selectedClinician = el.getAttribute('data-clinician');
  renderBookingSlots();
}

function selectBookingSlot(el) {
  var all = document.querySelectorAll('#booking-slots .booking-slot');
  for (var i = 0; i < all.length; i++) all[i].classList.remove('selected');
  el.classList.add('selected');
  var btn = document.getElementById('confirm-booking-btn');
  btn.disabled = false;
  btn.textContent = 'Confirm Booking - ' + el.getAttribute('data-time') + ' Room ' + el.getAttribute('data-room');
  btn.style.background = 'var(--blue)';
  btn.style.color = '#fff';
}

function confirmBooking() {
  if (!ClientStore._selectedType || !ClientStore._selectedClinician) { showToast('Select type and clinician', 'error'); return; }
  var selected = document.querySelector('#booking-slots .booking-slot.selected');
  if (!selected) { showToast('Select a time slot', 'error'); return; }
  var apt = {
    id: 'APT-' + String(Store.appointments.length + 1).padStart(3, '0'),
    clientId: ClientStore.currentClient ? ClientStore.currentClient.id : 'SRN-NEW',
    clientName: ClientStore.currentClient ? ClientStore.currentClient.name : 'New Client',
    clinician: ClientStore._selectedClinician,
    type: ClientStore._selectedType,
    room: selected.getAttribute('data-room'),
    time: selected.getAttribute('data-time'),
    duration: 60, status: 'pending', date: Store.currentDate
  };
  Store.appointments.push(apt);
  if (ClientStore.currentClient) ClientStore.currentClient.nextAppt = Store.currentDate + 'T' + apt.time;
  Store.auditLog.unshift({ ts: new Date().toISOString().slice(0, 16).replace('T', ' '), user: apt.clientName, action: 'BOOK', obj: 'Appointment ' + apt.id, detail: 'Self-booked via client portal' });
  showToast('Booking submitted - awaiting confirmation', 'success');
  switchView('client-dashboard');
  renderClientDashboard();
}

function renderClientDashboard() {
  var cl = ClientStore.currentClient; if (!cl) return;
  renderClientWellness();
  var welcomeEl = document.getElementById('client-welcome-name');
  if (welcomeEl) welcomeEl.textContent = cl.name || 'Your care journey';
  var kpis = document.getElementById('client-kpis'); if (!kpis) return;
  var appts = Store.appointments.filter(function(a) { return a.clientId === cl.id || a.clientName === cl.name; });
  var next = null;
  for (var i = 0; i < appts.length; i++) { if (appts[i].status === 'confirmed' || appts[i].status === 'pending') { next = appts[i]; break; } }
  var invTotal = Store.invoices.filter(function(i) { return i.client === cl.name; }).reduce(function(s, i) { return s + i.amount; }, 0);
  var noteCount = Store.clinicalNotes.filter(function(n) { return n.clientId === cl.id; }).length;
  kpis.innerHTML = '<div class="kpi-card"><div class="kpi-icon green">📅</div><div class="kpi-val">' + (next ? 1 : 0) + '</div><div class="kpi-lbl">Upcoming</div></div>' + '<div class="kpi-card"><div class="kpi-icon blue">📋</div><div class="kpi-val">' + appts.length + '</div><div class="kpi-lbl">Total Sessions</div></div>' + '<div class="kpi-card"><div class="kpi-icon purple">💳</div><div class="kpi-val">KES ' + invTotal.toLocaleString() + '</div><div class="kpi-lbl">Total Billed</div></div>' + '<div class="kpi-card"><div class="kpi-icon amber">📝</div><div class="kpi-val">' + noteCount + '</div><div class="kpi-lbl">Clinical Notes</div></div>';
  var upc = document.getElementById('client-upcoming'); if (!upc) return;
  if (next) {
    upc.innerHTML = '<div style="font-weight:600;font-size:15px">' + next.type + '</div><div style="font-size:13px;color:var(--text2);margin-top:4px">' + next.clinician + ' - ' + next.date + ' - ' + next.time + ' - Room ' + next.room + '</div><div style="margin-top:8px"><span class="tag ' + (next.status === 'confirmed' ? 'green' : 'amber') + '">' + next.status + '</span></div>';
  } else {
    upc.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text2)">No upcoming appointments.</div>';
  }
}

// ── v6: Client wellness (challenges · mood · assessments · care plan · resources) ──
var CLIENT_MOOD = [2, 3, 3, 2, 4, 3, 4];
var MOOD_EMOJI = ['😣', '😞', '😐', '🙂', '😄'];
var MOOD_LABEL = ['Awful', 'Low', 'Okay', 'Good', 'Great'];

function wbar(p, c) {
  return '<div style="height:7px;border-radius:4px;background:var(--border)"><div style="height:100%;width:' + p + '%;border-radius:4px;background:var(--' + c + ')"></div></div>';
}

function assessCard(code, label, score, prev, sev) {
  var down = score < prev, diff = Math.abs(prev - score);
  return '<div style="padding:14px;border:1px solid var(--border);border-radius:12px;margin-bottom:10px">' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-start"><div>' +
    '<div style="font-size:13px;font-weight:600">' + code + ' · ' + label + '</div>' +
    '<div style="font-size:11px;color:var(--text3);margin-top:2px">Last taken 21 Jul 2026</div></div>' +
    '<div style="text-align:right"><div style="font-size:24px;font-weight:700">' + score + '</div>' +
    '<div style="font-size:11px;color:' + (down ? 'var(--green)' : 'var(--amber)') + '">' + (down ? '↓ ' + diff + ' improved' : '↑ ' + diff) + ' · ' + sev + '</div></div></div>' +
    '<button onclick="openAssessment(\'' + code + '\')" style="margin-top:12px;width:100%;padding:9px;background:var(--surface);border:1px solid var(--blue);color:var(--blue);border-radius:8px;font-weight:600;font-size:12px;cursor:pointer;font-family:var(--font)">Take ' + code + ' again</button></div>';
}

function renderClientWellness() {
  var ch = document.getElementById('client-challenges');
  if (ch) {
    var challenges = [{ l: 'Anxiety', p: 60, c: 'blue' }, { l: 'Low mood', p: 45, c: 'purple' }, { l: 'Work stress', p: 70, c: 'amber' }, { l: 'Sleep quality', p: 35, c: 'green' }];
    ch.innerHTML = '<div style="font-size:12px;color:var(--text2);margin-bottom:12px">Focus areas you and your clinician are working on.</div>' +
      challenges.map(function (x) {
        return '<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:500;margin-bottom:5px"><span>' + x.l + '</span><span style="color:var(--text3)">' + x.p + '%</span></div>' + wbar(x.p, x.c) + '</div>';
      }).join('');
  }
  var md = document.getElementById('client-mood');
  if (md) {
    var picker = MOOD_EMOJI.map(function (e, i) {
      return '<button onclick="logClientMood(' + i + ')" title="' + MOOD_LABEL[i] + '" style="flex:1;font-size:26px;background:transparent;border:1px solid var(--border);border-radius:12px;padding:8px 0;cursor:pointer">' + e + '</button>';
    }).join('');
    var bars = CLIENT_MOOD.map(function (v) {
      var h = 12 + v / 4 * 56;
      return '<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center"><div style="width:70%;height:' + h + 'px;border-radius:5px;background:var(--blue)"></div></div>';
    }).join('');
    md.innerHTML = '<div style="font-size:12px;color:var(--text2);margin-bottom:10px">How are you feeling today?</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:16px">' + picker + '</div>' +
      '<div style="font-size:11px;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Last 7 days</div>' +
      '<div style="display:flex;gap:6px;height:72px;align-items:flex-end">' + bars + '</div>';
  }
  var as = document.getElementById('client-assessments');
  if (as) as.innerHTML = assessCard('PHQ-9', 'Depression', 8, 14, 'Mild') + assessCard('GAD-7', 'Anxiety', 9, 13, 'Mild');
  var cp = document.getElementById('client-careplan');
  if (cp) {
    var goals = [{ g: 'Practice daily breathing exercises', p: 80 }, { g: 'Maintain 7+ hours of sleep', p: 55 }, { g: 'Weekly reflective journaling', p: 40 }];
    cp.innerHTML = goals.map(function (x) {
      return '<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:500;margin-bottom:5px"><span>' + x.g + '</span><span style="color:var(--text3)">' + x.p + '%</span></div>' + wbar(x.p, 'green') + '</div>';
    }).join('') +
      '<div style="margin-top:4px;padding:12px;background:var(--bg);border-radius:10px;font-size:12px;color:var(--text2)"><strong style="color:var(--text)">Next step:</strong> Continue CBT techniques; bring your mood log to Session 5 on Fri.</div>';
  }
  var rs = document.getElementById('client-resources');
  if (rs) {
    var res = [{ i: '🫁', t: '5-minute box breathing', d: 'Guided coping exercise', tag: 'Exercise' }, { i: '📖', t: 'Understanding anxiety', d: 'What it is and how therapy helps', tag: 'Article' }, { i: '🌙', t: 'Sleep hygiene basics', d: 'Build a better wind-down routine', tag: 'Article' }, { i: '✍️', t: 'Thought record worksheet', d: 'Challenge unhelpful thoughts', tag: 'Worksheet' }];
    rs.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
      res.map(function (x) {
        return '<div style="display:flex;gap:10px;padding:12px;border:1px solid var(--border);border-radius:10px;cursor:pointer" onclick="showToast(\'' + x.t + ' — opening resource\',\'info\')"><div style="font-size:22px">' + x.i + '</div><div><div style="font-size:13px;font-weight:600">' + x.t + '</div><div style="font-size:11px;color:var(--text2);margin-top:2px">' + x.d + '</div></div></div>';
      }).join('') + '</div>' +
      '<div style="margin-top:12px;padding:14px;border-radius:10px;background:rgba(255,59,48,.08);border:1px solid rgba(255,59,48,.25);display:flex;align-items:center;gap:12px"><div style="font-size:22px">🆘</div><div><div style="font-size:13px;font-weight:600;color:var(--red)">In crisis or need urgent help?</div><div style="font-size:12px;color:var(--text2)">Kenya: call <strong>1199</strong> (Childline) or <strong>0800 720 606</strong> (Befrienders Kenya) — 24/7.</div></div></div>';
  }
}

function logClientMood(i) {
  CLIENT_MOOD.push(i); CLIENT_MOOD.shift();
  renderClientWellness();
  showToast('Mood logged: ' + MOOD_LABEL[i], 'success');
}

function openAssessment(code) {
  var qs = code === 'PHQ-9'
    ? ['Little interest or pleasure in doing things', 'Feeling down, depressed, or hopeless', 'Trouble falling/staying asleep, or sleeping too much', 'Feeling tired or having little energy', 'Poor appetite or overeating']
    : ['Feeling nervous, anxious, or on edge', 'Not being able to stop or control worrying', 'Worrying too much about different things', 'Trouble relaxing', 'Becoming easily annoyed or irritable'];
  var opts = ['Not at all', 'Several days', 'More than half', 'Nearly every day'];
  var rows = qs.map(function (q, qi) {
    return '<div style="margin-bottom:14px"><div style="font-size:13px;font-weight:500;margin-bottom:8px">' + (qi + 1) + '. ' + q + '</div><div style="display:flex;gap:6px">' +
      opts.map(function (o, oi) {
        return '<button data-q="' + qi + '" data-v="' + oi + '" onclick="pickAnswer(this)" style="flex:1;padding:8px 4px;font-size:11px;border:1px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-family:var(--font)">' + o + '</button>';
      }).join('') + '</div></div>';
  }).join('');
  showModal('<div style="padding:24px"><div style="font-size:17px;font-weight:700;margin-bottom:4px">' + code + ' Self-Assessment</div><div style="font-size:12px;color:var(--text2);margin-bottom:20px">Over the last 2 weeks, how often have you been bothered by the following?</div><div id="assess-body">' + rows + '</div><button onclick="submitAssessment(\'' + code + '\',' + qs.length + ')" style="width:100%;padding:12px;background:var(--blue);color:#fff;border:none;border-radius:10px;font-weight:600;font-size:14px;cursor:pointer;font-family:var(--font);margin-top:8px">Submit</button></div>');
}

function pickAnswer(btn) {
  var sib = btn.parentElement.querySelectorAll('button');
  for (var i = 0; i < sib.length; i++) { sib[i].style.background = 'var(--surface)'; sib[i].style.color = 'var(--text)'; sib[i].style.borderColor = 'var(--border)'; sib[i].removeAttribute('data-sel'); }
  btn.style.background = 'var(--blue)'; btn.style.color = '#fff'; btn.style.borderColor = 'var(--blue)'; btn.setAttribute('data-sel', '1');
}

function submitAssessment(code, n) {
  var sel = document.querySelectorAll('#assess-body button[data-sel="1"]');
  if (sel.length < n) { showToast('Please answer all ' + n + ' questions', 'error'); return; }
  var score = 0;
  for (var i = 0; i < sel.length; i++) score += parseInt(sel[i].getAttribute('data-v'), 10);
  hideModal();
  showToast(code + ' submitted — score ' + score + '. Saved to your record.', 'success');
}

function renderClientAppointments() {
  var cl = ClientStore.currentClient; if (!cl) return;
  var appts = Store.appointments.filter(function(a) { return a.clientId === cl.id || a.clientName === cl.name; });
  var upc = document.getElementById('client-upcoming-list');
  if (upc) {
    var upcoming = appts.filter(function(a) { return a.status === 'confirmed' || a.status === 'pending' || a.status === 'in_progress'; });
    upc.innerHTML = upcoming.length ? upcoming.map(function(a) {
      return '<div class="apt-row"><div class="apt-status ' + (a.status === 'in_progress' ? 'now' : 'ok') + '"></div><div class="apt-info"><div class="apt-name">' + a.type + '</div><div class="apt-detail">' + a.clinician + ' - ' + a.date + ' - ' + a.time + ' - Room ' + a.room + '</div></div><span class="tag ' + (a.status === 'confirmed' ? 'green' : 'amber') + '">' + a.status + '</span><button data-cancel="' + a.id + '" style="margin-left:8px;padding:4px 10px;border:1px solid var(--red);border-radius:12px;background:transparent;color:var(--red);cursor:pointer;font-family:var(--font);font-size:10px;font-weight:600">Cancel</button></div>';
    }).join('') : '<div style="padding:40px;text-align:center;color:var(--text2)">No upcoming appointments</div>';
  }
  var pac = document.getElementById('client-past-list');
  if (pac) {
    var past = appts.filter(function(a) { return a.status === 'completed' || a.status === 'cancelled' || a.status === 'no_show'; });
    pac.innerHTML = past.length ? past.map(function(a) { return '<div class="apt-row"><div class="apt-status ok"></div><div class="apt-info"><div class="apt-name">' + a.type + '</div><div class="apt-detail">' + a.clinician + ' - ' + a.date + ' - ' + a.time + '</div></div><span class="tag neutral">' + a.status + '</span></div>'; }).join('') : '<div style="padding:40px;text-align:center;color:var(--text2)">No past sessions</div>';
  }
}

function cancelClientAppointment(id) {
  confirmDialog('Cancel Appointment', 'Cancel this appointment?', function() {
    var a = Store.appointments.find(function(x) { return x.id === id; });
    if (a) { a.status = 'cancelled'; Store.auditLog.unshift({ ts: new Date().toISOString().slice(0, 16).replace('T', ' '), user: ClientStore.currentClient ? ClientStore.currentClient.name : 'Client', action: 'CANCEL', obj: 'Appointment ' + id, detail: 'Cancelled by client' }); }
    renderClientAppointments(); renderClientDashboard(); showToast('Appointment cancelled', 'info');
  });
}

function renderClientPayments() {
  var cl = ClientStore.currentClient; if (!cl) return;
  var invs = Store.invoices.filter(function(i) { return i.client === cl.name; });
  var ic = document.getElementById('client-invoices');
  if (ic) {
    var outstanding = invs.filter(function(i) { return i.status !== 'paid'; });
    ic.innerHTML = outstanding.length ? outstanding.map(function(i) {
      return '<div class="apt-row"><div class="apt-status wait"></div><div class="apt-info"><div class="apt-name">' + i.id + '</div><div class="apt-detail">KES ' + i.amount.toLocaleString() + '.00 - ' + i.date + '</div></div><span class="tag amber">' + i.status + '</span><button data-pay="' + i.id + '" style="margin-left:8px;padding:6px 14px;background:var(--green);color:#fff;border:none;border-radius:14px;cursor:pointer;font-family:var(--font);font-size:11px;font-weight:600">Pay with M-PESA</button></div>';
    }).join('') : '<div style="padding:40px;text-align:center;color:var(--text2)">No outstanding invoices</div>';
  }
  var pc = document.getElementById('client-payment-history');
  if (pc) {
    var paid = invs.filter(function(i) { return i.status === 'paid'; });
    pc.innerHTML = paid.length ? paid.map(function(i) { return '<div class="apt-row"><div class="apt-status ok"></div><div class="apt-info"><div class="apt-name">' + i.id + '</div><div class="apt-detail">KES ' + i.amount.toLocaleString() + '.00 - Paid - ' + (i.etr || '') + '</div></div><span class="tag green">paid</span></div>'; }).join('') : '<div style="padding:40px;text-align:center;color:var(--text2)">No payment history</div>';
  }
}

function simulateMpesaPayment(invId) {
  confirmDialog('M-PESA Payment', 'Simulate PayBill payment for ' + invId + '?', function() {
    var inv = Store.invoices.find(function(i) { return i.id === invId; });
    if (inv) { inv.status = 'paid'; inv.etr = 'KRA-2026-' + invId + '-SRN'; inv.mpesa = 'MP' + Math.random().toString(36).substring(2, 8).toUpperCase(); }
    Store.mpesaLog.unshift({ transId: 'MP' + Math.random().toString(36).substring(2, 8).toUpperCase(), amount: inv ? inv.amount : 0, phone: ClientStore.currentClient ? ClientStore.currentClient.phone : '', ref: invId, date: new Date().toISOString(), matched: true });
    renderClientPayments(); renderClientDashboard(); showToast('Payment confirmed - ETR receipt generated', 'success');
  });
}

function renderClientProfile() {
  var cl = ClientStore.currentClient; if (!cl) return;
  var pf = document.getElementById('client-profile-form'); if (!pf) return;
  pf.innerHTML = '<div class="grid-2col" style="gap:12px"><div><div class="fl">Full Name</div><input style="width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" value="' + (cl.name || '') + '"></div><div><div class="fl">Phone</div><input style="width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" value="' + (cl.phone || '') + '"></div></div><div class="fl">Reason for Visit</div><textarea style="width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;resize:vertical;min-height:60px;margin-bottom:10px">' + (cl.reasonForVisit || '') + '</textarea><div class="grid-2col" style="gap:12px"><div><div class="fl">Preferred Gender</div><select style="width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px"><option>No Preference</option><option>Male</option><option>Female</option></select></div><div><div class="fl">Insurance</div><select style="width:100%;padding:10px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px"><option>Self-pay</option><option>NHIF</option><option>Apex Insurance</option><option>Jubilee</option><option>CIC</option></select></div></div><button data-save-profile="1">Save Changes</button>';
}

function selectCard(el, containerId) {
  var cards = document.querySelectorAll('#' + containerId + ' .client-card');
  for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
  el.classList.add('selected');
}

// ── EVENT DELEGATION ──
document.addEventListener('click', function(e) {
  var card = e.target.closest('#intake-types .client-card');
  if (card) {
    var cards = document.querySelectorAll('#intake-types .client-card');
    for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
    card.classList.add('selected');
    if (!ClientStore._intake) ClientStore._intake = {};
    ClientStore._intake.preferredType = card.getAttribute('data-type');
    return;
  }
  card = e.target.closest('#intake-gender .client-card');
  if (card) { selectCard(card, 'intake-gender'); return; }
  card = e.target.closest('#intake-availability .toggle-card');
  if (card) { card.classList.toggle('selected'); return; }
  card = e.target.closest('#booking-types .client-card');
  if (card) { selectBookingType(card); return; }
  card = e.target.closest('#booking-clinicians .client-card');
  if (card) { selectBookingClinician(card); return; }
  card = e.target.closest('#booking-slots .booking-slot[data-available]');
  if (card) { selectBookingSlot(card); return; }
  var cancelBtn = e.target.closest('[data-cancel]');
  if (cancelBtn) { cancelClientAppointment(cancelBtn.getAttribute('data-cancel')); return; }
  var payBtn = e.target.closest('[data-pay]');
  if (payBtn) { simulateMpesaPayment(payBtn.getAttribute('data-pay')); return; }
});

// Override renderView
var _origRenderView = renderView;
renderView = function(vid) {
  _origRenderView(vid);
  if (vid === 'client-dashboard') renderClientDashboard();
  if (vid === 'client-booking') renderBookingStep1();
  if (vid === 'client-appointments') renderClientAppointments();
  if (vid === 'client-payments') renderClientPayments();
  if (vid === 'client-profile') renderClientProfile();
};
