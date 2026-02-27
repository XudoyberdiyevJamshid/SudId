/**
 * Public API for g-select component
 *
 * Export both GSelect and GOption components so they can be imported together:
 *
 * @example
 * import { GSelect, GOption } from '@shared/components/g-select';
 *
 * @Component({
 *   imports: [GSelect, GOption],
 *   template: `
 *     <g-select [(value)]="selectedLang">
 *       <g-option value="uz" icon="flag-uz">UZ</g-option>
 *       <g-option value="ru" icon="flag-ru">RU</g-option>
 *       <g-option value="en" icon="flag-en">EN</g-option>
 *     </g-select>
 *   `
 * })
 */
export { GSelect } from './g-select';
export { GOption } from './g-option';
export type { SelectOption } from './g-select';
