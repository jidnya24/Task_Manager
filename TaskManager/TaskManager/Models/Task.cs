using System;
using System.Collections.Generic;

namespace TaskManager.Models
{
    public partial class Task
    {
        public int TaskId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string? Status { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
