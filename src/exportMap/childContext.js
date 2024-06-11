import { hashObject } from 'eslint-module-utils/hash';

let parserOptionsHash = '';
let prevParserOptions = '';
let settingsHash = '';
let prevSettings = '';

/**
 * don't hold full context object in memory, just grab what we need.
 * also calculate a cacheKey, where parts of the cacheKey hash are memoized
 */
export default function childContext(path, context) {
  const { settings, languageOptions } = context;
  const { parserOptions } = languageOptions || {};

  if (JSON.stringify(settings) !== prevSettings) {
    settingsHash = hashObject({ settings }).digest('hex');
    prevSettings = JSON.stringify(settings);
  }

  if (JSON.stringify(parserOptions) !== prevParserOptions) {
    parserOptionsHash = hashObject({ parserOptions }).digest('hex');
    prevParserOptions = JSON.stringify(parserOptions);
  }

  return {
    cacheKey: parserOptionsHash + settingsHash + String(path),
    settings,
    languageOptions,
    parserOptions,
    path,
  };
}
