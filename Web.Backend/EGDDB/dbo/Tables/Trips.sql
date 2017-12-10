CREATE TABLE [dbo].[Trips] (
    [Id]          INT      IDENTITY (1, 1) NOT NULL,
    [StartDate]   DATETIME NULL,
    [EndDate]     DATETIME NULL,
    [DateCreated] DATETIME NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

