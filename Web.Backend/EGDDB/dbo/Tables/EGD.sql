CREATE TABLE [dbo].[EGD] (
    [Id]                  INT IDENTITY (1, 1) NOT NULL,
    [PaddingTop]          INT NULL,
    [PaddingBottom]       INT NULL,
    [PaddingLeft]         INT NULL,
    [PaddingRight]        INT NULL,
    [PhotoStreak]         INT NULL,
    [ConfigurationStreak] INT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

