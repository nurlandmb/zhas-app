import {Dropdown} from 'flowbite-react';
import KZIcon from 'shared/assets/img/kz.svg';
import RuIcon from 'shared/assets/img/ru.svg';
import {useTranslation} from 'react-i18next';

export default function LangSwitcher() {
    const {i18n} = useTranslation();

    const changeLang = (newLang: string) => {
        i18n.changeLanguage(newLang);
    }


    return (
        <>
            <Dropdown label="Язык" size="large" renderTrigger={() => (
                <button className="flex p-4 bg-blue-600 rounded-lg items-center text-gray-200">
                    {i18n.language === 'kk' ? <>
                        <span className="inline-block text-md">Қазақша</span>
                        <img className="w-8 ml-2" src={KZIcon}/>
                    </> : <>

                        <span className="inline-block text-md">Русский</span>

                        <img className="w-8 ml-2" src={RuIcon}/>
                    </>}
                </button>
            )}>
                <Dropdown.Item onClick={() => changeLang('kk')}>
                    <img className="w-4 mr-1" src={KZIcon}/>
                    <span className="inline-block">Қазақша</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeLang('ru')}>
                    <img className="w-4 mr-1" src={RuIcon}/>
                    <span className="inline-block">Русский</span>
                </Dropdown.Item>
            </Dropdown>
        </>
    )
}