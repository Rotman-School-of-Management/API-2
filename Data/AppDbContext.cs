using FacultyApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FacultyApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Faculty> Faculty => Set<Faculty>();
    public DbSet<Publication> Publications => Set<Publication>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Faculty>()
            .HasMany(f => f.Publications)
            .WithOne()
            .HasForeignKey(p => p.FacultyID)
            .HasPrincipalKey(f => f.FacultyID);
    }
}