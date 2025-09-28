module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'npm run serve',
      startServerReadyPattern: 'serving at',
      startServerReadyTimeout: 30000,
    },
    assert: {
      assertions: {
        // Performance metrics
        'first-contentful-paint': 'warn',
        'largest-contentful-paint': 'warn',
        'first-meaningful-paint': 'warn',
        'speed-index': 'warn',
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],

        // Accessibility - Critical
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'button-name': 'error',
        'document-title': 'error',
        'duplicate-id': 'warn', // Mudado para warn devido ao Docusaurus
        'html-has-lang': 'error',
        'html-lang-valid': 'error',
        'link-name': 'error',
        'list': 'error',
        'listitem': 'error',

        // Accessibility - Warnings
        'accesskeys': 'warn',
        'aria-hidden-body': 'warn',
        'aria-hidden-focus': 'warn',
        'aria-input-field-name': 'warn',
        'aria-toggle-field-name': 'warn',
        'heading-order': 'warn',
        'landmark-one-main': 'warn',
        'region': 'warn',
        'skip-link': 'warn',
        'tabindex': 'warn',

        // Best Practices - Relaxadas para desenvolvimento
        'uses-https': 'off', // Off em desenvolvimento local
        'is-on-https': 'off', // Off em desenvolvimento local
        'uses-http2': 'off',
        'no-vulnerable-libraries': 'warn',

        // SEO
        'meta-description': 'warn',
        'robots-txt': 'off',
        'tap-targets': 'warn',
        'hreflang': 'off',
        'canonical': 'warn'
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
