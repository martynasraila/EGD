CREATE TABLE [dbo].[Collectors_Containers] (
    [CollectorId] INT NOT NULL,
    [ContainerId] INT NOT NULL,
    FOREIGN KEY ([CollectorId]) REFERENCES [dbo].[Collectors] ([Id]),
    FOREIGN KEY ([ContainerId]) REFERENCES [dbo].[Containers] ([Id])
);

