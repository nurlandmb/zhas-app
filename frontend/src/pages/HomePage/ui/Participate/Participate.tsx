import {useTranslation} from 'react-i18next';
import {Button} from 'flowbite-react';
import {Link} from 'react-router-dom';
import LangSwitcher from 'shared/ui/LangSwitcher/LangSwitcher.tsx';
import TechList from 'shared/assets/list.pdf';

export function Participate(){
    const {t} = useTranslation();
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                    <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">{ t("participate.title") }</h2>
                </div>
                <div className="flex flex-wrap items-stretch">
                    <div className="xl:w-1/2 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg text-center">
                            <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                            <p className="leading-relaxed text-lg">{ t('participate.first') }</p>
                        </div>
                    </div>
                    <div className="xl:w-1/2 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg text-center">
                            <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            </div>
                            <p className="leading-relaxed text-lg">{ t('participate.second') }</p>
                        </div>
                    </div>
                    <div className="xl:w-1/2 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg text-center">
                            <div className="w-16 h-16 mx-auto inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                                </svg>

                            </div>
                            <p className="leading-relaxed text-lg">{ t('participate.third') }</p>
                        </div>
                    </div>
                    <div className="xl:w-1/2 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg text-center">
                            <div className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                                </svg>

                            </div>
                            <p className="leading-relaxed text-lg">{ t('participate.fourth') }</p>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-center text-2xl font-bold">{ t('ui.stop') }</p>
                    <p className="text-center text-xl font-medium">{ t('ui.results') }</p>
                    <a className="mt-4 block hover:opacity-50 duration-300 text-gray-200 " href={TechList} target='_blank'>
                        <Button className="mx-auto" color="success" size="lg">{t('banner.techList')} </Button></a>
                    {/*<Button color="success" size="lg">*/}
                    {/*    <Link to='/request'>*/}
                    {/*        { t('ui.request') }*/}
                    {/*    </Link>*/}
                    {/*</Button>*/}
                </div>
                {/*<button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>*/}
            </div>
        </section>
    )
}