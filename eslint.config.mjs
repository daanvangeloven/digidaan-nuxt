import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true, // Enforce semicolons
    commaDangle: 'always-multiline', // Trailing commas in multiline
  },
});
