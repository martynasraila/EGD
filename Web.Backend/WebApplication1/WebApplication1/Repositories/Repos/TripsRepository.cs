using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EGD.Models;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using WebApplication1;

namespace EGD.Repositories
{
    public class TripsRepository : ITripsRepository
    {
        private readonly string _connectionString;
        public TripsRepository()
        {
            _connectionString = Startup.ConnectionString;
        }
        public bool DeleteTrip(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [Trips] WHERE Id = @Id", new { Id = id });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public List<Trips> GetAllTrips()
        {
            const string sql = @"SELECT * FROM Trips";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Trips>(sql).ToList();
            }
        }

        public Trips GetById(int id)
        {
            const string sql = @"SELECT 
                                    Id, 
                                    StartDate, 
                                    EndDate, 
                                    DateCreated
                                FROM Trips
                                WHERE Trips.Id = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<Trips>(sql, new { id = id }).Single();
            }
        }

        public int InsertTrip(Trips ourTrip)
        {
            DateTime? dt = null;
        
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                string sql = @"INSERT INTO Trips([StartDate],[EndDate],[DateCreated]) 
            values (@StartDate, @EndDate, @DateCreated);
            SELECT CAST(SCOPE_IDENTITY() as int)";
                 var id = conn.Query<int>(sql, new { StartDate = dt,EndDate = dt,ourTrip.DateCreated }).Single();
                if (id > 0)
                {
                    return id;
                }
                return -1;
            }
        }

        public bool UpdateTrip(Trips ourTrip)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Trips] SET [StartDate] = @StartDate ,[EndDate] = @EndDate," +
                " [DateCreated] = @DateCreated WHERE Id = " + ourTrip.Id, ourTrip);

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
