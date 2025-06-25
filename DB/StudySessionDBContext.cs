using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using studySession;
using System;
using System.Reflection.Metadata;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using studySession.Const;

namespace studySession.DB
{
    internal class StudySessionDBContext : DbContext
    {

        public DbSet<Employee> employee { get; set; }


        public StudySessionDBContext()
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            #if DEBUG
                var connectionString = "Host=localhost;Port=45432;Database=postgres;Username=postgres;Password=postgrespw";
            #else
                var connectionString = "Host=127.0.0.1;Port=5432;Database=postgres;Username=postgres;Password=postgres";
            #endif
                optionsBuilder.UseNpgsql(connectionString);
        }
    }
}
