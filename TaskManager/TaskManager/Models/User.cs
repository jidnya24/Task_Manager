using System;
using System.Collections.Generic;

namespace TaskManager.Models
{
    public partial class User
    {
        public User()
        {
            Tasks = new HashSet<Task>();
        }

        public int UserId { get; set; }
        public string Uname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }
}
