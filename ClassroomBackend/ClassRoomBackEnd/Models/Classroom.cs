using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ClassRoomBackEnd.Models
{
    public class Classroom
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }


        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Capacity must be at least 1.")]
        public int Capacity { get; set; }

        [Required]
        public string TeacherId { get; set; }

        [ForeignKey("TeacherId")]
        public IdentityUser Teacher { get; set; }

        public ICollection<ApplicationUser> Learners { get; set; } = new List<ApplicationUser>();



    }
}
