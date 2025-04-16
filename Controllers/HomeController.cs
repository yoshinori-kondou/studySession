using Microsoft.AspNetCore.Mvc;
using studySession.Models;
using studySession.Logic;
using System.Diagnostics;

namespace studySession.Controllers
{
	public class HomeController : Controller
	{

		public HomeController()
		{
		}

		[HttpGet]
		public IActionResult Index()
		{
			var introLogic = new HomeList();

			var model = introLogic.IntroList();

			model.selectListYearItems = introLogic.SetSelectYearList();
			model.selectListMonthItems = introLogic.SetSelectMonthList();

			return View(model);
		}

		[HttpPost]
		public IActionResult Index([FromBody] FormData formData)
		{
			HomeList introLogic = new HomeList();

			if (!string.IsNullOrEmpty(formData.type))
			{
				switch (formData.type)
				{
					case "entry":
						introLogic.create(formData);
						break;
					case "update":
						introLogic.update(formData);
						break;
					case "delete":
						introLogic.delete(formData);
						break;
				}
			}

			return RedirectToAction("index");
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}

	public class FormData
	{
		public int? Id { get; set; }

		public string? type { get; set; }

		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? FullNameKana { get; set; }
		public string? EntryYear { get; set; }
		public string? EntryMonth { get; set; }
		public string? BirthDay { get; set; }
		public string? Hobby { get; set; }
	}
}
