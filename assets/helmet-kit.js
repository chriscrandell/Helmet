/*
  Helmet hub — reusable page tools
  ---------------------------------
  Small helpers shared by the section pages. Everything typed into a page is
  saved in this browser's localStorage. Use the Export button on a page to
  download a JSON backup (and Import to restore it, or move it to another
  computer/browser).

    HelmetKit.checklists()          persist every <ul class="checklist" data-key="...">
                                    (each <li data-id="..."> gets a checkbox)
    HelmetKit.log(el, opts)         a dated log with a form (build log, dev log…)
    HelmetKit.table(el, opts)       an editable record table (idea tracker…)
    HelmetKit.backup(el, keys)      Export / Import buttons for the given storage keys
*/
(function () {
  function read(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn("Could not save", key, e); }
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function today() { return new Date().toISOString().slice(0, 10); }
  function $(el) { return typeof el === "string" ? document.querySelector(el) : el; }

  function checklists() {
    document.querySelectorAll("ul.checklist[data-key]").forEach(function (ul) {
      var key = ul.getAttribute("data-key");
      var state = read(key, {});
      ul.querySelectorAll("li[data-id]").forEach(function (li) {
        var id = li.getAttribute("data-id");
        if (!li.querySelector("input[type=checkbox]")) {
          var text = li.innerHTML;
          li.innerHTML = '<input type="checkbox" aria-label="Done"><span>' + text + "</span>";
        }
        var box = li.querySelector("input[type=checkbox]");
        box.checked = !!state[id];
        li.classList.toggle("done", box.checked);
        box.addEventListener("change", function () {
          var s = read(key, {});
          if (box.checked) s[id] = today(); else delete s[id];
          write(key, s);
          li.classList.toggle("done", box.checked);
          ul.dispatchEvent(new CustomEvent("checklist-change"));
        });
      });
    });
  }

  function checklistProgress(key, total) {
    var s = read(key, {});
    return { done: Object.keys(s).length, total: total };
  }

  /* opts: { key, fields: [{name, label, type: "text"|"textarea"|"date"|"number"|"select", options}], titleField, empty } */
  function log(el, opts) {
    el = $(el);
    var formId = "f-" + opts.key;
    function fieldHtml(f) {
      var input;
      if (f.type === "textarea") input = '<textarea name="' + f.name + '"></textarea>';
      else if (f.type === "select") input = '<select name="' + f.name + '">' + f.options.map(function (o) { return "<option>" + esc(o) + "</option>"; }).join("") + "</select>";
      else input = '<input name="' + f.name + '" type="' + (f.type || "text") + '"' + (f.type === "date" ? ' value="' + today() + '"' : "") + ">";
      return '<label style="' + (f.type === "textarea" ? "grid-column:1/-1" : "") + '">' + esc(f.label) + input + "</label>";
    }
    el.innerHTML =
      '<form id="' + formId + '" class="panel"><div class="form-grid">' + opts.fields.map(fieldHtml).join("") +
      '</div><div class="btn-row"><button class="btn primary" type="submit">Add entry</button></div></form><div class="log-list"></div>';
    var form = el.querySelector("form");
    var list = el.querySelector(".log-list");

    function render() {
      var entries = read(opts.key, []);
      list.innerHTML = entries.length ? entries.map(function (e, i) {
        var body = opts.fields.filter(function (f) { return f.name !== "date" && f.name !== opts.titleField && e[f.name]; })
          .map(function (f) { return "<p><strong>" + esc(f.label) + ":</strong> " + esc(e[f.name]) + "</p>"; }).join("");
        return '<div class="entry"><div class="meta"><span>' + esc(e.date || "") + '</span><button class="btn small" data-del="' + i + '">Delete</button></div>' +
          (opts.titleField ? "<h3 style=\"margin:6px 0 0\">" + esc(e[opts.titleField]) + "</h3>" : "") + body + "</div>";
      }).join("") : '<p class="muted">' + esc(opts.empty || "No entries yet.") + "</p>";
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = String(v).trim(); });
      if (!data.date) data.date = today();
      var entries = read(opts.key, []);
      entries.unshift(data);
      write(opts.key, entries);
      form.reset();
      var d = form.querySelector('input[type="date"]'); if (d) d.value = today();
      render();
    });
    list.addEventListener("click", function (ev) {
      var i = ev.target.getAttribute("data-del");
      if (i == null) return;
      var entries = read(opts.key, []);
      entries.splice(Number(i), 1);
      write(opts.key, entries);
      render();
    });
    render();
    return { render: render };
  }

  /* opts: { key, columns: [{name, label, type, options}], empty, onChange } — rows editable inline */
  function table(el, opts) {
    el = $(el);
    function cell(row, c, i) {
      var v = row[c.name] == null ? "" : row[c.name];
      if (c.type === "select") {
        return '<select data-row="' + i + '" data-col="' + c.name + '">' + c.options.map(function (o) {
          return "<option" + (o === v ? " selected" : "") + ">" + esc(o) + "</option>";
        }).join("") + "</select>";
      }
      if (c.type === "textarea") return '<textarea data-row="' + i + '" data-col="' + c.name + '" rows="2">' + esc(v) + "</textarea>";
      return '<input data-row="' + i + '" data-col="' + c.name + '" type="' + (c.type || "text") + '" value="' + esc(v) + '">';
    }
    function render() {
      var rows = read(opts.key, []);
      el.innerHTML = rows.length
        ? '<div class="table-wrap"><table><thead><tr>' + opts.columns.map(function (c) { return "<th>" + esc(c.label) + "</th>"; }).join("") +
          "<th></th></tr></thead><tbody>" + rows.map(function (r, i) {
            return "<tr>" + opts.columns.map(function (c) { return '<td style="min-width:' + (c.width || 120) + 'px">' + cell(r, c, i) + "</td>"; }).join("") +
              '<td><button class="btn small" data-remove="' + i + '">Remove</button></td></tr>';
          }).join("") + "</tbody></table></div>"
        : '<p class="muted">' + esc(opts.empty || "Nothing here yet.") + "</p>";
      if (opts.onChange) opts.onChange(rows);
    }
    el.addEventListener("change", function (ev) {
      var i = ev.target.getAttribute("data-row");
      if (i == null) return;
      var rows = read(opts.key, []);
      var col = ev.target.getAttribute("data-col");
      var c = opts.columns.filter(function (x) { return x.name === col; })[0];
      rows[i][col] = c && c.type === "number" && ev.target.value !== "" ? Number(ev.target.value) : ev.target.value;
      write(opts.key, rows);
      if (opts.onChange) opts.onChange(rows);
    });
    el.addEventListener("click", function (ev) {
      var i = ev.target.getAttribute("data-remove");
      if (i == null) return;
      var rows = read(opts.key, []);
      rows.splice(Number(i), 1);
      write(opts.key, rows);
      render();
    });
    render();
    return {
      add: function (row) { var rows = read(opts.key, []); rows.push(row); write(opts.key, rows); render(); },
      rows: function () { return read(opts.key, []); },
      render: render
    };
  }

  function backup(el, keys, filename) {
    el = $(el);
    el.innerHTML = '<div class="btn-row"><button class="btn small" type="button" data-act="export">⬇ Export backup</button>' +
      '<label class="btn small" style="display:inline-flex">⬆ Import backup<input type="file" accept="application/json" hidden></label></div>';
    el.querySelector('[data-act="export"]').addEventListener("click", function () {
      var data = {};
      keys.forEach(function (k) { data[k] = read(k, null); });
      var blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), data: data }, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (filename || "helmet-backup") + "-" + today() + ".json";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    el.querySelector('input[type="file"]').addEventListener("change", function (ev) {
      var file = ev.target.files[0];
      if (!file) return;
      file.text().then(function (txt) {
        var parsed = JSON.parse(txt);
        Object.keys(parsed.data || {}).forEach(function (k) {
          if (keys.indexOf(k) !== -1 && parsed.data[k] != null) write(k, parsed.data[k]);
        });
        location.reload();
      }).catch(function () { el.insertAdjacentHTML("beforeend", '<p class="small" style="color:var(--danger)">That file could not be read as a backup.</p>'); });
    });
  }

  window.HelmetKit = { read: read, write: write, esc: esc, today: today, checklists: checklists, checklistProgress: checklistProgress, log: log, table: table, backup: backup };
})();
