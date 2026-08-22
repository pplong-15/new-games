# -*- coding: utf-8 -*-
"""Generate unique static pages. Run from this folder."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent


def w(rel: str, text: str) -> None:
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")
    print("wrote", rel)


def html(lang_class: str, title: str, css: list[str], body: str, scripts: list[str] | None = None, extra_head: str = "") -> str:
    links = "\n  ".join(f'<link rel="stylesheet" href="{c}">' for c in css)
    sc = ""
    if scripts:
        sc = "\n".join(f'<script src="{s}"></script>' for s in scripts)
    return f"""<!DOCTYPE html>
<html lang="zh-CN" class="{lang_class}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  {links}
  {extra_head}
</head>
<body>
{body}
{sc}
</body>
</html>
"""


# ---------- introduction ----------
w(
    "introduction.html",
    html(
        "skin-intro-manual",
        "柴渡·门框内侧",
        ["css/intro-manual.css"],
        """  <header class="intro-hero">
    <div class="image-area"><img alt="" src="img/cover-alley.jpg"></div>
    <h1>字写在值班室门框内侧</h1>
  </header>
  <main>
    <section>
      <h2>◯ 谁把我叫来</h2>
      <p>我叫柴渡。桐石巷改造指挥部夜岗。白班阙禾四点走的，板还亮着。他没等人，纸条是我后来在门框上摸到的：工号柴-0821，进台用这个。下面挤了一句，像怕写长——法在板上，别改板。过门能试记，打回的留下。</p>
      <p>二十二点前要交一份放行建议。门口那队自称贺连舟喜队，要进贺宅堂屋。我又不是礼生，钥匙不归我。我能做的就是记过门，再写建议进不进堂。准不准，白班才说了算。</p>
      <p>我先当他们是喜。巷里老人都这么讲：喜可进。可阙禾把法写得死硬，像去年被谁骂过。我还没翻邮箱。邮箱的事以后再说。</p>
    </section>
    <section>
      <h2>◯ 今晚先看哪</h2>
      <p>台面开着。板上那条法在第一段。待记那一行写着贺连舟队，十九点十分，旁边有试记。阙禾说可以故意记一条违规的，系统会打回。打回了刷新还在，写下的那条不会被抹掉。</p>
      <p>对外窗口、钥匙室抄件、夜岗机短信、连舟那张黄页、巷口帖、公共邮箱，书签挂在台左侧。我今晚不是来查谁说谎。我对完再写，对不上就空着，空着也比把丧班当喜放进去强。</p>
      <p class="boot-actions">
        <a class="enter-link" href="desk/login.html">进夜岗台</a>
        <a class="ghost" href="index.html">先看对外页</a>
        <a class="ghost" id="resume" href="desk/home.html">接着上次的台</a>
      </p>
    </section>
    <section>
      <h2>◯ 写超了会退</h2>
      <p>表头印着建议。批准开匙、改掉板上的法，这两格勾了就退。手还是痒。阙禾那种「别改板」我听着别扭，可夜岗名又不印在钥匙上。</p>
      <p>渠西的巷名、人名都是指挥部叫法，别拿去外面对号。对了也是别人的镇。</p>
      <p><a href="#" id="tear">把门框字揭了重来</a></p>
    </section>
  </main>
  <script src="js/engine.js"></script>
  <script>
    document.getElementById("tear").onclick = function (e) {
      e.preventDefault();
      MK.reset();
      location.reload();
    };
  </script>
""",
    ),
)

# ---------- desk helpers ----------
DESK_CSS = ["../css/service-cyan-desk.css", "../css/desk-extra.css"]
DESK_JS = ["../js/engine.js"]


def desk(title: str, inner: str, tail_js: str = "", login: bool = False) -> str:
    body_cls = ' class="login-page"' if login else ""
    js = f"<script>{tail_js}</script>" if tail_js else ""
    return f"""<!DOCTYPE html>
<html lang="zh-CN" class="skin-service-cyan-desk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="../css/service-cyan-desk.css">
  <link rel="stylesheet" href="../css/desk-extra.css">
</head>
<body{body_cls}>
  <div id="wrap">
{inner}
  </div>
  <script src="../js/engine.js"></script>
  {js}
</body>
</html>
"""


w(
    "desk/login.html",
    desk(
        "夜岗登录",
        """    <header>
      <strong>桐石巷夜岗</strong>
      <div><a class="ghost-btn" href="../introduction.html">门框字</a></div>
    </header>
    <form class="login-box" id="lg">
      <h1>夜岗登录</h1>
      <label for="user">工号</label>
      <input id="user" name="user" type="text" autocomplete="off">
      <button type="submit">进台</button>
      <p class="hint" id="err">工号写在值班室门框内侧，别在这页猜。</p>
      <p><a href="#" id="fill">用门框上那个</a></p>
    </form>
""",
        """
    document.getElementById("fill").onclick = function (e) {
      e.preventDefault();
      document.getElementById("user").value = "柴-0821";
    };
    document.getElementById("lg").onsubmit = function (e) {
      e.preventDefault();
      var v = document.getElementById("user").value.replace(/\\s/g, "");
      if (v === "柴-0821") { MK.mark("token-in"); location.href = "home.html"; }
      else { document.getElementById("err").textContent = "工号在门框内侧。"; }
    };
""",
        login=True,
    ),
)

w(
    "desk/home.html",
    desk(
        "值班台面",
        """    <header>
      <strong>夜岗台面</strong>
      <div>
        <a class="ghost-btn" href="try.html">试记</a>
        <a class="ghost-btn" href="record.html">记录</a>
        <a class="ghost-btn" href="advise.html">建议</a>
      </div>
    </header>
    <div class="notice">
      <h2>今夜差事</h2>
      <p>柴渡。记过门。二十二点前交放行建议：贺连舟这队，进不进贺宅堂屋。本台只收建议，不发匙。</p>
    </div>
    <div class="mk-law">
      <h3>值班板（阙禾留，已打开）</h3>
      <p>今夜过门一律按丧记。丧事抬棺，杠不得擦门槛。自称喜队走错门，也按丧记。忌踏、忌坐。未核清仪礼，不得建议进堂。</p>
      <p>过门允许试记。选踩踏或擦杠，本台打回，并留下「法被撞过」。刷新不清。改板不在夜岗权限。</p>
    </div>
    <div id="chips"></div>
    <table>
      <thead><tr><th>时刻</th><th>队伍</th><th>状态</th><th>动作</th></tr></thead>
      <tbody>
        <tr>
          <td>19:10</td>
          <td>贺连舟队</td>
          <td>待记</td>
          <td><a href="try.html">试记过门</a></td>
        </tr>
        <tr>
          <td>19:40</td>
          <td>同队前排</td>
          <td>见记录页</td>
          <td><a href="record.html">打开格子</a></td>
        </tr>
      </tbody>
    </table>
    <div class="mk-side">
      <a href="board.html">阙禾须知全文</a>
      <a href="shift.html">交接两句</a>
      <a href="memo.html">抽屉备忘</a>
      <a href="hint.html">卡住时</a>
    </div>
    <div class="mk-side">
      <a href="../index.html">对外</a>
      <a href="../key/index.html">钥匙室</a>
      <a href="../phone/inbox.html">夜岗机</a>
      <a href="../team/index.html">黄页</a>
      <a href="../forum/list.html">巷帖</a>
      <a href="../mail/inbox.html">邮箱</a>
      <a href="../folk/index.html">旧俗</a>
    </div>
    <p class="mk-side">01/44　渠西夜岗</p>
""",
        """
    MK.mark("seen.law");
    document.getElementById("chips").innerHTML = MK.chipsHtml();
""",
    ),
)

w(
    "desk/board.html",
    desk(
        "阙禾须知",
        """    <header>
      <strong>白班须知</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="notice">
      <h2>阙禾留的须知</h2>
      <p>写板的人是白班。夜岗只许读，不许涂。涂了回单作废。</p>
    </div>
    <div class="mk-law">
      <h3>立板理由（他没写完）</h3>
      <p>桐石巷正门那条坎，喜往里走，丧往外抬，走法相反。窗口这周爱收红的登记。有人就会用喜的名来走丧。你听嘴，你会放错。</p>
      <p>杠皮蹭到木头，这一趟就算脏。脚踩上去，更脏。脏了还进堂，等于把外送进内。口头「招鬼」不当依据。本台只认格子。</p>
      <p>试记口我留给你。你要撞，你就撞。打回的那条留下。留下了才能交差。没留下也行，你去把记录页翻开，十九点四十那格自己会说话。</p>
    </div>
    <p class="mk-side">须知能解释板为什么硬，不能代替你去看门口那队到底是谁。02/44</p>
""",
        """
    MK.mark("seen.board");
