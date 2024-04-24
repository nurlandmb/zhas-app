import React, {useEffect, useState} from 'react';
import {$api} from 'shared/api/api.ts';
import {Button, Card, Modal, Select, Spinner, TextInput} from 'flowbite-react';
import {useAppDispatch} from 'app/providers/store';
import {RequestForm, setProjectForm, setReadonly, setUserForm} from 'entities/Request';
import {toast} from 'react-toastify';
import {saveAs} from 'file-saver';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
const RequestListPage = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isWordLoading, setIsWordLoading] = useState(false);
    const navigate = useNavigate();
    const {i18n} = useTranslation();

    const [iinSearch, setIinSearch] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");

    const loadPosts = async () => {
        try{
            setIsLoading(true);
            const {data} = await $api.get('/request/load-all');
            if(!Array.isArray(data)){
                throw new Error();
            }
            setRequests(data);
            setFilteredRequests(data);
            setIsLoading(false);
        } catch(err){
            alert('Өтінімдерді жүктеуде қате орын алды')
            setIsLoading(false);
        }

    }

    const openRequest = (id: string) => {
        const request = requests.find(req => req.id === id);
        if(!request) return;
        i18n.changeLanguage(request.content.lang);
        dispatch(setUserForm(request.content.userForm))
        dispatch(setProjectForm(request.content.projectForm))
        dispatch(setReadonly(true));
        setShowModal(true);
    }

    const logout = async () => {
        try{
            await $api.post('/logout');
            localStorage.removeItem('zhas-token-2024');
            navigate('/');
        }catch(err){
            toast.error('Қате орын алды')
        }
    }
    const base64ToBlob = (base64String: string, contentType = '') => {
        const byteCharacters = atob(base64String);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
        }

        const byteArray = new Uint8Array(byteArrays);
        return new Blob([byteArray], { type: contentType });
    }

    const saveWordFiles = async () => {
        try{
            setIsWordLoading(true);



            const {headers, data} = await $api.post('/template/docx');

            const blob = base64ToBlob(data);
            saveAs(blob, 'hello.zip');



            setIsWordLoading(false);
        } catch(err){
            console.log(err);
            toast.error('Жүктеу барысында қате орын алды')
        }

    }

    useEffect(() => {
        let req = requests;

        if(iinSearch.trim().length){
            req = req.filter(request => request.content.userForm.iin.includes(iinSearch.trim()))
        }
        if(selectedRegion.length){
            req = req.filter(request => request.content.userForm.region === selectedRegion);
        }

        setFilteredRequests(req);
    }, [iinSearch, selectedRegion]);



    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <RequestForm />
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
            <section className="container px-5 py-8 mx-auto">
                {
                    isLoading ? <Spinner /> : <>
                        Барлығы: {requests.length}
                        {requests.length !== filteredRequests.length && <p>Фильтр бойынша: {filteredRequests.length}</p>}
                        <Button disabled={isWordLoading} isProcessing={isWordLoading} onClick={saveWordFiles}>Word Файлдарды жүктеу</Button>
                        <Button className="mt-2" onClick={logout}>Жабу</Button>
                        <div className="mt-2 flex gap-4 items-center">
                            <TextInput placeholder='ИИН бойынша іздеу' value={iinSearch} onChange={e => setIinSearch(e.target.value)} />
                            <Select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
                                <option value="">Барлығы</option>
                                <option value="Абай">Абай</option>
                                <option value="Алматы">Алматы</option>
                            </Select>
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4">
                            {
                                filteredRequests.map(request => (
                                    <Card className="cursor-pointer" key={request.id} onClick={() => openRequest(request.id)}>
                                        <div className="flex justify-between items-center">
                                            <span>{request.content.projectForm.title}</span>
                                            <span className="text-right">{new Date(request.date).toLocaleString('ru-RU')}</span>
                                        </div>
                                        <div>
                                            {
                                                `${request.content.userForm.surname} 
                                    ${request.content.userForm.name}
                                    ${request.content.userForm.iin}
                                    `
                                            }
                                        </div>
                                    </Card>
                                ))
                            }
                        </div>
                    </>
                }
            </section>

        </>
    )
}

export default RequestListPage;