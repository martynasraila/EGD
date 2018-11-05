using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Repositories;

namespace WebApplication1
{
    public class EGDRepository : IEGDRepository
    {
        private readonly string _connectionString;
        public EGDRepository()
        {
            _connectionString = Startup.ConnectionString;
        }
        public List<WebApplication1.Models.EGD> GetAllEGD()
        {
            const string sql = @"SELECT * FROM EGD";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<WebApplication1.Models.EGD>(sql).ToList();
            }
        }

        public WebApplication1.Models.EGD GetById(int id)
        {
            const string sql = @"SELECT 
                                    Id, 
                                    PaddingTop, 
                                    PaddingBottom, 
                                    PaddingLeft,
                                    PaddingRight,
                                    PhotoStreak,
                                    ConfigurationStreak 
                                FROM EGD
                                WHERE EGD.Id = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<WebApplication1.Models.EGD>(sql, new {  id = id }).FirstOrDefault();
            }
        }

        public int InsertEGD(WebApplication1.Models.EGD ourEgd)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                string sql = @"INSERT INTO EGD([PaddingTop],[PaddingBottom],[PaddingLeft],[PaddingRight],[PhotoStreak],[ConfigurationStreak]) 
            values (@PaddingTop, @PaddingBottom, @PaddingLeft, @PaddingRight, @PhotoStreak, @ConfigurationStreak);
            SELECT CAST(SCOPE_IDENTITY() as int)";
                var id = conn.Query<int>(sql, new { ourEgd.PaddingTop, ourEgd.PaddingBottom,ourEgd.PaddingLeft,ourEgd.PaddingRight,ourEgd.PhotoStreak,ourEgd.ConfigurationStreak }).Single();
                if (id > 0)
                {
                    return id;
                }
                return -1;
            }
        }

        public bool UpdateEGD(WebApplication1.Models.EGD ourEgd)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [EGD] SET [PaddingTop] = @PaddingTop ,[PaddingBottom] = @PaddingBottom," +
                " [PaddingLeft] = @PaddingLeft,[PaddingRight]=@PaddingRight,[PhotoStreak]=@PhotoStreak," +
                "[ConfigurationStreak]=@ConfigurationStreak WHERE Id = " + ourEgd.Id, ourEgd);

                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }
        public bool DeleteEGD(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [EGD] WHERE Id = @Id", new { Id = id });
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