""",
    ),
)

w(
    "desk/record.html",
    desk(
        "过门记录",
        """    <header>
      <strong>过门格子</strong>
      <div>
        <a class="ghost-btn" href="home.html">回台</a>
        <a class="ghost-btn" href="try.html">试记</a>
      </div>
    </header>
    <div class="notice">
      <h2>本台已写下的过门</h2>
      <p>记录员栏空着，不等于没发生。空着只说明当时没人肯签名。</p>
    </div>
    <div id="chips"></div>
    <table>
      <thead><tr><th>时刻</th><th>门</th><th>队伍</th><th>动作</th><th>备注</th></tr></thead>
      <tbody>
        <tr>
          <td>19:10</td>
          <td>正门坎</td>
          <td>贺连舟队</td>
          <td>待记</td>
          <td>自称要进堂，红布罩着</td>
        </tr>
        <tr>
          <td>19:40</td>
          <td>正门坎</td>
          <td>贺连舟队前排</td>
          <td>踩踏</td>
          <td>有人脚在坎上，摄像还蹲着</td>
        </tr>
        <tr>
          <td>19:52</td>
          <td>二门坎</td>
          <td>施工</td>
          <td>顶物</td>
          <td>姜篾的柜，跟这队不是一回事</td>
        </tr>
      </tbody>
    </table>
    <p class="mk-side">十九点四十那一格已经脏了。你今晚一次试记都没做，这格也在。姜篾那行是二门，别并进正门。03/44</p>
    <p class="mk-side"><a href="../public/noise.html">施工投诉在对外页</a>　<a href="../forum/step.html">卜巷也写过脚</a></p>
""",
        """
    MK.mark("seen.record");
    document.getElementById("chips").innerHTML = MK.chipsHtml();
""",
    ),
)

w(
    "desk/try.html",
    desk(
        "试记过门",
        """    <header>
      <strong>试记过门</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="notice">
      <h2>故意记一条</h2>
      <p>这不是终局。这是让你撞法。踩踏或擦杠会被打回，并留下已证实。正常跨只当演练。</p>
    </div>
    <div id="chips"></div>
    <form id="tryf">
      <fieldset>
        <legend>贺连舟队 · 正门坎 · 试记</legend>
        <label><input type="radio" name="kind" value="step"> 踩踏</label>
        <label><input type="radio" name="kind" value="pole"> 擦杠</label>
        <label><input type="radio" name="kind" value="clean"> 正常跨</label>
        <button type="submit">交试记</button>
      </fieldset>
    </form>
    <p class="mk-side" id="err"></p>
    <p class="mk-side">板上的法已经在台面打开过。你不必外搜。04/44</p>
""",
        """
    document.getElementById("chips").innerHTML = MK.chipsHtml();
    document.getElementById("tryf").onsubmit = function (e) {
      e.preventDefault();
      var el = document.querySelector("input[name=kind]:checked");
      if (!el) { document.getElementById("err").textContent = "先选一种动作。"; return; }
      MK.set("last-try", el.value);
      if (el.value === "step" || el.value === "pole") {
        MK.mark("verified.broke");
        location.href = "try-reject.html";
      } else {
        location.href = "try-ok.html";
      }
    };
""",
    ),
)

w(
    "desk/try-reject.html",
    desk(
        "试记被打回",
        """    <header>
      <strong>打回</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="mk-err" id="why">按值班法，这条过门不能收作有效。</div>
    <div class="notice">
      <h2>留下了</h2>
      <p>临时填写清掉。已证实还在：法被撞过一次。你按刷新，这条不会没。交班预览也清不掉。</p>
      <p>打回只证明法会咬人，不定门口那队口头是红是白。红白要另看来源。</p>
    </div>
    <div id="chips"></div>
    <p class="mk-side">
      <a href="try.html">再试一条</a>
      <a href="record.html">去看格子</a>
      <a href="advise.html">去写建议</a>
      <a href="#" id="ref">刷新本页</a>
    </p>
    <p class="mk-side">05/44</p>
""",
        """
    var k = MK.get("last-try");
    var box = document.getElementById("why");
    if (k === "step") box.textContent = "按值班法，踩踏不得记为有效过门。本台已记下：法被撞过一次。";
    if (k === "pole") box.textContent = "丧事抬棺，杠不得擦门槛。本台已记下：法被撞过一次。";
    document.getElementById("chips").innerHTML = MK.chipsHtml();
    document.getElementById("ref").onclick = function (e) { e.preventDefault(); location.reload(); };
""",
    ),
)

w(
    "desk/try-ok.html",
    desk(
        "试记收下演练",
        """    <header>
      <strong>演练</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="mk-ok">正常跨已收下，作演练。此条不能当进堂依据，也不算已证实的违规。</div>
    <div class="notice">
      <h2>你还没撞到法</h2>
      <p>法要被撞，才留下证明。你走干净的那一格，本台只当夜岗练手。建议页若要勾「已有踩踏」，请改选踩踏或擦杠，或去打开记录页那一格脏的。</p>
    </div>
    <div id="chips"></div>
    <p class="mk-side"><a href="try.html">改选再交</a>　<a href="record.html">看已写下的格子</a></p>
    <p class="mk-side">06/44</p>
""",
        """
    document.getElementById("chips").innerHTML = MK.chipsHtml();
""",
    ),
)

w(
    "desk/advise.html",
    desk(
        "放行建议",
        """    <header>
      <strong>放行建议</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="notice">
      <h2>四栏齐才收</h2>
      <p>本台不替白班开匙。你交的是建议。缺已证实或来源对不上，会退回，指出拧着的那一栏。</p>
    </div>
    <div id="chips"></div>
    <p class="mk-err" id="err" style="display:none"></p>
    <form id="adv">
      <fieldset>
        <legend>今夜这一趟</legend>
        <label>仪礼性质
          <select name="nature">
            <option value="">（空）</option>
            <option value="wedding">喜</option>
            <option value="funeral">丧</option>
            <option value="rewrite">改板，不认红白</option>
          </select>
        </label>
        <label>过门栏
          <select name="record">
            <option value="">（空）</option>
            <option value="clean">干净可进</option>
            <option value="stepped">已有踩踏</option>
          </select>
        </label>
        <label>处置
          <select name="act">
            <option value="">（空）</option>
            <option value="letin">建议放行进堂</option>
            <option value="hold">建议不放行进堂</option>
            <option value="rewrite">改掉值班板上的法</option>
          </select>
        </label>
        <label>权限
          <select name="auth">
            <option value="">（空）</option>
            <option value="recommend">建议</option>
            <option value="approve">批准开匙</option>
          </select>
        </label>
        <button type="submit">交建议</button>
      </fieldset>
    </form>
    <p class="mk-side">07/44　勾批准或改板，路会另走。</p>
""",
        """
    document.getElementById("chips").innerHTML = MK.chipsHtml();
    document.getElementById("adv").onsubmit = function (e) {
      e.preventDefault();
      var f = e.target;
      var form = { nature: f.nature.value, record: f.record.value, act: f.act.value, auth: f.auth.value };
      var end = MK.pickEnding(form);
      if (end === "hold-funeral") location.href = "result-hold.html";
      else if (end === "let-in") location.href = "result-letin.html";
      else if (end === "rewrite") location.href = "result-rewrite.html";
      else {
        var box = document.getElementById("err");
        box.style.display = "block";
        box.textContent = MK.bounceText(end);
      }
    };
""",
    ),
)

w(
    "desk/result-hold.html",
    desk(
        "回单·不放行",
        """    <header>
      <strong>白班预览回单</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="notice">
      <h2>建议已收下：不放行进堂</h2>
      <p id="how"></p>
      <p>这队按丧记，不按喜。过门格子或试记已经证明坎被踩过。丧班脏了还进堂，本台不能建议放行。钥匙仍在顾扃那里，夜岗开不了门。白班早上会看这张回单，决定开不开侧门备案。</p>
      <p>口头传说不写进回单。窗口「本周爱收红的」也不写进回单。回单只写对得上的格子。</p>
    </div>
    <div id="chips"></div>
    <p class="mk-side"><a href="../introduction.html">把门框字揭了</a>　<a href="advise.html">改四栏</a></p>
    <p class="mk-side">08/44</p>
""",
        """
    var s = MK.get();
    var how = [];
    if (s["verified.broke"]) how.push("你试记过踩踏或擦杠，打回留下了已证实。");
    if (s["seen.record"]) how.push("你打开过记录页，十九点四十那格写着踩踏。");
    if (s["seen.sms"]) how.push("夜岗机上穆三刀说杠擦了。");
    if (s["seen.key"]) how.push("钥匙簿用途写的是丧班。");
    if (s["seen.borrow"]) how.push("巷口帖里贺晚秧说过先进去再换白。");
    document.getElementById("how").textContent = how.join("") || "四栏对上了，来源也齐。";
    document.getElementById("chips").innerHTML = MK.chipsHtml();
