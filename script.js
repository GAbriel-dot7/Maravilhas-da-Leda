/* =====================================================================
   MARAVILHAS D'LEDA — CARDÁPIO DIGITAL
   JavaScript puro, sem frameworks ou bibliotecas externas.
   ===================================================================== */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5519992037285";

  /* ------------------------------------------------------------------
     1) BOTÕES DE PEDIDO — monta o link do WhatsApp com a mensagem certa.
        Mantém um href básico no HTML (sem JS o botão ainda abre o chat,
        só sem a mensagem pré-preenchida).
     ------------------------------------------------------------------ */
  function montarLinksWhatsApp() {
    var botoes = Array.prototype.slice.call(document.querySelectorAll("[data-msg]"));
    botoes.forEach(function (el) {
      var mensagem = el.getAttribute("data-msg");
      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(mensagem);
      el.setAttribute("href", url);
    });
  }

  /* ------------------------------------------------------------------
     2) BUSCA EM TEMPO REAL
     ------------------------------------------------------------------ */
  function configurarBusca() {
    var input = document.getElementById("busca-prato");
    var vazio = document.getElementById("search-empty");
    if (!input) return;

    var itens = Array.prototype.slice.call(document.querySelectorAll(".menu-item"));
    var diaSecoes = Array.prototype.slice.call(document.querySelectorAll(".day-section"));

    input.addEventListener("input", function () {
      var termo = input.value.trim().toLowerCase();
      var algumVisivel = false;

      itens.forEach(function (item) {
        var nome = (item.getAttribute("data-name") || "") + " " + item.textContent.toLowerCase();
        var corresponde = termo === "" || nome.toLowerCase().indexOf(termo) !== -1;
        item.classList.toggle("is-hidden", !corresponde);
        if (corresponde) algumVisivel = true;
      });

      // Esconde a seção do dia inteira quando nenhum item dela corresponde.
      diaSecoes.forEach(function (secao) {
        var temVisivel = secao.querySelectorAll(".menu-item:not(.is-hidden)").length > 0;
        secao.style.display = temVisivel ? "" : "none";
      });

      if (vazio) vazio.hidden = algumVisivel;
    });
  }

  /* ------------------------------------------------------------------
     3) NAVEGAÇÃO ATIVA AO ROLAR A PÁGINA
     ------------------------------------------------------------------ */
  function configurarNavegacaoAtiva() {
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var alvoPorId = {};
    links.forEach(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      alvoPorId[id] = link;
    });

    var secoes = ["inicio", "refeicoes", "lanches", "sucos", "contato"]
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); l.removeAttribute("aria-current"); });
          var ativo = alvoPorId[entrada.target.id];
          if (ativo) { ativo.classList.add("active"); ativo.setAttribute("aria-current", "true"); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    secoes.forEach(function (secao) { observer.observe(secao); });
  }

  /* ------------------------------------------------------------------
     4) DESTAQUE DO DIA ATUAL + AVISO DE FECHADO (domingo)
     ------------------------------------------------------------------ */
  function destacarDiaAtual() {
    var hoje = new Date().getDay(); // 0 = domingo ... 6 = sábado
    var infoHorario = document.getElementById("header-info");

    if (hoje === 0) {
      if (infoHorario) {
        infoHorario.classList.add("header-info--closed");
        var textoHoras = document.getElementById("hours-text");
        if (textoHoras) {
          textoHoras.textContent = "Fechado hoje (domingo) — voltamos segunda-feira às 10:30";
        }
      }
      return;
    }

    var secoesComDia = Array.prototype.slice.call(document.querySelectorAll(".day-section[data-day]"));
    secoesComDia.forEach(function (secao) {
      var dias = secao.getAttribute("data-day").split(",").map(Number);
      if (dias.indexOf(hoje) !== -1) {
        secao.classList.add("is-today");
        var flag = secao.querySelector(".today-flag");
        if (flag) flag.hidden = false;
      }
    });
  }

  /* ------------------------------------------------------------------
     5) ANO NO RODAPÉ
     ------------------------------------------------------------------ */
  function preencherAno() {
    var span = document.getElementById("footer-year");
    if (span) span.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    montarLinksWhatsApp();
    configurarBusca();
    configurarNavegacaoAtiva();
    destacarDiaAtual();
    preencherAno();
  });
})();