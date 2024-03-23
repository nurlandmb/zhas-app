import {useTranslation} from 'react-i18next';
import {Button} from 'flowbite-react';
import RulesKZ from 'shared/assets/Положение Zhas Project (каз.яз).docx';
import RulesRU from 'shared/assets/Положение Zhas Project (русс.яз).docx';
import KZIcon from 'shared/assets/img/kz.svg';
import RuIcon from 'shared/assets/img/ru.svg';
export const Rules = () => {
    const {t} = useTranslation();
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                    <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">{ t("rules.title") }</h2>
                </div>
                <div className="flex flex-wrap items-stretch justify-center">
                    <Button.Group>
                        <Button color="indigo" size='xl'>
                            <a href={RulesKZ} target="_blank" className="flex items-center gap-2">
                                <img className="w-8" src={KZIcon} />
                                <span>
                                    Қазақша
                                </span>
                            </a>
                        </Button>
                        <Button size='xl' color="indigo">
                            <a href={RulesRU} target="_blank" className="flex items-center gap-2">
                                <img className="w-8" src={RuIcon} />
                                <span>
                                    Русский
                                </span>
                            </a>
                        </Button>
                    </Button.Group>
                </div>
                {/*<button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>*/}
            </div>
        </section>

    )
}