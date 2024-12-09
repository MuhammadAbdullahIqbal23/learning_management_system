import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Plus } from 'lucide-react';

const mockEvents = [
  {
    id: '1',
    title: 'Build a React Portfolio',
    start: '2024-03-25T23:59:59',
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    textColor: '#ffffff',
    extendedProps: {
      type: 'assignment'
    }
  },
  {
    id: '2',
    title: 'Web Development Lecture',
    start: '2024-03-22T10:00:00',
    end: '2024-03-22T11:30:00',
    backgroundColor: '#10B981',
    borderColor: '#10B981',
    textColor: '#ffffff',
    extendedProps: {
      type: 'lecture'
    }
  },
  {
    id: '3',
    title: 'UI Design Workshop',
    start: '2024-03-24T14:00:00',
    end: '2024-03-24T16:00:00',
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
    textColor: '#ffffff',
    extendedProps: {
      type: 'workshop'
    }
  }
];

const Calendar = () => {
  const [view, setView] = useState('dayGridMonth');

  const handleEventClick = (info: any) => {
    console.log('Event clicked:', info.event);
  };

  const handleDateSelect = (selectInfo: any) => {
    console.log('Date selected:', selectInfo);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          Add Event
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={mockEvents}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          eventClick={handleEventClick}
          select={handleDateSelect}
          height="auto"
        />
      </div>
    </div>
  );
};

export default Calendar;