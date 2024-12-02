using System.Linq;
using System.Web.Mvc;
using WebBackendProject.Models;

public class SearchController : Controller
{
    DbAppContext db = new DbAppContext();

    [HttpPost]
    public JsonResult Search(string searchTerm)
    {
        // Truy vấn tìm kiếm
        var results = db.Tours
            .Where(t => t.Name.Contains(searchTerm) || t.Region.Contains(searchTerm) || t.Country.Contains(searchTerm))
            .Select(t => new {
                Id = t.Id,
                Name = t.Name,
                Region = t.Region,
                Country = t.Country,
                City = t.City,
                Image = t.Image,
                Opening = t.Opening.ToString(),
                Ending = t.Ending.ToString()
            })
            .ToList();

        return Json(results, JsonRequestBehavior.AllowGet); // Trả về JSON
    }
}
