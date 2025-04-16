using OfficeOpenXml;

namespace studySession.Const
{
    public static class Const
    {

        public const string NoDeleteFlg = "0";
		public const string DeleteFlg = "1";

		/// <summary>
		/// EPPLUSのライセンス宣言
		/// </summary>
		public static void ExcelPackageLicense()
        {
            // EPPlusライブラリのライセンスを設定（EPPlus v5以降）
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }
        
    }
}
