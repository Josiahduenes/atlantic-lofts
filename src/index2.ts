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

// Set your Airtable API key and base ID
// const apiKey = 'patjjOTvTCOCRglVs.cd518fa67be22cbed869a8c8a9ea9a71337ad24200a6ac72b53c5cf699df3f89';
//const baseId = 'app6ak5FPSA3mu0KZ';

// Set up the Airtable API endpoint URL
// const url = `https://api.airtable.com/v0/${baseId}/tblUeZHD3igGLq1zi`
