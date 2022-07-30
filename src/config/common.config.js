const SITE_LANGUAGES = {
    english: 'en',
    spanish: 'es',
  };
  
  const DEFAULT_SITE_LANGUAGE = SITE_LANGUAGES.english;
  
  const TIMEOUT_IN_SECS = {
    searchShort: 45 * 1000,
    searchLong: 120 * 1000,
  
    randomLongWait: 5 * 1000,
    randomMindWait: 3 * 1000,
    randomShortWait: 2 * 1000,
  };
  
  module.exports = {
    SITE_LANGUAGES,
    DEFAULT_SITE_LANGUAGE,
    TIMEOUT_IN_SECS,
  };
  