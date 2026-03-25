/**
 * Language detection using franc (lightweight, no external API needed).
 * Returns ISO 639-1 language code and confidence.
 */
import { franc } from 'franc';

const CODE_MAP = {
  'eng':'en','spa':'es','fra':'fr','deu':'de','ita':'it','por':'pt',
  'nld':'nl','rus':'ru','ara':'ar','zho':'zh','jpn':'ja','kor':'ko',
  'pol':'pl','tur':'tr','swe':'sv','dan':'da','nor':'no','fin':'fi',
  'heb':'he','hin':'hi','vie':'vi','tha':'th','ind':'id','ukr':'uk',
};

export function detectLanguage(text) {
  const sample = text.substring(0, 1000);
  const iso3   = franc(sample, { minLength: 20 });
  if (!iso3 || iso3 === 'und') return { language: null, confidence: 0 };
  return {
    language:   CODE_MAP[iso3] ?? iso3,
    confidence: 0.8, // franc doesn't provide confidence; use fixed moderate value
  };
}
