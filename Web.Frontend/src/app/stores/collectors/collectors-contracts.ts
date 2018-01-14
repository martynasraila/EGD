export interface CollectorDto {
    id: number;
    userName: string;
    passwordHash: string;
    title: string;
    description: string;
    userKind: string;
}

export interface CollectorContainerDto {
    collectorId: number;
    containerId: number;
}

export interface CollectorTripDto {
    collectorId: number;
    tripId: number;
}
