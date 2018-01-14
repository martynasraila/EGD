using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    public class EGDRepository : IEGDRepository
    {
        private readonly string _connectionString;
        public EGDRepository()
        {
            _connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=EGD;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        }
        public List<EGD> GetAllEGD()
        {
            const string sql = @"SELECT * FROM EGD";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<EGD>(sql).ToList();
            }
        }

        public EGD GetById(int id)
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
                return conn.Query<EGD>(sql, new {  id = id }).FirstOrDefault();
            }
        }

        public bool InsertEGD(EGD ourEgd)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"INSERT INTO EGD([PaddingTop],[PaddingBottom],[PaddingLeft],[PaddingRight],[PhotoStreak],[ConfigurationStreak]) 
            values (@PaddingTop, @PaddingBottom, @PaddingLeft, @PaddingRight, @PhotoStreak, @ConfigurationStreak)",
                new { ourEgd.PaddingTop, ourEgd.PaddingBottom,ourEgd.PaddingLeft,ourEgd.PaddingRight,ourEgd.PhotoStreak,ourEgd.ConfigurationStreak });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool UpdateEGD(EGD ourEgd)
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
