using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace studySession.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "employee",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    lastName = table.Column<string>(type: "text", nullable: true),
                    firstName = table.Column<string>(type: "text", nullable: true),
                    fullNameKana = table.Column<string>(type: "text", nullable: true),
                    entryYear = table.Column<string>(type: "text", nullable: true),
                    entryMonth = table.Column<string>(type: "text", nullable: true),
                    birthDay = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    hobby = table.Column<string>(type: "text", nullable: true),
                    is_delete = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "employee");
        }
    }
}
