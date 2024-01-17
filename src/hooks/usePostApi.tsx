import { useCallback } from 'react';

export const BaseUrl = 'https://health-tracker-api-ggqlr5vn4a-uc.a.run.app/';
// export const BaseUrl = 'http://localhost:8080/';

export const UserApiUrl = `${BaseUrl}user/`;
export const HealthApiUrl = `${BaseUrl}health/`;

export type UserAddRequest = {
    id: string;
    email: string;
    name: string;
}

export type UserAddResponse = {
    id: string;
    email: string;
    name: string;
}

export type UserGetRequest = {
    id: string;
}

export type UserGetResponse = {
    id: string;
    email: string;
    name: string;
}

export type HealthAddRequest = {
    userId: string;
    healthScore: number;
    comment: string;
    timestamp: number;
}

export type HealthAddResponse = {
    id: string;
    timestamp: number;
    healthScore: number;
    comment: string;
}

export type HealthGetRequest = {
    userId: string;
    startTime: number;
    endTime: number;
}

export type HealthGetResponse = {
    id: string;
    timestamp: number;
    healthScore: number;
    comment: string;
}

export const usePostApi = <PayloadType, ResponseType>(apiUrl: string) => {
    const submitData
        = useCallback(async (payload: PayloadType): Promise<ResponseType> => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error('Something went wrong');
                }

                return await response.json() as ResponseType;
            } catch (error) {
                throw error;
            }
        }, [apiUrl]);

    return { submitData };
};
