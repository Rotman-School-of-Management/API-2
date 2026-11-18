using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FacultyApi.Models;

[Table("Fac_Faculty")]
public class Faculty
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    public string FacultyID { get; set; } = "";
    public string? FName { get; set; } = "";
    public string? LName { get; set; } = "";
    public string? Division { get; set; } = "";
    
    public List<Publication> Publications { get; set; } = new();
}
