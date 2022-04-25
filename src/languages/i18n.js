import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import English from './english.json'
import Hindi from './hindi.json'
import Marathi from './marathi.json'


i18next.use(initReactI18next).init({
        lng: 'en',
        resources: {
            en: English,
            hi: Hindi,
            ma: Marathi
        },
        react: {
            useSuspense: false
        },
        fallbackLng: ['en','hi']
    }, (err, t) => {
        if (err) return console.log('i18n Translation Error:', err);
        t('key')
    }
)

export default i18next;