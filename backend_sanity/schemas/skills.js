export default {
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'bgColor',
      title: 'BgColor',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Tools', value: 'tools' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown', // Opcional: 'radio' para mostrar opciones como botones
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number', // Campo numérico para el orden
      description: 'Define el orden de esta habilidad dentro de su categoría.',
    },
  ],
};
