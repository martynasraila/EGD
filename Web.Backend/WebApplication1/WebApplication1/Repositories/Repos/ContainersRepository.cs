using Dapper;
using EGD.Models;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace EGD.Repositories
{
    public class ContainersRepository : IContainersRepository
    {
        private readonly string _connectionString;
        public ContainersRepository()
        {
            _connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=EGD;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        }
        public List<Containers> GetAllContainers()
        {
            const string sql = @"SELECT * FROM Containers";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Containers>(sql).ToList();
            }
        }

        public Containers GetById(int id)
        {
            const string sql = @"SELECT 
                                    Id, 
                                    Address, 
                                    Longitude, 
                                    Latitude,
                                    Description,
                                    EGDid,
                                    LastStateid 
                                FROM Containers
                                WHERE Containers.Id = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<Containers>(sql, new { id = id }).Single();
            }
        }

        public bool InsertContainer(Containers ourContainer)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"INSERT INTO Containers([Address],
                [Longitude],[Latitude],[Description],[EGDid],[LastStateid]) 
                    values (@Address, @Longitude, @Latitude, @Description, @EGDid, @LastStateid)",
                new { ourContainer.Address, ourContainer.Longitude, ourContainer.Latitude, ourContainer.Description, ourContainer.EGDid, ourContainer.LastStateid});
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool UpdateContainer(Containers ourContainer)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Containers] SET [Address] = @Address ,
                    [Longitude] = @Longitude," +
                " [Latitude] = @Latitude," +
                "[Description]=@Description," +
                "[EGDid]=@EGDid," +
                "[LastStateid]=@LastStateid WHERE Id = " + ourContainer.Id, ourContainer);

                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool DeleteContainer(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [Containers] WHERE Id = @Id", new { Id = id });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }
        public List<ContainerStatistics> GetStatistics()
        {
            string sql = "SELECT * FROM dbo.Containers; " +
                "SELECT * FROM dbo.Containers LEFT	JOIN dbo.States " +
                " ON dbo.Containers.LastStateid = dbo.States.Id " +
                "WHERE StateValueId = 1005;" +
                "SELECT * FROM dbo.Containers LEFT	JOIN dbo.States " +
                " ON dbo.Containers.LastStateid = dbo.States.Id " +
                 "  WHERE StateValueId = 3 OR StateValueId = 4; " +
                 "SELECT * FROM dbo.Containers LEFT	JOIN dbo.States " +
                " ON dbo.Containers.LastStateid = dbo.States.Id " +
                 "  WHERE StateValueId = 1 OR StateValueId = 2; " +
                 " SELECT * FROM dbo.Collectors; " +
                 " SELECT * FROM dbo.Trips " +
                  " WHERE StartDate > CONVERT(date, SYSDATETIME()); " +
                  " SELECT Trips.StartDate, dbo.Collectors.UserName " +
                    " FROM dbo.Collectors, dbo.Trips,dbo.Collectors_Trips " +
                    " WHERE StartDate > CONVERT(date, SYSDATETIME()) " +
                     " AND dbo.Collectors.Id = dbo.Collectors_Trips.CollectorId " +
                        " AND dbo.Trips.Id = dbo.Collectors_Trips.TripId;";
            ContainerStatistics stats = new ContainerStatistics();
            List < ContainerStatistics > tarpinis = new List<ContainerStatistics>();
            
            using (IDbConnection conn = Connection)
            {
                conn.Open();

                using (var multi = conn.QueryMultiple(sql))
                {
                    var containerCount = multi.Read<Collectors>().Count();
                    int inactive = multi.Read<Collectors>().Count();
                    var full = multi.Read<Collectors>().Count();
                    var empty = multi.Read<Collectors>().Count();
                    var collectorcount = multi.Read<Collectors>().Count();
                    var todaysTrips = multi.Read<Collectors>().Count();
                    var workstoday = multi.Read<Collectors>().Count();




                    stats.ContainerCount = containerCount;
                    stats.EGDCount = containerCount;
                    stats.ActiveEGD = containerCount - inactive;
                    stats.InActiveEGD = inactive;
                    stats.FullContainerCount = full;
                    stats.EmptyContainers = empty;
                    stats.CollectorsCount = collectorcount;
                    stats.TodaysTrips = todaysTrips;
                    stats.WorksToday = workstoday;
                    tarpinis.Add(stats);


                }
            }
            return tarpinis;
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
