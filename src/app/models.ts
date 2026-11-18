export interface PublicationItem {
 PublicationsID: number;
  FacultyID: string;
  Title: string;
  PublicationType: string;
 Publisher: string;
 YearPublished: number | null;   // the column has NULLs
}

export interface FacultyItem {
  Id: number;
  FacultyID: string;
  FName: string;
  LName: string;
  Position: string;
  Division: string;
  publications: PublicationItem[];
}
