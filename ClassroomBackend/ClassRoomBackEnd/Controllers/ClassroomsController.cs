using Microsoft.AspNetCore.Mvc;

namespace ClassRoomBackEnd.Controllers
{
    public class ClassroomsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
