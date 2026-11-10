# Send early-access applications to a Google Sheet

The website is static (GitHub Pages), so applications are saved through a small **Google Apps Script web app**. It writes each application as a row in a Google Sheet that your team can review, filter and sort. It is free, and nothing else needs to be hosted.

Until you finish these steps, `apply.html` runs in **demo mode** and only saves answers in the visitor's own browser.

## What you get

- One Google Sheet with two tabs: **Suppliers** and **Resellers**.
- Every row has a timestamp, status (`founding` or `waitlist`), position number, the applicant's own referral code, who referred them, a referral count and all their answers.
- The live counter on the website shows the real number of spots left (80 suppliers, 120 store owners).
- Once a track is full, new applicants are put on the waitlist automatically and see their waitlist position.

## Step by step (about 10 minutes)

1. Open <https://sheets.google.com> with the company Google account and create a blank sheet. Name it **Early access applications**. You don't need to create the tabs; the script creates them.
2. In the sheet, click **Extensions → Apps Script**.
3. Delete everything in `Code.gs` and paste the full script below. Click **Save** (💾).
4. Click **Deploy → New deployment**.
   - Click the gear ⚙ next to "Select type" and choose **Web app**.
   - Description: `Early access form`.
   - **Execute as:** *Me*.
   - **Who has access:** *Anyone*. This is required so the public website can send applications. People can only add rows through the script; they can't open or read the sheet.
   - Click **Deploy**, then **Authorize access** and allow it with the company account. If Google shows "Google hasn't verified this app", click **Advanced → Go to (project name)**. That's normal for your own scripts.
5. Copy the **Web app URL**. It ends in `/exec`.
6. In the website code, open `js/apply.config.js` and paste it:
   ```js
   FORM_ENDPOINT: "https://script.google.com/macros/s/XXXXXXXX/exec",
   ```
   Commit and push. GitHub Pages updates in about a minute.
7. Test: open `apply.html`, submit a test application, and check that a row appears in the sheet. Then delete the test row.

### Changing the script later

After editing the script, go to **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The URL stays the same. If you create a *New deployment* instead, the URL changes and you must update `js/apply.config.js`.

### Changing the number of spots

Change `LIMITS` in the script **and** `spots` in `js/apply.config.js` so that both match.

## The script (paste into Code.gs)

```javascript
/**
 * Early-access applications → Google Sheet
 * Tabs: Suppliers, Resellers. Founding limits: 80 / 120. Then waitlist.
 */
const LIMITS = { supplier: 80, reseller: 120 };
const TABS = { supplier: 'Suppliers', reseller: 'Resellers' };

const BASE_COLS = ['Timestamp', 'Status', 'Position', 'Referral code', 'Referred by', 'Referrals', 'Review'];
const FIELDS = {
  supplier: ['businessName', 'contactName', 'whatsapp', 'city', 'categories', 'skus', 'monthlyOrders',
             'couriers', 'sellsOn', 'hasVideos', 'dispatch48h'],
  reseller: ['contactName', 'whatsapp', 'city', 'storeType', 'monthlyOrders', 'categories',
             'deliveryRatio', 'wouldPay'],
};
const LABELS = {
  businessName: 'Business name', contactName: 'Contact name', whatsapp: 'WhatsApp', city: 'City',
  categories: 'Categories', skus: 'SKUs', monthlyOrders: 'Monthly orders', couriers: 'Couriers',
  sellsOn: 'Sells online on', hasVideos: 'Has product videos', dispatch48h: 'Dispatch in 24-48h',
  storeType: 'Store type', deliveryRatio: 'Delivery ratio', wouldPay: 'Would pay',
};

function sheetFor_(track) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(TABS[track]);
  if (!sh) {
    sh = ss.insertSheet(TABS[track]);
    const headers = BASE_COLS.concat(FIELDS[track].map(f => LABELS[f] || f));
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sh;
}

function counts_(track) {
  const sh = sheetFor_(track);
  const last = sh.getLastRow();
  if (last < 2) return { founding: 0, waitlist: 0 };
  const status = sh.getRange(2, 2, last - 1, 1).getValues().map(r => r[0]);
  return {
    founding: status.filter(s => s === 'founding').length,
    waitlist: status.filter(s => s === 'waitlist').length,
  };
}

function newCode_(track) {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += a.charAt(Math.floor(Math.random() * a.length));
  return (track === 'supplier' ? 'S-' : 'R-') + s;
}

function creditReferrer_(code) {
  if (!code) return;
  ['supplier', 'reseller'].forEach(t => {
    const sh = sheetFor_(t);
    const last = sh.getLastRow();
    if (last < 2) return;
    const codes = sh.getRange(2, 4, last - 1, 1).getValues();
    for (let i = 0; i < codes.length; i++) {
      if (codes[i][0] === code) {
        const cell = sh.getRange(i + 2, 6);
        cell.setValue((Number(cell.getValue()) || 0) + 1);
      }
    }
  });
}

function clean_(v) {
  // Keep it plain text; block spreadsheet formula injection.
  let s = String(v == null ? '' : v).slice(0, 500);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const s = counts_('supplier'), r = counts_('reseller');
  return json_({
    ok: true,
    limits: LIMITS,
    taken: { supplier: Math.min(s.founding, LIMITS.supplier), reseller: Math.min(r.founding, LIMITS.reseller) },
    waitlist: { supplier: s.waitlist, reseller: r.waitlist },
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    const track = d.track === 'reseller' ? 'reseller' : 'supplier';
    if (!d.whatsapp || !d.contactName) return json_({ ok: false, error: 'Missing name or WhatsApp' });

    const sh = sheetFor_(track);
    const c = counts_(track);
    const status = c.founding < LIMITS[track] ? 'founding' : 'waitlist';
    const position = status === 'founding' ? c.founding + 1 : c.waitlist + 1;
    const code = newCode_(track);
    const referredBy = clean_(d.referredBy || '').replace(/[^A-Z0-9-]/gi, '').slice(0, 16);

    const row = [new Date(), status, position, code, referredBy, 0, 'New']
      .concat(FIELDS[track].map(f => clean_(d[f])));
    sh.appendRow(row);
    creditReferrer_(referredBy);

    return json_({ ok: true, status: status, position: position, referralCode: code });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
```

## Running the waitlist

- **Moving people up:** sort the waitlist rows by **Referrals** (largest first), then by **Timestamp**. That is the "move up by inviting others" order.
- **Review column:** your team sets it to `Approved`, `Rejected` or `Call back`. Only approved founding applicants get the founding member benefits.
- **Opening a spot:** if you reject a founding applicant, change the first waitlisted person's Status to `founding` and message them on WhatsApp.
- **Duplicates:** the same WhatsApp number may apply twice. Use **Data → Data cleanup → Remove duplicates** on the WhatsApp column.

## Privacy

- The sheet holds applicants' names and WhatsApp numbers. Share it only with the team members who review applications, and never make it public.
- The form never asks for payments, card details, CNIC or passwords, and it should stay that way.
- Delete rejected applications after 6 months, or when the applicant asks.
