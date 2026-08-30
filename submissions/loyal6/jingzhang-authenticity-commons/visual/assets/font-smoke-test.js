(function () {
  "use strict";
  async function run() {
    try {
      const chars = Array.from(new Set(document.body.innerText.replace(/\s/g,""))).join("");
      const faces = await document.fonts.load('400 18px "JZAC Noto Sans SC"',chars);
      await document.fonts.ready;
      const exact = faces.some(face => face.family.replace(/["']/g,"")==="JZAC Noto Sans SC" && face.status==="loaded");
      document.documentElement.dataset.cjkFontSmoke = exact ? "pass" : "fail";
      window.__JZAC_CJK_FONT_SMOKE__ = {passed:exact,scope:"exact_font_load_only_complemented_by_cmap_and_screenshot_checks",sampledCharacters:chars.length};
    } catch(error) {
      document.documentElement.dataset.cjkFontSmoke = "fail";
      window.__JZAC_CJK_FONT_SMOKE__ = {passed:false,error:String(error)};
    }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",run,{once:true}); else run();
})();
