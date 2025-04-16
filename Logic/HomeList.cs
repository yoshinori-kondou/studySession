using Microsoft.AspNetCore.Mvc.Diagnostics;
using studySession.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using studySession.Controllers;
using studySession.DB;

namespace studySession.Logic
{
    public class HomeList
    {
        public HomeList()
        {
        }

        public IntroductionList IntroList() {
            IntroductionList introList = new IntroductionList();
            introList.List = new List<IntroductionModel>();

            using (StudySessionDBContext db = new StudySessionDBContext())
            {
                IntroductionList introductionListModel = new IntroductionList();
                var Introduction_List = db.employee.Where(x => x.is_delete == Const.Const.NoDeleteFlg).ToList();
                var get_intro_list = from intro in Introduction_List
                                          select new IntroductionModel()
                                          {
                                              Id = intro.Id,
                                              LastName = intro.lastName,
                                              FirstName = intro.firstName,
                                              FullNameKana = intro.fullNameKana,
                                              EntryYear = intro.entryYear,
                                              EntryMonth = intro.entryMonth,
                                              BirthDay = intro.birthDay.ToString().Split(" ")[0],
                                              Hobby = intro.hobby,
                                          };

                introList.List = get_intro_list.ToList();

                

                
            }

            introList.selectListYearItems = SetSelectYearList();
            introList.selectListMonthItems = SetSelectMonthList();

            return introList;

        }

        /// <summary>
        /// 登録処理
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public void create(FormData input)
        {
            using (var entities = new StudySessionDBContext())
            {
                var employee = new Employee();
                employee = CommonUpdate(employee, input);
                entities.employee.Add(employee);
                entities.SaveChanges();
            }
        }

        private Employee CommonUpdate(Employee employee, FormData input)
        {
            employee.firstName = input.FirstName;
            employee.lastName = input.LastName;
            employee.fullNameKana = input.FullNameKana;
            employee.entryYear = input.EntryYear;
            employee.entryMonth = input.EntryMonth;
            if (!string.IsNullOrEmpty(input.BirthDay))
            {
                employee.birthDay = DateTime.Parse(input.BirthDay);
            }
            employee.hobby = input.Hobby;
            employee.is_delete = "0";

            return employee;
        }

        /// <summary>
        /// 更新処理
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public void update(FormData input)
        {

            using (var entities = new StudySessionDBContext())
            {
                var edit_employee = entities.employee.Find(input.Id);
                if(edit_employee != null)
                {
                    edit_employee = CommonUpdate(edit_employee, input);
                }
                
                entities.SaveChanges();

            }
        }

        /// <summary>
        /// 削除処理
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public void delete(FormData input)
        {

            using (var entities = new StudySessionDBContext())
            {
                var delete_employee = entities.employee.Find(input.Id);
                if(delete_employee != null)
                {
                    delete_employee.is_delete = "1";
                }
               

                entities.SaveChanges();

            }
        }

        public List<SelectListItem> SetSelectYearList(){

            List<SelectListItem> yearList = new List<SelectListItem>();

            SelectListItem itemempty = new SelectListItem();
            itemempty.Value = "";
            itemempty.Text = "選択してください";
            yearList.Add(itemempty);

            for (var year = 2000; year < 2050; year++)
            {
                SelectListItem item = new SelectListItem();
                item.Value = year.ToString();
                item.Text = year.ToString();
                yearList.Add(item);
            }

            return yearList;
        }

        public List<SelectListItem> SetSelectMonthList()
        {

            List<SelectListItem> monthList = new List<SelectListItem>();

            SelectListItem itemempty = new SelectListItem();
            itemempty.Value = "";
            itemempty.Text = "選択してください";
            monthList.Add(itemempty);

            for (var month = 1; month < 13; month++)
            {
                SelectListItem item = new SelectListItem();
                item.Value = month.ToString();
                item.Text = month.ToString();
                monthList.Add(item);
            }

            return monthList;
        }
    }
}
