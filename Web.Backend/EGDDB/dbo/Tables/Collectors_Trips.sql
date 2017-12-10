CREATE TABLE [dbo].[Collectors_Trips] (
    [CollectorId] INT NOT NULL,
    [TripId]      INT NOT NULL,
    FOREIGN KEY ([CollectorId]) REFERENCES [dbo].[Collectors] ([Id]),
    FOREIGN KEY ([TripId]) REFERENCES [dbo].[Trips] ([Id])
);

