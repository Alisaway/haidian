(function () {
  "use strict";

  document.querySelectorAll("[data-award-walkthrough]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll("[role='tab']"));
    var panels = Array.prototype.slice.call(root.querySelectorAll("[role='tabpanel']"));

    function selectTab(tab) {
      var target = tab.getAttribute("aria-controls");
      tabs.forEach(function (item) {
        var active = item === tab;
        item.setAttribute("aria-selected", active ? "true" : "false");
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.id !== target;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        selectTab(tab);
      });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }
        event.preventDefault();
        var direction = event.key === "ArrowRight" ? 1 : -1;
        var next = (index + direction + tabs.length) % tabs.length;
        tabs[next].focus();
        selectTab(tabs[next]);
      });
    });

    if (tabs.length) {
      selectTab(tabs[0]);
    }
  });
}());
