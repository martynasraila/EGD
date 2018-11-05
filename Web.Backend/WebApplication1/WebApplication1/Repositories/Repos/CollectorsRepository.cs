using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using EGD.Models;
using Dapper;
using WebApplication1;

namespace EGD.Repositories
{
    public class CollectorsRepository : ICollectorsRepository
    {
        private readonly string _connectionString;
        public CollectorsRepository()
        {
            _connectionString = Startup.ConnectionString;
        }

        public bool DeleteCollector(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [Collectors] WHERE Id = @Id", new { Id = id });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public List<Collectors> GetAllCollectors()
        {
            const string sql = @"SELECT * FROM Collectors";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Collectors>(sql).ToList();
            }
        }

        public Collectors GetById(int id)
        {
            const string sql = @"SELECT 
                                    Id, 
                                    UserName, 
                                    Passwordhash, 
                                    Title,
                                    Description 
                                FROM Collectors
                                WHERE Collectors.Id = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<Collectors>(sql, new { id = id }).Single();
            }
        }

        public int InsertCollector(Collectors ourCollectors)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int itemId = conn.Query<int>(@"INSERT INTO Collectors([UserName],[PasswordHash],[Title],
            [Description]) 
            values (@UserName, @PasswordHash, @Title, @Description);
            SELECT CAST(SCOPE_IDENTITY() as int)",
                new { ourCollectors.UserName, ourCollectors.PasswordHash, ourCollectors.Title, ourCollectors.Description }).Single();
                if (itemId != -1)
                {
                    return itemId;
                }
                return -1;
            }
        }

        public bool UpdateCollector(Collectors ourCollectors)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Collectors] SET [UserName] = @UserName ,[PasswordHash] = @PasswordHash," +
                " [Title] = @Title,[Description]=@Description WHERE Id = " + ourCollectors.Id, ourCollectors);

                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
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
