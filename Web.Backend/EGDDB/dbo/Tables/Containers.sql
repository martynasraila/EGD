CREATE TABLE [dbo].[Containers] (
    [Id]          INT        IDENTITY (1, 1) NOT NULL,
    [Address]     CHAR (100) NULL,
    [Longitude]   INT        NULL,
    [Latitude]    INT        NULL,
    [Description] CHAR (255) NULL,
    [EGDid]       INT        NULL,
    [LastStateid] INT        NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_EGD_Id] FOREIGN KEY ([EGDid]) REFERENCES [dbo].[EGD] ([Id]),
    CONSTRAINT [FK_State_Id] FOREIGN KEY ([LastStateid]) REFERENCES [dbo].[States] ([Id])
);


GO
ALTER TABLE [dbo].[Containers] NOCHECK CONSTRAINT [FK_EGD_Id];


GO
ALTER TABLE [dbo].[Containers] NOCHECK CONSTRAINT [FK_State_Id];

