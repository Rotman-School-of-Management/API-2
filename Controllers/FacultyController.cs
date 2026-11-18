using FacultyApi.Data;
using FacultyApi.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FacultyApi.Controllers;

[ApiController]
[Route("api/faculty")]
[Produces("application/xml")]
public class FacultyController : ControllerBase
{
    private readonly AppDbContext _db;

    public FacultyController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<FacultyListDto>> GetFaculty()
    {
        var faculty = await _db.Faculty
            .AsNoTracking()
            .Select(f => new FacultyDto
            {
                Id = f.Id,
                FacultyID = f.FacultyID,
                FName = f.FName,
                LName = f.LName,
                Position = f.Position,
              Division = f.Division,
                Publications = f.Publications.Select(p => new PublicationDto
                {
                    PublicationsID = p.PublicationsID,
                    Title = p.Title,
                    Publisher = p.Publisher,
                    PublicationType = p.PublicationType,
                    YearPublished = p.YearPublished
                }).ToList()
            })
            .ToListAsync();

        return new FacultyListDto { Faculty = faculty };
    }

  // PUT /api/faculty/5
  [HttpPut("{id:int}")]
  [Consumes("application/xml")]
  public async Task<IActionResult> UpdateFaculty(int id, [FromBody] FacultyUpdateDto dto)
  {
    var faculty = await _db.Faculty.FirstOrDefaultAsync(f => f.Id == id);
    if (faculty is null) return NotFound();

    faculty.FName = dto.FName;
    faculty.LName = dto.LName;
    faculty.Position = dto.Position;
    faculty.Division = dto.Division;

    await _db.SaveChangesAsync();
    return NoContent();
  }

  // DELETE /api/faculty/5
  [HttpDelete("{id:int}")]
  public async Task<IActionResult> DeleteFaculty(int id)
  {
    var facultyId = await _db.Faculty
        .Where(f => f.Id == id)
        .Select(f => f.FacultyID)
        .FirstOrDefaultAsync();

    if (facultyId is null) return NotFound();

    // Delete child rows first, then the parent, in one transaction
    await using var tx = await _db.Database.BeginTransactionAsync();

    await _db.Publications
        .Where(p => p.FacultyID == facultyId)
        .ExecuteDeleteAsync();

    await _db.Faculty
        .Where(f => f.Id == id)
        .ExecuteDeleteAsync();

    await tx.CommitAsync();
    return NoContent();
  }

  // PUT /api/faculty/publications/10
  [HttpPut("publications/{publicationsId:int}")]
  [Consumes("application/xml")]
  public async Task<IActionResult> UpdatePublication(int publicationsId, [FromBody] PublicationUpdateDto dto)
  {
    var publication = await _db.Publications.FirstOrDefaultAsync(p => p.PublicationsID == publicationsId);
    if (publication is null) return NotFound();

    publication.Title = dto.Title;
    publication.Publisher = dto.Publisher;
    publication.PublicationType = dto.PublicationType;
    publication.YearPublished = dto.YearPublished ?? 0;

    await _db.SaveChangesAsync();
    return NoContent();
  }

  // DELETE /api/faculty/publications/10
  [HttpDelete("publications/{publicationsId:int}")]
  public async Task<IActionResult> DeletePublication(int publicationsId)
  {
    var rows = await _db.Publications
        .Where(p => p.PublicationsID == publicationsId)
        .ExecuteDeleteAsync();

    return rows == 0 ? NotFound() : NoContent();
  }
}
