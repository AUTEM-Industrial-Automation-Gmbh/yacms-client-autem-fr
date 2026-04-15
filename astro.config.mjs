import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    site: 'https://autem-services.fr',
    redirects: {
        // ── Pages statiques WordPress → YACMS ──────────────────────────────
        '/ignition-scada.html': { status: 301, destination: '/nos-offres/logiciels-pilotage/ignition-scada/' },
        '/scada.html': { status: 301, destination: '/nos-offres/logiciels-pilotage/ignition-scada/' },
        '/portfolio-automatisme-references.html': { status: 301, destination: '/cas-clients/' },
        '/blog.html': { status: 301, destination: '/blog/' },
        '/plan-du-site.html': { status: 301, destination: '/plan-du-site/' },
        '/mentions-legales.html': { status: 301, destination: '/mentions-legales/' },
        '/entreprise-automatisme-industriel-prestataire-fournisseur.html': { status: 301, destination: '/a-propos/manifeste/' },
        '/technique-automatisation-technologie.html': { status: 301, destination: '/nos-offres/' },
        '/automatisme.html': { status: 301, destination: '/' },
        '/formation-automaticien.html': { status: 301, destination: '/blog/formation-et-industrie/' },
        '/automatisme-rhone-lyon-grenoble.html': { status: 301, destination: '/' },
        '/siemens-industrie_lyon-autem.html': { status: 301, destination: '/blog/armoire-automatisme-siemens/' },
        '/metier-automaticien.html': { status: 301, destination: '/blog/10-competences-pour-automaticien/' },

        // ── Articles de blog WordPress (/blogs/xxx.html) → YACMS (/blog/xxx/) ─
        '/blogs/changer-son-adresse-ip.html': { status: 301, destination: '/blog/changer-son-adresse-ip/' },
        '/blogs/automatiser-des-feux-tricolores.html': { status: 301, destination: '/blog/automatiser-des-feux-tricolores/' },
        '/blogs/modbus-simuler-un-echange-sur-ton-pc.html': { status: 301, destination: '/blog/modbus-simuler-un-echange-sur-ton-pc/' },
        '/blogs/rslogix-programmer-des-automates-allen-bradley.html': { status: 301, destination: '/blog/rslogix-programmer-des-automates-allen-bradley/' },
        '/blogs/retablir-la-connexion-usb-avec-so-machine.html': { status: 301, destination: '/blog/retablir-la-connexion-usb-avec-so-machine/' },
        '/blogs/chatgpt.html': { status: 301, destination: '/blog/chatgpt/' },
        '/blogs/wincc-configurer-un-ecran-de-supervision.html': { status: 301, destination: '/blog/wincc-configurer-un-ecran-de-supervision/' },
        '/blogs/benchmark-comparatif-scada.html': { status: 301, destination: '/blog/benchmark-comparatif-scada/' },
        '/blogs/communiquer-en-opcua.html': { status: 301, destination: '/blog/communiquer-en-opcua/' },
        '/blogs/pc-connecte-a-un-automate-s7-1500.html': { status: 301, destination: '/blog/pc-connecte-a-un-automate-s7-1500/' },
        '/blogs/programmer-un-automate-allen-bradley.html': { status: 301, destination: '/blog/programmer-un-automate-allen-bradley/' },
        '/blogs/automate-m340.html': { status: 301, destination: '/blog/automate-m340/' },
        '/blogs/diagnostique-panne-machine.html': { status: 301, destination: '/blog/diagnostique-panne-machine/' },
        '/blogs/electrocution.html': { status: 301, destination: '/blog/electrocution/' },
        '/blogs/chaudronnerie-et-digital.html': { status: 301, destination: '/blog/chaudronnerie-et-digital/' },
        '/blogs/diagnostic-profinet-sur-reseau-siemens.html': { status: 301, destination: '/blog/diagnostic-profinet-sur-reseau-siemens/' },
        '/blogs/communiquer-sans-automate.html': { status: 301, destination: '/blog/communiquer-sans-automate/' },
        '/blogs/filtre-wireshark.html': { status: 301, destination: '/blog/filtre-wireshark/' },
        '/blogs/domore.html': { status: 301, destination: '/blog/domore/' },
        '/blogs/connecter-excel-a-un-automate-siemens-s7-1500.html': { status: 301, destination: '/blog/connecter-excel-a-un-automate-siemens-s7-1500/' },
        '/blogs/historiser-des-donnee-en-opc.html': { status: 301, destination: '/blog/historiser-des-donnee-en-opc/' },
        '/blogs/ladder-et-process-control-programmation-et-opensource.html': { status: 301, destination: '/blog/ladder-et-process-control-programmation-et-opensource/' },
        '/blogs/10-competences-pour-automaticien.html': { status: 301, destination: '/blog/10-competences-pour-automaticien/' },
        '/blogs/logiciels-sur-mesure-vs-sur-etagere.html': { status: 301, destination: '/blog/logiciels-sur-mesure-vs-sur-etagere/' },
        '/blogs/armoire-automatisme-siemens.html': { status: 301, destination: '/blog/armoire-automatisme-siemens/' },
        '/blogs/portail-fermeture-automatique.html': { status: 301, destination: '/blog/portail-fermeture-automatique/' },
        '/blogs/automatisme-et-aeroport.html': { status: 301, destination: '/blog/automatisme-et-aeroport/' },
        '/blogs/protocoles-de-communication-industriels.html': { status: 301, destination: '/blog/protocoles-de-communication-industriels/' },
        '/blogs/industrie-navale.html': { status: 301, destination: '/blog/industrie-navale/' },
        '/blogs/armoire-automatisme-schneider-electrique.html': { status: 301, destination: '/blog/armoire-automatisme-schneider-electrique/' },
        '/blogs/integrateur-scada.html': { status: 301, destination: '/blog/integrateur-scada/' },
        '/blogs/armoire-automatisme-rockwell.html': { status: 301, destination: '/blog/armoire-automatisme-rockwell/' },
        '/blogs/les-automaticiens-entrepreneurs.html': { status: 301, destination: '/blog/les-automaticiens-entrepreneurs/' },
        '/blogs/cognex-lecture-data-matrix.html': { status: 301, destination: '/blog/cognex-lecture-data-matrix/' },
        '/blogs/cest-qui-autem.html': { status: 301, destination: '/blog/cest-qui-autem/' },
        '/blogs/prestation-automatisme-industriel-tertiaire.html': { status: 301, destination: '/blog/prestation-automatisme-industriel-tertiaire/' },
        '/blogs/digitalisation-de-la-gestion-de-leau.html': { status: 301, destination: '/blog/digitalisation-de-la-gestion-de-leau/' },
        '/blogs/entreprise-architecture.html': { status: 301, destination: '/blog/entreprise-architecture/' },
        '/blogs/automaticien-methode-vs-marques.html': { status: 301, destination: '/blog/automaticien-methode-vs-marques/' },
        '/blogs/parole-dexpertes.html': { status: 301, destination: '/blog/parole-dexpertes/' },
        '/blogs/opportunites-et-metiers-futurs.html': { status: 301, destination: '/blog/opportunites-et-metiers-futurs/' },
        '/blogs/influxdb-to-boost-your-ignition-historian.html': { status: 301, destination: '/blog/' },
        '/blogs/les-techniciens-fuient-lindustrie.html': { status: 301, destination: '/blog/les-techniciens-fuient-lindustrie/' },
        '/blogs/demo-live-automate-mitsubishi.html': { status: 301, destination: '/blog/demo-live-automate-mitsubishi/' },

        // ── Articles manquants (trouvés dans GSC "Explorée non-indexée") ─────
        '/blogs/vision-ia-robotique.html': { status: 301, destination: '/blog/vision-ia-robotique/' },
        '/blogs/defi-de-l-industrialisation-en-afrique.html': { status: 301, destination: '/blog/defi-de-l-industrialisation-en-afrique/' },
        '/blogs/agroindustrie-et-ingenierie-en-afrique.html': { status: 301, destination: '/blog/agroindustrie-et-ingenierie-en-afrique/' },
        '/blogs/retrofit-carte-electronique-advantech.html': { status: 301, destination: '/blog/retrofit-carte-electronique-advantech/' },
        '/blogs/lindustrie-a-lere-du-numerique-nicolas-gonzalez-operametrix.html': { status: 301, destination: '/blog/convergence-it-ot-lindustrie-a-lere-du-numerique-nicolas-gonzalez-operametrix/' },
        '/blogs/arduino-sql-ot-bencmark.html': { status: 301, destination: '/blog/arduino-sql-ot-bencmark/' },
        '/blogs/automate-your-documentation.html': { status: 301, destination: '/blog/automate-your-documentation/' },
        '/blogs/industrie-agroalimentaire-et-pharmaceutique.html': { status: 301, destination: '/blog/industrie-agroalimentaire-et-pharmaceutique/' },
        '/blogs/architecture-dentreprise.html': { status: 301, destination: '/blog/entreprise-architecture/' },
        '/blogs/armoire-automatisme-beckhoff.html': { status: 301, destination: '/blog/armoire-automatisme-beckhoff/' },

        // ── Articles "news" (existants en YACMS, manquants dans la liste) ───
        '/blogs/news-janvier-2024.html': { status: 301, destination: '/blog/news-janvier-2024/' },
        '/blogs/news-fevrier-2024.html': { status: 301, destination: '/blog/news-fevrier-2024/' },
        '/blogs/news-avril-2023.html': { status: 301, destination: '/blog/news-avril-2023/' },
        '/blogs/news-avril-2024.html': { status: 301, destination: '/blog/news-avril-2024/' },
        '/blogs/news-juillet-2023.html': { status: 301, destination: '/blog/news-juillet-2023/' },
        '/blogs/news-juin-2023.html': { status: 301, destination: '/blog/news-juin-2023/' },
        '/blogs/news-juin-2024.html': { status: 301, destination: '/blog/news-juin-2024/' },
        '/blogs/news-aout-2024.html': { status: 301, destination: '/blog/news-aout-2024/' },
        '/blogs/news-decembre-2023.html': { status: 301, destination: '/blog/news-decembre-2023/' },
        // ── Articles "news" absents de YACMS → fallback blog ────────────────
        '/blogs/news-octobre-2024.html': { status: 301, destination: '/blog/' },
        '/blogs/news-mai-2024.html': { status: 301, destination: '/blog/' },
        '/blogs/news-mai-2023.html': { status: 301, destination: '/blog/' },
    },
    integrations: [react(), sitemap()],
    build: {
        inlineStylesheets: 'always',
        compressHTML: true
    },
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                'zod-to-json-schema': path.resolve(__dirname, './src/stubs/zod-to-json-schema.ts'),
            },
        },
        css: {
            transformer: 'postcss',
        },
        server: {
            host: true,
            watch: {
                ignored: ['**/yablocks/**']
            }
        },
        ssr: {
            noExternal: ['lucide-react'],
        },
    },
});