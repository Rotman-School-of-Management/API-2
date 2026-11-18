export interface PublicationItem {
 PublicationsID: number;
 FacultyID: string;
 Title: string;
 Publisher: string;
 YearPublished: number | null;   // the column has NULLs
}

export interface FacultyItem {
  Id: number;
  FacultyID: string;
  FName: string;
  LName: string;
  Division: string;
  publications: PublicationItem[];
}