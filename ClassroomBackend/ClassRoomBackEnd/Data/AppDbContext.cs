namespace ClassRoomBackEnd.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using ClassRoomBackEnd.Models;
    using System.Reflection.Emit;



  

    public class AppDbContext : IdentityDbContext<ApplicationUser>


    {


   

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Classroom> Classrooms { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Relationships to be completed by candidates
            builder.Entity<Classroom>()
                .HasOne(c => c.Teacher)
                .WithMany()
                .HasForeignKey(c => c.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Classroom>()
            .HasMany(c => c.Learners)
            .WithMany("Classrooms");

        }
    }
}
