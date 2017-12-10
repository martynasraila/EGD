CREATE TABLE [dbo].[Collectors] (
    [Id]           INT           IDENTITY (1, 1) NOT NULL,
    [UserName]     CHAR (255)    NULL,
    [PasswordHash] CHAR (255)    NULL,
    [Title]        CHAR (255)    NULL,
    [Description]  VARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

