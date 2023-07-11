export default {
  name: "experiences",
  title: "Experiences",
  type: "document",
  fields: [
    /* {
        name: 'year',
        title: 'Year',
        type: 'date',
        options: {
          dateFormat: 'YYYY-MM-DD',
          calendarTodayLabel: 'Today'
        }
      }, */
    {
      name: "years",
      title: "Years",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "startDate",
              title: "Start Date",
              type: "date",
              options: {
                dateFormat: "YYYY-MM-DD",
                calendarTodayLabel: "Today",
              },
            },
            {
              name: "endDate",
              title: "End Date",
              type: "date",
              options: {
                dateFormat: "YYYY-MM-DD",
                calendarTodayLabel: "Today",
              },
            },
            // Otros campos relacionados con la experiencia laboral
          ],
        },
      ],
    },
    {
      name: "works",
      title: "Works",
      type: "array",
      of: [{ type: "workExperience" }],
    },
  ],
  orderings: [
    {
      title: "Most Recent",
      name: "mostRecent",
      by: [{ field: "years.startDate", direction: "desc" }],
    },
  ],
};

/* export default{
    name:'experiences',
    title:'Experiences',
    type: 'document',
    fields:[
        {
            name:'year',
            title:'Year',
            type:'string'
        },
        {
            name:'works',
            title:'Works',
            type:'array',
            of:[{ type:'workExperience'}]
        },
    ]
} */
