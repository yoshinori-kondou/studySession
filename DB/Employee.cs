using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace studySession
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// 姓
        /// </summary>
        public string? lastName { get; set; }

        /// <summary>
        /// 名
        /// </summary>
        public string? firstName { get; set; }

        /// <summary>
        /// フルネームカナ
        /// </summary>
        public string? fullNameKana { get; set; }

        /// <summary>
        /// 入社年
        /// </summary>
        public string? entryYear { get; set; }

        /// <summary>
        /// 入社月
        /// </summary>
        public string? entryMonth { get; set; }

        /// <summary>
        /// 誕生日
        /// </summary>
        public DateTime? birthDay { get; set; }

        /// <summary>
        /// 趣味
        /// </summary>
        public string? hobby { get; set; }

        /// <summary>
        /// 削除フラグ
        /// </summary>
        public string? is_delete { get; set; }

    }
}

