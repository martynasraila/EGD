using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EGD.Models;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace EGD.Repositories
{
    public class TripsRepository : ITripsRepository
    {
        private readonly string _connectionString;
        public TripsRepository()
        {
            _connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=EGD;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
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

        public bool InsertTrip(Trips ourTrip)
        {
            DateTime? dt = null;
        
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"INSERT INTO Trips([StartDate],[EndDate],[DateCreated]) 
            values (@StartDate, @EndDate, @DateCreated)",
                new { StartDate = dt,EndDate = dt,ourTrip.DateCreated });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
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
