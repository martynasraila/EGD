using EGD.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EGD.Models;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using WebApplication1;

namespace EGD.Repositories.Repos
{
    public class Trips_ContainersRepository : ITrips_ContainersRepository
    {
        private readonly string _connectionString;
        public Trips_ContainersRepository()
        {
            _connectionString = Startup.ConnectionString;
        }

        public bool DeleteByContainerId(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [Trips_Containers] WHERE ContainerId = @Id", new { Id = id });
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
                int rowsAffected = conn.Execute(@"DELETE FROM [Trips_Containers] WHERE TripId = @Id", new { Id = id });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public List<Trips_Containers> GetAllTrips_Containers()
        {
            const string sql = @"SELECT * FROM Trips_Containers";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Trips_Containers>(sql).ToList();
            }
        }

        public List<Trips_Containers> GetByContainerId(int id)
        {
            const string sql = @"SELECT 
                                    TripId,ContainerId, ContainerPriority
                                FROM Trips_Containers
                                WHERE Trips_Containers.ContainerId = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<Trips_Containers>(sql, new { id = id }).ToList();
            }
        }

        public List<Trips_Containers> GetByTripId(int id)
        {
            const string sql = @"SELECT 
                                    TripId,ContainerId,ContainerPriority
                                FROM Trips_Containers
                                WHERE Trips_Containers.TripId = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<Trips_Containers>(sql, new { id = id }).ToList();
            }
        }

        public bool InsertTrip_Container(Trips_Containers ourTrip_Container)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"INSERT INTO Trips_Containers([TripId],[ContainerId],[ContainerPriority]) 
            values (@TripId, @ContainerId,@ContainerPriority)",
                new { ourTrip_Container.TripId, ourTrip_Container.ContainerId, ourTrip_Container.ContainerPriority });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool UpdateByContainerId(Trips_Containers ourTrip_Container)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Trips_Containers] SET [TripId] = @TripId, [ContainerId]=@ContainerId, [ContainerPriority]=@ContainerPriority" +
                " WHERE ContainerId = " + ourTrip_Container.ContainerId, ourTrip_Container);

                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool UpdateByTripId(Trips_Containers ourTrip_Container)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Trips_Containers] SET [TripId] = @TripId, [ContainerId]=@ContainerId, [ContainerPriority]=@ContainerPriority" +
                " WHERE ContainerId = " + ourTrip_Container.TripId, ourTrip_Container);

                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }
        public bool UpdateByPriority(Trips_Containers ourTrip_Container)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Trips_Containers] SET [ContainerPriority]=@ContainerPriority" +
                " WHERE ContainerId = " + ourTrip_Container.ContainerId + " AND TripId = " + ourTrip_Container.TripId , ourTrip_Container);

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
