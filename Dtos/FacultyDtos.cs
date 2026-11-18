using System.Xml.Serialization;

namespace FacultyApi.Dtos;

[XmlRoot("FacultyList")]
public class FacultyListDto
{
    [XmlElement("Faculty")]
    public List<FacultyDto> Faculty { get; set; } = new();
}

public class FacultyDto
{
    public int Id { get; set; }
    public string FacultyID { get; set; } = "";
    public string? FName { get; set; } = "";
    public string? LName { get; set; } = "";
    public string? Position { get; set; } = "";
    public string? Division { get; set; } = "";

    [XmlArray("Publications")]
    [XmlArrayItem("Publication")]
    public List<PublicationDto> Publications { get; set; } = new();
}

public class PublicationDto
{
    public int PublicationsID { get; set; }
    public string? Title { get; set; } = "";
    public string? PublicationType { get; set; } = "";
    public string? Publisher { get; set; } = "";
    public int? YearPublished { get; set; }
}


[XmlRoot("Faculty")]
public class FacultyUpdateDto
{
  public string? FName { get; set; }
  public string? LName { get; set; }
  public string? Position { get; set; }
  public string? Division { get; set; }
}

[XmlRoot("Publication")]
public class PublicationUpdateDto
{
  public string? Title { get; set; }
  public string? PublicationType { get; set; }
  public string? Publisher { get; set; }

  [XmlElement(IsNullable = true)]
  public int? YearPublished { get; set; }
}
