import { create } from 'zustand';

type signupFlow = 'start' | 'password' | 'verification';

type signupFlowStore = {
	step: signupFlow;
	setStep: (step: signupFlow) => void;
	formError: string | undefined;
	setFormError: (error: string | undefined) => void;
	formSuccess: string | undefined;
	setFormSuccess: (success: string | undefined) => void;
};

export const useSignUpFlowStore = create<signupFlowStore>((set) => ({
	step: 'start',
	formError: undefined,
	formSuccess: undefined,
	setStep: (step: signupFlow) => set({ step }),
	setFormError: (error: string | undefined) => set({ formError: error }),
	setFormSuccess: (success: string | undefined) =>
		set({ formSuccess: success }),
}));
