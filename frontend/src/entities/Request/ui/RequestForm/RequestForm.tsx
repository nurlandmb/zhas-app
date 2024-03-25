import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './RequestForm.module.scss';
import {memo, useEffect, useRef, useState} from 'react';
import Stepper, {StepperStep} from 'shared/ui/Stepper/Stepper.tsx';
import {UserInfoForm} from '../UserInfoForm/UserInfoForm.tsx';
import {ProjectInfoForm} from '../ProjectInfoForm/ProjectInfoForm.tsx';
import {useAppDispatch, useAppSelector} from 'app/providers/store';
import {
    requestInvalidInputs, requestIsLoading,
    requestProjectForm, requestReadonly,
    requestUserForm
} from '../../model/selectors/index.ts';
import {resetForm, setInvalidInputs, setIsLoading} from 'entities/Request/model/slice/requestSlice.ts';
import {Button, Modal, Tabs, TabsRef} from 'flowbite-react';
import BriefcaseIcon from 'shared/ui/icons/BriefcaseIcon.tsx';
import UserIcon from 'shared/ui/icons/UserIcon.tsx';
import {$api} from 'shared/api/api.ts';
import {toast} from 'react-toastify';
interface RequestFormProps {
    className?: string;
}

export const RequestForm = memo(({className}: RequestFormProps) => {
    const {t, i18n} = useTranslation();
    const dispatch = useAppDispatch();
    const userForm = useAppSelector(requestUserForm);
    const projectForm = useAppSelector(requestProjectForm);
    const invalidInputs = useAppSelector(requestInvalidInputs);
    const tabsRef = useRef<TabsRef>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [modalColor, setModalColor] = useState('');
    const [modalCode, setModalCode] = useState('');
    const isLoading = useAppSelector(requestIsLoading);
    const readonly = useAppSelector(requestReadonly)

    const validateUserInputs = () => {
        const wrongInputs = [];

        if(!userForm.name.length){
            wrongInputs.push('name');
        }
        if(!userForm.surname.length){
            wrongInputs.push('surname');
        }
        if(!userForm.iin.length){
            wrongInputs.push('iin');
        }
        if(!userForm.birthDate.length){
            wrongInputs.push('birthDate');
        }
        if(!userForm.gender.length){
            wrongInputs.push('gender');
        }
        if(!userForm.email.length){
            wrongInputs.push('email');
        }
        if(!userForm.phone.length){
            wrongInputs.push('phone');
        }
        if(!userForm.additionalPhone.length){
            wrongInputs.push('additionalPhone');
        }
        if(!userForm.additionalEmail.length){
            wrongInputs.push('additionalEmail');
        }
        if(!userForm.familyStatus.length){
            wrongInputs.push('familyStatus');
        }
        if(!userForm.region.length){
            wrongInputs.push('region');
        }
        if(!userForm.addressType.length){
            wrongInputs.push('addressType');
        }
        if(!userForm.address.length){
            wrongInputs.push('address');
        }
        if(!userForm.degree.length){
            wrongInputs.push('degree');
        }
        if(!userForm.citizenshipFile.length){
            wrongInputs.push('citizenshipFile');
        }
        console.log(userForm.isStudying.length)
        if(!userForm.isStudying.length){
            wrongInputs.push('isStudying');
        }
        if(!userForm.notWorkingFile.length){
            wrongInputs.push('notWorkingFile');
        }
        if(!userForm.passportFile.length){
            wrongInputs.push('passportFile');
        }

        if(userForm.gender === 'Әйел' || userForm.gender === 'Женский' && !userForm.isMaternityLeave.length){
            wrongInputs.push('isMaternityLeave');
        }

        if(userForm.currentlyFree && !userForm.notWorkingFor.length){
            wrongInputs.push('notWorkingFor');
        }

        dispatch(setInvalidInputs([...invalidInputs, ...wrongInputs]));
        if(!!wrongInputs.length){
            toast.warning(t('request.fillUserInfo'), {
                autoClose: 3000,
                closeOnClick: true
            })
        }
        return !!wrongInputs.length;
    }

    const validateProjectInputs = () => {
        const wrongInputs = [];
        if(!projectForm.title.length){
            wrongInputs.push('project_title');
        }
        if(!projectForm.goal.length){
            wrongInputs.push('project_goal');

        }
        if(!projectForm.applyRegion.length){
            wrongInputs.push('project_region');

        }
        if(!projectForm.auditory.length){
            wrongInputs.push('project_auditory');

        }
        if(!projectForm.auditoryCount.length){
            wrongInputs.push('project_auditoryCount');

        }
        if(!projectForm.description.length){
            wrongInputs.push('project_description');
        }
        if(!projectForm.partners.length){
            wrongInputs.push('project_partners');
        }
        if(!projectForm.target.length){
            wrongInputs.push('project_target');

        }
        if(!projectForm.price.length){
            wrongInputs.push('project_price');

        }
        if(!projectForm.sustainability.length){
            wrongInputs.push('project_sustainability');

        }
        if(!projectForm.information.length){
            wrongInputs.push('project_information');
        }
        if(!validateProjectTasks()){
            wrongInputs.push('project_tasks');

        }
        if(!validateProjectBudget()){
            wrongInputs.push('project_budget');
        }

        dispatch(setInvalidInputs([...invalidInputs, ...wrongInputs]));
        if(!!wrongInputs.length){
            toast.warning(t('request.fillProjectInfo'), {
                autoClose: 3000,
                closeOnClick: true
            })
        }
        return !!wrongInputs.length;
    }

    const validateProjectTasks = () => {
        let isTasksValid = true;
        for(const task of projectForm.tasks){
            if(!task.title.length || !task.time.length || !task.auditory.length){
                isTasksValid = false;
                break;
            }
        }
        return isTasksValid
    }

    const validateProjectBudget = () => {
        let isTasksValid = true;
        for(const budget of projectForm.budget){
            if(!budget.title.length || !budget.price.length || !budget.amount.length){
                isTasksValid = false;
                break;
            }
        }
        return isTasksValid
    }

    const updateStep = (type: 'inc' | 'dec') => {
        if(type === 'inc' && activeTab === 0){
            // const isTabValid = validateUserInputs();
            // if(!isTabValid) return;
            tabsRef.current?.setActiveTab(1)

        }
        if(type === 'dec' && activeTab === 1){
            tabsRef.current?.setActiveTab(0)
        }
    }

    const onSubmitHandler = async () => {
        try{
            if(activeTab === 0){
                const isInputsInvalid = validateUserInputs();
                if(isInputsInvalid) return;
                updateStep('inc');
                return;
            }

            const isInputsInvalid = validateProjectInputs() || validateUserInputs();

            if(isInputsInvalid) return;

            dispatch(setIsLoading(true));
            // return;
            const body = {
                date: new Date(),
                content: {
                    lang: i18n.language,
                    userForm,
                    projectForm
                }
            }

            const {data} = await $api.post('/request/create', body);
            setModalCode(data.code);
            localStorage.setItem('zhas-2024-code', data.code);
            dispatch(setIsLoading(false));
            onSuccess();
        } catch(err){
            toast.error(t('request.requestError'), {
                autoClose: 5000,
                closeOnClick: true,
            })
        }
    }

    const onSuccess = () => {
        setOpenModal(true);
        localStorage.removeItem('zhas-2024-user');
        localStorage.removeItem('zhas-2024-project');
        dispatch(resetForm());
    }

    return (
        <div className={classNames(cls.RequestForm, {}, [className])}>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>{ t('request.success.title') }</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            { t('request.success.text') }
                        </p>
                        <p className="text-base font-bold">
                            { modalCode }
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>{ t('ui.close') }</Button>
                </Modal.Footer>
            </Modal>
            {/*<Stepper className="mx-auto" steps={requestSteps} currentStep={currentStep} />*/}
            <div className="flex flex-col gap-3">
                <h2 className="text-center mt-2 text-lg font-medium">{ t("request.title") }</h2>

                <Tabs style="underline" aria-label="Default tabs" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
                    <Tabs.Item title={t('request.userInfo.tabTitle')} icon={UserIcon}>
                        <UserInfoForm />
                    </Tabs.Item>
                    <Tabs.Item title={t('request.projectInfo.tabTitle')} icon={BriefcaseIcon}>
                        <ProjectInfoForm />
                    </Tabs.Item>
                </Tabs>
            </div>

            {!readonly && <div className="mt-4 flex justify-between">
                <Button size="sm" disabled={activeTab === 0} onClick={() => updateStep('dec')}>{t('ui.back')}</Button>
                <Button size="sm" disabled={isLoading} isProcessing={isLoading} onClick={onSubmitHandler}
                        type="button">{
                    activeTab === 0 ? t('ui.continue') : t('ui.send')
                }</Button>
            </div>}
            {
                !!invalidInputs.length && (
                    <div className="text-right mt-2 font-bold">
                        {t('request.fillAll')}
                    </div>
                )
            }
        </div>
    );
});
