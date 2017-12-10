CREATE TABLE [dbo].[Trips_Containers] (
    [TripId]            INT NOT NULL,
    [ContainerId]       INT NOT NULL,
    [ContainerPriority] INT NULL,
    FOREIGN KEY ([ContainerId]) REFERENCES [dbo].[Containers] ([Id]),
    FOREIGN KEY ([TripId]) REFERENCES [dbo].[Trips] ([Id])
);

