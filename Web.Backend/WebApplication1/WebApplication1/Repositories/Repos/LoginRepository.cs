using Dapper;
using EGD.Models;
using EGD.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1;

namespace EGD.Repositories.Repos
{
    public class LoginRepository : ILoginRepository
    {
        private readonly string _connectionString;
        public LoginRepository()
        {
            _connectionString = Startup.ConnectionString;
        }

        public object Get(string UserName)
        {
            // TODO: fix wrong return data.
            string sql = "SELECT Id, UserName, PasswordHash, Title FROM Collectors WHERE UserName = @UserName;" +
                " SELECT Id, PasswordHash, Name, Surname FROM Administrators WHERE UserName = @UserName;";

            using (IDbConnection conn = Connection)
            {
                conn.Open();

                using (var multi = conn.QueryMultiple(sql, new { UserName = UserName }))
                {
                    var collectors = multi.Read<Collectors>().FirstOrDefault();
                    var admin = multi.Read<Administrators>().FirstOrDefault();
                    
                    var loginDto = new LoginDto();

                    if (collectors != null)
                    {
                        loginDto.Id = collectors.Id;
                        loginDto.PasswordHash = collectors.PasswordHash.Trim();
                        loginDto.Title = collectors.Title;
                        loginDto.UserKind = "collector";
                        return loginDto;
                    }

                    if (admin != null)
                    {
                        loginDto.Id = admin.Id;
                        loginDto.PasswordHash = admin.PasswordHash.Trim();
                        loginDto.Title = $"{admin.Name.Trim()} {admin.Surname.Trim()}";
                        loginDto.UserKind = "administrator";
                        return loginDto;
                    }
                }
                return null;
            }
        }
        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }
    }
}
