export interface TripDto {
    id: number;
    startDate: string;
    endDate: string;
    dateCreated: string;
}

export interface TripContainersDto {
    containerId: number;
    tripId: number;
    containerPriority: number;
}
