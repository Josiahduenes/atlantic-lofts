import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import type { Event } from './type';

window.Webflow ||= [];
window.Webflow.push(() => {
  const calendarElement = document.querySelector<HTMLDivElement>('[data-element="calendar"]');
  if (!calendarElement) return;
  const apiKey =
    'patjjOTvTCOCRglVs.aebd3d4f85a600cb5c228228069c341ce0f9a89ebff08f71e60fcb2c103a0adf';
  const baseId = 'app6ak5FPSA3mu0KZ';
  const tableName = 'tblUeZHD3igGLq1zi';
  const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  let calendar;
  let myData;

  fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const { records } = data; //Records = Full Data from AirTable.
      const formattedData = records.map((record) => {
        const { fields } = record;
        return {
          title: fields.Update_Name,
          start: fields.Date,
          end: fields.end_date,
          url: fields.event_link,
        };
      });
      myData = formattedData;
      calendar = new Calendar(calendarElement, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        events: myData,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek',
        },
      });
      calendar.render();
    })
    .catch((error) => console.error(error));
});
