import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{C as s}from"./cms-image.Mv8CUrx2.js";import{o as a,s as l,u as i}from"./zod-extensions.C4jFp55o.js";import"./assets.DycQ5C6J.js";import"./index.Bvk5EX3f.js";a({title:l().meta({role:"preview",label:"Titre de la section",placeholder:"L'entreprise"}),content:l().meta({label:"Contenu",placeholder:"<p>Texte de la section...</p>",tooltip:"Contenu HTML de la section (paragraphes, listes, gras, etc.)",uiHints:{multiline:!0,rows:12}}),image:a({src:l().meta({role:"image",label:"Image",tooltip:"Image illustrative affichée sous le contenu"}),alt:l().meta({label:"Texte alternatif",placeholder:"Description de l'image"})}).optional().meta({label:"Image"}),caption:l().optional().meta({label:"Légende",placeholder:"Texte sous l'image",tooltip:"Texte en italique affiché sous l'image"})});function p({data:t}){const o=i(t);return e.jsx("section",{className:"bg-background",children:e.jsxs("div",{className:"mx-auto max-w-240 px-6 py-8 max-md:px-4",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx(o.H2,{path:"title",className:"text-2xl font-bold text-foreground mb-3"}),e.jsx("div",{className:"w-10 h-1 bg-primary rounded-full"})]}),e.jsx("div",{dangerouslySetInnerHTML:{__html:t.content},className:`
            text-foreground leading-relaxed
            [&_p]:mb-5 [&_p]:text-base
            [&_strong]:font-semibold [&_strong]:text-foreground
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-2
            [&_li]:text-base [&_li]:text-foreground
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-4
            [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-3
            [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
          `}),t.image&&e.jsxs("figure",{className:"mt-8",children:[e.jsx("div",{className:"rounded-2xl overflow-hidden",children:e.jsx(s,{src:t.image.src,alt:t.image.alt,className:"w-full object-cover"})}),t.caption&&e.jsx("figcaption",{className:"mt-4 text-sm italic text-muted-foreground",children:e.jsx(o.Span,{path:"caption"})})]})]})})}export{p as default};
