using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class TaskManagers
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string UserId { get; set; }
    }
}
