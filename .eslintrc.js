const { configure, presets } = require('eslint-kit');

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',

  presets: [
    presets.imports({
      sort: {
        newline: true,
        groups: [
          ['@nest', 'express'],
          ['bcrypt'],
          ['class-validator', 'class-transformer'],
          ['@nestjs/jwt', 'passport', 'jsonwebtoken'],
          ['@prisma'],
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
