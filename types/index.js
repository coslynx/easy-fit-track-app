interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface Goal {
    id: string;
    userId: string;
    title: string;
    description: string;
    startDate: string;
    targetDate: string;
    createdAt: string;
    updatedAt: string;
}

type APIResponse<T> = {
    message: string;
    data: T;
    error?: any;
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
};


export type { User, Goal, APIResponse, AuthContextType };