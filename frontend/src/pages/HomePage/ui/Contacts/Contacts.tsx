import {useTranslation} from 'react-i18next';

export function Contacts(){
    const { t } = useTranslation();

    return (
        <section className="text-gray-600 body-font relative bg-blue-200 py-10">
            <div className="container bg-white mx-auto shadow-lg">
                <div className="bg-gray-300 rounded-lg overflow-hidden p-10 py-40 flex items-end justify-end relative">
                    <iframe width="100%" height="100%" className="absolute inset-0" title="map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A3f922e51bd9a4c4d5acde1829a733492b21ee18493fbd1d5c772a11ca0649bd1&amp;source=constructor" frameBorder="0"></iframe>
                </div>
                <div className=" relative flex flex-wrap py-6">
                    <div className="lg:w-1/2 px-6">
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">{ t("home.address") }</h2>
                        <p className="mt-1">{ t("home.abay") }</p>
                        <p className="mt-1">{ t("home.almaty") }</p>
                    </div>
                    <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">CALL Center</h2>
                        <a className="leading-relaxed" href="tel:+77086547410" target="_blank">+7 (708) 654 7410</a>
                    </div>
                </div>
            </div>

        </section>
    )
}