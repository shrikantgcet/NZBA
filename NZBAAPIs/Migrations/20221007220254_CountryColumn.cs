﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NZBAAPIs.Migrations
{
    public partial class CountryColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Organisation",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Organisation");
        }
    }
}
