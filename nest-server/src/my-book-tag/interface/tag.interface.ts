export interface CreateTagPayload {
  value: string;
}

export interface FindTagPayload {
  id?: number;
  value?: string;
}

export interface DeleteTagPayload {
  id: number;
}

export interface ResponseTag {
  id: number;
  value: string;
}
