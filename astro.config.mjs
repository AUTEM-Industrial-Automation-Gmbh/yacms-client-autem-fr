import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Routes des pages marquées `noindex` dans leur page.json.
 *
 * Le sitemap ne doit annoncer que des pages indexables : y lister une page dont
 * on interdit l'indexation est un signal contradictoire et du budget de crawl
 * gaspillé. La liste est relue à chaque build, donc elle suit automatiquement
 * les pages qu'on passe en noindex par la suite.
 */
const noindexRoutes = (() => {
    // `yacms client switch` copie ce fichier à la racine de yacms-core : on
    // cherche donc les yablocks à côté du fichier (dans l'app) puis à leur
    // emplacement vu depuis le core.
    const root = [
        path.resolve(__dirname, 'yablocks'),
        path.resolve(__dirname, '../../apps/yacms-client-autem-fr/yablocks'),
    ].find(fs.existsSync);
    const routes = new Set();

    const walk = dir => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            if (!entry.isDirectory()) continue;
            const full = path.join(dir, entry.name);
            const pageJson = path.join(full, 'page.json');

            if (fs.existsSync(pageJson)) {
                try {
                    const { meta } = JSON.parse(fs.readFileSync(pageJson, 'utf-8'));
                    if (/noindex/i.test(meta?.robots ?? '')) {
                        const folder = path.relative(root, full);
                        routes.add(folder === 'home' ? '/' : `/${folder}/`);
                    }
                } catch { /* page.json illisible : on ne filtre pas */ }
            }
            walk(full);
        }
    };

    try { if (root) walk(root); } catch { /* yablocks illisibles : rien à filtrer */ }
    return routes;
})();

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
        // ── Relevés en 404 dans la Search Console (2026-08-05) ──────────────
        // Anciennes URLs WordPress encore crawlées : les 3 dernières n'ont plus
        // d'équivalent en YACMS et retombent sur l'index du blog.
        '/blogs/6-habits-that-kill-old-machines.html': { status: 301, destination: '/blog/6-habits-that-kill-old-machines/' },
        '/blogs/actualités-tech-mqtt-azure-tesla-ia-and-industrie.html': { status: 301, destination: '/blog/actualites-tech-mqtt-azure-tesla-ia-and-industrie/' },
        '/blogs/adopter-docker-en-industrie.html': { status: 301, destination: '/blog/adopter-docker-en-industrie/' },
        '/blogs/alarme-et-detection-automatique.html': { status: 301, destination: '/blog/securite-incendie-alarmes-et-detection-automatique/' },
        '/blogs/automate-your-engineering-report-with-ai.html': { status: 301, destination: '/blog/automate-your-engineering-report-with-ai/' },
        '/blogs/bilan-de-12-mois-dactualite.html': { status: 301, destination: '/blog/bilan-de-12-mois-dactualite/' },
        '/blogs/challenge-champion-france.html': { status: 301, destination: '/blog/challenge-champion-france/' },
        '/blogs/chiffrage.html': { status: 301, destination: '/blog/chiffrage/' },
        '/blogs/christiana-yapi-une-roboticienne-pionniere.html': { status: 301, destination: '/blog/christiana-yapi-une-roboticienne-pionniere/' },
        '/blogs/cle-de-conduite-pour-reussir-son-projet-4-0.html': { status: 301, destination: '/blog/cle-de-conduite-pour-reussir-son-projet-4-0/' },
        '/blogs/custom-solution-design.html': { status: 301, destination: '/blog/custom-solution-design/' },
        '/blogs/cybersecurity-containerization-open_source-digital_transformation.html': { status: 301, destination: '/blog/cybersecurity-containerization-open-source-digital-transformation/' },
        '/blogs/digitalisation-simulation-protocoles-series.html': { status: 301, destination: '/blog/digitalisation-simulation-protocoles-series/' },
        '/blogs/equilibre-vie-perso-pro-pour-techiciens-en-industrie.html': { status: 301, destination: '/blog/equilibre-vie-perso-pro-pour-techiciens-en-industrie/' },
        '/blogs/evolution-dans-lindustrie-carriere-automatisme-et-communaute.html': { status: 301, destination: '/blog/evolution-dans-lindustrie-carriere-automatisme-et-communaute/' },
        '/blogs/exalens-process-monitoring-software.html': { status: 301, destination: '/blog/exalens-process-monitoring-software/' },
        '/blogs/factory-automation-insiders.html': { status: 301, destination: '/blog/factory-automation-insiders/' },
        '/blogs/formation-emploi-carriere.html': { status: 301, destination: '/blog/formation-emploi-carriere/' },
        '/blogs/formation-et-industrie.html': { status: 301, destination: '/blog/formation-et-industrie/' },
        '/blogs/gmao.html': { status: 301, destination: '/blog/gmao/' },
        '/blogs/highByte-vs-kepware.html': { status: 301, destination: '/blog/highbyte-vs-kepware/' },
        '/blogs/logiciel-industriel.html': { status: 301, destination: '/blog/logiciel-industriel/' },
        '/blogs/logiciel-industriels-licence-payante-ou-gratuite.html': { status: 301, destination: '/blog/logiciel-industriels-licence-payante-ou-gratuite/' },
        '/blogs/marc-golden-tech.html': { status: 301, destination: '/blog/' },
        '/blogs/midjourney-ia-et-industrie.html': { status: 301, destination: '/blog/midjourney-ia-et-industrie/' },
        '/blogs/missing-your-true-identity.html': { status: 301, destination: '/blog/missing-your-true-identity/' },
        '/blogs/modeliser-son-lifecycle-machine.html': { status: 301, destination: '/blog/modeliser-son-lifecycle-machine/' },
        '/blogs/mqtt-image-sampling.html': { status: 301, destination: '/blog/mqtt-image-sampling/' },
        '/blogs/news-novembre-2023.html': { status: 301, destination: '/blog/' },
        '/blogs/news-septembre-octobre-2023.html': { status: 301, destination: '/blog/' },
        '/blogs/nos-galères-en-industrie.html': { status: 301, destination: '/blog/nos-galeres-en-industrie/' },
        '/blogs/obsolescence-perennite-penurie-inconnues.html': { status: 301, destination: '/blog/obsolescence-perennite-penurie-inconnues/' },
        '/blogs/pilotage-usine-a-distance.html': { status: 301, destination: '/blog/pilotage-usine-a-distance/' },
        '/blogs/politique-et-industrie-en-france.html': { status: 301, destination: '/blog/politique-et-industrie-en-france/' },
        '/blogs/project-and-team-collaboration.html': { status: 301, destination: '/blog/project-and-team-collaboration/' },
        '/blogs/prospection.html': { status: 301, destination: '/blog/prospection/' },
        '/blogs/retrofit-digitaliser.html': { status: 301, destination: '/blog/retrofit-digitaliser/' },
        '/blogs/robot-optimus-et-frameworkX.html': { status: 301, destination: '/blog/robot-optimus-et-frameworkx/' },
        '/blogs/robotic-no-code-augmentus.html': { status: 301, destination: '/blog/robotic-no-code-augmentus/' },
        '/blogs/securite-incendie-alarmes-et-detection-automatique.html': { status: 301, destination: '/blog/securite-incendie-alarmes-et-detection-automatique/' },
        '/blogs/the-4-risks-of-a-retrofit-in-machine-automation.html': { status: 301, destination: '/blog/the-4-risks-of-a-retrofit-in-machine-automation/' },
        '/blogs/the-denial-of-age-vintage-machines.html': { status: 301, destination: '/blog/the-denial-of-age-vintage-machines/' },
        '/blogs/zone-atex.html': { status: 301, destination: '/blog/zone-atex/' },

        // ── Slugs mal formés autrefois liés depuis la grille du blog ────────
        // Accents et underscores ne correspondaient à aucun dossier yablocks.
        // Les liens sont corrigés, ces redirects rattrapent ce que Google a
        // déjà en mémoire.
        '/blog/nos-galères-en-industrie/': { status: 301, destination: '/blog/nos-galeres-en-industrie/' },
        '/blog/actualités-tech-mqtt-azure-tesla-ia-and-industrie/': { status: 301, destination: '/blog/actualites-tech-mqtt-azure-tesla-ia-and-industrie/' },
        '/blog/cybersecurity-containerization-open_source-digital_transformation/': { status: 301, destination: '/blog/cybersecurity-containerization-open-source-digital-transformation/' },

        // Rubrique WordPress disparue, sans équivalent direct → index des offres
        '/offre/informatique-industrielle/': { status: 301, destination: '/nos-offres/' },
    },
    integrations: [
        react(),
        sitemap({ filter: page => !noindexRoutes.has(new URL(page).pathname) }),
    ],
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