namespace ClassRoomBackEnd.Models
{
    using Microsoft.AspNetCore.Identity;

    public class ApplicationUser : IdentityUser
    {
        public required string Role { get; set; } // Admin, Teacher, Learner
    }
}
