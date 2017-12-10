using Dapper;
using EGD.Models;
using EGD.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EGD.Repositories.Repos
{
    public class LoginRepository : ILoginRepository
    {
        private readonly string _connectionString;
        public LoginRepository()
        {
            _connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=EGD;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        }

        public object Get(string UserName)
        {
            string sql = "SELECT Id FROM Collectors WHERE UserName = @UserName;" +
                " SELECT Id FROM Administrators WHERE UserName = @UserName;";

            using (IDbConnection conn = Connection)
            {
                conn.Open();

                using (var multi = conn.QueryMultiple(sql, new { UserName = UserName }))
                {

                    var collectors = multi.Read<Collectors>().FirstOrDefault();
                    
                    var admin = multi.Read<Administrators>().FirstOrDefault();

                    if (collectors != null)
                    {
                        return collectors;
                    }
                    if (admin != null)
                    {
                        return admin;
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
