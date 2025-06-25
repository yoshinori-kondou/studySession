using Microsoft.AspNetCore.Mvc;
using studySession.Models;
using studySession.Logic;
using System.Diagnostics;

namespace studySession.Controllers
{
	public class HomeController : Controller
	{
        private readonly ILogger<HomeList> _logger;

        public HomeController(ILogger<HomeList> logger)
        {
            _logger = logger;
        }

        [HttpGet]
		public IActionResult Index()
		{
			var introLogic = new HomeList(_logger);
			var model = introLogic.IntroList();
            model.selectListYearItems = introLogic.SetSelectYearList();
			model.selectListMonthItems = introLogic.SetSelectMonthList();

            return View(model);
		}

        [HttpGet]
        public IActionResult AfterIndex()
        {
            var introLogic = new HomeList(_logger);
            var model = introLogic.IntroList();
            model.selectListYearItems = introLogic.SetSelectYearList();
            model.selectListMonthItems = introLogic.SetSelectMonthList();

            // JSON�`���Ńf�[�^��ԋp
            return Json(model.List);
        }

        [HttpPost]
		public IActionResult Index([FromBody]FormData formData)
		{
            HomeList introLogic = new HomeList(_logger);
            var response = new { success = false, message = "���������s���܂����B" };

            if (!string.IsNullOrEmpty(formData.type))
            {
                switch (formData.type)
                {
                    case "entry":
                        introLogic.create(formData);
                        response = new { success = true, message = "�Ј���񂪓o�^����܂����B" };
                        break;
                    case "update":
                        introLogic.update(formData);
                        response = new { success = true, message = "�Ј���񂪍X�V����܂����B" };
                        break;
                    case "delete":
                        introLogic.delete(formData);
                        response = new { success = true, message = "�Ј���񂪍폜����܂����B" };
                        break;
                    default:
                        response = new { success = false, message = "�����ȑ���^�C�v�ł��B" };
                        break;
                }
            }
            else
            {
                response = new { success = false, message = "����^�C�v���w�肳��Ă��܂���B" };
            }

            return new JsonResult(response);
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
