import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './ProjectInfoForm.module.scss';
import React, {memo, useEffect, useState} from 'react';
import {Button, Label, Table, Textarea, TextInput} from 'flowbite-react';
import {useAppDispatch, useAppSelector} from 'app/providers/store';
import {useSelector} from 'react-redux';
import {requestInvalidInputs, requestProjectForm, requestReadonly} from 'entities/Request/model/selectors';
import {ProjectFormBudget, ProjectFormKeys, ProjectFormTask, UserFormKeys} from 'entities/Request/model/types.ts';
import {removeInvalidInput, setProjectForm, setUserForm} from 'entities/Request/model/slice/requestSlice.ts';

interface ProjectInfoFormProps {
    className?: string;
}

export const ProjectInfoForm = memo(({className}: ProjectInfoFormProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const invalidInputs = useAppSelector(requestInvalidInputs);
    const projectForm = useAppSelector(requestProjectForm);
    const readonly = useAppSelector(requestReadonly);
    const [projectTotalSum, setProjectTotalSum] = useState(0);

    useEffect(() => {
        const totalSum = projectForm.budget.reduce((acc, item) => {
            acc += Number(item.price) * Number(item.amount);
            return acc;
        }, 0)

        setProjectTotalSum(totalSum);
    }, [projectForm.budget]);

    useEffect(() => {
        const project = localStorage.getItem('zhas-2024-project');
        if(!project || readonly) return;
        const parsedUserForm = project ? JSON.parse(project) : {};
        dispatch(setUserForm({ ...projectForm, ...parsedUserForm }));
    }, []);

    const isInputWrong = (field: string) => {
        if (invalidInputs.includes(field)) {
            return 'failure';
        }
    }

    const updateField = (field: ProjectFormKeys, value: any) => {
        if (typeof projectForm[field] !== typeof value) return;
        const projForm = JSON.parse(JSON.stringify(projectForm));
        projForm[field] = value;
        dispatch(removeInvalidInput('project_' + field));
        dispatch(setProjectForm(projForm));
        localStorage.setItem('zhas-2024-project', JSON.stringify(projForm));
    }

    const updateTableField = (index: number, field: ProjectFormKeys, value: ProjectFormBudget | ProjectFormTask) => {
        const arrCopy = JSON.parse(JSON.stringify(projectForm[field]));
        arrCopy[index] = value;
        updateField(field, arrCopy);
    }

    const removeRow = (index: number, field: ProjectFormKeys) => {
        const arrCopy = JSON.parse(JSON.stringify(projectForm[field]));
        arrCopy.splice(index, 1);
        updateField(field, arrCopy);
    }

    const addRow = (field: ProjectFormKeys) => {
        const arrCopy = JSON.parse(JSON.stringify(projectForm[field]));
        if (field === 'tasks') {
            arrCopy.push({
                title: '',
                time: '',
                auditory: ''
            })
        }

        if (field === 'budget') {
            arrCopy.push({
                title: '',
                amount: '',
                price: '',
                total: null
            })
        }
        updateField(field, arrCopy);


    }

    return (
        <div className={classNames(cls.ProjectInfoForm, {}, [className, 'mt-1'])}>
            <div className="mb-3">
                <Label color={isInputWrong('project_title')} className="text-md mb-0"
                       value={t('request.projectInfo.name.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.name.description')}</span>
                <TextInput readOnly={readonly} color={isInputWrong('project_title')} value={projectForm.title}
                           onChange={e => updateField('title', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_goal')} className="text-md mb-0"
                       value={t('request.projectInfo.reason.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.reason.description')}</span>
                <Textarea readOnly={readonly} color={isInputWrong('project_goal')} value={projectForm.goal}
                          onChange={e => updateField('goal', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_applyRegion')} className="text-md mb-1"
                       value={t('request.projectInfo.region')}/>
                <TextInput readOnly={readonly} color={isInputWrong('project_region')} value={projectForm.applyRegion}
                           onChange={e => updateField('applyRegion', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_auditory')} className="text-md mb-0"
                       value={t('request.projectInfo.auditory.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.auditory.description')}</span>
                <Textarea readOnly={readonly} color={isInputWrong('project_auditory')} value={projectForm.auditory}
                          onChange={e => updateField('auditory', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_auditoryCount')} className="text-md mb-0"
                       value={t('request.projectInfo.auditoryCount.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.auditoryCount.description')}</span>
                <TextInput readOnly={readonly} color={isInputWrong('project_auditoryCount')} type="number"
                           value={projectForm.auditoryCount} min={0}
                           onChange={e => updateField('auditoryCount', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_description')} className="text-md mb-0"
                       value={t('request.projectInfo.description.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.description.description')}</span>
                <Textarea readOnly={readonly} color={isInputWrong('project_description')}
                          value={projectForm.description}
                          onChange={e => updateField('description', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_partners')} className="text-md mb-0"
                       value={t('request.projectInfo.partners.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.partners.description')}</span>
                <Textarea readOnly={readonly} color={isInputWrong('project_partners')} value={projectForm.partners}
                          onChange={e => updateField('partners', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_target')} className="text-md mb-0"
                       value={t('request.projectInfo.target.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.target.description')}</span>
                <Textarea readOnly={readonly} color={isInputWrong('project_target')} value={projectForm.target}
                          onChange={e => updateField('target', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_price')} className="text-md mb-0"
                       value={t('request.projectInfo.price.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.price.description')}</span>
                <TextInput readOnly={readonly} color={isInputWrong('project_price')} type="number"
                           value={projectForm.price} min={0}
                           onChange={e => updateField('price', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_sustainability')} className="text-md mb-0"
                       value={t('request.projectInfo.sustainability.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.sustainability.description')}</span>
                <Textarea readOnly={readonly} color={isInputWrong('project_sustainability')}
                          value={projectForm.sustainability}
                          onChange={e => updateField('sustainability', e.target.value)}/>
            </div>
            <div className="mb-3">
                <Label color={isInputWrong('project_information')} className="text-md mb-0"
                       value={t('request.projectInfo.information.title')}/>
                <span
                    className="block leading-none text-sm mb-1 italic">{t('request.projectInfo.information.description')}</span>
                <Textarea readOnly={readonly} color={isInputWrong('project_information')}
                          value={projectForm.information}
                          onChange={e => updateField('information', e.target.value)}/>
            </div>
            <div className="p-4 bg-orange-200 mt-4 rounded-xl">
                <h3 className="text-center mb-2 font-bold">{t('request.projectInfo.tasks.tableTitle')}</h3>
                <div className="overflow-x-auto">
                    <Table color={isInputWrong('project_tasks')} striped={true} className="overflow-scroll max-w-full">
                        <Table.Head>
                            <Table.HeadCell className="p-2 pl-4">
                                №
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2">
                                {t('request.projectInfo.tasks.title')}
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2">
                                {t('request.projectInfo.tasks.time')}
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2">
                                {t('request.projectInfo.tasks.auditory')}
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2 pr-4"></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                projectForm.tasks.map((task, i) => (
                                    <Table.Row key={i}>
                                        <Table.Cell className="p-2 pl-4">
                                            {i + 1}
                                        </Table.Cell>
                                        <Table.Cell className="p-2">
                                            <TextInput readOnly={readonly} color={isInputWrong('project_tasks')}
                                                       sizing="sm" value={task.title}
                                                       onChange={e => updateTableField(i, 'tasks', {...task, title: e.target.value})}/>
                                        </Table.Cell>
                                        <Table.Cell className="p-2">
                                            <TextInput readOnly={readonly} color={isInputWrong('project_tasks')}
                                                       sizing="sm" value={task.time}
                                                       onChange={e => updateTableField(i, 'tasks', {...task, time: e.target.value})}/>
                                        </Table.Cell>
                                        <Table.Cell className="p-2">
                                            <TextInput readOnly={readonly} color={isInputWrong('project_tasks')}
                                                       sizing="sm" value={task.auditory}
                                                       onChange={e => updateTableField(i, 'tasks', {...task, auditory: e.target.value})}/>
                                        </Table.Cell>
                                        <Table.Cell className="p-2 pr-4">
                                            <Button disabled={projectForm.tasks.length === 1 || readonly}
                                                    onClick={() => removeRow(i, 'tasks')} className="rounded-full p-0"
                                                    color="failure" size="xs" pill={true}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                </svg>
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }

                        </Table.Body>
                    </Table>

                </div>
                <div className="flex justify-end mt-2">
                    <Button disabled={readonly} onClick={() => addRow('tasks')} className="p-0" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <span className="inline-block ml-1">{t("request.projectInfo.addRow")}</span>
                    </Button>
                </div>
            </div>
            <div className="p-4 bg-orange-200 mt-4 rounded-xl">
                <h3 className="text-center font-bold mb-2">{t('request.projectInfo.budget.tableTitle')}</h3>
                <div className="overflow-x-auto">
                    <Table color={isInputWrong('project_budget')} striped={true}>
                        <Table.Head>
                            <Table.HeadCell className="p-2 pl-4">
                                №
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2">
                                {t('request.projectInfo.budget.title')}
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2">
                                {t('request.projectInfo.budget.amount')}
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2">
                                {t('request.projectInfo.budget.price')}
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2">
                                {t('request.projectInfo.budget.total')}
                            </Table.HeadCell>
                            <Table.HeadCell className="p-2 pr-4"></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                projectForm.budget.map((item, i) => (
                                    <Table.Row key={i}>
                                        <Table.Cell className="p-2 pl-4">
                                            {i + 1}
                                        </Table.Cell>
                                        <Table.Cell className="p-2">
                                            <TextInput readOnly={readonly} color={isInputWrong('project_budget')}
                                                       sizing="sm" value={item.title}
                                                       onChange={e => updateTableField(i, 'budget', {...item, title: e.target.value})}/>
                                        </Table.Cell>
                                        <Table.Cell className="p-2">
                                            <TextInput readOnly={readonly} color={isInputWrong('project_budget')}
                                                       sizing="sm" type="number" value={item.price} min={0}
                                                       onChange={e => updateTableField(i, 'budget', {...item, price: e.target.value})}/>
                                        </Table.Cell>
                                        <Table.Cell className="p-2">
                                            <TextInput readOnly={readonly} color={isInputWrong('project_budget')}
                                                       sizing="sm" type="number" value={item.amount} min={0}
                                                       onChange={e => updateTableField(i, 'budget', {...item, amount: e.target.value})}/>
                                        </Table.Cell>
                                        <Table.Cell className="p-2">
                                <span>
                                    {Number(item.price) * Number(item.amount)}
                                </span>
                                        </Table.Cell>
                                        <Table.Cell className="p-2 pr-4">
                                            <Button disabled={projectForm.budget.length === 1 || readonly}
                                                    onClick={() => removeRow(i, 'budget')} className="rounded-full p-0"
                                                    color="failure" size="xs" pill={true}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                </svg>
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                            <Table.Row>
                                <Table.Cell colSpan={4}>
                                    {t('request.projectInfo.budget.totalSum')}
                                </Table.Cell>
                                <Table.Cell className="p-2" colSpan={2}>
                                    <span>
                                        {
                                            projectTotalSum
                                        }
                                    </span>
                                </Table.Cell>
                            </Table.Row>
                            {projectTotalSum > 1000000 && <Table.Row>
                                <Table.Cell colSpan={6}>
                                    <span className="text-red-700">
                                        {t('request.projectInfo.budget.sumWarn')}
                                    </span>
                                </Table.Cell>
                            </Table.Row>}
                        </Table.Body>
                    </Table>

                </div>
                <div className="flex justify-end mt-2">
                    <Button disabled={readonly} className="p-0" size="sm" onClick={() => addRow('budget')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <span className="inline-block ml-1">{t("request.projectInfo.addRow")}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
});
