/* ==========================================================================
   BAR ORDERING TEMPLATE — SETTINGS
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to set the template up for a new
   venue. index.html (customers) and staff.html (staff) both read it.
   See README.md for the full setup walkthrough.
   ========================================================================== */
window.BAR_CONFIG = {

  /* ---- 1. Your venue ---------------------------------------------------- */
  name: "Your Bar Name",
  tagline: "Choose your drinks, send your order, and we'll bring it over.",
  logoUrl: "",            // optional: "logo.png" (put the file next to index.html). Blank = show the name as text.
  currency: "£",          // "£", "€", "$" ...

  /* ---- 2. Look ---------------------------------------------------------- */
  theme: {
    accent: "#1F4FD8",    // buttons, active tabs, highlights. Any CSS colour.
  },

  /* ---- 3. Wording (change to suit your service style) ------------------- */
  // Staff have two "next step" buttons on each new order. Customers see the
  // matching title/text. Use one, both, or reword them — e.g. "Ready at the
  // bar" / "Bringing to your table".
  labels: {
    readyButton:  "Ready to collect",
    readyShort:   "Ready to collect",
    readyTitle:   "Ready to collect",
    readyText:    "Your order is ready at the bar.",

    deliverButton: "Bringing to table",
    deliverShort:  "On its way",
    deliverTitle:  "On its way",
    deliverText:   "We're bringing it to your table now.",

    doneTitle: "Enjoy!",
    doneText:  "Order complete.",
  },

  /* ---- 4. Staff PIN ----------------------------------------------------- */
  // Used ONCE, the first time staff.html runs, to seed the PIN into Firebase
  // (config/staffPin). Afterwards change it in the Firebase console and this
  // value is ignored. 4-20 characters. CHANGE THIS before going live.
  defaultStaffPin: "1234",

  // Prefix for the few things stored on staff devices (login state).
  // Use something unique per venue, e.g. "myBar_".
  storagePrefix: "bar_",

  /* ---- 5. Firebase ------------------------------------------------------ */
  // Firebase console -> Project settings -> Your apps -> Web app -> Config.
  // (These values are safe to publish; security comes from the database
  // rules in firebase-rules.json.)
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
  },

  /* ---- 6. Tables -------------------------------------------------------- */
  // Customers choose one of these before ordering. Groups are just headings.
  // Only used to seed the database the first time — afterwards staff edit
  // tables from the staff page (Tables tab).
  tables: [
    { name: "Inside", tables: ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Table 6"] },
    { name: "Outside", tables: ["Garden 1", "Garden 2", "Garden 3"] },
    { name: "Bar", tables: ["Bar stool 1", "Bar stool 2", "Bar stool 3", "Bar stool 4"] },
  ],

  /* ---- 7. Starting menu ------------------------------------------------- */
  // Sample menu — replace with yours, or leave it and edit prices/items from
  // the staff page later. Every item needs a UNIQUE id. Only used to seed
  // the database the first time; afterwards the live menu is in Firebase
  // (delete the "menu" node in the Firebase console to re-seed from here).
  menu: [
    { name: "Draught Beer", items: [
      { id:"draught1", name:"Lager (pint)", price:5.00, available:true },
      { id:"draught2", name:"Stout (pint)", price:5.50, available:true },
      { id:"draught3", name:"Pale Ale (pint)", price:5.50, available:true },
      { id:"draught4", name:"Cider (pint)", price:5.50, available:true },
    ]},
    { name: "Bottled Beer", items: [
      { id:"bottled1", name:"Premium Lager (330ml)", price:4.20, available:true },
      { id:"bottled2", name:"IPA (500ml)", price:5.50, available:true },
      { id:"bottled3", name:"Alcohol-free Lager (330ml)", price:3.50, available:true },
    ]},
    { name: "Wine", items: [
      { id:"wine1", name:"House White (175ml)", price:5.50, available:true },
      { id:"wine2", name:"House Red (175ml)", price:5.50, available:true },
      { id:"wine3", name:"House Rosé (175ml)", price:5.50, available:true },
      { id:"wine4", name:"Prosecco (125ml)", price:6.00, available:true },
      { id:"wine5", name:"House White (bottle)", price:20.00, available:true },
      { id:"wine6", name:"House Red (bottle)", price:20.00, available:true },
    ]},
    { name: "Spirits", items: [
      { id:"spirit1", name:"Vodka (25ml)", price:3.80, available:true },
      { id:"spirit2", name:"Gin (25ml)", price:3.80, available:true },
      { id:"spirit3", name:"Rum (25ml)", price:3.80, available:true },
      { id:"spirit4", name:"Whisky (25ml)", price:4.00, available:true },
      { id:"spirit5", name:"Tequila (25ml)", price:4.00, available:true },
    ]},
    { name: "Mixers", items: [
      { id:"mixer1", name:"Tonic Water", price:1.50, available:true },
      { id:"mixer2", name:"Cola", price:1.50, available:true },
      { id:"mixer3", name:"Lemonade", price:1.50, available:true },
    ]},
    { name: "Soft Drinks", items: [
      { id:"soft1", name:"Cola", price:3.00, available:true },
      { id:"soft2", name:"Lemonade", price:3.00, available:true },
      { id:"soft3", name:"Orange Juice", price:3.00, available:true },
      { id:"soft4", name:"Still Water", price:2.00, available:true },
      { id:"soft5", name:"Sparkling Water", price:2.00, available:true },
    ]},
    { name: "Hot Drinks", items: [
      { id:"hot1", name:"Espresso", price:2.50, available:true },
      { id:"hot2", name:"Americano", price:2.80, available:true },
      { id:"hot3", name:"Cappuccino", price:3.20, available:true },
      { id:"hot4", name:"Latte", price:3.20, available:true },
      { id:"hot5", name:"Tea", price:2.50, available:true },
    ]},
    { name: "Snacks", items: [
      { id:"snack1", name:"Crisps", price:1.80, available:true },
      { id:"snack2", name:"Salted Peanuts", price:1.80, available:true },
    ]},
  ],
};

/* Apply the accent colour (nothing to edit below this line). */
(function(){
  var c = window.BAR_CONFIG.theme && window.BAR_CONFIG.theme.accent;
  if(!c) return;
  var s = document.documentElement.style;
  s.setProperty("--accent", c);
  s.setProperty("--accent-dark", "color-mix(in srgb, " + c + " 80%, black)");
  s.setProperty("--accent-soft", "color-mix(in srgb, " + c + " 12%, transparent)");
})();
