import type { LocaleDefinition } from '@faker-js/faker';
import { base, id_ID, Faker } from '@faker-js/faker';

const customLocale: LocaleDefinition = {
    internet: {
        free_email: ['gmail.com', 'gmail.co.id'],
    },
};

export const customFaker = new Faker({
    locale: [customLocale, id_ID, base],
});