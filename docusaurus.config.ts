import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'xCloud Platform Documentation',
  tagline: 'A documentação completa para a moderna plataforma de desenvolvimento e deploy.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://pagecloudv1.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/xcloud-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'PageCloudv1', // Usually your GitHub org/user name.
  projectName: 'xcloud-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/PageCloudv1/xcloud-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/PageCloudv1/xcloud-docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  // Enable Mermaid support
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    // Algolia DocSearch configuration
    algolia: {
      // The application ID provided by Algolia
      appId: 'DQ9ZR0P0U9',
      // Public API key: it is safe to commit it
      apiKey: '72b8acb874beb5ff1b2f769e1328b7e4',
      indexName: 'pagecloudv1_xcloud-docs',
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Algolia search parameters
      searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',
    },
    navbar: {
      title: 'xCloud Platform Documentation',
      logo: {
        alt: 'xCloud Logo',
        src: 'assets/logo-full.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'localeDropdown',
          position: 'left',
        },
        {
          href: 'https://github.com/PageCloudv1/xcloud-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Começar',
              to: '/docs/intro',
            },
            {
              label: 'Guias',
              to: '/docs/category/guias',
            },
            {
              label: 'CLI',
              to: '/docs/category/referência-da-cli',
            },
          ],
        },
        {
          title: 'Comunidade',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/xcloud',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/PageCloudv1/xcloud-platform',
            },
          ],
        },
        {
          title: 'Mais',
          items: [
            {
              label: 'Website',
              href: 'https://xcloud.io',
            },
            {
              label: 'Component Registry',
              href: 'https://packages.xcloud.io',
            },
            {
              label: 'GitHub Docs',
              href: 'https://github.com/PageCloudv1/xcloud-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} xCloud Platform. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
