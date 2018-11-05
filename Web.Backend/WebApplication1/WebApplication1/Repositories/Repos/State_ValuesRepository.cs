using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EGD.Models;
using System.Data;
using Dapper;
using System.Data.SqlClient;
using WebApplication1;

namespace EGD.Repositories
{
    public class State_ValuesRepository : IState_ValuesRepository
    {
        private readonly string _connectionString;
        public State_ValuesRepository()
        {
            _connectionString = Startup.ConnectionString;
        }

        public List<State_Values> GetAllState_Values()
        {
            const string sql = @"SELECT * FROM State_Values";
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<State_Values>(sql).ToList();
            }
        }

        public State_Values GetById(int id)
        {
            const string sql = @"SELECT 
                                    Id, 
                                   Name, 
                                    Description 
                                FROM State_Values
                                WHERE State_Values.Id = @id";
            using (IDbConnection conn = Connection)
            {
                conn.Open();
                return conn.Query<State_Values>(sql, new { id = id }).Single();
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
