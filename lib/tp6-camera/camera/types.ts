export type Photo = {
  id: string;          // ex: "1696437823456"
  uri: string;         // file://.../photos/1696437823456.jpg
  createdAt: number;   // epoch ms
  size?: number;       // en octets
};
