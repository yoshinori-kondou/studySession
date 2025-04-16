using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using studySession;
using System;
using System.Reflection.Metadata;

namespace studySession.DB
{
    internal class StudySessionDBContext : DbContext
    {
        // acco_情報提供管理
        public DbSet<Employee> employee { get; set; }


        public StudySessionDBContext()
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

#if DEBUG
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Host=localhost;Port=45432;Database=postgres;Username=postgres;Password=postgrespw");
#else
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=sanpanadb-prestg-instance-1.c4asgtxbgo0e.ap-northeast-1.rds.amazonaws.com;Port=5432;Database=sanpanadb_prestg;Username=customer;Password=pf3kFTjsBWk4");
#endif
    }
}
