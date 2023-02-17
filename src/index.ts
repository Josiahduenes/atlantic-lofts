import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import type { Event } from './type';

window.Webflow ||= [];
window.Webflow.push(() => {
  const calendarElement = document.querySelector<HTMLDivElement>('[data-element="calendar"]');
  if (!calendarElement) return;

  const events = getEvents();
  console.log({ events });

  const calendar = new Calendar(calendarElement, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek',
    },

    events,
  });

  calendar.render();
});

const getEvents = (): Event[] => {
  const scripts = document.querySelectorAll('[data-element="event-data"]');
  const events = [...scripts]
    .map((script) => {
      const event: Event = JSON.parse(script.textContent!);
      event.start = new Date(event.start);
      event.end = new Date(event.end);

      return event;
    })
    .filter(Boolean);

  return events;
};
