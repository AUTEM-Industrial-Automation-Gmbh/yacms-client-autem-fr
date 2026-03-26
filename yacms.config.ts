import { defineConfig } from "@yacms/core/config";

const GA4_ID = "G-CKH4RH98D2";

export default defineConfig({
  scripts: {
    head: [
      // ─── Klaro consent manager ────────────────────────────────
      // Config must be defined before the Klaro script loads.
      {
        name: "klaro-config",
        content: `
          window.klaroConfig = {
            storageMethod: 'localStorage',
            cookieName: 'klaro-consent',
            privacyPolicy: '/mentions-legales',
            lang: 'fr',
            translations: {
              fr: {
                consentNotice: {
                  description: 'Nous utilisons des services tiers pour analyser notre trafic et vous offrir un support en direct. Vous pouvez choisir les services que vous acceptez.',
                },
                ok: 'Tout accepter',
                acceptAll: 'Tout accepter',
                acceptSelected: 'Accepter la sélection',
                decline: 'Refuser',
                close: 'Fermer',
                purposes: {
                  analytics: 'Statistiques',
                  chat: 'Support en direct',
                },
              },
            },
            services: [
              {
                name: 'google-analytics',
                title: 'Google Analytics',
                purposes: ['analytics'],
                default: true,
              },
              {
                name: 'tawk-to',
                title: 'Tawk.to Chat',
                purposes: ['chat'],
                default: true,
              },
            ],
          };
        `,
      },
      {
        name: "klaro",
        src: "https://cdn.kiprotect.com/klaro/v0.7/klaro.js",
        async: true,
      },

      // ─── GA4 — consent-gated via Klaro ───────────────────────
      // {
      //   name: "google-analytics",
      //   src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`,
      //   async: true,
      //   consent: "google-analytics",
      // },
      // {
      //   name: "ga4-init",
      //   content: `
      //     window.dataLayer = window.dataLayer || [];
      //     function gtag() { dataLayer.push(arguments); }
      //     gtag('js', new Date());
      //     gtag('config', '${GA4_ID}');
      //   `,
      //   consent: "google-analytics",
      // },
    ],

    body: [
      // ─── Tawk.to — consent-gated via Klaro ───────────────────
      {
        name: "tawk-to",
        content: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          Tawk_API.onLoad = function() {
            Tawk_API.setAttributes({ source: 'autem-services.fr' }, function(error) {});
          };
          (function(){
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/69bc038b22e4791c3681a8c2/1jk36rmup';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
        consent: "tawk-to",
      },
    ],
  },
});
