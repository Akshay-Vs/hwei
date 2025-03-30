import { create } from 'zustand';

type authFlow = 'start' | 'password' | 'verification';

type authFlowStore = {
	step: authFlow;
	setStep: (step: authFlow) => void;
	formError: string | undefined;
	setFormError: (error: string | undefined) => void;
	formSuccess: string | undefined;
	setFormSuccess: (success: string | undefined) => void;
};

export const useAuthFlowStore = create<authFlowStore>((set) => ({
	step: 'start',
	formError: undefined,
	formSuccess: undefined,
	setStep: (step: authFlow) => set({ step }),
	setFormError: (error: string | undefined) => set({ formError: error }),
	setFormSuccess: (success: string | undefined) =>
		set({ formSuccess: success }),
}));