""",
    ),
)

w(
    "desk/result-letin.html",
    desk(
        "回单·放行",
        """    <header>
      <strong>白班预览回单</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="mk-err">建议已收下：放行进堂。</div>
    <div class="notice">
      <h2>按你勾的走</h2>
      <p>你把他们送进去了。黄页是红的，窗口也爱红。贺连舟会谢你。顾扃的簿子仍写着丧。穆三刀那条短讯还在机里。十九点四十的踩踏不会因为放行而消失。</p>
      <p>白班早上会问：夜岗是按嘴写，还是按格子写。你的名字不印在钥匙上，问话会印在交接里。</p>
    </div>
    <p class="mk-side"><a href="advise.html">收回重交</a>　<a href="record.html">再看那格脏的</a></p>
    <p class="mk-side">09/44</p>
""",
    ),
)

w(
    "desk/result-rewrite.html",
    desk(
        "回单·改板",
        """    <header>
      <strong>白班预览回单</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="mk-err">你要改值班板上的法。本台把这条收成越权。</div>
    <div class="notice">
      <h2>板还在</h2>
      <p>阙禾写的字没被你涂掉。夜岗没有改板的格子。你交的那一栏等于把白班的怕一笔勾了。回单作废意义上的那种收：路记下了，匙仍不发，法仍按丧记。</p>
      <p>门口那队还在等。他们不管你跟板较什么劲。他们要进堂。</p>
    </div>
    <p class="mk-side"><a href="advise.html">回到四栏</a>　<a href="board.html">再读须知</a></p>
    <p class="mk-side">10/44</p>
""",
    ),
)

w(
    "desk/memo.html",
    desk(
        "抽屉备忘",
        """    <header>
      <strong>抽屉</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="notice">
      <h2>前任夜岗撕剩的</h2>
      <p>字迹不是阙禾。比他碎。写着：窗口爱红不可怕，可怕的是你跟着红。试记不是闹着玩，打回的那条才是你的。记录页有一格空签名，空不等于干净。</p>
      <p>又一行被墨涂了，隐约像「秋穗」两个字。去年的事，邮箱里有。不看也能交差。</p>
      <p>最底下一行：姜篾的柜是二门，别写进正门。写进去，施工会来吵，吵完你还是没看清门口那队。</p>
    </div>
    <p class="mk-side">备忘能提醒你别并案，不能当仪礼定性。11/44</p>
""",
    ),
)

w(
    "desk/shift.html",
    desk(
        "交接",
        """    <header>
      <strong>交接</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="notice">
      <h2>阙禾走时留的两句</h2>
      <p>法在板上，别改板。</p>
      <p>过门能试记，打回的留下。</p>
      <p>他没写第三句。抽屉里那张碎纸不是他的。邮箱密码跟工号同一张门框字背面：夜岗公共箱，不用另猜。</p>
      <p>二十二点窗关。关了以后贺连舟队仍会在门口站着，除非你写下不放行。站着不是我的事。写不写，是。</p>
    </div>
    <p class="mk-side"><a href="../mail/inbox.html">公共箱</a>　12/44</p>
""",
    ),
)

w(
    "desk/hint.html",
    desk(
        "卡住时",
        """    <header>
      <strong>夜岗小条</strong>
      <div><a class="ghost-btn" href="home.html">回台</a></div>
    </header>
    <div class="notice">
      <h2>四折。能停就停。</h2>
      <p>一、先看板上的法，再动过门。法已经摊开，不在别的站里藏着。</p>
      <p>二、试记在台面。打回的那条刷新还在。演练那条不算。</p>
      <p>三、短信、钥匙簿、巷口帖，有人对不上「喜」。记录里有一格已经脏了。</p>
      <details>
        <summary>四、能不看就不看</summary>
        <p>仪礼勾丧，过门勾已有踩踏，处置勾不放行，权限勾建议。丧的来源至少打开过一处。踩踏靠试记打回，或靠记录页那一格。</p>
      </details>
    </div>
    <p class="mk-side">小条不替你按提交。13/44</p>
""",
    ),
)

print("desk done")

# ---------- public shop ----------

def shop(rel: str, title: str, inner: str) -> None:
    css = "css/shop-local-2010s.css" if rel == "index.html" else "../css/shop-local-2010s.css"
    img = "img/" if rel == "index.html" else "../img/"
    w(
        rel,
        f"""<!DOCTYPE html>
<html lang="zh-CN" class="skin-shop-local-2010s">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="{css}">
</head>
<body>
  <div id="container">
{inner}
  </div>
</body>
</html>
""",
    )


shop(
    "index.html",
    "桐石巷改造指挥部",
    f"""    <header>
      <a class="logo" href="index.html">桐石巷修缮</a>
    </header>
    <nav id="menubar">
      <ul>
        <li><a href="index.html">门面</a></li>
        <li><a href="public/tonight.html">本周窗口</a></li>
        <li><a href="public/threshold.html">旧坎说明</a></li>
        <li><a href="public/access.html">谁能进堂</a></li>
        <li><a href="javascript:void(0)">参观预约</a></li>
      </ul>
    </nav>
    <main>
      <section>
        <p>渠西县桐石镇桐石巷老宅修缮对外页。免费模板改过两次配色，灰 Tab 没换。指挥部不做法事，不审风水，只谈灰、木、工期。</p>
        <ul>
          <li>地址：桐石巷贺宅一带（虚构区划）</li>
          <li>值班：白班阙禾　夜岗柴渡（不对外接访）</li>
          <li>电话：0×××-□□□□□□（打码）</li>
        </ul>
      </section>
      <img class="hero-photo" alt="" src="img/hall-door.jpg">
      <section class="menu-section">
        <h2>告示</h2>
        <dl class="notice">
          <dt>本周</dt>
          <dd>堂屋窗口只接待喜事登记。丧事改走侧门备案。侧门堆灰，施工未清。</dd>
          <dt>旧坎</dt>
          <dd>正门门槛保留。坡道另开，不替代跨。详见旧坎说明。</dd>
          <dt>投诉</dt>
          <dd>姜篾把柜顶在二门坎上，邻里在骂。跟贺宅正门不是一条坎。</dd>
        </dl>
        <p>本页能说明窗口爱收红的，不能定今夜门口那队是喜是丧。<a href="desk/login.html">夜岗从门框进</a></p>
      </section>
    </main>
    <footer>虚构修缮站　14/44</footer>
""",
)

shop(
    "public/tonight.html",
    "本周窗口",
    """    <header>
      <a class="logo" href="../index.html">桐石巷修缮</a>
    </header>
    <nav id="menubar"><ul>
      <li><a href="../index.html">回去</a></li>
      <li><a href="tonight.html">窗口</a></li>
      <li><a href="threshold.html">旧坎</a></li>
    </ul></nav>
    <main>
      <section>
        <h2>窗口怎么收</h2>
        <p>修缮期堂屋不对外开放参观。摄影师、婚庆、香烛铺来登记，本周柜台只开「喜事」那一格。丧事的人下午来过，被打发到侧门备案。侧门堆着水泥袋，灰大。</p>
        <p>柜台这句话被家里人听去了。有人就会想：先顶喜的名，进了再换白。柜台不审名是真是假。柜台只看你填哪一格。</p>
        <p>夜岗台的板写的是另一套：今夜按丧记。对外页管白天窗口。两套字同时挂着，谁也不作废谁。你要交差，听哪一套，自己对。</p>
        <p>本页不能证明贺连舟填过哪一格。登记簿不在这张皮上。15/44</p>
      </section>
    </main>
    <footer>窗口说明　请勿对照真机关</footer>
""",
)

shop(
    "public/threshold.html",
    "旧坎说明",
    """    <header>
      <a class="logo" href="../index.html">桐石巷修缮</a>
    </header>
    <nav id="menubar"><ul>
      <li><a href="../index.html">回去</a></li>
      <li><a href="tonight.html">窗口</a></li>
    </ul></nav>
    <main>
      <img class="hero-photo" alt="" src="../img/threshold-wood.jpg">
      <section>
        <h2>正门那条坎</h2>
        <p>贺宅正门门槛是旧木。保护论证写：保留。无障碍坡道从东侧另开，坡道归出行，不归仪礼。有人把坡道说成得罪门神，那是嘴，不是指挥部结论。</p>
        <p>坎高，抬东西要抬高。杠皮容易蹭。蹭了谁记，记在夜岗，不记在这张对外页。</p>
        <p>二门坎更矮，姜篾把快递柜顶上去，邻里骂没规矩。骂的是二门。正门那条脏不脏，看夜岗格子。16/44</p>
        <p><a href="noise.html">邻里投诉摘</a></p>
      </section>
    </main>
    <footer>旧木保留　坡道另开</footer>
""",
)

shop(
    "public/access.html",
    "谁能进堂",
    """    <header>
      <a class="logo" href="../index.html">桐石巷修缮</a>
    </header>
    <nav id="menubar"><ul>
      <li><a href="../index.html">回去</a></li>
      <li><a href="access.html">进堂</a></li>
    </ul></nav>
    <main>
      <section>
        <h2>堂屋钥匙不在对外</h2>
        <p>参观预约栏目点了不会开。灰着。真要进堂，匙在顾扃的匣子里。用途条写什么，发什么。夜岗建议写什么，白班早上才看。</p>
        <p>本周对外口径：喜事登记优先。口径不是法。法在夜岗板上。把口径当成今夜仪礼定性，你会把丧班送进去。</p>
        <p>贺宅堂屋还在刷漆。布置的人要进去，可以。以什么名进去，柜台懒得问。懒得问的后果，轮到夜岗写。17/44</p>
        <p><a href="../key/index.html">钥匙室抄件</a></p>
      </section>
    </main>
    <footer>进堂须知　不发匙</footer>
