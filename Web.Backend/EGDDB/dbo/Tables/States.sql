CREATE TABLE [dbo].[States] (
    [Id]           INT        IDENTITY (1, 1) NOT NULL,
    [ImagePath]    CHAR (255) NULL,
    [Date]         DATETIME   NULL,
    [ContainerId]  INT        NULL,
    [StateValueId] INT        NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Containers] FOREIGN KEY ([ContainerId]) REFERENCES [dbo].[Containers] ([Id]),
    CONSTRAINT [FK_State_Values] FOREIGN KEY ([StateValueId]) REFERENCES [dbo].[State_Values] ([Id])
);

