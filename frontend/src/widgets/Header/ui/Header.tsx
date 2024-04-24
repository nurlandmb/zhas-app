import CiscLogo from 'shared/assets/img/cisc.png';
import GerbLogo from 'shared/assets/img/gerb.png';
import ZhasLogo from 'shared/assets/img/logo.png';
import {Link} from 'react-router-dom';
import LangSwitcher from 'shared/ui/LangSwitcher/LangSwitcher.tsx';
import {Button} from 'flowbite-react';
import {useTranslation} from 'react-i18next';
export function Header(){
    const {t} = useTranslation();
    return (
        <header className="text-gray-600 body-font relative z-20">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex items-center">
                    <Link className="mr-2" to="/">
                        <img className="w-24" src={ZhasLogo} alt="Zhas project Logo" />
                    </Link>
                    <a className="mr-2" href="https://www.gov.kz/">
                        <img className="w-16" src={GerbLogo} alt="MO logo" />
                    </a>
                    <a className="mr-2" href="https://cisc.kz/ru/">
                        <img className="w-24" src={CiscLogo} alt="Cisc logo" />
                    </a>
                </div>

                {/*<nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">*/}
                {/*    <a className="mr-5 hover:text-gray-900">First Link</a>*/}
                {/*    <a className="mr-5 hover:text-gray-900">Second Link</a>*/}
                {/*    <a className="mr-5 hover:text-gray-900">Third Link</a>*/}
                {/*    <a className="mr-5 hover:text-gray-900">Fourth Link</a>*/}
                {/*</nav>*/}
                <div className="flex items-center gap-2">
                    {/*<Button color="success" size="lg">*/}
                    {/*    <Link to='/request'>*/}
                    {/*        { t('ui.request') }*/}
                    {/*    </Link>*/}
                    {/*</Button>*/}
                    <LangSwitcher />
                </div>

            </div>
        </header>
    );
}


