import { useCallback } from "react";

export const BaseUrl = "https://health-tracker-api-ggqlr5vn4a-uc.a.run.app/";
// export const BaseUrl = 'http://localhost:8080/';

export const UserApiUrl = `${BaseUrl}user/`;
export const HealthApiUrl = `${BaseUrl}health/`;

export const UserAddApiUrl = `${UserApiUrl}add`;
export type UserAddRequest = {
    id: string;
    email: string;
    name: string;
};
export type UserAddResponse = {
    id: string;
    email: string;
    name: string;
};

export const UserGetApiUrl = `${UserApiUrl}get`;
export type UserGetRequest = {
    id: string;
};
export type UserGetResponse = {
    id: string;
    email: string;
    name: string;
};

export const UserDeleteApiUrl = `${UserApiUrl}delete`;
export type UserDeleteRequest = {
    id: string;
};
export type UserDeleteResponse = {
    id: string;
};

export const HealthAddApiUrl = `${HealthApiUrl}add`;
export type HealthAddRequest = {
    userId: string;
    healthScore: number;
    comment: string;
    timestamp: number;
    medicineName: string;
};
export type HealthAddResponse = {
    id: string;
    timestamp: number;
    healthScore: number;
    comment: string;
    medicineName: string;
};

export const HealthGetApiUrl = `${HealthApiUrl}get`;
export type HealthGetRequest = {
    userId: string;
    startTime: number;
    endTime: number;
};
export type HealthGetResponse = {
    id: string;
    timestamp: number;
    healthScore: number;
    comment: string;
    medicineName: string;
};

export const HealthDeleteApiUrl = `${HealthApiUrl}delete`;
export type HealthDeleteRequest = {
    userId: string;
    uuid: string;
};
export type HealthDeleteResponse = {
    id: string;
    timestamp: number;
    healthScore: number;
    comment: string;
    medicineName: string;
};

export const usePostApi = <PayloadType, ResponseType>(apiUrl: string) => {
    const submitData = useCallback(
        async (payload: PayloadType): Promise<ResponseType> => {
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                return (await response.json()) as ResponseType;
            } catch (error) {
                throw error;
            }
        },
        [apiUrl]
    );

    return { submitData };
};
