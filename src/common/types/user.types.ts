export type AdminData = {
  id: number;
  email: string;
  username: string;
  nama_lengkap: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  role: {
    id: number;
    role: string;
  };
};

export type GuruData = {
  id: bigint;
  nama_lengkap: string;
  email: string;
  username: string;
  roleId: bigint;
  asal_sekolah: string;
  isActive: boolean;
  role: {
    id: bigint;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type SiswaData = {
  id: bigint;
  nama_lengkap: string;
  email: string;
  username: string;
  roleId: bigint;
  role: {
    id: bigint;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
  kelas: {
    kelas: {
      id: bigint;
      nama_kelas: string;
    };
  }[];
  materi: {
    materi: {
      id: bigint;
      nama_materi: string;
    };
  }[];
  nilai: {
    id: bigint;
    nilai: bigint;
    tugasId: bigint;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type UserData = {
  id: number;
  nama_lengkap: string;
  email: string;
  username: string;
  roleId: number;
  role: {
    id: number;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
  kelas: {
    kelas: {
      id: number;
      nama_kelas: string;
    };
  }[];
  nilai: {
    id: number;
    nilai: number;
    tugasId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type FindAllReturnType = {
  guru: GuruData[];
  siswa: SiswaData[];
};
