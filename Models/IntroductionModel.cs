using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace studySession.Models
{

    public class IntroductionList
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// 姓
        /// </summary>
        [DisplayName("姓")]
        public string? LastName { get; set; }

        /// <summary>
        /// 名
        /// </summary>
        [DisplayName("名")]
        public string? FirstName { get; set; }

        /// <summary>
        /// フルネームカナ
        /// </summary>
        [DisplayName("フルネームカナ")]
        public string? FullNameKana { get; set; }

        /// <summary>
        /// 入社年
        /// </summary>
        [DisplayName("入社年")]
        public string? EntryYear { get; set; }

        /// <summary>
        /// 入社月
        /// </summary>
        [DisplayName("入社月")]
        public string? EntryMonth { get; set; }

        /// <summary>
        /// 誕生日
        /// </summary>
        [DisplayName("誕生日")]
        public DateTime? BirthDay { get; set; }

        /// <summary>
        /// 趣味
        /// </summary>
        [DisplayName("趣味")]
        public string? Hobby { get; set; }

        /// <summary>
        /// 入社年リスト
        /// </summary>
        public List<SelectListItem>? selectListYearItems { get; set; }

        /// <summary>
        /// 入社月リスト
        /// </summary>
        public List<SelectListItem>? selectListMonthItems { get; set; }


        public List<IntroductionModel> List = new List<IntroductionModel>();
    }

    public class IntroductionModel
    {
        [Key]
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// 姓
        /// </summary>
        [DisplayName("姓")]
        public string? LastName { get; set; }

        /// <summary>
        /// 名
        /// </summary>
        [DisplayName("名")]
        public string? FirstName { get; set; }

        /// <summary>
        /// フルネームカナ
        /// </summary>
        [DisplayName("フルネームカナ")]
        public string? FullNameKana {  get; set; }

        /// <summary>
        /// 入社年
        /// </summary>
        public string? EntryYear { get; set; }

        /// <summary>
        /// 入社月
        /// </summary>
        public string? EntryMonth { get; set; }

        /// <summary>
        /// 誕生日
        /// </summary>
        public string? BirthDay { get; set; }

        /// <summary>
        /// 趣味
        /// </summary>
        public string? Hobby { get; set; }

        /// <summary>
        /// 削除フラグ
        /// </summary>
        public string? is_delete { get; set; }
    }
}
