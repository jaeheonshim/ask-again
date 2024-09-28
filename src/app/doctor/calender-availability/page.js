const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// Scopes for Google Calendar API
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';

// **Availability Schedule**
// Replace with data from your database as needed
const availability = [
  {
    daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday (0 = Sunday, 6 = Saturday)
    start: '09:00', // Available from 9:00 AM
    end: '21:00',   // Available until 9:00 PM
  },
];

/**
 * Load client secrets from a local file.
 */
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.error('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listFreeBusy);
});

/**
 * Create an OAuth2 client with the given credentials.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store a new token after prompting for user authorization.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this URL:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions.
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the free/busy information on the user's primary calendar.
 */
function listFreeBusy(auth) {
  const calendar = google.calendar({ version: 'v3', auth });

  // Define the time range for the query.
  const { timeMin, timeMax } = getNextWeekTimeRange();

  const requestBody = {
    timeMin: timeMin,
    timeMax: timeMax,
    timeZone: 'UTC',
    items: [{ id: 'primary' }],
  };

  calendar.freebusy.query({ requestBody }, (err, res) => {
    if (err) return console.error('The API returned an error:', err);
    const busyTimes = res.data.calendars.primary.busy;
    console.log('\nBusy times:', busyTimes);

    const freeTimesByDay = findFreeTimes(timeMin, timeMax, busyTimes, availability);
    console.log('\nFree times:', freeTimesByDay);

    // Write free times to a JSON file.
    fs.writeFile('free_times.json', JSON.stringify(freeTimesByDay, null, 2), (err) => {
      if (err) return console.error('Error writing to file:', err);
      console.log('\nFree times saved to free_times.json');
    });
  });
}

/**
 * Computes free times based on availability and busy times, organized by day.
 */
function findFreeTimes(timeMin, timeMax, busyTimes, availability) {
  const freeTimesByDay = {};
  const startDate = new Date(timeMin);
  const endDate = new Date(timeMax);

  // Prepare busy times mapped by date for quicker access
  const busyTimesByDay = mapEventsByDay(busyTimes);

  // Generate all the time slots based on availability
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const dateKey = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD

    availability.forEach((avail) => {
      if (avail.daysOfWeek.includes(dayOfWeek)) {
        // Get the available period for this day
        const dayStart = new Date(currentDate);
        const [startHour, startMinute] = avail.start.split(':').map(Number);
        dayStart.setHours(startHour, startMinute, 0, 0);

        const dayEnd = new Date(currentDate);
        const [endHour, endMinute] = avail.end.split(':').map(Number);
        dayEnd.setHours(endHour, endMinute, 0, 0);

        // Adjust available start and end times based on timeMin and timeMax
        const availableStart = dayStart < startDate ? new Date(startDate) : dayStart;
        const availableEnd = dayEnd > endDate ? new Date(endDate) : dayEnd;

        // Get busy times for this day
        const dayBusyTimes = busyTimesByDay[dateKey] || [];

        // Subtract busy times from the available period
        const freeSlots = subtractBusyTimes(availableStart, availableEnd, dayBusyTimes);

        // Round free slots to nearest 15 minutes and add to freeTimesByDay
        freeSlots.forEach((slot) => {
          const roundedSlot = roundSlotToNearest(slot, 15);
          if (roundedSlot) {
            if (!freeTimesByDay[dateKey]) {
              freeTimesByDay[dateKey] = [];
            }
            freeTimesByDay[dateKey].push({
              start: roundedSlot.start.toISOString(),
              end: roundedSlot.end.toISOString(),
            });
          }
        });
      }
    });

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0); // Reset time to midnight
  }

  return freeTimesByDay;
}

/**
 * Maps events to their respective dates for quick access.
 */
function mapEventsByDay(events) {
  const eventsByDay = {};
  events.forEach((event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);

    const startKey = startDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const endKey = endDate.toISOString().split('T')[0]; // YYYY-MM-DD

    // If event starts and ends on the same day
    if (startKey === endKey) {
      if (!eventsByDay[startKey]) {
        eventsByDay[startKey] = [];
      }
      eventsByDay[startKey].push(event);
    } else {
      // Event spans multiple days
      let currentDate = new Date(startDate);
      currentDate.setHours(0, 0, 0, 0);

      const endDateOnly = new Date(endDate);
      endDateOnly.setHours(0, 0, 0, 0);

      while (currentDate <= endDateOnly) {
        const dateKey = currentDate.toISOString().split('T')[0];
        if (!eventsByDay[dateKey]) {
          eventsByDay[dateKey] = [];
        }
        // Adjust event times for each day
        const eventStart = new Date(Math.max(currentDate, startDate));
        const eventEnd = new Date(Math.min(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 - 1), endDate));
        eventsByDay[dateKey].push({
          start: eventStart.toISOString(),
          end: eventEnd.toISOString(),
        });
        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  });
  return eventsByDay;
}

/**
 * Subtract busy times from available period to get free slots.
 */
function subtractBusyTimes(availableStart, availableEnd, busyTimes) {
  let intervals = [{ start: availableStart, end: availableEnd }];

  // Sort busy times by start time
  busyTimes.sort((a, b) => new Date(a.start) - new Date(b.start));

  busyTimes.forEach((busy) => {
    const busyStart = new Date(busy.start);
    const busyEnd = new Date(busy.end);
    const newIntervals = [];

    intervals.forEach((interval) => {
      if (busyEnd <= interval.start || busyStart >= interval.end) {
        // No overlap
        newIntervals.push(interval);
      } else {
        // Overlap exists
        if (busyStart > interval.start) {
          newIntervals.push({ start: interval.start, end: busyStart });
        }
        if (busyEnd < interval.end) {
          newIntervals.push({ start: busyEnd, end: interval.end });
        }
      }
    });

    intervals = newIntervals;
  });

  return intervals;
}

/**
 * Rounds the slot start and end times to the nearest interval.
 */
function roundSlotToNearest(slot, minutes) {
  const { start, end } = slot;
  const roundedStart = roundTimeToNearestMinutes(start, minutes, 'ceil');
  const roundedEnd = roundTimeToNearestMinutes(end, minutes, 'floor');

  // Ensure the slot has a positive duration after rounding
  if (roundedStart >= roundedEnd) {
    return null; // Discard slots that are too short
  }

  return {
    start: roundedStart,
    end: roundedEnd,
  };
}

/**
 * Rounds a time to the nearest specified minutes.
 */
function roundTimeToNearestMinutes(time, minutesInterval, method) {
  const coeff = 1000 * 60 * minutesInterval;
  const date = new Date(time);
  let rounded;
  if (method === 'ceil') {
    rounded = new Date(Math.ceil(date.getTime() / coeff) * coeff);
  } else {
    rounded = new Date(Math.floor(date.getTime() / coeff) * coeff);
  }
  return rounded;
}

/**
 * Calculates the start and end of the next 7 days.
 */
function getNextWeekTimeRange() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0); // Start of today

  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  end.setHours(23, 59, 59, 999); // End of 7 days from now

  return {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
  };
}
