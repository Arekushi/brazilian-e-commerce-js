import appRoot from 'app-root-path';
import i18n from 'i18n';


export const locale = () => {
    i18n.configure({
        locales: ['en', 'pt'],
        defaultLocale: 'en',
        extension: '.json',
        updateFiles: false,
        objectNotation: true,
        directory: `${appRoot}/src/assets/locales`
    });
};
