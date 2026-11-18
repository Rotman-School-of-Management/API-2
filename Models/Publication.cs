using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FacultyApi.Models;

[Table("Fac_Publication")]
public class Publication
{
    [Key]
    public int PublicationsID { get; set; }

    public string FacultyID { get; set; } = "";
    public string Title { get; set; } = "";
    //public string FName { get; set; } = "";
    public string Publisher { get; set; } = "";
    public int? YearPublished { get; set; }
}
