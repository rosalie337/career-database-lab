const Validator = require('./Validator');

module.exports = class Schema {
  // {
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   age: {
  //     type: Number
  //   }
  // }
    constructor(schema) {
        this.schema = schema;
    // [['name', { type: String, required: true }], ['age', { type: Number }]]
        this.validators = Object.entries(schema)
      // field -> 'age', options => { type: Number }
            .map(([field, options]) => new Validator(field, options));

    // [new Validator('name', { type: String, required: true }), new Validator('age', { type: Number })];
    }

  // { name: 12345, age: 5 }
    validate(obj) {
        const validated = {};
        const errors = [];
        this.validators
            .forEach(validator => {
        // new Validator('age', { type: Number })
                try {
          // validated -> { name: '12345', age: 5 }
                    validated[validator.field] = validator.validate(obj);
                } catch(e) {
                    errors.push(e);
                }
            });

        if(errors.length > 0) {
            throw new Error(`invalid schema >> ${errors}`);
        }

        return validated;
    }

};