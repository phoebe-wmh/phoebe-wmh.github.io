export interface ArchiveEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  tags: string[];
  summary: string;
  excerpt: string;
  content: string;
  cover?: string;
}
