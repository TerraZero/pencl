import Form from '../manager/client/Form'

export default class MusicAddForm extends Form {

  create() {
    this.addField({
      key: 'url',
      type: 'text',
    });
    this.addField({
      key: 'output',
      type: 'text',
    });
    this.addField({
      key: 'type',
      type: 'select',
      options: {
        backgrounds: 'background',
        sdf: 'sdf',
      },
    })
  }

}