""",
)

shop(
    "public/noise.html",
    "邻里投诉",
    """    <header>
      <a class="logo" href="../index.html">桐石巷修缮</a>
    </header>
    <nav id="menubar"><ul>
      <li><a href="../index.html">回去</a></li>
      <li><a href="noise.html">投诉</a></li>
    </ul></nav>
    <main>
      <section>
        <h2>姜篾这一条</h2>
        <p>八月十九，二门。姜篾把一只铁皮柜顶在坎上，说要收快递。邻里骂他没规矩，骂了三天。指挥部回：柜挪开，坡道还是东侧那条。</p>
        <p>这一条能证明邻里会为坎吵架，不能证明贺连舟队十九点四十踩的是哪一条。并进正门，施工会来吵，夜岗格子会脏两次。</p>
        <p>正门那队的事，去看记录，去看短信。别在投诉栏结案。18/44</p>
      </section>
    </main>
    <footer>投诉摘录　不得并案</footer>
""",
)

# ---------- key archive ----------

def arch(rel: str, title: str, inner: str, mark: str = "") -> None:
    js = f'<script src="../js/engine.js"></script><script>{mark}</script>' if mark else ""
    w(
        rel,
        f"""<!DOCTYPE html>
<html lang="zh-CN" class="skin-archive-simsun">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="../css/archive-simsun.css">
</head>
<body>
  <article class="record">
{inner}
  </article>
  {js}
</body>
</html>
""",
    )


arch(
    "key/index.html",
    "堂屋钥匙室",
    """    <h1>堂屋钥匙室抄件</h1>
    <div class="meta"><span>编号：匙-桐石</span><span>管理员：顾扃</span></div>
    <p>宋体过录。匣子在东厢。夜岗没有备用匙。抄件只证明本室这样登记过，不证明堂屋里已经摆完白的或红的。</p>
    <img alt="" src="../img/key-box.jpg" width="100%">
    <table>
      <tr><th>页</th><th>内容</th></tr>
      <tr><td>领用</td><td><a href="log.html">今夜领匙</a></td></tr>
      <tr><td>字条</td><td><a href="note.html">顾扃自己写的</a></td></tr>
      <tr><td>旧条</td><td><a href="lastyear.html">去年喜期那把</a></td></tr>
      <tr><td>限度</td><td><a href="limit.html">本室不能定的事</a></td></tr>
    </table>
    <p><a href="../desk/home.html">回夜岗</a>　19/44</p>
    <p><span class="stamp">抄件</span></p>
""",
)

arch(
    "key/log.html",
    "今夜领匙",
    """    <h1>领用簿摘</h1>
    <div class="meta"><span>日期：今夜</span><span>门：贺宅堂屋</span></div>
    <table>
      <tr><th>时刻</th><th>领用人</th><th>用途</th><th>归还</th></tr>
      <tr><td>十六点二十</td><td>贺连舟</td><td>丧班进堂布置</td><td>未打勾</td></tr>
    </table>
    <p>用途栏是顾扃填的。领用人签字是连舟。夜里连舟改口要喜，顾扃不换发第二把，也不改这一格。</p>
    <p>簿子能顶嘴：匙按丧发出去。簿子不能证明布置做完没有，也不能证明杠有没有蹭到木头。蹭的事在夜岗机。20/44</p>
    <p><a href="note.html">他写给自己的条</a></p>
    <p><span class="stamp">未归还</span></p>
""",
    'MK.mark("seen.key");',
)

arch(
    "key/note.html",
    "顾扃字条",
    """    <h1>匣盖内侧</h1>
    <div class="meta"><span>顾扃</span><span>不具名对外</span></div>
    <p>条上写什么，匙就是什么。嘴上说喜，条上写丧，不换发。喜要另开条。另开条要白班。夜岗建议来了，我早上再看。</p>
    <p>我不管红白对不对。我管条。连舟下午领的时候没争。夜里才争。争的人多半心里有数。</p>
    <p>去年秋穗那把，用途写喜期跟拍，后来摄像坐了坎，片子废了。旧条还在夹层。与今夜不是同一把，别混。21/44</p>
    <p><a href="lastyear.html">夹层旧条</a></p>
    <p><span class="stamp">私记</span></p>
""",
)

arch(
    "key/lastyear.html",
    "去年喜期旧条",
    """    <h1>夹层：连秋穗喜期</h1>
    <div class="meta"><span>去年</span><span>用途：喜期跟拍进堂</span></div>
    <p>领用人当时不是贺连舟。花车名「秋穗号」。阮箔开车。匙已归还。后附一笔：片子作废，原因坐坎，指挥部被追责。</p>
    <p>今夜黄页上的花车名跟这一条相同。通行条复印件也像从这里描的。描不等于今夜还是喜。旧条只能证明去年有过一趟红的，不能证明今夜新娘还在队里。22/44</p>
    <p><a href="../mail/rework.html">返工单在邮箱</a>　<a href="../team/permit.html">今夜那张通行复印件</a></p>
    <p><span class="stamp">已归还</span></p>
""",
)

arch(
    "key/limit.html",
    "钥匙室限度",
    """    <h1>本室不能定的事</h1>
    <div class="meta"><span>过录</span><span>给夜岗看</span></div>
    <p>领用簿证明匙按哪一行用途发出。字条证明管理员不认嘴。旧条证明去年有喜期跟拍。</p>
    <p>三份加在一起，仍不能证明堂屋此刻摆的是白是红，不能证明谁的脚踩了正门坎，不能让夜岗的建议变成开锁。</p>
    <p>有人把「领了匙」写成「已经进堂办完」。本室不认这种跳。23/44</p>
    <p><span class="stamp">限度</span></p>
""",
)

# ---------- phone wap ----------

def wap(rel: str, title: str, inner: str, mark: str = "") -> None:
    js = f'<script src="../js/engine.js"></script><script>{mark}</script>' if mark else ""
    w(
        rel,
        f"""<!DOCTYPE html>
<html lang="zh-CN" class="skin-wap-phone-2007">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="../css/wap-phone-2007.css">
</head>
<body>
  <div class="phone">
{inner}
  </div>
  {js}
</body>
</html>
""",
    )


wap(
    "phone/inbox.html",
    "夜岗机",
    """    <div class="hd">夜岗机</div>
    <div class="sub">短讯　未读三</div>
    <div class="menu">
      <p><span class="num">[1]</span> <a href="mu.html">穆三刀　杠擦了</a></p>
      <p><span class="num">[2]</span> <a href="he.html">贺连舟　我们喜队</a></p>
      <p><span class="num">[3]</span> <a href="gu.html">顾扃　条上写丧</a></p>
      <p><span class="num">[4]</span> <a href="../desk/home.html">回台面</a></p>
    </div>
    <div class="hint">机子是指挥部的。私人号码不在这页。</div>
    <div class="ft"><a class="back" href="../desk/home.html">返回</a><br>wap　24/44</div>
""",
)

wap(
    "phone/mu.html",
    "穆三刀",
    """    <div class="hd">收件箱</div>
    <div class="sub">穆三刀　19:48</div>
    <div class="menu">
      <p>杠擦了。别记我。</p>
      <p>贺守石那头还在等抬。连舟不让门口说丧。</p>
      <p>我帮忙。我不是头。坎高，有人喊快。皮蹭到木头我听见了。</p>
    </div>
    <div class="hint">短讯能证明有人用这台机说杠擦了、说等抬。不能当目击笔录，不能指定是谁的杠。25/44</div>
    <div class="ft"><a class="back" href="inbox.html">回列表</a></div>
""",
    'MK.mark("seen.sms");',
)

wap(
    "phone/he.html",
    "贺连舟",
    """    <div class="hd">收件箱</div>
    <div class="sub">贺连舟　19:06</div>
    <div class="menu">
      <p>我们喜队。进堂。</p>
      <p>窗口说这周收红的。秋穗号在巷口。别刁难。</p>
      <p>后来又补：匙我下午领了。用途你别管。</p>
    </div>
    <div class="hint">他会圆谎。黄页跟这四字是一套嘴。对簿子的时候，他让你别管用途。26/44</div>
    <div class="ft"><a class="back" href="inbox.html">回列表</a>　<a href="../key/log.html">用途在簿子</a></div>
""",
)

wap(
    "phone/gu.html",
    "顾扃",
    """    <div class="hd">收件箱</div>
    <div class="sub">顾扃　20:02</div>
    <div class="menu">
      <p>条上写丧。嘴上说喜。钥匙不换发。</p>
      <p>夜岗建议来了早上再看。别打电话催第二把。</p>
    </div>
    <div class="hint">他只认条。跟钥匙室字条同一张嘴，更短。27/44</div>
    <div class="ft"><a class="back" href="inbox.html">回列表</a>　<a href="../key/note.html">匣盖</a></div>
