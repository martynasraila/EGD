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
    public class Collectors_ContainersRepository : ICollectors_ContainersRepository
    {
        private readonly string _connectionString;
        public Collectors_ContainersRepository()
        {
            _connectionString = Startup.ConnectionString;
        }

        public bool DeleteByCollectorId(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [Collectors_Containers] 
                        WHERE CollectorId = @Id", new { Id = id });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }
        public bool DeleteByContainerId(int id)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"DELETE FROM [Collectors_Containers]
                            WHERE ContainerId = @Id", new { Id = id });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public List<Collectors_Containers> GetAllCollectors_Containers()
        {
            const string sql = @"SELECT * FROM Collectors_Containers";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Collectors_Containers>(sql).ToList();
            }
        }

        public List<Collectors_Containers> GetByCollectorId(int id)
        {
            const string sql = @"SELECT 
                                    CollectorId,ContainerId 
                                FROM Collectors_Containers
                                WHERE Collectors_Containers.CollectorId = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<Collectors_Containers>(sql, new { id = id }).ToList();
            }
        }
        public List<Collectors_Containers> GetByContainerId(int id)
        {
            const string sql = @"SELECT 
                                    CollectorId,ContainerId 
                                FROM Collectors_Containers
                                WHERE Collectors_Containers.ContainerId = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<Collectors_Containers>(sql, new { id = id }).ToList();
            }
        }

        public bool InsertCollector_Container(Collectors_Containers ourCollector_Container)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"INSERT INTO Collectors_Containers([CollectorId],[ContainerId]) 
            values (@CollectorId, @ContainerId)",
                new { ourCollector_Container.CollectorId, ourCollector_Container.ContainerId });
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public bool UpdateByCollectorId(Collectors_Containers ourCollector_Container)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Collectors_Containers] SET [CollectorId] = @CollectorId ,[ContainerId] = @ContainerId"+
                " WHERE CollectorId = " + ourCollector_Container.CollectorId, ourCollector_Container);

                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }
        public bool UpdateByContainerId(Collectors_Containers ourCollector_Container)
        {
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                int rowsAffected = conn.Execute(@"UPDATE [Collectors_Containers] SET [CollectorId] = @CollectorId ,[ContainerId] = @ContainerId" +
                "[LastStateid]=@LastStateid WHERE ContainerId = " + ourCollector_Container.ContainerId, ourCollector_Container);

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
