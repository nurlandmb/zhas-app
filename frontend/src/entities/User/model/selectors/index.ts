import {RootState} from 'app/providers/store';

export const userEmail = (state: RootState) => state.user.email;

export const userIsLoading = (state: RootState) => state.user.isLoading;

export const userType = (state: RootState) => state.user.type;
