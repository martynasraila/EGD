using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EGD.Models;
using System.Data;
using Dapper;
using System.Data.SqlClient;

namespace EGD.Repositories
{
    public class StatesRepository : IStatesRepository
    {
        private readonly string _connectionString;
        public StatesRepository()
        {
            _connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=EGD;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        }
        public bool DeleteState(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [States] WHERE Id = @Id", new { Id = id });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public List<States> GetAllStates()
        {
            const string sql = @"SELECT * FROM States";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<States>(sql).ToList();
            }
        }

        public States GetById(int id)
        {
            const string sql = @"SELECT 
                                    Id, 
                                    ImagePath, 
                                    Date, 
                                    StateValueId
                                FROM States
                                WHERE States.Id = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<States>(sql, new { id = id }).Single();
            }
        }

        public bool InsertState(States ourState)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"INSERT INTO States([ImagePath],[Date],[StateValueId])
            values (@ImagePath, @Date, @StateValueId)",
                new { ourState.ImagePath, ourState.Date, ourState.StateValueId });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool UpdateState(States ourState)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [States] SET [ImagePath] = @ImagePath ,[Date] = @Date," +
                " [StateValueId] = @StateValueId WHERE Id = " + ourState.Id, ourState);

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