""",
)

# ---------- team classified ----------

def yellow(rel: str, title: str, inner: str) -> None:
    w(
        rel,
        f"""<!DOCTYPE html>
<html lang="zh-CN" class="skin-classified-yellow">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="../css/classified-yellow.css">
</head>
<body>
  <div class="top">
    <div class="top-inner">
      <b>渠西分类</b>
      <span class="city">桐石</span>
    </div>
  </div>
  <div class="layout">
{inner}
  </div>
  <p class="ft">信息由用户发布　当面核　28段起</p>
</body>
</html>
""",
    )


yellow(
    "team/index.html",
    "贺连舟喜队",
    """    <nav>
      <h4>分类</h4>
      <a class="on" href="index.html">本地服务</a>
      <a href="route.html">过门路线</a>
      <a href="roster.html">人手</a>
      <a href="permit.html">通行复印件</a>
      <a href="javascript:void(0)">婚庆档期</a>
    </nav>
    <div class="list">
      <h4>贺连舟喜队　渠西贺宅过门</h4>
      <p><img alt="" src="../img/red-cloth.jpg" width="100%"></p>
      <p>接桐石巷贺宅过门。花车秋穗号。红布、鞭、跟拍都有。本周窗口收喜，我们按喜走。</p>
      <p>联系贺连舟。不谈价。价在私下。</p>
      <p>新娘名不写。写了占行。人手页有抬的。抬的人多，喜也要抬箱。</p>
      <p>本页是他给自己挂的名。挂名不能证明新娘在场，不能把夜岗板改成喜记。28/44</p>
      <p><a href="../desk/home.html">夜岗从这边回</a></p>
    </div>
""",
)

yellow(
    "team/route.html",
    "过门路线",
    """    <nav>
      <h4>分类</h4>
      <a href="index.html">广告</a>
      <a class="on" href="route.html">路线</a>
    </nav>
    <div class="list">
      <h4>巷口到正门</h4>
      <p>秋穗号停巷口。人从石板走到贺宅正门。不走东侧坡道。坡道归出行，连舟说仪礼要跨坎。</p>
      <p>他写「跨」。他没写「不踩」。十九点四十记录里的脚，跟这张路线对得上位置，对不上他保证的动作。</p>
      <p>侧门他不写。侧门堆灰。丧班备案本该走侧门。他偏走正门。29/44</p>
    </div>
""",
)

yellow(
    "team/roster.html",
    "人手",
    """    <nav>
      <h4>分类</h4>
      <a href="index.html">广告</a>
      <a class="on" href="roster.html">人手</a>
    </nav>
    <div class="list">
      <h4>名单（他自己贴的）</h4>
      <div class="hd-row"><span class="t">名</span><span>活</span><span>备注</span></div>
      <div class="row"><span>贺连舟</span><span>头</span><span>接活</span></div>
      <div class="row"><span>穆三刀</span><span>抬杠</span><span>帮忙</span></div>
      <div class="row"><span>无名四</span><span>抬杠</span><span>缠麻</span></div>
      <div class="row"><span>无名五</span><span>抬杠</span><span>缠麻</span></div>
      <div class="row"><span>（空）</span><span>新娘</span><span>未填</span></div>
    </div>
    <div class="list">
      <p>喜期名单缺新娘，抬杠的人倒齐。缠麻是丧班常见。连秋穗的名字只出现在花车，不出现在人。30/44</p>
      <p>名单能让「真喜走错门」这一挡变软，不能单独把仪礼写死。还要看钥匙用途和晚秧那句换白。</p>
    </div>
""",
)

yellow(
    "team/permit.html",
    "通行复印件",
    """    <nav>
      <h4>分类</h4>
      <a href="index.html">广告</a>
      <a class="on" href="permit.html">复印件</a>
    </nav>
    <div class="list">
      <h4>临时通行条（扫描糊）</h4>
      <p>原件日期是去年连秋穗喜期。复印件把日子描深，章是旧的，印油发灰。花车栏仍写秋穗号。</p>
      <p>顾扃夹层里那张旧条，用途写喜期跟拍。两张像一套。一套不能让今夜变成喜。描过的日子，本台不当新证。31/44</p>
      <p><a href="../key/lastyear.html">夹层对照</a>　<a href="../mail/rework.html">作废原因</a></p>
    </div>
""",
)

# ---------- forum ----------

def forum(rel: str, title: str, inner: str, mark: str = "") -> None:
    js = f'<script src="../js/engine.js"></script><script>{mark}</script>' if mark else ""
    w(
        rel,
        f"""<!DOCTYPE html>
<html lang="zh-CN" class="skin-tieba-floors">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="../css/tieba-floors.css">
</head>
<body>
  <div class="bar"><div class="in"><span class="site">桐石巷口</span>
    <a href="list.html">帖单</a>
    <a href="../desk/home.html">回台</a>
  </div></div>
{inner}
  <div class="ft">地方讨论　不使用品牌　楼层自洽</div>
  {js}
</body>
</html>
""",
    )


forum(
    "forum/list.html",
    "巷口帖单",
    """  <div class="title">今夜还开帖的几条</div>
  <div class="floor"><div class="who"><div class="av"></div><b>列表</b><span class="n">置顶</span></div>
    <div class="txt"><span class="n">今夜</span>
      <p><a href="borrow.html">贺晚秧：先进去再换白（她想删）</a></p>
      <p><a href="step.html">卜巷：正门坎上有脚</a></p>
      <p><a href="idle.html">有人问灰什么时候清</a></p>
    </div>
  </div>
""",
)

forum(
    "forum/borrow.html",
    "先进去再换白",
    """  <div class="title">门口怎么又是红的</div>
  <div class="floor"><div class="who"><div class="av"></div><b>卜巷</b><span class="n">1楼</span></div>
    <div class="txt"><span class="n">19:22</span>
      <p>正门红布。窗口不是说丧事走侧门吗。侧门灰那么大，他们就改走正门？</p>
    </div></div>
  <div class="floor"><div class="who"><div class="av"></div><b>贺晚秧</b><span class="n">2楼</span></div>
    <div class="txt"><span class="n">19:31</span>
      <p>窗口卡丧。先顶喜队名。先进去再换白。别问那么细。</p>
      <div class="lzl">
        <div class="row"><b>贺晚秧</b>我说多了。<span class="n">19:33</span></div>
        <div class="row"><b>匿名</b>换白就是丧啊。<span class="n">19:36</span></div>
      </div>
    </div></div>
  <div class="floor"><div class="who"><div class="av"></div><b>姜篾</b><span class="n">3楼</span></div>
    <div class="txt"><span class="n">19:40</span>
      <p>二门我那柜关你们正门什么事。少把我写进去。</p>
    </div></div>
""",
    'MK.mark("seen.borrow");',
)

forum(
    "forum/step.html",
    "正门坎上有脚",
    """  <div class="title">我看见脚了</div>
  <div class="floor"><div class="who"><div class="av"></div><b>卜巷</b><span class="n">1楼</span></div>
    <div class="txt"><span class="n">19:41</span>
      <p>前排有人踩在正门坎上。摄像还蹲着拍。红布遮着，看不清脸。我又不是要告谁，我是说这坎今晚已经脏了。</p>
    </div></div>
  <div class="floor"><div class="who"><div class="av"></div><b>匿名</b><span class="n">2楼</span></div>
    <div class="txt"><span class="n">19:44</span>
      <p>夜岗不是有格子吗。你看见你就去记。记了别写我名。</p>
    </div></div>
  <div class="floor"><div class="who"><div class="av"></div><b>卜巷</b><span class="n">3楼</span></div>
    <div class="txt"><span class="n">19:46</span>
      <p>我记不了。我又没工号。格子在他们台上。33/44</p>
    </div></div>
""",
)

forum(
    "forum/idle.html",
    "灰什么时候清",
    """  <div class="title">侧门灰</div>
  <div class="floor"><div class="who"><div class="av"></div><b>路过</b><span class="n">1楼</span></div>
    <div class="txt"><span class="n">18:10</span>
      <p>侧门水泥袋还堆着。备案的人怎么走。指挥部回过没有。</p>
    </div></div>
  <div class="floor"><div class="who"><div class="av"></div><b>施工口</b><span class="n">2楼</span></div>
    <div class="txt"><span class="n">18:22</span>
      <p>明天清。今夜别从侧门抬大件。灰会扬。</p>
    </div></div>
  <div class="floor"><div class="who"><div class="av"></div><b>路过</b><span class="n">3楼</span></div>
    <div class="txt"><span class="n">18:30</span>
      <p>那丧班今夜就只能挤正门？你们这是逼人借名。</p>
    </div></div>
  <div class="floor"><div class="who"><div class="av"></div><b>施工口</b><span class="n">4楼</span></div>
    <div class="txt"><span class="n">18:31</span>
      <p>我管灰。名是窗口的事。34/44</p>
    </div></div>
