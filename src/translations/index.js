import { englishMessages } from 'admin-on-rest';
import frenchMessages from 'aor-language-french';

import customFrenchMessages from './fr';
import customEnglishMessages from './en';

export default {
    fr: { ...frenchMessages, ...customFrenchMessages },
    en: { ...englishMessages, ...customEnglishMessages },
};
