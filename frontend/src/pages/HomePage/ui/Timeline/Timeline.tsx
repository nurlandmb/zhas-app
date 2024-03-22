import {useTranslation} from 'react-i18next';
import Img3 from 'shared/assets/img/img3.jpeg';

export function Timeline(){
    const {t} = useTranslation();
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto flex flex-wrap">
                <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                    <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">{ t("timeline.title") }</h2>
                </div>
                <div className="flex flex-wrap w-full">
                    <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                        <div className="flex relative pb-12">
                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-xl text-gray-900 mb-1 tracking-wider">
                                    { t('timeline.first.title') }
                                </h2>
                                <p className="text-lg">
                                    { t('timeline.first.description') }
                                </p>
                            </div>
                        </div>
                        <div className="flex relative pb-12">
                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                </svg>
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-xl text-gray-900 mb-1 tracking-wider">
                                    { t('timeline.second.title') }
                                </h2>
                                <p className="text-lg">
                                    { t('timeline.second.description') }
                                </p>
                            </div>
                        </div>
                        <div className="flex relative pb-12">
                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                                </svg>
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-xl text-gray-900 mb-1 tracking-wider">
                                    { t('timeline.third.title') }
                                </h2>
                                <p className="text-lg">
                                    { t('timeline.third.description') }
                                </p>
                            </div>
                        </div>
                        <div className="flex relative">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                            </div>
                            <div className="flex-grow pl-4">
                                <h2 className="font-medium title-font text-xl text-gray-900 mb-1 tracking-wider">
                                    { t('timeline.fourth.title') }
                                </h2>
                                <p className="text-lg">
                                    { t('timeline.fourth.description') }
                                </p>
                            </div>
                        </div>
                    </div>
                    <img className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" src={Img3} alt="step" />
                </div>
            </div>
        </section>
    )
}