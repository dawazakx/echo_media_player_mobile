export type Playlist = {
  _id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  device_id: string;
  nickname: string;
  url: string;
  xtreamUserInfo: {
    username: string;
    password: string;
    nickname: string;
    url: string;
    created_at: string;
    status: string;
    is_trial: string;
    max_connections: string;
    allowed_output_formats: string[];
    active_cons: number;
    auth: number;
  };
} 