using EGD.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EGD.Models;
using System.Data.SqlClient;
using System.Data;
using Dapper;

namespace EGD.Repositories.Repos
{
    public class Collectors_TripsRepository : ICollectors_TripsRepository
    {
        private readonly string _connectionString;
        public Collectors_TripsRepository()
        {
            _connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=EGD;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        }
        public bool DeleteByCollectorId(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [Collectors_Trips] WHERE CollectorId = @Id", new { Id = id });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool DeleteByTripId(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [Collectors_Trips] WHERE TripId = @Id", new { Id = id });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public List<Collectors_Trips> GetAllCollectors_Trips()
        {
            const string sql = @"SELECT * FROM Collectors_Trips";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Collectors_Trips>(sql).ToList();
            }
        }

        public List<Collectors_Trips> GetByCollectorId(int id)
        {
            const string sql = @"SELECT 
                                    CollectorId,TripId 
                                FROM Collectors_Trips
                                WHERE Collectors_Trips.CollectorId = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<Collectors_Trips>(sql, new { id = id }).ToList();
            }
        }

        public List<Collectors_Trips> GetByTripId(int id)
        {
            const string sql = @"SELECT 
                                    CollectorId,TripId 
                                FROM Collectors_Trips
                                WHERE Collectors_Trips.TripId = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<Collectors_Trips>(sql, new { id = id }).ToList();
            }
        }

        public bool InsertCollector_Trip(Collectors_Trips ourCollector_Trip)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"INSERT INTO Collectors_Trips([CollectorId],[TripId]) 
            values (@CollectorId, @TripId)",
                new { ourCollector_Trip.CollectorId, ourCollector_Trip.TripId });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool UpdateByCollectorId(Collectors_Trips ourCollector_Trip)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Collectors_Trips] SET [CollectorId] = @CollectorId ,[TripId] = @TripId" +
                " WHERE CollectorId = " + ourCollector_Trip.CollectorId, ourCollector_Trip);

                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool UpdateByTripId(Collectors_Trips ourCollector_Trip)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Collectors_Trips] SET [CollectorId] = @CollectorId ,[TripId] = @TripId" +
                " WHERE TripId = " + ourCollector_Trip.TripId, ourCollector_Trip);

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
