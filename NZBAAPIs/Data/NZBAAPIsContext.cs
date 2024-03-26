#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using NZBAAPIs.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using NZBAAPIs.Entities.Configuration;

namespace NZBAAPIs.Data
{
    public class NZBAAPIsContext : DbContext
    {
        public NZBAAPIsContext (DbContextOptions<NZBAAPIsContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
        }
        public DbSet<NZBAAPIs.Model.Organisation> Organisation { get; set; }
        public DbSet<NZBAAPIs.Model.Item> Item { get; set; }
        public DbSet<NZBAAPIs.Model.Customer> Customer { get; set; }

        public DbSet<NZBAAPIs.Model.Users> Users { get; set; }

    }
}
