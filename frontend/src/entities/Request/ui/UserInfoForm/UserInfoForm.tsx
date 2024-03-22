import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './UserInfoForm.module.scss';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Button, Checkbox, FileInput, Label, Select, Spinner, Textarea, TextInput} from 'flowbite-react';
import {useMask} from '@react-input/mask';
import {requestInvalidInputs, requestReadonly, requestUserForm} from '../../model/selectors/index.ts'
import {useAppDispatch, useAppSelector} from 'app/providers/store';
import {removeInvalidInput, setInvalidInputs, setUserForm} from '../../model/slice/requestSlice.ts';
import {UserForm, UserFormKeys} from '../../model/types.ts';
import imageCompression from 'browser-image-compression';
import {$api} from 'shared/api/api.ts';
import {toast} from 'react-toastify';

interface UserInfoFormProps {
    className?: string;
}

export const UserInfoForm = memo(({className}: UserInfoFormProps) => {
    const {t} = useTranslation();
    const inputPhoneRef = useMask({mask: '+7 (___) ___-__-__', replacement: {_: /\d/}});
    const inputPhoneRef2 = useMask({mask: '+7 (___) ___-__-__', replacement: {_: /\d/}});
    const userForm = useAppSelector(requestUserForm);
    const invalidInputs = useAppSelector(requestInvalidInputs);
    const dispatch = useAppDispatch();
    const [isFilesLoading, setIsFilesLoading] = useState<any>({})
    const readonly = useAppSelector(requestReadonly)

    const getGenders = useCallback(() => [
        {code: 'male', text: t('request.userInfo.gender.male')},
        {code: 'female', text: t('request.userInfo.gender.female')}
    ], [t]);

    const getFamilyStatus = useCallback(() => [
        {code: 'alone', text: t('request.userInfo.familyStatus.alone')},
        {code: 'married', text: t('request.userInfo.familyStatus.married')},
        {code: 'divorced', text: t('request.userInfo.familyStatus.divorced')},
        {code: 'accident', text: t('request.userInfo.familyStatus.accident')},
        {code: 'another', text: t('request.userInfo.familyStatus.another')}
    ], [t]);

    const getNorWorkingFor = useCallback(() => [
        {code: 'one', text: t('request.userInfo.notWorkingFor.one')},
        {code: 'two', text: t('request.userInfo.notWorkingFor.two')},
        {code: 'three', text: t('request.userInfo.notWorkingFor.three')},
        {code: 'four', text: t('request.userInfo.notWorkingFor.four')},
        {code: 'five', text: t('request.userInfo.notWorkingFor.five')}
    ], [t]);

    const getStudy = useCallback(() => [
        {code: 'no', text: t('request.userInfo.study.no')},
        {code: 'start', text: t('request.userInfo.study.start')},
        {code: 'middle', text: t('request.userInfo.study.middle')},
        {code: 'middleTech', text: t('request.userInfo.study.middleTech')},
        {code: 'bachelor', text: t('request.userInfo.study.bachelor')},
        {code: 'master', text: t('request.userInfo.study.master')}
    ], [t]);

    const getHowKnew = useCallback(() => [
        {code: 'social', text: t('request.userInfo.howKnew.social') },
        {code: 'smi', text: t('request.userInfo.howKnew.smi') },
        {code: 'meet', text: t('request.userInfo.howKnew.meet') },
        {code: 'socialOrg', text: t('request.userInfo.howKnew.socialOrg') },
        {code: 'govOrg', text: t('request.userInfo.howKnew.govOrg') },
        {code: 'relatives', text: t('request.userInfo.howKnew.relatives') },
        {code: 'street', text: t('request.userInfo.howKnew.street') },
    ], [t])

    const getGovProjects = useCallback(() => [
        {code: 'zhas', text: t('request.userInfo.govProjects.zhas')},
        {code: 'diplom_aul', text: t('request.userInfo.govProjects.diplom_aul')},
        {code: 'zhastar_practika', text: t('request.userInfo.govProjects.zhastar_practika')},
        {code: 'zhasyl_el', text: t('request.userInfo.govProjects.zhasyl_el')},
        {code: 'zhas_maman', text: t('request.userInfo.govProjects.zhas_maman')},
        {code: 'mangilik_el', text: t('request.userInfo.govProjects.mangilik_el')},
        {code: 'bolashaq', text: t('request.userInfo.govProjects.bolashaq')},
        {code: 'damu', text: t('request.userInfo.govProjects.damu')},
        {code: 'zhas_business', text: t('request.userInfo.govProjects.zhas_business')},
        {code: 'aleu_zhumys', text: t('request.userInfo.govProjects.aleu_zhumys')},
        {code: 'tegin_bilim', text: t('request.userInfo.govProjects.tegin_bilim')},
        {code: 'another', text: t('request.userInfo.govProjects.another')}
    ], [t])

    useEffect(() => {
        const savedUserForm = localStorage.getItem('zhas-2024-user');
        if (!userForm || readonly) return;
        const parsedUser = savedUserForm ? JSON.parse(savedUserForm) : {};
        dispatch(setUserForm({ ...userForm, ...parsedUser}));
    }, []);

    const updateUserForm = useCallback((field: UserFormKeys, value: boolean | string | string[]) => {
        dispatch(removeInvalidInput(field));
        const newUserForm = JSON.parse(JSON.stringify({...userForm}));
        if (typeof newUserForm[field] !== typeof value) {
            return;
        }
        newUserForm[field] = value;
        dispatch(setUserForm(newUserForm));
        localStorage.setItem('zhas-2024-user', JSON.stringify(newUserForm));
    }, [dispatch, userForm])

    const handleFileUpload = useCallback(async (field: UserFormKeys, files: FileList) => {
        try {
            const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'image/webp'];
            setIsFilesLoading({...isFilesLoading, [field]: true});
            const pdfFiles = [];
            const imgFiles = [];
            let allFilesValid = true;

            for (let i = 0; i < files.length; i++) {

                if (files[i].type === 'application/pdf') {
                    pdfFiles.push(files[i]);
                } else {
                    imgFiles.push(files[i]);
                }

                if (!ALLOWED_TYPES.includes(files[i].type)) {
                    allFilesValid = false;
                }

            }

            if (!allFilesValid) {
                return alert('ui.wrongFile');
            }

            const compressedImgFiles = [];

            const options = {
                maxSizeMB: 2,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            }

            for (let i = 0; i < imgFiles.length; i++) {
                const compressedImg = await imageCompression(imgFiles[i], options);
                compressedImgFiles.push(compressedImg);
            }


            const readyFiles = [...compressedImgFiles, ...pdfFiles];
            const fileUrls = [];

            for (let i = 0; i < readyFiles.length; i++) {
                const fileUrl = await uploadFile(readyFiles[i]);
                fileUrls.push(fileUrl);
            }
            setIsFilesLoading({...isFilesLoading, [field]: false});
            updateUserForm(field, fileUrls);
        } catch (err) {
            toast.error(t('request.uploadError'), {
                autoClose: 5000,
                closeOnClick: true
            })
            setIsFilesLoading({...isFilesLoading, [field]: false});
        }

    }, [updateUserForm, isFilesLoading])

    const uploadFile = async (file: File) => {

        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        const {data} = await $api.post('/upload', bodyFormData);
        return data;
    }

    const removeFile = useCallback((field: UserFormKeys, item: string) => {
        const userFormCopy = JSON.parse(JSON.stringify(userForm));
        const newUrls = userFormCopy[field].filter(url => url !== item);

        updateUserForm(field, newUrls);

    }, [userForm, dispatch])

    const handleMultipleCheckbox = useCallback((field: UserFormKeys, input: HTMLInputElement) => {
        const AVAILABLE_FIELDS = ['howKnew', 'govProjects'];
        if (!AVAILABLE_FIELDS.includes(field)) return;
        if (readonly) return;
        if (input.checked) {
            updateUserForm(field, [...userForm[field], input.value])
        } else {
            const newValues = userForm[field].filter((item: any) => item !== input.value);

            updateUserForm(field, newValues);

        }
    }, [updateUserForm, userForm])

    const isAnotherGovSelected = () => userForm.govProjects && userForm.govProjects.includes('another');
    const isFemale = () => userForm.gender === 'female';
    const isNotWorking = () => userForm.currentlyFree;

    const isInputWrong = (field: UserFormKeys) => {
        if (invalidInputs.includes(field)) {
            return 'failure';
        }
    }


    return (
        <div className={classNames(cls.UserInfoForm, {}, [className])}>
            <div className="md:flex items-center gap-4 mt-1">
                <div className="flex-grow basis-0.5">
                    <Label color={isInputWrong('surname')} className={cls.label} htmlFor="surname"
                           value={t('request.userInfo.surname')}/>
                    <TextInput readOnly={readonly} color={isInputWrong('surname')} value={userForm.surname}
                               onChange={e => updateUserForm('surname', e.target.value)}
                               id="surname"/>
                </div>
                <div className="flex-grow basis-0.5">
                    <Label color={isInputWrong('name')} className={cls.label} htmlFor="name"
                           value={t('request.userInfo.name')}/>
                    <TextInput readOnly={readonly} color={isInputWrong('name')} value={userForm.name}
                               onChange={e => updateUserForm('name', e.target.value)} id="name"/>
                </div>
            </div>
            <div className="md:flex items-center gap-4 mt-1">
                <div className="flex-grow basis-0.5">
                    <Label color={isInputWrong('fatherName')} className={cls.label} htmlFor="father_name"
                           value={t('request.userInfo.fatherName')}/>
                    <TextInput readOnly={readonly} color={isInputWrong('fatherName')} value={userForm.fatherName}
                               onChange={e => updateUserForm('fatherName', e.target.value)}
                               id="father_name"/>
                </div>
                <div className="flex-grow basis-0.5">
                    <Label color={isInputWrong('gender')} className={cls.label} htmlFor="gender"
                           value={t('request.userInfo.gender.title')}/>
                    <Select disabled={readonly} color={isInputWrong('gender')} value={userForm.gender}
                            onChange={e => updateUserForm('gender', e.target.value)}
                            id="gender">
                        <option disabled value=""/>
                        {
                            getGenders().map(gender =>
                                (<option key={gender.code} value={gender.text}>
                                    {gender.text}
                                </option>))
                        }
                    </Select>
                </div>
            </div>
            <div className="md:flex items-center gap-4 mt-1">
                <div className="flex-grow basis-0.5">
                    <Label color={isInputWrong('iin')} className={cls.label} htmlFor="iin"
                           value={t('request.userInfo.iin')}/>
                    <TextInput readOnly={readonly} color={isInputWrong('iin')} value={userForm.iin}
                               onChange={e => updateUserForm('iin', e.target.value)} id="iin"
                               maxLength={12} type="number" min={0}/>
                </div>
                <div className="flex-grow basis-0.5">
                    <Label color={isInputWrong('birthDate')} className={cls.label} htmlFor="birthdate"
                           value={t('request.userInfo.birthDate')}/>
                    <TextInput readOnly={readonly} type="date" color={isInputWrong('birthDate')}
                               value={userForm.birthDate} onChange={e => updateUserForm('birthDate', e.target.value)}
                               id="birthdate"/>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-3">
                <Checkbox disabled={readonly}
                          checked={userForm.kzCitizenship}
                          onChange={e => updateUserForm('kzCitizenship', e.target.checked)} id="citizenship"/>
                <Label htmlFor="citizenship" value={t('request.userInfo.citizenship')}/>
            </div>
            <div className="mt-1">
                <Label className={cls.label} htmlFor="iin" value={t('request.userInfo.contact')}/>
                <div className="flex items-center gap-4">
                    <TextInput readOnly={readonly} color={isInputWrong('email')} value={userForm.email}
                               onChange={e => updateUserForm('email', e.target.value)}
                               className="flex-grow basis-0.5" placeholder="e-mail"/>
                    <TextInput readOnly={readonly} color={isInputWrong('phone')} value={userForm.phone}
                               onChange={e => updateUserForm('phone', e.target.value)}
                               ref={inputPhoneRef} className="flex-grow basis-0.5" placeholder="+7 (777) 777 7777"/>
                </div>
            </div>
            <div className="mt-1">
                <Label className={cls.label} htmlFor="iin" value={t('request.userInfo.contactAdditional')}/>
                <div className="flex items-center gap-4">
                    <TextInput readOnly={readonly} color={isInputWrong('additionalEmail')}
                               value={userForm.additionalEmail}
                               onChange={e => updateUserForm('additionalEmail', e.target.value)}
                               className="flex-grow basis-0.5" placeholder="e-mail"/>
                    <TextInput readOnly={readonly} color={isInputWrong('additionalPhone')}
                               value={userForm.additionalPhone}
                               onChange={e => updateUserForm('additionalPhone', e.target.value)} ref={inputPhoneRef2}
                               className="flex-grow basis-0.5" placeholder="+7 (777) 777 7777"/>
                </div>
            </div>
            <div className="mt-1">
                <Label color={isInputWrong('familyStatus')} className={cls.label} htmlFor="familyStatus"
                       value={t('request.userInfo.familyStatus.title')}/>
                <Select disabled={readonly} color={isInputWrong('familyStatus')} value={userForm.familyStatus}
                        onChange={e => updateUserForm('familyStatus', e.target.value)}
                        id="familyStatus">
                    <option disabled value=""/>
                    {
                        getFamilyStatus().map(status =>
                            (<option key={status.code} value={status.text}>
                                {status.text}
                            </option>))
                    }
                </Select>
            </div>
            <div className="flex gap-4 mt-2">
                <Checkbox disabled={readonly} checked={userForm.currentlyFree}
                          onChange={e => updateUserForm('currentlyFree', e.target.checked)} className="mt-2"
                          id="dontwork"/>
                <Label htmlFor="dontwork" value={t('request.userInfo.dontWork')}/>
            </div>
            {
                isNotWorking() && (
                    <div className="mt-1">
                        <Label color={isInputWrong('notWorkingFor')} className={cls.label} htmlFor="notWorkingFor"
                               value={t('request.userInfo.notWorkingFor.title')}/>
                        <Select disabled={readonly} color={isInputWrong('notWorkingFor')} value={userForm.notWorkingFor}
                                onChange={e => updateUserForm('notWorkingFor', e.target.value)}
                                id="notWorkingFor">
                            <option disabled value=""/>
                            {
                                getNorWorkingFor().map(item =>
                                    (<option key={item.code} value={item.text}>
                                        {item.text}
                                    </option>))
                            }
                        </Select>
                    </div>
                )
            }

            {/*<div className="md:flex items-center gap-4 mt-1">*/}
                <div className="flex-grow basis-0.5">
                    <Label color={isInputWrong('notWorkingFor')} className={cls.label} htmlFor="isStudying" value={t('request.userInfo.isStudying.title')}/>
                    <Select color={isInputWrong('notWorkingFor')} value={userForm.isStudying} onChange={e => updateUserForm('isStudying', e.target.value)}
                            id="isStudying">
                        <option disabled value="" />
                        <option value="confirm">
                            {t('request.userInfo.isStudying.confirm')}
                        </option>
                        <option value="decline">
                            {t('request.userInfo.isStudying.decline')}
                        </option>
                    </Select>
                </div>

            {/*    <div className="flex-grow basis-0.5">*/}
            {/*        <Label className={cls.label} htmlFor="isWorking" value={t('request.userInfo.isWorking')}/>*/}
            {/*        <Select value={userForm.isWorking} onChange={e => updateUserForm('isWorking', e.target.value)}*/}
            {/*                id="isWorking">*/}
            {/*            <option disabled value="" />*/}
            {/*            <option value="confirm">*/}
            {/*                {t('ui.yes')}*/}
            {/*            </option>*/}
            {/*            <option value="decline">*/}
            {/*                {t('ui.no')}*/}
            {/*            </option>*/}
            {/*        </Select>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div>
                <Label color={isInputWrong('region')} className={cls.label} htmlFor="obl"
                       value={t('request.userInfo.region')}/>
                <Select disabled={readonly} color={isInputWrong('region')} value={userForm.region}
                        onChange={e => updateUserForm('region', e.target.value)}
                        id="obl">
                    <option disabled value=""/>
                    <option value="Алматы">
                        Алматы
                    </option>
                    <option value="Абай">
                        Абай
                    </option>
                </Select>
            </div>
            <div className="md:flex items-center gap-4 mt-1">
                {
                    isFemale() && (
                        <div className="flex-grow basis-0.5">
                            <Label color={isInputWrong('isMaternityLeave')} className={cls.label} htmlFor="isMaternityLeave"
                                   value={t('request.userInfo.isMaternityLeave')}/>
                            <Select disabled={readonly} color={isInputWrong('isMaternityLeave')}
                                    value={userForm.isMaternityLeave}
                                    onChange={e => updateUserForm('isMaternityLeave', e.target.value)}
                                    id="isMaternityLeave">
                                <option disabled value=""/>
                                <option value={t('ui.yes')}>
                                    {t('ui.yes')}
                                </option>
                                <option value={t('ui.no')}>
                                    {t('ui.no')}
                                </option>
                            </Select>
                        </div>
                    )
                }

                <div className="flex-grow basis-0.5">
                    <Label color={isInputWrong('addressType')} className={cls.label} htmlFor="livesIn"
                           value={t('request.userInfo.livesIn.title')}/>
                    <Select disabled={readonly} color={isInputWrong('addressType')} value={userForm.addressType}
                            onChange={e => updateUserForm('addressType', e.target.value)}
                            id="livesIn">
                        <option disabled value=""/>
                        <option value={t('request.userInfo.livesIn.village')}>
                            {t('request.userInfo.livesIn.village')}
                        </option>
                        <option value={t('request.userInfo.livesIn.center')}>
                            {t('request.userInfo.livesIn.center')}
                        </option>
                        <option value={t('request.userInfo.livesIn.cityVillage')}>
                            {t('request.userInfo.livesIn.cityVillage')}
                        </option>
                    </Select>
                </div>
            </div>

            <div className="mt-1">
                <Label color={isInputWrong('address')} className={cls.label} htmlFor="isWorking"
                       value={t('request.userInfo.address.title')}/>
                <Textarea readOnly={readonly} color={isInputWrong('address')} value={userForm.address}
                          onChange={e => updateUserForm('address', e.target.value)}
                          placeholder={t('request.userInfo.address.description')}/>
            </div>
            <div className="mt-1">
                <Label color={isInputWrong('degree')} className={cls.label} htmlFor="study"
                       value={t('request.userInfo.study.title')}/>
                <Select disabled={readonly} color={isInputWrong('degree')} value={userForm.degree}
                        onChange={e => updateUserForm('degree', e.target.value)} id="study">
                    <option disabled value=""/>
                    {
                        getStudy().map(item =>
                            (<option key={item.code} value={item.text}>
                                {item.text}
                            </option>))
                    }
                </Select>
            </div>
            <div className="mt-1">
                <Label className={cls.label} value={t('request.userInfo.govProjects.title')}/>
                {getGovProjects().map(proj => (
                    <div className="flex items-center gap-2" key={proj.code}>
                        <Checkbox checked={userForm.govProjects && userForm.govProjects.includes(proj.text)} disabled={readonly}
                                  onChange={(e) => handleMultipleCheckbox('govProjects', e.target)}
                                  id={proj.code} value={proj.text}/>
                        <Label htmlFor={proj.code} value={proj.text}/>
                    </div>
                ))}
            </div>
            {
                isAnotherGovSelected() && (
                    <div className="mt-1">
                        <Label className={cls.label} value={t('request.userInfo.enterGovProject')}/>
                        <TextInput readOnly={readonly} value={userForm.additionalGovProjects}
                                   onChange={e => updateUserForm('additionalGovProjects', e.target.value)}/>
                    </div>
                )
            }
            <div className="mt-1">
                <Label className={cls.label} htmlFor="haveSocials">{ t('request.userInfo.socials.question') }</Label>
                <Select disabled={readonly} color={isInputWrong('haveSocials')} value={userForm.haveSocials}
                        onChange={e => updateUserForm('haveSocials', e.target.value)}
                        id="haveSocials">
                    <option disabled value=""/>
                    <option value={t('ui.yes')}>{ t('ui.yes') }</option>
                    <option value={t('ui.no')}>{ t('ui.no') }</option>
                </Select>
            </div>
            <div className="mt-1">
                <Label color={isInputWrong('socials')} className={cls.label} htmlFor="socials"
                       value={t('request.userInfo.socials.title')}/>
                <Textarea readOnly={readonly} color={isInputWrong('socials')} value={userForm.socials}
                          onChange={e => updateUserForm('socials', e.target.value)}
                          id="socials" placeholder={t('request.userInfo.socials.description')}/>
            </div>
            <div>
                <Label className={cls.label} value={t('request.userInfo.govProjects.title')}/>
                {getHowKnew().map(item => (
                    <div className="flex items-center gap-2" key={item.code}>
                        <Checkbox checked={userForm.howKnew && userForm.howKnew.includes(item.text)} disabled={readonly}
                                  onChange={(e) => handleMultipleCheckbox('howKnew', e.target)}
                                  id={item.code} value={item.text}/>
                        <Label htmlFor={item.code} value={item.text}/>
                    </div>
                ))}
            </div>
            <div className="mt-1">
                <Label color={isInputWrong('passportFile')} className={cls.label} htmlFor="multiple-file-upload"
                       value={t('request.userInfo.files.passport')}/>
                {readonly || userForm.passportFile.length ?
                    userForm.passportFile.map(item => (
                        <div key={item} className="inline-flex mr-2 items-center gap-4">
                            <a target="_blank" href={item}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </a>
                            <Button disabled={readonly} type="button"
                                    onClick={() => removeFile('passportFile', item)} className="rounded-full p-0"
                                    color="failure" size="xs" pill={true}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </Button>
                        </div>

                    ))
                    : <FileInput readOnly={readonly} disabled={isFilesLoading['passportFile']}
                                 color={isInputWrong('passportFile')} accept=".jpg, .png, .jpeg, .pdf, .webp"
                                 onChange={e => handleFileUpload('passportFile', e.target.files)}
                                 id="multiple-file-upload"
                                 multiple/>}
                {isFilesLoading['passportFile'] && <div className="text-center block mt-2">
                    <span className="inline-block mr-4 font-medium">
                        {t('ui.loading')}
                    </span>
                    <Spinner color="info" aria-label="Info spinner example"/>
                </div>}
            </div>
            <div className="mt-1">
                <Label color={isInputWrong('citizenshipFile')} className={cls.label} htmlFor="multiple-file-upload-2"
                       value={t('request.userInfo.files.citizenship')}/>
                {readonly || userForm.citizenshipFile.length ?
                    userForm.citizenshipFile.map(item => (
                        <div key={item} className="inline-flex mr-4 items-center gap-4">
                            <a target="_blank" href={item}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </a>
                            <Button disabled={readonly} type="button"
                                    onClick={() => removeFile('citizenshipFile', item)} className="rounded-full p-0"
                                    color="failure" size="xs" pill={true}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </Button>
                        </div>
                    ))
                    : <FileInput readOnly={readonly} disabled={isFilesLoading['citizenshipFile']}
                                 color={isInputWrong('citizenshipFile')} accept=".jpg, .png, .jpeg, .pdf, .webp"
                                 onChange={e => handleFileUpload('citizenshipFile', e.target.files)}
                                 id="multiple-file-upload-2"
                                 multiple/>}
                {isFilesLoading['citizenshipFile'] && <div className="text-center block mt-2">
                    <span className="inline-block mr-4 font-medium">
                        {t('ui.loading')}
                    </span>
                    <Spinner color="info" aria-label="Info spinner example"/>
                </div>}

            </div>
            <div className="mt-1">
                <Label color={isInputWrong('notWorkingFile')} className={cls.label} htmlFor="multiple-file-upload-3"
                       value={t('request.userInfo.files.notWork')}/>

                {
                    readonly || userForm.notWorkingFile.length ?
                        userForm.notWorkingFile.map(item => (
                            <div key={item} className="inline-flex mr-2 items-center gap-4">
                                <a target="_blank" href={item}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                </a>
                                <Button disabled={readonly} type="button"
                                        onClick={() => removeFile('notWorkingFile', item)} className="rounded-full p-0"
                                        color="failure" size="xs" pill={true}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </Button>
                            </div>
                        )) :
                        <FileInput readOnly={readonly} disabled={isFilesLoading['notWorkingFile']}
                                   color={isInputWrong('notWorkingFile')} accept=".jpg, .png, .jpeg, .pdf, .webp"
                                   onChange={e => handleFileUpload('notWorkingFile', e.target.files)}
                                   id="multiple-file-upload-3"
                                   multiple/>
                }

                {isFilesLoading['notWorkingFile'] && <div className="text-center block mt-2">
                    <span className="inline-block mr-4 font-medium">
                        {t('ui.loading')}
                    </span>
                    <Spinner color="info" aria-label="Info spinner example"/>
                </div>}

            </div>
            {/*Тегі +*/}
            {/*Аты +*/}
            {/*Әкесінің аты +*/}
            {/*Жынысы +*/}
            {/*ЖСН +*/}
            {/*Туған күні +*/}
            {/*Азаматтығы +*/}
            {/*Байланыс +*/}
            {/*Ұялы телефон +*/}
            {/*Кеңсе тел. +*/}
            {/*Эл пошта +*/}
            {/*Байланыс жасайтын тұлға +*/}
            {/*Ұялы телефон +*/}
            {/*Кеңсе тел. +*/}
            {/*Эл пошта +*/}
            {/*Отбасы жағдайы +*/}
            {/*Қазіргі уақытта жұмыссыз +*/}
            {/*Оқып жатырсыз ба +*/}
            {/*Жұмыс істеп жатырсыз ба +*/}
            {/*Декреттік демалыстасыз ба +*/}
            {/*Қайда тұрасыз +*/}
            {/*Нақты мекенжай +*/}
            {/*Бітірген оқу орны +*/}
            {/*Жұмыссыз қанша жыл +*/}
            {/*Қандай бағдарламаларға қатыстыңыз*/}
            {/*Әлеуметтік желілерде парақша +*/}
        </div>
    );
});
