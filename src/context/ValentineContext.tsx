import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useValentineData } from '../hooks/useLocalStorage';
import type { ValentineData } from '../hooks/useLocalStorage';

interface ValentineContextType {
    data: ValentineData;
    unlockDay: (dayId: string) => void;
    isDayUnlocked: (dayId: string) => boolean;
    setProposalResponse: (accepted: boolean) => void;
    incrementHugCount: () => void;
    addPromise: (promise: string) => void;
    setSignature: (signature: string) => void;
    saveMoment: (momentId: string) => void;
    toggleAudioMute: () => void;
}

const ValentineContext = createContext<ValentineContextType | null>(null);

export function ValentineProvider({ children }: { children: ReactNode }) {
    const valentineData = useValentineData();

    return (
        <ValentineContext.Provider value={valentineData}>
            {children}
        </ValentineContext.Provider>
    );
}

export function useValentine() {
    const context = useContext(ValentineContext);
    if (!context) {
        throw new Error('useValentine must be used within a ValentineProvider');
    }
    return context;
}