""",
)

# ---------- mail ----------

def mail(rel: str, title: str, inner: str, top: str, folders: str, foot: str) -> None:
    w(
        rel,
        f"""<!DOCTYPE html>
<html lang="zh-CN" class="skin-mail-web-2010">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="../css/mail-web-2010.css">
</head>
<body>
  <div class="top">{top}</div>
  <div class="panes">
    <div class="folders">
{folders}
    </div>
{inner}
  </div>
  <p class="ft">{foot}</p>
</body>
</html>
""",
    )


mail(
    "mail/inbox.html",
    "公共箱",
    """    <div class="mails">
      <h4>今夜能点的两封</h4>
      <div class="m unread"><b><a href="rework.html">片子作废那张单</a></b><span>婚庆旧档</span></div>
      <div class="m unread"><b><a href="que.html">白班写给白班</a></b><span>阙禾自发</span></div>
      <div class="m"><b>水泥袋进场</b><span>施工　上月</span></div>
      <div class="m"><b>坡道验收草稿</b><span>阙禾　上月</span></div>
    </div>
    <div class="read">
      <h3>先点旧档</h3>
      <p>这两封不挡今夜交差。看了只解释板为什么硬。密码在门框字背面，进箱不用另猜。35/44</p>
      <p><img alt="" src="../img/old-car.jpg" width="100%"></p>
    </div>
""",
    top='<b>夜岗公共信箱</b> <a href="../desk/home.html">回值班</a>',
    folders='      <a class="on" href="inbox.html">来信</a>\n      <a href="javascript:void(0)">草稿夹</a>',
    foot="信箱门口　上月那两封是灰",
)

mail(
    "mail/rework.html",
    "片子作废单",
    """    <div class="mails">
      <h4>旧档</h4>
      <div class="m unread on"><b>片子作废那张单</b><span>婚庆旧档</span></div>
      <div class="m unread"><b><a href="que.html">白班写给白班</a></b><span>阙禾</span></div>
    </div>
    <div class="read">
      <h3>连秋穗喜期片子整卷不能用</h3>
      <p class="meta">发件人：某婚庆　收件人：桐石巷指挥部　去年</p>
      <p>摄像坐了贺宅正门门槛。跟拍机位作废。花车秋穗号，司机阮箔只开车，人没坐坎。指挥部当晚值班是阙禾。</p>
      <p>要求返工或退一半。后来怎么赔，不在这封。这封只把「坐坎」写进箱子。</p>
      <p>今夜有人拿秋穗号的名进同一条巷。这封不能证明今夜摄像还在，只能证明去年这坎因为坐过被追过责。36/44</p>
    </div>
""",
    top='<b>旧档一封</b> <a href="inbox.html">回列表</a>',
    folders='      <a href="inbox.html">来信</a>\n      <a class="on" href="rework.html">作废单</a>',
    foot="旧档正文　赔法不在页上",
)

mail(
    "mail/que.html",
    "阙禾给自己",
    """    <div class="mails">
      <h4>自发</h4>
      <div class="m unread"><b><a href="rework.html">片子作废那张单</a></b><span>婚庆</span></div>
      <div class="m unread on"><b>白班写给白班</b><span>阙禾　去年夜</span></div>
    </div>
    <div class="read">
      <h3>写给我自己，别外发</h3>
      <p class="meta">发件人：阙禾　收件人：阙禾　去年夜</p>
      <p>下次再有人用喜的名进这条巷，过门先按丧记。先看记录，再听嘴。窗口爱红，你别跟着红。</p>
      <p>试记口留给夜岗。我不当夜岗的笔。板要写死。写死了会有人嫌。嫌比再赔一回片子强。</p>
      <p>这封解释他为何写得硬。不看也能交对。看了，别把他的怕写成今夜铁证。37/44</p>
    </div>
""",
    top='<b>自发一封</b> <a href="inbox.html">回列表</a>',
    folders='      <a href="inbox.html">来信</a>\n      <a class="on" href="que.html">自发</a>',
    foot="自发未外发　怕不是铁证",
)

# ---------- folk baike ----------

def folk(rel: str, title: str, inner: str) -> None:
    w(
        rel,
        f"""<!DOCTYPE html>
<html lang="zh-CN" class="skin-baidu-baike">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="../css/baidu-baike.css">
</head>
<body>
  <div class="top"><div class="top-inner clearfix">
    <span class="logo">渠西旧俗抄</span>
    <a href="index.html">词目</a>
    <a href="../desk/home.html">回台</a>
  </div></div>
  <div class="wrap">
{inner}
  </div>
  <div class="site-foot">网友过录　勿查真志　38起</div>
</body>
</html>
""",
    )


folk(
    "folk/index.html",
    "旧俗抄目录",
    """    <h1>桐石一带门槛</h1>
    <p class="lemma">过录　非法令</p>
    <div class="toc"><h3>目录</h3><ul>
      <li>1 <a href="menkan.html">忌踏坐</a></li>
      <li>2 <a href="xishang.html">喜丧相反</a></li>
      <li>3 <a href="limit.html">旧抄不能定今夜</a></li>
    </ul></div>
    <div class="main">
      <table class="box">
        <tr><td colspan="2"><h3>基本</h3></td></tr>
        <tr><td class="k">对象</td><td>门槛</td></tr>
        <tr><td class="k">动词</td><td>跨、抬、停、挡</td></tr>
        <tr><td class="k">不写</td><td>镇煞口诀</td></tr>
      </table>
      <p>门槛分内外。脚要跨过去。坐、点、钉、顶柜，巷口都会骂没规矩。骂是口语。夜岗不当结案。38/44</p>
      <p><img alt="" src="../img/threshold-wood.jpg" width="100%"></p>
    </div>
""",
)

folk(
    "folk/menkan.html",
    "忌踏坐",
    """    <h1>忌踏坐</h1>
    <div class="main">
      <p>旧抄写：宾客不踏不坐。抬轿抬棺，杠要抬高，擦到坎，这一趟算脏。脏了要停，要另择，或至少不能再当干净的喜客放进堂。</p>
      <p>「踩门槛招鬼」是骂人。本抄不把它写成真。夜岗板上忌踏忌坐，来自格子，不来自鬼。</p>
      <p>坡道争议另页。把坡道写成得罪神明，是偏见，不是本抄结论。39/44</p>
      <p><img alt="" src="../img/pole-shadow.jpg" width="100%"></p>
    </div>
""",
)

folk(
    "folk/xishang.html",
    "喜丧相反",
    """    <h1>同一条坎，走法相反</h1>
    <div class="main">
      <p>喜事过门，人往里进，红的可以进堂待客。丧事出棺，人往外抬，杠更不能蹭。未净过的丧班，不该再当喜客放进内。</p>
      <p>窗口若只开红的格子，丧班会借名。借名是人的事。旧抄只写相反，不写今夜谁借了谁。</p>
      <p>把这页当成贺连舟队的定性，是跳。定性要靠簿子、短讯、帖。40/44</p>
      <p><img alt="" src="../img/hemp-cloth.jpg" width="100%"></p>
    </div>
""",
)

folk(
    "folk/limit.html",
    "旧抄不能定今夜",
    """    <h1>限度</h1>
    <div class="main">
      <p>这几页能说明忌踏坐、杠不得擦、喜丧相反。不能说明贺守石在不在堂屋，不能说明十九点四十那只脚是谁的，不能让建议变成钥匙。</p>
      <p>口述传说不当结案。县名虚构。别拿去查方志原文。41/44</p>
    </div>
