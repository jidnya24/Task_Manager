using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TaskManager.Models
{
    public partial class task_managerContext : DbContext
    {
        public task_managerContext()
        {
        }

        public task_managerContext(DbContextOptions<task_managerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Task> Tasks { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning Move your connection string to appsettings.json for security reasons
                optionsBuilder.UseMySql(
                    "Server=localhost;Database=task_manager;User=root;Password=root;",
                    new MySqlServerVersion(new Version(8, 0, 36)) // Change version based on your MySQL server
                );
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("tasks");

                entity.HasIndex(e => e.UserId, "user_id");

                entity.Property(e => e.TaskId).HasColumnName("task_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Description)
                    .HasColumnType("text")
                    .HasColumnName("description");

                entity.Property(e => e.DueDate)
                    .HasColumnType("date")
                    .HasColumnName("due_date");

                entity.Property(e => e.Status)
                    .HasColumnType("enum('Pending','In Progress','Completed')")
                    .HasColumnName("status")
                    .HasDefaultValueSql("'Pending'");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .HasColumnName("title");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("tasks_ibfk_1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Email, "email")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.Uname)
                    .HasMaxLength(100)
                    .HasColumnName("uname");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
