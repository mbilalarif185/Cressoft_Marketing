import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "http://localhost:3000/postform-test";
const ta = ".w-md-editor-text-input";

const LONG =
  "The right partner is rarely the one with an office three miles from yours. " +
  "It's the one with the right skill set, the right process, and the right track record " +
  "wherever they happen to be sitting. Why Near Me Became the Default Search in the First Place. " +
  "The habit of searching locally isn't irrational. It comes from three real concerns business owners have. " +
  "Accountability if something breaks you want someone reachable not a support ticket disappearing into a void. " +
  "Communication you don't want to explain your business from scratch to someone who doesn't get your market. " +
  "Trust a physical address feels like proof the company is real and not going anywhere. " +
  "These are legitimate worries. The mistake is assuming a local address is the only way to solve for them.";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: false,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
await page.waitForSelector(ta, { timeout: 30000 });

const sel = () => page.$eval(ta, (el) => ({ v: el.value, s: el.selectionStart }));

// 1) Seed a large document exactly the way the library sees an edit.
await page.$eval(
  ta,
  (el, t) => {
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value",
    ).set;
    setter.call(el, t);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  },
  LONG,
);
await new Promise((r) => setTimeout(r, 250));

// 2) REAL mouse click near the middle of the textarea to place the caret.
const box = await page.$eval(ta, (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});
await page.mouse.click(box.x + box.w * 0.4, box.y + box.h * 0.4);
await new Promise((r) => setTimeout(r, 80));
const afterClick = await sel();

// 3) Type a marker string and see where it lands.
await page.keyboard.type("<<HERE>>");
await new Promise((r) => setTimeout(r, 150));
const afterType = await sel();

const idx = afterType.v.indexOf("<<HERE>>");
console.log(
  JSON.stringify(
    {
      clickCaret: afterClick.s,
      docLen: LONG.length,
      markerLandedAt: idx,
      landedAtClick: idx === afterClick.s,
      landedAtEnd: idx >= LONG.length - 2,
      context: afterType.v.slice(Math.max(0, idx - 15), idx + 20),
    },
    null,
    2,
  ),
);

await browser.close();