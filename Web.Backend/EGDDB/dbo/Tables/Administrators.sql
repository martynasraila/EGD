CREATE TABLE [dbo].[Administrators] (
    [Id]           INT       IDENTITY (1, 1) NOT NULL,
    [UserName]     CHAR (30) NULL,
    [PasswordHash] CHAR (64) NULL,
    [Name]         CHAR (25) NULL,
    [Surname]      CHAR (30) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

