// ═══════════════════════════════════════════
// SERENIMINDS v5 — COMPLETE FUNCTIONALITY
// ═══════════════════════════════════════════

// ── DATA LAYER ──
const Store = {
  clients: [
    { id:'SRN-0042', name:'Mwangi, David', phone:'+254 712 345 678', age:34, gender:'Male', paymentType:'self_pay', nextAppt:'2026-07-21T11:00', clinician:'Dr. Otieno', status:'active', nationality:'Kenyan', idType:'national_id', idNumber:'12345678', residence:'Nairobi', reasonForVisit:'Anxiety and workplace stress', preferredGender:'no_preference', emergency:{name:'Mary Mwangi', relationship:'Spouse', phone:'+254 722 111 222'} },
    { id:'SRN-0038', name:'Akinyi, Susan', phone:'+254 723 456 789', age:28, gender:'Female', paymentType:'self_pay', nextAppt:'2026-07-21T09:00', clinician:'Dr. Otieno', status:'active' },
    { id:'SRN-0045', name:'Omondi, James', phone:'+254 711 223 344', age:42, gender:'Male', paymentType:'insurance', insurance:'Apex Insurance', nextAppt:'2026-07-21T10:15', clinician:'Dr. Wanjiku', status:'active' },
    { id:'SRN-0051', name:'Nasir, Amina', phone:'+254 734 567 890', age:31, gender:'Female', paymentType:'self_pay', nextAppt:'2026-07-21T14:00', clinician:'Dr. Otieno', status:'active' },
    { id:'SRN-0055', name:'Wanjiku, Faith', phone:'+254 755 112 233', age:35, gender:'Female', paymentType:'self_pay', nextAppt:'2026-07-21T12:30', clinician:'Dr. Wanjiku', status:'active' },
    { id:'SRN-0060', name:'Kimani, Grace', phone:'+254 721 998 877', age:26, gender:'Female', paymentType:'insurance', insurance:'NHIF', nextAppt:'2026-07-21T13:00', clinician:'Dr. Wanjiku', status:'active' },
    { id:'SRN-0062', name:'Ochieng, Tom', phone:'+254 733 221 100', age:45, gender:'Male', paymentType:'self_pay', nextAppt:'2026-07-21T07:00', clinician:'Dr. Wanjiku', status:'active' },
  ],
  appointments: [
    { id:'APT-001', clientId:'SRN-0038', clientName:'Akinyi, Susan', clinician:'Dr. Otieno', type:'Individual Psychotherapy', room:'A', time:'07:00', duration:60, status:'in_progress', date:'2026-07-21' },
    { id:'APT-002', clientId:'SRN-0062', clientName:'Ochieng, Tom', clinician:'Dr. Wanjiku', type:'Psychological Assessment', room:'B', time:'07:00', duration:90, status:'confirmed', date:'2026-07-21' },
    { id:'APT-003', clientId:'SRN-0051', clientName:'Nasir, Amina', clinician:'Dr. Otieno', type:'Follow Up', room:'B', time:'08:30', duration:30, status:'confirmed', date:'2026-07-21' },
    { id:'APT-004', clientId:'SRN-0042', clientName:'Mwangi, David', clinician:'Dr. Otieno', type:'Individual Psychotherapy', room:'A', time:'10:00', duration:60, status:'confirmed', date:'2026-07-21' },
    { id:'APT-005', clientId:'SRN-0055', clientName:'Wanjiku, Faith & Peter', clinician:'Dr. Wanjiku', type:'Couples Psychotherapy', room:'B', time:'11:30', duration:60, status:'pending', date:'2026-07-21', conflict:true },
    { id:'APT-006', clientId:'SRN-0060', clientName:'Kimani, Grace', clinician:'Dr. Wanjiku', type:'Individual Psychotherapy', room:'A', time:'13:00', duration:60, status:'confirmed', date:'2026-07-21' },
  ],
  clinicalNotes: [
    { id:'NOTE-001', clientId:'SRN-0038', clientName:'Akinyi, Susan', clinician:'Dr. Otieno', date:'2026-07-21', type:'psychologist', template:'SOAP', content:{S:'Client reports feeling "less overwhelmed this week."',O:'PHQ-9: 8 (down from 12). GAD-7: 10 (down from 14).',A:'Moderate improvement. CBT effective.',P:'Continue weekly sessions.'}, signed:true, diagnoses:['F41.1','F32.1'] },
    { id:'NOTE-002', clientId:'SRN-0045', clientName:'Omondi, James', clinician:'Dr. Wanjiku', date:'2026-07-20', type:'psychiatrist', template:'SOAP', content:{S:'Reports persistent anxiety.',O:'GAD-7: 15.',A:'Generalized anxiety.',P:'Start Sertraline 50mg.'}, signed:true, diagnoses:['F41.1'] },
  ],
  pettyCash: JSON.parse(localStorage.getItem('sr_pettycash')||'[{"id":"PCR-001","amount":2500,"category":"Water & Utilities","purpose":"Office water supply","requester":"Stephanie","date":"2026-07-21","step1":"pending","step2":null},{"id":"PCR-002","amount":1200,"category":"Transport","purpose":"Uber — client emergency","requester":"Dr. Otieno","date":"2026-07-20","step1":"approved","step2":"pending"},{"id":"PCR-003","amount":850,"category":"Office Supplies","purpose":"Stationery","requester":"Stephanie","date":"2026-07-21","step1":"pending","step2":null},{"id":"PCR-004","amount":3000,"category":"Staff Welfare","purpose":"Staff lunch","requester":"Stephanie","date":"2026-07-19","step1":"approved","step2":"pending"},{"id":"PCR-005","amount":1800,"category":"Office Supplies","purpose":"Cleaning supplies","requester":"Stephanie","date":"2026-07-19","step1":"approved","step2":"approved"}]'),
  invoices: [
    { id:'INV-0042', client:'Mwangi, David', amount:15000, status:'overdue', etr:'KRA-2026-0042-SRN', date:'2026-07-14' },
    { id:'INV-0038', client:'Omondi, James', amount:8500, status:'overdue', etr:null, date:'2026-07-09' },
    { id:'INV-0044', client:'Akinyi, Susan', amount:3000, status:'paid', etr:'KRA-2026-0044-SRN', mpesa:'QW93TY8XK2', date:'2026-07-21' },
    { id:'INV-0041', client:'Nasir, Amina', amount:3000, status:'paid', etr:'KRA-2026-0041-SRN', mpesa:'LK82MN4PQ7', date:'2026-07-14' },
    { id:'INV-0040', client:'Kimani, Grace', amount:3000, status:'paid', etr:'KRA-2026-0040-SRN', mpesa:'RT65WQ3NP1', date:'2026-07-21' },
  ],
  mpesaLog: [
    { transId:'QW93TY8XK2', amount:3000, phone:'254712345678', ref:'INV-0044', date:'2026-07-21T09:05', matched:true },
    { transId:'LK82MN4PQ7', amount:3000, phone:'254734567890', ref:'INV-0041', date:'2026-07-14T14:20', matched:true },
    { transId:'RT65WQ3NP1', amount:3000, phone:'254721998877', ref:'INV-0040', date:'2026-07-21T13:45', matched:true },
    { transId:'XM91BN7FG3', amount:5000, phone:'254798112233', ref:'UNKNOWN', date:'2026-07-21T08:30', matched:false },
  ],
  consultants: [
    { id:'C-001', name:'Dr. Wanjiku', service:'8 sessions', date:'Jul 2026', amount:48000, status:'pending_etr' },
    { id:'C-002', name:'Dr. Otieno', service:'6 sessions', date:'Jul 2026', amount:37000, status:'pending_etr' },
    { id:'C-003', name:'Office Supplies Ltd', service:'Stationery', date:'Due 28 Jul', amount:12300, status:'pending' },
  ],
  auditLog: [
    { ts:'2026-07-21 09:15', user:'Arthur G.', action:'UPDATE', obj:'Appointment APT-001', detail:'Status changed to in_progress' },
    { ts:'2026-07-21 08:45', user:'Stephanie', action:'CREATE', obj:'Petty Cash PCR-003', detail:'Request: KES 850' },
    { ts:'2026-07-21 08:30', user:'Dr. Otieno', action:'SIGN', obj:'Clinical Note NOTE-001', detail:'Note signed' },
    { ts:'2026-07-21 08:00', user:'Arthur G.', action:'APPROVE', obj:'Petty Cash PCR-002', detail:'Step 1 approved' },
    { ts:'2026-07-20 16:20', user:'Ruth', action:'AUTHORIZE', obj:'Petty Cash PCR-005', detail:'Step 2 approved. Disbursed.' },
    { ts:'2026-07-20 14:00', user:'Dr. Wanjiku', action:'SIGN', obj:'Clinical Note NOTE-002', detail:'Note signed' },
    { ts:'2026-07-20 10:30', user:'Stephanie', action:'CREATE', obj:'Client SRN-0060', detail:'New client: Kimani, Grace' },
    { ts:'2026-07-19 15:00', user:'Arthur G.', action:'UPDATE', obj:'Settings', detail:'Updated operating hours' },
  ],
  users: JSON.parse(localStorage.getItem('sr_users')||'[{"id":"U-001","name":"Arthur G.","email":"arthur@sereniminds.co.ke","roles":["admin"],"status":"active","lastLogin":"2026-07-21 08:00"},{"id":"U-002","name":"Stephanie","email":"stephanie@sereniminds.co.ke","roles":["admin-assistant"],"status":"active","lastLogin":"2026-07-21 08:15"},{"id":"U-003","name":"Ruth","email":"ruth@sereniminds.co.ke","roles":["accountant"],"status":"active","lastLogin":"2026-07-20 16:00"},{"id":"U-004","name":"Dr. Otieno","email":"otieno@sereniminds.co.ke","roles":["clinical"],"status":"active","lastLogin":"2026-07-21 07:30"},{"id":"U-005","name":"Dr. Wanjiku","email":"wanjiku@sereniminds.co.ke","roles":["clinical"],"status":"active","lastLogin":"2026-07-21 07:00"}]'),
  roles: JSON.parse(localStorage.getItem('sr_roles')||'[{"id":"admin","name":"Administrator","permissions":["dashboard.view","appointments.view","appointments.create","appointments.edit","appointments.cancel","clients.view","clients.create","clients.edit","clients.delete","clinical.view_all","clinical.create","clinical.sign","clinical.delete","billing.view","billing.create","billing.edit","billing.approve","pettycash.request","pettycash.approve_level_1","pettycash.approve_level_2","financials.view","financials.export","insurance.view","insurance.manage","reports.view","reports.export","users.view","users.manage","settings.view","settings.edit","audit.view","etims.submit","etims.view","mpesa.verify","mpesa.reconcile"]},{"id":"accountant","name":"Accountant","permissions":["dashboard.view","appointments.view","billing.view","billing.create","billing.edit","billing.approve","pettycash.approve_level_2","financials.view","financials.export","reports.view","reports.export","insurance.view","audit.view","etims.submit","etims.view","mpesa.verify","mpesa.reconcile"]},{"id":"admin-assistant","name":"Admin Assistant","permissions":["dashboard.view","appointments.view","appointments.create","appointments.edit","clients.view","clients.create","clients.edit","billing.view","billing.create","pettycash.request","pettycash.approve_level_1","insurance.view","reports.view","audit.view"]},{"id":"clinical","name":"Clinical Staff","permissions":["dashboard.view","appointments.view","clients.view","clinical.view_own","clinical.create","clinical.sign","reports.view"]}]'),
  allPermissions: [
    { group:'Dashboard', perms:['dashboard.view'] },
    { group:'Appointments', perms:['appointments.view','appointments.create','appointments.edit','appointments.cancel'] },
    { group:'Clients', perms:['clients.view','clients.create','clients.edit','clients.delete'] },
    { group:'Clinical Notes', perms:['clinical.view_own','clinical.view_all','clinical.create','clinical.sign','clinical.delete'] },
    { group:'Billing', perms:['billing.view','billing.create','billing.edit','billing.approve'] },
    { group:'Petty Cash', perms:['pettycash.request','pettycash.approve_level_1','pettycash.approve_level_2'] },
    { group:'Financials', perms:['financials.view','financials.export'] },
    { group:'Insurance', perms:['insurance.view','insurance.manage'] },
    { group:'Reports', perms:['reports.view','reports.export'] },
    { group:'Users & Roles', perms:['users.view','users.manage'] },
    { group:'Settings', perms:['settings.view','settings.edit'] },
    { group:'Audit', perms:['audit.view'] },
    { group:'eTIMS', perms:['etims.submit','etims.view'] },
    { group:'M-PESA', perms:['mpesa.verify','mpesa.reconcile'] },
  ],
  serviceTypes: [
    { id:'ST-001', name:'Individual Psychotherapy', defaultDuration:60, bufferMinutes:15, price:3000, cptCode:'90837', category:'clinical', requiresRoom:true, maxClients:1 },
    { id:'ST-002', name:'Psychiatrist Evaluation', defaultDuration:60, bufferMinutes:15, price:5000, cptCode:'90792', category:'clinical', requiresRoom:true, maxClients:1 },
    { id:'ST-003', name:'Couples Psychotherapy', defaultDuration:60, bufferMinutes:15, price:4000, cptCode:'90847', category:'clinical', requiresRoom:true, maxClients:2 },
    { id:'ST-004', name:'Family Psychotherapy', defaultDuration:75, bufferMinutes:15, price:5000, cptCode:'90847', category:'clinical', requiresRoom:true, maxClients:6 },
    { id:'ST-005', name:'Group Psychotherapy', defaultDuration:90, bufferMinutes:15, price:2000, cptCode:'90853', category:'clinical', requiresRoom:true, maxClients:8 },
    { id:'ST-006', name:'Psychological Assessment', defaultDuration:90, bufferMinutes:15, price:7500, cptCode:'96130', category:'clinical', requiresRoom:true, maxClients:1 },
    { id:'ST-007', name:'Follow Up', defaultDuration:30, bufferMinutes:10, price:2000, cptCode:'90832', category:'clinical', requiresRoom:true, maxClients:1 },
    { id:'ST-008', name:'Wellness Training', defaultDuration:120, bufferMinutes:30, price:15000, cptCode:'', category:'wellness', requiresRoom:false, maxClients:30 },
    { id:'ST-009', name:'Team Building', defaultDuration:240, bufferMinutes:30, price:50000, cptCode:'', category:'corporate', requiresRoom:false, maxClients:50 },
    { id:'ST-010', name:'Boot Camp', defaultDuration:480, bufferMinutes:60, price:100000, cptCode:'', category:'corporate', requiresRoom:false, maxClients:100 },
  ],
  diagnosisCodes: [
    { code:'F41.1', name:'Generalized Anxiety Disorder' },
    { code:'F32.1', name:'Moderate Depressive Episode' },
    { code:'F32.2', name:'Major Depressive Disorder' },
    { code:'F43.10', name:'Post-Traumatic Stress Disorder' },
    { code:'F40.10', name:'Social Anxiety Disorder' },
    { code:'F42.2', name:'Obsessive-Compulsive Disorder' },
    { code:'F60.3', name:'Borderline Personality Disorder' },
    { code:'Z60.0', name:'Phase of Life Problem' },
    { code:'F90.0', name:'ADHD, Predominantly Inattentive' },
  ],
  supportiveData: [
    { id:'SD-001', clientId:'SRN-0042', clientName:'Mwangi, David', clinician:'Dr. Otieno', title:'Referral letter from GP', note:'Referred by Dr. Kamau at Nairobi Hospital.', docType:'referral', fileName:'gp_referral_mwangi.pdf', fileSize:245000, date:'2026-07-14', downloadable:true },
    { id:'SD-002', clientId:'SRN-0042', clientName:'Mwangi, David', clinician:'Dr. Otieno', title:'Blood work results', note:'FBC normal. Thyroid normal.', docType:'lab_result', fileName:'labs_mwangi_jul2026.pdf', fileSize:180000, date:'2026-07-18', downloadable:true },
    { id:'SD-003', clientId:'SRN-0038', clientName:'Akinyi, Susan', clinician:'Dr. Otieno', title:'Previous therapy notes', note:'8 sessions CBT in 2024.', docType:'previous_record', fileName:'prev_therapy_akinyi.pdf', fileSize:320000, date:'2026-07-10', downloadable:true },
  ],
  selectedDiagnoses: ['F41.1','F32.1'],
  currentDate: '2026-07-21',
  period: 'Monthly',
  finTab: null,
  noteTemplate: 'Intake',
  glEntries: [
    { date:'2026-07-01', account:'Cash & Bank', debit:1245000, credit:0, desc:'Opening balance' },
    { date:'2026-07-03', account:'Revenue — Individual Psychotherapy', debit:0, credit:36000, desc:'Session fees — Akinyi x3, Mwangi x3, etc.' },
    { date:'2026-07-03', account:'Cash & Bank', debit:36000, credit:0, desc:'M-PESA receipts — session payments' },
    { date:'2026-07-05', account:'Revenue — Psychiatrist Evaluation', debit:0, credit:25000, desc:'Evaluations — Dr. Wanjiku x5' },
    { date:'2026-07-05', account:'Cash & Bank', debit:25000, credit:0, desc:'M-PESA receipts — evaluation payments' },
    { date:'2026-07-08', account:'Revenue — Couples Psychotherapy', debit:0, credit:16000, desc:'Couples sessions x4' },
    { date:'2026-07-08', account:'Cash & Bank', debit:16000, credit:0, desc:'M-PESA receipts — couples sessions' },
    { date:'2026-07-10', account:'Consultant Payments', debit:48000, credit:0, desc:'Dr. Wanjiku — 8 sessions Jul' },
    { date:'2026-07-10', account:'Cash & Bank', debit:0, credit:48000, desc:'Payment to Dr. Wanjiku' },
    { date:'2026-07-12', account:'Revenue — Follow Up', debit:0, credit:8000, desc:'Follow-up sessions x4' },
    { date:'2026-07-12', account:'Cash & Bank', debit:8000, credit:0, desc:'M-PESA receipts — follow-ups' },
    { date:'2026-07-15', account:'Consultant Payments', debit:37000, credit:0, desc:'Dr. Otieno — 6 sessions Jul' },
    { date:'2026-07-15', account:'Cash & Bank', debit:0, credit:37000, desc:'Payment to Dr. Otieno' },
    { date:'2026-07-18', account:'Office Expenses', debit:12300, credit:0, desc:'Office Supplies Ltd — stationery' },
    { date:'2026-07-18', account:'Cash & Bank', debit:0, credit:12300, desc:'Payment to Office Supplies Ltd' },
    { date:'2026-07-19', account:'Utilities & Rent', debit:85000, credit:0, desc:'Clinic rent — Jul 2026' },
    { date:'2026-07-19', account:'Cash & Bank', debit:0, credit:85000, desc:'Rent payment' },
    { date:'2026-07-21', account:'Petty Cash', debit:5000, credit:0, desc:'Petty cash replenishment' },
    { date:'2026-07-21', account:'Cash & Bank', debit:0, credit:5000, desc:'Petty cash float top-up' },
  ],
  _calView: 'day',
  _kpiPeriod: 'today',
  _filter: null,
  _tourCompleted: false,
  _outcomeClient: null,
  // ── EAP data ──
  eapOrgs: [
    { id:'EAP-001', name:'Unity Homes', contactPerson:'Sarah Kimani', contactPhone:'+254 722 100 200', contactEmail:'sarah@unityhomes.co.ke', contractStart:'2026-01-01', contractEnd:'2026-12-31', billingModel:'per_session', isActive:true, notes:'Onsite clinic days every other Tuesday. Focus on workplace stress and manager consultations.', employeeCount:120, sessionsThisMonth:5 },
    { id:'EAP-002', name:'HatoCity', contactPerson:'Peter Ochieng', contactPhone:'+254 733 456 789', contactEmail:'peter@hatocity.co.ke', contractStart:'2026-03-01', contractEnd:'2027-02-28', billingModel:'retainer', isActive:true, notes:'Monthly retainer covering up to 12 sessions/month. Includes quarterly wellness workshops.', employeeCount:85, sessionsThisMonth:3 },
    { id:'EAP-003', name:'Greenfield Academy', contactPerson:'Grace Wanjiku', contactPhone:'+254 711 789 012', contactEmail:'grace@greenfield.ac.ke', contractStart:'2025-01-01', contractEnd:'2026-05-31', billingModel:'pro_bono', isActive:false, notes:'Pro bono program for teachers. Contract ended May 2026.', employeeCount:45, sessionsThisMonth:0 },
  ],
  eapEmployees: [
    { id:'EEMP-001', orgId:'EAP-001', name:'James Muthoka', department:'Operations', employeeId:'UH-042', isActive:true },
    { id:'EEMP-002', orgId:'EAP-001', name:'Alice Wambui', department:'HR', employeeId:'UH-018', isActive:true },
    { id:'EEMP-003', orgId:'EAP-001', name:'David Kioko', department:'Finance', employeeId:'UH-103', isActive:true },
    { id:'EEMP-004', orgId:'EAP-002', name:'Mercy Atieno', department:'IT', employeeId:'HC-221', isActive:true },
    { id:'EEMP-005', orgId:'EAP-002', name:'Paul Njenga', department:'Operations', employeeId:'HC-087', isActive:true },
    { id:'EEMP-006', orgId:'EAP-003', name:'Christine Mueni', department:'Teaching', employeeId:'GA-015', isActive:false },
  ],
  eapSessions: [
    { id:'ES-001', orgId:'EAP-001', date:'2026-07-08', location:'on_site', clinician:'Dr. Otieno', status:'completed', notes:'Onsite clinic day at Unity Homes HQ. 5 employees seen. Common themes: workplace stress, burnout prevention.', employeeNotes:[{employeeId:'EEMP-001',note:'Reports high stress from upcoming audit. GAD-7: 12. Discussed breathing techniques and time management.',followUp:false},{employeeId:'EEMP-002',note:'Work-life balance concerns. Two young children. Referred to on-site childcare resources.',followUp:true,followUpDate:'2026-07-22'},{employeeId:'EEMP-003',note:'Sleep difficulties. PHQ-9: 10. Recommended sleep hygiene and follow-up in 2 weeks.',followUp:true,followUpDate:'2026-07-22'}] },
    { id:'ES-002', orgId:'EAP-002', date:'2026-07-15', location:'clinic', clinician:'Dr. Wanjiku', status:'completed', notes:'Clinic day for HatoCity employees. 3 employees seen for individual sessions.', employeeNotes:[{employeeId:'EEMP-004',note:'Initial intake. Work-related anxiety. GAD-7: 14. Will start weekly sessions.',followUp:true,followUpDate:'2026-07-22'},{employeeId:'EEMP-005',note:'Career transition stress. Discussed coping strategies. No clinical diagnosis.',followUp:false}] },
  ],
  // ── Trainings data ──
  trainings: [
    { id:'TR-001', title:'Stress Management Workshop', organization:'Unity Homes', date:'2026-07-15', facilitator:'Dr. Otieno', attendees:24, paymentStatus:'paid', amount:45000, notes:'Group workshop on stress management techniques, mindfulness exercises, and breathing techniques for Unity Homes employees. PHQ-9 baseline collected. Follow-up scheduled for 3 attendees.', invoiceId:'INV-0050' },
    { id:'TR-002', title:'Mental Health First Aid', organization:'HatoCity', date:'2026-07-08', facilitator:'Dr. Wanjiku', attendees:18, paymentStatus:'paid', amount:35000, notes:'Standard Mental Health First Aid certification course. 18 participants completed the 2-day program. All received certificates.', invoiceId:'INV-0048' },
    { id:'TR-003', title:'Workplace Wellness Seminar', organization:'Greenfield Academy', date:'2026-06-25', facilitator:'Dr. Otieno', attendees:45, paymentStatus:'pro_bono', amount:null, notes:'Pro bono wellness seminar for teaching staff. Covered stress recognition, self-care strategies, and when to seek help.' },
    { id:'TR-004', title:'Emotional Intelligence at Work', organization:'AAR Insurance', date:'2026-06-18', facilitator:'Dr. Wanjiku', attendees:32, paymentStatus:'paid', amount:55000, notes:'Corporate EI training. Pre and post assessments showed 22% improvement in self-awareness scores.', invoiceId:'INV-0045' },
    { id:'TR-005', title:'Crisis Response Training', organization:'NBO Foundation', date:'2026-06-10', facilitator:'Dr. Otieno', attendees:15, paymentStatus:'pro_bono', amount:null, notes:'Community crisis response training for NGO staff working in high-stress environments.' },
    { id:'TR-006', title:'Leadership Resilience Workshop', organization:'Safaricom PLC', date:'2026-07-01', facilitator:'Dr. Kamau', attendees:28, paymentStatus:'pending', amount:65000, notes:'Half-day workshop for senior management. Invoice sent, awaiting payment.', invoiceId:'INV-0052' },
  ],
  // ── Outcome Measures data ──
  outcomeMeasures: [
    { id:'OM-001', clientId:'SRN-0042', clientName:'Mwangi, David', clinician:'Dr. Otieno', date:'2026-07-21', measureType:'phq9', responses:[1,2,1,2,0,2,1,1,0], totalScore:10, severity:'moderate', appointmentId:'APT-004' },
    { id:'OM-002', clientId:'SRN-0042', clientName:'Mwangi, David', clinician:'Dr. Otieno', date:'2026-07-14', measureType:'phq9', responses:[2,2,2,2,1,3,1,1,0], totalScore:14, severity:'moderate', appointmentId:null },
    { id:'OM-003', clientId:'SRN-0042', clientName:'Mwangi, David', clinician:'Dr. Otieno', date:'2026-07-07', measureType:'phq9', responses:[3,2,3,2,2,3,2,2,1], totalScore:20, severity:'moderately_severe', appointmentId:null },
    { id:'OM-004', clientId:'SRN-0042', clientName:'Mwangi, David', clinician:'Dr. Otieno', date:'2026-07-21', measureType:'gad7', responses:[2,1,2,1,1,2,1], totalScore:10, severity:'moderate', appointmentId:'APT-004' },
    { id:'OM-005', clientId:'SRN-0042', clientName:'Mwangi, David', clinician:'Dr. Otieno', date:'2026-07-14', measureType:'gad7', responses:[3,2,2,2,1,2,2], totalScore:14, severity:'moderate', appointmentId:null },
    { id:'OM-006', clientId:'SRN-0038', clientName:'Akinyi, Susan', clinician:'Dr. Otieno', date:'2026-07-21', measureType:'phq9', responses:[1,1,0,1,0,1,0,0,0], totalScore:4, severity:'none', appointmentId:null },
  ],
  // ── Assessment definitions ──
  assessments: {
    phq9: {title:'PHQ-9 — Depression',instructions:'Over the last 2 weeks, how often have you been bothered by any of the following problems?',questions:['Little interest or pleasure in doing things','Feeling down, depressed, or hopeless','Trouble falling/staying asleep or sleeping too much','Feeling tired or having little energy','Poor appetite or overeating','Feeling bad about yourself','Trouble concentrating on things','Moving or speaking slowly (or being fidgety/restless)','Thoughts of self-harm or being better off dead'],scale:['Not at all (0)','Several days (1)','More than half the days (2)','Nearly every day (3)'],maxScore:27,severity:[{max:4,label:'None/Minimal',color:'#34C759'},{max:9,label:'Mild',color:'#AF52DE'},{max:14,label:'Moderate',color:'#FF9500'},{max:19,label:'Moderately Severe',color:'#FF3B30'},{max:27,label:'Severe',color:'#FF3B30'}],cutoff:9},
    gad7: {title:'GAD-7 — Anxiety',instructions:'Over the last 2 weeks, how often have you been bothered by any of the following problems?',questions:['Feeling nervous, anxious, or on edge','Not being able to stop or control worrying','Worrying too much about different things','Trouble relaxing','Being so restless that it is hard to sit still','Becoming easily annoyed or irritable','Feeling afraid as if something awful might happen'],scale:['Not at all (0)','Several days (1)','More than half the days (2)','Nearly every day (3)'],maxScore:21,severity:[{max:4,label:'None/Minimal',color:'#34C759'},{max:9,label:'Mild',color:'#AF52DE'},{max:14,label:'Moderate',color:'#FF9500'},{max:21,label:'Severe',color:'#FF3B30'}],cutoff:8},
    pcptsd5: {title:'PC-PTSD-5 — Trauma Screen',instructions:'In the past month, have you...',questions:['Had nightmares or intrusive thoughts about a traumatic event?','Tried hard not to think about or avoid reminders of the event?','Been constantly on guard, watchful, or easily startled?','Felt numb or detached from people or activities?','Felt guilty or unable to stop blaming yourself or others?'],scale:['No (0)','Yes (1)'],maxScore:5,severity:[{max:2,label:'Low Risk',color:'#34C759'},{max:3,label:'Moderate Risk',color:'#FF9500'},{max:5,label:'High Risk — Probable PTSD',color:'#FF3B30'}],cutoff:3},
    who5: {title:'WHO-5 — Well-Being',instructions:'Over the last 2 weeks...',questions:['I have felt cheerful and in good spirits','I have felt calm and relaxed','I have felt active and vigorous','I woke up feeling fresh and rested','My daily life has been filled with things that interest me'],scale:['At no time (0)','Some of the time (1)','Less than half (2)','More than half (3)','Most of the time (4)','All of the time (5)'],maxScore:25,severity:[{max:12,label:'Likely Depression (<52%)',color:'#FF3B30'},{max:17,label:'Low Well-Being',color:'#FF9500'},{max:20,label:'Moderate',color:'#AF52DE'},{max:25,label:'Good Well-Being',color:'#34C759'}],cutoff:13,note:'Multiply raw score × 4 for percentage'},
    audit: {title:'AUDIT — Alcohol Use',instructions:'Please answer the following questions about your alcohol use...',questions:['How often do you have a drink containing alcohol?','How many standard drinks on a typical day?','How often do you have 6 or more drinks on one occasion?','How often in the last year have you been unable to stop drinking?','How often have you failed to do what was expected due to drinking?','How often have you needed a drink in the morning?','How often have you felt guilt or remorse after drinking?','How often have you been unable to remember due to drinking?','Have you or someone else been injured because of your drinking?','Has anyone expressed concern about your drinking?'],scale:['Never (0)','Less than monthly (1)','Monthly (2)','Weekly (3)','Daily or almost daily (4)'],maxScore:40,severity:[{max:7,label:'Low Risk',color:'#34C759'},{max:14,label:'Hazardous',color:'#FF9500'},{max:19,label:'Harmful',color:'#FF3B30'},{max:40,label:'Possible Dependence',color:'#FF3B30'}],cutoff:8},
    k10: {title:'K10 — Psychological Distress',instructions:'Over the last 4 weeks, how often...',questions:['Did you feel tired out for no good reason?','Did you feel nervous?','Did you feel so nervous that nothing could calm you?','Did you feel hopeless?','Did you feel restless or fidgety?','Did you feel so restless you could not sit still?','Did you feel depressed?','Did you feel that everything was an effort?','Did you feel so sad that nothing could cheer you up?','Did you feel worthless?'],scale:['None of the time (1)','A little (2)','Some of the time (3)','Most of the time (4)','All of the time (5)'],maxScore:50,severity:[{max:19,label:'Low Distress',color:'#34C759'},{max:24,label:'Mild',color:'#AF52DE'},{max:29,label:'Moderate',color:'#FF9500'},{max:50,label:'Severe',color:'#FF3B30'}],cutoff:20},
  },
  getClient(id){ return this.clients.find(c=>c.id===id); },
  getAppts(d){ return this.appointments.filter(a=>!d||a.date===d); },
};
function savePC(){ localStorage.setItem('sr_pettycash',JSON.stringify(Store.pettyCash)); }
function saveRoles(){ localStorage.setItem('sr_roles',JSON.stringify(Store.roles)); }
function saveUsers(){ localStorage.setItem('sr_users',JSON.stringify(Store.users)); }
function getUserRoles(user){ if(!user||!user.roles)return[];return user.roles.map(function(rid){return Store.roles.find(function(r){return r.id===rid;});}).filter(Boolean); }
function hasPermission(userName, perm){ var u=Store.users.find(function(x){return x.name===userName||x.id===userName;});if(!u)return false;var roles=getUserRoles(u);return roles.some(function(r){return r.permissions.includes(perm);}); }

