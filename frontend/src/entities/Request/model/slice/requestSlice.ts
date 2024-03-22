import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ProjectForm, RequestSchema, UserForm} from '../types.ts';


const initialUserForm = {
        name: '',
        surname: '',
        fatherName: '',
        gender: '',
        iin: '',
        birthDate: '',
        kzCitizenship: false,
        email: '',
        phone: '',
        additionalEmail: '',
        additionalPhone: '',
        familyStatus: '',
        currentlyFree: false,
        notWorkingFor: '',
        isStudying: '',
        isWorking: '',
        isMaternityLeave: '',
        region: '',
        addressType: '',
        address: '',
        degree: '',
        govProjects: [],
        additionalGovProjects: '',
        haveSocials: '',
        socials: '',
        howKnew: [],
        passportFile: [],
        citizenshipFile: [],
        notWorkingFile: []

    };
const initialProjectForm = {
    title: "",
    goal: "",
    applyRegion: "",
    auditory: "",
    auditoryCount: "",
    description: "",
    partners: "",
    target: "",
    price: "",
    sustainability: "",
    information: "",
    tasks: [
        {
            title: "",
            auditory: "",
            time: "",
        }
    ],
    budget: [{
        title: "",
        amount: "",
        price: "",
    }]
}
// Define the initial state using that type
const initialState: RequestSchema = {
    invalidInputs: [],
    userForm: initialUserForm,
    projectForm: initialProjectForm,
    isLoading: false,
    readonly: false,
}

export const requestSlice = createSlice({
    name: 'request',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUserForm: (state, action: PayloadAction<UserForm>) => {
            state.userForm = action.payload;
        },
        setProjectForm: (state, action: PayloadAction<ProjectForm>) => {
            state.projectForm = action.payload;
        },
        setInvalidInputs: (state, action: PayloadAction<string[]>) => {
            state.invalidInputs = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        removeInvalidInput: (state, action: PayloadAction<string>) => {
            state.invalidInputs = state.invalidInputs.filter(input => input !== action.payload);
        },
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        resetForm: (state) => {
            state.projectForm = initialProjectForm;
            state.userForm = initialUserForm;
            state.invalidInputs = [];
            state.isLoading = false;
        }
    }
})

export const {
    setUserForm,
    setInvalidInputs,
    removeInvalidInput,
    setProjectForm,
    setIsLoading,
    resetForm,
    setReadonly
} = requestSlice.actions


export default requestSlice.reducer