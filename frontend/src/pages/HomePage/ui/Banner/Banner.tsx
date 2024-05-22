import cls from './Banner.module.scss'
import bgImg from 'shared/assets/img/bg1.jpg'
import {useTranslation} from 'react-i18next';
import {useTimer} from 'react-timer-hook';
import React, {useEffect, useState} from 'react';
import {addLeadingZero} from 'shared/lib/addLeadingZero.ts';
import Banner1 from 'shared/assets/img/first.jpg';
import {Link} from 'react-router-dom';
import {Button, Label, Modal, TextInput} from 'flowbite-react';

const EXPIRATION_DATE = new Date(2024, 2, 25);
import TechList from 'shared/assets/list.pdf';
import ResList from 'shared/assets/winners.pdf'

export function Banner() {
    const {t} = useTranslation();
    const {days, minutes, seconds, hours, start} = useTimer({
        expiryTimestamp: EXPIRATION_DATE
    });

    const [showModal, setShowModal] = useState(false);
    const [codeOrIIN, setCodeOrIIN] = useState("");

    useEffect(() => {
        start();
    }, []);

    return (
        <section className={cls.banner} style={{backgroundImage: `url(${bgImg}`}}>
            <Modal dismissible show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>{t('ui.resultsTitle')}</Modal.Header>
                <Modal.Body>
                    {/*<form className="mb-10">*/}
                    {/*    <div className="mb-2">*/}
                    {/*        <Label className="mb-2 block" htmlFor="codeOrIIN"*/}
                    {/*               value={t('ui.enterCode')}/>*/}
                    {/*        <TextInput value={codeOrIIN} onChange={e => setCodeOrIIN(e.target.value)} id="codeOrIIN" type="number"*/}
                    {/*                    required/>*/}
                    {/*    </div>*/}
                    {/*    <Button className="" color="success">{t('ui.check')}</Button>*/}
                    {/*</form>*/}
                    {/*<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />*/}
                    <div className="space-y-6">
                        <a className="block underline text-blue-600 my-0 " href={TechList}
                            target="_blank">{t('ui.techList')}</a>
                        <a className="block underline text-blue-600 my-0 mt-1" href={ResList} target="_blank">
                            {t('ui.resultsList')}
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>{t('ui.close')}</Button>

                </Modal.Footer>
            </Modal>

            <div className={cls.overlay}/>
            <div className="container z-10 px-5 flex flex-col-reverse md:flex-row items-stretch gap-6">
                <div className="flex-1 px-4 py-4 rounded-xl bg-indigo-950/40">
                    <h1 className="text-xl sm:text-4xl text-left text-gray-200 mb-8 font-medium"
                        dangerouslySetInnerHTML={{__html: t('home.title')}}>
                    </h1>
                    {/*<p className="text-gray-200 text-3xl mb-2">*/}
                    {/*    { t('home.timeRemaining') }*/}
                    {/*</p>*/}
                    <p className="text-left text-2xl font-bold text-gray-200">{t('ui.stop')}</p>
                    <p className="text-left text-xl font-medium text-gray-200">{t('ui.viewResults')}</p>
                    {/*<Button color="success" size="lg">*/}
                    {/*    <Link to='/request'>*/}
                    {/*        { t('ui.request') }*/}
                    {/*    </Link>*/}
                    {/*</Button>*/}


                    <Button onClick={() => setShowModal(true)}
                            className="mt-4 block hover:opacity-50 duration-300 text-gray-200 " color="success"
                            size="lg">{t('ui.open')} </Button>

                    <div className="mt-4 md:mt-8 mb-4">
                        <a className="hover:opacity-50 duration-300 text-gray-200 flex items-center gap-2"
                           href="https://www.instagram.com/zhas_project_almaty_abay_obl/" target="_blank">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                 strokeWidth="1.5"
                                 className="w-6 h-6  md:w-8 md:h-8" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                            <span className="text-lg">zhas_project_almaty_abay_obl</span>
                        </a>
                        <a className="hover:opacity-50 duration-300 mt-2 text-gray-200 flex items-center gap-2"
                           href="tel:+77086547410" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  md:w-8 md:h-8">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
                            </svg>
                            <span className="text-lg">+7 (708) 654 7410</span>
                        </a>
                        <a className="hover:opacity-50 duration-300 mt-2 text-gray-200 flex items-center gap-2"
                           href="https://go.2gis.com/bhvv7" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  md:w-8 md:h-8">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                            </svg>

                            <span className="text-lg">{t('home.abay')}</span>
                        </a>
                        <a className="hover:opacity-50 duration-300 mt-2 text-gray-200 flex items-center gap-2"
                           href="https://go.2gis.com/018kp" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  md:w-8 md:h-8">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                            </svg>

                            <span className="text-lg">{t('home.almaty')}</span>
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-auto mt-6 md:mt-0 max-w-xl">
                    <img className="object-cover object-center rounded-xl" alt="hero" src={Banner1}/>
                </div>

            </div>

        </section>


    )
}