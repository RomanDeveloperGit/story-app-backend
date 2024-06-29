const { configure, presets } = require('eslint-kit');

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',

  presets: [
    presets.imports({
      sort: {
        newline: true,
        groups: [
          ['@nest', 'express', 'passport', 'jsonwebtoken', 'bcrypt', '@prisma'],
          ['^@/shared/', '^@/domains/'],
          ['^\\.'],
        ],
      },
    }),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
  ],
});
