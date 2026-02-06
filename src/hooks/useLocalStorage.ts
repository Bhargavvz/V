import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
    // Get stored value or use initial
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Update localStorage when state changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

// Specific hooks for Valentine's Week data
export interface ValentineData {
    unlockedDays: string[];
    proposalResponse?: {
        accepted: boolean;
        timestamp: string;
    };
    hugCount: number;
    promises: string[];
    signature?: string;
    savedMoments: string[];
    audioMuted: boolean;
}

const DEFAULT_DATA: ValentineData = {
    unlockedDays: [],
    hugCount: 0,
    promises: [],
    savedMoments: [],
    audioMuted: false,
};

export function useValentineData() {
    const [data, setData] = useLocalStorage<ValentineData>('valentine-week-2026', DEFAULT_DATA);

    const unlockDay = (dayId: string) => {
        setData((prev) => ({
            ...prev,
            unlockedDays: prev.unlockedDays.includes(dayId)
                ? prev.unlockedDays
                : [...prev.unlockedDays, dayId],
        }));
    };

    const isDayUnlocked = (dayId: string) => {
        return data.unlockedDays.includes(dayId);
    };

    const setProposalResponse = (accepted: boolean) => {
        setData((prev) => ({
            ...prev,
            proposalResponse: {
                accepted,
                timestamp: new Date().toISOString(),
            },
        }));
    };

    const incrementHugCount = () => {
        setData((prev) => ({
            ...prev,
            hugCount: prev.hugCount + 1,
        }));
    };

    const addPromise = (promise: string) => {
        setData((prev) => ({
            ...prev,
            promises: [...prev.promises, promise],
        }));
    };

    const setSignature = (signature: string) => {
        setData((prev) => ({
            ...prev,
            signature,
        }));
    };

    const saveMoment = (momentId: string) => {
        setData((prev) => ({
            ...prev,
            savedMoments: prev.savedMoments.includes(momentId)
                ? prev.savedMoments
                : [...prev.savedMoments, momentId],
        }));
    };

    const toggleAudioMute = () => {
        setData((prev) => ({
            ...prev,
            audioMuted: !prev.audioMuted,
        }));
    };

    return {
        data,
        unlockDay,
        isDayUnlocked,
        setProposalResponse,
        incrementHugCount,
        addPromise,
        setSignature,
        saveMoment,
        toggleAudioMute,
    };
}
