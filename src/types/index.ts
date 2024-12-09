export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  totalStudents: number;
  totalLectures: number;
  progress: number;
}

export interface Lecture {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'document';
  duration?: number;
  url: string;
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  courseId: string;
  submissions: number;
  status: 'active' | 'draft' | 'closed';
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    type: 'assignment' | 'lecture' | 'workshop';
  };
}