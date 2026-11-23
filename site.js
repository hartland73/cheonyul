/* 천율 공개 사이트 설정 — 앱스토어 주소가 생기면 여기만 고친다.
 * 문의 메일·운영자 정보는 policy.js(앱과 같은 글, make_site.py 가 13_웹앱 에서 복사)의 OPERATOR 에서 온다. */
window.CHEONYUL_SITE = {
  appStoreUrl: '',          // 예: https://apps.apple.com/kr/app/id0000000000 — 비어 있으면 「준비 중」
};

(function () {
  var P = window.CHEONYUL_POLICY, S = window.CHEONYUL_SITE;
  function fill() {
    if (P) {
      document.querySelectorAll('[data-pol]').forEach(function (el) { el.innerHTML = P[el.dataset.pol](); });
      document.querySelectorAll('[data-pol-ver]').forEach(function (el) { el.textContent = '시행일 ' + P.VERSION; });
      var op = P.OPERATOR || {};
      document.querySelectorAll('[data-contact]').forEach(function (el) {
        if (op.contact) {
          var a = document.createElement('a');
          a.href = /@/.test(op.contact) ? 'mailto:' + op.contact : op.contact;
          a.textContent = op.contact;
          el.textContent = '';
          el.appendChild(a);
        } else {
          el.textContent = '문의처를 준비하고 있습니다.';
        }
      });
      document.querySelectorAll('[data-op-name]').forEach(function (el) { el.textContent = op.name || '천율'; });
    }
    document.querySelectorAll('[data-appstore]').forEach(function (el) {
      if (S.appStoreUrl) { el.href = S.appStoreUrl; el.removeAttribute('aria-disabled'); el.textContent = 'App Store 에서 받기'; }
      else { el.setAttribute('aria-disabled', 'true'); el.textContent = 'App Store 출시 준비 중'; }
    });
    var y = document.querySelector('[data-year]');
    if (y) y.textContent = String(new Date().getFullYear());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();
})();