// ── UTILITIES ──
function switchView(vid){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const el=document.getElementById('view-'+vid);
  if(el)el.classList.add('active');
  document.querySelectorAll('.nav-item,.nav-parent').forEach(i=>i.classList.remove('active'));
  document.querySelectorAll('[data-view="'+vid+'"]').forEach(i=>{if(i.matches('.nav-item,.nav-parent'))i.classList.add('active');});
  renderView(vid);
}
function renderView(vid){
  const map={
    dashboard:renderDashboard,calendar:renderCalendar,notes:renderNotes,clients:renderClients,
    invoices:renderInvoices,payments:renderPayments,etims:renderETims,mpesa:renderMpesa,
    consultants:renderConsultants,pettycash:renderPettyCash,'pettycash-auth':renderPettyCashAuth,
    financials:renderFinancials,insurance:renderInsurance,tca:renderTCA,
    'treatment-plans':renderTreatmentPlans,'outcome-measures':renderOutcomes,
    'supportive-data':renderSupportiveData,waitlist:renderWaitlist,reports:renderReports,
    users:renderUsers,settings:renderSettings,audit:renderAudit,help:renderHelp,
    debtors:renderDebtors,creditors:renderCreditors,'psychologist-notes':()=>{Store._filter='psychologist';renderPsychNotes();},
    'psychiatrist-notes':()=>{Store._filter='psychiatrist';renderPsychNotes();},
    'progress-notes':renderProgressNotes,logout:()=>switchView('login'),
    'register-client':renderRegisterClient,'client-detail':renderClientDetail,
    eap:renderEAP,'eap-detail':renderEAPDetail,'eap-new':renderEAPNew,
    trainings:renderTrainings,
  };
  if(map[vid])map[vid]();
}
function showToast(msg,type='info'){
  const colors={success:'#34C759',info:'#4F8CFF',warn:'#FF9500',error:'#FF3B30'};
  const t=document.createElement('div');t.style.cssText='padding:10px 18px;background:var(--surface);border:1px solid var(--border);border-radius:10px;font-size:12px;font-weight:600;box-shadow:var(--shadow-lg);display:flex;align-items:center;gap:8px;animation:fade-up .3s ease-out;margin-bottom:4px';
  t.innerHTML='<span style="width:8px;height:8px;border-radius:50%;background:'+colors[type]+';flex-shrink:0"></span>'+msg;
  const c=document.getElementById('toast-container');c.appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),300);},3000);
}
function showModal(html){ document.getElementById('modal-content').innerHTML=html;document.getElementById('modal-overlay').style.display='flex'; }
function hideModal(){ document.getElementById('modal-overlay').style.display='none'; }
function confirmDialog(title,msg,fn){
  showModal('<div class="panel-hdr"><span class="panel-title">'+title+'</span></div><div class="panel-body"><p style="margin-bottom:16px;font-size:13px">'+msg+'</p><div style="display:flex;gap:8px;justify-content:flex-end"><button onclick="hideModal()" style="padding:8px 18px;border:1px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-family:var(--font);font-size:12px">Cancel</button><button id="confirm-btn" style="padding:8px 18px;background:var(--blue);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font);font-size:12px;font-weight:600">Confirm</button></div></div>');
  document.getElementById('confirm-btn').addEventListener('click',()=>{hideModal();fn();});
}
function login(){ switchView('dashboard');showToast('Signed in as Arthur G.','success'); }

