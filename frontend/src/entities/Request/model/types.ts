export interface RequestSchema {
    userForm: UserForm;
    projectForm: ProjectForm;
    invalidInputs: string[];
    isLoading: boolean;
    readonly: boolean;
}

export interface UserForm {
    name: string,
    surname: string,
    fatherName: string,
    iin: string,
    birthDate: string,
    kzCitizenship: boolean,
    gender: string;
    email: string,
    phone: string,
    additionalEmail: string,
    additionalPhone: string,
    familyStatus: string,
    currentlyFree: boolean,
    notWorkingFor: string,
    isStudying: string,
    isWorking: string,
    isMaternityLeave: string,
    region: string,
    addressType: string,
    address: string,
    degree: string,
    govProjects: string[],
    additionalGovProjects: string,
    howKnew: string[],
    haveSocials: string,
    socials: string,
    passportFile: string[],
    citizenshipFile: string[],
    notWorkingFile: string[],
}

export type UserFormKeys = keyof UserForm;


export interface ProjectFormTask {
    title: string;
    time: string;
    auditory: string;
}

export interface ProjectFormBudget {
    title: string;
    amount: string;
    price: string;
}

export interface ProjectForm {
    title: string;
    goal: string;
    applyRegion: string;
    auditory: string;
    auditoryCount: string;
    description: string;
    partners: string;
    target: string;
    price: string;
    sustainability: string;
    information: string;
    tasks: ProjectFormTask[];
    budget: ProjectFormBudget[];

}

export type ProjectFormKeys = keyof ProjectForm;
