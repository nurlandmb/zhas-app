// Other code such as selectors can use the imported `RootState` type
import {RootState} from 'app/providers/store';


export const requestUserForm = (state: RootState) => state.request.userForm;

export const requestProjectForm = (state: RootState) => state.request.projectForm;

export const requestInvalidInputs = (state: RootState) => state.request.invalidInputs;

export const requestIsLoading = (state: RootState) => state.request.isLoading;

export const requestReadonly = (state: RootState) => state.request.readonly;