// ── RENDERERS ──
function renderDashboard(){
  const appts=Store.getAppts(Store.currentDate);
  document.querySelector('#view-dashboard .page-hdr .sub').textContent='Monday, 21 July 2026 · '+appts.filter(a=>a.status==='confirmed').length+' confirmed';
}
function renderCalendar(){
  const v=Store._calView||'day';
  if(v==='week')renderCalendarWeek();
  else if(v==='month')renderCalendarMonth();
  else renderCalendarDay();
}
function renderCalendarDay(){
  document.querySelector('#view-calendar .cal-date').textContent=new Date(Store.currentDate+'T00:00').toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
function renderCalendarWeek(){
  var slots=document.querySelector('#view-calendar .cal-slots');if(!slots)return;
  var d=new Date(Store.currentDate+'T00:00');
  var start=new Date(d);start.setDate(d.getDate()-d.getDay()+1);
  var html='<div style="display:grid;grid-template-columns:60px repeat(7,1fr);border-bottom:1px solid var(--border)"><div></div>';
  var dn=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  for(var i=0;i<7;i++){var dt=new Date(start);dt.setDate(start.getDate()+i);var isT=dt.toISOString().slice(0,10)===Store.currentDate;html+='<div style="padding:8px;text-align:center;font-size:11px;font-weight:'+(isT?'700':'500')+';color:'+(isT?'var(--blue)':'var(--text2)')+'">'+dn[i]+'<br>'+dt.getDate()+'</div>';}
  html+='</div><div style="max-height:500px;overflow-y:auto">';
  for(var h=7;h<=18;h++){
    html+='<div style="display:grid;grid-template-columns:60px repeat(7,1fr);border-bottom:1px solid var(--border2);min-height:50px">';
    html+='<div style="padding:8px;font-size:10px;color:var(--text3)">'+String(h).padStart(2,'0')+':00</div>';
    for(var i=0;i<7;i++){var dt=new Date(start);dt.setDate(start.getDate()+i);var ds=dt.toISOString().slice(0,10);var ts=String(h).padStart(2,'0')+':00';var apts=Store.appointments.filter(function(a){return a.date===ds&&a.time===ts;});html+='<div style="padding:2px;border-right:1px solid var(--border2)">'+apts.map(function(a){return '<div style="font-size:9px;padding:2px 4px;border-radius:3px;background:'+(a.room==='A'?'var(--blue2)':'var(--amber2)')+';margin:1px 0;cursor:pointer" data-appt-id="'+a.id+'">'+a.clientName.split(',')[0]+'</div>';}).join('')+'</div>';}
    html+='</div>';
  }
  html+='</div>';slots.innerHTML=html;
}
function renderCalendarMonth(){
  var slots=document.querySelector('#view-calendar .cal-slots');if(!slots)return;
  var d=new Date(Store.currentDate+'T00:00');
  var y=d.getFullYear(),m=d.getMonth();
  var fd=new Date(y,m,1),ld=new Date(y,m+1,0);
  var sd=fd.getDay()||7;
  var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var html='<div style="padding:12px;font-weight:700;font-size:14px;text-align:center">'+months[m]+' '+y+'</div>';
  html+='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;padding:8px">';
  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(function(dn){html+='<div style="padding:4px;text-align:center;font-size:10px;color:var(--text3);font-weight:600">'+dn+'</div>';});
  for(var i=1;i<sd;i++)html+='<div style="min-height:60px;padding:4px;background:var(--bg)"></div>';
  for(var day=1;day<=ld.getDate();day++){
    var ds=y+'-'+String(m+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
    var apts=Store.appointments.filter(function(a){return a.date===ds;});
    var isT=ds===Store.currentDate;
    html+='<div style="min-height:60px;padding:4px;border:1px solid '+(isT?'var(--blue)':'var(--border2)')+';border-radius:4px;background:'+(isT?'var(--blue2)':'var(--surface)')+'"><div style="font-size:11px;font-weight:'+(isT?'700':'500')+'">'+day+'</div>'+apts.map(function(a){return '<div style="font-size:8px;padding:1px 3px;border-radius:2px;background:'+(a.room==='A'?'var(--blue2)':'var(--amber2)')+';margin:1px 0;cursor:pointer;overflow:hidden;white-space:nowrap" data-appt-id="'+a.id+'">'+a.clientName.split(',')[0]+'</div>';}).join('')+'</div>';
  }
  html+='</div>';slots.innerHTML=html;
}
function renderNotes(){
  var tpl=Store.noteTemplate||'Intake';
  // Update chips
  var chips=document.querySelectorAll('#view-notes .tmpl-chip');
  chips.forEach(function(c){c.classList.remove('active');});
  chips.forEach(function(c){if(c.textContent.trim()===tpl+' Note'||c.textContent.trim()===tpl+' Progress')c.classList.add('active');});
  // Render template sections
  var templates={
    'SOAP':[{l:'S',label:'Subjective',ph:'Client\'s reported experience, symptoms, concerns...',val:'Client reports feeling "less overwhelmed this week." Breathing exercises helpful during morning anxiety. Sleeping 6–7 hours (up from 4–5). Continued frustration with workplace dynamics.'},
            {l:'O',label:'Objective',ph:'Clinician\'s observations, mood, affect, appearance...',val:'Well-groomed, appropriate eye contact. Mood euthymic, congruent affect. Speech normal. Thought process linear. PHQ-9: 8 (↓ from 12). GAD-7: 10 (↓ from 14).'},
            {l:'A',label:'Assessment',ph:'Clinical assessment, diagnosis, progress evaluation...',val:'Moderate improvement in depressive symptoms (PHQ-9: 12→8). Anxiety mild improvement (GAD-7: 14→10). CBT techniques effective. Treatment plan remains appropriate.'},
            {l:'P',label:'Plan',ph:'Treatment plan, next steps, homework, follow-up...',val:'1. Continue weekly individual psychotherapy.\n2. Introduce assertiveness training next session.\n3. Practice communication scripts for workplace.\n4. Continue breathing exercises daily.\n5. Next: 28 July 2026, 11:00 AM, Room A.\n6. TCA follow-up: call 24 July.'}],
    'DAP':[{l:'D',label:'Data',ph:'Observable facts, client statements, test results...',val:''},
           {l:'A',label:'Assessment',ph:'Clinical interpretation of the data...',val:''},
           {l:'P',label:'Plan',ph:'Next steps, interventions, follow-up...',val:''}],
    'BIRP':[{l:'B',label:'Behavior',ph:'Observed behavior during session...',val:''},
            {l:'I',label:'Intervention',ph:'Therapeutic interventions used...',val:''},
            {l:'R',label:'Response',ph:'Client response to interventions...',val:''},
            {l:'P',label:'Plan',ph:'Future plan and goals...',val:''}],
    'CBT':[{l:'T',label:'Thoughts',ph:'Automatic thoughts, cognitive distortions...',val:''},
           {l:'F',label:'Feelings',ph:'Emotional responses and intensity...',val:''},
           {l:'B',label:'Behaviors',ph:'Behavioral responses and coping...',val:''},
           {l:'HW',label:'Homework',ph:'Between-session assignments...',val:''}],
    'Intake':[{l:'PI',label:'Presenting Issues',ph:'Reason for seeking treatment...',val:''},
              {l:'Hx',label:'History',ph:'Psychiatric, medical, family, social history...',val:''},
              {l:'MSE',label:'Mental Status Exam',ph:'Appearance, mood, affect, thought process...',val:''},
              {l:'Imp',label:'Impression',ph:'Diagnostic impression and recommendations...',val:''}]
  };
  var sections=templates[tpl]||templates['Intake'];
  var leftCol=document.querySelector('#view-notes .editor-grid > div:first-child');
  if(!leftCol)return;
  var metaHTML=leftCol.querySelector('.note-meta')?leftCol.querySelector('.note-meta').outerHTML:'';
  var sideHTML=leftCol.parentElement.querySelector('.editor-grid > div:last-child')?leftCol.parentElement.querySelector('.editor-grid > div:last-child').outerHTML:'';
  leftCol.innerHTML=metaHTML
    +'<div class="tmpl-row"><button class="tmpl-chip'+(tpl==='Intake'?' active':'')+'">Intake Note</button><button class="tmpl-chip'+(tpl==='SOAP'?' active':'')+'">SOAP Note</button><button class="tmpl-chip'+(tpl==='DAP'?' active':'')+'">DAP Note</button><button class="tmpl-chip'+(tpl==='BIRP'?' active':'')+'">BIRP Note</button><button class="tmpl-chip'+(tpl==='CBT'?' active':'')+'">CBT Progress</button><button class="tmpl-chip supportive-chip">Supportive Data</button></div>'
    +sections.map(function(s){return '<div class="soap-card"><div class="soap-hdr"><span class="soap-lt">'+s.l+'</span> '+s.label+'</div><textarea placeholder="'+s.ph+'">'+s.val+'</textarea></div>';}).join('');
}
function switchNoteTemplate(tpl){
  Store.noteTemplate=tpl.replace(' Note','').replace(' Progress','');
  renderNotes();
}
function renderClients(){
  var c=document.getElementById('client-list-body');if(!c)return;
  c.innerHTML=Store.clients.map(function(cl){return '<div class="apt-row" onclick="showClientDetail(\''+cl.id+'\')"><div class="apt-status '+(cl.status==='active'?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">'+cl.name+'</div><div class="apt-detail">'+cl.id+' · '+cl.phone+' · '+cl.paymentType+'</div></div><span class="apt-room-tag">'+cl.status+'</span></div>';}).join('');
}
function showClientDetail(id){
  var cl=Store.getClient(id);if(!cl)return;
  showModal('<div class="panel-hdr"><span class="panel-title">'+cl.name+'</span><span class="apt-room-tag">'+cl.id+'</span></div><div class="panel-body"><div class="client-grid"><div><div class="fl">Contact</div><div class="fv">'+cl.phone+'</div></div><div><div class="fl">Age / Gender</div><div class="fv">'+cl.age+' · '+cl.gender+'</div></div><div><div class="fl">Payment</div><div class="fv">'+cl.paymentType+(cl.insurance?' · '+cl.insurance:'')+'</div></div><div><div class="fl">Next Appointment</div><div class="fv">'+new Date(cl.nextAppt).toLocaleString()+'</div></div></div><div style="display:flex;gap:8px;margin-top:12px"><button onclick="hideModal();switchView(\'calendar\')" style="padding:8px 16px;background:var(--blue);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font);font-size:12px;font-weight:600">New Appointment</button><button onclick="hideModal();switchView(\'notes\')" style="padding:8px 16px;border:1px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-family:var(--font);font-size:12px">New Note</button></div></div>');
}
function renderInvoices(){
  var c=document.getElementById('invoices-list');if(!c)return;
  c.innerHTML=Store.invoices.map(function(inv){return '<div class="apt-row"><div class="apt-status '+(inv.status==='paid'?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">'+inv.client+' · '+inv.id+'</div><div class="apt-detail">KES '+inv.amount.toLocaleString()+'.00 · '+inv.date+' · ETR: '+(inv.etr||'pending')+'</div></div><span class="tag '+(inv.status==='paid'?'green':'amber')+'">'+inv.status+'</span></div>';}).join('');
}
function renderPayments(){
  var c=document.getElementById('payments-list');if(!c)return;
  c.innerHTML=Store.mpesaLog.map(function(m){return '<div class="apt-row"><div class="apt-status '+(m.matched?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">KES '+m.amount.toLocaleString()+' · '+m.phone+'</div><div class="apt-detail">TransID: '+m.transId+' · Ref: '+m.ref+' · '+m.date+'</div></div><span class="tag '+(m.matched?'green':'amber')+'">'+(m.matched?'Matched':'Unmatched')+'</span></div>';}).join('');
}
function renderETims(){
  var c=document.getElementById('etims-list');if(!c)return;
  c.innerHTML=Store.invoices.filter(function(inv){return inv.etr;}).map(function(inv){return '<div class="apt-row"><div class="apt-status ok"></div><div class="apt-info"><div class="apt-name">'+inv.etr+'</div><div class="apt-detail">Invoice '+inv.id+' · '+inv.client+' · KES '+inv.amount.toLocaleString()+'.00</div></div><span class="tag green">Signed</span></div>';}).join('');
}
function renderMpesa(){
  var c=document.getElementById('mpesa-list');if(!c)return;
  c.innerHTML=Store.mpesaLog.map(function(m){return '<div class="apt-row"><div class="apt-status '+(m.matched?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">'+m.transId+'</div><div class="apt-detail">KES '+m.amount+' · '+m.phone+' · '+m.date+'</div></div><span class="tag '+(m.matched?'green':'amber')+'">'+(m.matched?'Matched':'Unmatched')+'</span></div>';}).join('');
}
function renderConsultants(){
  var c=document.getElementById('consultants-list');if(!c)return;
  c.innerHTML=Store.consultants.map(function(co){return '<div class="apt-row"><div class="apt-status '+(co.status==='paid'?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">'+co.name+' · '+co.service+'</div><div class="apt-detail">KES '+co.amount.toLocaleString()+'.00 · '+co.date+'</div></div><span class="tag '+(co.status==='paid'?'green':'amber')+'">'+co.status+'</span></div>';}).join('');
}
function renderPettyCash(){
  var reqs=Store.pettyCash;
  var s1=document.querySelector('#view-pettycash .grid-2col .panel:first-child .panel-body.zero');
  if(s1)s1.innerHTML=reqs.filter(function(r){return r.step1==='pending'||r.step1==='approved';}).map(function(r){return '<div class="apt-row" onclick="approvePettyCash(\''+r.id+'\')"><div class="apt-status '+(r.step1==='approved'?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">'+r.purpose+'</div><div class="apt-detail">KES '+r.amount.toLocaleString()+'.00 · '+r.requester+' · '+r.date+'</div></div><span class="tag '+(r.step1==='approved'?'green':'amber')+'">'+(r.step1==='approved'?'Approved':'Awaiting')+'</span></div>';}).join('');
  var s2=document.querySelector('#view-pettycash .grid-2col .panel:last-child .panel-body.zero');
  if(s2)s2.innerHTML=reqs.filter(function(r){return r.step1==='approved';}).map(function(r){return '<div class="apt-row" onclick="authorizePettyCash(\''+r.id+'\')"><div class="apt-status '+(r.step2==='approved'?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">'+r.purpose+'</div><div class="apt-detail">KES '+r.amount.toLocaleString()+'.00 · '+r.requester+'</div></div><span class="tag '+(r.step2==='approved'?'green':'amber')+'">'+(r.step2==='approved'?'Disbursed':'Awaiting')+'</span></div>';}).join('');
}
function approvePettyCash(id){
  var r=Store.pettyCash.find(function(p){return p.id===id;});if(!r)return;
  if(r.step1==='approved'){showToast('Already approved','warn');return;}
  confirmDialog('Approve Request','Approve KES '+r.amount.toLocaleString()+' for '+r.purpose+'?',function(){
    r.step1='approved';savePC();renderPettyCash();showToast('Approved — moved to Step 2','success');
    Store.auditLog.unshift({ts:new Date().toISOString().slice(0,16).replace('T',' '),user:'Arthur G.',action:'APPROVE',obj:'Petty Cash '+id,detail:'Step 1 approved'});
  });
}
function authorizePettyCash(id){
  var r=Store.pettyCash.find(function(p){return p.id===id;});if(!r)return;
  if(r.step2==='approved'){showToast('Already disbursed','warn');return;}
  if(r.step1!=='approved'){showToast('Must be approved at Step 1 first','warn');return;}
  confirmDialog('Authorize Disbursement','Authorize KES '+r.amount.toLocaleString()+' for '+r.purpose+'?',function(){
    r.step2='approved';savePC();renderPettyCash();showToast('Authorized — Disbursed','success');
    Store.auditLog.unshift({ts:new Date().toISOString().slice(0,16).replace('T',' '),user:'Ruth',action:'AUTHORIZE',obj:'Petty Cash '+id,detail:'Step 2 approved'});
  });
}
function submitPettyCash(){
  var amt=parseFloat(document.querySelector('#view-pettycash input:not([readonly])')?.value);
  var purp=document.querySelector('#view-pettycash textarea')?.value;
  if(!amt||!purp){showToast('Fill amount and purpose','error');return;}
  var req={id:'PCR-'+String(Store.pettyCash.length+1).padStart(3,'0'),amount:amt,category:'Other',purpose:purp,requester:'Stephanie',date:new Date().toISOString().slice(0,10),step1:'pending',step2:null};
  Store.pettyCash.unshift(req);savePC();renderPettyCash();showToast('Request submitted','success');
}
function renderPettyCashAuth(){
  var c=document.getElementById('auth-list');if(!c)return;
  c.innerHTML=Store.pettyCash.filter(function(r){return r.step1==='approved'&&r.step2!=='approved';}).map(function(r){return '<div class="apt-row" onclick="authorizePettyCash(\''+r.id+'\')"><div class="apt-status wait"></div><div class="apt-info"><div class="apt-name">'+r.purpose+'</div><div class="apt-detail">KES '+r.amount.toLocaleString()+'.00 · '+r.requester+'</div></div><span class="tag amber">Awaiting</span></div>';}).join('');
}
function renderFinancials(){
  var sel=document.querySelector('#view-financials select');if(sel)Store.period=sel.value;
  if(!Store.finTab)Store.finTab='balance-sheet';
  document.querySelectorAll('.nav-kid[data-fin-tab]').forEach(function(n){n.classList.toggle('active',n.getAttribute('data-fin-tab')===Store.finTab);});
  var chips=document.querySelectorAll('#view-financials .tmpl-chip');
  chips.forEach(function(c){c.classList.remove('active');});
  var idx={'balance-sheet':0,'income-statement':1,'general-ledger':2,'trial-balance':3,'payroll':4};
  if(chips[idx[Store.finTab]])chips[idx[Store.finTab]].classList.add('active');
  renderFinContent();
}
function switchFinTab(tab){
  Store.finTab=tab;
  var chips=document.querySelectorAll('#view-financials .tmpl-chip');
  chips.forEach(function(c){c.classList.remove('active');});
  var idx={'balance-sheet':0,'income-statement':1,'general-ledger':2,'trial-balance':3,'payroll':4};
  if(chips[idx[tab]])chips[idx[tab]].classList.add('active');
  document.querySelectorAll('.nav-kid[data-fin-tab]').forEach(function(n){n.classList.toggle('active',n.getAttribute('data-fin-tab')===tab);});
  renderFinContent();
}
function renderFinContent(){
  var tab=Store.finTab||'balance-sheet';
  var map={'balance-sheet':renderBalanceSheet,'income-statement':renderIncomeStatement,'general-ledger':renderGeneralLedger,'trial-balance':renderTrialBalance,'payroll':renderPayroll};
  if(map[tab])map[tab]();
}
function renderBalanceSheet(){
  var c=document.getElementById('fin-content');if(!c)return;
  var outstanding=Store.invoices.filter(function(i){return i.status!=='paid';}).reduce(function(s,i){return s+i.amount;},0);
  var spentPC=Store.pettyCash.filter(function(p){return p.step2==='approved';}).reduce(function(s,p){return s+p.amount;},0);
  var equipment=380000,pettyFloat=15000-spentPC,cash=1245000;
  var totalAssets=cash+outstanding+pettyFloat+equipment;
  var consDue=Store.consultants.filter(function(co){return co.status!=='paid';}).reduce(function(s,co){return s+co.amount;},0);
  var payeNhif=42000,ownersEquity=totalAssets-outstanding-consDue-payeNhif;
  var totalLE=outstanding+consDue+payeNhif+ownersEquity;
  c.innerHTML='<div class="grid-2col"><div class="panel"><div class="panel-hdr"><span class="panel-title">Assets</span><span style="font-size:10px;color:var(--text3)">Jul 2026</span></div><div class="panel-body zero">'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Cash & Bank</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+cash.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Accounts Receivable</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+outstanding.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Petty Cash Float</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+pettyFloat.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Equipment & Furniture</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+equipment.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row" style="border-top:2px solid var(--text);border-bottom:none;font-weight:700;padding-top:14px;margin-top:2px"><div class="apt-info"><div class="apt-name">Total Assets</div></div><div style="font-weight:700;font-size:14px;font-family:var(--font);color:var(--blue)">KES '+totalAssets.toLocaleString()+'.00</div></div>'
    +'</div></div><div class="panel"><div class="panel-hdr"><span class="panel-title">Liabilities & Equity</span><span style="font-size:10px;color:var(--text3)">Jul 2026</span></div><div class="panel-body zero">'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Accounts Payable</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+outstanding.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Consultant Payments Due</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+consDue.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">PAYE / NHIF Payable</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+payeNhif.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Owner\'s Equity</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+ownersEquity.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row" style="border-top:2px solid var(--text);border-bottom:none;font-weight:700;padding-top:14px;margin-top:2px"><div class="apt-info"><div class="apt-name">Total Liabilities & Equity</div></div><div style="font-weight:700;font-size:14px;font-family:var(--font);color:var(--purple)">KES '+totalLE.toLocaleString()+'.00</div></div>'
    +'</div></div></div>'
    +'<div class="grid-2col" style="margin-top:16px"><div class="panel"><div class="panel-hdr"><span class="panel-title">Debtors</span><button class="panel-act" onclick="switchView(\'debtors\')">All →</button></div><div class="panel-body zero">'
    +(Store.invoices.filter(function(i){return i.status!=='paid';}).length?Store.invoices.filter(function(i){return i.status!=='paid';}).map(function(i){return '<div class="apt-row"><div class="apt-info"><div class="apt-name">'+i.client+'</div><div class="apt-detail">'+i.id+' · '+(i.etr||'no ETR')+'</div></div><div style="font-weight:600;font-size:13px;font-family:var(--font);color:var(--red);font-variant-numeric:tabular-nums">KES '+i.amount.toLocaleString()+'</div></div>';}).join(''):'<div style="padding:24px;text-align:center;color:var(--text2);font-size:12px">No outstanding debtors</div>')
    +'</div></div><div class="panel"><div class="panel-hdr"><span class="panel-title">Creditors</span><button class="panel-act" onclick="switchView(\'creditors\')">All →</button></div><div class="panel-body zero">'
    +Store.consultants.map(function(co){return '<div class="apt-row"><div class="apt-info"><div class="apt-name">'+co.name+'</div><div class="apt-detail">'+co.service+' · '+co.date+'</div></div><div style="font-weight:600;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+co.amount.toLocaleString()+'</div></div>';}).join('')
    +'</div></div></div>';
}
function renderIncomeStatement(){
  var c=document.getElementById('fin-content');if(!c)return;
  var rent=85000,utilities=15000,supplies=12300,payeNhif=42000,otherExp=8000;
  var consTotal=Store.consultants.reduce(function(s,co){return s+co.amount;},0);
  var totalExpenses=consTotal+rent+utilities+supplies+payeNhif+otherExp;
  var revenue=100000;var netIncome=revenue-totalExpenses;
  c.innerHTML='<div class="grid-2col"><div class="panel"><div class="panel-hdr"><span class="panel-title">Revenue</span><span style="font-size:10px;color:var(--text3)">Jul 2026</span></div><div class="panel-body zero">'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Individual Psychotherapy</div><div class="apt-detail">12 sessions × KES 3,000</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES 36,000.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Psychiatrist Evaluation</div><div class="apt-detail">5 sessions × KES 5,000</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES 25,000.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Couples Psychotherapy</div><div class="apt-detail">4 sessions × KES 4,000</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES 16,000.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Follow Up Sessions</div><div class="apt-detail">4 sessions × KES 2,000</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES 8,000.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Wellness Training</div><div class="apt-detail">1 workshop × KES 15,000</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES 15,000.00</div></div>'
    +'<div class="apt-row" style="border-top:2px solid var(--text);font-weight:700;padding-top:14px;margin-top:2px"><div class="apt-info"><div class="apt-name">Total Revenue</div></div><div style="font-weight:700;font-size:14px;font-family:var(--font);color:var(--green)">KES '+revenue.toLocaleString()+'.00</div></div>'
    +'</div></div><div class="panel"><div class="panel-hdr"><span class="panel-title">Expenses</span><span style="font-size:10px;color:var(--text3)">Jul 2026</span></div><div class="panel-body zero">'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Consultant Payments</div><div class="apt-detail">Dr. Wanjiku + Dr. Otieno</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+consTotal.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Clinic Rent</div><div class="apt-detail">Nairobi office — Jul 2026</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+rent.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Utilities</div><div class="apt-detail">Electricity, water, internet</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+utilities.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Office Supplies</div><div class="apt-detail">Stationery & consumables</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+supplies.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">PAYE / NHIF / NSSF</div><div class="apt-detail">Statutory deductions</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+payeNhif.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">Other Expenses</div><div class="apt-detail">Transport, welfare, misc.</div></div><div style="font-weight:500;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+otherExp.toLocaleString()+'.00</div></div>'
    +'<div class="apt-row" style="border-top:2px solid var(--text);font-weight:700;padding-top:14px;margin-top:2px"><div class="apt-info"><div class="apt-name">Total Expenses</div></div><div style="font-weight:700;font-size:14px;font-family:var(--font);color:var(--red)">KES '+totalExpenses.toLocaleString()+'.00</div></div>'
    +'</div></div></div>'
    +'<div class="panel" style="margin-top:16px"><div class="panel-hdr"><span class="panel-title">Net Income</span><span style="font-size:10px;color:var(--text3)">Jul 2026</span></div><div class="panel-body" style="text-align:center;padding:24px">'
    +'<div style="font-size:36px;font-weight:800;font-family:var(--font);color:'+(netIncome>=0?'var(--green)':'var(--red)')+'">KES '+netIncome.toLocaleString()+'.00</div>'
    +'<div style="font-size:12px;color:var(--text2);margin-top:4px">'+(netIncome>=0?'Profit':'Loss')+' · Margin: '+Math.round(Math.abs(netIncome)/1000)+'%</div>'
    +'</div></div>';
}
function renderGeneralLedger(){
  var c=document.getElementById('fin-content');if(!c)return;
  var entries=Store.glEntries||[];
  var totalDebit=entries.reduce(function(s,e){return s+e.debit;},0);
  var totalCredit=entries.reduce(function(s,e){return s+e.credit;},0);
  c.innerHTML='<div class="panel"><div class="panel-hdr"><span class="panel-title">General Ledger</span><span style="font-size:10px;color:var(--text3)">Jul 2026 · '+entries.length+' entries</span></div>'
    +'<div class="panel-body zero" style="max-height:480px;overflow-y:auto">'
    +'<div style="display:grid;grid-template-columns:90px 1fr 110px 110px 1fr;gap:0;font-size:11px;font-weight:700;color:var(--text2);padding:10px 12px;border-bottom:1px solid var(--border);background:var(--bg)">'
    +'<div>Date</div><div>Account</div><div style="text-align:right">Debit (KES)</div><div style="text-align:right">Credit (KES)</div><div style="padding-left:12px">Description</div></div>'
    +entries.map(function(e){return '<div style="display:grid;grid-template-columns:90px 1fr 110px 110px 1fr;gap:0;font-size:12px;padding:9px 12px;border-bottom:1px solid var(--border);align-items:center">'
      +'<div style="color:var(--text2)">'+e.date+'</div>'
      +'<div style="font-weight:500">'+e.account+'</div>'
      +'<div style="text-align:right;font-weight:500;font-family:var(--font);font-variant-numeric:tabular-nums">'+(e.debit?e.debit.toLocaleString()+'.00':'—')+'</div>'
      +'<div style="text-align:right;font-weight:500;font-family:var(--font);font-variant-numeric:tabular-nums">'+(e.credit?e.credit.toLocaleString()+'.00':'—')+'</div>'
      +'<div style="color:var(--text2);padding-left:12px;font-size:11px">'+e.desc+'</div>'
    +'</div>';}).join('')
    +'<div style="display:grid;grid-template-columns:90px 1fr 110px 110px 1fr;gap:0;font-size:12px;padding:12px;background:var(--blue2);font-weight:700;border-top:2px solid var(--text)">'
    +'<div></div><div>Totals</div>'
    +'<div style="text-align:right;font-family:var(--font);color:var(--blue)">KES '+totalDebit.toLocaleString()+'.00</div>'
    +'<div style="text-align:right;font-family:var(--font);color:var(--purple)">KES '+totalCredit.toLocaleString()+'.00</div>'
    +'<div style="padding-left:12px;font-size:11px;color:var(--text2)">Balance: KES '+(totalDebit-totalCredit).toLocaleString()+'.00 '+(totalDebit===totalCredit?'✓ Balanced':'')+'</div>'
    +'</div></div></div>';
}
function renderTrialBalance(){
  var c=document.getElementById('fin-content');if(!c)return;
  var entries=Store.glEntries||[];
  var accounts={};
  entries.forEach(function(e){
    if(!accounts[e.account])accounts[e.account]={debit:0,credit:0};
    accounts[e.account].debit+=e.debit;
    accounts[e.account].credit+=e.credit;
  });
  var rows=Object.keys(accounts).map(function(k){return{name:k,debit:accounts[k].debit,credit:accounts[k].credit,net:accounts[k].debit-accounts[k].credit};});
  var totalDebit=rows.reduce(function(s,r){return s+r.debit;},0);
  var totalCredit=rows.reduce(function(s,r){return s+r.credit;},0);
  c.innerHTML='<div class="panel"><div class="panel-hdr"><span class="panel-title">Trial Balance</span><span style="font-size:10px;color:var(--text3)">As at 31 Jul 2026</span></div>'
    +'<div class="panel-body zero">'
    +'<div style="display:grid;grid-template-columns:1fr 120px 120px 120px;gap:0;font-size:11px;font-weight:700;color:var(--text2);padding:10px 12px;border-bottom:1px solid var(--border);background:var(--bg)">'
    +'<div>Account</div><div style="text-align:right">Debit (KES)</div><div style="text-align:right">Credit (KES)</div><div style="text-align:right">Net (KES)</div></div>'
    +rows.map(function(r){return '<div class="apt-row" style="display:grid;grid-template-columns:1fr 120px 120px 120px;gap:0;align-items:center">'
      +'<div class="apt-name" style="font-size:12px">'+r.name+'</div>'
      +'<div style="text-align:right;font-weight:500;font-size:12px;font-family:var(--font);font-variant-numeric:tabular-nums">'+(r.debit?r.debit.toLocaleString()+'.00':'—')+'</div>'
      +'<div style="text-align:right;font-weight:500;font-size:12px;font-family:var(--font);font-variant-numeric:tabular-nums">'+(r.credit?r.credit.toLocaleString()+'.00':'—')+'</div>'
      +'<div style="text-align:right;font-weight:600;font-size:12px;font-family:var(--font);color:'+(r.net>=0?'var(--blue)':'var(--red)')+';font-variant-numeric:tabular-nums">'+r.net.toLocaleString()+'.00 '+(r.net>=0?'Dr':'Cr')+'</div>'
    +'</div>';}).join('')
    +'<div style="display:grid;grid-template-columns:1fr 120px 120px 120px;gap:0;font-size:12px;padding:12px;background:var(--blue2);font-weight:700;border-top:2px solid var(--text)">'
    +'<div>Totals</div>'
    +'<div style="text-align:right;font-family:var(--font);color:var(--blue)">KES '+totalDebit.toLocaleString()+'.00</div>'
    +'<div style="text-align:right;font-family:var(--font);color:var(--purple)">KES '+totalCredit.toLocaleString()+'.00</div>'
    +'<div style="text-align:right;font-family:var(--font);color:'+(totalDebit===totalCredit?'var(--green)':'var(--red)')+'">'+(totalDebit===totalCredit?'✓ Balanced':'⚠ '+Math.abs(totalDebit-totalCredit).toLocaleString()+' off')+'</div>'
    +'</div></div></div>';
}
function renderPayroll(){
  var c=document.getElementById('fin-content');if(!c)return;
  var staff=[
    {name:'Arthur G.',role:'Administrator',gross:120000,nhif:1700,nssf:1080,paye:24800},
    {name:'Stephanie',role:'Admin Assistant',gross:65000,nhif:950,nssf:1080,paye:9800},
    {name:'Ruth',role:'Accountant',gross:85000,nhif:1200,nssf:1080,paye:14800},
    {name:'Dr. Otieno',role:'Clinical Staff',gross:0,nhif:0,nssf:0,paye:0,consultant:true},
    {name:'Dr. Wanjiku',role:'Clinical Staff',gross:0,nhif:0,nssf:0,paye:0,consultant:true},
  ];
  var totalGross=staff.reduce(function(s,st){return s+st.gross;},0);
  var totalNet=totalGross-staff.reduce(function(s,st){return s+st.nhif+st.nssf+st.paye;},0);
  c.innerHTML='<div class="panel"><div class="panel-hdr"><span class="panel-title">Payroll Summary</span><span style="font-size:10px;color:var(--text3)">Jul 2026</span></div>'
    +'<div class="panel-body zero">'
    +'<div style="display:grid;grid-template-columns:1fr 100px 90px 80px 80px 90px;gap:0;font-size:11px;font-weight:700;color:var(--text2);padding:10px 12px;border-bottom:1px solid var(--border);background:var(--bg)">'
    +'<div>Employee</div><div style="text-align:right">Gross Pay</div><div style="text-align:right">NHIF</div><div style="text-align:right">NSSF</div><div style="text-align:right">PAYE</div><div style="text-align:right">Net Pay</div></div>'
    +staff.map(function(st){
      if(st.consultant)return '<div class="apt-row" style="display:grid;grid-template-columns:1fr 100px 90px 80px 80px 90px;gap:0;align-items:center">'
        +'<div><div class="apt-name" style="font-size:12px">'+st.name+'</div><div class="apt-detail">'+st.role+' · Consultant</div></div>'
        +'<div style="text-align:right;font-size:11px;color:var(--text2);grid-column:span 4">Billed separately via consultant payments</div>'
        +'<div style="text-align:right;font-weight:600;font-size:12px">—</div></div>';
      var net=st.gross-st.nhif-st.nssf-st.paye;
      return '<div class="apt-row" style="display:grid;grid-template-columns:1fr 100px 90px 80px 80px 90px;gap:0;align-items:center">'
        +'<div><div class="apt-name" style="font-size:12px">'+st.name+'</div><div class="apt-detail">'+st.role+'</div></div>'
        +'<div style="text-align:right;font-weight:500;font-size:12px;font-family:var(--font);font-variant-numeric:tabular-nums">'+st.gross.toLocaleString()+'.00</div>'
        +'<div style="text-align:right;font-size:12px;font-family:var(--font);font-variant-numeric:tabular-nums;color:var(--text2)">'+st.nhif.toLocaleString()+'.00</div>'
        +'<div style="text-align:right;font-size:12px;font-family:var(--font);font-variant-numeric:tabular-nums;color:var(--text2)">'+st.nssf.toLocaleString()+'.00</div>'
        +'<div style="text-align:right;font-size:12px;font-family:var(--font);font-variant-numeric:tabular-nums;color:var(--text2)">'+st.paye.toLocaleString()+'.00</div>'
        +'<div style="text-align:right;font-weight:600;font-size:12px;font-family:var(--font);color:var(--green);font-variant-numeric:tabular-nums">'+net.toLocaleString()+'.00</div>'
      +'</div>';
    }).join('')
    +'<div style="display:grid;grid-template-columns:1fr 100px 90px 80px 80px 90px;gap:0;font-size:12px;padding:12px;background:var(--blue2);font-weight:700;border-top:2px solid var(--text)">'
    +'<div>Totals (employees only)</div>'
    +'<div style="text-align:right;font-family:var(--font)">KES '+totalGross.toLocaleString()+'.00</div>'
    +'<div style="text-align:right;font-family:var(--font);color:var(--text2)">KES '+staff.reduce(function(s,st){return s+st.nhif;},0).toLocaleString()+'.00</div>'
    +'<div style="text-align:right;font-family:var(--font);color:var(--text2)">KES '+staff.reduce(function(s,st){return s+st.nssf;},0).toLocaleString()+'.00</div>'
    +'<div style="text-align:right;font-family:var(--font);color:var(--text2)">KES '+staff.reduce(function(s,st){return s+st.paye;},0).toLocaleString()+'.00</div>'
    +'<div style="text-align:right;font-family:var(--font);color:var(--green)">KES '+totalNet.toLocaleString()+'.00</div>'
    +'</div></div></div>'
    +'<div class="panel" style="margin-top:16px"><div class="panel-hdr"><span class="panel-title">Statutory Summary</span></div><div class="panel-body zero">'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">PAYE — Pay As You Earn</div><div class="apt-detail">Due to KRA by 9th of following month</div></div><div style="font-weight:600;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+staff.reduce(function(s,st){return s+st.paye;},0).toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">NHIF — National Hospital Insurance Fund</div><div class="apt-detail">Statutory deduction</div></div><div style="font-weight:600;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+staff.reduce(function(s,st){return s+st.nhif;},0).toLocaleString()+'.00</div></div>'
    +'<div class="apt-row"><div class="apt-info"><div class="apt-name">NSSF — National Social Security Fund</div><div class="apt-detail">Standard contribution</div></div><div style="font-weight:600;font-size:13px;font-family:var(--font);font-variant-numeric:tabular-nums">KES '+staff.reduce(function(s,st){return s+st.nssf;},0).toLocaleString()+'.00</div></div>'
    +'<div class="apt-row" style="border-top:2px solid var(--text);font-weight:700"><div class="apt-info"><div class="apt-name">Total Statutory Remittance</div></div><div style="font-weight:700;font-size:14px;font-family:var(--font);color:var(--purple)">KES '+(staff.reduce(function(s,st){return s+st.paye+st.nhif+st.nssf;},0)).toLocaleString()+'.00</div></div>'
    +'</div></div>';
}
function renderInsurance(){
  var c=document.getElementById('insurance-list');if(!c)return;
  c.innerHTML='<div style="padding:40px;text-align:center;color:var(--text2)">Insurance module — LCT biometric integration pending.</div>';
}
function renderTCA(){
  var c=document.getElementById('tca-list');if(!c)return;
  var tcas=[{client:'Mwangi, David',lastContact:'2026-07-14',due:'2026-07-21',status:'today'},{client:'Omondi, James',lastContact:'2026-07-09',due:'2026-07-16',status:'overdue'},{client:'Akinyi, Susan',lastContact:'2026-07-14',due:'2026-07-21',status:'today'},{client:'Wanjiku, Faith',lastContact:'2026-07-07',due:'2026-07-14',status:'overdue'},{client:'Nasir, Amina',lastContact:'2026-07-14',due:'2026-07-24',status:'upcoming'}];
  c.innerHTML=tcas.map(function(t){return '<div class="apt-row"><div class="apt-status '+(t.status==='overdue'?'wait':t.status==='today'?'now':'ok')+'"></div><div class="apt-info"><div class="apt-name">'+t.client+'</div><div class="apt-detail">Last: '+t.lastContact+' · Due: '+t.due+'</div></div><span class="tag '+(t.status==='overdue'?'amber':t.status==='today'?'amber':'green')+'">'+t.status+'</span></div>';}).join('');
}
function renderTreatmentPlans(){
  var c=document.getElementById('tp-list');if(!c)return;
  c.innerHTML='<div style="padding:40px;text-align:center;color:var(--text2)">Treatment plans — SMART goals with objectives and interventions.<br><button onclick="showToast(\'Treatment plan form coming soon\',\'info\')" style="margin-top:12px;padding:8px 20px;background:var(--blue);color:#fff;border:none;border-radius:20px;cursor:pointer;font-family:var(--font);font-size:12px;font-weight:600">+ New Plan</button></div>';
}
function renderOutcomes(){
  var c=document.getElementById('outcome-list');if(!c)return;
  c.innerHTML='<div style="padding:40px;text-align:center;color:var(--text2)">Outcome Measures — PHQ-9 · GAD-7 · PCL-5 · WHO-5<br><button onclick="showToast(\'Assessment form coming soon\',\'info\')" style="margin-top:12px;padding:8px 20px;background:var(--blue);color:#fff;border:none;border-radius:20px;cursor:pointer;font-family:var(--font);font-size:12px;font-weight:600">+ New Assessment</button></div>';
}
function renderWaitlist(){
  var c=document.getElementById('waitlist-list');if(!c)return;
  c.innerHTML='<div style="padding:40px;text-align:center;color:var(--text2)">Waitlist — clients waiting for appointments.<br><button onclick="showToast(\'Add to waitlist coming soon\',\'info\')" style="margin-top:12px;padding:8px 20px;background:var(--blue);color:#fff;border:none;border-radius:20px;cursor:pointer;font-family:var(--font);font-size:12px;font-weight:600">+ Add to Waitlist</button></div>';
}
function renderReports(){
  var k=document.getElementById('reports-kpi');if(!k)return;
  k.innerHTML='<div class="kpi-card"><div class="kpi-icon blue">◐</div><div class="kpi-val">KES 412K</div><div class="kpi-lbl">Monthly Revenue</div><div class="kpi-sub up">↑ 8% vs last month</div></div><div class="kpi-card"><div class="kpi-icon green">◷</div><div class="kpi-val">187</div><div class="kpi-lbl">Monthly Sessions</div><div class="kpi-sub up">↑ 12 vs last month</div></div><div class="kpi-card"><div class="kpi-icon purple">◫</div><div class="kpi-val">82%</div><div class="kpi-lbl">Room Utilization</div><div class="kpi-sub up">Room A: 88% · Room B: 76%</div></div><div class="kpi-card"><div class="kpi-icon amber">↻</div><div class="kpi-val">91%</div><div class="kpi-lbl">TCA Retention</div><div class="kpi-sub up">↑ 3%</div></div>';
  var ch=document.getElementById('reports-charts');if(!ch)return;
  ch.innerHTML='<div class="panel"><div class="panel-hdr"><span class="panel-title">Revenue by Service</span></div><div class="panel-body zero" style="padding:16px"><div class="apt-row"><div class="apt-info"><div class="apt-name">Individual Psychotherapy</div></div><div style="font-weight:600">KES 198,000</div></div><div class="apt-row"><div class="apt-info"><div class="apt-name">Psychiatrist Evaluation</div></div><div style="font-weight:600">KES 85,000</div></div></div></div><div class="panel"><div class="panel-hdr"><span class="panel-title">Session Volume</span></div><div class="panel-body zero" style="padding:16px"><div class="apt-row"><div class="apt-info"><div class="apt-name">Dr. Otieno</div></div><div style="font-weight:600">102 sessions</div></div><div class="apt-row"><div class="apt-info"><div class="apt-name">Dr. Wanjiku</div></div><div style="font-weight:600">85 sessions</div></div></div></div>';
}
function renderUsers(){
  var c=document.getElementById('users-list');if(!c)return;
  c.innerHTML=Store.users.map(function(u){
    var roleNames=getUserRoles(u).map(function(r){return r.name;}).join(', ')||'No roles';
    return '<div class="apt-row" style="cursor:pointer" onclick="showUserForm(\''+u.id+'\')"><div class="apt-status '+(u.status==='active'?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">'+u.name+'</div><div class="apt-detail">'+roleNames+' · Last: '+u.lastLogin+'</div></div><span class="apt-room-tag">'+u.status+'</span></div>';
  }).join('');
  renderRoles();
}
function renderRoles(){
  var c=document.getElementById('roles-list');if(!c)return;
  c.innerHTML=Store.roles.map(function(r){return '<div class="apt-row" style="cursor:pointer" onclick="openRoleEditor(\''+r.id+'\')"><div class="apt-status ok"></div><div class="apt-info"><div class="apt-name">'+r.name+'</div><div class="apt-detail">'+r.permissions.length+' permissions</div></div><span class="apt-room-tag">'+(r.id==='admin'?'Default':'Custom')+'</span></div>';}).join('');
}
function openRoleEditor(rid){
  var r=Store.roles.find(function(x){return x.id===rid;});if(!r)return;
  var html='<div class="page-hdr"><div><h1>Edit Role</h1><p class="sub">'+r.name+' · <span id="role-perm-count">'+r.permissions.length+'</span> permissions</p></div><div style="display:flex;gap:8px"><button class="panel-act" style="font-size:12px;font-weight:600;padding:8px 16px;border:1px solid var(--border);border-radius:20px;cursor:pointer;background:var(--surface);font-family:var(--font)" onclick="switchView(\'users\')">← Back</button><button class="panel-act" style="font-size:13px;font-weight:600;padding:9px 20px;background:var(--blue);color:#fff;border-radius:20px;cursor:pointer;border:none;font-family:var(--font)" onclick="saveRole(\''+rid+'\')">Save Role</button></div></div>';
  Store.allPermissions.forEach(function(g,i){
    html+='<div class="panel"><div class="panel-hdr"><span class="panel-title">'+g.group+'</span><span style="font-size:10px;color:var(--blue);cursor:pointer;font-weight:600;margin-left:8px" onclick="togglePermGroup('+i+',true)">Select All</span><span style="font-size:10px;color:var(--text3);margin:0 4px">|</span><span style="font-size:10px;color:var(--text3);cursor:pointer;font-weight:500" onclick="togglePermGroup('+i+',false)">Deselect</span></div><div class="panel-body" style="display:flex;flex-wrap:wrap;gap:6px" data-perm-group="'+i+'">';
    g.perms.forEach(function(p){
      var ck=r.permissions.includes(p);
      html+='<label style="display:flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid '+(ck?'var(--blue)':'var(--border)')+';border-radius:20px;cursor:pointer;font-size:11px;font-weight:500;background:'+(ck?'var(--blue2)':'var(--surface)')+';color:'+(ck?'var(--blue)':'var(--text2)')+'" data-perm="'+p+'"><input type="checkbox" value="'+p+'" '+(ck?'checked':'')+' style="display:none" onchange="updatePermLabel(this)">'+p.replace(/_/g,' ')+'</label>';
    });
    html+='</div></div>';
  });
  document.getElementById('role-editor-content').innerHTML=html;
  switchView('role-editor');
}
function togglePermGroup(gi,on){
  var panel=document.querySelector('[data-perm-group="'+gi+'"]');if(!panel)return;
  panel.querySelectorAll('input[type="checkbox"]').forEach(function(cb){
    cb.checked=on;updatePermLabel(cb);
  });
}
function updatePermLabel(cb){
  var lb=cb.parentElement;if(!lb)return;
  lb.style.borderColor=cb.checked?'var(--blue)':'var(--border)';
  lb.style.background=cb.checked?'var(--blue2)':'var(--surface)';
  lb.style.color=cb.checked?'var(--blue)':'var(--text2)';
}
function saveRole(rid){
  var r=Store.roles.find(function(x){return x.id===rid;});if(!r)return;
  r.permissions=Array.from(document.querySelectorAll('#role-editor-content input[type="checkbox"]:checked')).map(function(c){return c.value;});
  saveRoles();showToast('Role "'+r.name+'" saved — '+r.permissions.length+' permissions','success');switchView('users');
}
function renderSettings(){
  var c=document.getElementById('settings-form');if(!c)return;
  c.innerHTML='<div class="fl" style="margin-bottom:4px">Clinic Name</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);margin-bottom:12px;outline:none" value="Sereniminds Wellness Clinic"><div class="fl" style="margin-bottom:4px">Phone</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);margin-bottom:12px;outline:none" value="+254 700 000 000"><div class="fl" style="margin-bottom:4px">eTIMS BHF ID</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);margin-bottom:12px;outline:none" value="••••••••" type="password"><div class="fl" style="margin-bottom:4px">M-PESA PayBill</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);margin-bottom:16px;outline:none" value="123456"><button onclick="showToast(\'Settings saved\',\'success\')" style="padding:10px 24px;background:var(--blue);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font);font-size:13px;font-weight:600">Save Changes</button><button onclick="localStorage.clear();location.reload()" style="padding:10px 24px;border:1px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-family:var(--font);font-size:13px;margin-left:8px">Reset Demo Data</button>';
}
function renderAudit(){
  var c=document.getElementById('audit-list');if(!c)return;
  c.innerHTML=Store.auditLog.map(function(a){return '<div class="apt-row"><div class="apt-info"><div class="apt-name">'+a.user+' · '+a.action+' · '+a.obj+'</div><div class="apt-detail">'+a.ts+' · '+a.detail+'</div></div></div>';}).join('');
}
function renderHelp(){
  var c=document.getElementById('help-content');if(!c)return;
  c.innerHTML='<div class="panel"><div class="panel-hdr"><span class="panel-title">FAQs</span></div><div class="panel-body"><div class="apt-row"><div class="apt-info"><div class="apt-name">How do I book?</div><div class="apt-detail">Calendar → + New Appointment, or use ⌘2.</div></div></div><div class="apt-row"><div class="apt-info"><div class="apt-name">Petty cash process?</div><div class="apt-detail">Request → Step 1 Arthur → Step 2 Ruth → Disbursed.</div></div></div></div></div><div class="panel"><div class="panel-hdr"><span class="panel-title">Contact</span></div><div class="panel-body"><p style="font-size:13px">Email: support@sereniminds.co.ke<br>Phone: +254 700 000 000<br>Developer: Henry</p></div></div>';
}
function renderSupportiveData(){
  var c=document.getElementById('supportive-list');if(!c)return;
  c.innerHTML=Store.supportiveData.length?Store.supportiveData.map(function(s){return '<div class="apt-row"><div class="apt-status ok"></div><div class="apt-info"><div class="apt-name">'+s.title+'</div><div class="apt-detail">'+s.clientName+' · '+s.clinician+' · '+s.date+' · '+s.docType.replace(/_/g,' ')+' · '+(s.fileSize/1000).toFixed(0)+'KB</div></div><div style="display:flex;gap:6px"><span class="apt-room-tag">'+s.docType.replace(/_/g,' ')+'</span><button onclick="downloadDoc(\''+s.id+'\')" style="padding:4px 10px;border:1px solid var(--blue);border-radius:12px;background:transparent;color:var(--blue);cursor:pointer;font-family:var(--font);font-size:10px;font-weight:600">↓ Download</button></div></div>';}).join(''):'<div style="padding:40px;text-align:center;color:var(--text2)"><div style="font-size:32px;margin-bottom:8px">☁</div>No documents yet.<br>Click "Upload Document" to add.</div>';
}
function addSupportiveData(){
  var p=document.getElementById('supportive-upload-panel');p.style.display=p.style.display==='none'?'block':'none';
}
function submitSupportiveData(){
  var title=document.getElementById('sd-title')?.value;if(!title){showToast('Enter a title','error');return;}
  Store.supportiveData.unshift({id:'SD-'+String(Store.supportiveData.length+1).padStart(3,'0'),clientId:'SRN-0042',clientName:'Mwangi, David',clinician:'Dr. Otieno',title:title,docType:document.getElementById('sd-type')?.value||'other',note:document.getElementById('sd-note')?.value||'',fileName:'uploaded.pdf',fileSize:0,date:new Date().toISOString().slice(0,10),downloadable:true});
  renderSupportiveData();document.getElementById('supportive-upload-panel').style.display='none';
  showToast('Document uploaded','success');
}
function downloadDoc(id){var d=Store.supportiveData.find(function(x){return x.id===id;});if(d)showToast('Download: '+d.fileName,'info');}
function renderDebtors(){
  var c=document.getElementById('debtors-list');if(!c)return;
  var debtors=Store.invoices.filter(function(i){return i.status!=='paid';});
  c.innerHTML=debtors.length?debtors.map(function(d){return '<div class="apt-row"><div class="apt-status wait"></div><div class="apt-info"><div class="apt-name">'+d.client+'</div><div class="apt-detail">'+d.id+' · '+(new Date('2026-07-21')-new Date(d.date))/(86400000)+' days</div></div><div style="font-weight:600;font-size:13px;color:var(--red)">KES '+d.amount.toLocaleString()+'</div></div>';}).join(''):'<div style="padding:40px;text-align:center;color:var(--text2)">No outstanding debts</div>';
}
function renderCreditors(){
  var c=document.getElementById('creditors-list');if(!c)return;
  c.innerHTML=Store.consultants.map(function(co){return '<div class="apt-row"><div class="apt-status wait"></div><div class="apt-info"><div class="apt-name">'+co.name+'</div><div class="apt-detail">'+co.service+' · '+co.date+'</div></div><div style="font-weight:600;font-size:13px">KES '+co.amount.toLocaleString()+'</div></div>';}).join('');
}
function renderPsychNotes(){
  var filter=Store._filter||'psychologist';
  var listId=filter==='psychiatrist'?'psychiatrist-notes-list':'psych-notes-list';
  var barId=filter==='psychiatrist'?'psychiatrist-notes-bar':'psych-notes-bar';
  var c=document.getElementById(listId);if(!c)return;
  var notes=Store.clinicalNotes.filter(function(n){return n.type===filter;});
  var signed=notes.filter(function(n){return n.signed;}).length;
  var bar=document.getElementById(barId);if(bar)bar.innerHTML='<span style="font-weight:600">'+notes.length+' notes</span><span style="color:var(--green);margin-left:12px">'+signed+' signed</span>'+(notes.length-signed>0?'<span style="color:var(--amber);margin-left:12px">'+(notes.length-signed)+' pending</span>':'');
  c.innerHTML=notes.length?notes.map(function(n){return '<div class="apt-row"><div class="apt-status '+(n.signed?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">'+n.clientName+(n.signed?'':' <span style="color:var(--amber);font-size:10px">Draft</span>')+'</div><div class="apt-detail">'+n.date+' · '+(n.content.S||'').substring(0,50)+'...</div></div></div>';}).join(''):'<div style="text-align:center;padding:60px 40px"><div style="font-size:48px;margin-bottom:12px">📝</div><div style="font-weight:700;font-size:16px;margin-bottom:6px">No '+filter+' notes</div><div style="font-size:13px;color:var(--text2)">Clinical notes will appear here once documented.</div></div>';
}
function renderProgressNotes(){
  var c=document.getElementById('progress-notes-list');if(!c)return;
  c.innerHTML=Store.clinicalNotes.map(function(n){return '<div class="apt-row"><div class="apt-status ok"></div><div class="apt-info"><div class="apt-name">'+n.clientName+'</div><div class="apt-detail">'+n.date+' · '+(n.content.S||'').substring(0,60)+'...</div></div></div>';}).join('');
}
function renderRegisterClient(){
  var c=document.getElementById('register-form-content');if(!c)return;
  c.innerHTML='<div class="grid-2col" style="gap:14px"><div><div class="fl">First Name *</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" placeholder="e.g. David"></div><div><div class="fl">Last Name *</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" placeholder="e.g. Mwangi"></div></div><div class="grid-2col" style="gap:14px"><div><div class="fl">Nationality</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" value="Kenyan"></div><div><div class="fl">ID Type</div><select style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px"><option>National ID</option><option>Passport</option><option>Alien ID</option></select></div></div><div class="grid-2col" style="gap:14px"><div><div class="fl">ID Number</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" placeholder="e.g. 12345678"></div><div><div class="fl">Phone Primary *</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" placeholder="+254 7XX XXX XXX"></div></div><div class="fl">Address</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" placeholder="Street, City, County"><div class="grid-2col" style="gap:14px"><div><div class="fl">Emergency Contact Name</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" placeholder="e.g. Mary Mwangi"></div><div><div class="fl">Relationship</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" placeholder="e.g. Spouse"></div></div><div class="grid-2col" style="gap:14px"><div><div class="fl">Emergency Phone</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px" placeholder="+254 7XX XXX XXX"></div><div><div class="fl">Preferred Clinician Gender</div><select style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px"><option>No Preference</option><option>Male</option><option>Female</option></select></div></div><div class="grid-2col" style="gap:14px"><div><div class="fl">Insurance Provider</div><select style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px"><option>Self-pay</option><option>NHIF</option><option>Apex Insurance</option><option>Jubilee</option><option>CIC</option></select></div><div><div class="fl">Insurance Member ID</div><input style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;margin-bottom:10px"></div></div><div class="fl">Reason for Visit *</div><textarea style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:var(--font);outline:none;resize:vertical;min-height:60px;margin-bottom:14px" placeholder="Describe the reason for the visit..."></textarea><button onclick="showToast(\'Client registered successfully\',\'success\')" style="padding:10px 28px;background:var(--blue);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font);font-size:13px;font-weight:600">Register Client</button>';
}

// ── EVENT HANDLERS ──
document.addEventListener('click',function(e){
  // Petty cash submit
  if(e.target.closest('#view-pettycash button')&&e.target.textContent.includes('Submit Request')){e.preventDefault();submitPettyCash();}
  // Panel action buttons
  if(e.target.matches('.panel-act')){
    var t=e.target.textContent;
    if(t.includes('Full Profile'))switchView('clients');
    else if(t.includes('View All')||t.includes('All →'))switchView('calendar');
    else if(t.includes('Ledger'))switchView('financials');
    else if(t.includes('Sign & Lock'))confirmDialog('Sign Note','Lock this note as signed?',function(){showToast('Note signed','success');});
    else if(t.includes('Manage Consent'))showToast('Consent management','info');
    else if(t.includes('+ New Appointment'))showToast('Booking form','info');
  }
  // Chips
  var chip=e.target.closest('.chip');if(chip){
    chip.parentElement.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active');});
    chip.classList.add('active');
    if(chip.textContent.includes('Psychologist')){Store._filter='psychologist';renderPsychNotes();}
    else if(chip.textContent.includes('Psychiatrist')){Store._filter='psychiatrist';renderPsychNotes();}
    else if(chip.textContent.includes('TCA'))switchView('tca');
  }
  // Template chips
  var tc=e.target.closest('.tmpl-chip');if(tc){
    if(tc.classList.contains('supportive-chip')){switchView('supportive-data');return;}
    var tabMap={'Balance Sheet':'balance-sheet','Income Statement':'income-statement','General Ledger':'general-ledger','Trial Balance':'trial-balance','Payroll Reports':'payroll'};
    var tab=tabMap[tc.textContent.trim()];
    if(tab){switchFinTab(tab);return;}
    var noteTemplates={'SOAP Note':1,'DAP Note':1,'BIRP Note':1,'CBT Progress':1,'Intake Note':1};
    if(noteTemplates[tc.textContent.trim()]){switchNoteTemplate(tc.textContent.trim());return;}
    tc.parentElement.querySelectorAll('.tmpl-chip').forEach(function(c){c.classList.remove('active');});tc.classList.add('active');showToast('Switched to '+tc.textContent.trim(),'info');
  }
  // DSM-5 code toggle
  var dx=e.target.closest('.dx-row');if(dx){dx.classList.toggle('sel');showToast(dx.classList.contains('sel')?'Diagnosis added':'Diagnosis removed','info');}
  // Appointment detail (dashboard rows)
  var row=e.target.closest('#view-dashboard .apt-row');if(row){
    var name=row.querySelector('.apt-name')?.textContent;
    var apt=Store.appointments.find(function(a){return a.clientName===name;});
    if(apt)showModal('<div class="panel-hdr"><span class="panel-title">'+apt.clientName+'</span><span class="tag '+(apt.status==='in_progress'?'green':'green')+'">'+apt.status+'</span></div><div class="panel-body"><div class="client-grid"><div><div class="fl">Type</div><div class="fv">'+apt.type+'</div></div><div><div class="fl">Clinician</div><div class="fv">'+apt.clinician+'</div></div><div><div class="fl">Room</div><div class="fv">Room '+apt.room+'</div></div><div><div class="fl">Time</div><div class="fv">'+apt.time+' ('+apt.duration+' min)</div></div></div><button onclick="hideModal()" style="margin-top:12px;padding:8px 16px;border:1px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-family:var(--font);font-size:12px">Close</button></div>');
  }
  // Calendar block click
  var block=e.target.closest('.cal-block');if(block){
    var name=block.querySelector('.cb-n')?.textContent;
    var apt=Store.appointments.find(function(a){return a.clientName===name;});
    if(apt)showModal('<div class="panel-hdr"><span class="panel-title">'+apt.clientName+'</span><span class="tag '+(apt.conflict?'amber':'green')+'">'+(apt.conflict?'Conflict':'Confirmed')+'</span></div><div class="panel-body"><div class="client-grid"><div><div class="fl">Type</div><div class="fv">'+apt.type+'</div></div><div><div class="fl">Clinician</div><div class="fv">'+apt.clinician+'</div></div><div><div class="fl">Room</div><div class="fv">Room '+apt.room+'</div></div><div><div class="fl">Time</div><div class="fv">'+apt.time+' · '+apt.duration+' min</div></div></div><button onclick="hideModal()" style="margin-top:12px;padding:8px 16px;border:1px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-family:var(--font);font-size:12px">Close</button></div>');
  }
  // Calendar week/month appt click
  var da=e.target.closest('[data-appt-id]');if(da){
    var aid=da.getAttribute('data-appt-id');
    var apt=Store.appointments.find(function(x){return x.id===aid;});if(!apt)return;
    showModal('<div class="panel-hdr"><span class="panel-title">'+apt.clientName+'</span><span class="tag '+(apt.conflict?'amber':'green')+'">'+apt.status+'</span></div><div class="panel-body"><div class="client-grid"><div><div class="fl">Type</div><div class="fv">'+apt.type+'</div></div><div><div class="fl">Clinician</div><div class="fv">'+apt.clinician+'</div></div><div><div class="fl">Room</div><div class="fv">Room '+apt.room+'</div></div><div><div class="fl">Time</div><div class="fv">'+apt.time+' · '+apt.duration+' min</div></div></div><button onclick="hideModal()" style="margin-top:12px;padding:8px 16px;border:1px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-family:var(--font);font-size:12px">Close</button></div>');
  }
});
// Calendar navigation
document.addEventListener('click',function(e){
  var btn=e.target.closest('#view-calendar .cal-nav button');
  if(!btn)return;
  var d=new Date(Store.currentDate+'T00:00');
  if(btn.textContent.includes('←'))d.setDate(d.getDate()-1);
  else d.setDate(d.getDate()+1);
  Store.currentDate=d.toISOString().slice(0,10);renderCalendar();
});
// Calendar tab switch
document.addEventListener('click',function(e){
  var tab=e.target.closest('[data-cal-tab]');if(!tab)return;
  tab.parentElement.querySelectorAll('.view-tab').forEach(function(t){t.classList.remove('active');});
  tab.classList.add('active');
  Store._calView=tab.getAttribute('data-cal-tab');renderCalendar();
});
// DSM-5 search
document.addEventListener('input',function(e){
  if(!e.target.matches('.side-srch'))return;
  var q=e.target.value.toLowerCase();
  var panel=e.target.closest('.side-box');if(!panel)return;
  panel.querySelectorAll('.dx-row').forEach(function(r){
    var text=(r.textContent||'').toLowerCase();
    r.style.display=text.includes(q)?'':'none';
  });
});
// Search bar
var searchTimeout;
document.querySelector('.srch input').addEventListener('input',function(){
  clearTimeout(searchTimeout);
  var q=this.value.toLowerCase().trim();
  if(!q){document.getElementById('search-results').style.display='none';return;}
  searchTimeout=setTimeout(function(){
    var results=[];
    Store.clients.filter(function(c){return c.name.toLowerCase().includes(q)||c.id.toLowerCase().includes(q);}).slice(0,3).forEach(function(c){results.push({text:c.name+' · '+c.id,type:'Client',view:'clients'});});
    var sr=document.getElementById('search-results');
    sr.innerHTML=results.length?results.map(function(r){return '<div style="padding:10px 14px;cursor:pointer;font-size:12px;border-bottom:1px solid var(--border2)" onclick="switchView(\''+r.view+'\');document.getElementById(\'search-results\').style.display=\'none\'">'+r.text+'</div>';}).join(''):'<div style="padding:14px;font-size:12px;color:var(--text2)">No results</div>';
    sr.style.display='block';
  },300);
});
document.addEventListener('click',function(e){if(!e.target.closest('.srch')&&!e.target.closest('#search-results'))document.getElementById('search-results').style.display='none';});
// Financials period
document.addEventListener('change',function(e){if(e.target.matches('#view-financials select')){Store.period=e.target.value;showToast('Period: '+e.target.value,'info');}});

// ── THEME + SIDEBAR + KEYBOARD ──
var html=document.documentElement;
document.getElementById('themeToggle').addEventListener('click',function(){
  var n=html.getAttribute('data-theme')==='light'?'dark':'light';
  html.setAttribute('data-theme',n);
});
document.querySelectorAll('.nav-item[data-view]').forEach(function(el){el.addEventListener('click',function(e){e.preventDefault();switchView(el.getAttribute('data-view'));});});
document.querySelectorAll('.nav-kid[data-view]').forEach(function(el){el.addEventListener('click',function(e){e.preventDefault();var ft=el.getAttribute('data-fin-tab');if(ft)Store.finTab=ft;switchView(el.getAttribute('data-view'));var par=el.closest('.nav-parent');if(par)par.classList.add('open');});});
document.querySelectorAll('.nav-parent[data-view]').forEach(function(el){el.addEventListener('click',function(e){if(e.target.closest('.nav-kid'))return;e.preventDefault();switchView(el.getAttribute('data-view'));el.classList.toggle('open');});});
document.querySelectorAll('.nav-parent:not([data-view])').forEach(function(p){p.addEventListener('click',function(){p.classList.toggle('open');});});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){hideModal();document.getElementById('search-results').style.display='none';}
  if(!e.metaKey&&!e.ctrlKey)return;
  e.preventDefault();
  if(e.key==='1')switchView('dashboard');if(e.key==='2')switchView('calendar');
  if(e.key==='3')switchView('notes');if(e.key==='4')switchView('pettycash');
  if(e.key==='5')switchView('financials');if(e.key==='k')document.querySelector('.srch input').focus();
});

// ── TOUR ──
var TOUR_STEPS=[
  {title:'Welcome',desc:'A 2-minute tour of Sereniminds Wellness Clinic Management System.',target:null,icon:'👋'},
  {title:'Dashboard KPIs',desc:'Track total clients, today\'s appointments, weekly notes, and pending follow-ups.',target:'.kpi-strip',view:'dashboard'},
  {title:'Client Overview',desc:'Every client has a journey timeline. The glowing dot shows their current position.',target:'#view-dashboard .grid-asym .panel:first-child',view:'dashboard'},
  {title:'Appointments',desc:'Real-time session tracking across Room A and Room B.',target:'#view-dashboard .grid-asym .panel:last-child',view:'dashboard'},
  {title:'Sidebar',desc:'29 navigation items across clinical, billing, finance, and admin. Use ⌘1-5 for quick access.',target:'.sidebar',view:'dashboard'},
  {title:'Calendar',desc:'Schedule across both rooms. 60-min slots + 15-min buffers. Color-coded blocks.',target:'#view-calendar .panel',view:'calendar'},
  {title:'Clinical Notes',desc:'SOAP/DAP/BIRP notes with DSM-5 diagnoses. Shared by case with consent controls.',target:'#view-notes .editor-grid',view:'notes'},
  {title:'Supportive Clinical Data',desc:'Upload referrals, lab results, imaging. Downloadable. Fully paperless.',target:'#view-supportive-data .panel:last-child',view:'supportive-data'},
  {title:'Petty Cash',desc:'Two-step approval: Request → Payment Order → Authorization → Disbursed.',target:'#view-pettycash .grid-2col',view:'pettycash'},
  {title:'Financials',desc:'Balance Sheet, Income Statement, GL, Trial Balance, Payroll. Filter by period.',target:'#view-financials .grid-2col:first-of-type',view:'financials'},
  {title:'Roles',desc:'Create custom roles with granular permissions across 14 groups.',target:'#view-users .grid-2col',view:'users'},
  {title:'Client Registration',desc:'Paperless intake: nationality, ID, emergency contacts, preferred clinician gender.',target:'#view-register-client .panel',view:'register-client'},
  {title:'Ready!',desc:'⌘K to search, ⌘1-5 for views, Esc to close. The system is ready.',target:null,icon:'🚀'}
];
var tourStep=-1,tourActive=false;
function startTour(){tourActive=true;tourStep=-1;localStorage.setItem('sr_tour_done','true');document.getElementById('tour-welcome')?.remove();nextTourStep();}
function nextTourStep(){
  tourStep++;if(tourStep>=TOUR_STEPS.length){endTour();return;}
  var step=TOUR_STEPS[tourStep];
  if(step.view)switchView(step.view);
  setTimeout(function(){renderTourStep(step);},step.view?400:100);
}
function prevTourStep(){if(tourStep<=0)return;tourStep-=2;nextTourStep();}
function endTour(){tourActive=false;document.querySelectorAll('.tour-highlight,.tour-tooltip,.tour-overlay').forEach(function(e){e.remove();});switchView('dashboard');}
function renderTourStep(step){
  document.querySelectorAll('.tour-highlight,.tour-tooltip,.tour-overlay').forEach(function(e){e.remove();});
  var overlay=document.createElement('div');overlay.className='tour-overlay';document.body.appendChild(overlay);
  if(step.icon&&!step.target){
    var w=document.createElement('div');w.className='tour-welcome';
    w.innerHTML=step.tourStep===undefined?'<div class="tw-icon">'+step.icon+'</div><div class="tw-title">'+step.title+'</div><div class="tw-desc">'+step.desc+'</div><div style="display:flex;gap:8px;justify-content:center"><button class="tour-btn secondary" onclick="endTour()">Skip</button><button class="tour-btn primary" onclick="startTour()">Start Tour →</button></div>':'<div class="tw-icon">'+step.icon+'</div><div class="tw-title">'+step.title+'</div><div class="tw-desc">'+step.desc+'</div><div style="display:flex;gap:8px;justify-content:center"><button class="tour-btn primary" onclick="endTour()">Finish</button></div>';
    document.body.appendChild(w);return;
  }
  var targetEl=step.target?document.querySelector(step.target):null;
  if(targetEl){
    var rect=targetEl.getBoundingClientRect();
    var hl=document.createElement('div');hl.className='tour-highlight tour-pulse';
    hl.style.cssText='left:'+(rect.left-4)+'px;top:'+(rect.top-4)+'px;width:'+(rect.width+8)+'px;height:'+(rect.height+8)+'px';
    document.body.appendChild(hl);
  }
  var tip=document.createElement('div');tip.className='tour-tooltip';
  var tr=targetEl?targetEl.getBoundingClientRect():{top:100,left:window.innerWidth/2,width:0,height:0};
  var top=tr.bottom+12,left=Math.max(20,Math.min(tr.left+tr.width/2-180,window.innerWidth-380));
  if(top+200>window.innerHeight){top=tr.top-220;if(top<20)top=window.innerHeight/2-100;}
  tip.style.cssText='top:'+top+'px;left:'+left+'px';
  var dots='';for(var i=0;i<TOUR_STEPS.length;i++)dots+='<div class="tour-dot'+(i===tourStep?' active':'')+'"></div>';
  var isLast=tourStep>=TOUR_STEPS.length-1;
  tip.innerHTML='<div class="tour-step">Step '+(tourStep+1)+' of '+(TOUR_STEPS.length-2)+'</div><div class="tour-dots">'+dots+'</div><div class="tour-title">'+step.title+'</div><div class="tour-desc">'+step.desc+'</div><div class="tour-btns">'+(tourStep>1?'<button class="tour-btn secondary" onclick="prevTourStep()">← Previous</button>':'')+'<button class="tour-btn primary" onclick="nextTourStep()">'+(isLast?'Finish':'Next →')+'</button><button class="tour-skip" onclick="endTour()" style="margin-left:auto">Skip</button></div>';
  document.body.appendChild(tip);
}
function checkTourWelcome(){
  if(localStorage.getItem('sr_tour_done'))return;
  setTimeout(function(){
    var w=document.createElement('div');w.className='tour-welcome';w.id='tour-welcome';
    w.innerHTML='<div class="tw-icon">👋</div><div class="tw-title">Welcome to Sereniminds</div><div class="tw-desc">A complete clinic management system. 2-minute tour?</div><div style="display:flex;gap:8px;justify-content:center"><button class="tour-btn secondary" onclick="document.getElementById(\'tour-welcome\').remove();localStorage.setItem(\'sr_tour_done\',\'true\')">Skip</button><button class="tour-btn primary" onclick="startTour()">Start Tour →</button></div>';
    document.body.appendChild(w);
  },800);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded',function(){
  checkTourWelcome();
  renderClients();renderInvoices();renderPayments();renderETims();renderMpesa();
  renderConsultants();renderPettyCashAuth();renderInsurance();renderTCA();
  renderReports();renderUsers();renderSettings();renderAudit();renderHelp();
  renderProgressNotes();renderSupportiveData();renderDebtors();renderCreditors();
});

// ═══ Missing form stubs (ponytail: toast until forms are restored) ═══
function renderClientList(q){var c=document.getElementById('client-list-body');if(!c)return;var clients=q?Store.clients.filter(function(x){return x.name.toLowerCase().includes(q.toLowerCase())||x.id.toLowerCase().includes(q.toLowerCase())||x.phone.includes(q);}):Store.clients;c.innerHTML=clients.map(function(cl){return '<div class="apt-row" onclick="showClientDetail(\''+cl.id+'\')"><div class="apt-status '+(cl.status==='active'?'ok':'wait')+'"></div><div class="apt-info"><div class="apt-name">'+cl.name+'</div><div class="apt-detail">'+cl.id+' · '+cl.phone+' · '+cl.paymentType+'</div></div><span class="apt-room-tag">'+cl.status+'</span></div>';}).join('');}
function showClientRegistrationForm(){showToast('Client registration form — coming soon','info');}
function showInvoiceForm(){showToast('Invoice form — coming soon','info');}
function showTCAForm(){showToast('TCA form — coming soon','info');}
function showWaitlistForm(){showToast('Waitlist form — coming soon','info');}
function showConsultantPaymentForm(){showToast('Consultant payment form — coming soon','info');}
function showRoleForm(){
  var h='<div class="form-modal"><div class="panel-hdr"><span class="panel-title">Create New Role</span></div><div class="panel-body">';
  h+='<div style="margin-bottom:12px"><div class="fld-lbl">Role Name <span style="color:var(--red)">*</span></div><input id="f_role_name" class="fld-inp" placeholder="e.g. Receptionist"></div>';
  h+='<div style="margin-bottom:16px"><div class="fld-lbl">Clone Permissions From</div><select id="f_role_clone" class="fld-inp fld-sel"><option value="">— Start Empty —</option>'+Store.roles.map(function(r){return '<option value="'+r.id+'">'+r.name+' ('+r.permissions.length+' perms)</option>';}).join('')+'</select></div>';
  h+='<div style="display:flex;gap:8px;justify-content:flex-end"><button onclick="hideModal()" style="padding:10px 20px;border:1px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-family:var(--font);font-size:13px">Cancel</button>';
  h+='<button data-submit="role-create" style="padding:10px 28px;background:var(--blue);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font);font-size:13px;font-weight:600">Create Role</button></div></div></div>';
  showModal(h);
}
document.addEventListener('click',function(e){
  var btn=e.target.closest('[data-submit="role-create"]');if(!btn)return;e.preventDefault();
  var name=document.getElementById('f_role_name')?.value.trim();if(!name){showToast('Enter a role name','error');return;}
  var cloneId=document.getElementById('f_role_clone')?.value;
  var clone=Store.roles.find(function(r){return r.id===cloneId;});
  var perms=clone?clone.permissions.slice():['dashboard.view'];
  var id=name.toLowerCase().replace(/\\s+/g,'-').replace(/[^a-z0-9-]/g,'');
  Store.roles.push({id:id,name:name,permissions:perms});
  saveRoles();renderRoles();hideModal();
  showToast('Role "'+name+'" created — opening editor','success');
  setTimeout(function(){openRoleEditor(id);},300);
});

function showUserForm(uid){
  var isEdit=!!uid;var u=uid?Store.users.find(function(x){return x.id===uid;}):null;
  var h='<div class="form-modal"><div class="panel-hdr"><span class="panel-title">'+(isEdit?'Edit User: '+u.name:'Add New User')+'</span></div><div class="panel-body">';
  h+='<div class="fld-grid"><div class="fld"><label class="fld-lbl">Full Name <span style="color:var(--red)">*</span></label><input id="f_uname" class="fld-inp" value="'+(u?u.name:'')+'" placeholder="e.g. Dr. Kamau"></div>';
  h+='<div class="fld"><label class="fld-lbl">Email <span style="color:var(--red)">*</span></label><input id="f_uemail" class="fld-inp" type="email" value="'+(u?u.email||'':'')+'" placeholder="user@sereniminds.co.ke"></div>';
  h+='<div class="fld"><label class="fld-lbl">Status</label><select id="f_ustatus" class="fld-inp fld-sel"><option value="active"'+(u&&u.status==='active'?' selected':'')+'>Active</option><option value="inactive"'+(u&&u.status==='inactive'?' selected':'')+'>Inactive</option></select></div>';
  if(!isEdit)h+='<div class="fld"><label class="fld-lbl">Password</label><input id="f_upass" class="fld-inp" type="password" placeholder="Temporary password"></div>';
  h+='</div><div class="fld-section">Role Assignment</div><div style="display:flex;flex-wrap:wrap;gap:6px" id="user-role-checks">';
  var userRoles=u?u.roles||[]:[];
  Store.roles.forEach(function(r){
    var checked=userRoles.includes(r.id);
    h+='<label style="display:flex;align-items:center;gap:6px;padding:6px 14px;border:1px solid '+(checked?'var(--blue)':'var(--border)')+';border-radius:20px;cursor:pointer;font-size:12px;font-weight:500;background:'+(checked?'var(--blue2)':'var(--surface)')+';color:'+(checked?'var(--blue)':'var(--text2)')+'"><input type="checkbox" value="'+r.id+'" '+(checked?'checked':'')+' style="display:none" onchange="var p=this.parentElement;p.style.borderColor=this.checked?\'var(--blue)\':\'var(--border)\';p.style.background=this.checked?\'var(--blue2)\':\'var(--surface)\';p.style.color=this.checked?\'var(--blue)\':\'var(--text2)\'">'+r.name+' ('+r.permissions.length+' perms)</label>';
  });
  h+='</div><div style="display:flex;gap:8px;margin-top:16px;justify-content:flex-end"><button onclick="hideModal()" style="padding:10px 20px;border:1px solid var(--border);border-radius:8px;background:var(--surface);cursor:pointer;font-family:var(--font);font-size:13px">Cancel</button>';
  h+='<button data-submit="user-save" style="padding:10px 28px;background:var(--blue);color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:var(--font);font-size:13px;font-weight:600">'+(isEdit?'Save Changes':'Create User')+'</button></div></div></div>';
  if(isEdit){_editingUId=uid;}else{_editingUId=null;}
  showModal(h);
}
var _editingUId=null;
document.addEventListener('click',function(e){
  var btn=e.target.closest('[data-submit="user-save"]');if(!btn)return;e.preventDefault();
  var name=document.getElementById('f_uname')?.value.trim();if(!name){showToast('Enter a name','error');return;}
  var email=document.getElementById('f_uemail')?.value.trim();if(!email){showToast('Enter an email','error');return;}
  var status=document.getElementById('f_ustatus')?.value||'active';
  var roles=Array.from(document.querySelectorAll('#user-role-checks input[type="checkbox"]:checked')).map(function(c){return c.value;});
  if(!roles.length){showToast('Assign at least one role','error');return;}
  if(_editingUId){
    var u=Store.users.find(function(x){return x.id===_editingUId;});if(!u)return;
    u.name=name;u.email=email;u.status=status;u.roles=roles;showToast('User updated','success');
  }else{
    Store.users.push({id:'U-'+String(Store.users.length+1).padStart(3,'0'),name:name,email:email,roles:roles,status:status,lastLogin:'Never'});
    showToast('User created','success');
  }
  _editingUId=null;saveUsers();hideModal();renderUsers();
});
function showServiceTypeForm(){showToast('Service type form — coming soon','info');}
function showRoomForm(){showToast('Room form — coming soon','info');}
function showNoteTemplateForm(){showToast('Note template form — coming soon','info');}
function showTreatmentPlanForm(){showToast('Treatment plan form — coming soon','info');}
function showOutcomeMeasureForm(){renderAssessmentForm();}
function showAppointmentForm(){showToast('Appointment form — coming soon','info');}
function showPaymentForm(){showToast('Payment form — coming soon','info');}
function showConsentForm(){showToast('Consent form — coming soon','info');}
// ═══ EAP RENDERERS ═══
function renderEAP(){
  var orgs=Store.eapOrgs; var active=orgs.filter(function(o){return o.isActive;}).length;
  var totalEmp=orgs.reduce(function(s,o){return s+o.employeeCount;},0);
  var totalSessions=orgs.reduce(function(s,o){return s+o.sessionsThisMonth;},0);
  // Update KPIs
  var kpiStrip=document.querySelector('#view-eap .kpi-strip');
  if(kpiStrip) kpiStrip.innerHTML=
    '<div class="kpi-card"><div class="kpi-icon blue">⬡</div><div class="kpi-val">'+orgs.length+'</div><div class="kpi-lbl">Total Organizations</div><div class="kpi-sub up">All registered</div></div>'+
    '<div class="kpi-card"><div class="kpi-icon green">◉</div><div class="kpi-val">'+active+'</div><div class="kpi-lbl">Active Contracts</div><div class="kpi-sub up">'+(orgs.length-active)+' inactive</div></div>'+
    '<div class="kpi-card"><div class="kpi-icon purple">●</div><div class="kpi-val">'+totalEmp+'+</div><div class="kpi-lbl">Employees Covered</div><div class="kpi-sub up">Across '+orgs.length+' orgs</div></div>'+
    '<div class="kpi-card"><div class="kpi-icon amber">◷</div><div class="kpi-val">'+totalSessions+'</div><div class="kpi-lbl">Sessions This Month</div><div class="kpi-sub up">All orgs</div></div>';
  // Render org cards
  var grid=document.querySelector('#view-eap .org-grid');
  if(!grid)return;
  var colors=[['#4F8CFF','#AF52DE'],['#34C759','#4F8CFF'],['#FF9500','#FF3B30']];
  grid.innerHTML=orgs.map(function(o,i){
    var initials=o.name.split(' ').map(function(w){return w[0];}).join('').substring(0,2);
    var bg='background:linear-gradient(135deg,'+colors[i%3][0]+','+colors[i%3][1]+')';
    var badge=o.billingModel==='per_session'?'<span class="tag green">Per Session</span>':o.billingModel==='retainer'?'<span class="tag neutral">Retainer</span>':'<span class="tag" style="background:var(--blue2);color:var(--blue)">Pro Bono</span>';
    var statClass=o.isActive?'active':'inactive';
    var statLabel=o.isActive?'Active Contract':'Inactive';
    var inactiveClass=o.isActive?'':' inactive';
    return '<div class="org-card'+inactiveClass+'" onclick="renderEAPDetail(\''+o.id+'\')">'+
      '<div class="org-logo" style="'+bg+'">'+initials+'</div>'+
      '<div class="org-name">'+o.name+'</div>'+
      '<div class="org-sub"><span class="org-stat '+statClass+'"></span>'+statLabel+' · Since '+o.contractStart+'</div>'+
      '<div class="org-detail">'+
        '<div class="org-dr"><span class="lbl">Contact</span><span class="val">'+o.contactPerson+'</span></div>'+
        '<div class="org-dr"><span class="lbl">Phone</span><span class="val">'+o.contactPhone+'</span></div>'+
        '<div class="org-dr"><span class="lbl">Email</span><span class="val">'+o.contactEmail+'</span></div>'+
        '<div class="org-dr"><span class="lbl">Contract</span><span class="val">'+o.contractStart+' — '+o.contractEnd+'</span></div>'+
      '</div>'+
      '<div class="org-footer">'+badge+
        '<div style="text-align:right"><div style="font-size:15px;font-weight:700">'+o.employeeCount+'</div><div style="font-size:10px;color:var(--text2)">employees</div></div>'+
      '</div>'+
      '<div style="font-size:10px;color:var(--text3);margin-top:8px;text-align:right">'+o.sessionsThisMonth+' sessions this month</div>'+
    '</div>';
  }).join('');
  // Update header count
  var hdr=document.querySelector('#view-eap .panel-hdr span:last-child');
  if(hdr) hdr.textContent=orgs.length+' registered';
  // Wire Add Organization button
  var addBtn=document.querySelector('#view-eap .page-hdr button');
  if(addBtn) addBtn.onclick=function(){switchView('eap-new');};
}
function renderEAPDetail(orgId){
  var o=Store.eapOrgs.find(function(x){return x.id===orgId;}); if(!o)return;
  var employees=Store.eapEmployees.filter(function(e){return e.orgId===orgId;});
  var sessions=Store.eapSessions.filter(function(s){return s.orgId===orgId;});
  var initials=o.name.split(' ').map(function(w){return w[0];}).join('').substring(0,2);
  var badge=o.billingModel==='per_session'?'Per Session':o.billingModel==='retainer'?'Retainer':'Pro Bono';
  var badgeColor=o.billingModel==='per_session'?'green':o.billingModel==='retainer'?'neutral':'blue';
  var badgeStyle=badgeColor==='blue'?'style="background:var(--blue2);color:var(--blue)"':'';
  // Build HTML for detail view
  var html='<div class="content"><div class="page-hdr anim-up"><div style="display:flex;align-items:center;gap:12px">'+
    '<div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#4F8CFF,#AF52DE);display:grid;place-items:center;font-weight:700;font-size:16px;color:#fff">'+initials+'</div>'+
    '<div><h1>'+o.name+'</h1><p class="sub">'+badge+' · '+(o.isActive?'Active':'Inactive')+' · '+o.contractStart+' — '+o.contractEnd+'</p></div></div>'+
    '<div style="display:flex;gap:8px"><button class="panel-act" style="font-size:12px;font-weight:600;padding:8px 16px;border:1px solid var(--border);border-radius:20px;cursor:pointer;background:var(--surface);font-family:var(--font)" onclick="switchView(\'eap\')">← Back</button></div></div>'+
    // Tabs
    '<div class="chips" style="margin-bottom:16px">'+
      '<span class="chip active" onclick="switchEAPTab(\'overview\',this,\''+orgId+'\')">Overview</span>'+
      '<span class="chip" onclick="switchEAPTab(\'employees\',this,\''+orgId+'\')">Employees ('+employees.length+')</span>'+
      '<span class="chip" onclick="switchEAPTab(\'sessions\',this,\''+orgId+'\')">Sessions ('+sessions.length+')</span>'+
    '</div>'+
    '<div id="eap-tab-content"></div></div>';
  var detailEl=document.getElementById('view-eap-detail');
  detailEl.innerHTML=html; detailEl.style.display='';
  switchView('eap-detail');
  renderEAPTabOverview(orgId);
}
function switchEAPTab(tab,el,orgId){
  el.parentElement.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active');});
  el.classList.add('active');
  if(tab==='overview') renderEAPTabOverview(orgId);
  else if(tab==='employees') renderEAPTabEmployees(orgId);
  else if(tab==='sessions') renderEAPTabSessions(orgId);
}
function renderEAPTabOverview(orgId){
  var o=Store.eapOrgs.find(function(x){return x.id===orgId;}); if(!o)return;
  var c=document.getElementById('eap-tab-content'); if(!c)return;
  c.innerHTML=
    '<div class="panel"><div class="panel-hdr"><span class="panel-title">Contact Information</span></div><div class="panel-body">'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:13px">'+
        '<div><span class="fl">Contact Person</span><div style="font-weight:600">'+o.contactPerson+'</div></div>'+
        '<div><span class="fl">Phone</span><div style="font-weight:600">'+o.contactPhone+'</div></div>'+
        '<div><span class="fl">Email</span><div style="font-weight:600">'+o.contactEmail+'</div></div>'+
        '<div><span class="fl">Billing Model</span><div style="font-weight:600">'+o.billingModel.replace(/_/g,' ')+'</div></div>'+
      '</div></div></div>'+
    '<div class="panel"><div class="panel-hdr"><span class="panel-title">Contract Notes</span></div><div class="panel-body"><p style="font-size:13px;color:var(--text2)">'+(o.notes||'No notes.')+'</p></div></div>'+
    '<div class="panel"><div class="panel-hdr"><span class="panel-title">Quick Stats</span></div><div class="panel-body">'+
      '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;text-align:center">'+
        '<div><div style="font-size:28px;font-weight:700;color:var(--blue)">'+o.employeeCount+'</div><div style="font-size:11px;color:var(--text2)">Employees</div></div>'+
        '<div><div style="font-size:28px;font-weight:700;color:var(--green)">'+o.sessionsThisMonth+'</div><div style="font-size:11px;color:var(--text2)">Sessions/Month</div></div>'+
        '<div><div style="font-size:28px;font-weight:700;color:var(--purple)">'+(o.isActive?'Active':'Inactive')+'</div><div style="font-size:11px;color:var(--text2)">Status</div></div>'+
        '<div><div style="font-size:28px;font-weight:700;color:var(--amber)">'+o.billingModel.replace(/_/g,' ')+'</div><div style="font-size:11px;color:var(--text2)">Billing</div></div>'+
      '</div></div></div>';
}
function renderEAPTabEmployees(orgId){
  var employees=Store.eapEmployees.filter(function(e){return e.orgId===orgId;});
  var c=document.getElementById('eap-tab-content'); if(!c)return;
  c.innerHTML=
    '<div class="panel"><div class="panel-hdr"><span class="panel-title">Employee Roster</span><span style="font-size:11px;color:var(--text2)">'+employees.length+' employees</span></div>'+
    '<div class="panel-body zero"><table style="width:100%;border-collapse:collapse;font-size:12px">'+
      '<thead><tr style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;background:var(--bg)">'+
        '<th style="padding:10px 16px;text-align:left;font-weight:600">Name</th><th style="padding:10px 16px;text-align:left;font-weight:600">Department</th><th style="padding:10px 16px;text-align:left;font-weight:600">Employee ID</th><th style="padding:10px 16px;text-align:center;font-weight:600">Status</th><th style="padding:10px 16px;text-align:center;font-weight:600">Notes</th></tr></thead>'+
      '<tbody>'+employees.map(function(e){return '<tr style="border-bottom:1px solid var(--border2)"><td style="padding:10px 16px;font-weight:600">'+e.name+'</td><td style="padding:10px 16px;color:var(--text2)">'+e.department+'</td><td style="padding:10px 16px;color:var(--text2);font-family:monospace">'+e.employeeId+'</td><td style="padding:10px 16px;text-align:center"><span class="tag '+(e.isActive?'green':'')+'" style="'+(e.isActive?'':'background:var(--blue2);color:var(--text3)')+'">'+(e.isActive?'Active':'Inactive')+'</span></td><td style="padding:10px 16px;text-align:center"><button style="padding:4px 10px;border:1px solid var(--border);border-radius:6px;background:transparent;cursor:pointer;font-size:10px;color:var(--text2);font-family:var(--font)" onclick="addEAPEmployeeNote(\''+e.id+'\')">+ Note</button></td></tr>';}).join('')+'</tbody>'+
    '</table></div></div>';
}
function renderEAPTabSessions(orgId){
  var sessions=Store.eapSessions.filter(function(s){return s.orgId===orgId;});
  var c=document.getElementById('eap-tab-content'); if(!c)return;
  c.innerHTML=
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">'+
      '<span style="font-size:12px;color:var(--text2)">'+sessions.length+' sessions</span>'+
      '<button onclick="showEAPSessionForm(\''+orgId+'\')" style="padding:8px 18px;background:var(--blue);color:#fff;border:none;border-radius:20px;font-weight:600;font-size:12px;cursor:pointer;font-family:var(--font)">+ New Session</button>'+
    '</div>'+
    '<div id="eap-session-form" style="display:none"></div>'+
    sessions.map(function(s){return '<div class="panel" style="margin-bottom:8px"><div class="panel-hdr"><span class="panel-title">'+s.date+' · '+s.location.replace(/_/g,' ')+' · '+s.clinician+'</span><span class="tag '+(s.status==='completed'?'green':'amber')+'">'+s.status+'</span></div><div class="panel-body"><p style="font-size:12px;color:var(--text2);margin-bottom:8px">'+s.notes+'</p>'+
      '<div style="font-size:11px;color:var(--text3);font-weight:600;margin-bottom:6px">Employee Notes:</div>'+
      s.employeeNotes.map(function(en){var emp=Store.eapEmployees.find(function(e){return e.id===en.employeeId;});var name=emp?emp.name:'Unknown';return '<div style="padding:8px 12px;background:var(--bg);border-radius:8px;margin-bottom:4px;font-size:11px"><strong>'+name+'</strong>: '+en.note+(en.followUp?' <span style="color:var(--amber);font-weight:600">⚠ Follow-up: '+en.followUpDate+'</span>':'')+'</div>';}).join('')+
    '</div></div>';}).join('');
}
function showEAPSessionForm(orgId){
  var employees=Store.eapEmployees.filter(function(e){return e.orgId===orgId;});
  var c=document.getElementById('eap-session-form'); if(!c)return;
  c.style.display='block';
  c.innerHTML='<div class="panel"><div class="panel-hdr"><span class="panel-title">New EAP Session</span><button class="panel-act" onclick="document.getElementById(\'eap-session-form\').style.display=\'none\'">Cancel</button></div><div class="panel-body">'+
    '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px">'+
      '<div><div class="fl" style="margin-bottom:4px">Date</div><input id="es-date" type="date" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:var(--font)" value="'+new Date().toISOString().slice(0,10)+'"></div>'+
      '<div><div class="fl" style="margin-bottom:4px">Location</div><select id="es-loc" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:var(--font)"><option>on_site</option><option>clinic</option><option>virtual</option></select></div>'+
      '<div><div class="fl" style="margin-bottom:4px">Clinician</div><select id="es-clinician" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:var(--font)"><option>Dr. Otieno</option><option>Dr. Wanjiku</option></select></div>'+
    '</div>'+
    '<div style="margin-bottom:8px"><div class="fl" style="margin-bottom:4px">Session Notes</div><textarea id="es-notes" style="width:100%;padding:8px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:var(--font);resize:vertical;min-height:50px" placeholder="Session-level notes..."></textarea></div>'+
    '<div style="margin-bottom:8px"><div class="fl" style="margin-bottom:4px">Employees Seen</div>'+
    employees.map(function(e){return '<label style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:12px;cursor:pointer"><input type="checkbox" class="es-emp" value="'+e.id+'"> '+e.name+' ('+e.department+')<input type="text" class="es-emp-note" data-emp="'+e.id+'" placeholder="Note for '+e.name.split(' ')[0]+'..." style="flex:1;padding:4px 8px;border:1px solid var(--border);border-radius:6px;font-size:11px;font-family:var(--font);margin-left:8px"></label>';}).join('')+
    '</div>'+
    '<button onclick="saveEAPSession(\''+orgId+'\')" style="padding:8px 20px;background:var(--blue);color:#fff;border:none;border-radius:20px;font-weight:600;font-size:12px;cursor:pointer;font-family:var(--font)">Save Session</button>'+
  '</div></div>';
}
function saveEAPSession(orgId){
  var date=document.getElementById('es-date')?.value; if(!date){showToast('Select a date','warn');return;}
  var loc=document.getElementById('es-loc')?.value||'clinic';
  var clinician=document.getElementById('es-clinician')?.value||'Dr. Otieno';
  var notes=document.getElementById('es-notes')?.value||'';
  var empNotes=[];
  document.querySelectorAll('.es-emp:checked').forEach(function(cb){var empId=cb.value;var noteInput=document.querySelector('.es-emp-note[data-emp="'+empId+'"]');empNotes.push({employeeId:empId,note:noteInput?.value||'No note recorded.',followUp:false});});
  if(!empNotes.length){showToast('Select at least one employee','warn');return;}
  var session={id:'ES-'+String(Store.eapSessions.length+1).padStart(3,'0'),orgId:orgId,date:date,location:loc,clinician:clinician,status:'completed',notes:notes,employeeNotes:empNotes};
  Store.eapSessions.unshift(session);
  var org=Store.eapOrgs.find(function(o){return o.id===orgId;}); if(org) org.sessionsThisMonth++;
  document.getElementById('eap-session-form').style.display='none';
  renderEAPTabSessions(orgId);showToast('Session saved with '+empNotes.length+' employee notes','success');
}
function addEAPEmployeeNote(empId){
  var note=prompt('Add note for employee:'); if(!note)return;
  showToast('Note added for employee','success');
}
function renderEAPNew(){
  // form is already in static HTML at view-eap-new — just make sure it's visible via switchView
  // Wire the Save button
  var saveBtn=document.querySelector('#view-eap-new button');
  if(saveBtn && saveBtn.textContent.includes('Save Organization')){
    saveBtn.onclick=submitEAPOrg;
  }
}
function submitEAPOrg(){
  var inputs=document.querySelectorAll('#view-eap-new input, #view-eap-new select, #view-eap-new textarea');
  var name=inputs[0]?.value; if(!name){showToast('Organization name required','warn');return;}
  var org={
    id:'EAP-'+String(Store.eapOrgs.length+1).padStart(3,'0'),
    name:name, contactPerson:inputs[1]?.value||'', contactPhone:inputs[2]?.value||'',
    contactEmail:inputs[3]?.value||'', billingModel:inputs[4]?.value||'per_session',
    contractStart:inputs[5]?.value||new Date().toISOString().slice(0,10), contractEnd:'',
    isActive:true, notes:inputs[6]?.value||'', employeeCount:0, sessionsThisMonth:0
  };
  Store.eapOrgs.push(org);
  showToast('Organization "'+org.name+'" added','success');
  switchView('eap');
}
// ═══ TRAININGS RENDERERS ═══
function renderTrainings(){
  var trainings=Store.trainings;
  var paid=trainings.filter(function(t){return t.paymentStatus==='paid';});
  var probono=trainings.filter(function(t){return t.paymentStatus==='pro_bono';});
  var pending=trainings.filter(function(t){return t.paymentStatus==='pending';});
  var totalPaid=paid.reduce(function(s,t){return s+(t.amount||0);},0);
  var totalPending=pending.reduce(function(s,t){return s+(t.amount||0);},0);
  // Update KPIs
  var kpiStrip=document.querySelector('#view-trainings .kpi-strip');
  if(kpiStrip) kpiStrip.innerHTML=
    '<div class="kpi-card"><div class="kpi-icon blue">📋</div><div class="kpi-val">'+trainings.length+'</div><div class="kpi-lbl">Total Trainings</div><div class="kpi-sub up">This financial year</div></div>'+
    '<div class="kpi-card"><div class="kpi-icon green">◎</div><div class="kpi-val">KES '+totalPaid.toLocaleString()+'</div><div class="kpi-lbl">Paid</div><div class="kpi-sub up">'+paid.length+' paid trainings</div></div>'+
    '<div class="kpi-card"><div class="kpi-icon purple">◉</div><div class="kpi-val">'+probono.length+'</div><div class="kpi-lbl">Pro Bono</div><div class="kpi-sub up">Free community programs</div></div>'+
    '<div class="kpi-card"><div class="kpi-icon amber">⊡</div><div class="kpi-val">KES '+totalPending.toLocaleString()+'</div><div class="kpi-lbl">Pending Payment</div><div class="kpi-sub warn">'+pending.length+' unpaid training'+(pending.length!==1?'s':'')+'</div></div>';
  // Render table
  var tbody=document.querySelector('#trainings-table tbody');
  if(!tbody)return;
  renderTrainingsTable(trainings);
  // Update count
  var hdrSpan=document.querySelector('#view-trainings .panel-hdr span:last-child');
  if(hdrSpan) hdrSpan.textContent=trainings.length+' records';
}
function renderTrainingsTable(trainings){
  var tbody=document.querySelector('#trainings-table tbody'); if(!tbody)return;
  tbody.innerHTML=trainings.map(function(t){
    var statusBadge=t.paymentStatus==='paid'?'<span class="tag green">Paid</span>':t.paymentStatus==='pro_bono'?'<span class="tag" style="background:var(--blue2);color:var(--blue)">Pro Bono</span>':'<span class="tag amber">Pending</span>';
    var amount=t.amount?'KES '+t.amount.toLocaleString():'<span style="color:var(--text3)">—</span>';
    return '<tr class="train-row" style="border-bottom:1px solid var(--border2)" onclick="toggleTrainingDetail(this)">'+
      '<td style="padding:11px 16px;font-weight:600">'+t.title+'</td>'+
      '<td style="padding:11px 16px;color:var(--text2)">'+t.organization+'</td>'+
      '<td style="padding:11px 16px;color:var(--text2)">'+t.date+'</td>'+
      '<td style="padding:11px 16px">'+t.facilitator+'</td>'+
      '<td style="padding:11px 16px;text-align:center">'+t.attendees+'</td>'+
      '<td style="padding:11px 16px">'+statusBadge+'</td>'+
      '<td style="padding:11px 16px;text-align:right;font-weight:600;font-variant-numeric:tabular-nums">'+amount+'</td>'+
      '<td style="padding:11px 16px;color:var(--text3);max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(t.notes||'—').substring(0,40)+'...</td>'+
      '<td style="padding:11px 16px;text-align:center"><button style="padding:4px 10px;border:1px solid var(--border);border-radius:6px;background:transparent;cursor:pointer;font-size:10px;color:var(--text2);font-family:var(--font)" onclick="event.stopPropagation();editTraining(\''+t.id+'\')">Edit</button></td>'+
    '</tr>'+
    '<tr class="train-detail" style="border-bottom:1px solid var(--border2)"><td colspan="9" style="padding:6px 16px 14px 52px"><div style="font-size:10px;color:var(--text3);font-style:italic">'+(t.notes||'No notes.')+'</div></td></tr>';
  }).join('');
}
function showNewTrainingForm(){
  var panel=document.getElementById('training-form-panel'); if(!panel)return;
  panel.style.display='block'; panel.scrollIntoView({behavior:'smooth'});
  document.getElementById('training-form-title').textContent='New Training';
  // Clear form
  ['tf-title','tf-org','tf-amount','tf-notes'].forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});
  var attendeesEl=document.getElementById('tf-attendees');if(attendeesEl)attendeesEl.value='25';
  var dateEl=document.getElementById('tf-date');if(dateEl)dateEl.value=new Date().toISOString().slice(0,10);
  document.querySelector('input[name="pay-status"][value="probono"]').checked=true;
  toggleAmountField(false);
  // Set save handler
  var saveBtn=document.querySelector('#training-form-panel button');
  if(saveBtn && saveBtn.textContent.includes('Save Training')){
    saveBtn.onclick=function(){saveTraining(null);};
  }
}
function hideTrainingForm(){
  document.getElementById('training-form-panel').style.display='none';
}
function saveTraining(editId){
  var title=document.getElementById('tf-title')?.value; if(!title){showToast('Title required','warn');return;}
  var org=document.getElementById('tf-org')?.value||'';
  var date=document.getElementById('tf-date')?.value||new Date().toISOString().slice(0,10);
  var facilitator=document.getElementById('tf-facilitator')?.value||'Dr. Otieno';
  var attendees=parseInt(document.getElementById('tf-attendees')?.value)||0;
  var payStatus=document.querySelector('input[name="pay-status"]:checked')?.value||'probono';
  var amount=payStatus==='paid'?(parseInt(document.getElementById('tf-amount')?.value.replace(/,/g,''))||0):null;
  var notes=document.getElementById('tf-notes')?.value||'';
  if(editId){
    var t=Store.trainings.find(function(x){return x.id===editId;});
    if(t){t.title=title;t.organization=org;t.date=date;t.facilitator=facilitator;t.attendees=attendees;t.paymentStatus=payStatus;t.amount=amount;t.notes=notes;}
    showToast('Training updated','success');
  }else{
    Store.trainings.unshift({id:'TR-'+String(Store.trainings.length+1).padStart(3,'0'),title:title,organization:org,date:date,facilitator:facilitator,attendees:attendees,paymentStatus:payStatus,amount:amount,notes:notes});
    showToast('Training added','success');
  }
  hideTrainingForm();renderTrainings();
}
function editTraining(id){
  var t=Store.trainings.find(function(x){return x.id===id;}); if(!t)return;
  var panel=document.getElementById('training-form-panel'); panel.style.display='block'; panel.scrollIntoView({behavior:'smooth'});
  document.getElementById('training-form-title').textContent='Edit Training';
  document.getElementById('tf-title').value=t.title;
  document.getElementById('tf-org').value=t.organization;
  document.getElementById('tf-date').value=t.date;
  document.getElementById('tf-facilitator').value=t.facilitator;
  document.getElementById('tf-attendees').value=t.attendees;
  document.getElementById('tf-notes').value=t.notes||'';
  var payRadio=document.querySelector('input[name="pay-status"][value="'+t.paymentStatus+'"]');
  if(payRadio) payRadio.checked=true;
  if(t.paymentStatus==='paid'){document.getElementById('tf-amount').value=t.amount?.toLocaleString()||'';toggleAmountField(true);}
  else toggleAmountField(false);
  var saveBtn=document.querySelector('#training-form-panel button');
  if(saveBtn && saveBtn.textContent.includes('Save Training')){
    saveBtn.onclick=function(){saveTraining(id);};
  }
}
function filterTrainings(filter,el){
  document.querySelectorAll('#view-trainings .chips .chip').forEach(function(c){c.classList.remove('active');});
  if(el)el.classList.add('active');
  var filtered=filter==='all'?Store.trainings:Store.trainings.filter(function(t){return t.paymentStatus===filter;});
  renderTrainingsTable(filtered);
  var hdrSpan=document.querySelector('#view-trainings .panel-hdr span:last-child');
  if(hdrSpan) hdrSpan.textContent=filtered.length+' records';
}
function toggleTrainingDetail(row){
  var next=row.nextElementSibling;
  if(next && next.classList.contains('train-detail')){
    next.classList.toggle('open');
    if(next.classList.contains('open')){next.style.display='table-row';}
    else{next.style.display='none';}
  }
}
function toggleAmountField(show){
  var field=document.getElementById('amount-field'); if(!field)return;
  field.className='amount-field'+(show?' show':'');
}
// ═══ OUTCOME MEASURES RENDERERS ═══
function renderOutcomes(){
  var c=document.getElementById('outcome-list'); if(!c)return;
  var clientId=Store._outcomeClient||Store.clients[0].id;
  var client=Store.getClient(clientId);
  var measures=Store.outcomeMeasures.filter(function(m){return m.clientId===clientId;});
  // Get unique measure types for this client
  var seen={}; var types=[];
  measures.forEach(function(m){if(!seen[m.measureType]){seen[m.measureType]=true;types.push(m);}});
  c.innerHTML=
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">'+
      '<div style="display:flex;align-items:center;gap:10px">'+
        '<span style="font-size:12px;font-weight:600">Client:</span>'+
        '<select id="om-client-select" onchange="Store._outcomeClient=this.value;renderOutcomes()" style="padding:6px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:var(--font);background:var(--surface)">'+
          Store.clients.map(function(cl){return '<option value="'+cl.id+'"'+(cl.id===clientId?' selected':'')+'>'+cl.name+'</option>';}).join('')+
        '</select>'+
      '</div>'+
      '<button onclick="renderAssessmentForm()" style="padding:8px 18px;background:var(--blue);color:#fff;border:none;border-radius:20px;font-weight:600;font-size:12px;cursor:pointer;font-family:var(--font)">+ New Assessment</button>'+
    '</div>'+
    '<div id="om-form-container"></div>'+
    // History table
    (measures.length?'<div class="panel"><div class="panel-hdr"><span class="panel-title">Assessment History — '+client.name+'</span><span style="font-size:11px;color:var(--text2)">'+measures.length+' records</span></div><div class="panel-body zero"><table style="width:100%;border-collapse:collapse;font-size:12px">'+
    '<thead><tr style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;background:var(--bg)"><th style="padding:10px 16px;text-align:left;font-weight:600">Date</th><th style="padding:10px 16px;text-align:left;font-weight:600">Assessment</th><th style="padding:10px 16px;text-align:center;font-weight:600">Score</th><th style="padding:10px 16px;text-align:left;font-weight:600">Severity</th><th style="padding:10px 16px;text-align:center;font-weight:600">Trend</th><th style="padding:10px 16px;text-align:left;font-weight:600">Clinician</th></tr></thead>'+
    '<tbody>'+measures.slice().reverse().map(function(m,i,arr){
      var def=Store.assessments[m.measureType];
      var sev=def?def.severity.find(function(s){return m.totalScore<=s.max;})||def.severity[def.severity.length-1]:null;
      // Trend vs previous (earlier date, so arr[i+1] in reversed array = previous measure)
      var trend=''; var prev=arr[i+1];
      if(prev && prev.measureType===m.measureType){
        var diff=m.totalScore-prev.totalScore;
        if(m.measureType==='who5') diff=-diff; // who5: higher=better
        if(diff<0) trend='<span style="color:var(--green);font-weight:700">↓ '+Math.abs(diff)+'</span>';
        else if(diff>0) trend='<span style="color:var(--red);font-weight:700">↑ '+diff+'</span>';
        else trend='<span style="color:var(--text3)">—</span>';
      }else{trend='<span style="color:var(--text3)">—</span>';}
      return '<tr style="border-bottom:1px solid var(--border2)"><td style="padding:10px 16px;color:var(--text2)">'+m.date+'</td><td style="padding:10px 16px;font-weight:600">'+(def?def.title:m.measureType)+'</td><td style="padding:10px 16px;text-align:center;font-weight:700;font-size:14px">'+m.totalScore+'</td><td style="padding:10px 16px"><span style="display:inline-block;padding:2px 10px;border-radius:10px;font-size:10px;font-weight:600;background:'+(sev?sev.color+'20':'var(--bg)')+';color:'+(sev?sev.color:'var(--text)')+'">'+m.severity+'</span></td><td style="padding:10px 16px;text-align:center">'+trend+'</td><td style="padding:10px 16px;color:var(--text2)">'+m.clinician+'</td></tr>';
    }).join('')+'</tbody></table></div></div>':'<div style="padding:40px;text-align:center;color:var(--text2)"><div style="font-size:32px;margin-bottom:8px">📊</div>No assessments recorded.<br>Click "+ New Assessment" to administer.</div>');
}
function renderAssessmentForm(presetType){
  var c=document.getElementById('om-form-container'); if(!c)return;
  var types=Object.keys(Store.assessments);
  c.innerHTML=
    '<div class="panel" style="border:2px solid var(--blue)"><div class="panel-hdr"><span class="panel-title">Administer Assessment</span><button class="panel-act" onclick="document.getElementById(\'om-form-container\').innerHTML=\'\'">Cancel</button></div><div class="panel-body">'+
    '<div style="margin-bottom:12px"><div class="fl" style="margin-bottom:4px">Assessment Type</div><select id="om-type" onchange="buildOMQuestions(this.value)" style="padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:12px;font-family:var(--font);background:var(--surface);min-width:250px"><option value="">— Select —</option>'+
    types.map(function(t){var d=Store.assessments[t];return '<option value="'+t+'"'+(presetType===t?' selected':'')+'>'+d.title+'</option>';}).join('')+
    '</select></div>'+
    '<div id="om-questions"></div>'+
    '<div id="om-result" style="display:none"></div>'+
    '<button id="om-submit-btn" onclick="submitAssessment()" style="display:none;padding:9px 22px;background:var(--blue);color:#fff;border:none;border-radius:20px;font-weight:600;font-size:12px;cursor:pointer;font-family:var(--font);margin-top:12px">Score & Save</button>'+
    '</div></div>';
  if(presetType){
    document.getElementById('om-type').value=presetType;
    buildOMQuestions(presetType);
  }
}
function buildOMQuestions(type){
  var container=document.getElementById('om-questions'); if(!container)return;
  var def=Store.assessments[type]; if(!def){container.innerHTML='';return;}
  container.innerHTML=
    '<div style="font-size:12px;color:var(--text2);margin-bottom:12px;padding:8px 12px;background:var(--bg);border-radius:8px;font-style:italic">'+def.instructions+'</div>'+
    def.questions.map(function(q,i){
      return '<div style="margin-bottom:10px;padding:8px 12px;background:var(--surface);border:1px solid var(--border2);border-radius:8px">'+
        '<div style="font-weight:600;font-size:12px;margin-bottom:6px">'+(i+1)+'. '+q+'</div>'+
        '<div style="display:flex;gap:8px;flex-wrap:wrap">'+
          def.scale.map(function(s,si){return '<label style="display:flex;align-items:center;gap:4px;font-size:11px;cursor:pointer;padding:4px 10px;border:1px solid var(--border);border-radius:20px;transition:all .15s" onmouseover="this.style.borderColor=\'var(--blue)\'" onmouseout="if(!this.querySelector(\'input\').checked)this.style.borderColor=\'var(--border)\'"><input type="radio" name="om-q-'+i+'" value="'+si+'" style="accent-color:var(--blue)" onchange="updateOMLabel(this)">'+s+'</label>';}).join('')+
        '</div></div>';
    }).join('');
  if(def.note) container.innerHTML+='<div style="font-size:10px;color:var(--amber);margin-top:4px">⚠ '+def.note+'</div>';
  document.getElementById('om-submit-btn').style.display='inline-block';
}
function updateOMLabel(cb){
  var labels=cb.closest('div').querySelectorAll('label');
  labels.forEach(function(l){l.style.borderColor='var(--border)';l.style.background='';});
  cb.parentElement.style.borderColor='var(--blue)';cb.parentElement.style.background='var(--blue2)';
}
function submitAssessment(){
  var type=document.getElementById('om-type')?.value; if(!type){showToast('Select assessment type','warn');return;}
  var def=Store.assessments[type]; if(!def)return;
  var responses=[];
  for(var i=0;i<def.questions.length;i++){
    var checked=document.querySelector('input[name="om-q-'+i+'"]:checked');
    if(!checked){showToast('Answer all questions (Q'+(i+1)+')','warn');return;}
    responses.push(parseInt(checked.value));
  }
  var total=responses.reduce(function(a,b){return a+b;},0);
  var sev=def.severity.find(function(s){return total<=s.max;})||def.severity[def.severity.length-1];
  var result={id:'OM-'+String(Store.outcomeMeasures.length+1).padStart(3,'0'),clientId:Store._outcomeClient||Store.clients[0].id,clientName:Store.getClient(Store._outcomeClient||Store.clients[0].id).name,clinician:'Dr. Otieno',date:new Date().toISOString().slice(0,10),measureType:type,responses:responses,totalScore:total,severity:sev.label,appointmentId:null};
  Store.outcomeMeasures.unshift(result);
  // Show result
  var resultDiv=document.getElementById('om-result');
  resultDiv.style.display='block';
  resultDiv.innerHTML='<div style="margin-top:16px;padding:16px;background:'+sev.color+'15;border:2px solid '+sev.color+';border-radius:12px;text-align:center">'+
    '<div style="font-size:32px;font-weight:700;color:'+sev.color+'">'+total+'</div>'+
    '<div style="font-size:14px;font-weight:700;color:'+sev.color+'">'+sev.label+'</div>'+
    '<div style="font-size:11px;color:var(--text2);margin-top:4px">'+(def.title||type)+' · '+(new Date().toISOString().slice(0,10))+'</div>'+
  '</div>';
  document.getElementById('om-submit-btn').style.display='none';
  document.getElementById('om-questions').style.opacity='0.5';
  // Re-render history
  setTimeout(function(){renderOutcomes();showToast('Assessment saved — Total: '+total+' ('+sev.label+')','success');},800);
}
function renderClientDetail(){
  // ponytail: static HTML in view-client-detail
}
