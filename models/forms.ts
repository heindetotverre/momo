import { Form, validators } from "mesh-ui-components"
import { FORM_NAMES } from "~~/constants/forms"
import { createSafeId } from "~~/utils/createSafeId"

const {
  nonumber,
  email,
  notempty,
  specialchar,
  minlength,
  issamevalue,
  slug
} = validators

const elements = {
  text: {
    component: 'MeshInput',
    type: 'text',
    highlightValidation: true
  },
  button: {
    component: 'MeshButton',
    type: 'button',
    variant: 'primary'
  },
  checkbox: {
    component: 'MeshInput',
    type: 'checkbox',
    validators: [{ name: 'checkbox', validate: () => true }]
  },
  select: {
    component: 'MeshSelect',
    type: 'select',
    validators: [{ name: 'select', validate: () => true }]
  }
}

const formsModel = {
  [FORM_NAMES.LOGIN]: {
    meta: {
      name: FORM_NAMES.LOGIN
    },
    fields: [
      {
        ...elements.text,
        key: 'email',
        type: 'email',
        validators: [email],
        highlightValidation: false
      },
      {
        ...elements.text,
        key: 'password',
        type: 'password',
        validators: [notempty],
        highlightValidation: false
      },
      {
        ...elements.button,
        key: 'loginButton'
      }
    ]
  } as Form,
  [FORM_NAMES.REGISTER]: {
    meta: {
      name: FORM_NAMES.REGISTER
    },
    fields: [
      {
        ...elements.text,
        key: 'firstName',
        validators: [notempty, nonumber]
      },
      {
        ...elements.text,
        key: 'lastName',
        validators: [notempty, nonumber]
      },
      {
        ...elements.text,
        key: 'email',
        type: 'email',
        validators: [notempty, email]
      },
      {
        ...elements.text,
        key: 'password',
        type: 'password',
        validators: [notempty, specialchar, minlength]
      },
      {
        ...elements.text,
        key: 'passwordCheck',
        secondValidationValue: 'password',
        type: 'password',
        validators: [issamevalue]
      },
      {
        ...elements.button,
        key: 'registerButton'
      }
    ]
  } as Form,
  [FORM_NAMES.CREATE_PAGE]: {
    meta: {
      name: FORM_NAMES.CREATE_PAGE,
      sections: ['general', 'meta', 'content']
    },
    fields: [
      {
        section: 'general',
        ...elements.text,
        key: 'slug',
        validators: [slug]
      },
      {
        section: 'general',
        ...elements.text,
        key: 'name',
        validators: [notempty]
      },
      {
        section: 'general',
        ...elements.checkbox,
        key: 'isInMenu',
        required: false
      },
      {
        section: 'general',
        ...elements.select,
        key: 'menuParent',
        required: false
      },
      {
        section: 'meta',
        ...elements.text,
        key: 'title',
        validators: [notempty]
      },
      {
        section: 'meta',
        ...elements.text,
        key: 'description',
        validators: [notempty]
      },
      {
        section: 'meta',
        ...elements.text,
        key: 'keywords',
        validators: [notempty]
      },
      {
        ...elements.button,
        key: 'createPageButton'
      }
    ]
  } as Form
}

Object.values(formsModel).forEach(form => {
  form.fields.forEach(field => {
    field.id = createSafeId()
  })
})

export {
  formsModel
}