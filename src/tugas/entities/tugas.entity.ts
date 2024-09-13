export class Tugas {
  id: bigint;
  materiId: bigint;
  creatorId: bigint;
  nama_tugas: string;
  file?: string | null;
  file_url?: string | null;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}