""",
)

print("all pages written")

# 加厚薄页：每段只出现一次，避免 24 字进三页
THICK = {
    "desk/login.html": "<p class=\"hint\">阙禾走得急，口令没另设。门框内侧那一行被手油摸亮了，柴字后面是杠和四个数字。填错就停在这张白卡片上，台面的法你还看不见。看见法的人，才谈得上试记。</p>",
    "desk/try.html": "<p class=\"mk-side\">踩踏对应板上忌踏。擦杠对应杠不得蹭木头。两格打回的是同一条已证实，反馈句子不一样。你要听哪一句，自己选。选完还能再选，留下的那条不会叠成两条。</p>",
    "desk/try-ok.html": "<p class=\"mk-side\">演练像白班让新来的人走一遍干净动作。走完，格子仍空着。门口那队十九点四十已经脏过，你走干净填不上那一格。想留下证明，回去改选，或去记录页看别人写下的脏。</p>",
    "desk/try-reject.html": "<p class=\"mk-side\">打回不是罚你。罚的话会毁档。本台偏要把撞过的留下，让你交差时有东西可指。指完仍只是建议。匙在东厢，顾扃早上才肯看回单。</p>",
    "desk/advise.html": "<p class=\"mk-side\">四栏像阙禾怕的那种表：红白、脏净、进不进、你有没有越权。空着交会退。半对也退。退了台面还在，已证实还在。别把退回当成毁档。</p>",
    "desk/shift.html": "<p class=\"mk-side\">他写两句就骑车走了。巷口灯还没全亮。我听第一句像嫌我手贱，听第二句又像留了条活路。活路就是试记。试记不是让我改法，是让我自己撞一次，撞完才肯信板是真的。</p>",
    "desk/memo.html": "<p class=\"mk-side\">墨涂掉的那两个字我后来在黄页花车栏看见了。秋穗。去年的人。今夜的队借她的名。借名的事备忘只露边，正文在帖里，在钥匙夹层里。</p>",
    "desk/hint.html": "<p class=\"mk-side\">小条是前任夜岗怕后任空转才留的。一折二折几乎送。三折才让你离开台面。四折摊开四栏，看了就少一层自己对的过程，能忍就忍。</p>",
    "desk/result-letin.html": "<p class=\"mk-side\">放行回单会进白班早上的夹子。阙禾若还在，会先翻记录再翻你的四栏。翻完他不一定骂，他会把板擦了重写，写得更死。更死的板留给下一个夜岗。</p>",
    "desk/result-rewrite.html": "<p class=\"mk-side\">越权回单也进夹子。夹子里会多一行：夜岗要动板。动板的人明天不用来。临工名本来就不印钥匙，印在这一行里反而重。</p>",
    "phone/inbox.html": "<p>机子贴在值班桌腿上，充电线缠了胶布。三条短讯都是今夜的。穆三刀最早怕，连舟最早圆，顾扃最晚才肯回一个字以上。点开才算看见，列表标题不能当正文。</p><p>流量按条计。指挥部不报销私人聊天。你用这台机只看这三封就够交差。</p>",
    "phone/mu.html": "<p>他打字慢，像戴手套。贺守石三个字他肯写，连舟两个字他不肯在门口喊。帮忙的人把脏的一趟扔给记格子的人，自己只求别上记录员那一栏。</p><p>等抬的意思是丧还没走完。走完才谈进堂布置。布置的匙下午就发了，用途写丧。他这句话跟簿子对得上。</p>",
    "phone/he.html": "<p>四个字加句号，像怕写长了露馅。秋穗号是花车，不是新娘。用途你别管，是他后来才补的，补的时候钥匙已经在他口袋里。</p><p>刁难二字他用得很顺。窗口爱红，他就把夜岗也当成窗口。夜岗不是窗口。夜岗只记过门。</p>",
    "phone/gu.html": "<p>顾扃不爱用机子。这条像被连舟催急了才回。第二把是红穗那种装饰匙，匣子里根本没有。没有的东西他不补。</p><p>早上再看，指的是你的建议回单，不是他夜里改簿子。簿子下午就写死了。</p>",
    "forum/list.html": "<div class=\"floor\"><div class=\"who\"><div class=\"av\"></div><b>版务</b><span class=\"n\">闲</span></div><div class=\"txt\"><span class=\"n\">傍晚</span><p>巷口帖只管今夜还开着的楼。旧楼沉了。沉了的别翻，翻了也跟贺宅正门无关。灰的那条问侧门，红的那条问借名，脚的那条问坎。三条够你对。</p></div></div>",
    "forum/idle.html": "<div class=\"floor\"><div class=\"who\"><div class=\"av\"></div><b>路过</b><span class=\"n\">5楼</span></div><div class=\"txt\"><span class=\"n\">18:40</span><p>灰清不清我管不着。我只知道侧门今夜抬不了棺。正门就会挤。挤的人要是再借个红名，夜岗那边会不会记，我不知道。我问过施工，施工说他不管名。</p></div></div>",
    "forum/step.html": "<div class=\"floor\"><div class=\"who\"><div class=\"av\"></div><b>匿名</b><span class=\"n\">4楼</span></div><div class=\"txt\"><span class=\"n\">19:50</span><p>摄像蹲着不稀奇，喜丧都蹲。稀奇的是脚在坎上还让人拍。夜岗格子若空着，不是没发生，是没人肯签名。空和干净是两回事。</p></div></div>",
    "forum/borrow.html": "<div class=\"floor\"><div class=\"who\"><div class=\"av\"></div><b>卜巷</b><span class=\"n\">4楼</span></div><div class=\"txt\"><span class=\"n\">19:50</span><p>晚秧那句换白，我截过。她后来求我删，我没删。删了夜岗更看不见。看见了也别把我写成证人，我只是问门口为什么红。</p></div></div>",
    "folk/limit.html": "<p>有人把旧抄打印出来往建议表上一贴，当自己读过今夜。贴了也不算打开过短信，不算打开过簿子。旧抄是背景。背景不能替你勾四栏。</p><p>虚构县名写在页脚，免得真有人拿去对乡志。对上也是别人的乡。</p>",
    "folk/index.html": "<p>词目是网友从几本改了县名的民俗摘里拼的。拼的人不是礼生。拼完挂在这里，给修缮指挥部夜岗备查。备查不等于备案。备案在侧门，侧门今夜走不通。</p>",
    "folk/menkan.html": "<p>脏了要停，是旧抄的口气。今夜停不停，轮不到旧抄决定。夜岗只能建议不放行。不放行之后，人还在门口，棺还在等抬。等抬的事归家里，不归词条。</p>",
    "folk/xishang.html": "<p>相反写得很漂亮，用起来却脏。窗口开红格，丧班就借红名。借了名，走法还是丧的走法：抬、杠、缠麻。黄页上的红布遮不住名单上的空新娘。</p>",
    "key/index.html": "<p>匣子钥匙齿磨亮了，钩子空着，说明今夜那把已经发出去。发出去的那一行在领用页。管理员不在东厢过夜，夜里只回短讯，短讯更冷。</p>",
    "key/limit.html": "<p>有人把未归还写成已经进堂办完丧。跳了两步。未归还只说明匙还在连舟口袋。口袋里的匙打不开夜岗的建议权，也改不了板上的法。</p>",
    "key/log.html": "<p>十六点二十天还亮着。连舟签字写得工整，像接活的人。用途三个字是顾扃的笔，更硬。夜里改口发生在短讯里，不发生在这一格。这一格没有第二行。</p>",
    "key/note.html": "<p>匣盖内侧的字用油漆笔，怕潮。他写「争的人多半心里有数」，不像公文，像嫌烦。嫌烦的人偏偏把用途写清楚，清楚了才有东西顶嘴。</p>",
    "key/lastyear.html": "<p>夹层发黄。归还勾打得很死。追责那一行是后来补的，墨色浅。补的人可能是阙禾，也可能是下一个白班。浅墨不能当签名鉴定，只能当去年这坎被追过责的旁证。</p>",
    "team/permit.html": "<p>扫描件边缘有两次进扫描器的黑道。日子那一格被笔描过，描痕比章新。新的描痕最像心虚。心虚不能单独定丧，要跟缺新娘、用途写丧放在一起看。</p>",
    "team/route.html": "<p>他强调跨坎，是怕夜岗让他走坡道。坡道归出行，走了就不像仪礼。像仪礼的代价是坎高、杠沉、脚容易踩。他选了像，就得承担脏。</p>",
    "team/roster.html": "<p>无名四、无名五他懒得写姓。缠麻两字他写得随意，像没想过夜岗会点开。点开的人会把缠麻和空新娘放在同一眼。同一眼还不够，还要去看晚秧那句换白。</p>",
    "team/index.html": "<p>红布照片是他自己拍的，皱，光板。档期栏目点了不会开，灰着，像所有免费黄页的假按钮。假按钮后面没有档期表。有的只是今夜这一趟。</p>",
    "public/noise.html": "<p>姜篾后来把柜挪到坡道边，又被人骂挡出行。骂来骂去都在二门和东侧。正门那条木坎他碰不到。碰不到的事，别写进今夜回单。</p>",
    "mail/inbox.html": "<p>上月两封是灰：水泥和坡道。今夜用不上。用得上的是旧档和自发。两封都写去年，去年的怕落在今夜的板上。板已经写死，信只解释，不增删法条。</p>",
}

for rel, chunk in THICK.items():
    p = ROOT / rel
    t = p.read_text(encoding="utf-8")
    if "</body>" not in t:
        raise SystemExit(f"no body {rel}")
    t = t.replace("</body>", chunk + "\n</body>", 1)
    p.write_text(t, encoding="utf-8")
    print("thick", rel)

MORE = {
    "desk/home.html": "<p class=\"mk-side\">待记那一行是给你撞的。十九点四十那一行是已经撞过的。两行都在正门。二门那柜别看。对外书签在下头，离开台面之前，至少把法读完。读完再决定要不要故意记一条脏的。</p>",
    "desk/board.html": "<p class=\"mk-side\">须知比板上多几句人话。人话里有窗口爱红，有试记口，有十九点四十。多出来的句子仍是白班口气，不是让你改板。改板的格子在建议表，勾了会走另一张回单。</p>",
    "desk/record.html": "<p class=\"mk-side\">记录员栏空着，我第一眼当没人值班。后来才懂：有人看见了，不肯把名写上去。空签名和干净动作不是同一种空。干净要写正常跨。空是谁都不肯认那一脚。</p>",
    "desk/result-hold.html": "<p class=\"mk-side\">回单收下不放行，门口的人不会立刻散。散不散归家里。家里若还要抬，抬去侧门，侧门灰大，那是白天窗口留下的烂摊子。夜岗把格子写明白，已经是这班能做的尽头。</p>",
    "index.html": "<p style=\"width:90%;margin:12px auto;font-size:13px;\">对外页白天给人看工期。夜里没人维护。灰着的参观预约从来没开过。开过的只有窗口口径。口径和夜岗板并排挂着，像两张嘴。哪张嘴能定今夜，不在这页写完。</p>",
    "public/tonight.html": "<p>柜台阿姨下午跟丧班说话时，手里转着圆珠笔，说侧门备案三个字转了两圈。转完她去收一户喜事登记，登记的人跟贺家无关。无关的喜不能拿来给连舟当护身。</p>",
    "public/threshold.html": "<p>木纹里有一道新的浅白刮痕。施工说是砂纸。邻里说是杠。对外页不鉴定刮痕。鉴定不了的东西，夜岗也不写进回单原因，只写格子里已经有的字。</p>",
    "public/access.html": "<p>有人把「能进堂」理解成「夜岗应当放行」。能进是钥匙室的话。应当放行是建议表的话。两句话中间隔着板上的法。法还在，应当两个字就轮不到黄页来用。</p>",
    "mail/rework.html": "<p>阮箔后来打过一次电话到指挥部，说自己只开车，别把坐坎算他头上。电话没留录音。这封邮件也没提他争什么。争的人多，坐下去的是摄像。摄像今夜在不在，这封回答不了。</p>",
    "mail/que.html": "<p>他写「嫌比再赔一回片子强」的时候，大概已经决定把法写死。写死之后，夜岗若来改板，他就有理由把责任推回去。推回去不是害你。是他不想再当被追责的那一个白班。</p>",
    "introduction.html": "<p>我骑车进来时巷口有红布，远远看像喜。近了才听见有人喊抬。喊抬的声音被布挡住，对外页听不见。对外页只写窗口。窗口爱红。我若跟着红，阙禾那两句就白写了。白写也行，临工名不印钥匙。可格子会印。</p>",
    "desk/login.html": "<p class=\"hint\">进台之后先看板，别先写建议。建议随时能开，开早了会退。退了你才想起试记。想起也不晚，已证实清不掉。</p>",
}

for rel, chunk in MORE.items():
    p = ROOT / rel
    t = p.read_text(encoding="utf-8")
    t = t.replace("</body>", chunk + "\n</body>", 1)
    p.write_text(t, encoding="utf-8")
    print("more", rel)

WAVE3 = {
    "desk/home.html": "<p class=\"mk-side\">书签九个站，挨个打开是为了对字段，不是去关别人的页。你的差事是撞法、看格子、交建议。打开过的来源，本台会留下已证实，刷新也不清。</p>",
    "phone/inbox.html": "<p>三条之外还有广告短讯，我删了。删了的不能回来。回来的只有这三条。三条够把嘴和条对上。</p>",
    "folk/menkan.html": "<p>抬高两个字写起来轻。杠在肩上并不轻。穆三刀听见皮蹭木头，旧抄在这一句上用得着，用完仍要回到格子。</p>",
    "team/index.html": "<p>接活的人把「按喜走」写进黄页，像把窗口口径复印了一遍。复印件没有新娘，没有守石，只有红。</p>",
    "key/note.html": "<p>东厢夜里不上锁。不上锁不等于谁都能改簿子。簿子钉在桌上，笔在抽屉，抽屉他带走了。</p>",
    "forum/borrow.html": "<p>姜篾插进来是怕自己被写成正门那一脚。他二门有柜，柜跟红布无关。无关的人最急着声明无关。</p>",
    "public/tonight.html": "<p>喜事登记那一户姓吴，住巷尾，跟贺宅不共用门槛。共用门槛的只有今夜这队。队名是借的。</p>",
    "desk/board.html": "<p class=\"mk-side\">「你听嘴，你会放错」这一句像骂人。骂完他又把试记口留下。留下的人自己不当夜岗，不当夜岗的人最会写硬法。</p>",
    "desk/try.html": "<p class=\"mk-side\">三选一次交。交完要么打回留证，要么演练空手。空手也能去记录页，记录页不靠你试，它自己已经脏了。</p>",
    "introduction.html": "<p>门框字揭了重来，只是怕自己把留下的那条当成永远有效。揭了，格子还能再撞。撞完还是那一条。</p>",
    "mail/rework.html": "<p>整卷不能用五个字下面还有一行小字，复印浅了：机位含门槛特写。特写把坐姿拍清楚了，清楚了才没法赖。</p>",
    "desk/advise.html": "<p class=\"mk-side\">权限那一栏画得像能批准。能画出批准，是让你看见越权长什么样。长什么样你勾了就知道，回单会另走。</p>",
}

for rel, chunk in WAVE3.items():
    p = ROOT / rel
    t = p.read_text(encoding="utf-8")
    t = t.replace("</body>", chunk + "\n</body>", 1)
    p.write_text(t, encoding="utf-8")
    print("w3", rel)

WAVE4 = {
    "folk/xishang.html": "<p>往里进和往外抬，脚都要离木头。离不离得开，看肩上沉不沉。沉的那一趟最容易借红名，因为红名走正门不用挤灰。</p>",
    "key/log.html": "<p>未打勾三个字用红笔。红笔在钥匙室只表示未归还，不表示喜。喜不喜看用途，用途写丧。</p>",
    "desk/shift.html": "<p class=\"mk-side\">公共箱密码跟工号背靠背，省得再写一张。写多了会丢。丢了的条我见过，在抽屉碎纸里。</p>",
    "phone/mu.html": "<p>他最后没署名。机子显示的名是指挥部存的。存的时候大概是白天哪个白班问过他电话。</p>",
    "team/roster.html": "<p>抬头那一行「他自己贴的」是黄页默认。默认不审。不审的名单才会把缠麻和空新娘放一起。</p>",
    "desk/record.html": "<p class=\"mk-side\">同队前排四个字含糊。含糊正好。本台不认脸，认动作。动作写踩踏，备注写摄像还蹲着。</p>",
    "public/access.html": "<p>灰着的预约钮从去年就灰。灰着并不等于堂屋锁死。锁死与否看顾扃那一把，那一把今夜在连舟口袋。</p>",
}

for rel, chunk in WAVE4.items():
    p = ROOT / rel
    t = p.read_text(encoding="utf-8")
    t = t.replace("</body>", chunk + "\n</body>", 1)
    p.write_text(t, encoding="utf-8")
    print("w4", rel)

WAVE5 = {
    "desk/try-reject.html": "<p class=\"mk-side\">刷新按钮就在旁边。按了，黄条子还在。还在你才肯信本台不是吓唬人。</p>",
    "folk/limit.html": "<p>词条编辑栏写着网友，网友不敢具名。不敢具名的抄本，更不能抬去开堂门。</p>",
    "phone/he.html": "<p>秋穗号三个字他用得很顺，顺得像自己的车。车不是他的。车名是去年留下的。</p>",
    "key/lastyear.html": "<p>跟拍进堂四个字，去年是真喜。真喜也会脏坎。脏了就返工。返工单今夜被人拿来当护身，护不住。</p>",
}

for rel, chunk in WAVE5.items():
    p = ROOT / rel
    t = p.read_text(encoding="utf-8")
    t = t.replace("</body>", chunk + "\n</body>", 1)
    p.write_text(t, encoding="utf-8")
    print("w5", rel)

WAVE6 = {
    "forum/step.html": "<p>蹲着拍的人后来把机子收回布里。布是红的。红的布遮不住格子里已经写下的脚。</p>",
    "desk/result-rewrite.html": "<p class=\"mk-side\">板还在原处。原处的字被你这一栏顶过一次，顶完字还在，回单却走了废的那张。</p>",
    "phone/gu.html": "<p>催第二把的电话他没接。没接的人用短讯把话堵死，堵死了才肯睡觉。睡前他把匣盖盖上，盖上也不上锁。</p>",
    "public/noise.html": "<p>投诉栏末尾有一句：二门事结。结了就别翻进正门回单。</p>",
}

for rel, chunk in WAVE6.items():
    p = ROOT / rel
    t = p.read_text(encoding="utf-8")
    t = t.replace("</body>", chunk + "\n</body>", 1)
    p.write_text(t, encoding="utf-8")
    print("w6", rel)

p = ROOT / "desk/try-ok.html"
t = p.read_text(encoding="utf-8")
t = t.replace("</body>", "<p class=\"mk-side\">空手回来也不算白走，至少你知道演练和打回不是同一张脸。</p>\n</body>", 1)
p.write_text(t, encoding="utf-8")
print("w7 desk/try-ok.html")


